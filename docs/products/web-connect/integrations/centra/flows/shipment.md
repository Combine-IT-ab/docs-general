# Shipment Flow

**Direction:** BC → Centra
**Purpose:** Notify Centra when orders are shipped and trigger payment capture.

---

## Overview

When an order is shipped in Business Central, Web Connect automatically sends shipment details to Centra. This updates the order status and can trigger payment capture by the payment service provider.

The flow involves three steps:
1. **Create shipment** — Record which items are being shipped
2. **Complete shipment** — Mark the shipment as complete
3. **Capture payment** — Trigger payment authorization/capture (if configured)

---

## How It Works

**Trigger:** Posted Sales Shipment created in BC
**API operations:** `createShipment` (with shipped date, tracking and an optional capture flag), and `captureOrder` when capture is done as a separate step

**Objects used:**

| Object | Role |
|---|---|
| `CA_SHIPMENT` | Creates the shipment in Centra (`createShipment`) |
| `CA_SHIPMENTINPUT` | Order, shipped lines, shipped date, and the flags `isGoodToGo`, `isPaid` and `capture` |
| `CA_SHIPMENTINFO` | Carrier, service, tracking number and return tracking number |
| `CA_CONFIRM_SHIPPEDORDER` | Confirms the order in Centra (`confirmOrder`) as part of the shipment flow |
| `CA_CAPTURESHIPMENT` | Requests payment capture for the order (`captureOrder`) |

**Process steps:**

1. Warehouse posts a Sales Shipment in BC
2. Web Connect detects the shipment creation
3. Web Connect sends `createShipment` to Centra with the shipped lines, shipped date, carrier and tracking number
4. Centra registers the shipment → order status: CONFIRMED → PROCESSING
5. If capture is used, it is requested with the capture flag on the shipment or with `captureOrder`
6. Centra's payment provider captures the payment
7. Order moves toward `COMPLETED` status once all lines are shipped

**Sequence diagram:**

```mermaid
sequenceDiagram
    participant BC as 🔄 Business Central
    participant WC as ⚙️ Web Connect
    participant CE as 🛒 Centra

    BC-->>WC: Posted Sales Shipment created
    WC->>CE: createShipment (order, lines, shipped date, tracking)
    CE-->>WC: Shipment created
    WC->>CE: captureOrder (if capture is used)
    CE-->>CE: PSP payment capture triggered
    CE-->>CE: Order status: CONFIRMED → PROCESSING
```

---

## Variants

### Variant A — Full Shipment with Capture (Standard)

All ordered items are shipped and payment is captured in one transaction.

### Variant B — Partial Shipments

Only some items are shipped. The remaining items stay allocated until a subsequent shipment or cancellation.

### Variant C — Shipment Without Capture

Some customers handle payment separately and do not want automatic capture triggered.

---

## Configuration Notes

- **Shipment trigger:** Posted Sales Shipment (table 110) detects when goods are shipped
- **Carrier/tracking:** Shipping agent and service codes can be included if configured
- **Multiple shipments:** An order can have multiple shipments — each is sent to Centra separately

---

## Error Handling

| Step | What can go wrong | What happens |
|---|---|---|
| Detecting shipment | Web Connect not monitoring Sales Shipment | Shipment is never sent to Centra |
| Creating shipment | Order not CONFIRMED in Centra | API returns error; shipment not created |
| Completing shipment | Centra API unavailable | Job Queue entry fails; retried on next run |
| Capturing payment | PSP unavailable or auth expired | Capture fails; warning returned but shipment is recorded |

---

**Related:**
[Overview](../overview.md) · [Order — Inbound](order-inbound.md) · [Cancellation](cancellation.md) · [How-to](../../../../../how-to/web-connect/README.md)
