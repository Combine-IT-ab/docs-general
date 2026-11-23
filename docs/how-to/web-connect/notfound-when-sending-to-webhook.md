# "NotFound" when an update is sent to a webhook

> ⚠️ Changes to Web Connect in a production environment are sensitive and may cause integrations to stop working if configured incorrectly. We strongly recommend testing all changes in a test/sandbox environment first. If you are unsure, contact us before making changes.

## Symptom

Outgoing calls to a webhook fail with `NotFound`, even though the address exists and other calls to the same destination succeed. Typically new records go through while changes to existing records fail.

## Cause

Web Connect sends a new record with **HTTP Method Create** and a change to an existing record with **HTTP Method Update**. On most integrations Update is `PUT`. A webhook endpoint usually accepts only `POST`, so the `PUT` request does not match any route and the receiver answers `NotFound`.

## Fix

1. Open the [integration](../../products/web-connect/general/integrations.md) for the destination, or the [object](../../products/web-connect/general/objects.md) if only one endpoint is a webhook.
2. Set both **HTTP Method Create** and **HTTP Method Update** to `POST`. A method on the object overrides the one on the integration.
3. Send the failed records again, see [How do I resend an outgoing message from Web Connect Outgoing Data?](resend-outgoing-message.md)

## Tip: compare a working and a failing call

When one call works and another fails against the same destination, open both in [Web Connect Entries](../../products/web-connect/general/entries.md), copy the two addresses into a text editor and place them directly under each other, without automatic line breaks. Everything before the query string should be identical. If the addresses match, compare the HTTP method and the headers next.

## Related

- [Web Connect Integrations](../../products/web-connect/general/integrations.md)
- ["Entity already exists" when sending to an external API](entity-already-exists-update-with-external-id.md)
