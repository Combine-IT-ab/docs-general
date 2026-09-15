# Calls fail with 401 Unauthorized after a job queue stopped

> ⚠️ Changes to Web Connect in a production environment are sensitive and may cause integrations to stop working if configured incorrectly. We strongly recommend testing all changes in a test/sandbox environment first. If you are unsure, contact us before making changes.

## Symptom

Outgoing calls that used to work return `401 Unauthorized`, sometimes mixed with successful calls. Credentials have not changed.

## Cause

The access token used for the external system is fetched by its own job queue entry. If that job queue has stopped (for example after an error), the stored token expires and every call is sent with a stale token.

## Fix

1. Open **Job Queue Entries** and find the job that refreshes the token for the integration.
2. Restart it (**Set Status to Ready**).
3. Verify with a new outgoing call that the status becomes **Sent and Confirmed**.

## Prevent it from happening again

- Install **Job Queue Monitor** in production so that failed job queues are restarted automatically.
- Set a short refresh interval for the token job (1 to 2 minutes) so a restarted job recovers quickly and the risk of an expired token is minimal.

## Related

- [Job Queue Monitor](../../products/job-queue-monitor/README.md)
- [Integrations or automation not running](integration-not-running.md)
