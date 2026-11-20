# Web Connect Destinations

> **BC view name:** Web Connect Destinations

## Overview

A destination decides how Web Connect calculates web inventory and web prices before they are sent to an external system. Each destination points out a [dynamic flow field](dynamic-flow-fields.md) that does the calculation, for example inventory on a few locations minus what is already on sales orders.

Destinations are used by the built-in calculations of web inventory and web prices, which are switched on in [Web Connect General Setup](general-setup.md). The calculated inventory is shown in [Web Connect Item Inventory](item-inventory.md). Most integrations do not use destinations.

## Fields

| Field | Description |
|-------|-------------|
| **Destination Type** | The kind of destination. Together with **Code** it identifies the destination. |
| **Code** | The code of the destination. |
| **Inventory Dynamic FlowField** | The [dynamic flow field](dynamic-flow-fields.md) that calculates the web inventory. |
| **Price Dynamic FlowField** | The [dynamic flow field](dynamic-flow-fields.md) that calculates the web price. |
| **Calculate Next Available Date** | Web Connect also calculates the next date the item is available. |
| **Calculate Avail. From BOM** | The inventory of an item with a bill of materials is calculated from its components, instead of from the item's own inventory. |

## Advanced settings

These fields are used in a few setups for special cases. Leave them as they are unless CombineIT has set them up for you.

| Field | Description |
|-------|-------------|
| **Next. Availb. Key Use** | Advanced setting for the next available date. |
| **Add Inventory By Event** | Advanced setting for inventory that is added by event. |
| **Inv.By Ev. Web Object** | Advanced setting for inventory by event. |
| **Inv.By Ev. Location Filter** | Advanced setting for inventory by event. |
| **Inv.By Ev. Date Type** | Advanced setting for inventory by event. |
| **Inv.By Ev. Include Plan** | Advanced setting for inventory by event. |
| **Inv.By Ev. Incl. Blanketorder** | Advanced setting for inventory by event. |
| **Inv.By Ev. Forecast Name** | Advanced setting for inventory by event. |

## Configure it yourself in Business Central

| What you can change | Where | Example |
|---|---|---|
| How the web inventory is calculated | The dynamic flow field in **Inventory Dynamic FlowField** | Add a new location to the inventory sent to the web shop |
| How the web price is calculated | The dynamic flow field in **Price Dynamic FlowField** | Use another price list |
| Whether a next available date is calculated | **Calculate Next Available Date** | Show customers when a sold out item is back |

## Related

- [Web Connect Item Inventory](item-inventory.md)
- [Web Connect Dynamic Flow Fields](dynamic-flow-fields.md)
- [Web Connect General Setup](general-setup.md)
