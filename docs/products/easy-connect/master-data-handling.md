# Easy Connect Master Data Handling

> **BC view name:** Easy Connect Master Data Handling

## Overview

Master Data Handling in Easy Connect controls which tables and fields are synchronized from the Central company to subsidiary companies. The purpose is to ensure that article data, price lists, and other master data remain consistent across all companies — eliminating manual duplication.

Master data always flows from **Central → Subsidiary**.

All master data synchronization is executed by the job queue **WCM Job Queue Master Data**, which can run on a schedule (recommended: daily) and automatically updates all active master data mappings.

## Configuration Layers

Master Data Handling consists of two layers:

1. **Tables to synchronize** — which BC tables the Central company distributes
2. **Fields to synchronize** — how each field is handled, including value substitutions, translations, and formula-based modifications

## Table Level

### Field Descriptions

| Field | Description |
|-------|-------------|
| **Company Name** | Subsidiary company receiving the master data. |
| **Table ID** | BC table ID (e.g. 7001 = Price List Line). |
| **Active** | Enables or disables synchronization for this table. |
| **Table Name** | Name of the table being synchronized. |
| **Last Timestamp** | Timestamp of the most recent successful synchronization. |
| **Filter String** | BC filter defining which records should be synchronized. |
| **Syn. Message** | Status message for the last run (success/error). |

**Example:** Only internal price lists where Field1 = `INTERN-UK` are sent to the UK subsidiary.

## Field Level

Navigate to field configuration via: **Easy Connect Master Data Handling → Fields**

### Field Descriptions

| Field | Description |
|-------|-------------|
| **Table ID** | BC table the field belongs to. |
| **Table Name** | BC name of the table. |
| **Field No.** | Field number in BC. |
| **Field Caption** | BC name of the field. |
| **Const. To Company Curr.** | Converts values to the target company's currency. |
| **Sync. Field Only** | Syncs only this field regardless of other settings. |
| **Translation Table ID / Name / Field No.** | Optional value translation via lookup (e.g. language, country codes). |
| **Translation Type** | Defines how translations are applied (e.g. Language). |
| **Formula Type / Value** | Allows formula-based modifications (rare). |
| **Substitute Value Type** | Fixed Text or Field Value. |
| **Substitute Value** | Fixed override value (e.g. currency code should always be SEK). |
| **Substitute Field No.** | If substitute value comes from another field. |

## Typical Use Cases

**Internal Pricing** — automatically generate internal sales and purchase price lists between companies.

**Centralized Item Management** — maintain article registry once and distribute to all companies.

**Vendor Mapping** — subsidiary companies automatically receive Central as the vendor.

**Value Translations** — translate codes or values that differ between company setups.

## Related

- [Easy Connect Master Data Companies](master-data-companies.md)
- [Easy Connect Master Data Change Log](master-data-change-log.md)
- [Easy Connect Job Queues](job-queues.md)
