# Integrations or Automation Not Running

If an integration has stopped working — nothing is sent, nothing is received, or automatic processes no longer run — work through the checks below **in order**.

Each step rules out one layer, starting with the settings that disable everything at once and ending with the individual transactions. A problem at an early step makes the later ones irrelevant.

## 1. Is Web Connect Enabled?

Open **Web Connect General Setup** (*Web Connect Allmänna inställningar*) and verify that Web Connect is enabled.

If this is switched off, nothing runs regardless of how everything else is configured. This is the first thing to check.

<img width="885" height="395" alt="bild (3)" src="https://github.com/user-attachments/assets/52841791-a997-4b9b-b2a8-816021533b76" />


## 2. Are the Automatic Processes Enabled?

In the same view, open the **Automatic Processes** tab (*Automatiska processer*) and verify that all — or at least the relevant — processes are ticked.

Downloads and uploads are configured per integration and object, each with its own interval and enabled flag. A process that is not enabled will never run, and no error is raised — it simply does nothing.

<img width="1354" height="420" alt="bild (4)" src="https://github.com/user-attachments/assets/04d086f1-5497-4c5b-9fea-377f28ccdd8c" />


## 3. Is the Integration Active?

Open **Web Connect Integrations** (*Web Connect Integrationer*) and verify that the integration has **Enabled** ticked.

An integration can be disabled without any visible error. Messages simply stop being processed.

<img width="727" height="325" alt="bild (5)" src="https://github.com/user-attachments/assets/5cde6283-e6d3-4bff-a436-d29054e20717" />


## 4. Is the Job Queue Running?

Web Connect relies on job queue entries to move data. Every integration needs the upload and download jobs. A logistics integration (a WMS or 3PL) also needs the logistics job. Without it, receipts and shipments from the warehouse never reach Business Central.

| Job queue entry | Codeunit | Needed for | Created from |
|---|---|---|---|
| **WCM Upload Job** | 12096509 | All integrations. Sends outgoing data | [Web Connect General Setup](../../products/web-connect/general/general-setup.md) |
| **WCM Download/Update Job** | 12096522 | All integrations. Fetches and processes incoming data | [Web Connect General Setup](../../products/web-connect/general/general-setup.md) |
| **WCM Logistics Job** | 12096563 | Logistics integrations. Processes WMS documents such as receipts and shipments | [Logistics Setup](../../products/web-connect/general/logistics-setup.md) |

Create the entries from Web Connect, not by hand in **Job Queue Entries**. New entries are created *On Hold*. Someone with permission to start job queue entries must set them to **Ready**.

For each entry, check that:

1. Status is **Ready** or **In Process**
2. **Last Run** has a recent timestamp
3. No entry shows **Error**

If an entry has stopped, open it and read the error message, then choose **Set Status to Ready** to restart it. If it fails again immediately, the error message points to the underlying cause.

To see that the chain works, run the entries once in the foreground: Download/Update first, then Logistics. Any error is shown directly.

Install [Job Queue Monitor](../../products/job-queue-monitor/README.md) to keep the entries running. It restarts them when they stop.

<!-- screenshot: Job Queue Entries filtered on WCM Upload, WCM Download / Update and WCM Logistics -->

## 5. Are Transactions Being Created and Processed?

Finally, check that transactions are actually being created and are moving.

If messages are queued but never leave, or nothing is created at all, this tells you whether the problem is upstream (nothing is being triggered) or downstream (something is being sent but failing).

The relevant views are:

| View | BC view name | Use it to |
|---|---|---|
| [Outgoing Data](../../products/web-connect/general/outgoing-mapping/outgoing-data-web.md) | Web Connect Utgående data webb | See what is queued to be sent |
| [Incoming Data](../../products/web-connect/general/incoming-data/README.md) | Web Connect Inkommande data webb | See what has been received |
| [Entries](../../products/web-connect/general/entries.md) | Web Connect Poster | See the full request and response for a failed call |

<!-- screenshot: transactions being created and processed -->

## Still Not Working?

If all five checks pass and the integration still does not run, the problem is more likely in the configuration of a specific object or mapping than in the automation itself. Check [Web Connect Entries](../../products/web-connect/general/entries.md) for the failed call and read the response from the external system.

If you are unsure, contact us before changing anything in a production environment.

## Related

- [Web Connect General Setup](../../products/web-connect/general/general-setup.md)
- [Web Connect Integrations](../../products/web-connect/general/integrations.md)
- [Web Connect Entries](../../products/web-connect/general/entries.md)
- [How do I resend an outgoing message?](resend-outgoing-message.md)
