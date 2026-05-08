# How do I resend an outgoing message from Web Connect Outgoing Data?

> ⚠️ Changes to Web Connect in a production environment are sensitive and may cause integrations to stop working if configured incorrectly. We strongly recommend testing all changes in a test/sandbox environment first. If you are unsure, contact us before making changes.

## When Is This Used?

- An integration setup has been changed
- A mapping or configuration error has been fixed
- Business Central data has been corrected
- A previous outgoing message failed and needs to be resent

## Resend a Single Message

1. Open **Web Connect Outgoing Data**
2. Select the row you want to resend
3. Go to **Actions → Set Marked to Non-Synced** — this marks the record as not synced and ready to be sent again
4. Click **Generate Web Entry of Marked**

The message will now be handled automatically by the Job Queue during the next run.

### Send Immediately (Without Waiting for Job Queue)

1. Select the row
2. Click **Go to Web Entry**
3. In **Web Connect Entries**, go to **Actions → Process Entry**

This sends the message immediately.

## Bulk Resend (Multiple Records)

1. Go to **New → Add Outgoing Data**
2. Select and filter the records you want to push again (items, orders, etc.)

This is the recommended approach when resending many records at once.

## Related

- [Web Connect Outgoing Data](../../products/web-connect/general/outgoing-mapping/outgoing-data-web.md)
- [Web Connect Entries](../../products/web-connect/general/entries.md)
