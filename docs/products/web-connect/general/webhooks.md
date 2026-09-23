# Web Connect Webhooks

## Overview

Web Connect normally works asynchronously through two job queues: the upload job (BC → external system) and the download job (external system → BC). Webhooks are the exception. They let an external system push data straight into BC, and Web Connect can answer synchronously in the same call.

## How a Webhook Reaches Web Connect

1. The external system calls an OData page in Business Central.
2. Web Connect creates a **Webhook** record.
3. The **Webhook Handling** setting on the Web Object card decides what happens next.

## Webhook Handling

| Setting | Behaviour |
|---------|-----------|
| **No Action** | The webhook is ignored. |
| **Download Content** | Triggers an asynchronous Download Request for the object. The payload itself is not used. |
| **Create Content** | Creates an Incoming Data record from the webhook payload, processed by the download job. |
| **Find Record & Respond** | Looks up a BC record and returns a payload built from the object's Outgoing Mapping, in the same call. |
| **Create & Respond** | Creates a BC record from the payload, finds it, and returns a payload built from the Outgoing Mapping. |

## When to Use Which

- Use **Download Content** or **Create Content** when the external system only needs to notify BC and does not need an answer. Processing is asynchronous, so monitor the job queues as for any other object.
- Use **Find Record & Respond** or **Create & Respond** when the caller needs data back, for example an order confirmation with the BC order number. This makes Web Connect act as an API provider. It is powerful but slower than a dedicated API page, so keep the responding objects small.

## Related

- [How do I set up an incoming webhook that creates a document in BC?](../../../how-to/web-connect/set-up-incoming-webhook.md)
- [Web Connect Objects](objects.md)
- [Web Connect Incoming Data](incoming-data/README.md)
- [Web Connect Outgoing Mapping](outgoing-mapping/README.md)
