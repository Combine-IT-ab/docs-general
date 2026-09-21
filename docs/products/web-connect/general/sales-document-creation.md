# Sales Document Creation

> **Draft.** Written from a walkthrough on 2026-09-21. Needs review by the product team before it is treated as reference.

Settings that control how Web Connect creates sales documents in Business Central from incoming orders: total checks, document totals and related validation. They live on the **web object** that is associated with the Sales Header (table 36), on the **Sales Document Creation** tab that appears once the association is made.

---

## Where the settings live

| Location | Status |
|---|---|
| **Web Object → Sales Document Creation** (association to table 36) | Current. All settings are configured here. |
| **Web Connect Codeunit Setup** | Legacy. Earlier versions collected special functions for order creation (total check, batch check and similar) on a codeunit setup card. It could not distinguish orders from different web platforms, so the settings have moved to the web object. The codeunit setup card has a **Disable** toggle and should be disabled once the settings exist on the web object. |

The same pattern applies to price verification: an object associated with the price list has a **Verify Price** setting on the object rather than on the codeunit setup.

---

## Total check

The total check verifies that the order Web Connect is about to release in BC matches what the web platform charged the customer. It is the safeguard for orders that must agree with what the e-commerce platform has captured or reserved with the payment provider.

**How it works:**

1. The incoming mapping tells Web Connect where in the payload the platform's totals are, using the **Document Totals** functions (see below).
2. BC calculates *Amount Including VAT* on the sales document when it is complete.
3. Before the document is released, Web Connect compares BC's calculated total with the platform's total from the mapping.
4. If they differ, the document is not released and the order is flagged. See error handling in the platform-specific flow pages.

**Total Check Condition:** a condition from the [Condition List](condition-list.md) that must be fulfilled for the total check to run. Use it to limit the check to certain channels or markets, for example only retail orders.

---

## Document totals

In the incoming mapping, the **Document Totals** function marks which fields in the payload hold the platform's totals. Web Connect uses them for the total check and for reconciliation. Typical values:

| Document Totals function | Meaning |
|---|---|
| Total including VAT | The grand total the customer paid |
| VAT amount | The VAT the platform calculated |
| Total excluding VAT | Net total |
| Document discount amount | Order-level discount |

Example from a Centra integration: the payload field `grandTotal.value` is mapped with the function *Total including VAT*, so BC's calculated grand total is verified against Centra's.

---

## Related

[Incoming Data](incoming-data/README.md) · [Mapping](incoming-data/mapping.md) · [Condition List](condition-list.md) · [Centra Order Inbound](../integrations/centra/flows/order-inbound.md)
