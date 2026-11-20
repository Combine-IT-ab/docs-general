# Web Connect Outgoing Mapping

> **BC view name:** Web Connect Datamappning utgående

## Overview

Outgoing Mapping decides how a record in Business Central is turned into a message to an external system. There is one mapping line per key in the message. The line says where the value comes from, how it is formatted and when it is included.

Mappings belong to a [Web Connect Object](../objects.md). The object says which table the record is read from, and the mapping lines build the message. Nested parts of the message, such as the lines of an order or the variants of a product, have their own objects with their own mapping lines.

All mapping lines live in your own Business Central. You can see and change every line yourself. You edit them on the object: open **Web Connect Integrations**, select the integration, open the object and go to its outgoing mapping. The view **Web Connect Datamappning utgående** lists the lines of all objects, and you can filter it on one object.

## How a record is sent

Sending is asynchronous. The user's action is finished when the record has been queued, and the rest happens in the upload job queue.

1. A change in Business Central fires an [outgoing sync trigger](outgoing-sync-triggers.md), or someone adds the record manually.
2. A row is created in [Web Connect Outgoing Data](outgoing-data-web.md) with the object and the record.
3. The upload job builds the message from the mapping lines and creates a [Web Entry](../entries.md). Several records can be grouped into one message, see the [object](../objects.md).
4. The upload job sends the Web Entry and saves the request and the response.

## Building the message

| Field | Description |
|-------|-------------|
| **JSON Key Name** | The key in the message, for example `name` or `quantity`. In XML it is the element name. |
| **Entry No.** | The line number. The lines are written to the message in this order. |
| **Applies-to Service Type** | Limits the line to one kind of request. `Create` includes the line only when a record is created in the external system, and `Update` only when it is updated. Blank includes the line in all requests. Use it when the external system wants a different message for create and update, for example an ID that only exists after the record is created. |
| **Exclude if Blank** | The key is left out of the message when the value is empty, instead of being sent as an empty value. |
| **Add External ID** | The value is the external ID of the record, for example the ID the external system gave the product. Used on updates so that the external system knows which record to change. |
| **Add Data** | The key holds the data of the record. Used on an envelope object that wraps the message, for example when the external system wants the orders under a key like `SalesOrders`. |

## Where the value comes from

Use one of these per line.

| Field | Description |
|-------|-------------|
| **Field No.** | The Business Central field that the value is read from. |
| **Fixed Value** | A fixed text that is sent as it is, for example a currency code or `true`. |
| **Dynamic Field** | Calculates the value with a [dynamic flow field](../dynamic-flow-fields.md), for example an ID from a related table. |
| **Integration Value** | Reads the value from an integration variable, for example the current date and time or an account ID. |
| **Update Integration Value** | Saves the sent value in the integration variable, so that the next message can continue from it. |

## Nested objects and related records

| Field | Description |
|-------|-------------|
| **Child Object** | The object that builds the nested part, or that the value is looked up from. |
| **Child Relation** | The table relation that connects the record to the child object, for example an order to its lines or a variant to its item. |
| **Child Field Type** | How the child object is added. `Underlying Object` adds a nested object, for example a delivery address. `Underlying Array` adds a list, for example the order lines. `Single Field Lookup` sends one field from the related record, chosen in **Field No.** |

## Formatting the value

The formatting is applied before the value is sent. Several can be combined on one line.

| Field | Description |
|-------|-------------|
| **Output Format** | The data type in the message: `String`, `Integer`, `Decimal`, `Boolean`, `Date`, `DateTime` or `Custom`. |
| **Custom Format** | The format used when **Output Format** is `Custom`. It is written as a Business Central format string, for example `<Sign><Integer><Decimals,3><Comma,.>` for a number with a decimal point. |
| **Mapping** | Translates the value with a [text mapping](../text-mapping.md), for example a country code or a status in Business Central to the value the external system expects. |
| **Max Length** | Cuts the value to a maximum number of characters. |
| **Cut out from Position** | Keeps the value from a given position, for example to remove a fixed prefix. |
| **Clear Chars** | Removes the given characters from the value, for example `-` or a space. |
| **Round Value** | Rounds a number to the given precision, for example `0,01`. |
| **Round Option** | How the number is rounded. `Standard` rounds to the nearest value. |
| **Encode Base64** | Encodes the value as Base64, for example a picture or a long text that the external system wants encoded. |

### Date and time values

Web Connect sends date and time values in UTC. A value with **Output Format** `DateTime` is sent with milliseconds and a `Z` at the end, which means UTC. If the external system does not accept that, for example in a URL parameter, set **Output Format** to `String` and **Max Length** to `19`. That keeps `yyyy-MM-ddTHH:mm:ss`. The value is still UTC.

## XML and SOAP

| Field | Description |
|-------|-------------|
| **Position No.** | The level or position of the element in an XML message. |
| **Sub Position No.** | Position within the element. Not used for JSON. |
| **Is Attribute** | The value is sent as an attribute on the element instead of as its own element. |
| **Prefix** | The namespace prefix of the element, for example `soapenv`. |
| **Special Namespace** | Uses another namespace for this element than the one on the object. |
| **Add as CDATA** | The XML from the child object is put inside the element as CDATA, for example a login block that the external system wants as text inside a SOAP request. |

## Conditions

| Field | Description |
|-------|-------------|
| **Condition Code** | A [condition](../condition-list.md) that decides whether the line is used, for example only for one country or only when the stock is negative. |
| **Condition** | `Include if Valid` uses the line when the condition is met. `Exclude if Valid` skips the line when the condition is met. Blank ignores the condition. |

## Advanced settings

These fields are used in a few setups for special cases. Leave them as they are unless CombineIT has set them up for you.

| Field | Description |
|-------|-------------|
| **Include/Exclude VAT** | Advanced setting for sending amounts with or without VAT. |
| **Set to Web Entry Field No.** | Advanced setting that copies the value to a field on the Web Entry. |
| **Child Field Type** `Underlying Single Array` and `Underlying Array of Array` | Advanced variants of lists in the message. |

## Examples

**Product name:** JSON Key Name `name`, Field No. 3 (Description) on the item, **Output Format** `String`.

**Order lines:** JSON Key Name `lines`, **Child Object** set to the line object, **Child Relation** from the order to its lines, and **Child Field Type** `Underlying Array`.

**Status in the external system's words:** the status field with a **Mapping** that translates each status in Business Central to the value the external system expects.

**Create or update:** the external ID with **Add External ID** and **Applies-to Service Type** `Update`, so that the ID is only sent when the record already exists in the external system.

## Configure it yourself in Business Central

| What you can change | Where | Example |
|---|---|---|
| Which field is sent in which key | **JSON Key Name** and **Field No.** | Send a new field on the item to the e-commerce platform |
| How the value is translated | **Mapping** | Add a new country or status |
| When a line is used | **Condition Code** and **Condition** | Only send a value for one market |
| Empty values | **Exclude if Blank** | Leave out an empty phone number |
| Stop sending a value | Clear **Field No.** or delete the line | See [How to stop sending a value](../../../../how-to/web-connect/stop-sending-value-outgoing.md) |

Test changes in a sandbox first. After a change, already sent records are not sent again by themselves. See [How do I resend an outgoing message?](../../../../how-to/web-connect/resend-outgoing-message.md)

## In This Section

- [Web Connect Outgoing Data](outgoing-data-web.md)
- [Web Connect Outgoing Sync Triggers](outgoing-sync-triggers.md)
- [Web Connect Item Price](item-price.md)
