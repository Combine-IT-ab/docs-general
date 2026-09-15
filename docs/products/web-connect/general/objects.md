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
| **Number of Contents per Transaction** | How many outgoing records are grouped into one Web Entry. See below. |
| **Download Data** | Enables the download job for this object (incoming). |
| **Number of Minutes Between Runs** | Interval for the download job on this object. |
| **Content Create Order** | The order in which BC records are created from an incoming payload. See below. |
| **Data Array** | JSON path to the array that holds the records in an incoming payload, e.g. `items`. See below. |

## Grouping Outgoing Records: Number of Contents per Transaction

The upload job groups Outgoing Data records into a single Web Entry to reduce the number of API calls to the external system. The setting controls both the grouping and the shape of the payload:

| Value | Payload |
|-------|---------|
| `0` | One record, sent as a single object |
| `1` | One record, sent as a list with one object |
| `>1` | A list with up to that many records |

Pick `0` when the external API expects one object per call, and `1` or higher when it expects an array.

## Downloading Data

For incoming objects the download job sends a Download Request to the external system when **Download Data** is ticked, at the interval set in **Number of Minutes Between Runs**. The HTTP method defaults to the one set on the Integration Card (GET, POST) but can be overridden per object.

The response is stored as an Incoming Data record and converted to JSON regardless of the original format (XML, CSV), so all downstream processing works the same way. When one response contains several records, **Data Array** tells Web Connect which array to split into separate Incoming Data records.

## Creating BC Records in the Right Order

Incoming JSON is mapped onto the object tree (for example Order Header → Order Line). Fields can be mapped from the current record, its parent, or related records. **Content Create Order** controls the sequence in which BC records are created from one payload, so that a Sales Header exists before its Sales Lines and BC validation does not fail.

## Related

- [Web Connect Integrations](integrations.md)
- [Web Connect Incoming Data](incoming-data/README.md)
- [Web Connect Outgoing Data](outgoing-mapping/outgoing-data-web.md)
- [Web Connect Condition List](condition-list.md)
- [Web Connect Dynamic Flow Fields](dynamic-flow-fields.md)
- [Web Connect Webhooks](webhooks.md)
