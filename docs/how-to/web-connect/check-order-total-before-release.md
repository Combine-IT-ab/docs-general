# How do I check that an incoming order matches what the customer paid?

> ⚠️ Changes to Web Connect in a production environment are sensitive and may cause integrations to stop working if configured incorrectly. We strongly recommend testing all changes in a test/sandbox environment first. If you are unsure, contact us before making changes.

## When to use this

Orders come in from an e-commerce platform, and you want Business Central to stop an order whose total differs from what the platform charged the customer or reserved with the payment provider, before the order is released.

## How the check works

1. The [incoming mapping](../../products/web-connect/general/incoming-data/mapping.md) points out where in the message the platform's totals are, with **Document Totals Function**.
2. When the sales document is complete, Business Central calculates its total.
3. Before the document is released, Web Connect compares the total in Business Central with the total from the message.
4. If they differ by more than the tolerance, the document is not released and the order stops with an error in the incoming data.

## Steps

1. **Point out the totals in the mapping.** On the mapping line for the platform's grand total, set **Document Totals Function** to `Total Amount Including VAT Check`. Use `Total Amount Excluding VAT Check` and `Total VAT Amount Check` for the other totals if the message has them. Lines for freight and document discount use `Freight Amount` and `Header Discount Amount`, so that they are part of the total in Business Central.
2. **Turn on the check on the object.** Open the [object](../../products/web-connect/general/objects.md) for the sales header (table 36) and tick **Enable Totals Check**. Tick **Enable VAT Check** to compare the VAT amount as well.
3. **Limit the check if needed.** Set **Totals Check Condition** (and **VAT Check Condition** for the VAT check) to a [condition](../../products/web-connect/general/condition-list.md), for example so that only retail orders are checked.
4. **Allow for rounding.** Set **Total Amt. Document Tolerance** to the difference you accept, for example a small rounding amount.
5. **Release automatically.** Tick **Auto Release Documents** if orders that pass the check should be released at once. Use **Auto-Release Condition Code** to release only some orders automatically, for example not wholesale orders.

### Older setups

In earlier versions of Web Connect, the total check and other functions for creating orders were set on the **Web Connect Codeunit Setup** card. That card could not tell orders from different platforms apart, so the settings have moved to the object. If your Business Central still uses the codeunit setup for this, contact us before you turn on the check on the object, so that the old and the new settings do not run side by side.

## Common causes when the totals differ

- **Freight or discounts are missing.** If freight, vouchers or gift cards in the message are not mapped, the order in Business Central is lower or higher than what the customer paid.
- **The wrong VAT.** When the customer and the VAT business posting group are chosen from the market, an order where the customer changed the shipping country in checkout gets the wrong VAT. Within the EU, VAT on goods sold to consumers follows the destination country, so the platform calculates VAT on the shipping country. Choose the VAT business posting group from the shipping country in the message instead, with a [text mapping](../../products/web-connect/general/text-mapping.md) from country code to VAT business posting group.
- **Rounding.** Small differences per line add up. Set a tolerance rather than turning off the check.

## Related

- [Web Connect Objects](../../products/web-connect/general/objects.md)
- [Web Connect Incoming Data Mapping](../../products/web-connect/general/incoming-data/mapping.md)
- [Order fails: customer template not found because Billing Country is empty](customer-template-not-found-missing-billing-country.md)
