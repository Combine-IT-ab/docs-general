# Web Connect Outgoing Data

> **BC view name:** Web Connect Utgående data webb

## Overview

Web Connect Outgoing Data is the queue and log of all outbound payloads waiting to be sent, currently being sent, or already processed.

Each record in this view represents one payload destined for an external system — for example one order confirmation, one inventory update, or one product data push.

## How Outgoing Data Is Created

1. A change in BC triggers an [Outgoing Sync Trigger](outgoing-sync-triggers.md)
2. Web Connect creates a new record here with status **Pending**
3. The Job Queue picks up pending records and processes them
4. Status changes to **Sent**, **Error**, or **Ignored** based on the result

## Menu Actions

### New

| Action | Description |
|--------|-------------|
| **Create Manually** | Manually creates an outgoing data record for a specific object and record. Useful for resending or testing. |

### Actions

| Action | Description |
|--------|-------------|
| **Send** | Manually triggers sending for the selected record(s). |
| **Reset to Pending** | Resets an Error or Ignored record back to Pending so it will be retried. |
| **Ignore** | Marks a record as Ignored — it will not be retried. |
| **Show Payload** | Opens the full outgoing payload (JSON/XML) for inspection. |
| **Show Response** | Shows the HTTP response received from the external system. |
| **Show Entry** | Opens the associated [Web Connect Entry](../entries.md) for full request/response details. |

## Fields

| Field | Description |
|-------|-------------|
| **Entry No.** | Unique identifier for this outgoing data record. |
| **Integration Code** | The integration this record belongs to. |
| **Object Code** | The Web Connect Object used to build the payload. |
| **Status** | Current status: Pending, Sending, Sent, Error, or Ignored. |
| **Record ID** | The BC record this payload is based on (e.g. a specific Sales Header). |
| **External ID** | The identifier used by the external system for this record. |
| **HTTP Method** | The HTTP method used (POST, PUT, PATCH, DELETE). |
| **URL** | The full URL the payload was or will be sent to. |
| **Created At** | When the outgoing data record was created. |
| **Sent At** | When the payload was successfully sent. |
| **Error Message** | The error message if status is Error. |
| **Retry Count** | Number of send attempts. |

## Related

- [Web Connect Outgoing Sync Triggers](outgoing-sync-triggers.md)
- [Web Connect Outgoing Mapping](README.md)
- [Web Connect Entries](../entries.md)
- [Web Connect Objects](../objects.md)
