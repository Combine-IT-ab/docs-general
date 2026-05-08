# Web Connect Item Price

> **BC view name:** Web Connect Webbpris

## Overview

Web Connect Item Price is the staging view where price data is calculated and stored before being sent to external systems.

Like [Web Connect Item Inventory](../item-inventory.md), values here are calculated automatically — not entered manually. The price logic is defined in [Web Connect Destinations](../destinations.md).

## Purpose

This view is used to:

- Review the calculated price per item, variant, and price list
- Verify price logic before prices are sent
- Manually trigger price recalculations

## Price Calculation Logic

Prices are derived from Business Central price lists based on the destination configuration. The calculation takes into account:

- Customer price groups
- Currency
- Unit of measure
- VAT inclusion (depending on destination settings)
- Discount chains

The result is a single price value per item/variant/destination combination, ready for the external system.

## Actions

| Action | Description |
|--------|-------------|
| **Calculate Item Price** | Manually triggers recalculation of web prices for selected items. |

## Fields

| Field | Description |
|-------|-------------|
| **Item No.** | Item number in Business Central. |
| **Variant Code** | Variant code (if variants are used). |
| **Unit of Measure Code** | Unit of measure for the price. |
| **Destination Code** | The Web Connect Destination this price belongs to. |
| **Price** | The calculated price value. |
| **Currency Code** | Currency for the price. |
| **Last Changed** | When the price was last recalculated. |
| **Force Export** | Forces the price to be exported even if the value has not changed. |

## Relationship to Outgoing Data

Web Connect Item Price follows the same flow as inventory:

1. Price is calculated and stored here
2. Outgoing Sync Triggers detect changes
3. Entries are created in Web Connect Outgoing Data
4. Job Queue sends the data to the external system

## Related

- [Web Connect Destinations](../destinations.md)
- [Web Connect Outgoing Sync Triggers](outgoing-sync-triggers.md)
- [Web Connect Outgoing Data](outgoing-data-web.md)
- [Web Connect Item Inventory](../item-inventory.md)
