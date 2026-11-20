# Web Connect Item Inventory

> **BC view name:** Web Connect Webblagersaldo

## Overview

Web Connect Item Inventory shows the web inventory that Web Connect has calculated per item. The values are not entered by hand. They are calculated by the built-in inventory calculation in Web Connect, using the [dynamic flow field](dynamic-flow-fields.md) on each [destination](destinations.md).

The calculation is a system function. It is switched on in [Web Connect General Setup](general-setup.md) and is only needed by integrations that send inventory calculated this way. If no integration uses it, leave it off and ignore this view.

## How the values are calculated

1. The [destination](destinations.md) points out a dynamic flow field, for example inventory on the web shop's locations minus quantities on open sales orders.
2. Web Connect calculates the value per item with that flow field. If the destination says so, it also calculates the next available date, or calculates the inventory of an item with a bill of materials from its components.
3. The result is saved in this view, where an integration can pick it up and send it.

Use the view to check what Web Connect has calculated for an item, for example when the web shop shows another quantity than you expect.

## Configure it yourself in Business Central

| What you can change | Where | Example |
|---|---|---|
| What the web inventory includes | The dynamic flow field on the [destination](destinations.md) | Exclude a location that should not be sold from |
| Whether the calculation runs | [Web Connect General Setup](general-setup.md) | Switch it on when an integration starts using it |

## Related

- [Web Connect Destinations](destinations.md)
- [Web Connect Dynamic Flow Fields](dynamic-flow-fields.md)
- [Web Connect Outgoing Sync Triggers](outgoing-mapping/outgoing-sync-triggers.md)
- [Web Connect Outgoing Data](outgoing-mapping/outgoing-data-web.md)
