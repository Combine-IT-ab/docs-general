# Orders Are Not Being Handled Automatically

## Issue

Orders from one company to another (subsidiary or central) are not created automatically, even though Easy Connect is set up correctly.

## Cause

When checking the document, the field **Sync Qualified** is set to **No**.

The most common reason is that the Job Queue in the subsidiary company is not running. In Easy Connect, documents are only marked as Sync Qualified = Yes when the relevant job queues are running and processing documents. If the job queue is stopped, documents will never be qualified for synchronization.

## How Sync Qualified Works

1. An order is created in the subsidiary company
2. The Easy Connect job queue evaluates the document
3. If conditions are met, the job queue sets **Sync Qualified = Yes**
4. The order is then synced to the central company

If step 2 does not run, step 3 never happens.

## Recommended Checks

1. Go to **Job Queue Entries** in the subsidiary company
2. Verify that the Easy Connect job queues are present, set to Ready, and actively running
3. Repeat the same check in the central company
4. Restart the job queues if needed

> Both the subsidiary and the central company must have active job queues for Easy Connect to work correctly.

## Result

Once the job queues are running, documents will be evaluated, Sync Qualified will be set to Yes, and orders will be created automatically in the central company.

## Related

- [Easy Connect Job Queues](../../products/easy-connect/job-queues.md)
- [Easy Connect Sync Log Entries](../../products/easy-connect/sync-log-entries.md)
- [Easy Connect Setup](../../products/easy-connect/setup.md)
