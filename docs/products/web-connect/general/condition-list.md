# Web Connect Condition List

> **BC view name:** Web Connect Villkorslista

## Overview

A condition is a named rule that is either true or false for a record or a message. Web Connect uses conditions to decide whether something should happen, for example whether a mapping line is used, whether an order is wholesale or retail, or whether a record should be sent to an external system.

Each condition belongs to a [Web Connect Object](objects.md). The object decides what the condition reads: a record in Business Central for outgoing data, or a message from the external system for incoming data. A condition consists of one or more lines, and each line compares one value with another.

All conditions live in your own Business Central. You can see and change every condition yourself.

## Where conditions are used

| Where | What the condition decides |
|---|---|
| [Incoming data mapping](incoming-data/mapping.md) | Whether a mapping line is used, with **Condition Code** and **Condition** on the line. |
| [Objects](objects.md) | For example whether a message is processed, whether a record is uploaded, and whether a document is released automatically. |
| [Outgoing sync triggers](outgoing-mapping/outgoing-sync-triggers.md) | Whether a change in Business Central creates outgoing data. |
| [Outgoing data](outgoing-mapping/outgoing-data-web.md) | Whether a field is included in the outgoing message. |
| [Dynamic flow fields](dynamic-flow-fields.md) | Whether a calculation line is used. |

## Condition header

| Field | Description |
|-------|-------------|
| **Code** | Unique identifier for the condition, for example `IS-WHOLESALE`. |
| **Description** | What the condition checks, in plain words. |
| **WCM Object** | The object the condition belongs to. It decides which record or message the lines read. |
| **Table No.** | The Business Central table of the object. It is filled in from the object. |

## Condition lines

Each line takes a value, compares it with a value you give, and gives true or false. A line reads its value from one of the sources below. Use one source per line.

### The value to check

| Field | Description |
|-------|-------------|
| **JPath Value** | Reads the value from the incoming message, for example `shippingAddress.country.code` or `orderitems[0].productname`. A dot reads a key inside a nested object. Used on objects for incoming data. |
| **Field No.** | Reads the value from a field on the record in Business Central, for example the location code on a warehouse document. |
| **Field Name** | The name of the field in **Field No.** It is filled in automatically. |
| **Lookup Dynamic Flow Field Code** | Reads the value from a [dynamic flow field](dynamic-flow-fields.md), for example whether the delivery country is in the EU. Use it when the value is not on the record itself. |
| **Calculated Condition Code** | Uses the result of another condition. This lets you build a condition from smaller ones, for example "is a wholesale order" and "has a VAT number". |
| **Max Length** | Compares only the first characters of the value, for example `3` to check the start of a code. |
| **Cut out from Position** | Compares the value from a given position. Used together with **Max Length** to check a part in the middle of a text. |

### The comparison

| Field | Description |
|-------|-------------|
| **Comparison Operator** | How the values are compared: `=`, `<>`, `<`, `>` or `>=`. |
| **Logic Value** | The value to compare with, for example `SE`, `Wholesale` or `true`. Leave it empty to check whether the value is empty. For example `<>` with an empty **Logic Value** is true when the value has content. |
| **Logic Value Type** | How the values are compared: `Text`, `Number`, `Boolean` or `Date`. Use `Number` when comparing numbers, so that `20` is greater than `3`. |
| **Logic Value Variable** | Compares with an [integration variable](integrations.md) instead of a fixed value, for example to only accept orders with a higher ID than the last one downloaded. |

### Combining lines

| Field | Description |
|-------|-------------|
| **Operator** | How the line is combined with the lines above it: `And`, `Or`, `And Not` or `Not`. Leave it empty on the first line. |

A condition with only `And` lines is true when all lines are true. A condition with only `Or` lines is true when one of the lines is true. If you need both, build the parts as separate conditions and combine them with **Calculated Condition Code**. That makes the condition easier to read and test.

## Examples

**Only wholesale orders:** a condition on the order object with one line, **JPath Value** `store.name`, **Comparison Operator** `=`, **Logic Value** `Wholesale`, **Logic Value Type** `Text`.

**Several values:** a condition on the line object with one line per value, **Field No.** on the first line and **Operator** `Or` on the following ones, for example to check three order types.

**Wholesale order without VAT:** a first line with **Calculated Condition Code** set to the wholesale condition, and a second line with **Operator** `And` and **Lookup Dynamic Flow Field Code** that checks whether the delivery country is in the EU.

**Start of a text:** **JPath Value** `otherComment`, **Max Length** `7` and **Logic Value** `Zalando` is true for every comment that starts with that word.

**Only new orders:** **JPath Value** `orderid`, **Comparison Operator** `>`, **Logic Value Type** `Number` and **Logic Value Variable** set to the variable that holds the last order ID.

## Advanced settings

These fields are used in a few setups for special cases. Leave them as they are unless CombineIT has set them up for you.

| Field | Description |
|-------|-------------|
| **Set to TRUE** | Advanced setting that makes a line true. |
| **Logic Value Dynamic Fl. Code** | Advanced setting for comparing with a dynamic flow field. |

## Configure it yourself in Business Central

| What you can change | Where | Example |
|---|---|---|
| The value a condition accepts | **Logic Value** on the line | Add a new market or a new order type |
| Add another accepted value | A new line with **Operator** `Or` | Treat one more store as wholesale |
| Combine conditions | **Calculated Condition Code** | Reuse "is wholesale" in a new condition |
| Where a condition is used | **Condition Code** on the mapping line, object or trigger | Use another customer for wholesale orders |

Test a change on one record or message before you rely on it. A condition that is never true stops the lines that depend on it without an error.

## Related

- [Web Connect Objects](objects.md)
- [Web Connect Incoming Data Mapping](incoming-data/mapping.md)
- [Web Connect Outgoing Sync Triggers](outgoing-mapping/outgoing-sync-triggers.md)
- [Web Connect Dynamic Flow Fields](dynamic-flow-fields.md)
