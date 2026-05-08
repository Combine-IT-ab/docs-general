# Web Connect Outgoing Sync Triggers

> **BC view name:** Web Connect Synkroniseringstriggers utgående

## Overview

Web Connect Outgoing Sync Triggers define the rules that determine when outgoing data should be created — i.e. when a change in Business Central should result in an update being sent to an external system.

Triggers are evaluated automatically by Web Connect whenever BC records change. When a trigger fires, a new entry is created in [Web Connect Outgoing Data](outgoing-data-web.md).

## How Triggers Work

1. A BC record is created, modified, or deleted.
2. Web Connect evaluates all triggers configured for the relevant object.
3. If a trigger's conditions are met, an outgoing data entry is queued.
4. The Job Queue processes the queue and sends the data.

## Field Reference

| Field | Description |
|-------|-------------|
| **Code** | Unique identifier for the trigger. |
| **Description** | Human-readable explanation of what the trigger monitors. |
| **Object Code** | The Web Connect Object this trigger is attached to. |
| **Table No.** | The BC table to monitor for changes. |
| **Table Name** | Table name (read-only reference). |
| **Event** | The BC event that fires the trigger: Insert, Modify, Delete, or Rename. |
| **Condition Code** | Optional condition that must be true for the trigger to fire. See [Web Connect Condition List](../condition-list.md). |
| **Enabled** | Whether the trigger is active. |

## Practical Examples

### Item Sync

Trigger outgoing data whenever an item is modified:

- Table: Item (Table 27)
- Event: Modify
- Condition: `IS-WEB-ITEM` (only items flagged for web)

### Sales Order Release

Send order confirmation when a sales order is released:

- Table: Sales Header (Table 36)
- Event: Modify
- Condition: `STATUS-RELEASED`

### Customer CRM Sync

Sync customer data after any modification:

- Table: Customer (Table 18)
- Event: Modify, Insert

### Stock Update

Trigger inventory recalculation after item ledger changes:

- Table: Item Ledger Entry (Table 32)
- Event: Insert

### Incremental Sync

Only send records modified after a specific timestamp — combine with a condition that checks the last-modified date.

## Related

- [Web Connect Outgoing Data](outgoing-data-web.md)
- [Web Connect Condition List](../condition-list.md)
- [Web Connect Item Inventory](../item-inventory.md)
- [Web Connect Destinations](../destinations.md)
