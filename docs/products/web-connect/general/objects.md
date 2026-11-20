# Web Connect Objects

> **BC view name:** Web Connect Objekt

## Overview

A Web Connect Object describes one kind of data that is exchanged with an external system, for example orders, order lines, items or stock. Each object belongs to an [integration](integrations.md) and is linked to a Business Central table. The object says where the data is fetched from or sent to, when it runs, and how records are found, created and checked.

Objects are nested in a tree that follows the structure of the message. An order object has underlying objects for its lines, addresses and payments, and the values are mapped on each object with [Incoming Data Mapping](incoming-data/mapping.md) or [Outgoing Mapping](outgoing-mapping/README.md).

All objects live in your own Business Central. You can see and change every setting yourself.

## General

| Field | Description |
|-------|-------------|
| **WCM Object** | The code of the object. It usually starts with the **Web Object Prefix** of the integration, for example `CA_ORDER` for Centra. |
| **Description** | A readable description, for example what the object is used for. |
| **Integration Source** | The integration that the object belongs to. |
| **Source** | Limits the object to data from one source, when the same integration receives data from several sources. |
| **Table No.** | The Business Central table that records are read from or written to, for example 36 for Sales Header or 27 for Item. |
| **Primary Key No.** | Which key on the table Web Connect uses to find records. |
| **Integration Queue Code** | The queue that the object's data is processed in, so that urgent data can run separately from large batches. |
| **Monitor E-Mail List** | Email addresses that are notified when the object has errors. |

## The object tree

| Field | Description |
|-------|-------------|
| **Parent Object** | The object that this object sits under, for example the order object for order lines. |
| **Json Key Identifier List** | The key in the parent part of the message that this object handles, for example `lines` or `billingAddress`. |
| **Object Id. Condition Code** | A [condition](condition-list.md) that decides which object a part of the message goes to, when the same key can hold different kinds of data. For example, a customer can be routed to one object for companies and another for persons. |
| **Inherit Content from Parent** | The object reads its values from the parent's part of the message instead of a nested key. |
| **Content Create Order** | The order in which records are created from one message, so that the header exists before the lines and the lines before the payments. |

## Addresses and requests

| Field | Description |
|-------|-------------|
| **Path** | The path added to the integration's address for this object. `%1` is replaced with an ID, for example the external ID of the record. |
| **Download Path** and **Upload Path** | A separate path or query string for downloads and uploads, when they differ. |
| **HTTP Method Download**, **Create**, **Update** and **Delete** | Override the methods on the [integration](integrations.md) for this object, for example `PATCH` for one endpoint. |
| **HTTP Headers Object** | An object that holds extra HTTP headers for the requests, for example an API version or a language. |
| **URL Parameters Object** | An object that builds the query parameters of the request. |
| **GraphQL Query** | The GraphQL query or mutation that is sent, for GraphQL integrations. |
| **GraphQL Extra** | Fragments and other GraphQL text that the query uses. |
| **Standard XML Namespace** and **Standard XML Prefix** | The namespace and prefix used for XML and SOAP messages. |
| **Data Array Jpath** | The path to the list of records in the response, for example `data.orders`. Overrides **Data Array Jpath** on the integration. |

## Downloading

| Field | Description |
|-------|-------------|
| **Download Data** | The object is downloaded by the download job. |
| **No. of Minutes between Runs** | How often the object is downloaded. |
| **Starting Time** and **Ending Time** | The time of day the download runs within, for example only at night. |
| **Download Priority Order** | The order in which objects are downloaded. A lower number runs first. |
| **Service Type for Download** | Whether the download fetches one record (`Get`) or all records (`Get All`). |
| **Web Object for Download Req.** | Another object that is downloaded for each record, for example the status of each order. |
| **Jpath External Id For Download** | The key in the message that holds the ID used in that request, for example `orderNumber`. |
| **Download Poll DateTime Var.** | An [integration variable](integrations.md) that remembers when the object was last downloaded, so that the next download only fetches what has changed since then. |
| **Pagination Option** | How Web Connect fetches more pages when the response is split: `No Pagination`, a page number in the query, or a value from the response such as a `next` link. |
| **Pagination Parameter** | The query parameter for the page, for example `?Page=` or `&start=`. |
| **Data Entries per Page** | How many records each page holds, for example `200`. |
| **JPath for Pagination** | The key in the response that holds the next page, for example `next`. |

## Uploading

| Field | Description |
|-------|-------------|
| **MaxRecord per Entry** | How many outgoing records are grouped into one message. `0` sends one record as an object, `1` sends a list with one record, and a higher number sends a list with up to that many records, for example for stock updates. Pick what the external API expects. |
| **Upload Priority Order** | The order in which objects are uploaded. A lower number runs first. |
| **Upload Condition Code** | A [condition](condition-list.md) that must be met for a record to be sent, for example that the item has an ID in the external system. |
| **Upload OK Condition Code** | A condition on the response that decides whether the upload counts as successful. |
| **Extract Ext. Id From Create** | The ID that the external system returns when a record is created is saved as the external ID in Business Central. |
| **Outgoing Sync Table View** | A filter on the table that limits which records are sent, for example only items of a certain type. |
| **Item Data Export**, **Price Data Export**, **Inventory Data Export** and **Customer Data Export** | Marks the object as the one that sends items, prices, stock or customers, for the standard exports in Web Connect. |

## Processing incoming data

| Field | Description |
|-------|-------------|
| **Process Condition Code** | A [condition](condition-list.md) that must be met for the incoming record to be processed, for example only orders from one sales channel. |
| **Insert Option** | Whether the record is inserted into the table (`Standard (Insert)`) or only used to update or read (`No Insert`). |
| **Object Retention Policy** | How long incoming data for the object is kept before it is cleaned up, for example `1 Hour` for frequent stock messages. |
| **Web Hook Action** | What happens when the external system calls Web Connect through a [webhook](webhooks.md): `No Action`, `Download Content`, `Create Content`, `Find Record and Respond` or `Create and Respond`. The last two are synchronous and answer the caller directly. |
| **Web Hook Response** | The response that is sent back to the caller, for example `OK`. |

## Sales documents

These fields are used on the object for sales headers.

| Field | Description |
|-------|-------------|
| **Enable Totals Check** | Before the document is released, Business Central compares its total with the total in the message. Which values are compared is set with **Document Totals Function** in the [mapping](incoming-data/mapping.md). |
| **Enable VAT Check** | The VAT amount is compared in the same way. |
| **Total Amt. Document Tolerance** | How much the totals may differ, for example for rounding. |
| **Auto Release Documents** | The document is released automatically when it has been created and checked. |
| **Auto-Release Condition Code** | A [condition](condition-list.md) that must be met for the document to be released automatically. |
| **Shipping Fee Type** and **Shipping Fee No.** | The G/L account or item that freight from the message is added as. |
| **Discount Type** and **Discount No.** | The G/L account or item that a document discount from the message is added as. |
| **No. Series Underlying** | The number series used for records created by the underlying objects. |
| **Allow Modify on Posted** | Allows the object to update documents that are already posted. |

## Processors

The processors split the processing of an object into parallel jobs. The fields are filled in by Web Connect and show the state: **Processor No.**, **Create Content Prefix** and **Create Content Counter** (how the created records are numbered), **StartKey** and **EndKey** (the range the processor works on), **Enqued Task**, **Session Running**, **Last Start Datetime**, **Last End Datetime**, **Processor Duration** and **Job Queue ID**.

## Advanced settings

These fields are used in a few setups for special cases. Leave them as they are unless CombineIT has set them up for you.

| Field | Description |
|-------|-------------|
| **Ignore Object In Download** | Advanced setting for underlying objects during download. |
| **Cloned from Parent** | Advanced setting for objects copied from their parent. |
| **Download from Request Content** | Advanced setting for downloads based on the request. |
| **Process Created Content** | Advanced setting for processing created content. |
| **Content Id from Ext. Id** | Advanced setting for the ID of incoming content. |
| **Poll DateTime Major** and **Poll DateTime Major At** | Advanced setting for a longer look back on a schedule. |
| **Page Multiply Data Entries** | Advanced setting for pagination. |
| **Max Resend Requests** | Advanced setting for resending requests. |
| **Variable Text Seperator** | Advanced setting for messages in text format. |
| **Upload Data Compression** | Advanced setting for compressing uploads. |
| **Deleted Data Option** | Advanced setting for records deleted in Business Central. |
| **Double Price Check** | Advanced setting for price checks. |
| **Create Request Codeunit**, **Read Codeunit**, **Validator Codeunit**, **Create/Update Codeunit** and **Post Create/Update Codeunit** | The code that runs each step. The standard values work for most objects. |

## Configure it yourself in Business Central

| What you can change | Where | Example |
|---|---|---|
| How often data is fetched | **No. of Minutes between Runs**, **Starting Time** and **Ending Time** | Fetch orders every five minutes, prices only at night |
| Which records are sent | **Upload Condition Code** and **Outgoing Sync Table View** | Only send items that exist in the e-commerce platform |
| How many records go in one call | **MaxRecord per Entry** | Send stock in batches of 100 |
| When orders are released | **Auto Release Documents** and **Auto-Release Condition Code** | Release web orders automatically, but not wholesale orders |
| How much a total may differ | **Total Amt. Document Tolerance** | Allow a small rounding difference |

## Related

- [Web Connect Integrations](integrations.md)
- [Web Connect Incoming Data Mapping](incoming-data/mapping.md)
- [Web Connect Outgoing Mapping](outgoing-mapping/README.md)
- [Web Connect Condition List](condition-list.md)
- [Web Connect Webhooks](webhooks.md)
