# Incoming record is stuck: Locked by Session

> ⚠️ Changes to Web Connect in a production environment are sensitive and may cause integrations to stop working if configured incorrectly. We strongly recommend testing all changes in a test/sandbox environment first. If you are unsure, contact us before making changes.

## Symptom

An Incoming Data record is never processed. It is not in error, it just stays where it is while newer records are handled.

## Cause

Recent versions of Web Connect have a **Locked by Session** field on incoming data records. It prevents two job queues from processing the same record at the same time. If the session that locked the record ended abnormally, the lock remains and no job will pick the record up.

## Fix

1. Open **Web Connect Incoming Data** and select the stuck record.
2. Run the action **Reset to Mark Content**. This clears the session ID.
3. The record is processed on the next job queue run.

## Related

- [Web Connect Incoming Data](../../products/web-connect/general/incoming-data/README.md)
- [Integrations or automation not running](integration-not-running.md)
