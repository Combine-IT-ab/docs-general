# WMS Document Shows "Request not sent" with Error

**Error message:** `Shipment with ID XXXXX already exist`

## What Does This Mean?

The external WMS already has a shipment/order with the same ID. Web Connect tried to send the document again, but the external system rejected it.

This commonly happens with systems like Sitoo, which do not allow updates to a document after it has been created.

## Why Did This Happen?

The typical flow that leads to this error:

1. The order was created in Business Central and successfully sent to the WMS
2. The order was changed in Business Central (e.g. quantity, date, lines)
3. Web Connect tried to send the updated order again
4. The WMS rejected it because the shipment already exists

## How to Fix It

You need to cancel the existing WMS document first, then resend.

1. Open the document
2. Choose **Cancel to Warehouse** — this tells the external system to cancel the existing shipment
3. Verify that **Last WMS Status = Cancelled**
4. Click **Send to Warehouse** — the document will now be created correctly in the external system

## Does This Only Apply to Purchase Orders?

No. The same issue can occur for any document that creates a shipment:

- Purchase Orders
- Sales Orders
- Transfer Orders
- Return Orders

## How to Avoid This

- Avoid changing documents after they have been sent to the WMS
- If changes are required, always cancel the WMS document first, then resend the updated document

## Related

- [Web Connect Outgoing Data](../../products/web-connect/general/outgoing-mapping/outgoing-data-web.md)
- [How do I resend an outgoing message?](resend-outgoing-message.md)
