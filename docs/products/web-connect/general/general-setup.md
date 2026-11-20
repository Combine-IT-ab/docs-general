# Web Connect General Setup

> **BC view name:** Web Connect Allmänna inställningar

## Overview

Web Connect Settings hold the global settings for Web Connect in Business Central. They switch on the automatic steps that the two job queues run, the built-in calculations of web inventory and web prices, and the cleanup of old data. The settings apply to every integration in the company.

## The two job queues

Web Connect moves data with two job queues that run in the background.

- **The upload job** takes data in Business Central and sends it to the external system.
- **The download job** fetches data from the external system and writes it to Business Central. It is the only job that writes to Business Central tables, so data that comes back as an answer to an upload is also handled by the download job.

Both jobs are asynchronous. A user who changes something in Business Central does not get an answer from the external system. Monitor the job queues and the [entries](entries.md) to see that everything was sent and received.

## Automatic upload steps

The upload runs in three steps. Each step has its own setting, and all of them are switched on when an integration goes live.

| Step | What it does |
|------|--------------|
| **Auto-populate outgoing data from triggers** | Switches on the global triggers in Business Central. When a record changes, the [sync triggers](outgoing-mapping/outgoing-sync-triggers.md) create a record in [Outgoing Data](outgoing-mapping/outgoing-data-web.md) that is not yet synced. |
| Create web entries | The upload job goes through the records in Outgoing Data that are not synced, builds the message with the [outgoing mapping](outgoing-mapping/README.md) and creates a [web entry](entries.md). Several records can be grouped in one entry. |
| Send web entries | The upload job sends the web entries to the external system. |

Without the second step the records stay in Outgoing Data as not synced, and nothing is sent. Without the third step the web entries are created but never sent.

The triggers only run for users who have the Web Connect permission set. A user without it is the most common reason that nothing turns up in Outgoing Data.

## Automatic download steps

| Step | What it does |
|------|--------------|
| Create and send download requests | For every object with **Download Data** on the [object](objects.md), the download job creates a download entry and sends it to the external system. How often an object is downloaded is set on the object with **No. of Minutes between Runs**, **Starting Time** and **Ending Time**. |
| Create content | The answers to the download requests become [incoming data](incoming-data/README.md). |
| Validate and create | The incoming data is validated and the records are created or updated in Business Central. |

If one of the steps is off, the data stops in the step before it and nothing happens to it.

## Web inventory and web prices

Web Connect has two built-in calculations: one for web inventory per item and one for web prices. They are used by integrations that send inventory or prices calculated in Business Central, and they are set up per [destination](destinations.md). Switch them on in the settings only when an integration uses them. See [Web Connect Item Inventory](item-inventory.md).

## Retention policies

Web Connect uses the retention policy framework in Business Central to control how long log data is kept. Without retention policies the Web Connect tables grow until the database is full, which among other things blocks the creation of new sandboxes. The built-in policies are found under retention policies in **Web Connect Settings**. Enable them and set a time at night for the cleanup to run.

### Recommended policies

| Policy | Table content |
|--------|---------------|
| **Values** | The data in the inbox of incoming data |
| **Incoming Data** | The incoming data records themselves |
| **Error Values** | Values with errors in the inbox |
| **Blob Data** | The content of the web entries |
| **Outgoing Data** | The outgoing sync table |

### Do not enable

**Sync Outgoing Data After.** This policy deletes the External ID stored on the outgoing data, for example the ID that the external system has given a product, and breaks the sync with the external system. Leave it disabled.

### How the cleanup job behaves

The deletion job is throttled. It stops after roughly 3,000 transactions to avoid overloading the system and continues the following night. Large backlogs are therefore cleaned up over several nights, not in one run.

See also [Database is full: enable retention policies](../../../how-to/web-connect/database-full-enable-retention-policies.md).

## Configure it yourself in Business Central

| What you can change | Where | Example |
|---|---|---|
| Whether changes in Business Central are picked up | **Auto-populate outgoing data from triggers** | Switch it on when the first integration goes live |
| How often an object is downloaded | **No. of Minutes between Runs**, **Starting Time** and **Ending Time** on the [object](objects.md) | Fetch orders every five minutes during the day |
| How long log data is kept | Retention policies in **Web Connect Settings** | Enable the recommended policies so that the database does not fill up |

## Related

- [Web Connect Integrations](integrations.md)
- [Web Connect Objects](objects.md)
- [Web Connect Destinations](destinations.md)
- [Web Connect Entries](entries.md)
