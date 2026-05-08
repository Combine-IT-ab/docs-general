# Easy Connect Master Data Companies

> **BC view name:** Easy Connect Master Data Companies

## Overview

The Easy Connect Master Data Companies view defines which company acts as the master source for shared master data within an Easy Connect setup.

Master data (such as items, price lists, and related reference data) is always distributed from one designated master company to the other companies in the Easy Connect flow.

## How It Works

All companies that should participate in master data synchronization must be listed in this view. Exactly one company is marked as the **Master Data Company** — the only source from which master data is sent. All other companies receive master data but do not publish it.

## Field Reference

| Field | Description |
|-------|-------------|
| **Company Code** | Internal identifier for the company. |
| **Company** | The Microsoft Business Central company name. |
| **Master Data Company** | Indicates which company is the master source for master data. Only one company should be selected. |
| **Currency Code** | Currency used by the company (informational/reference). |

## Configuration Rules

- All participating companies must exist in the list
- Only one company may be marked as Master Data Company
- Master data is always sent from master → subsidiaries
- Subsidiary companies never overwrite master data

## Typical Usage

- **Central / warehouse company** → marked as Master Data Company
- **Sales or subsidiary companies** → receive items, price lists and reference data

## Related

- [Easy Connect Master Data Handling](master-data-handling.md)
- [Easy Connect Master Data Change Log](master-data-change-log.md)
