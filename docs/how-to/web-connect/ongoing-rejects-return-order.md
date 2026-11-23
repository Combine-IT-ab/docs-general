# Ongoing rejects a return order for an order it did not ship

## Symptom

A sales return order sent from Business Central to Ongoing WMS is rejected, or never appears in Ongoing, when the original sales order was shipped from another warehouse or by a dropship supplier.

## Cause

Ongoing only accepts a return order for an order that Ongoing itself shipped. The return order is linked to the Ongoing ID of the original order and its lines, and an order that was never in Ongoing has nothing to link to.

## Fix

Send returns to Ongoing as **inbound orders** instead, the same way as purchase orders. This is CombineIT's standard and works regardless of where the original order was shipped from. The choice is made in the [Logistics Setup](../../products/web-connect/general/logistics-setup.md).

If only a few returns are affected, handle them outside the integration.

## Prevent it

Create the sales return order with **Copy Document** from the posted shipment or invoice. Then prices and lines follow the original sale, and when returns are sent as return orders, the link to the original Ongoing order is kept.

## Related

- [Business Central and Ongoing WMS: returns](../../products/web-connect/integrations/ongoing/flows/returns.md)
- [WMS return reason codes](../../products/web-connect/general/wms-return-reason-codes.md)
