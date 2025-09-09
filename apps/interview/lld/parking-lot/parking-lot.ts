/* =========================
   Parking Lot Domain Model
   ========================= */

enum VehicleType {
  Bike = "Bike",
  Car = "Car",
  Truck = "Truck",
}

enum SpotType {
  Bike = "Bike",
  Compact = "Compact",
  Large = "Large",
}

enum GateType {
  Entry = "Entry",
  Exit = "Exit",
}

enum TicketStatus {
  Active = "Active",
  Paid = "Paid",
  Voided = "Voided",
}

enum PaymentMethod {
  Card = "Card",
  Cash = "Cash",
  Mobile = "Mobile",
}

type Money = number; // use cents in production

type UUID = string;

function uid(prefix = "id"): UUID {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`;
}

interface Vehicle {
  plate: string;
  type: VehicleType;
}

interface Gate {
  id: string;
  type: GateType;
  name?: string;
}

interface ParkingSpot {
  id: string;
  type: SpotType;
  /** Precomputed walking/drive distance to each gate (lower is nearer). */
  distances: Record<string, number>; // gateId -> distance metric
  occupiedBy?: string; // ticketId
}

interface Ticket {
  id: string;
  vehicle: Vehicle;
  spotId: string;
  entryGateId: string;
  entryTime: Date;
  status: TicketStatus;
  exitTime?: Date;
  amountPaid?: Money;
  exitGateId?: string;
}

interface Receipt {
  ticketId: string;
  vehiclePlate: string;
  spotId: string;
  entryTime: Date;
  exitTime: Date;
  method: PaymentMethod;
  charged: Money;
}

/* =========================
   Allocation & Capability
   ========================= */

// Which spot types can a vehicle use?
const VEHICLE_SPOT_COMPATIBILITY: Record<VehicleType, SpotType[]> = {
  [VehicleType.Bike]: [SpotType.Bike, SpotType.Compact, SpotType.Large],
  [VehicleType.Car]: [SpotType.Compact, SpotType.Large],
  [VehicleType.Truck]: [SpotType.Large],
};

/* =========================
   Pricing Strategy
   ========================= */

interface PricingStrategy {
  computeFee(start: Date, end: Date, vehicleType: VehicleType): Money;
}

class DurationWithDailyCapPricing implements PricingStrategy {
  private readonly initFee: Money = 1; // initialization fee

  private perHour: Record<VehicleType, Money> = {
    [VehicleType.Bike]: 1,
    [VehicleType.Car]: 3,
    [VehicleType.Truck]: 5,
  };

  private dailyCap: Record<VehicleType, Money> = {
    [VehicleType.Bike]: 5,
    [VehicleType.Car]: 15,
    [VehicleType.Truck]: 20,
  };

  // bill per-minute at hourly rate; cap for each 24h slice
  computeFee(start: Date, end: Date, vehicleType: VehicleType): Money {
    if (end <= start) return 0;
    const rate = this.perHour[vehicleType];
    const cap = this.dailyCap[vehicleType];
    if (rate === undefined || cap === undefined) {
      throw new Error(`Unsupported vehicle type: ${vehicleType}`);
    }

    const ms = end.getTime() - start.getTime();
    const mins = Math.ceil(ms / (1000 * 60));
    const hours = Math.ceil(mins / 60);
    const days = Math.floor(hours / 24);
    const remHours = hours % 24;

    let total = days * cap + Math.min(remHours * rate, cap);
    if (total > 0) total += this.initFee;
    return total;
  }
}

/* =========================
   Payment Processor (mock)
   ========================= */

interface PaymentProcessor {
  charge(
    amount: Money,
    method: PaymentMethod,
    meta?: Record<string, string>
  ): Promise<void>;
}

class MockPaymentProcessor implements PaymentProcessor {
  async charge(amount: Money, method: PaymentMethod): Promise<void> {
    if (amount < 0) throw new Error("Invalid charge amount");
    // integrate with PSP here
    return;
  }
}

/* =========================
   ParkingLot Implementation
   ========================= */

class ParkingLot {
  private gates = new Map<string, Gate>();
  private spots = new Map<string, ParkingSpot>();
  private tickets = new Map<string, Ticket>();

  constructor(
    gates: Gate[],
    spots: ParkingSpot[],
    private pricing: PricingStrategy = new DurationWithDailyCapPricing(),
    private payments: PaymentProcessor = new MockPaymentProcessor()
  ) {
    gates.forEach((g) => this.registerGate(g));
    spots.forEach((s) => this.registerSpot(s));
  }

  /* -------- Registry -------- */

  registerGate(gate: Gate) {
    this.gates.set(gate.id, gate);
  }

  registerSpot(spot: ParkingSpot) {
    // sanity: must have distances for all gates to use "nearest" allocation
    if (Object.keys(spot.distances).length === 0) {
      throw new Error(`Spot ${spot.id} must define distances to gates`);
    }
    this.spots.set(spot.id, spot);
  }

  /* -------- Queries -------- */

  getTicket(ticketId: string): Ticket | undefined {
    return this.tickets.get(ticketId);
  }

  spotStatus() {
    const total = this.spots.size;
    const occupied = Array.from(this.spots.values()).filter(
      (s) => s.occupiedBy
    ).length;
    return { total, occupied, free: total - occupied };
  }

  enter(vehicle: Vehicle, entryGateId: string): Ticket {
    const gate = this.gates.get(entryGateId);
    if (!gate || gate.type !== GateType.Entry) {
      throw new Error(`Invalid entry gate: ${entryGateId}`);
    }

    const spot = this.findNearestAvailableSpot(vehicle.type, entryGateId);
    if (!spot)
      throw new Error(`No available spot for vehicle type ${vehicle.type}`);

    const ticket: Ticket = {
      id: uid("tkt"),
      vehicle,
      spotId: spot.id,
      entryGateId,
      entryTime: new Date(),
      status: TicketStatus.Active,
    };

    // occupy spot
    spot.occupiedBy = ticket.id;
    this.spots.set(spot.id, spot);
    this.tickets.set(ticket.id, ticket);

    this.openGate(entryGateId);
    return ticket;
  }

  async exit(
    ticketId: string,
    exitGateId: string,
    method: PaymentMethod
  ): Promise<Receipt> {
    const gate = this.gates.get(exitGateId);
    if (!gate || gate.type !== GateType.Exit) {
      throw new Error(`Invalid exit gate: ${exitGateId}`);
    }

    const ticket = this.tickets.get(ticketId);
    if (!ticket) throw new Error(`Ticket not found: ${ticketId}`);
    if (ticket.status !== TicketStatus.Active)
      throw new Error(`Ticket is not active`);

    const exitTime = new Date();
    const amount = this.pricing.computeFee(
      ticket.entryTime,
      exitTime,
      ticket.vehicle.type
    );

    await this.payments.charge(amount, method, { ticketId });

    // free spot
    const spot = this.spots.get(ticket.spotId);
    if (!spot) throw new Error(`Spot not found for ticket ${ticketId}`);
    spot.occupiedBy = undefined;
    this.spots.set(spot.id, spot);

    // update ticket
    ticket.status = TicketStatus.Paid;
    ticket.amountPaid = amount;
    ticket.exitTime = exitTime;
    ticket.exitGateId = exitGateId;
    this.tickets.set(ticket.id, ticket);

    this.openGate(exitGateId);

    const receipt: Receipt = {
      ticketId: ticket.id,
      vehiclePlate: ticket.vehicle.plate,
      spotId: ticket.spotId,
      entryTime: ticket.entryTime,
      exitTime,
      method,
      charged: amount,
    };
    return receipt;
  }

  // private helpers

  private findNearestAvailableSpot(
    vehicleType: VehicleType,
    gateId: string
  ): ParkingSpot | undefined {
    const allowed = new Set(VEHICLE_SPOT_COMPATIBILITY[vehicleType]);
    let best: ParkingSpot | undefined;
    let bestDist = Number.POSITIVE_INFINITY;

    for (const spot of this.spots.values()) {
      if (spot.occupiedBy) continue;
      if (!allowed.has(spot.type)) continue;
      const d = spot.distances[gateId];
      if (d === undefined) continue; // if no distance for gate, skip
      if (d < bestDist || (d === bestDist && spot.id < (best?.id ?? ""))) {
        best = spot;
        bestDist = d;
      }
    }
    return best;
  }

  private openGate(gateId: string) {
    // Hook for hardware integration; here we just log.
    // console.log(`Gate ${gateId} opened`);
  }
}

/* =========================
   Example Usage (commented)
   ========================= */
/*
const gates: Gate[] = [
  { id: "E1", type: GateType.Entry, name: "North Entry" },
  { id: "X1", type: GateType.Exit, name: "North Exit" },
  { id: "E2", type: GateType.Entry, name: "South Entry" },
  { id: "X2", type: GateType.Exit, name: "South Exit" },
];

const spots: ParkingSpot[] = [
  { id: "S1", type: SpotType.Compact, distances: { E1: 10, X1: 10, E2: 40, X2: 40 } },
  { id: "S2", type: SpotType.Large,   distances: { E1: 20, X1: 20, E2: 30, X2: 30 } },
  { id: "S3", type: SpotType.Bike,    distances: { E1: 5,  X1: 5,  E2: 50, X2: 50 } },
];

const lot = new ParkingLot(gates, spots);

// Entry
const tkt = lot.enter({ plate: "ABC-123", type: VehicleType.Car }, "E1");

// ...time passes...

// Exit
lot.exit(tkt.id, "X1", PaymentMethod.Card).then((receipt) => {
  console.log(receipt);
});
*/

export {
  ParkingLot,
  VehicleType,
  SpotType,
  GateType,
  PaymentMethod,
  TicketStatus,
  type Vehicle,
  type Gate,
  type ParkingSpot,
  type Ticket,
  type Receipt,
};

// TODOS: flow diagram
