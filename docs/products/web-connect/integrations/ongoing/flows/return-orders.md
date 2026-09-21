# Ongoing — Return Orders

**Direction:** BC → Ongoing
**Trigger:** A Sales Return Order is released in BC, with return orders enabled in the Web Connect Logistic Setup

---

## Overview

When a customer returns goods, the return is registered as a **Sales Return Order** in Business Central. Web Connect sends it to Ongoing so the warehouse knows what to expect, can receive the goods and report the return back.

---

## How it is sent to Ongoing

**Standard behaviour: the return is created in Ongoing as a purchase order with a return flag.**

Ongoing only accepts a native return order for an order that Ongoing itself has shipped. Many customers have split flows where some orders are shipped by Ongoing and others by another warehouse or dropship supplier. The purchase-order variant works for all of them, so it is the standard.

| Variant | When | Traceability |
|---|---|---|
| Purchase order with return flag (standard) | All customers, regardless of where the original order was shipped from | The original order number is sent as reference, but Ongoing does not link the return to the original outbound order |
| Native Ongoing return order | Only possible when the original order was shipped from Ongoing | Ongoing links the return to the original order, so the warehouse sees the return in the context of the original shipment |

The native return-order variant is not part of the standard configuration today. If a customer needs it, it is scoped as a customer-specific extension.

---

## Creating the return order in BC

The recommended way is to create the Sales Return Order from the posted document, so that prices, payment references and item lines are inherited:

1. Create a new **Sales Return Order** for the customer.
2. Use **Prepare → Copy Document** and select the posted shipment or posted invoice for the original order.
3. Remove the lines that are not being returned and adjust quantities.
4. Set the return reason. The return reason can be mapped to a dedicated return location, which keeps returned goods separate from sellable stock and out of purchase planning.
5. Release the order. Web Connect sends it to Ongoing.

The amount on the return order is the amount that will be credited to the customer when the return is posted. If the return is part of an exchange, consider whether the credit memo should trigger an automatic refund through the payment integration or be settled against the new sales order instead.

---

## Receiving in Ongoing

When the warehouse receives the goods in Ongoing, the receipt is reported back to BC. Whether that report **posts the receipt automatically** in BC, or only updates the WMS status so that the receipt is posted manually, is a configuration choice per customer.

---

## Related

[Overview](../overview.md) · [Outgoing Mapping](../../../general/outgoing-mapping/README.md) · [How-to](../../../../../how-to/web-connect/README.md)
