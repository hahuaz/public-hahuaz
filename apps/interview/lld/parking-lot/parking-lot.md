LLD for Parking Lot System

# Question and assumptions
- what are the vehicle types? bike, car, truck, EV?
- what are the spot types? bike, compact, large, EV, handicap?
- is there multiple floors? yes
- is there multiple entry/exit gates? yes
- what is placement strategy for a vehicle? nearest available
- how do you plan to get payment? cash, card, online?
- Not supporting: reservation, loyalty

# Requirements

**Functional**
- On entry:
1. save plate, vehicle type, entry time
2. assign nearest available spot 
3. issue ticket (id, spot, floor)
4. open gate via hardware signal
- On exit:
1. verify ticket/plate
2. compute fee
3. process payment
4. create receipt
5. release spot
6. open gate via hardware signal
- Admin actions: add/remove floors, enable/disable spots.
- show live availability per floor/type.

**Non-functional**

* idempotent APIs
* scalability, availability, latency
* Auditable transactions: who did what and when in which context.
* Entry decision latency (gate request → assigned spot) < 2s.

# Entities

# Entity relationships


# Nearest spot assignment algorithm


# APIs (assume REST/JSON)

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


# Edge cases, unhappy paths and errors

* Lost ticket:
* Gate camera misread: manual override flow.


