# Easy Connect Setup

> **BC view name:** Easy Connect Setup

## Overview

The Easy Connect Setup defines which companies participate in an Easy Connect flow and under which conditions data is synchronized. This is the foundational configuration that must be completed before using any Easy Connect-based order synchronization, master data sync, or intercompany pricing logic.

## Field Reference

### Company Mapping & Core Flow Control

| Field | Description |
|-------|-------------|
| **Subsidiary Company Name** | The company acting as the selling company — where sales orders are originally created. |
| **Central Company** | The warehouse company that ships goods on behalf of the subsidiary. |
| **Location Code** | The location in the subsidiary company where Easy Connect orders are created. |
| **Sync to Central Table View** | A filter (table view) that determines which sales orders in the subsidiary should be synchronized to the central company. |
| **Block Update Table View** | A filter used to block updates from the subsidiary when specific conditions in the central company are true — for example, when the order is already being picked. |

### Operational Handling

| Field | Description |
|-------|-------------|
| **Auto Ship Service-Only Lines** | If enabled, service lines (e.g. freight) are automatically shipped when the first physical item is shipped from the central company. |
| **Allow New Lines from Central** | Allows the central company to add lines to the subsidiary's order (freight, fees, etc.). |

### Intercompany Pricing

| Field | Description |
|-------|-------------|
| **Central Price List** | The price list used to calculate internal selling prices from central to subsidiary. |
| **Central Cust. Price Group** | A customer price group used to determine pricing between companies. |
| **Central Cust. Currency Code** | Currency code used when central prices to the subsidiary are not in the central company's base currency. |

### Synchronization & Error Handling

| Field | Description |
|-------|-------------|
| **Error Try Count** | Maximum number of retry attempts for synchronization. 0 = unlimited retries. |
| **Auto-Post Purchase Invoices** | Automatically posts purchase invoices received from the central company in the subsidiary. |
| **Auto-Post Purchase Cr. Memo** | Automatically posts purchase credit memos received from central. |

## Related

- [Easy Connect Sync Data Fields](sync-data-fields.md)
- [Easy Connect Master Data Handling](master-data-handling.md)
- [Easy Connect Job Queues](job-queues.md)
