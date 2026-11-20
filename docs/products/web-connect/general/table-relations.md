# Web Connect Table Relations

## Overview

A table relation tells Web Connect how to find records in one table from a record in another table. For example, how to find the sales lines of a sales header, the item of a warehouse line, or the price list lines of an item.

Table relations are used wherever Web Connect needs data that is not on the record itself:

| Where | What the relation does |
|---|---|
| [Dynamic flow fields](dynamic-flow-fields.md) | Finds the record that a calculation line reads its value from. |
| [Outgoing sync triggers](outgoing-mapping/outgoing-sync-triggers.md) | Finds the records that should be sent when another record changes, for example the order when a line changes. |
| [Outgoing data](outgoing-mapping/outgoing-data-web.md) | Finds the underlying records of a message, for example the lines of an order, with **Child Relation**. |

All table relations live in your own Business Central. You can see and change every relation yourself.

## Which way the relation goes

A relation starts from the table you want to find records in, not from the table you come from. The table you come from is the related table.

For example, the relation that finds the sales lines of a sales header has the sales line as **WCM Object** and the sales header as **Relation Object**. Name the relation so that it says what it selects, for example `SALES-LINES-FROM-HEADER`.

## Relation header

| Field | Description |
|-------|-------------|
| **Relation Code** | Unique identifier for the relation. |
| **WCM Object** | The [object](objects.md) for the table you want to find records in. |
| **Table No.** | The table of **WCM Object**. It is filled in from the object. |
| **Relation Object** | The object for the table you come from. |
| **Related Table No.** | The table of **Relation Object**. It is filled in from the object. |

## Relation lines

Each line adds a filter on the table you want to find records in. All lines apply together.

| Field | Description |
|-------|-------------|
| **Line No.** | The order of the lines. |
| **Relation Type** | How the line filters, see below. |
| **Field No.** | The field in the table you want to find records in, for example **Document No.** on the sales line. |
| **Field Name** | The name of the field in **Field No.** It is filled in automatically. |
| **Relation Field No.** | The field on the record you come from whose value is used, for example **No.** on the sales header. |
| **Relation Field Name** | The name of the field in **Relation Field No.** It is filled in automatically. |
| **Filter String** | The filter for a line of the type `Filter String`, for example `<>0`, `1\|2` or `<=%1`. |
| **Related Dynamic Flow Field** | A [dynamic flow field](dynamic-flow-fields.md) whose value is used in the filter, through a value of the type `Value from Dynamic Flow Field`. |

### Relation types

| Relation Type | What it does |
|---|---|
| `Fixed Value` | The field must have exactly the value of **Relation Field No.** on the record you come from. This is the most common type. In the code it is a SetRange. |
| `Filter String` | The field is filtered with **Filter String**, with the same syntax as filters in Business Central. In the code it is a SetFilter. |
| `Record ID` | The field holds a record ID, and it must point to the record you come from. Used for tables that refer to any record, such as the outgoing sync queue. |

Use `Fixed Value` when the value should match exactly. A value with characters such as `&`, `|`, `*` or `(` is read as filter syntax with `Filter String`, so a phone number or a name may then not be found.

## Values in a filter string

A filter string can contain `%1`, `%2` and so on. Each one is replaced with a value that you set up for the relation line in the relation line values. For example `<=%1|%2` with today's date as `%1` and a blank date as `%2` finds prices that are valid today or have no start date.

| Field | Description |
|-------|-------------|
| **Value No.** | Which placeholder the value replaces: `1` for `%1`, `2` for `%2`. |
| **Subvalue Type** | What the placeholder is replaced with, see below. |
| **Subvalue String** | The text or date formula for the types that need one. |

| Subvalue Type | Replaced with |
|---|---|
| (empty) | The text in **Subvalue String**, for example `0`. |
| `Field` | The value of **Relation Field No.** on the record you come from. |
| `Blank String` | An empty text. `<>%1` then means "has a value". |
| `Blank Date` | An empty date. |
| `Today` | Today's date. |
| `Calculated Date From Today` | A date calculated with the date formula in **Subvalue String**, for example `<-1Y>` for one year ago. |
| `Value from Dynamic Flow Field` | The value of **Related Dynamic Flow Field** for the record you come from, for example the next date an item is available. |

## Examples

**Lines of a sales header:** **WCM Object** sales line, **Relation Object** sales header. One `Fixed Value` line for the document type and one for the document number.

**Only lines with a quantity:** the relation above with an extra `Filter String` line on **Quantity** with `<>%1` and a value `0`.

**Only item lines:** a `Filter String` line on **Type** with `2`, the option value for item.

**Valid prices today:** **WCM Object** price list line, **Relation Object** item. A `Fixed Value` line for the item number, and `Filter String` lines on **Starting Date** with `<=%1|%2` and on **Ending Date** with `>=%1|%2`, with `Today` and `Blank Date` as values.

**Bar code of an item:** **WCM Object** item reference, **Relation Object** item. A `Fixed Value` line for the item number and a `Filter String` line on the reference type with `Bar Code`.

## Limits

A relation can only filter on fields that are stored in the table. A FlowField in Business Central, and a dynamic flow field, is calculated for one record at a time and cannot be used to select records. Filter on stored fields instead, or use a fixed filter string, for example a list of account numbers.

## Advanced settings

These fields are used in a few setups for special cases. Leave them as they are unless CombineIT has set them up for you.

| Field | Description |
|-------|-------------|
| **Group By** | Advanced setting for grouping the records found. |
| **Group Function** | Advanced setting for grouping the records found. |

## Configure it yourself in Business Central

| What you can change | Where | Example |
|---|---|---|
| Which records are included | A new `Filter String` line | Leave out lines without quantity |
| Exact match instead of filter | **Relation Type** `Fixed Value` | Find a contact by phone number with special characters |
| Dates in a filter | **Subvalue Type** `Today` or `Calculated Date From Today` | Only items sold during the last year |

A change in a relation affects every dynamic flow field, trigger and outgoing mapping that uses it. Search for the relation code before you change it.

## Related

- [Web Connect Dynamic Flow Fields](dynamic-flow-fields.md)
- [Web Connect Outgoing Sync Triggers](outgoing-mapping/outgoing-sync-triggers.md)
- [Web Connect Lookup Values](lookup-values.md)
- [Web Connect Objects](objects.md)
