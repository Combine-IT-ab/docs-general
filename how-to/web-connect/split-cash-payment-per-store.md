# How to Split Cash Payment Method per Store

> ⚠️ Changes to Web Connect in a production environment are sensitive and may cause integrations to stop working if configured incorrectly. We strongly recommend testing all changes in a test/sandbox environment first. If you are unsure, contact us before making changes.

## Goal

Transform the incoming payment method `CASH` into store-specific values, e.g.:

- `CASH-STORE1`
- `CASH-STORE2`

## Step 1: Add a New Mapping Line

In **Web Connect Incoming Data Mapping**, on the payment object, create a new line:

| Field | Value |
|-------|-------|
| Key Name | *(leave empty)* |
| Related Web Object | Sales Header |
| Set value from related field | Location Code |

This retrieves the store code (e.g. STORE1, STORE2) from the sales header.

## Step 2: Create a Condition (only when payment method = CASH)

In **Web Connect Condition List**, create a new condition:

| Path Value | Comparison | Logic Value |
|-----------|------------|-------------|
| payment.method | = | CASH |

Assign this condition to the new mapping line so it only triggers when the payment method is CASH.

## Step 3: Create Text Mapping

In the **Mapping** column, create a text mapping that maps each store's location code to the store-specific CASH code:

| Incoming (Location Code) | Outgoing |
|--------------------------|----------|
| STORE1 | CASH-STORE1 |
| STORE2 | CASH-STORE2 |

## Step 4: Set Validation Order (Important)

Set the new mapping line to run **before** the standard payment method mapping:

| Mapping Line | Validation Order |
|-------------|-----------------|
| Normal payment method mapping (existing) | 1 |
| CASH-per-store mapping (new) | 2 |

## Result

Only CASH payments get split per store — all other payment methods (Adyen, Klarna, Gift Card, etc.) work as usual.

## Related

- [Web Connect Incoming Data Mapping](../../products/web-connect/general/incoming-data/mapping.md)
- [Web Connect Condition List](../../products/web-connect/general/condition-list.md)
- [Web Connect Text Mapping](../../products/web-connect/general/text-mapping.md)
