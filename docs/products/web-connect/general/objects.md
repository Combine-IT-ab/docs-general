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
| **Source** | The integration source the object belongs to. See below. |
| **Upload Condition Code** | Outgoing: hold a triggered record back until a condition is met. See below. |
| **Process Condition Code** | Incoming: skip this object when a condition is met. See below. |

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

### Pausing and resuming a download

Untick **Download Data** to stop fetching for one object while the rest of the integration keeps running. When you tick it again, Web Connect fetches changes from the point where downloading stopped, so nothing is skipped as long as the external system can return changes since a given time. Check the result after the first run, since how far back the catch up goes depends on the object's setup and on the external API. To pause every object at once, see [How do I pause incoming downloads temporarily?](../../../how-to/web-connect/pause-incoming-download-temporarily.md)

## Creating BC Records in the Right Order

Incoming JSON is mapped onto the object tree (for example Order Header → Order Line). Fields can be mapped from the current record, its parent, or related records. **Content Create Order** controls the sequence in which BC records are created from one payload, so that a Sales Header exists before its Sales Lines and BC validation does not fail.

## Source on a Web Object

A Web Object works without a **Source**. Source is a grouping that was added later and is not mandatory. It still matters in three ways:

- **Default codeunits.** Web Connect has one codeunit per format (XML, JSON, GraphQL and others). The action that sets the default codeunits looks at the source to pick the right one, so it does not work on an object without a source.
- **Export.** An object without a source is not included when the integration is exported.
- **Incoming mapping.** Incoming mappings are filtered by source. A blank source on a mapping applies to all sources.

Give every object, including helper objects such as URL Parameters Objects, the same source as the integration it belongs to.

## Condition Codes on the Web Object

Two properties on the Web Object use conditions from the [Web Connect Condition List](condition-list.md). They look similar but behave differently.

| Property | Direction | What it does |
|----------|-----------|--------------|
| **Upload Condition Code** | Outgoing | **Waits.** When a record is triggered, Web Connect checks the condition. If it is not met, the record is held back and checked again on the next run. When the condition is met, the record is sent as a Web Entry. |
| **Process Condition Code** | Incoming | **Skips.** If the condition is met for an incoming object, that object is ignored and not created in BC. |

**Upload Condition Code** is not the same as the table view on an Outgoing Sync Trigger. The trigger view decides whether a change creates outgoing data at all. The Upload Condition Code lets the change be recorded and waits until the record is complete. Typical uses:

- A shipment must not be sent before the order confirmation has been sent.
- A product is not sent until its variants exist.
- A new customer is not sent until name, address and other required fields are filled in. See [How do I stop a record from syncing before it is complete?](../../../how-to/web-connect/stop-a-record-from-syncing-before-it-is-complete.md)

**Process Condition Code** is useful when a payload contains elements that should not become records, for example attributes where only some types should become dimensions. Conditions can be combined with AND and OR, so an existing condition can be extended with one more case.

## Related

- [Web Connect Integrations](integrations.md)
- [Web Connect Incoming Data](incoming-data/README.md)
- [Web Connect Outgoing Data](outgoing-mapping/outgoing-data-web.md)
- [Web Connect Condition List](condition-list.md)
- [Web Connect Dynamic Flow Fields](dynamic-flow-fields.md)
- [Web Connect Webhooks](webhooks.md)
