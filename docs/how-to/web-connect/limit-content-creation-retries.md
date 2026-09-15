# Prevent endless retries when content creation fails

> ⚠️ Changes to Web Connect in a production environment are sensitive and may cause integrations to stop working if configured incorrectly. We strongly recommend testing all changes in a test/sandbox environment first. If you are unsure, contact us before making changes.

## Symptom

An incoming record that fails validation is retried over and over. The job queue log fills with the same error and the error is never surfaced to anyone.

## Fix

1. On the Web Object, limit the number of **content creation retries**. Five attempts is a sensible default: enough to survive a temporary lock, few enough to stop a loop.
2. Configure **email monitoring per web object**, so that the team responsible for that integration is notified when a record has failed its final attempt. Different objects can notify different recipients.
3. Test the notification on one object before rolling it out to all.

## Related

- [Web Connect Objects](../../products/web-connect/general/objects.md)
- [Web Connect Entries](../../products/web-connect/general/entries.md)
