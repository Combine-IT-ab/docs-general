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
| **Trigger on Post** | Fires when a document is posted, for example a posted shipment or invoice, or an item ledger entry. |
| **Trigger on Job Queue** | The job queue creates outgoing data for every record in the table view each time it runs. Use it for full updates, for example all prices once a night. |
| **Trigger on Incremental** | Goes through the records that are new since the last record it handled, for example new posted shipments. **Last Incremental Record Id** shows the last record handled. |
| **Incremental Check** | How often the incremental trigger runs: `Always`, `Once per hour`, `Every 4 hours` or `Every 24 hours`. **Incremental Check Last** shows when it last ran. |

## Limiting the trigger

| Field | Description |
|-------|-------------|
| **Trigger By Table View** | A filter on the watched table. Only records within the filter fire the trigger, for example only sales orders, or only items of one type. |
| **Trigger Condition** | A [condition](../condition-list.md) that must be met for the trigger to fire, for example that the sales order is released. Use it for rules that a table filter cannot express. |

The table view and the condition decide whether a change creates outgoing data at all. To record the change but wait to send it until the record is complete, use **Upload Condition Code** on the [object](../objects.md) instead.

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

## Best Practice

### Send a Message Only for Documents Created by an Integration

Use this when a message, for example an order confirmation, should be sent when an integration creates a document, but not when a user creates an order or a quote manually.

**Standard:** trigger on modify of the **WCM Source** field on the document header.

1. Set **Trigger on Modify** to **Some Fields**.
2. Add **WCM Source** as the only trigger field.

Why it works:

- Web Connect sets **WCM Source** only when an integration creates the document. The field is blank on documents created manually.
- The field is not changed afterwards, so the message is sent once.
- Business Central first inserts the document with only the primary key. The other fields, including **WCM Source**, arrive in a modify right after. The modify trigger therefore catches the creation.
- Standard fields can be changed by other processes in Business Central. Web Connect fields are only updated by Web Connect mappings.

**Why not Trigger on Insert:** many processes in Business Central insert records without running the insert events, especially in posting routines. Web Connect, and any other app, never sees those inserts, so the trigger does not fire.

**Alternative:** use **Trigger on Incremental** instead. It goes through the records that are new since the last record it handled, however they were inserted. The message is then sent when the incremental check runs (see **Incremental Check**), not immediately. Do not use **Trigger on Job Queue** for this: it creates outgoing data for every record in the table view on each run.

### New or Changed Triggers Need a New Session

Business Central activates outgoing sync triggers when a session starts. A trigger that is added or changed (for example Trigger on Insert or Trigger on Modify) does not fire in a session that was already open.

1. Save the trigger.
2. Sign out of Business Central and sign in again. Refreshing the page (F5) is not enough.
3. Test the trigger in the new session.

If a new trigger seems not to work, start a new session before troubleshooting further. Business Central's change log works the same way and asks for a restart of the session when it is enabled.

## Related

- [Web Connect Outgoing Data](outgoing-data-web.md)
- [Web Connect Outgoing Mapping](README.md)
- [Web Connect Condition List](../condition-list.md)
- [Web Connect Item Inventory](../item-inventory.md)
