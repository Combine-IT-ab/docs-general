---
title: "Business Central and [SYSTEM] integration"
description: "[One sentence, 140 to 160 characters: what Web Connect syncs between Business Central and SYSTEM, and in which direction.]"
summary: "[Two to three sentences. Same as the first paragraph below.]"
slug: integrations/business-central-[system]
lang: en
translation_key: integration-[system]
product: web-connect
type: integration
system: "[SYSTEM]"
system_category: "[category from the table in mallar/README.md]"
keywords:
  - business central [system] integration
  - [system] business central
  - [system] erp integration
faq:
  - question: "Can Business Central be integrated with [SYSTEM]?"
    answer: "[Yes. Short answer with the flows and the product.]"
  - question: "[A real question from support or a customer meeting]"
    answer: "[Answer]"
  - question: "[A real question]"
    answer: "[Answer]"
last_reviewed: YYYY-MM-DD
---

# Business Central and [SYSTEM] integration

[Answer first, two to three sentences. Example: "Web Connect by CombineIT connects Microsoft Dynamics 365 Business Central with Centra, the e-commerce platform. Orders and customers are imported from Centra into Business Central, and stock, shipments, cancellations and product data are sent back to Centra. Web Connect runs inside your own Business Central, where you can see and change every mapping and rule yourself."]

## At a glance

| | |
|---|---|
| **System** | [SYSTEM] ([category]) |
| **Integration product** | Web Connect for Microsoft Dynamics 365 Business Central |
| **Runs in** | Your own Business Central environment, as an extension [ATT FYLLA I: verifiera med Martin vilka delar som eventuellt körs utanför BC, till exempel mottagning av webhooks] |
| **Configured by** | You, in Business Central: mappings, conditions, triggers and flows. CombineIT can help, but nothing is hidden. |
| **Connection** | [REST API, GraphQL, webhooks, SFTP, Azure Service Bus] |
| **[SYSTEM] API** | [Name and link to the system's API documentation] |
| **Number of flows** | [n] |
| **Business Central editions** | [Essentials, Premium: ATT FYLLA I] |
| **Available from** | [Microsoft AppSource link] |

## What is synchronized

| Flow | Direction | Trigger | What happens |
|---|---|---|---|
| [Order inbound](order-inbound.md) | [SYSTEM] → Business Central | [Webhook or schedule] | [Sales order created in Business Central] |
| [Stock update](stock-update.md) | Business Central → [SYSTEM] | [Change in inventory or schedule] | [Available stock sent to SYSTEM] |
| [Flow] | [Direction] | [Trigger] | [What happens] |

## How it works

[Two to four sentences on the architecture: what starts the flows, where Web Connect runs, how errors are handled.]

```mermaid
graph LR
    A["🛒 [SYSTEM]<br/>([category])"]
    B["⚙️ Web Connect<br/>(Business Central extension)"]
    C["🔄 Business Central<br/>(ERP)"]

    A -->|[event]| B
    B -->|[action]| C
    C -->|[event]| B
    B -->|[action]| A
```

## Master data ownership

| Data | Master system | Direction |
|---|---|---|
| Orders | [SYSTEM or Business Central] | [Direction] |
| Stock | [System] | [Direction] |
| Products and prices | [System] | [Direction] |
| Customers | [System] | [Direction] |

## What you need

- Microsoft Dynamics 365 Business Central [edition and version: ATT FYLLA I]
- Web Connect installed from Microsoft AppSource
- [Access or API credentials in SYSTEM, and where they are created]
- [Anything else that is required, for example a webhook endpoint or a license in SYSTEM]

## Setting it up

1. [Install Web Connect and the ready integration for SYSTEM.]
2. [Create the connection and store credentials in Secret Value Storage.]
3. [Choose which flows to activate.]
4. [Map the configuration choices below.]
5. [Test in a sandbox before production.]

## Configure it yourself in Business Central

Everything in the integration is visible and editable in Business Central. There is no external platform where the logic is hidden.

| What you can change | Where in Web Connect | Example |
|---|---|---|
| Field mapping | [Incoming Data mapping or Outgoing Mapping] | [Map a SYSTEM field to a Business Central field] |
| Conditions | [Condition List] | [Route orders from one sales channel to a specific customer] |
| Triggers | [Outgoing Sync Triggers] | [Send stock when inventory changes, or on a schedule] |
| Monitoring | [Entries] | [See every message sent and received, and resend one] |

[Link to the general Web Connect pages that describe each part.]

## Configuration choices

[The decisions every implementation makes. Describe options generally, never a specific customer's setup.]

- **[Choice]:** [What it controls and the common options.]
- **[Choice]:** [What it controls and the common options.]

## Limitations

- [What is not supported, or needs an extension.]
- [Known behaviour that surprises users.]

## Frequently asked questions

[The same questions as in `faq` in the frontmatter, written out.]

### Can Business Central be integrated with [SYSTEM]?

[Answer]

### [Question]

[Answer]

## Related

- [Flow pages]
- [How-to guides that concern this integration]
- [Web Connect general documentation](../../general/README.md)
- [SYSTEM documentation](https://)

## About Web Connect

Web Connect is an integration platform for Microsoft Dynamics 365 Business Central, developed by CombineIT. It runs inside your own Business Central and connects it with e-commerce platforms, warehouse systems, POS, returns, marketplaces and EDI. Every flow, mapping and rule is configured in Business Central, where you can see and change it yourself, without custom code for each integration. [Statement on MartIT and CombineIT: wording decided in docs-internal#59.] [Web Connect on Microsoft AppSource](https://marketplace.microsoft.com/sv-se/product/PUBID.martitab1633951001710%7CAID.webconnect%7CPAPPID.9f3a7223-19db-4ac7-832f-cf8e4699186f?tab=Overview) · [Contact CombineIT](https://www.combineit.se/contact/)
