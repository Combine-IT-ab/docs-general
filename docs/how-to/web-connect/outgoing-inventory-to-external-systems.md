# Outgoing Inventory to External Systems

> ⚠️ Changes to Web Connect in a production environment are sensitive and may cause integrations to stop working if configured incorrectly. We strongly recommend testing all changes in a test/sandbox environment first. If you are unsure, contact us before making changes.

This guide describes how to calculate and send web inventory from Microsoft Business Central to an external system using Web Connect.

The setup is based on a calculated inventory value (Dynamic Flow Field), explicit relations between BC tables, and triggers that control when inventory updates are sent.

## Prerequisites — Web Object Mapping

A Web Connect Object must exist and be mapped to the external system. This object represents the item or inventory entity that will be sent. All inventory values calculated later are sent through this object.

## Step 1: Calculate Web Inventory Using Dynamic Flow Fields

Create a [Web Connect Dynamic Flow Field](../../products/web-connect/general/dynamic-flow-fields.md) to calculate web inventory. This value is used in [Web Connect Item Inventory](../../products/web-connect/general/item-inventory.md).

### Standard Calculation Logic

The most common logic for web inventory is:

```
Inventory
– Quantity on Sales Order Line
– Quantity on Transfer Order Line
```

All values in this calculation are based on standard BC table 27 (Item) and related tables.

## Step 2: Define Table Relations

To allow Web Connect to calculate this logic correctly, configure table relations (Web Connect Table Filter/Relation) connecting:

- Item
- Sales Line
- Transfer Line

### Location Filtering (Recommended)

In most cases, filter on one or more Location Codes to control which warehouse stock is included. This ensures only inventory from relevant locations is sent to the external system.

## Step 3: Configure Web Connect Destinations

Configure [Web Connect Destinations](../../products/web-connect/general/destinations.md) to define what data is sent:

- Select the Dynamic Flow Field used for Web Inventory
- Optionally enable **Calculate Next Available Date**

### Next Available Date (Optional)

If enabled, Web Connect calculates the next date when the item becomes available by considering:

- Purchase Orders and expected receipt dates
- Sales Orders and required shipment dates
- Transfer Orders and transfer dates

This value can be sent together with inventory to the external system.

## Step 4: Configure Outgoing Sync Triggers

Configure [Web Connect Outgoing Sync Triggers](../../products/web-connect/general/outgoing-mapping/outgoing-sync-triggers.md) to control when inventory updates are sent.

### Main Trigger (Item Level)

| Setting | Value |
|---------|-------|
| Trigger by Object | Item (or the object mapped to external system) |
| Trigger by Table View | Filtered view (e.g. Item Type = WEBB-SE) |
| Trigger on Modify Fields | Web Inventory change |

This ensures inventory updates are sent whenever the calculated web inventory changes.

### Additional Triggers

Also add triggers for changes that affect inventory calculations:

- Sales Order lines (created/modified/deleted)
- Transfer Order lines
- Item Ledger Entries (posted inventory changes)

## Result

Once configured, Web Connect will:

1. Detect changes via Outgoing Sync Triggers
2. Recalculate web inventory using the Dynamic Flow Field
3. Store the result in [Web Connect Item Inventory](../../products/web-connect/general/item-inventory.md)
4. Queue an outgoing message in Web Connect Outgoing Data
5. Send the inventory value to the external system

## Related

- [Web Connect Dynamic Flow Fields](../../products/web-connect/general/dynamic-flow-fields.md)
- [Web Connect Destinations](../../products/web-connect/general/destinations.md)
- [Web Connect Item Inventory](../../products/web-connect/general/item-inventory.md)
- [Web Connect Outgoing Sync Triggers](../../products/web-connect/general/outgoing-mapping/outgoing-sync-triggers.md)
