# Web Connect Lookup Values

## Overview

A lookup value finds a record in Business Central with a value from the external system and returns another field from that record. The most common example is the SKU: an order from the e-commerce platform only contains the SKU, but Business Central needs the item number and the variant code. Two lookup values find the SKU and return the item number and the variant code.

A lookup value is used on an [incoming mapping line](incoming-data/mapping.md) with **Lookup Field Code**. The value from the message goes in, and the value from the found record is written to the field instead.

All lookup values live in your own Business Central. You can see and change every lookup yourself.

## Fields

### What to look up

| Field | Description |
|-------|-------------|
| **Lookup Code** | Unique identifier for the lookup, for example `SKU-TO-ITEM` or `SKU-TO-VARIANT`. This is the code you choose in **Lookup Field Code** on the mapping line. |
| **Description** | What the lookup does, for example "Item No. from SKU". |
| **Lookup Table No.** | The table that is searched, for example the Web Connect item SKU table, Item Reference or Customer. |
| **Lookup Filter Field No.** | The field in that table that must equal the value from the message, for example the SKU field. |
| **Lookup Field Name** | The name of the field in **Lookup Filter Field No.** It is filled in automatically. |
| **Lookup Table View** | An extra filter on the table, set with the filter button. For example, only look among references of the type bar code. |

### What to return

| Field | Description |
|-------|-------------|
| **Return Field No.** | The field on the found record whose value is returned, for example the item number or the variant code. |
| **Return Field Name** | The name of the field in **Return Field No.** It is filled in automatically. |
| **Return Field Mapping** | Translates the returned value with a [text mapping](text-mapping.md) before it is used. |
| **Return Blank if not Found** | Returns an empty value when no record is found. Use it when the field may be empty, for example the variant code for an item without variants. |

## Examples

**Item number from SKU:** **Lookup Table No.** is the Web Connect item SKU table, **Lookup Filter Field No.** is the SKU field and **Return Field No.** is the item number. The mapping line for the item number on the sales line uses this lookup.

**Variant code from SKU:** the same table and filter field, but **Return Field No.** is the variant code. With **Return Blank if not Found**, items without variants work too.

**Item from EAN:** **Lookup Table No.** is Item Reference, **Lookup Filter Field No.** is the reference number, **Lookup Table View** limits it to bar codes, and **Return Field No.** is the item number.

**Location from customer:** **Lookup Table No.** is Customer, **Lookup Filter Field No.** is the customer number and **Return Field No.** is the location code, so that each customer's orders are shipped from the right warehouse.

## Lookup value or dynamic flow field

A lookup value searches one table with one value from the message and returns one field. When you need several steps, a calculation or data from several tables, use a [dynamic flow field](dynamic-flow-fields.md) instead.

## Configure it yourself in Business Central

| What you can change | Where | Example |
|---|---|---|
| Which field is returned | **Return Field No.** | Return the variant code instead of the item number |
| Which records are searched | **Lookup Table View** | Only search bar codes, not supplier references |
| How a missing record is handled | **Return Blank if not Found** | Allow items without variants |
| Where the lookup is used | **Lookup Field Code** on the mapping line | Look up the item from the EAN instead of the SKU |

## Related

- [Web Connect Incoming Data Mapping](incoming-data/mapping.md)
- [Web Connect Text Mapping](text-mapping.md)
- [Web Connect Table Relations](table-relations.md)
- [Web Connect Dynamic Flow Fields](dynamic-flow-fields.md)
