# Web Connect Incoming Data

> **BC view name:** Web Connect Inkommande data webb

## Overview

Web Connect Incoming Data is the inbox for everything that Web Connect receives from external systems: answers to downloads, answers to uploads and messages from webhooks. Each record is one message, or one part of a message, that the download job processes and writes to Business Central.

## How a message is processed

The download job does three things with a message before anything is written to Business Central.

1. **Converts it to JSON.** Incoming data is always handled as JSON, whatever format the external system uses. XML, variable text such as a semicolon separated file, URL encoded data and GraphQL answers are converted first. The format is chosen with **Data Type** on the [integration](../integrations.md).
2. **Splits it into records.** An answer often holds a list, for example seven orders. Each element in the list becomes its own incoming data record. **Data Array Jpath** on the integration says where the list is, for example `items` or `data`. It can be changed per [object](../objects.md).
3. **Splits each record into objects.** The message is divided into the underlying objects, usually one per table in Business Central. For an order, the header goes to the sales header and the order lines to the sales lines.

After that the records are validated and created or updated in Business Central with the [incoming data mapping](mapping.md).

## The object tree

```
Order (root object)   ←  { "orderNumber": "...", "orderItems": [...] }
└── Order line        ←  [ { "sku": "...", "quantity": 2 }, ... ]
```

| Field on the object | Description |
|---------------------|-------------|
| **Parent Object** | The object above this one in the message, for example the order for its lines. |
| **Json Key Identifier List** | The key in the parent part of the message that belongs to this object, for example `orderItems`. Several keys can be listed, separated by commas. |
| **Object Id. Condition Code** | A [condition](../condition-list.md) that must be met for a part of the message to belong to this object. Use it when the same key can hold different things, for example an order line that should become a transfer instead of a sales line. |
| **Ignore Object In Download** | The part of the message is not processed at all. Use it for parts you do not need, such as packing slip details. |
| **Content Create Order** | The order in which the objects are created, for example the header first, then the lines, then the payments. |

The first time a new type of message is received, Web Connect splits it by itself and names each new object after its key in the message. Rename and connect the objects to tables as needed.

## Source

Every incoming data record has a source. The mapping can be limited to one source, for example to treat wholesale and retail orders differently. The source is usually the **Fixed Source Value** on the [integration](../integrations.md). It can also be read from the message with **Source Identifier** in the [mapping](mapping.md).

## Finding a message

Set **External ID Identifier** on a mapping line, for example on the order number. The value is then shown in its own column in the incoming data, so you can filter on it when you troubleshoot. See [Web Connect Incoming Data Mapping](mapping.md).

## When something goes wrong

If a message fails, it stays in the incoming data with an error and nothing more happens to it. Open the record to see the message, how it was split and the error. Correct the mapping or the data in Business Central, set the record back and run it again. When you test a new mapping, delete what the previous run created before you run it again.

To see exactly what was received, open the [Web Connect Entry](../entries.md) that the record came from.

## Configure it yourself in Business Central

| What you can change | Where | Example |
|---|---|---|
| Where the list of records is in the answer | **Data Array Jpath** on the integration or the object | The answer puts the orders under `data` |
| Which parts of the message are handled | **Ignore Object In Download** | Skip parts of the message that are not needed |
| The order records are created in | **Content Create Order** | Create the order header before its lines |
| How values are written to Business Central | The [incoming data mapping](mapping.md) | Map a new field from the web shop |

## In this section

- [Web Connect Incoming Data Mapping](mapping.md)

## Related

- [Web Connect Objects](../objects.md)
- [Web Connect Entries](../entries.md)
- [Web Connect Text Mapping](../text-mapping.md)
- [Web Connect Condition List](../condition-list.md)
