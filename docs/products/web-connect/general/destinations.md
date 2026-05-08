# Web Connect Destinations

> **BC view name:** Web Connect Destinations

## Overview

Web Connect Destinations define how inventory and price data is calculated and grouped before being sent to external systems.

A destination represents a logical "view" of inventory or pricing — typically a combination of warehouse locations and/or price lists that maps to a single concept in the external system (e.g. "Stock for the web shop").

## Destination Types

### Warehouse Destination

Groups one or more Business Central locations into a single inventory pool. Used to calculate the combined available stock for a web channel.

### Price List Destination

Groups one or more BC price lists and defines how prices are presented to the external system.

## Fields — General

| Field | Description |
|-------|-------------|
| **Code** | Unique identifier for the destination. |
| **Description** | Human-readable name. |
| **Type** | Warehouse or Price List. |
| **Integration Code** | The integration this destination belongs to. |
| **Enabled** | Whether the destination is active. |

## Fields — Inventory

| Field | Description |
|-------|-------------|
| **Location Codes** | One or more BC location codes included in this inventory pool. |
| **Include Negative Inventory** | Whether to include negative stock values. |
| **Minimum Inventory** | Minimum value sent — values below this are set to 0. |
| **Maximum Inventory** | Maximum value sent — values above this are capped. |
| **Enable Next Available Date** | Whether to calculate and send next available date. |

## Fields — Price

| Field | Description |
|-------|-------------|
| **Price List Codes** | One or more BC price list codes included in this destination. |
| **Currency Code** | Currency for exported prices. |
| **Include VAT** | Whether prices include VAT. |

## BOM Extensions

When BOM-based availability is enabled, inventory is calculated by checking whether all components in a Bill of Materials are available, rather than using the finished good's own inventory.

## Next Available Date Logic

When enabled, Web Connect calculates the earliest date when inventory will be available again, based on:

- Open purchase orders
- Production orders
- Transfer orders (inbound)
- Planning data (if enabled)

The result is stored in [Web Connect Item Inventory](item-inventory.md) and sent as part of the inventory payload.

## Related

- [Web Connect Item Inventory](item-inventory.md)
- [Web Connect Dynamic Flow Fields](dynamic-flow-fields.md)
- [Web Connect Outgoing Sync Triggers](outgoing-mapping/outgoing-sync-triggers.md)
