# Stock Update Flow

**Direction:** BC → Centra
**Purpose:** Keep stock levels in Centra in sync with available inventory in Business Central.

---

## Overview

Centra displays stock levels to customers when they browse products. Stock levels are synchronized from Business Central to Centra automatically whenever inventory changes.

---

## How It Works

**Trigger:** Automatic — inventory changes in BC (sales orders, purchases, transfers, adjustments)
**API operation:** Stock update mutation via GraphQL

**Triggered by (Web Connect monitors these):**

| BC Table | Event | Why |
|---|---|---|
| Item Ledger Entry | After posting | Inventory decreases when sales ship; increases when purchases arrive |
| Sales Line | Line created/modified | Available stock decreases when order is created |
| Purchase Line | Line created/modified | Available stock increases when purchase is scheduled |
| Transfer Line | Line created/modified | Inventory allocated between locations |

**Process steps:**

1. Inventory event occurs in BC
2. Web Connect detects the change
3. Product is identified in Centra using a product lookup (EAN → Centra product ID)
4. Current available stock is calculated in BC
5. If stock is negative → `0` is sent (Centra does not accept negative values)
6. Stock level is sent to Centra via GraphQL mutation

---

## Stock Calculation

The stock sent to Centra represents **available inventory**:

- Starting point: Item quantity on hand in BC
- Minus: Quantities reserved by sales orders and transfers
- Result: Free/available quantity

**Negative stock handling:** If calculated stock is below zero, `0` is sent to Centra instead.

---

## Variants

### Variant A — EAN-based Lookup (Standard)

Items are matched using EAN codes. The EAN is looked up in a configured mapping to find the Centra product ID.

### Variant B — Warehouse-specific Stock

Stock is calculated per warehouse and sent separately for each location in Centra.

---

## Error Handling

| Step | What can go wrong | What happens |
|---|---|---|
| Product lookup | EAN not found in mapping | Update skipped; Centra stock unchanged |
| Sending update | Centra API error | Job Queue entry fails; retried on next run |

---

**Related:**
[Overview](../overview.md) · [Product Data](product-data.md) · [How-to](../../../../../how-to/web-connect/README.md)
