# How do I stop a record from syncing before it is complete?

> ⚠️ Changes to Web Connect in a production environment are sensitive and may cause integrations to stop working if configured incorrectly. We strongly recommend testing all changes in a test/sandbox environment first. If you are unsure, contact us before making changes.

## Symptom

A new record, typically a customer, is sent to the external system as soon as the first fields are filled in, and again for every field the user adds. The first call creates the record in the external system. A later call is sent before the external ID from the first response has been saved, so it is sent as an update of a record the external system does not know, and it is rejected.

Updates of existing records work, because their external ID is already stored.

## Cause

[Outgoing sync triggers](../../products/web-connect/general/outgoing-mapping/outgoing-sync-triggers.md) fire on field changes, while the user is still filling in the card. Nothing tells Web Connect that the record is ready.

## Fix

Pick one of these, or combine them.

### Wait with Upload Condition Code (recommended)

Create a condition in the [Condition List](../../products/web-connect/general/condition-list.md) that is true when the record is complete, for example when name, address and the other fields the external system requires are filled in. Set it as **Upload Condition Code** on the outgoing [object](../../products/web-connect/general/objects.md).

The change is still recorded, but Web Connect only sends the record when the condition is met. This is different from the table view on the sync trigger, which decides whether a change creates outgoing data at all.

### Use a field as a manual ready flag

If there is no reliable set of required fields, let one field act as a ready flag that the user changes as the last step, and build the condition on that field. Agree on the routine with whoever creates the records.

### Give the response time to arrive

Set the interval on the upload job so that the response to the create call, with the external ID, has been processed before the next change is sent. An interval of about five minutes has worked well. This reduces the problem but does not remove it on its own.

## Related

- [Web Connect Objects](../../products/web-connect/general/objects.md)
- [Web Connect Outgoing Sync Triggers](../../products/web-connect/general/outgoing-mapping/outgoing-sync-triggers.md)
- ["Entity already exists" when sending to an external API](entity-already-exists-update-with-external-id.md)
