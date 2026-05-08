# Web Connect Incoming Data

> **BC view name:** Web Connect Inkommande data webb

## Overview

Web Connect Incoming Data is the queue and log of all inbound payloads received from external systems. Each record represents one payload that Web Connect has received and is processing or has processed.

## Default Headers

Web Connect automatically captures standard HTTP request headers for each incoming call:

| Header | Description |
|--------|-------------|
| `Content-Type` | Format of the incoming payload (e.g. `application/json`). |
| `Authorization` | Authentication header from the sender. |
| `X-Request-ID` | Unique request identifier (if provided by the sender). |

## How Incoming Data Works

1. An external system sends an HTTP request to the Web Connect endpoint.
2. Web Connect receives the payload and creates a record here with status **Received**.
3. The payload is parsed against the configured [Web Connect Object](../objects.md) and [Incoming Data Mapping](mapping.md).
4. If processing succeeds, BC records are created or updated. Status changes to **Processed**.
5. If processing fails, status changes to **Error** with an error message.

## Object Tree and Processing

Incoming data is parsed according to the Web Connect Object tree. The root object maps to the top-level payload structure, with underlying objects handling nested arrays or child records.

Example for an incoming order:

```
Sales Header (root object)  ←  { "orderNumber": "...", "lines": [...] }
└── Sales Lines             ←  [ { "itemNo": "...", "qty": 2 }, ... ]
```

The mapping, conditions, and text mappings configured on each object control how values are extracted and written to BC.

## Processing Statuses

| Status | Description |
|--------|-------------|
| **Received** | Payload received, not yet processed. |
| **Processing** | Currently being processed by the Job Queue. |
| **Processed** | Successfully processed — BC records created or updated. |
| **Error** | Processing failed. See error message for details. |
| **Ignored** | Skipped intentionally (e.g. filtered out by a condition). |

## Error Handling

When processing fails:

- The record stays in Incoming Data with status **Error**
- The error message field shows what went wrong
- You can correct the issue and use **Reset to Pending** to retry
- Use **Show Payload** to inspect the raw received data

## Inspecting Payloads

- **Show Payload** — view the raw incoming JSON/XML
- **Show Processed Data** — see how the payload was interpreted
- **Show Entry** — open the associated [Web Connect Entry](../entries.md) for full request details

## In This Section

- [Web Connect Incoming Data Mapping](mapping.md)

## Related

- [Web Connect Objects](../objects.md)
- [Web Connect Entries](../entries.md)
- [Web Connect Text Mapping](../text-mapping.md)
- [Web Connect Condition List](../condition-list.md)
