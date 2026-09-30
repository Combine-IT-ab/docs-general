# "NotFound" when an update is sent to a webhook

> ⚠️ Changes to Web Connect in a production environment are sensitive and may cause integrations to stop working if configured incorrectly. We strongly recommend testing all changes in a test/sandbox environment first. If you are unsure, contact us before making changes.

## Symptom

Outgoing calls to a webhook fail with `NotFound`, even though the endpoint exists and other calls to the same destination succeed. Typically new records go through while changes to existing records fail.

## Cause

Web Connect suggests `PUT` as the HTTP method for updates. A webhook endpoint usually accepts only `POST`, so the `PUT` request does not match any route and the receiver answers `NotFound`.

## Fix

1. Open the web integration for the destination.
2. Set the HTTP method for both **Create** and **Update** to `POST`.
3. Delete the web objects that are in error. They are created again with the new method on the next run.

## Tip: compare a working and a failing call

When one call works and another fails against the same destination, copy both URLs into a text editor and place them directly under each other, without automatic line breaks. Everything before the query string should be identical. If the URLs match, compare the HTTP method and the headers next.

## Related

- ["Entity already exists" when sending to an external API](entity-already-exists-update-with-external-id.md)
- [Web Connect Objects](../../products/web-connect/general/objects.md)
