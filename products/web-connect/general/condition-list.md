# Web Connect Condition List

> **BC view name:** Web Connect Villkorslista

## Overview

Web Connect Condition List allows you to define reusable filter conditions that can be applied to objects, mappings, sync triggers, and other parts of a Web Connect configuration.

A condition is a named set of rules that evaluates to true or false for a given record.

## Condition Header

| Field | Description |
|-------|-------------|
| **Code** | Unique identifier for the condition. |
| **Description** | Human-readable explanation of what the condition checks. |
| **Table No.** | The BC table the condition applies to. |
| **Table Name** | Table name (read-only reference). |

## Condition Lines

Each condition consists of one or more lines. All lines must be true for the condition to pass (AND logic).

| Field | Description |
|-------|-------------|
| **Field No.** | BC field to evaluate. |
| **Field Name** | Field name (read-only reference). |
| **Operator** | Comparison operator (see below). |
| **Value** | The value to compare against. |

## Operators

| Operator | Description |
|----------|-------------|
| `=` | Equal to |
| `<>` | Not equal to |
| `<` | Less than |
| `>` | Greater than |
| `<=` | Less than or equal |
| `>=` | Greater than or equal |
| `IN` | Value is in a list (pipe-separated: `A\|B\|C`) |
| `NOT IN` | Value is not in a list |
| `CONTAINS` | Field value contains the given text |
| `STARTS WITH` | Field value starts with the given text |
| `ENDS WITH` | Field value ends with the given text |
| `IS EMPTY` | Field value is blank |
| `IS NOT EMPTY` | Field value is not blank |

## Practical Examples

**Store routing** — route orders to the correct warehouse based on a custom field:

```
Condition: STORE-NORTH
Table: Sales Header
Line: Store Code = NORTH
```

**Payment filter** — only process records paid by card:

```
Condition: PAID-BY-CARD
Table: Sales Header
Line: Payment Method Code IN VISA|MASTERCARD|AMEX
```

**Shipping filter** — exclude free shipping orders:

```
Condition: HAS-SHIPPING-COST
Table: Sales Header
Line: Shipping Amount > 0
```

**Dimensions filter** — only sync items with specific dimensions:

```
Condition: IS-WEB-ITEM
Table: Item
Line: Web Item = Yes
```

## Related

- [Web Connect Objects](objects.md)
- [Web Connect Outgoing Sync Triggers](outgoing-mapping/outgoing-sync-triggers.md)
- [Web Connect Dynamic Flow Fields](dynamic-flow-fields.md)
