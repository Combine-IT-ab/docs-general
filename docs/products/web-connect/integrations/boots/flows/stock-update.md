---
title: "Business Central to Boots marketplace: stock"
description: "When stock changes in Business Central, Web Connect writes the changed items to a CSV file and uploads it to the Boots Dropship SFTP mailbox."
summary: "When stock changes, Web Connect writes the available stock for the changed items in Business Central to a comma separated file with the date, your supplier code at Boots, the item number and the quantity. The file is uploaded to the SFTP mailbox on the Boots Dropship platform, where the stock on your products is updated."
slug: integrations/business-central-boots/stock-update
lang: en
translation_key: integration-boots-stock-update
product: web-connect
type: integration-flow
system: "Boots marketplace"
system_category: "marketplace"
keywords:
  - business central boots stock
  - boots stock file business central
  - boots dropship stock sftp
faq:
  - question: "Which item number does Boots see?"
    answer: "The Business Central item number, sent in the column for the vendor article number. It is your own product SKU, not the Boots product reference, and it must match the vendor article number Boots has on the product."
  - question: "Does every file hold all items?"
    answer: "No. A file is created when stock changes, and it holds only the items whose stock changed since the last upload."
  - question: "Does the file have a header row?"
    answer: "No. Each row has four columns in a fixed order: date, supplier code, item number and quantity, separated by commas."
last_reviewed: 2026-11-19
---

# Business Central to Boots marketplace: stock

When stock changes, Web Connect writes the available stock for the changed items in Business Central to a comma separated file with the date, your supplier code at Boots, the item number and the quantity. The file is uploaded to the SFTP mailbox on the Boots Dropship platform, where the stock on your products is updated.

| | |
|---|---|
| **Direction** | Business Central → Boots |
| **Trigger** | Outgoing sync triggers when the calculated stock changes. The job queue sends the file, and how often it runs can be adjusted to what your business needs |
| **Result** | A new stock file is in the upload folder of the Boots Dropship SFTP mailbox |
| **Part of** | [Business Central and Boots marketplace integration](../overview.md) |

## Step by step

1. Web Connect calculates the available stock per item in [Item Inventory](../../../general/item-inventory.md), using the locations and rules in [Destinations](../../../general/destinations.md).
2. When the calculated stock for an item changes, an outgoing sync trigger marks the item for Boots.
3. When the job queue runs, Web Connect writes one row per changed item with today's date, the supplier code, the item number and the stock.
4. Web Connect logs in to the SFTP mailbox with the user name and the password from Secret Value Storage.
5. The file is uploaded to the upload folder, always with the same file name.
6. The upload is logged in Web Connect Entries.

```mermaid
sequenceDiagram
    participant BC as 🔄 Business Central
    participant WC as ⚙️ Web Connect
    participant B as 🛒 Boots Dropship SFTP

    BC-->>WC: Stock changed (Item Inventory, outgoing sync trigger)
    WC->>WC: Write CSV rows for changed items: date, supplier code, item number, quantity
    WC->>B: Log in with user name and password
    alt Login and upload succeed
        WC->>B: Upload file to the upload folder
        WC-->>WC: Entry logged as sent
    else Login or upload fails
        WC-->>WC: Error shown in Entries ⚠️
    end
```

## Data mapping

The file has no header row. The columns are written in this order, separated by commas.

| Column | Business Central value | Note |
|---|---|---|
| 1. Date | Today's date | Format DD/MM/YYYY |
| 2. Supplier code | Fixed value in the mapping | Your supplier code on the Boots Dropship platform |
| 3. Vendor article number | Item No. | Your own product SKU, not the Boots product reference. Must match the vendor article number Boots has on the product |
| 4. Quantity | Calculated stock in Item Inventory | Sent as a number |

## Web Connect objects

| Object | Role |
|---|---|
| `BOOTS` | The integration: connection type SFTP server, port 22, comma separated text |
| `BOOTS-SFTP` | Login to the SFTP mailbox with user name and password |
| `BOOTS_STOCKFILE` | Writes the stock rows from Item Inventory and uploads the file |
| `CURRENT-DATE` | Integration variable that gives today's date for the first column |

## Error handling

| Situation | What happens | What to do |
|---|---|---|
| Login to the SFTP server fails | The entry gets an error in Web Connect Entries and no file is uploaded | Check the user name, and the password in [Secret Value Storage](../../../general/secret-value-storage.md). Then [resend the message](../../../../../how-to/web-connect/resend-outgoing-message.md) |
| Boots does not update the stock for a product | The item number in the file does not match a vendor article number with Boots, or the product is not set up with Boots yet | Check the product on the Boots Dropship platform. Nothing is reported back to Business Central |
| The quantity is not what you expect | The stock is calculated from the locations and rules in Destinations | Check the item in [Item Inventory](../../../general/item-inventory.md) and the locations in Destinations |
| No file is uploaded at all | No stock has changed, or the job queue is not running | See [Integration is not running](../../../../../how-to/web-connect/integration-not-running.md) |

## Frequently asked questions

### Which item number does Boots see?

The Business Central item number, sent in the column for the vendor article number. It is your own product SKU, not the Boots product reference, and it must match the vendor article number Boots has on the product.

### Does every file hold all items?

No. A file is created when stock changes, and it holds only the items whose stock changed since the last upload.

### Does the file have a header row?

No. Each row has four columns in a fixed order: date, supplier code, item number and quantity, separated by commas.

## Related

- [Business Central and Boots marketplace integration](../overview.md)
- [Item Inventory](../../../general/item-inventory.md) · [Destinations](../../../general/destinations.md) · [Outgoing Data](../../../general/outgoing-mapping/outgoing-data-web.md)
- How-to: [Send inventory to external systems](../../../../../how-to/web-connect/outgoing-inventory-to-external-systems.md) · [Resend an outgoing message](../../../../../how-to/web-connect/resend-outgoing-message.md)
