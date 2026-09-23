# How do I set up an incoming webhook that creates a document in BC?

> ⚠️ Changes to Web Connect in a production environment are sensitive and may cause integrations to stop working if configured incorrectly. We strongly recommend testing all changes in a test/sandbox environment first. If you are unsure, contact us before making changes.

## When to use this

An external system (a warehouse, a carrier, a portal) wants to **push** events to Business Central instead of Web Connect fetching them. Typical examples from a WMS: a shipment has been dispatched, a goods receipt is completed, a stock adjustment was made, a return has arrived.

The result in BC is usually a **WMS document** (shipment notice or receipt notice with lines) that Web Connect matches to the sales or purchase order and posts.

## Who does what

| Step | Who |
|---|---|
| Provide the endpoint URL with `source` and `objecttype` for each event type | Combine IT |
| Send each event type to its URL, one test message per type, and retry on any response other than HTTP 200 | The external system |
| Create a Web Object per event type and map it | Combine IT, or you with our guidance |
| Send test cases that cover the edge cases (see the checklist below) | The external system, on request from you |
| Verify the result in BC and approve | You |

**A mapping cannot be built before a real message has arrived.** Ask the external system to send one example of every event type early, including the unusual ones.

## Steps

### 1. Get the endpoint

Each environment gets its own endpoint. The URL carries two parameters:

- `source`: who is sending, for example `wms-test`.
- `objecttype`: which event it is, for example `WEBHOOK_SHIPMENT`. It must match the code of a Web Object in BC.

Give the external system one URL per event type.

### 2. Let the first message arrive

When a message arrives, Web Connect stores it as a **Webhook** record, even if nothing is set up for it yet. The caller receives **HTTP 500** until a Web Object with the same code exists and is set up. That is expected at this stage. The payload is kept and can be processed again later.

### 3. Create the Web Object

Create a Web Object with the same code as `objecttype`. Set **Webhook Handling** to **Create Content**. Web Connect then turns every webhook into an Incoming Data record that is processed like any other download. See [Web Connect Webhooks](../../products/web-connect/general/webhooks.md) for the other options.

Process the stored webhook again. The payload is now split into the objects it contains (header, lines, packages and so on).

### 4. Set a source

All incoming mapping is filtered by source. If the payload does not say who sent it, set a **fixed source value** on the integration.

### 5. Decide what to ignore

Go through the objects the payload was split into. Mark the ones you do not need (packing slip details, delivery notes) as **Ignore**. Keep the header and the lines.

### 6. Map the header

Link the header object to the WMS header table and map at least:

| Field | Where the value comes from |
|---|---|
| Document type | A fixed value, for example `"Shipping Notice"`. A value in double quotes is used as is instead of being looked up in the JSON |
| Document number | A unique id from the message (delivery id, receipt id). Mapped **on insert**, since it is part of the primary key |
| Logistics code | A fixed value, on insert. It controls the number series and posting |
| Applies-to document number | The order number from the message. This is what links the WMS document to the BC order |
| Document status | A fixed value for the status that should trigger posting |
| External status | The status from the message, for example `DISPATCHED` |

Useful extras: date and time from the warehouse, tracking number and tracking link.

### 7. Map the lines

Link the line object to the WMS line table. Set the **Content Create Order** so that the header is created first (1) and the lines after (2).

The lines need the header's document type and document number. Fetch them from the related header object instead of from the JSON: set the mapping to collect from the **related Web Object** and the header field.

Then map the line number (a line id from the message, or auto increment in steps of 10), item number, delivered quantity and, for information, original quantity and description.

### 8. Protect against duplicates

If the external system can send the same message twice, set a **Unique Identifier** on the fields that together identify the record (for lines: line id, document type and document number) and choose **Update** on a match. Without it a resent message creates a second document. See [How do I prevent Web Connect from updating an existing customer using Unique Identifier?](prevent-customer-update-unique-identifier.md).

### 9. Make it searchable

Set **External ID Identifier** on the field you will search for when troubleshooting, usually the order number. It fills a filterable column on the Incoming Data record.

### 10. Test

Tick **Manual Handling** on the record while you test so that the job queue leaves it alone. Delete what was created, reset the record and run it again after each change. Remove Manual Handling when the mapping works.

## Checklist of edge cases to test with the external system

- [ ] Partial shipment, and the rest shipped later on the same order
- [ ] A rest order with a new number (for example `1234-2`). Check that it still finds the original order
- [ ] **Several parcels** with different tracking numbers on one shipment. Payloads often carry parcels as a list, and mapping only the first entry loses the others
- [ ] Items the warehouse splits into components (structure or kit items). Check whether the message reports the parent item or the components
- [ ] The same message sent twice
- [ ] Stock adjustment, positive and negative
- [ ] Return
- [ ] A message for an item or order that does not exist in BC

## Related

- [Web Connect Webhooks](../../products/web-connect/general/webhooks.md)
- [Web Connect Incoming Data Mapping](../../products/web-connect/general/incoming-data/mapping.md)
- [WMS Document shows "Request not sent" with error](wms-request-not-sent-error.md)
- [Prevent endless retries when content creation fails](limit-content-creation-retries.md)
