---
title: "WooCommerce to Business Central: order inbound"
description: "Orders placed in a WooCommerce store are read by Web Connect through the WooCommerce REST API and created as sales orders in Business Central."
summary: "When a customer places an order in WooCommerce, Web Connect reads it through the WooCommerce REST API and creates a sales order in Business Central. [ATT FYLLA I: what starts the flow, schedule or webhook.]"
slug: integrations/business-central-woocommerce/order-inbound
lang: en
translation_key: integration-woocommerce-order-inbound
product: web-connect
type: integration-flow
system: "WooCommerce"
system_category: "e-commerce"
keywords:
  - business central woocommerce order
  - woocommerce orders business central
faq:
  - question: "[ATT FYLLA I: a real question about this flow]"
    answer: "[ATT FYLLA I: answer]"
last_reviewed: 2026-11-19
---

# WooCommerce to Business Central: order inbound

When a customer places an order in WooCommerce, Web Connect reads it through the WooCommerce REST API and creates a sales order in Business Central. [ATT FYLLA I: what starts the flow, schedule or webhook, verified in the configuration export.]

| | |
|---|---|
| **Direction** | WooCommerce → Business Central |
| **Trigger** | [ATT FYLLA I: schedule in the job queue or WooCommerce webhook] |
| **Result** | A sales order in Business Central. [ATT FYLLA I: whether anything is written back to the order in WooCommerce] |
| **Part of** | [Business Central and WooCommerce integration](../overview.md) |

## Step by step

1. The customer places an order in WooCommerce.
2. Web Connect reads the order from the WooCommerce REST API. [ATT FYLLA I: how new orders are found, for example by status or by date modified.]
3. Web Connect creates a sales order in Business Central with the order lines.
4. [ATT FYLLA I: whether the order status is updated in WooCommerce afterwards.]

```mermaid
sequenceDiagram
    participant W as 🛒 WooCommerce
    participant WC as ⚙️ Web Connect
    participant BC as 🔄 Business Central

    WC->>W: Read new orders (REST API)
    W-->>WC: Order with lines and addresses
    alt Customer and all items matched
        WC->>BC: Create sales order
        BC-->>WC: Sales order created
    else Mapping missing or validation error
        WC-->>WC: Error logged in Entries ⚠️
    end
```

## Data mapping

| WooCommerce field | Business Central field | Note |
|---|---|---|
| [ATT FYLLA I: order number] | [ATT FYLLA I] | [ATT FYLLA I] |
| [ATT FYLLA I: line SKU] | [ATT FYLLA I: item and variant] | [ATT FYLLA I] |
| [ATT FYLLA I: billing and shipping address] | [ATT FYLLA I: sell-to and ship-to] | [ATT FYLLA I] |
| [ATT FYLLA I: shipping lines] | [ATT FYLLA I] | [ATT FYLLA I] |

## Web Connect objects

| Object | Role |
|---|---|
| [ATT FYLLA I: `OBJECT_CODE`] | [ATT FYLLA I: objects for the order, its lines and addresses, from the configuration export] |

## Error handling

| Situation | What happens | What to do |
|---|---|---|
| WooCommerce API not reachable or credentials rejected | No orders are read | Check the stored credentials in [Secret Value Storage](../../../general/secret-value-storage.md) and see [Integrations not running](../../../../../how-to/web-connect/integration-not-running.md) |
| An item on the order is not found in Business Central | The error is logged in [Entries](../../../general/entries.md). [ATT FYLLA I: confirm that the sales order is not created] | [ATT FYLLA I: action] |
| [ATT FYLLA I: other errors] | [ATT FYLLA I] | [ATT FYLLA I] |

## Frequently asked questions

### [ATT FYLLA I: a real question about this flow]

[ATT FYLLA I: answer]

## Related

- [Business Central and WooCommerce integration](../overview.md)
- [WooCommerce REST API: orders](https://woocommerce.github.io/woocommerce-rest-api-docs/#orders)
- [Web Connect Entries](../../../general/entries.md)
