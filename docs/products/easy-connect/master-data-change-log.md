# Easy Connect Master Data Change Log

> **BC view name:** Easy Connect Master Data Change Log

## Overview

The Easy Connect Master Data Change Log provides a complete audit trail of all master data changes that are processed through Easy Connect. Each entry represents a detected change in a master data record that is eligible for synchronization from the Master Data Company to other companies.

This view is primarily used for monitoring, troubleshooting, and verification of master data synchronization.

## What Is Logged

The log records when and which master data records have changed, making it possible to see which table and record was affected, identify when the change occurred, compare record timestamps to determine if data is up to date, and validate that master data changes are picked up by synchronization jobs.

The log does **not** perform synchronization itself — it only tracks changes.

## Field Reference

| Field | Description |
|-------|-------------|
| **Table ID** | The BC table where the change occurred (e.g. Price List Header). |
| **Record ID** | The unique identifier of the changed record. |
| **Date/Time** | The date and time when the change was detected by Easy Connect. |
| **Rec. Timestamp** | The original record timestamp from BC, used to determine change state. |

## How It Is Used

The **WCM Job Queue Master Data** job reads this log to determine what data should be synchronized. Only changes originating from the Master Data Company are relevant.

If a record does not appear here, it will not be included in master data synchronization.

## Typical Scenarios

- Verifying that price list or item changes are detected
- Troubleshooting missing or delayed master data updates
- Confirming that filters and master data handling are configured correctly

## Best Practice

This view is read-only by design and intended for monitoring and diagnostics. Configuration of what is synchronized is handled in [Easy Connect Master Data Handling](master-data-handling.md) and [Easy Connect Master Data Companies](master-data-companies.md).

## Related

- [Easy Connect Master Data Handling](master-data-handling.md)
- [Easy Connect Master Data Companies](master-data-companies.md)
- [Easy Connect Job Queues](job-queues.md)
