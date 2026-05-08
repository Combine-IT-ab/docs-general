# Web Connect Dynamic Flow Fields

> **BC view name:** Web Connect Dynamiska flödesfält

## Overview

Web Connect Dynamic Flow Fields are used to calculate or construct values in Microsoft Business Central that cannot be achieved through simple field mappings.

They allow you to build dynamic values based on BC data, table relationships, and logic — and use those values in outgoing or incoming Web Connect processes.

## Purpose

Dynamic Flow Fields are commonly used to:

- Calculate available inventory to send to e-commerce or POS systems
- Build tracking URLs by combining carrier links with shipment data
- Derive values that do not exist directly on a record (for example, EAN codes from Item References)
- Aggregate or transform data before it is sent to an external system

Unlike mappings, Dynamic Flow Fields do not write data back to Business Central — they calculate values that are consumed by Web Connect.

## Dynamic Flow Field Header

Each Dynamic Flow Field starts with a header definition.

| Field | Description |
|-------|-------------|
| **Code** | Unique identifier for the Dynamic Flow Field. |
| **Description** | User-friendly description explaining what the field calculates. |
| **Fixed Value** | Optional fixed value. Typically left blank. |
| **Table Name** | The table context where the calculation starts (same as the Web Object table). |
| **Table No.** | Table number corresponding to the Table Name. |
| **Field Type** | The result type: Text, Date, DateTime, Integer, Decimal, or Boolean. |

## Flow Field Lines (Calculation Logic)

The Flow Field Lines define how the value is calculated. Each line represents one step in the calculation.

| Field | Description |
|-------|-------------|
| **Entry No.** | Order in which the calculation steps are applied. |
| **Header Object** | Same table context as defined in the header. |
| **Condition Code** | Optional condition that must be fulfilled for the line to run. See [Web Connect Condition List](condition-list.md). |
| **Flow Calculation** | How the value is applied: Plus, Minus, Multiply, or Divide. |
| **Relation Code** | Defines how to relate data from another table (required when the value does not exist on the header table). |
| **Table Key** | Key used to retrieve records. 0 = Primary Key (default). |
| **Table No.** | Table number of the related data source. |
| **Field No.** | Field number of the related value to retrieve. |
| **Dynamic Flow Field** | Allows chaining another Dynamic Flow Field instead of a direct field. |
| **Field Calculation** | Lookup logic: Lookup, Lookup (Last), Sum, Count, or Exists. |
| **Field Name** | Display name of the related field (informational). |

## Common Examples

### Example A — Available Inventory (Web Inventory)

**Purpose:** Calculate how much inventory is available for sale by subtracting outstanding demand from physical inventory.

**Header setup:**

- Code: `INVENTORY`
- Description: Calculate inventory to site
- Table Name: WCM Item Inventory
- Field Type: Decimal

**Calculation logic:**

Available Inventory = Inventory − Qty. on Sales Orders − Qty. on Transfer Orders

| Flow Calculation | Source Table | Field | Description |
|-----------------|--------------|-------|-------------|
| Add (+) | Item (Table 27) | Inventory | Physical inventory in BC |
| Subtract (−) | Item (Table 27) | Qty. on Sales Orders | Reserved quantity on sales orders |
| Subtract (−) | Item (Table 27) | Qty. on Transfer Orders | Quantity reserved for transfers |

A Relation Code links the Web Connect Item Inventory object to the Item table, since inventory values do not exist directly on the Web Connect table.

The calculated value is stored as **Web Inventory** in [Web Connect Item Inventory](item-inventory.md) and recalculated automatically when underlying data changes.

### Example B — Tracking URL Generation

- Base URL retrieved from shipping agent setup
- Combined with Package No. or Tracking No. from Shipment Header

### Example C — Variant EAN Resolution

- EAN looked up from the Item Reference table
- Returned dynamically per Item Variant

## Where Dynamic Flow Fields Are Used

Dynamic Flow Fields can be referenced in:

- [Web Connect Destinations](destinations.md)
- [Web Connect Outgoing Data](outgoing-mapping/outgoing-data-web.md)
- [Web Connect Objects](objects.md)
- Inventory and price calculations
- Custom outbound payload structures

## Related

- [Web Connect Destinations](destinations.md)
- [Web Connect Condition List](condition-list.md)
- [Web Connect Item Inventory](item-inventory.md)
- [Web Connect Objects](objects.md)
