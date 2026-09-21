# Ongoing rejects a return order for an order it did not ship

## Symptom

A Sales Return Order sent from BC to Ongoing is rejected, or never appears in Ongoing, when the original sales order was shipped from another warehouse or by a dropship supplier.

## Cause

Ongoing only accepts a native return order for an order that Ongoing itself shipped. A return on an order that was never in Ongoing has nothing to attach to.

## Solution

Use the standard Web Connect behaviour, where the return is created in Ongoing as a **purchase order with a return flag**. This works regardless of where the original order was shipped from. The original order number is sent as reference so the warehouse can identify the return.

If the customer needs Ongoing's native return order for the orders Ongoing did ship, that is a customer-specific extension. See [Ongoing — Return Orders](../../products/web-connect/integrations/ongoing/flows/return-orders.md).
