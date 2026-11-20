# Web Connect Entries

> **BC view name:** Web Connect Poster

## Overview

Web Connect Entries, also called web entries or web transactions, is the log of every message that Web Connect sends to or receives from an external system. Each entry is one call. It shows the address, the HTTP method, the request, the answer and the HTTP status code, so it works much like a request tool such as Postman.

Entries are created by the job queues and by webhooks. They are not edited by hand.

## Types of entries

The list has a filter at the top for the type of entry: uploads, downloads or webhooks. When you open the page the first time no type is selected, so choose the type you want to see.

| Type | Created by | Content |
|------|------------|---------|
| Upload | The upload job, from records in [Outgoing Data](outgoing-mapping/outgoing-data-web.md) | A message to the external system, built with the [outgoing mapping](outgoing-mapping/README.md). One entry can hold several records, as set with **MaxRecord per Entry** on the [object](objects.md). |
| Download | The download job | A request to fetch data. The answer becomes [incoming data](incoming-data/README.md). |
| Webhook | A [webhook](webhooks.md) from an external system | The message the external system pushed to Business Central, with its source. |

## Status of an entry

| Status | Meaning |
|--------|---------|
| **Sent** | The entry has been sent to the external system. |
| **Sent and Confirmed** | The external system answered successfully. |

An entry that stays on **Sent** without becoming **Sent and Confirmed** did not get a successful answer. Open the entry: the request, the answer and the HTTP status code show why. A status code of `200` means OK, while codes from `400` and up mean that the call failed.

The external system always answers with something. Depending on the [object](objects.md), the answer to an upload is ignored or becomes incoming data, so that the download job can process it, for example to save an ID that the external system has given the record.

## When to use entries and when to use other views

| Scenario | Use |
|----------|-----|
| Check if a specific record was picked up for sending | [Web Connect Outgoing Data](outgoing-mapping/outgoing-data-web.md) |
| See how a received message was interpreted and mapped | [Web Connect Incoming Data](incoming-data/README.md) |
| See exactly what was sent or received, and the answer | **Web Connect Entries** |
| Find out why a call to an external system failed | **Web Connect Entries** |

## Configure it yourself in Business Central

| What you can change | Where | Example |
|---|---|---|
| How many records are sent in one message | **MaxRecord per Entry** on the [object](objects.md) | Group inventory updates so that fewer calls are made |
| How long entries are kept | Retention policies in [Web Connect General Setup](general-setup.md) | Enable the policy for blob data so that the database does not fill up |

## Related

- [Web Connect General Setup](general-setup.md)
- [Web Connect Incoming Data](incoming-data/README.md)
- [Web Connect Outgoing Data](outgoing-mapping/outgoing-data-web.md)
- [Web Connect Webhooks](webhooks.md)
