# Web Connect Objects

> **BC view name:** Web Connect Objekt

## Overview

Web Connect Objects define which Business Central data is exchanged with an external system. Each object is linked to a specific BC table and belongs to an integration.

Objects serve as the bridge between BC data and the external system — they determine what data is read, how it is structured, and how it is written back.

## Incoming vs Outgoing

Each object can be configured for incoming data (receiving from external systems), outgoing data (sending to external systems), or both.

**Incoming best practices:**

- Keep objects focused on a single BC table (e.g. Sales Header)
- Use underlying objects for related child data (e.g. Sales Lines)
- Define conditions to filter out irrelevant records early

**Outgoing best practices:**

- Map only the fields the external system actually needs
- Use Dynamic Flow Fields for calculated values
- Use Text Mapping for value translations

## Object Tree

Objects can be nested to represent parent–child data structures. The tree mirrors the JSON or XML hierarchy sent to or received from the external system.

Example — a Sales Order with lines:

```
Sales Header (root object)
└── Sales Lines (underlying object)
    └── Item (lookup object)
```

This maps to a JSON payload like:

```json
{
  "orderNumber": "SO-001",
  "lines": [
    { "itemNo": "ITEM-1", "quantity": 2 }
  ]
}
```

## Object Fields

| Field | Description |
|-------|-------------|
| **Code** | Unique identifier for the object within the integration. |
| **Description** | Human-readable name. |
| **Table No.** | BC table number this object is based on. |
| **Table Name** | BC table name (read-only reference). |
| **Direction** | Incoming, Outgoing, or Both. |
| **Key** | Which BC table key to use for lookups (0 = Primary Key). |
| **Enabled** | Whether this object is active. |

## Related

- [Web Connect Integrations](integrations.md)
- [Web Connect Incoming Data](incoming-data/README.md)
- [Web Connect Outgoing Data](outgoing-mapping/outgoing-data-web.md)
- [Web Connect Condition List](condition-list.md)
- [Web Connect Dynamic Flow Fields](dynamic-flow-fields.md)
