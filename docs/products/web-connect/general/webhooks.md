# Web Connect Webhooks

## Overview

Web Connect normally works asynchronously through two job queues: the upload job sends data from Business Central, and the download job fetches data and writes it to Business Central. Webhooks are the exception. They let an external system push a message straight into Business Central, and for some setups Web Connect answers in the same call.

## How a webhook reaches Web Connect

1. The external system calls an address that CombineIT gives you. Behind it is a small Azure function per customer that forwards the call to Business Central.
2. The call must name the **source** and the [Web Connect Object](objects.md) that the message belongs to. Without an object Web Connect does not know what the message is, and the call fails.
3. Web Connect saves the message as a [Web Connect Entry](entries.md) of the type webhook, with the source and the full message. The entry shows what the external system sent and what Business Central answered.
4. The **Web Hook Action** on the object decides what happens next.

## Settings on the object

| Field | Description |
|-------|-------------|
| **Web Hook Action** | What Web Connect does with a webhook for this object. See the actions below. |
| **Web Hook Response** | The text that Web Connect answers the caller with, for example `OK` or a small JSON message that the external system expects. |
| **Web Object for Download Req.** | Used with `Download Content`: the download object that fetches the data, for example the object that fetches one order. |
| **Jpath External Id For Download** | Used with `Download Content`: where in the webhook the ID is, for example `orderNumber`. The ID is used when the download object fetches the record. |
| **Service Type for Download** | Used with `Download Content`: `Get` fetches one record and `Get All` fetches a list. |

## Actions

| Web Hook Action | What happens | Answer |
|-----------------|--------------|--------|
| **No Action** | The webhook is saved but nothing more happens. This is the default. | Asynchronous |
| **Download Content** | Starts a download with another object, using the ID in the webhook. The most common case is a message that says "order 7 is ready", and Web Connect then fetches order 7. | Asynchronous |
| **Create Content** | The webhook message is used as it is and becomes incoming data, which is mapped like any other download. | Asynchronous |
| **Find Record and Respond** | The message is mapped to find a record in Business Central. Nothing is created. A message is built from the object's outgoing mapping and returned in the same call, for example an invoice for a given order number. | Synchronous |
| **Create and Respond** | The message is processed through the incoming mapping at once and the record is created. The created record is then sent back through the outgoing mapping in the same call, for example a new customer with its customer number. | Synchronous |

## When to use which

- Use **Download Content** or **Create Content** when the external system only needs to tell Business Central that something happened. Processing is asynchronous, so monitor the job queues as for any other object.
- Use **Find Record and Respond** or **Create and Respond** when the caller needs data back at once. Web Connect then acts as an API. This is powerful and works for any message format, but it is much slower than a dedicated API page in Business Central. Use it only when the volume is small.

## How Create Content works

When a webhook with **Create Content** is processed, Web Connect creates a download entry for the same object with the webhook message as its answer. The download job then handles it like any other download: the message becomes [incoming data](incoming-data/README.md) and is split into the underlying objects and mapped. The source of the message is taken from **Fixed Source Value** on the [integration](integrations.md), so set it there.

## Configure it yourself in Business Central

| What you can change | Where | Example |
|---|---|---|
| What happens with a webhook | **Web Hook Action** on the object | Change from `No Action` to `Create Content` when you start receiving a new type of message |
| What the caller gets back | **Web Hook Response** | Answer with the JSON message the external system expects |
| Which object fetches the data | **Web Object for Download Req.** and **Jpath External Id For Download** | Fetch the full order when the webhook only contains its number |

The address and the Azure function are set up by CombineIT.

## Related

- [Web Connect Objects](objects.md)
- [Web Connect Entries](entries.md)
- [Web Connect Incoming Data](incoming-data/README.md)
- [Web Connect Outgoing Mapping](outgoing-mapping/README.md)
