# How do I pause incoming downloads temporarily?

> ⚠️ Changes to Web Connect in a production environment are sensitive and may cause integrations to stop working if configured incorrectly. We strongly recommend testing all changes in a test/sandbox environment first. If you are unsure, contact us before making changes.

## When to use this

You want to stop data from coming into BC for a while, for example during month end closing so that documents can be reviewed before they are created, and then continue without losing anything.

## Two ways to pause

| | Set on Hold on the job queue | Untick Download Data on the object |
|---|---|---|
| **What stops** | Everything the job queue entry runs, for all objects on it | Only that object |
| **Starting again** | Manually: someone must set the job queue entry back to Ready | Tick **Download Data** again |
| **What happens afterwards** | The next run fetches what the external system returns at that time | Web Connect fetches from the point where downloading stopped |

## Steps: Set on Hold

1. Open **Job Queue Entries** and find the download job for the integration.
2. Choose **Set On Hold**.
3. When you are done, choose **Set Status to Ready**. Nothing is fetched until you do.

Use this when everything should stop and the pause is planned, such as a closing period.

## Steps: Download Data per object

1. Open the Web Object that should pause.
2. Untick **Download Data**.
3. Tick it again when you want to continue. Check the first run afterwards, see [Pausing and resuming a download](../../products/web-connect/general/objects.md#pausing-and-resuming-a-download).

Use this when only one flow should pause and the others keep running.

## Related

- [Integrations or automation not running](integration-not-running.md)
- [Web Connect Objects](../../products/web-connect/general/objects.md)
