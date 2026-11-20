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

## Examples

**Damaged goods to a separate location:** Code `DAMAGED`, **Return Reason Code** `DAMAGED`, **Location Code** set to the location for damaged goods. The returned items do not end up in sellable stock.

**A fee for a parcel that was never picked up:** Code `NOT_PICKED_UP`, **Add Fee on Return** on and **Special Return Item** set to the fee item. The return order gets a fee line that is deducted from the credit.

## Configure it yourself in Business Central

| What you can change | Where | Example |
|---|---|---|
| Add a new return reason | A new row with the value from the external system as **Code** | The warehouse starts sending a new reason ID |
| Which return reason code is used | **Return Reason Code** | Separate complaints from ordinary returns |
| Where returned items go | **Location Code** | Send complaints to a scrap location |
| When a return fee is added | **Add Fee on Return**, **Return Fee Condition** and **Special Return Item** | Charge a fee for parcels that were not picked up |

## Related

- [Web Connect Logistics Setup](logistics-setup.md)
- [Web Connect WMS Documents](wms-documents.md)
- [Web Connect Text Mapping](text-mapping.md)
- [Web Connect Condition List](condition-list.md)
