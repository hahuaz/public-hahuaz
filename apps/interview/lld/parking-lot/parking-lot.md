# 1) Scope & assumptions

* Vehicle types: bike, car, truck, EV.
* Spot types: MOTORBIKE, COMPACT, LARGE, EV, HANDICAP.
* Multi-floor lot with multiple entry/exit gates.
* Assign the nearest suitable available spot at entry.
* Ticket at entry, pricing at exit (base + per hour, configurable).
* Payments: cash, card, online
* Not supporting: reservation, monthly passes, pre-booking, loyalty

# 2) Core requirements

**Functional**

* Issue ticket, assign spot, open/close gate.
* Show live availability per floor/type.
* Compute fee and process payment; release spot.
* Admin: add/remove floors, enable/disable spots.

**Non-functional**

* idempotent APIs
* scalability, availability, latency
* Auditable transactions: who did what and when in which context.
* Entry decision latency (gate request → assigned spot) < 2s.

# 3) Key entities & relationships (OO view)

```
ParkingLot
 ├─ List<Floor>
Floor
 ├─ Map<SpotType, SpotPool>     // fast retrieval by type
Spot
 ├─ id, type, state {AVAILABLE, HELD, OCCUPIED, OUT_OF_SERVICE}, floorId
Vehicle
 ├─ plate, type
Ticket
 ├─ id, vehicle, spotId, entryTime, exitTime?, status {OPEN, PAID, LOST}
Gate
 ├─ id, kind {ENTRY, EXIT}, floor proximity
RateCard / PricingStrategy
Payment
 ├─ ticketId, amount, method, status
```

# 4) Spot assignment algorithm (fast + safe)

* Maintain **one priority queue per (floor, spotType)** ordered by distance from the gate (or a simple stack if “nearest” ≈ “any”).
* **State machine** per spot: `AVAILABLE → HELD → OCCUPIED → AVAILABLE`

  * On entry request: pop from PQ and **set HELD with TTL (e.g., 30s)** to avoid races across gates.
  * On gate pass / sensor confirmation: `HELD → OCCUPIED`.
  * If TTL expires without confirmation: `HELD → AVAILABLE` and push back to PQ.
* **Atomicity**: do the `AVAILABLE→HELD` transition with **compare-and-swap** (DB optimistic locking or Redis SETNX with expiry). This solves multi-gate contention.

# 5) Pricing (Strategy pattern)

* `PricingStrategy.compute(start, end, vehicleType)`
  Supports: free minutes, base fee, hourly rate, daily cap, weekend rules.

# 6) APIs (idempotent, minimal)

* `POST /entry/scan`
  **Req:** plate, vehicleType, gateId
  **Resp:** ticketId, spotId, floor, guidance
* `POST /entry/confirm`
  **Req:** ticketId  → transitions spot HELD→OCCUPIED
* `GET  /availability?floor=F` → counts by spot type
* `GET  /exit/quote?ticketId=T` → price breakdown
* `POST /exit/pay`
  **Req:** ticketId, method
  **Effect:** mark PAID, release spot (OCCUPIED→AVAILABLE), open gate
* `PATCH /admin/spot/{id}` enable/disable

# 7) DB schema (relational; keep it simple)

```
spots(id PK, floor_id, type, state, distance_from_gate, updated_at)
tickets(id PK, plate, vehicle_type, spot_id FK, entry_time, exit_time, status)
payments(id PK, ticket_id FK, amount, method, status, txn_ref, created_at)
rates(id PK, vehicle_type, base, per_hour, free_minutes, daily_cap, weekend_mult)
gates(id PK, kind, floor_id)
```

**Indexes**: `(floor_id, type, state)`, `tickets(plate, status)`, `tickets(entry_time)`.

# 8) Class sketch


# 9) Entry & exit sequence (what you *say* on the whiteboard)

**Entry**

1. Gate scans plate → `/entry/scan`
2. `SpotManager`: pick suitable pool (by vt→spotType mapping), **holdSpot** (TTL).
3. Create **OPEN** ticket with `spotId, entryTime`.
4. Return guidance; when beam is broken/sensor fires → `/entry/confirm` → `OCCUPIED`.

**Exit**

1. Driver provides ticket/plate → `/exit/quote` (compute via `PricingStrategy`).
2. `/exit/pay` stores payment, sets ticket `PAID`, sets `exitTime=now`, **release** spot (push back to pool).
3. Gate opens.

# 10) Concurrency & correctness

* **Optimistic locking** on `spots(state, updated_at)`; retry if version changed.
* Or **Redis**: `SET spot:{id} "HELD" NX EX=30`.
* **Idempotency keys** for `/entry/scan` and `/exit/pay`.
* **Out-of-service** spots removed from pools; reinsert when healthy.

# 11) Edge cases interviewers like

* Lost ticket ⇒ look up by **plate + last OPEN ticket**; require identity + fee cap.
* EV spot occupied but not charging (timeout policy).
* Gate camera misread ⇒ manual override flow.
* Peak surge → allow **overflow policy** (e.g., LARGE can take COMPACT? Usually *no*; explain policy flag).
* Partial payment failure → no release of spot/ticket remains OPEN.

# 12) Extensions (mention if time remains)

* Reservations (add `holds` table with start/end); dynamic pricing; multi-lot routing; analytics; SLA dashboards.

---

## 60-second summary you can *say*

“I’d model floors and typed spot pools, use a per-spot state machine with a **HELD TTL** to make assignment atomic across multiple gates, expose simple idempotent APIs, and calculate pricing via a Strategy. Availability is just counts over `spots` by type/state. Concurrency is handled with **optimistic locking/SETNX**, and I cover edge cases like lost tickets and out-of-service spots. Here’s the sequence: scan → hold → ticket → confirm; then quote → pay → release.”

If you want, tell me the language you’ll code in (Java, Python, TS), and I’ll turn this into a compact class/interface file you can paste into a coding round.


```ts
// parking-system.ts

/** ========== Enums & Core Types ========== */
export enum VehicleType { BIKE = "BIKE", CAR = "CAR", TRUCK = "TRUCK", EV = "EV" }
export enum SpotType { MOTORBIKE = "MOTORBIKE", COMPACT = "COMPACT", LARGE = "LARGE", EV = "EV", HANDICAP = "HANDICAP" }
export enum SpotState { AVAILABLE = "AVAILABLE", HELD = "HELD", OCCUPIED = "OCCUPIED", OUT_OF_SERVICE = "OUT_OF_SERVICE" }
export enum GateKind { ENTRY = "ENTRY", EXIT = "EXIT" }
export enum TicketStatus { OPEN = "OPEN", PAID = "PAID", LOST = "LOST" }
export enum PaymentMethod { CARD = "CARD" }
export enum PaymentStatus { AUTHORIZED = "AUTHORIZED", CAPTURED = "CAPTURED", FAILED = "FAILED" }

export type Money = number; 

/** ========== Entities ========== */
export interface Spot {
  id: string;
  floorId: number;
  type: SpotType;
  state: SpotState;
  distanceFromGate: number; // lower = nearer
  holdUntil?: number; // epoch ms when HELD expires
  version: number; // for optimistic locking
}

export interface Vehicle {
  plate: string;
  type: VehicleType;
}

export interface Ticket {
  id: string;
  vehicle: Vehicle;
  spotId: string;
  entryTime: Date;
  exitTime?: Date;
  status: TicketStatus;
}

export interface Payment {
  id: string;
  ticketId: string;
  amount: Money;
  method: PaymentMethod;
  status: PaymentStatus;
  createdAt: Date;
}

export interface Gate {
  id: string;
  kind: GateKind;
  floorId: number;
}

export interface Quote {
  ticketId: string;
  amount: Money;
  currency: string;
  breakdown?: Record<string, number>;
}

/** ========== Policies & Strategy ========== */
export interface PricingStrategy {
  compute(start: Date, end: Date, vehicleType: VehicleType): Money;
}

/** Default pricing: base + hourly */
export class DefaultPricing implements PricingStrategy {
  constructor(
    private readonly base: number = 2,
    private readonly perHour: number = 3,
    private readonly freeMinutes: number = 15,
    private readonly dailyCap: number = 30
  ) {}
  compute(start: Date, end: Date, vehicleType: VehicleType): Money {
    const ms = Math.max(0, end.getTime() - start.getTime());
    const minutes = ms / 60000;
    if (minutes <= this.freeMinutes) return 0;
    const hours = Math.ceil((minutes - this.freeMinutes) / 60);
    return Math.min(this.base + hours * this.perHour, this.dailyCap);
  }
}

/** Which spot types fit a vehicle type (can be replaced by a richer policy) */
export interface FitmentPolicy {
  suitableSpotTypes(v: VehicleType): SpotType[];
}
export class DefaultFitment implements FitmentPolicy {
  suitableSpotTypes(v: VehicleType): SpotType[] {
    switch (v) {
      case VehicleType.BIKE: return [SpotType.MOTORBIKE];
      case VehicleType.EV:   return [SpotType.EV, SpotType.COMPACT, SpotType.LARGE];
      case VehicleType.TRUCK:return [SpotType.LARGE];
      case VehicleType.CAR:
      default:               return [SpotType.COMPACT, SpotType.LARGE];
    }
  }
}

/** ========== Tiny Priority Queue (min-heap by distance) ========== */
class PriorityQueue<T> {
  private heap: T[] = [];
  constructor(private readonly less: (a: T, b: T) => boolean) {}
  size() { return this.heap.length; }
  peek(): T | undefined { return this.heap[0]; }
  push(x: T) { this.heap.push(x); this.bubbleUp(this.heap.length - 1); }
  pop(): T | undefined {
    if (this.heap.length === 0) return undefined;
    const top = this.heap[0];
    const last = this.heap.pop()!;
    if (this.heap.length > 0) { this.heap[0] = last; this.bubbleDown(0); }
    return top;
  }
  private bubbleUp(i: number) {
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (!this.less(this.heap[i], this.heap[p])) break;
      [this.heap[i], this.heap[p]] = [this.heap[p], this.heap[i]];
      i = p;
    }
  }
  private bubbleDown(i: number) {
    const n = this.heap.length;
    while (true) {
      let s = i;
      const l = 2 * i + 1, r = 2 * i + 2;
      if (l < n && this.less(this.heap[l], this.heap[s])) s = l;
      if (r < n && this.less(this.heap[r], this.heap[s])) s = r;
      if (s === i) break;
      [this.heap[i], this.heap[s]] = [this.heap[s], this.heap[i]];
      i = s;
    }
  }
}

/** ========== Repositories (in-memory for LLD) ========== */
const id = (() => { let n = 0; return (p: string) => `${p}_${++n}`; })();

export class SpotRepository {
  private readonly byId = new Map<string, Spot>();
  constructor(spots: Spot[] = []) { spots.forEach(s => this.byId.set(s.id, s)); }
  get(id: string) { return this.byId.get(id); }
  save(spot: Spot) { this.byId.set(spot.id, spot); }
  all(): Spot[] { return [...this.byId.values()]; }

  /** Optimistic CAS on state; returns updated spot or null on conflict */
  casState(spotId: string, expectedVersion: number, next: Partial<Spot>): Spot | null {
    const s = this.byId.get(spotId);
    if (!s || s.version !== expectedVersion) return null;
    const updated: Spot = { ...s, ...next, version: s.version + 1 };
    this.byId.set(spotId, updated);
    return updated;
  }
}

export class TicketRepository {
  private readonly byId = new Map<string, Ticket>();
  save(t: Ticket) { this.byId.set(t.id, t); }
  get(id: string) { return this.byId.get(id); }
  findOpenByPlate(plate: string): Ticket | undefined {
    return [...this.byId.values()].find(t => t.vehicle.plate === plate && t.status === TicketStatus.OPEN);
  }
}

export class PaymentRepository {
  private readonly byId = new Map<string, Payment>();
  save(p: Payment) { this.byId.set(p.id, p); }
  get(id: string) { return this.byId.get(id); }
}

/** ========== SpotManager ========== */
type PoolKey = string;
const poolKey = (floorId: number, type: SpotType): PoolKey => `${floorId}:${type}`;

export class SpotManager {
  /** One PQ per (floor, spotType) ordered by distance */
  private readonly pools = new Map<PoolKey, PriorityQueue<Spot>>();

  constructor(private spots: SpotRepository) {
    // Build pools from AVAILABLE spots only
    for (const s of this.spots.all()) {
      if (s.state !== SpotState.AVAILABLE) continue;
      const k = poolKey(s.floorId, s.type);
      if (!this.pools.has(k)) this.pools.set(k, new PriorityQueue<Spot>((a, b) => a.distanceFromGate < b.distanceFromGate));
      this.pools.get(k)!.push(s);
    }
  }

  /** Try to hold the nearest available spot in a given pool; HELD uses TTL */
  holdNearest(floorId: number, type: SpotType, ttlMs: number): Spot | null {
    const now = Date.now();
    const k = poolKey(floorId, type);
    const pq = this.pools.get(k);
    if (!pq || pq.size() === 0) return null;

    // pop candidates until we can successfully CAS to HELD
    while (pq.size() > 0) {
      const s = pq.pop()!;
      const fresh = this.spots.get(s.id);
      if (!fresh) continue;

      if (fresh.state !== SpotState.AVAILABLE) continue; // outdated
      const next = this.spots.casState(fresh.id, fresh.version, {
        state: SpotState.HELD,
        holdUntil: now + ttlMs
      });
      if (next) return next; // success
    }
    return null;
  }

  /** Confirm that the HELD spot is now OCCUPIED (sensor/beam) */
  confirmOccupy(spotId: string): void {
    const s = this.spots.get(spotId);
    if (!s) throw new Error("spot not found");
    if (s.state !== SpotState.HELD) throw new Error("spot not held");
    const ok = this.spots.casState(s.id, s.version, { state: SpotState.OCCUPIED, holdUntil: undefined });
    if (!ok) throw new Error("conflict when occupying");
  }

  /** Release the spot back to AVAILABLE and return it to the pool */
  release(spotId: string): void {
    const s = this.spots.get(spotId);
    if (!s) throw new Error("spot not found");
    const ok = this.spots.casState(s.id, s.version, { state: SpotState.AVAILABLE, holdUntil: undefined });
    if (!ok) throw new Error("conflict when releasing");
    const updated = this.spots.get(spotId)!;
    const k = poolKey(updated.floorId, updated.type);
    if (!this.pools.has(k)) this.pools.set(k, new PriorityQueue<Spot>((a, b) => a.distanceFromGate < b.distanceFromGate));
    this.pools.get(k)!.push(updated);
  }

  /** Garbage-collect expired holds (call periodically) */
  expireHolds(): void {
    const now = Date.now();
    for (const s of this.spots.all()) {
      if (s.state === SpotState.HELD && s.holdUntil && s.holdUntil <= now) {
        // move back to AVAILABLE
        const ok = this.spots.casState(s.id, s.version, { state: SpotState.AVAILABLE, holdUntil: undefined });
        if (ok) {
          const k = poolKey(ok.floorId, ok.type);
          if (!this.pools.has(k)) this.pools.set(k, new PriorityQueue<Spot>((a, b) => a.distanceFromGate < b.distanceFromGate));
          this.pools.get(k)!.push(ok);
        }
      }
    }
  }

  countsByFloor(floorId: number): Record<SpotType, number> {
    const counts: Record<SpotType, number> = {
      [SpotType.MOTORBIKE]: 0,
      [SpotType.COMPACT]: 0,
      [SpotType.LARGE]: 0,
      [SpotType.EV]: 0,
      [SpotType.HANDICAP]: 0
    };
    for (const s of this.spots.all()) {
      if (s.floorId === floorId && s.state === SpotState.AVAILABLE) counts[s.type]++;
    }
    return counts;
  }
}

/** ========== Services ========== */
export class TicketService {
  constructor(
    private readonly spotMgr: SpotManager,
    private readonly spots: SpotRepository,
    private readonly tickets: TicketRepository,
    private readonly payments: PaymentRepository,
    private readonly pricing: PricingStrategy,
    private readonly fitment: FitmentPolicy = new DefaultFitment(),
    private readonly holdTtlMs: number = 30_000
  ) {}

  /** Open a ticket: pick a suitable spot (nearest on same floor as gate for simplicity) */
  open(plate: string, vehicleType: VehicleType, gate: Gate): Ticket {
    const types = this.fitment.suitableSpotTypes(vehicleType);
    let held: Spot | null = null;
    for (const t of types) {
      held = this.spotMgr.holdNearest(gate.floorId, t, this.holdTtlMs);
      if (held) break;
    }
    if (!held) throw new Error("no suitable spot available");

    const ticket: Ticket = {
      id: id("tkt"),
      vehicle: { plate, type: vehicleType },
      spotId: held.id,
      entryTime: new Date(),
      status: TicketStatus.OPEN
    };
    this.tickets.save(ticket);
    return ticket;
  }

  /** Confirm car passed the gate; spot transitions HELD -> OCCUPIED */
  confirm(ticketId: string): void {
    const t = this.tickets.get(ticketId);
    if (!t || t.status !== TicketStatus.OPEN) throw new Error("ticket not open");
    this.spotMgr.confirmOccupy(t.spotId);
  }

  /** Price a ticket as of 'now' */
  quote(ticketId: string, now = new Date()): Quote {
    const t = this.tickets.get(ticketId);
    if (!t) throw new Error("ticket not found");
    const start = t.entryTime;
    const end = t.exitTime ?? now;
    const amount = this.pricing.compute(start, end, t.vehicle.type);
    return { ticketId: t.id, amount, currency: "USD" };
  }

  /** Pay and exit: mark PAID, release spot back to pool */
  pay(ticketId: string, method: PaymentMethod): Payment {
    const t = this.tickets.get(ticketId);
    if (!t || t.status !== TicketStatus.OPEN) throw new Error("ticket not open");
    const quote = this.quote(ticketId);
    const payment: Payment = {
      id: id("pay"),
      ticketId: t.id,
      amount: quote.amount,
      method,
      status: PaymentStatus.CAPTURED,
      createdAt: new Date()
    };
    this.payments.save(payment);

    // finalize ticket and release spot
    t.exitTime = new Date();
    t.status = TicketStatus.PAID;
    this.tickets.save(t);
    this.spotMgr.release(t.spotId);
    return payment;
  }
}

export class AvailabilityService {
  constructor(private readonly spotMgr: SpotManager) {}
  countsByFloor(floorId: number): Record<SpotType, number> {
    return this.spotMgr.countsByFloor(floorId);
  }
}

/** ========== Example wiring (remove in prod) ========== */
// const spotsRepo = new SpotRepository([
//   { id: "s1", floorId: 1, type: SpotType.COMPACT, state: SpotState.AVAILABLE, distanceFromGate: 10, version: 0 },
//   { id: "s2", floorId: 1, type: SpotType.LARGE,   state: SpotState.AVAILABLE, distanceFromGate: 20, version: 0 },
//   { id: "s3", floorId: 1, type: SpotType.EV,      state: SpotState.AVAILABLE, distanceFromGate: 15, version: 0 },
// ]);
// const mgr = new SpotManager(spotsRepo);
// const tRepo = new TicketRepository();
// const pRepo = new PaymentRepository();
// const pricing = new DefaultPricing();
// const svc = new TicketService(mgr, spotsRepo, tRepo, pRepo, pricing);
// const gate: Gate = { id: "g1", kind: GateKind.ENTRY, floorId: 1 };
// const ticket = svc.open("34-ABC-99", VehicleType.CAR, gate);
// svc.confirm(ticket.id);
// const q = svc.quote(ticket.id);
// const pay = svc.pay(ticket.id, PaymentMethod.CARD);
// console.log({ ticket, q, pay, avail: mgr.countsByFloor(1) });
```

### Notes

* **CAS/TTL** are modeled in-memory via `version` and `holdUntil`; swap with DB row-version or Redis `SETNX EX` in real deployments.
* `PriorityQueue` orders by `distanceFromGate` to approximate “nearest spot”.
* Policies (`PricingStrategy`, `FitmentPolicy`) are pluggable for interview extensibility.
* APIs (HTTP) would thinly wrap `TicketService` and `AvailabilityService`.

If you want this split into multiple files (types, repos, services) or converted into NestJS services/controllers, say the word and I’ll refactor it.
