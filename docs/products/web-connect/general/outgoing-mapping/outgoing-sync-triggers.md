# Web Connect Outgoing Sync Triggers

> **BC view name:** Web Connect Synkroniseringstriggers utgående

## Overview

Outgoing Sync Triggers decide when a change in Business Central should be sent to an external system. When a trigger fires, a row is created in [Web Connect Outgoing Data](outgoing-data-web.md), and the upload job sends it from there.

Triggers belong to a [Web Connect Object](../objects.md). A trigger can listen to the object's own table, or to another table that is connected to it. A change on a sales line can for example trigger a new stock level for the item.

All triggers live in your own Business Central. You can see and change every trigger yourself.

## Before a trigger can fire

- The triggers must be turned on in [Web Connect General Setup](../general-setup.md).
- The user who makes the change must have the permission set **WCM WEB CONNECT**. Without it nothing is triggered and nothing is logged. This is the most common reason that a change is not sent. See [Outgoing triggers do not fire](../../../../how-to/web-connect/outgoing-triggers-missing-permission.md).

## What is watched

| Field | Description |
|-------|-------------|
| **WCM Object** | The object that is sent when the trigger fires. |
| **Trigger Object** | The object whose table is watched. Often the same as **WCM Object**. |
| **Relation Code** | Connects the watched record to the record that is sent, when **Trigger Object** is another object. For example from a sales line to the item, so that a new sales line sends a new stock level. |

## When the trigger fires

| Field | Description |
|-------|-------------|
| **Trigger on Insert** | Fires when a record is created. |
| **Trigger on Modify** | Fires when a record is changed. `All Fields` fires on any change. `Some Fields` fires only when one of the fields you choose for the trigger changes: Web Connect compares the value before and after the change. Blank does not fire on changes. |
| **Trigger on Rename** | Fires when the primary key of a record is changed. |
| **Trigger on Delete** | Fires when a record is deleted. Used for example on sales lines, so that a deleted line sends a new stock level. |
| **Trigger on Post** | Used on posted documents, such as shipments and invoices, and on item ledger entries, so that posting sends the record. |

## Limiting the trigger

| Field | Description |
|-------|-------------|
| **Trigger By Table View** | A filter on the watched table. Only records within the filter fire the trigger, for example only sales orders, or only items of one type. |
| **Trigger Condition** | A [condition](../condition-list.md) that must be met for the trigger to fire, for example that the sales order is released. Use it for rules that a table filter cannot express. |

The table view and the condition decide whether a change creates outgoing data at all. To record the change but wait to send it until the record is complete, use **Upload Condition Code** on the [object](../objects.md) instead.

## Advanced settings

These fields are used in a few setups for special cases. Leave them as they are unless CombineIT has set them up for you.

| Field | Description |
|-------|-------------|
| **Trigger on Job Queue** | Advanced setting for creating outgoing data from the job queue. |
| **Trigger on Incremental** | Advanced setting for sending new records in steps. |
| **Last Incremental Record Id** | Advanced setting that shows the last record handled by **Trigger on Incremental**. |
| **Incremental Check** | Advanced setting for how often records are checked, for example `Always` or `Every 4 hours`. |
| **Incremental Check Last** | Advanced setting that shows when records were last checked. |

## Examples

**Item data:** the item object with **Trigger on Modify** `Some Fields`, with the fields that the external system uses. Changes to other fields do not send the item.

**Stock level:** the inventory object with extra triggers on sales lines, transfer lines and item ledger entries. Each has a **Relation Code** to the item, and the sales lines also have **Trigger on Delete**. See [Outgoing inventory to external systems](../../../../how-to/web-connect/outgoing-inventory-to-external-systems.md).

**Shipment:** the shipment object with **Trigger on Post**, and a **Trigger By Table View** that only includes shipments for orders from the external system.

**Order status:** the sales order with **Trigger on Modify** and a **Trigger Condition** that the order is released.

## Configure it yourself in Business Central

| What you can change | Where | Example |
|---|---|---|
| Which changes are sent | **Trigger on Modify** with `Some Fields` | Send the item when the price field changes |
| Which records are sent | **Trigger By Table View** | Only send items of one item category |
| Extra rules | **Trigger Condition** | Only send released orders |

Test changes in a sandbox first. Records that changed before the trigger was set up are not sent by themselves. Add them manually in [Web Connect Outgoing Data](outgoing-data-web.md).

## Related

- [Web Connect Outgoing Data](outgoing-data-web.md)
- [Web Connect Outgoing Mapping](README.md)
- [Web Connect Condition List](../condition-list.md)
- [Web Connect Item Inventory](../item-inventory.md)
