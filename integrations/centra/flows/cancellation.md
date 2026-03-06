# Cancellation Flow

**Direction:** BC → Centra
**Purpose:** Cancel orders or individual order lines in Centra when cancelled in Business Central (optional).

---

## Overview

This flow is **optional** and used only when BC initiates order cancellations that must be reflected in Centra. It allows warehouse staff or other users in BC to cancel orders that have not yet been shipped, with the cancellation automatically communicated back to Centra.

Not all customers need this flow. It is useful when:

- Orders can be cancelled in BC before shipping
- Customers have requested refunds or cancellations
- Warehouse staff need to cancel orders via BC instead of Centra

---

## How It Works

**Trigger:** Manual — when an order is cancelled in BC (configurable)
**API operation:** `cancelOrder` or `cancelOrderLine` mutation in Centra

**Objects used:**

| Object | Role |
|---|---|
| `CA_CANCEL_ORDER` | Cancels an entire order in Centra |
| `CA_CANCELORDERLINE` | Cancels individual order lines in Centra |

**Process steps:**

1. Order is manually cancelled in BC (e.g. status changed to "Cancelled", order deleted, or specific flag set)
2. Web Connect detects the cancellation
3. Web Connect determines if entire order or specific lines should be cancelled
4. `cancelOrder` or `cancelOrderLine` is sent to Centra
5. Centra cancels the order/lines and updates status to `CANCELLED`
6. Cancellation is recorded and customer may be notified (depends on Centra configuration)

**Sequence diagram:**

```mermaid
sequenceDiagram
    participant BC as 🔄 Business Central
    participant WC as ⚙️ Web Connect
    participant CE as 🛒 Centra

    BC-->>WC: Order cancelled (status change or deletion)
    WC->>WC: Determine scope (full order or specific lines)
    alt Cancel entire order
        WC->>CE: cancelOrder (order ID)
        CE-->>CE: Order status → CANCELLED
    else Cancel specific lines
        WC->>CE: cancelOrderLine (order ID, line IDs)
        CE-->>CE: Lines cancelled; order status updated
    end
    CE-->>CE: Cancellation recorded
```

---

## Cancellation States

An order can be cancelled at different stages:

| Status | Can be cancelled? | Effect |
|---|---|---|
| **PENDING** | Yes | Cancels before confirmation |
| **CONFIRMED** | Yes | Cancels after confirmation but before shipment |
| **PROCESSING** | Yes (partial) | Can cancel unshipped lines; shipped lines cannot be cancelled |
| **COMPLETED** | No | All lines shipped; cancellation not possible |
| **CANCELLED** | Already done | No effect |

---

## Full Order vs. Line Cancellation

### Full Order Cancellation

Cancels the entire order in Centra. Used when the entire order should not be processed.

Requirements:
- Order is still in PENDING or CONFIRMED state
- No lines have been shipped yet (or all lines are being cancelled)

### Line-Level Cancellation

Cancels only specific order lines. Used when the customer wants only some items cancelled.

Requirements:
- Order can have any status except COMPLETED
- Already-shipped lines cannot be cancelled retroactively
- Remaining unshipped lines continue processing

---

## Variants

### Variant A — Manual Cancellation (Standard)

Order is manually cancelled in BC by warehouse staff. Cancellation is sent to Centra immediately.

### Variant B — Automatic Cancellation Based on Business Logic

Cancellation is triggered automatically based on specific conditions:
- Item goes out of stock
- Order has been CONFIRMED for more than X days
- Specific order flag is set

### Variant C — No Cancellation Support

This flow is not enabled. Cancellations must be handled directly in Centra. BC order status is updated separately.

---

## Configuration Notes

- **Trigger condition:** What in BC triggers a cancellation? (status field, deletion, specific flag)
- **Scope:** Should entire orders or individual lines be cancellable?
- **Timing:** When should the cancellation be sent? (immediately or with a delay)
- **Permissions:** Who in BC is allowed to trigger cancellations?

---

## Error Handling

| Step | What can go wrong | What happens |
|---|---|---|
| Detecting cancellation | Cancellation trigger not configured correctly | Cancellation goes undetected |
| Sending cancellation | Order not found in Centra | API returns error; cancellation fails |
| Sending cancellation | Order already shipped | Centra rejects full cancellation; try line-level instead |
| Sending cancellation | Centra API unavailable | Job Queue entry fails; retried on next run |

---

## When NOT to Use This Flow

- All cancellations are handled exclusively in Centra
- BC orders should never be cancelled
- Customer prefers to manage cancellations manually in Centra without BC integration

---

**Related:**
[Overview](../overview.md) · [Order — Inbound](order-inbound.md) · [Shipment](shipment.md) · [Authentication](../authentication.md)
