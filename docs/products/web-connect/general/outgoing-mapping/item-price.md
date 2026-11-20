# Web Connect Item Price

> **BC view name:** Web Connect Webbpris

## Overview

Web Connect Item Price holds prices that Web Connect calculates for external systems. Business Central has no single price per item and market that an integration can read, so Web Connect calculates one and stores it here before it is sent.

It is one of two system functions in Web Connect. The other calculates stock levels, see [Web Connect Item Inventory](../item-inventory.md). Both run in the upload job queue, and both can be turned off when an integration does not use them.

The values here are calculated, not entered by hand. Which prices are calculated is set up on the [Web Connect Destinations](../destinations.md).

## How a price is sent

From here the price is sent like any other record: through [Web Connect Outgoing Data](outgoing-data-web.md) and the [outgoing mapping](README.md) of the object.

## Related

- [Web Connect Destinations](../destinations.md)
- [Web Connect Item Inventory](../item-inventory.md)
- [Web Connect Outgoing Sync Triggers](outgoing-sync-triggers.md)
- [Web Connect Outgoing Data](outgoing-data-web.md)
