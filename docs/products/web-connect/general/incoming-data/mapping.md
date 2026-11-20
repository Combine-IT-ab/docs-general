# Web Connect Incoming Data Mapping

> **BC view name:** Web Connect Mappning inkommande data

## Overview

Incoming Data Mapping decides how each value in a message from an external system ends up in Business Central. There is one mapping line per key in the message. The line says which Business Central field the value is written to, how it is transformed on the way, and whether it is used to find an existing record.

Mappings belong to a [Web Connect Object](../objects.md). The object says which table the record is created in, and the mapping lines fill in its fields. Nested parts of the message, such as the lines or the delivery address of an order, have their own objects with their own mapping lines.

All mapping lines live in your own Business Central. You can see and change every line yourself.

## Reading the message

| Field | Description |
|-------|-------------|
| **JSON Key Name** | The key in the message that the line reads, for example `orderNumber` or `country.code`. A dot reads a key inside a nested object. |
| **Is Object** | The key holds a nested object, for example a delivery address. Its keys are mapped on the underlying object. |
| **Is Array** | The key holds a list, for example the order lines. Each element is processed by the underlying object. |
| **Source** | Limits the line to messages from one source, when the same object receives data from several sources. See **Fixed Source Value** on the [integration](../integrations.md). |
| **Priority No.** | Separates several lines that read the same key, for example when one value is written to two fields. |

## Writing to Business Central

| Field | Description |
|-------|-------------|
| **Field No.** | The Business Central field that the value is written to. Leave it empty on lines that only read a key for another purpose, such as a condition or a unique identifier. |
| **Set Value to Record** | The value is written to the field. Clear it when the line is only used to identify the record or to start something else. |
| **Validation Order** | The order in which the fields are written, and the order the lines are sorted in. Business Central runs the field's own logic when a value is set, so set the fields in the order you would enter them by hand. For example, the customer must be set on a sales order before the address and the prices. |
| **No Validation** | The value is written without running the field's own logic in Business Central. Use it when the validation would overwrite other values or fail on data that is already correct. |
| **Ignore if Blank** | An empty value in the message does not overwrite the value in Business Central. |
| **Map to Dimension** | The value is written to a dimension instead of a field, for example `MARKET` or `PROJECT`. |
| **Set Values From Template** | Fills several fields from a [Web Connect object template](../objects.md) at once, for example shipping data on an order. |
| **Config. Template Identifier** | The value chooses which configuration template Business Central uses when the record is created. |

## Transforming the value

The transformations are applied before the value is written. Several can be combined on one line.

| Field | Description |
|-------|-------------|
| **Logic Mapping** | Translates the value with a [text mapping](../text-mapping.md), for example a payment method or a shipping option in the external system to the code in Business Central. |
| **Lookup Field Code** | Looks up a record in Business Central and writes its key instead of the value. For example, the SKU in the message is looked up to find the item number and variant. |
| **Value from Dyn. Flow Field** | Calculates the value with a [dynamic flow field](../dynamic-flow-fields.md) instead of reading it from the message, for example the next free line number. |
| **Integration Value** | Reads the value from an integration variable instead of the message, for example the current date and time. |
| **Update Integration Value** | Saves the value from the message in the integration variable, so that the next download can start where this one ended. |
| **Max Length** | Cuts the value to a maximum number of characters. |
| **Cut out from Position** | Keeps the value from a given position, for example to remove a fixed prefix. |
| **Clear Chars** | Removes the given characters from the value, for example `-` or a space. |
| **Round Value** | Rounds a number to the given precision, for example `0,01`. |
| **Abs** | Uses the absolute value of a number. |
| **Minus** | Changes the sign of a number, for example when the external system sends a refund as a positive amount. |
| **Convert from UTC** | Converts a date and time from UTC to the time zone of Business Central. |
| **Decode Base64** | Decodes a Base64 value, for example a file in the message. |

## Values from the parent record

Underlying objects often need a value from the record above them, for example the document number on an order line.

| Field | Description |
|-------|-------------|
| **Parent WCM Object** | The object that the value is taken from, for example the order object for its lines. |
| **Parent Field No.** | The field on the parent record that the value is taken from, for example the document number. |
| **Related JSON Key Name** | A key in the parent part of the message that the value is read from, instead of a field on the parent record. |

## Finding or creating the record

| Field | Description |
|-------|-------------|
| **Primary Key** | The value is part of the primary key of the record. |
| **PK Auto Increment** | The value of the key is counted up instead of read from the message, for example line numbers in steps of `10000`. |
| **External ID Identifier** | The value, for example the order reference, is shown in its own column on the incoming data, so that you can search for a message and troubleshoot it. |
| **Set to External ID** | The value is saved as the external ID of the record in Business Central. |
| **Unique Identifier** | The fields marked here are used together as a filter to find a record that already exists, for example a delivery row ID together with the document type and number. Only needed when the same message can arrive more than once. Fields with the same **Validation Order** form one key, so you can have alternative keys, for example VAT number first, then organization number, then email. |
| **Unique Identity Action** | What happens when a record is found with the unique identifier: `Update` updates it, `No Action` ignores the object, and `Raise Error` stops the message as a duplicate. |
| **As Is Filter** | The value is used exactly as it is when Web Connect looks up a record. Without it, characters such as `&`, `*`, `=`, `<` and `>` are read as filter syntax, so a dimension value like `A&C` is not found. After changing it, set the incoming data back to not validated and run it again. Avoiding special characters in code fields is still the safest. |
| **Source Identifier** | The value tells which source the message comes from, instead of the fixed source on the integration. |

## Conditions

| Field | Description |
|-------|-------------|
| **Condition Code** | A [condition](../condition-list.md) that decides whether the line is used, for example only for wholesale orders or only for items that are not bundles. |
| **Condition** | `Include if Valid` uses the line when the condition is met. `Exclude if Valid` skips the line when the condition is met. `None` ignores the condition. |

## After the record is written

| Field | Description |
|-------|-------------|
| **Trigger Download Object** | Starts a download with another object, for example to fetch the full order when a message only contains its ID. |
| **Document Totals Function** | Points out where in the message the document totals are, so that Business Central can check them. When the document is complete and before it is released, Business Central calculates the total and compares it with the value from the message. This makes sure the order matches what the customer paid or what the payment provider reserved. `Total Amount Including VAT Check`, `Total Amount Excluding VAT Check` and `Total VAT Amount Check` compare the totals. `Freight Amount` and `Header Discount Amount` point out freight and document discount. The check is turned on with **Enable Totals Check** on the [object](../objects.md) for sales documents. |

## Advanced settings

These fields are used in a few setups for special cases. Leave them as they are unless CombineIT has set them up for you.

| Field | Description |
|-------|-------------|
| **Keep Record Value** | Advanced setting for when a value already in Business Central should be kept. |
| **Add/Remove VAT** | Advanced setting for amounts with or without VAT. |
| **Numeric Sum** | Advanced setting for numbers in a list. |
| **Value From Content Field No.** | Advanced setting for reading a value from another line. |
| **Execute After Under. Objects** | Advanced setting for the order in which a line is processed. |
| **Doc. Release Condition** | Advanced setting for releasing the document. |

## Examples

**Order number:** JSON Key Name `orderNumber`, Field No. 3 (No.) on the sales header, with **External ID Identifier** so that the same order is not created twice.

**Customer first:** the customer number gets **Validation Order** 1 and the addresses come after it, so that Business Central does not overwrite the addresses with the customer's defaults.

**Payment method per market:** JSON Key Name `paymentMethod` with a **Logic Mapping** that translates each payment method to the code in Business Central.

**Line number:** Field No. 4 (Line No.) on the sales line with **PK Auto Increment** `10000`, and the document number from the order through **Parent WCM Object** and **Parent Field No.**

## Configure it yourself in Business Central

| What you can change | Where | Example |
|---|---|---|
| Which key goes to which field | **JSON Key Name** and **Field No.** | Write a new key from the e-commerce platform to a field on the sales order |
| How the value is translated | **Logic Mapping**, **Lookup Field Code** | Add a new payment method or shipping option |
| When a line is used | **Condition Code** and **Condition** | Use another customer for wholesale orders |
| The order fields are written in | **Validation Order** | Set the customer before the prices |
| What happens with records that already exist | **Unique Identity Action** | Update the order instead of creating a new one |

## Related

- [Web Connect Incoming Data](README.md)
- [Web Connect Objects](../objects.md)
- [Web Connect Text Mapping](../text-mapping.md)
- [Web Connect Condition List](../condition-list.md)
- [Web Connect Dynamic Flow Fields](../dynamic-flow-fields.md)
