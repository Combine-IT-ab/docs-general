# Web Connect Item Inventory

> **BC view name:** Web Connect Webblagersaldo

## Overview

Web Connect Item Inventory is the staging view where all calculated inventory data is collected before being sent to external systems.

Values shown here are **not entered manually** — they are calculated based on the setup in [Web Connect Destinations](destinations.md) and [Web Connect Dynamic Flow Fields](dynamic-flow-fields.md).

This view acts as the inventory layer between BC inventory data, [Web Connect Outgoing Data](outgoing-mapping/outgoing-data-web.md), and external systems (e-commerce, WMS, POS, etc.).

## Purpose

Use this view to:

- Review calculated web inventory per item
- Verify next available date calculations
- Manually trigger recalculations
- Control forced exports
- Monitor when and why inventory updates are triggered

This view does **not** control inventory logic, send timing, or mapping rules. Those are configured in [Web Connect Destinations](destinations.md) and [Web Connect Outgoing Sync Triggers](outgoing-mapping/outgoing-sync-triggers.md).

## How Inventory Values Are Calculated

Inventory values are calculated using Dynamic Flow Fields defined in Web Connect Destinations and standard BC inventory data (Item Ledger Entries, Sales Lines, Transfer Lines, etc.).

Typical logic:

- Inventory
- Minus quantities on Sales Orders
- Minus quantities on Transfer Orders

Optional:

- Next Available Date
- BOM-based availability
- Planning data by event

## Actions

| Action | Description |
|--------|-------------|
| **Calculate Item Inventory** | Manually triggers recalculation of web inventory values. |
| **Calculate Next Available Date** | Manually recalculates the next available date based on demand and supply. |
| **Calculate Availability from BOM** | Recalculates availability using BOM logic instead of standard inventory logic. |

These actions are useful after configuration changes, mapping updates, or inventory corrections in BC.

## Fields

| Field | Description |
|-------|-------------|
| **Item No.** | Item number in Business Central. |
| **Variant Code** | Variant code for the item (if variants are used). |
| **Warehouse Code** | Warehouse/location code based on Destinations setup. |
| **Web Inventory** | The calculated inventory value. |
| **Next Available Date** | The next date when inventory becomes available. Empty if not enabled. |
| **Last Changed** | Date and time when the calculated value last changed. |
| **Triggered At** | Date and time when the inventory update was last triggered. |
| **Triggered By** | Which object triggered the calculation (based on Outgoing Sync Triggers). |
| **Triggered By Event** | Which event caused the trigger (e.g. Modify, Job Queue). |
| **Triggered By Record** | Which record caused the trigger (e.g. Sales Line, Transfer Line). |
| **Force Export** | Forces the inventory to be exported even if the value has not changed. |

## Relationship to Outgoing Data

Web Connect Item Inventory does not send data directly. The flow is:

1. Inventory is calculated and stored here
2. Outgoing Sync Triggers detect changes
3. Entries are created in Web Connect Outgoing Data
4. Job Queue creates Web Connect Entries
5. Data is sent to the external system

## Related

- [Web Connect Destinations](destinations.md)
- [Web Connect Dynamic Flow Fields](dynamic-flow-fields.md)
- [Web Connect Outgoing Sync Triggers](outgoing-mapping/outgoing-sync-triggers.md)
- [Web Connect Outgoing Data](outgoing-mapping/outgoing-data-web.md)
