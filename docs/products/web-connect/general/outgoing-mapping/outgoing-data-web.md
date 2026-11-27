# Web Connect Outgoing Data

> **BC view name:** Web Connect Utgående data webb

## Overview

Outgoing Data is the queue of records that Web Connect should send to an external system. Each row is one record in Business Central, for example an item, an order or a shipment, together with the [object](../objects.md) that it is sent with.

A row is identified by the object and the record ID. The record ID is Business Central's reference to one record in one table. The same record is therefore only queued once per object, even if it changes many times before it is sent.

## How a row is sent

1. A row is created with the status not synced. It is created by an [outgoing sync trigger](outgoing-sync-triggers.md) or manually.
2. The upload job builds a message from the [outgoing mapping](README.md) and creates a [Web Entry](../entries.md). The row is marked as synced and shows the number of its Web Entry. Several rows can be grouped into one Web Entry, see the [object](../objects.md).
3. The upload job sends the Web Entry. The request and the response are saved on the Web Entry.

This is asynchronous. The user who changed the record gets no answer from the external system. Check the Web Entries to see whether a message was accepted.

If a change in Business Central does not create a row here, the user probably lacks the permission set **WCM WEB CONNECT**. See [Outgoing triggers do not fire](../../../../how-to/web-connect/outgoing-triggers-missing-permission.md).

## Actions

| Action | Description |
|--------|-------------|
| **Add Outgoing Data** | Under **New**. Choose an object and filter the records you want to send, for example items or orders. Use it to send many records at once, or records that changed before the trigger was set up. |
| **Set Marked to Non-Synced** | Under **Actions**. Marks the selected rows as not synced, so that they are sent again. |
| **Generate Web Entry of Marked** | Builds the message and creates a Web Entry for the selected rows now, instead of waiting for the job queue. It does not close a list, so do not use it for an object that sends a list. See [Objects that send a list](#objects-that-send-a-list). |
| **Go to Web Entry** | Opens the Web Entry of the row, where you can see the request and the response and send it with **Process Entry**. |

**Run Sync to Web Entry** runs the whole step for all rows that are not synced yet and creates their Web Entries. It does the same thing as the upload job, so use it when you do not want to wait for the next run. It also closes open lists.

## Objects that send a list

**MaxRecord per Entry** on the [object](../objects.md) decides whether a Web Entry holds one record or a list (JSON array):

| MaxRecord per Entry | Web Entry |
|---|---|
| `0` | One record, sent as an object. No list. |
| `1` | A list with one record. |
| Higher, for example `10` | A list with up to that many records, grouped from several rows. |

The two actions that create Web Entries treat the list differently:

| Action | What happens with the list | Use it for |
|---|---|---|
| **Generate Web Entry of Marked** | Adds the marked rows to the list, but does not close it. The JSON in the Web Entry is not valid. | Objects with **MaxRecord per Entry** `0` |
| **Run Sync to Web Entry** | Creates the Web Entries and closes open lists. | Objects with **MaxRecord per Entry** `1` or higher |

This is by design. If a row that you sent manually ends up in a Web Entry with invalid JSON, check **MaxRecord per Entry** on the object. If it is `1` or higher, set the row to non-synced and send it again with **Run Sync to Web Entry**.

**Run Sync to Web Entry** sends every row that is not synced yet, not only the rows you marked. Check the list for other non-synced rows on the same object before you run it.

### Find the record that fails

When a list holds several records, an error in the response may not show which record failed or what happened to the others. Set **MaxRecord per Entry** to `1` when you need to troubleshoot or confirm each record on its own. Each Web Entry then holds one record, so the request and the response belong to that record.

| Value | Effect |
|---|---|
| `1` | One call per record. Each response can be traced to one record. |
| Higher | Fewer calls. One error can affect or hide several records. |

## Configure it yourself in Business Central

| What you can do | How | Example |
|---|---|---|
| Send a record again | **Set Marked to Non-Synced**, then **Generate Web Entry of Marked**. For an object that sends a list, use **Run Sync to Web Entry** instead. | Resend an order after a mapping error is fixed. See [How do I resend an outgoing message?](../../../../how-to/web-connect/resend-outgoing-message.md) |
| Send many records | **Add Outgoing Data** with a filter | Send all items in a new item category |
| Send now | **Go to Web Entry**, then **Process Entry** | Test a change without waiting for the job queue |

## Related

- [Web Connect Outgoing Sync Triggers](outgoing-sync-triggers.md)
- [Web Connect Outgoing Mapping](README.md)
- [Web Connect Entries](../entries.md)
- [Web Connect Objects](../objects.md)
