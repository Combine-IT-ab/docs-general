# Order fails: customer template not found because Billing Country is empty

> ⚠️ Changes to Web Connect in a production environment are sensitive and may cause integrations to stop working if configured incorrectly. We strongly recommend testing all changes in a test/sandbox environment first. If you are unsure, contact us before making changes.

## Symptom

An incoming order (for example from Centra) is not created in Business Central. The error indicates that Web Connect cannot find a customer template for the order.

## Cause

Web Connect selects the customer template from the order's **Billing Country**. When the external system sends an order without a billing country, no template matches and the order stops.

## Fix

1. Check the order in the external system and add the billing country to the customer or the order.
2. Resend the order. See [How do I resend an outgoing message](resend-outgoing-message.md) for the outgoing direction; for incoming orders, reprocess the Incoming Data record.
3. If orders without billing country are expected, add a fallback in the template mapping so that a default template is used.

## Related

- [Centra integration: Order inbound](../../products/web-connect/integrations/centra/flows/order-inbound.md)
