# Web Connect Dynamic Flow Fields

> **BC view name:** Web Connect Dynamiska flödesfält

## Overview

A dynamic flow field calculates a value that is not stored on the record itself. It can fetch a value from another table, add or subtract amounts, or put several texts together. For example the VAT amount of an invoice line, the description of a variant with both description fields, or the price of an item from the right price list.

The value is calculated for one record at a time, when Web Connect needs it. Nothing is written back to Business Central.

All dynamic flow fields live in your own Business Central. You can see and change every calculation yourself.

## Where dynamic flow fields are used

| Where | Field | What it does |
|---|---|---|
| [Outgoing data](outgoing-mapping/outgoing-data-web.md) | **Dynamic Field** | Sends a calculated value instead of a field on the record. |
| [Incoming data mapping](incoming-data/mapping.md) | **Value from Dyn. Flow Field** | Writes a calculated value instead of a value from the message. |
| [Condition lines](condition-list.md) | **Lookup Dynamic Flow Field Code** | Checks a calculated value, for example whether the delivery country is in the EU. |
| [Table relations](table-relations.md) | **Related Dynamic Flow Field** | Uses a calculated value in a filter, for example a date. |
| Other dynamic flow fields | **Dynamic Flow Field Code** on a line | Uses one calculation inside another. |

## Dynamic flow field header

| Field | Description |
|-------|-------------|
| **Code** | Unique identifier for the dynamic flow field, for example `VAT-AMOUNT-LINE`. |
| **Description** | What the field calculates, in plain words. |
| **WCM Object** | The [object](objects.md) for the record the calculation starts from, for example the sales invoice line. It must be the same object as where the field is used. |
| **Table No.** | The table of **WCM Object**. It is filled in from the object. |
| **Field Type** | The type of the result: `Text`, `Decimal`, `Integer` or `Date`. |
| **Fixed Value** | A fixed text that is returned instead of a calculation. The field then has no lines. Used for constants and separators, for example `-` or a space between two texts. |

## Calculation lines

Each line fetches one value and adds it to the result. The lines are calculated in the order of **Entry No.**

### Where the value comes from

| Field | Description |
|-------|-------------|
| **Entry No.** | The order of the lines. |
| **Relation Code** | The [table relation](table-relations.md) that finds the record the value is read from, starting from the record of the header. A relation from a table to itself, for example from the invoice line to the same invoice line, reads from the record itself. |
| **WCM Object** | The object for the table the value is read from. It is filled in from the relation. |
| **Table No.** | The table the value is read from. It is filled in from the relation. |
| **Field No.** | The field whose value is read. |
| **Dynamic Flow Field Code** | Reads the value of another dynamic flow field instead of a field, calculated for the record the relation finds. Use it to reuse a calculation or to add a separator. |
| **Field Calculation** | How the value is read when the relation finds records: `Lookup` reads the field of the first record found, `Sum` adds the field of all records found. |

### How the value is used

| Field | Description |
|-------|-------------|
| **Flow Calculation** | How the value is combined with the result of the lines above: `Addition`, `Subtraction`, `Multiplication` or `Divison`. For a `Text` field, `Addition` puts the texts together. |
| **Condition Code** | A [condition](condition-list.md) that must be true for the line to be used, for example only divide when the quantity is not zero. |
| **Include if Previous Blank** | The line is only used when the lines above gave an empty value. Use it for a fallback, for example the price of the variant first and the price of the item if the variant has none. |

## Examples

**VAT amount on an invoice line:** **Field Type** `Decimal`. The first line reads **Amount Including VAT** with `Addition`, the second reads **Amount** with `Subtraction`. Both use a relation from the invoice line to itself.

**Unit price excluding VAT:** the first line reads **Amount** with `Addition`, the second reads **Quantity** with `Divison` and a **Condition Code** that checks that the quantity is not zero.

**Description 1 and 2:** **Field Type** `Text`. The first line reads **Description**, the second uses **Dynamic Flow Field Code** for a field with **Fixed Value** ` - `, and the third reads **Description 2**. All with `Addition`.

**Shipping cost of an order:** **Field Type** `Decimal`, one line with a relation from the sales header to its freight lines, **Field Calculation** `Sum` on **Amount**.

**Price with fallback:** the first line reads the price from a relation that finds the price list line of the variant. The second line reads the price from a relation that finds the price list line of the item, with **Include if Previous Blank**.

## Limits

A dynamic flow field is calculated for one record at a time. It cannot be used to select records, for example as a filter in a relation that should find many records. That would mean calculating the value for every record in the table, which is far too slow. Filter on a stored field instead.

## Advanced settings

These fields are used in a few setups for special cases. Leave them as they are unless CombineIT has set them up for you.

| Field | Description |
|-------|-------------|
| **Flow Calculation** `Insert (Substring)` | Advanced setting for putting a value into a text, for example a tracking number into a tracking link. |

## Configure it yourself in Business Central

| What you can change | Where | Example |
|---|---|---|
| Which field is read | **Field No.** on the line | Send **Description 2** instead of **Description** |
| Add a value | A new line with **Flow Calculation** | Subtract quantity on transfer orders |
| Separator between texts | **Fixed Value** on a separate dynamic flow field | Use a space instead of a dash |
| Fallback when a value is missing | **Include if Previous Blank** | Use the item price when the variant has none |

Test a change on one record before you rely on it. A dynamic flow field can be used in several mappings, so a change affects all of them.

## Related

- [Web Connect Table Relations](table-relations.md)
- [Web Connect Condition List](condition-list.md)
- [Web Connect Outgoing Data](outgoing-mapping/outgoing-data-web.md)
- [Web Connect Item Inventory](item-inventory.md)
- [Web Connect Objects](objects.md)
