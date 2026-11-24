# Web Connect WMS/Return Reason Codes

> **BC view name:** Web Connect WMS-/Returorsakskoder

## Overview

WMS/Return Reason Codes translate the return reasons that a warehouse, a returns system or a point of sale system sends into return reason codes in Business Central. Each row is one reason in the external system.

A row can do more than set the return reason code. It can also send the return to another location, set a posting group or dimensions, and add a return fee. That is why the table sits between the incoming value and the return reason code on the return line.

The table is used when a return becomes a sales return order through a [WMS document](wms-documents.md), for example from [Reclaimit](../integrations/reclaimit/overview.md), [Ongoing WMS](../integrations/ongoing/flows/returns.md), [Nyce Logic WMS](../integrations/nyce/flows/customer-return.md) or [Shelfless](../integrations/shelfless/flows/returns.md).

All rows live in your own Business Central. You maintain them yourself, so a new return reason in the external system only needs a new row.

## Fields

| Field | Description |
|-------|-------------|
| **Code** | The value the external system sends, for example `1001` or `DAMAGED`. Web Connect matches the incoming value against this code. |
| **Description** | A readable name for the reason, for example "Changed mind" or "Complaint". |
| **Return Reason Code** | The return reason code in Business Central that is set on the return line. |
| **Reason Code** | The reason code in Business Central that is set on the return. |
| **Location Code** | Sends the returned item to another location, for example a location for damaged goods. Leave it empty to use the location of the return. |
| **Gen. Bus. Posting Group** | Sets another general business posting group on the return. Leave it empty to use the standard. |
| **Global Dimension 1 Code** | Sets global dimension 1 on the return, for example a cost center. Leave it empty to use the standard dimension rules. |
| **Global Dimension 2 Code** | Sets global dimension 2 on the return, for example a market. Leave it empty to use the standard dimension rules. |
| **Add Fee on Return** | Adds a return fee line when the return has this reason. |
| **Return Fee Condition** | A [condition](condition-list.md) that must be met for the fee to be added. |
| **Special Return Item** | The item used for the fee line. Leave it empty to use **Add Item On Return** in the [logistics setup](logistics-setup.md). |

## Use the external value as the code

Set **Code** to exactly the value the external system sends, including numeric IDs such as `1001`. Web Connect then matches the incoming value directly, and no [text mapping](text-mapping.md) is needed on the incoming side. Use **Description** for the readable name.

Example: a warehouse sends the return reason IDs `1001` (other reason) and `1002` (complaint).

| Code | Description | Return Reason Code | Location Code |
|---|---|---|---|
| 1001 | Other reason | RETURN | MAIN |
| 1002 | Complaint | COMPLAINT | SCRAP |

If the external system later introduces new IDs, add new rows and keep the old ones until no returns with the old IDs remain.

## Location: Which Rule Wins

There are two ways to set the location of a returned item. Do not use both for the same return.

| Rule | Where | Effect |
|---|---|---|
| **Location Code** on a WMS/Return Reason Code row | This table | Overrides the location logic of the Business Central return reason code. This is the recommended way. |
| A value mapping to **Location Code** on the return line | [Incoming Data Mapping](incoming-data/mapping.md) | Works, but the location set on the Business Central return reason code is applied afterwards and overwrites it. |

If you map the location with a value mapping, leave the location blank on the Business Central return reason codes that are used. Otherwise the return reason code decides the location, and the mapping seems to have no effect.

The WMS/Return Reason Code does not have to be the same as the Business Central return reason code. It can be, but it is a code of its own that points to a return reason code, a location and the other fields above.

## Combine Two Values Into One Code

Some external systems send the return reason and the outcome in two separate fields. For example, one key holds the reason the customer gave, and another key holds the status after inspection, such as restocked or scrapped. Both values decide what happens to the return.

**Standard:** combine the two keys into one WMS/Return Reason Code and let this table decide everything.

1. In the [incoming data mapping](incoming-data/mapping.md) of the WMS line, read both keys on the line that sets the reason code. List them in **JSON Key Name**, separated by a comma.
2. Web Connect joins the two values into one value on the WMS line.
3. Add one row in this table per combination that can occur. Use the joined value, exactly as it appears on the WMS line, as **Code**.
4. Set **Return Reason Code**, **Location Code** and the other fields on each row.

The table then works as a matrix of the two values:

| Reason (key 1) | Status (key 2) | Return Reason Code | Location Code |
|---|---|---|---|
| Changed mind | Restocked | RETURN | MAIN |
| Changed mind | Scrapped | RETURN | SCRAP |
| Complaint | Restocked | COMPLAINT | MAIN |
| Complaint | Scrapped | COMPLAINT | SCRAP |

Include every combination. A combination without a row cannot be given a return reason code.

**Alternative:** map one key to the return reason code through this table, and the other key to **Location Code** with a value mapping. It works, but it needs one more mapping, and the location on the Business Central return reason code must be left blank (see above).

## Examples

**Damaged goods to a separate location:** Code `DAMAGED`, **Return Reason Code** `DAMAGED`, **Location Code** set to the location for damaged goods. The returned items do not end up in sellable stock.

**A fee for a parcel that was never picked up:** Code `NOT_PICKED_UP`, **Add Fee on Return** on and **Special Return Item** set to the fee item. The return order gets a fee line that is deducted from the credit.

## Configure it yourself in Business Central

| What you can change | Where | Example |
|---|---|---|
| Add a new return reason | A new row with the value from the external system as **Code** | The warehouse starts sending a new reason ID |
| Which return reason code is used | **Return Reason Code** | Separate complaints from ordinary returns |
| Where returned items go | **Location Code** | Send complaints to a scrap location |
| A new combination of reason and status | A new row with the joined value as **Code** | The returns system starts sending a new status |
| When a return fee is added | **Add Fee on Return**, **Return Fee Condition** and **Special Return Item** | Charge a fee for parcels that were not picked up |

## Related

- [Web Connect Logistics Setup](logistics-setup.md)
- [Web Connect WMS Documents](wms-documents.md)
- [Web Connect Text Mapping](text-mapping.md)
- [Web Connect Condition List](condition-list.md)
- [Web Connect Incoming Data Mapping](incoming-data/mapping.md)
