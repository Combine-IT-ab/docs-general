# Web Connect Integration Variables

## Overview

An integration variable is a named value that Web Connect keeps between runs. Mappings, objects and conditions can read the value, and some of them can also update it.

Variables are used for four things:

- **Fixed values** that many mappings need, for example the ID of your goods owner in a warehouse system or a tenant ID in an e-commerce platform. You set the value once instead of on every mapping line.
- **The current date or time**, for example to send today's date in a request.
- **Where the last download ended**, for example the time of the last collected order or the ID of the last processed transaction, so that the next download only fetches what is new.
- **A token** that has been fetched from the external system and is needed in a header, see [Authentication](authentication.md).

All integration variables live in your own Business Central. You can see and change every variable yourself.

## Fields

| Field | Description |
|-------|-------------|
| **Code** | The code that mappings, objects and conditions use to refer to the variable, for example `CURRENT-DATETIME` or `LAST-ORDER-DATETIME`. |
| **Description** | A readable note about what the variable is for. |
| **Variable Type** | The kind of value: `Text`, `Date`, `Date & Time` or `Integer`. It decides which of the value fields below is used. |
| **Current Value Text** | The value of a `Text` variable, for example an ID or a token. |
| **Current Value Date** | The value of a `Date` variable. |
| **Current Value Date Time** | The value of a `Date & Time` variable, for example the time of the last download. |
| **Current Value Integer** | The value of an `Integer` variable, for example a goods owner ID or the number of the last processed transaction. |
| **Is CurrentDateTime** | The variable gives the current date or the current date and time at the moment it is read. Used for variables such as `CURRENT-DATETIME` or `TODAY`. |
| **Adjustment Dateformula** | A Business Central date formula that is applied to the date, for example `-1D` for the day before. Used together with **Is CurrentDateTime** to ask for everything since yesterday. |

## Where variables are used

| Where | Field | What it does |
|-------|-------|--------------|
| [Outgoing mapping](outgoing-mapping/README.md) | **Integration Value** | Sends the value of the variable instead of a field from Business Central, for example a goods owner ID, a header value or a date in a request. |
| [Outgoing mapping](outgoing-mapping/README.md) | **Update Integration Value** | Saves the value that is sent in the variable. |
| [Incoming mapping](incoming-data/mapping.md) | **Integration Value** | Reads the value from the variable instead of the message, for example the current date and time. |
| [Incoming mapping](incoming-data/mapping.md) | **Update Integration Value** | Saves the value from the message in the variable, for example the ID of the last transaction or a token. |
| [Object](objects.md) | **Download Poll DateTime Var.** | The variable that holds the time of the last download for the object, so that the next download starts where the last one ended. |
| [Condition](condition-list.md) | **Logic Value Variable** | Compares a value with the variable, for example to skip transactions that have already been processed. |

## Common patterns

**Fixed ID in every call:** a `Text` or `Integer` variable holds the ID that the external system has given you, for example a goods owner ID. Every outgoing mapping line that needs the ID reads it with **Integration Value**. If the ID changes, you change it in one place.

**Today's date:** a `Date` variable with **Is CurrentDateTime** gives today's date, for example as the end date of a report. With **Adjustment Dateformula** `-1D` it gives yesterday instead.

**Download only what is new by time:** a `Date & Time` variable is set as **Download Poll DateTime Var.** on the object. The request sends the variable, for example as `fromDate`, so that the external system only returns what has changed since the last download.

**Download only what is new by ID:** an `Integer` variable holds the ID of the last processed transaction. The incoming mapping saves each new ID with **Update Integration Value**, and a condition with **Logic Value Variable** compares each transaction with the variable, so that transactions that have already been processed are skipped.

**Token in a header:** the token object of an [OAuth 2.0 authentication](authentication.md) saves `access_token` in a `Text` variable with **Update Integration Value**. The outgoing mappings that call the external system send it in the `Authorization` header with **Integration Value**.

## Advanced settings

These fields are used in a few setups for special cases. Leave them as they are unless CombineIT has set them up for you.

| Field | Description |
|-------|-------------|
| **DateTime Marigin Seconds** | Advanced setting for date and time variables used in downloads. |
| **Incremental Step** | Advanced setting for counting variables. |
| **Count Init Value** | Advanced setting for counting variables. |

The fields **Current Value Decimal** and **No. Series Code** are not used in the standard setups and can be left empty.

## Configure it yourself in Business Central

| What you can change | Where | Example |
|---|---|---|
| Change an ID that many mappings send | **Current Value Text** or **Current Value Integer** | The warehouse system has given you a new goods owner ID |
| Download again from an earlier time | **Current Value Date Time** on the variable in **Download Poll DateTime Var.** | Orders were missed during a stop, so set the time back to before the stop |
| Process transactions again from an earlier ID | **Current Value Integer** on the variable | Set the last transaction ID back to fetch the transactions after it again |

Move a time or an ID back with care. Everything after it is downloaded again, and records that already exist in Business Central are then handled by the **Unique Identity Action** in the [incoming mapping](incoming-data/mapping.md).

## Related

- [Web Connect Authentication](authentication.md)
- [Web Connect Objects](objects.md)
- [Web Connect Incoming Data Mapping](incoming-data/mapping.md)
- [Web Connect Outgoing Mapping](outgoing-mapping/README.md)
- [Web Connect Condition List](condition-list.md)
