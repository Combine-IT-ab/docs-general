# How do I set up an incoming webhook that creates a document in BC?

> ⚠️ Changes to Web Connect in a production environment are sensitive and may cause integrations to stop working if configured incorrectly. We strongly recommend testing all changes in a test/sandbox environment first. If you are unsure, contact us before making changes.

## When to use this

An external system (a warehouse, a carrier, a portal) wants to **push** events to Business Central instead of Web Connect fetching them. Typical examples from a WMS: a shipment has been dispatched, a goods receipt is completed, a stock adjustment was made, a return has arrived.

The result in Business Central is usually a [WMS document](../../products/web-connect/general/wms-documents.md) (a shipment notice or a receipt notice with lines) that Web Connect matches to the sales or purchase order and posts.

## Who does what

| Step | Who |
|---|---|
| Provide the endpoint address with `source` and `objecttype` for each event type | CombineIT |
| Send each event type to its address, one test message per type, and retry on any response other than HTTP 200 | The external system |
| Create a Web Connect Object per event type and map it | CombineIT, or you with our guidance |
| Send test cases that cover the edge cases (see the checklist below) | The external system, on request from you |
| Verify the result in Business Central and approve | You |

**A mapping cannot be built before a real message has arrived.** Ask the external system to send one example of every event type early, including the unusual ones.

## Steps

### 1. Get the endpoint

CombineIT gives you one address per environment. The address carries two parameters:

- `source`: who is sending, for example `wms-test`.
- `objecttype`: which event it is, for example `WEBHOOK_SHIPMENT`. It must match the code of a Web Connect Object in Business Central.

Give the external system one address per event type.

### 2. Let the first message arrive

When a message arrives, Web Connect saves it as a [Web Connect Entry](../../products/web-connect/general/entries.md) of the type webhook, even if nothing is set up for it yet. The caller receives **HTTP 500** until an object with the same code as `objecttype` exists and has a **Web Hook Action**. That is expected at this stage. The message is kept and can be processed again later.

### 3. Create the object

Create a Web Connect Object with the same code as `objecttype` and link it to the WMS header table with **Table No.**. Set **Web Hook Action** to `Create Content`. Web Connect then turns every webhook into incoming data that is processed like any other download. See [Web Connect Webhooks](../../products/web-connect/general/webhooks.md) for the other actions.

Process the saved webhook again. The message is now split into the underlying objects it contains (header, lines, packages and so on).

### 4. Set a source

Incoming mapping can be limited by source, and most warehouse messages do not say who sent them. Set **Fixed Source Value** on the [integration](../../products/web-connect/general/integrations.md), and check on the incoming data that the source is filled in.

### 5. Decide what to ignore

Go through the underlying objects that the message was split into. Tick **Ignore Object In Download** on the ones you do not need, such as packing slip details or delivery notes. Keep the header and the lines.

### 6. Map the header

Map at least these fields on the header object:

| Field | Where the value comes from |
|---|---|
| Document type | A fixed value, for example `"Shipping Notice"`. A value in double quotes is used as it is instead of being read from the message |
| Document number | A unique ID from the message, such as the delivery ID or the receipt ID. Mark the line as **Primary Key**. If you leave it blank and use a number series, every resent message creates a new document |
| Logistics code | A fixed value. It controls the number series and posting |
| Applies-to document number | The order number from the message. This links the WMS document to the order in Business Central |
| Document status | A fixed value for the status that should trigger posting |
| External status | The status from the message, for example `DISPATCHED`. Posting depends on it together with the logistics code |

Useful extras: date and time from the warehouse, tracking number and tracking link.

### 7. Map the lines

Link the line object to the WMS line table with **Table No.** on the object. Set **Content Create Order** so that the header is created first (1) and the lines after (2).

The lines need the header's document type and document number. Take them from the header record instead of from the message: set **Parent WCM Object** to the header object and **Parent Field No.** to the header field.

Then map the line number (a line ID from the message, or **PK Auto Increment** in steps of 10), the item number, the delivered quantity and, for information, the original quantity and the description. Give the item number the lowest **Validation Order**, the same way as when a sales line is entered by hand.

### 8. Protect against duplicates

If the external system can send the same message twice, tick **Unique Identifier** on the fields that together identify the record (for lines: line ID, document type and document number) and set **Unique Identity Action** to `Update`. Without it a resent message creates a second document. See [How do I prevent Web Connect from updating an existing customer using Unique Identifier?](prevent-customer-update-unique-identifier.md)

### 9. Make it searchable

Tick **External ID Identifier** on the field you will search for when troubleshooting, usually the order number. The value is shown in its own column in the incoming data.

### 10. Test

Tick **Manual Handling** on the incoming data record while you test, so that the job queue leaves it alone. After each change, delete what was created, set the record back and run it again. Remove Manual Handling when the mapping works. A document that is already posted cannot be posted again, so test posting with a new event.

## Checklist of edge cases to test with the external system

- [ ] Partial shipment, and the rest shipped later on the same order
- [ ] A rest order with a new number, for example `1234-2`. Check that it still finds the original order
- [ ] **Several parcels** with different tracking numbers on one shipment. Messages often carry parcels as a list, and mapping only the first entry loses the others
- [ ] Items the warehouse splits into components (structure or kit items). Check whether the message reports the parent item or the components
- [ ] The same message sent twice
- [ ] Stock adjustment, positive and negative
- [ ] Return
- [ ] A message for an item or order that does not exist in Business Central

## Related

- [Web Connect Webhooks](../../products/web-connect/general/webhooks.md)
- [Web Connect Incoming Data Mapping](../../products/web-connect/general/incoming-data/mapping.md)
- [Web Connect WMS Documents](../../products/web-connect/general/wms-documents.md)
- [WMS Document shows "Request not sent" with error](wms-request-not-sent-error.md)
- [Prevent endless retries when content creation fails](limit-content-creation-retries.md)
