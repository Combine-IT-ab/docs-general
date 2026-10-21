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

[Answer first, two to three sentences. Example: "Web Connect by CombineIT connects Microsoft Dynamics 365 Business Central with Centra, the e-commerce platform. Orders are fetched from Centra into Business Central, and shipments, stock, products, prices and cancellations can be sent back to Centra. You choose which flows to use. All mappings and rules live in your own Business Central, where you can see and change them yourself."]

## At a glance

| | |
|---|---|
| **System** | [SYSTEM] ([category]) |
| **Integration product** | Web Connect for Microsoft Dynamics 365 Business Central |
| **Runs in** | Your own Business Central environment, as an extension. [Describe how data comes in, verified in the configuration export: fetched on a schedule from the job queue, or (only if the integration uses incoming webhooks) received by an Azure endpoint that passes them on to Web Connect. All processing and configuration stays in Business Central.] |
| **Configured by** | You, in Business Central: mappings, conditions, triggers and flows. You can do all of it yourself. If you want, CombineIT takes part in any step, as a sounding board or by doing the work. |
| **Connection** | [REST API, GraphQL, webhooks, SFTP, Azure Service Bus] |
| **[SYSTEM] API** | [Name and link to the system's API documentation] |
| **Business Central editions** | [Essentials, Premium: ATT FYLLA I] |
| **Available from** | [Microsoft AppSource link] |

## What can be synchronized

[Everything the integration can do. Which flows a customer uses is decided in "Choose your setup".]

| Data | Direction | What happens |
|---|---|---|
| [Orders](order-inbound.md) | [SYSTEM] → Business Central | [Sales order created in Business Central] |
| [Stock](stock-update.md) | Business Central → [SYSTEM] | [Available stock sent to SYSTEM] |
| [Data] | [Direction] | [What happens] |

[One sentence on which flow is part of every integration, and that the others are chosen at setup. Link to Choose your setup.]

## How it works

[Two to four sentences on the architecture: what starts the flows (schedule, trigger or webhook, verified in the configuration export), where Web Connect runs, how errors are handled.]

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

## Choose your setup

Each flow has to fit how your business works: which system owns the data, where people do their work, and what the accounting needs. That is why the flows are decided together when a new integration is set up. The options below are the ones Web Connect customers use today. **Common setup** marks the option most Web Connect customers with [SYSTEM] use.

[One subsection per data area. List every option that is in use with real customers, never invented ones. Mark the common setup only when it is verified from the configuration exports (docs-internal#61), and state the share of customers when it is known.]

### [Data area, for example Stock]

| Option | How it works | When it fits |
|---|---|---|
| **[Option]** (common setup) | [How the data flows, and which system calculates or owns it] | [The situation where this is the right choice] |
| **[Option]** | [How it works] | [When it fits] |

[After the subsections: one sentence on what is always maintained in SYSTEM.]

## What you need

- Microsoft Dynamics 365 Business Central [edition and version: ATT FYLLA I]
- Web Connect installed from Microsoft AppSource, with an activated Web Connect license
- Your approval for Web Connect to be installed and to act in your Business Central environment
- [Access or API credentials in SYSTEM, and where they are created]
- [Anything else that is required in SYSTEM, verified in the configuration export]

## Setting it up

1. Decide which flows to use and which option to choose for each, see Choose your setup.
2. [Install Web Connect, activate the license and give your approval. Install the ready integration for SYSTEM.]
3. [Create the connection and store credentials in Secret Value Storage.]
4. [Map the configuration choices below.]
5. [Test in a sandbox before production.]

## Configure it yourself in Business Central

All configuration and logic in the integration is visible and editable in Business Central. There is no external integration platform where the logic is hidden. [Only if the integration uses incoming webhooks: The Azure endpoint that receives webhooks only passes the call on to Web Connect.]

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

Web Connect is an integration platform for Microsoft Dynamics 365 Business Central, developed by CombineIT. It is installed in your own Business Central and connects it with e-commerce platforms, warehouse systems, POS, returns, marketplaces and EDI. Every flow, mapping and rule is configured in Business Central, where you can see and change it yourself, without custom code for each integration. [Statement on MartIT and CombineIT: wording decided in docs-internal#59.] [Web Connect on Microsoft AppSource](https://marketplace.microsoft.com/sv-se/product/PUBID.martitab1633951001710%7CAID.webconnect%7CPAPPID.9f3a7223-19db-4ac7-832f-cf8e4699186f?tab=Overview) · [Contact CombineIT](https://www.combineit.se/contact/)
