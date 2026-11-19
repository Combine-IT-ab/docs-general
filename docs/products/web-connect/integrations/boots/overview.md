---
title: "Business Central and Boots marketplace integration"
description: "Web Connect sends a stock file from Business Central to the Boots marketplace as CSV over SFTP, so Boots only sells what you can deliver. Set up in Business Central."
summary: "Web Connect by CombineIT connects Microsoft Dynamics 365 Business Central with the Boots marketplace. A stock file with the available quantity per item is created in Business Central and uploaded as a CSV file to the SFTP mailbox that Boots suppliers get on the Boots Dropship platform. All mappings and rules live in your own Business Central, where you can see and change them yourself."
slug: integrations/business-central-boots
lang: en
translation_key: integration-boots
product: web-connect
type: integration
system: "Boots marketplace"
system_category: "marketplace"
data_flows: 1
keywords:
  - business central boots integration
  - boots business central
  - boots marketplace erp integration
  - boots dropship stock file business central
faq:
  - question: "Can Business Central be integrated with the Boots marketplace?"
    answer: "Yes. Web Connect creates a stock file in Business Central with the available quantity per item and uploads it as a CSV file to the SFTP mailbox that Boots suppliers get on the Boots Dropship platform."
  - question: "What is in the stock file?"
    answer: "One row per changed item with four columns: the date in the format DD/MM/YYYY, your supplier code at Boots, the item number as the vendor article number, and the available quantity calculated in Business Central."
  - question: "Are Boots orders imported into Business Central?"
    answer: "Not today. The integration sends stock from Business Central to Boots. An order flow is planned but not live yet, and orders are handled in the Boots Dropship system. Invoices go to Boots through EDI."
  - question: "Where is the SFTP password kept?"
    answer: "In Web Connect Secret Value Storage in your own Business Central. The connection to the Boots Dropship SFTP mailbox uses the user name and password e2open gives you when you are onboarded."
last_reviewed: 2026-11-19
---

# Business Central and Boots marketplace integration

Web Connect by CombineIT connects Microsoft Dynamics 365 Business Central with the Boots marketplace. A stock file with the available quantity per item is created in Business Central and uploaded as a CSV file to the SFTP mailbox that Boots suppliers get on the Boots Dropship platform. All mappings and rules live in your own Business Central, where you can see and change them yourself.

## At a glance

| | |
|---|---|
| **System** | Boots marketplace (marketplace) |
| **Integration product** | Web Connect for Microsoft Dynamics 365 Business Central |
| **Runs in** | Your own Business Central environment, as an extension. Web Connect creates the stock file in Business Central when stock changes and uploads it to the SFTP mailbox. Nothing is received from Boots, so no webhooks and no external integration platform are involved. All processing and configuration stays in Business Central. |
| **Configured by** | You, in Business Central: mappings, conditions, triggers and flows. You can do all of it yourself. If you want, CombineIT takes part in any step, as a sounding board or by doing the work. |
| **Connection** | SFTP (port 22), with user name and password |
| **Boots platform** | Boots Dropship runs on e2open (formerly BluJay). Boots has no API of its own for suppliers. Stock is shared as a CSV file in an SFTP mailbox, following the template e2open gives each supplier at onboarding |
| **Data flows** | 1: stock |
| **Business Central editions** | All editions, Essentials and Premium, including the latest version |
| **Available from** | [Web Connect on Microsoft AppSource](https://marketplace.microsoft.com/sv-se/product/PUBID.martitab1633951001710%7CAID.webconnect%7CPAPPID.9f3a7223-19db-4ac7-832f-cf8e4699186f?tab=Overview). The Boots integration is not part of the Web Connect Ready Integrations app. It is set up in Web Connect as part of the implementation |

## What can be synchronized

Web Connect has one data flow between Business Central and the Boots marketplace.

| Data | Direction | What happens |
|---|---|---|
| [Stock](flows/stock-update.md) | Business Central → Boots | When stock changes, a CSV file with the date, your supplier code, the item number and the available quantity for the changed items is uploaded to the Boots Dropship SFTP mailbox |

The stock file is the whole integration today. Orders, order confirmations and invoices are not part of it, see [Limitations](#limitations).

## How it works

Web Connect calculates the available stock per item in [Item Inventory](../../general/item-inventory.md), using the locations and rules in [Destinations](../../general/destinations.md). It writes one row per changed item to a comma separated text file and uploads the file to the upload folder in the Boots Dropship SFTP mailbox. The upload is started by outgoing sync triggers when the calculated stock changes, and the file holds only the items whose stock has changed. The job queue then sends the file, and how often it runs can be adjusted to what your business needs. Every upload is logged in Web Connect [Entries](../../general/entries.md), where it can be checked and resent.

```mermaid
graph LR
    A["🔄 Business Central<br/>(ERP)"]
    B["⚙️ Web Connect<br/>(Business Central extension)"]
    C["🛒 Boots<br/>(marketplace)"]

    A -->|Available stock per item| B
    B -->|CSV file with changed stock, over SFTP| C
```

## Choose your setup

Each flow has to fit how your business works: which system owns the data, where people do their work, and what the accounting needs. That is why the flows are decided together when a new integration is set up. The options below are the ones Web Connect customers use today. **Common setup** marks the option most Web Connect customers with Boots use. **Recommended** marks CombineIT's best practice, where there is one.

The Boots integration is set up with one Web Connect customer today. That is too few to say what is common, so no option below is marked as common setup.

### Stock

| Option | How it works | When it fits |
|---|---|---|
| **Stock file calculated in Business Central** | Web Connect Item Inventory calculates the available stock for the locations that supply Boots, and the quantity is written to the stock file that is uploaded to the Boots Dropship SFTP mailbox | Business Central has the correct stock for the goods sold through Boots |

#### Stock calculated in Business Central and sent as a file

```mermaid
flowchart LR
    BC["🔄 Business Central<br/>Item Inventory"] -->|Available stock per item| WC["⚙️ Web Connect"]
    WC -->|CSV file over SFTP| B["🛒 Boots<br/>(marketplace)"]
```

Product listings, product codes and prices are always maintained with Boots.

## What you need

- Microsoft Dynamics 365 Business Central, any edition (Essentials or Premium), including the latest version
- Web Connect installed from Microsoft AppSource, with an activated Web Connect license
- Your approval for Web Connect to be installed and to act in your Business Central environment
- A supplier account on the Boots Dropship platform, with access to its SFTP mailbox. The user name and password are created by e2open when you are onboarded as a Boots supplier
- Your supplier code at Boots, which is written on every row of the stock file
- Your products set up with Boots, with your own product SKU (your item number) as the vendor article number, not the Boots product reference. Boots can only read stock for products it already knows

## Setting it up

1. Decide which locations supply Boots and which items are included, see [Choose your setup](#choose-your-setup).
2. Install Web Connect in Business Central, activate the license and give your approval.
3. Store the SFTP password in Web Connect [Secret Value Storage](../../general/secret-value-storage.md) and set up the connection to the SFTP mailbox with the user name from e2open.
4. Set your supplier code in the mapping and the locations in [Destinations](../../general/destinations.md), and check the calculated stock in [Item Inventory](../../general/item-inventory.md).
5. Upload a first file and let e2open confirm that it can be read before going live. Products must be set up with Boots for the test to cover the whole flow.

## Configure it yourself in Business Central

All configuration and logic in the integration is visible and editable in Business Central. There is no external integration platform where the logic is hidden.

| What you can change | Where in Web Connect | Example |
|---|---|---|
| Columns in the stock file | [Outgoing Data](../../general/outgoing-mapping/outgoing-data-web.md) | Change the order of the columns, the date format or the fixed supplier code |
| Which stock is sent | [Item Inventory](../../general/item-inventory.md) and [Destinations](../../general/destinations.md) | Calculate stock only for the locations that supply Boots |
| Conditions | [Condition List](../../general/condition-list.md) | Send 0 for items you do not want Boots to sell for the moment |
| What triggers an upload | [Outgoing Sync Triggers](../../general/outgoing-mapping/outgoing-sync-triggers.md) | Choose which changes in Business Central start an upload |
| Monitoring and resending | [Entries](../../general/entries.md) | See every file uploaded and [resend a message](../../../../how-to/web-connect/resend-outgoing-message.md) |

## Configuration choices

- **Locations:** which Business Central locations make up the stock that Boots sees.
- **Supplier code:** the code e2open gives you when you are set up on the Boots Dropship platform. It is set as a fixed value in the mapping and written on every row.
- **Item number:** the Business Central item number is sent as the vendor article number. It is your own product SKU, not the Boots product reference, and it must match the vendor article number Boots has on the product.
- **File:** the separator (comma), the date format (DD/MM/YYYY), the file name and the folder on the SFTP server.
- **Timing:** a file is created when stock changes, and holds only the changed items. How often the job queue sends it can be adjusted to what your business needs.

## Limitations

- **Stock only.** The integration sends stock from Business Central to Boots. Orders, order confirmations and shipments are not part of it today. An order flow is planned, but not live, since no customer needs it yet. Until then, orders are handled in the Boots Dropship system.
- **Invoices go through EDI.** Boots receives supplier invoices through EDI, which is set up separately from this integration.
- **Nothing comes back from Boots.** Web Connect uploads the file but does not read a response or error file from Boots. If Boots cannot match a row to a product, it is seen on the Boots Dropship platform, not in Business Central.
- **Products must exist with Boots first.** Stock for an item number that Boots does not know as a vendor article number has no effect.
- **Only changed items.** Each file holds the items whose stock changed. A full stock file with every item is not sent on a schedule in the standard setup.
- **No headers in the file.** The file has four columns in a fixed order without a header row, as set in the mapping.

## Frequently asked questions

### Can Business Central be integrated with the Boots marketplace?

Yes. Web Connect creates a stock file in Business Central with the available quantity per item and uploads it as a CSV file to the SFTP mailbox that Boots suppliers get on the Boots Dropship platform.

### What is in the stock file?

One row per changed item with four columns: the date in the format DD/MM/YYYY, your supplier code at Boots, the item number as the vendor article number, and the available quantity calculated in Business Central.

### Are Boots orders imported into Business Central?

Not today. The integration sends stock from Business Central to Boots. An order flow is planned but not live yet, and orders are handled in the Boots Dropship system. Invoices go to Boots through EDI.

### Where is the SFTP password kept?

In Web Connect Secret Value Storage in your own Business Central. The connection to the Boots Dropship SFTP mailbox uses the user name and password e2open gives you when you are onboarded.

## Related

- Flows: [Stock](flows/stock-update.md)
- How-to: [Send inventory to external systems](../../../../how-to/web-connect/outgoing-inventory-to-external-systems.md) · [Resend an outgoing message](../../../../how-to/web-connect/resend-outgoing-message.md) · [Integration is not running](../../../../how-to/web-connect/integration-not-running.md)
- [Web Connect general documentation](../../general/README.md)

## About Web Connect

Web Connect is an integration platform for Microsoft Dynamics 365 Business Central, developed by CombineIT. It is installed in your own Business Central and connects it with e-commerce platforms, warehouse systems, POS, returns, marketplaces and EDI. Every flow, mapping and rule is configured in Business Central, where you can see and change it yourself, without custom code for each integration. [Web Connect on Microsoft AppSource](https://marketplace.microsoft.com/sv-se/product/PUBID.martitab1633951001710%7CAID.webconnect%7CPAPPID.9f3a7223-19db-4ac7-832f-cf8e4699186f?tab=Overview) · [Contact CombineIT](https://www.combineit.se/contact/)
