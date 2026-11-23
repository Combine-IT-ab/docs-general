# How do I pause incoming downloads temporarily?

> ⚠️ Changes to Web Connect in a production environment are sensitive and may cause integrations to stop working if configured incorrectly. We strongly recommend testing all changes in a test/sandbox environment first. If you are unsure, contact us before making changes.

## When to use this

You want to stop data from coming into Business Central for a while, for example during month end closing so that documents can be reviewed before they are created, and then continue without losing anything.

## Two ways to pause

| | Set the job queue entry on hold | Clear Download Data on the object |
|---|---|---|
| **What stops** | Everything the job queue entry runs, for all objects on it | Only that object |
| **Starting again** | Someone must set the job queue entry back to ready | Tick **Download Data** again |
| **What happens afterwards** | The next run fetches what the external system returns at that time | Web Connect continues from the last download time, if the object remembers it |

## Steps: set the job queue entry on hold

1. Open **Job Queue Entries** in Business Central and find the download job for the integration.
2. Choose **Set On Hold**.
3. When you are done, choose **Set Status to Ready**. Nothing is fetched until you do.

Use this when everything should stop and the pause is planned, such as a closing period.

## Steps: Download Data per object

1. Open the [Web Connect Object](../../products/web-connect/general/objects.md) that should pause.
2. Clear **Download Data**.
3. Tick it again when you want to continue.

Use this when only one flow should pause and the others keep running.

Whether anything is missed depends on the object. When the object has a **Download Poll DateTime Var.**, the next download asks for everything that changed since the last download, so the pause is caught up. Without it, the next download only gets what the external system returns at that time. Check the first run after a pause.

## Related

- [Integrations or automation not running](integration-not-running.md)
- [Web Connect Objects](../../products/web-connect/general/objects.md)
