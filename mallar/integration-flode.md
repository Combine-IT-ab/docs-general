---
title: "[SYSTEM] to Business Central: [flow name]"
description: "[One sentence, 140 to 160 characters: what the flow does, what triggers it and the result in Business Central or SYSTEM.]"
summary: "[Two to three sentences. Same as the first paragraph below.]"
slug: integrations/business-central-[system]/[flow]
lang: en
translation_key: integration-[system]-[flow]
product: web-connect
type: integration-flow
system: "[SYSTEM]"
system_category: "[category]"
keywords:
  - business central [system] [flow]
faq:
  - question: "[A real question about this flow]"
    answer: "[Answer]"
last_reviewed: YYYY-MM-DD
---

# [SYSTEM] to Business Central: [flow name]

[Answer first, two to three sentences. Example: "When a customer places an order in Centra, Web Connect creates a sales order in Business Central and confirms the order in Centra. The flow starts from a webhook, so orders arrive within seconds."]

| | |
|---|---|
| **Direction** | [SYSTEM] → Business Central |
| **Trigger** | [Webhook, schedule or change in Business Central] |
| **Result** | [What exists afterwards in each system] |
| **Part of** | [Business Central and SYSTEM integration](../overview.md) |

## Step by step

1. [Step, with the responsible system]
2. [Step]
3. [Step]

```mermaid
sequenceDiagram
    participant S as 🛒 [SYSTEM]
    participant WC as ⚙️ Web Connect
    participant BC as 🔄 Business Central

    S-->>WC: [Event]
    WC->>S: [Fetch details]
    S-->>WC: [Data]
    alt [Success condition]
        WC->>BC: [Create or update]
        BC-->>WC: [Result]
    else [Error condition]
        WC-->>WC: [What happens] ⚠️
    end
```

## Data mapping

| [SYSTEM] field | Business Central field | Note |
|---|---|---|
| [field] | [field] | [Conversion or rule] |

## Web Connect objects

| Object | Role |
|---|---|
| `[OBJECT_CODE]` | [What it does] |

## Error handling

| Situation | What happens | What to do |
|---|---|---|
| [Error] | [Behaviour] | [Action, link to how-to] |

## Frequently asked questions

### [Question]

[Answer]

## Related

- [Business Central and SYSTEM integration](../overview.md)
- [Other flows]
- [How-to guides]
