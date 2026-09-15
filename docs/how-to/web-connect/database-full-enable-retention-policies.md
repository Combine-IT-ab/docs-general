# Database is full: enable retention policies

> ⚠️ Changes to Web Connect in a production environment are sensitive and may cause integrations to stop working if configured incorrectly. We strongly recommend testing all changes in a test/sandbox environment first. If you are unsure, contact us before making changes.

## Symptom

- Business Central reports that the database is full, or a new sandbox cannot be created because the database is too large.
- The Web Connect tables (entries, incoming data, outgoing data, blob data) hold months or years of history.

## Cause

Web Connect logs every request, payload and value it processes. Without retention policies nothing is ever deleted, so the tables grow until they fill the database.

## Fix

1. Open **Web Connect Settings** and enable the built-in retention policies for:
   - **Values** (inbox data)
   - **Incoming Data**
   - **Error Values**
   - **Blob Data** (outgoing content)
   - **Outgoing Data**
2. Do **not** enable **Sync Outgoing Data After**. It deletes the External ID on outgoing data and breaks the sync with the external system.
3. Let the cleanup run. The job pauses after roughly 3,000 transactions and continues the next night, so a large backlog takes several nights to clear.

## Related

- [Web Connect General Setup](../../products/web-connect/general/general-setup.md), section Retention Policies
- [Web Connect Entries](../../products/web-connect/general/entries.md)
