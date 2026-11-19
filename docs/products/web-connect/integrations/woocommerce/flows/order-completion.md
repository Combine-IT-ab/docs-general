---
title: "Business Central to WooCommerce: order completion"
description: "When a sales shipment for a WooCommerce order is posted in Business Central, Web Connect sets the order to completed in WooCommerce through the REST API."
summary: "When a sales shipment for a WooCommerce order is posted in Business Central, Web Connect sets the order to completed in WooCommerce. Only shipments for orders that came from WooCommerce are sent."
slug: integrations/business-central-woocommerce/order-completion
lang: en
translation_key: integration-woocommerce-order-completion
product: web-connect
type: integration-flow
system: "WooCommerce"
system_category: "e-commerce"
keywords:
  - business central woocommerce shipment
  - woocommerce order completed business central
last_reviewed: 2026-11-19
---

# Business Central to WooCommerce: order completion

When a sales shipment for a WooCommerce order is posted in Business Central, Web Connect sets the order to completed in WooCommerce. Only shipments for orders that came from WooCommerce are sent.

| | |
|---|---|
| **Direction** | Business Central → WooCommerce |
| **Trigger** | A posted sales shipment, through an outgoing sync trigger. Triggers are set per integration. Usually the fields that are sent to WooCommerce are the trigger fields, so a change in one of them sends the record again |
| **Result** | The order has status completed in WooCommerce |
| **Part of** | [Business Central and WooCommerce integration](../overview.md) |

## Step by step

1. The order is shipped and the sales shipment is posted in Business Central.
2. Web Connect checks that the shipment belongs to an order from WooCommerce.
3. The order is updated in WooCommerce with status completed.

```mermaid
sequenceDiagram
    participant BC as 🔄 Business Central
    participant WC as ⚙️ Web Connect
    participant W as 🛒 WooCommerce

    BC-->>WC: Sales shipment posted
    WC->>W: PUT orders/{id} with status completed
    W-->>WC: Order updated
```

## Data mapping

| Business Central field | WooCommerce field | Note |
|---|---|---|
| Fixed value | `status` | Always `completed` |
| WooCommerce order ID on the shipment | Order in the URL | Shipments without it are not sent |

## Web Connect objects

| Object | Role |
|---|---|
| `WOC-UPDATE-ORDER-TO-SHIPPPED` | Sets the order to completed |

## Limitations

- In the setup used in production, only the status is sent, and the first posted shipment sets the order to completed. Tracking numbers and when an order counts as completed can be set per integration.

## Related

- [Business Central and WooCommerce integration](../overview.md)
- [Order inbound](order-inbound.md)
