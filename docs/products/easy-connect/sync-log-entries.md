# Easy Connect Sync Log Entries

> **BC view name:** Easy Connect – Sync Log Entries

## Overview

The Sync Log Entries page is a global log where you can follow every record synchronized between Subsidiary and Central companies. It is used to verify successful syncing, review update history, and identify potential errors.

If an error occurs and an error email address is configured in Easy Connect Setup, the system automatically sends an error notification.

## Field Reference

| Field | Description |
|-------|-------------|
| **Document Type** | Type of document being synchronized (e.g. Order). |
| **Document No.** | The document number being synchronized. |
| **Line No.** | The specific line number on the document (0 = header). |
| **Subsidiary Company** | The company where the original order exists. |
| **Central Company** | The company responsible for fulfilling/shipping the order. |
| **Deleted** | Indicates whether the record has been deleted. |
| **Pending Post** | Shows if auto-posting (e.g. shipment posting) failed and is waiting for manual posting. Can be manually posted via Actions → Post Pending Lines. |
| **Subsidiary Updated** | Indicates that something in Central triggered an update back to the Subsidiary. |
| **Central Updated** | Indicates that something in the Subsidiary triggered an update to Central. |
| **Synced to Central** | Shows whether the sync condition in Easy Connect Setup was fulfilled and the order was synchronized to Central. |
| **Update Date Time** | Timestamp of when the synchronization attempt occurred. |
| **Central Shipped Qty.** | Quantity shipped from the Central company. |
| **Sync Error** | Boolean indicating if a synchronization error occurred. |
| **Message** | Short error message. |
| **Error Callstack** | Detailed technical error message for troubleshooting. |

## Key Notes

- The log is **global** — you can view it from any company in your BC environment.
- Each row represents one event in the sync process.
- Errors should be diagnosed here first when orders do not sync as expected.

## Related

- [Easy Connect Setup](setup.md)
- [Easy Connect Sync Data Fields](sync-data-fields.md)
- [Easy Connect Job Queues](job-queues.md)
