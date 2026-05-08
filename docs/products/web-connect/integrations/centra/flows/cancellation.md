# Cancellation Flow

**Direction:** BC → Centra
**Purpose:** Cancel orders or individual order lines in Centra when cancelled in Business Central (optional).

---

## Overview

This flow is **optional** and used only when BC initiates order cancellations that must be reflected in Centra. Not all customers need this flow.

---

## How It Works

**Trigger:** Manual — when an order is cancelled in BC (configurable)
**API operation:** `cancelOrder` or `cancelOrderLine` mutation in Centra

**Objects used:**

| Object | Role |
|---|---|
| `CA_CANCEL_ORDER` | Cancels an entire order in Centra |
| `CA_CANCELORDERLINE` | Cancels individual order lines in Centra |

**Cancellation States:**

| Status | Can be cancelled? |
|---|---|
| **PENDING** | Yes |
| **CONFIRMED** | Yes |
| **PROCESSING** | Yes (unshipped lines only) |
| **COMPLETED** | No |

---

## Variants

### Variant A — Manual Cancellation (Standard)

Order is manually cancelled in BC. Cancellation is sent to Centra immediately.

### Variant B — Automatic Cancellation Based on Business Logic

Triggered automatically based on specific conditions (e.g. item out of stock, order stale).

### Variant C — No Cancellation Support

Cancellations handled directly in Centra; this flow is not enabled.

---

## Error Handling

| Step | What can go wrong | What happens |
|---|---|---|
| Sending cancellation | Order already shipped | Centra rejects full cancellation; try line-level instead |
| Sending cancellation | Centra API unavailable | Job Queue entry fails; retried on next run |

---

**Related:**
[Overview](../overview.md) · [Order — Inbound](order-inbound.md) · [Shipment](shipment.md) · [How-to](../../../../../how-to/web-connect/README.md)
