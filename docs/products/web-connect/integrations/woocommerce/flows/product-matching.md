---
title: "Business Central to WooCommerce: product matching"
description: "Web Connect looks up each Business Central item in WooCommerce by SKU, once per language, and stores the WooCommerce product ID used for prices and stock."
summary: "Web Connect finds each Business Central item in WooCommerce by SKU and stores the WooCommerce product ID. In a multilingual store this is done once per language, so prices and stock reach every language version."
slug: integrations/business-central-woocommerce/product-matching
lang: en
translation_key: integration-woocommerce-product-matching
product: web-connect
type: integration-flow
system: "WooCommerce"
system_category: "e-commerce"
keywords:
  - business central woocommerce products
  - woocommerce sku business central
last_reviewed: 2026-11-19
---

# Business Central to WooCommerce: product matching

Web Connect finds each Business Central item in WooCommerce by SKU and stores the WooCommerce product ID. In a multilingual store this is done once per language, so prices and stock reach every language version.

| | |
|---|---|
| **Direction** | Business Central → WooCommerce, with the answer back to Business Central |
| **Trigger** | A chosen field on the item changes, for example when the item is marked for the web shop, and on a schedule in the job queue |
| **Result** | The WooCommerce product ID per language stored in Web Connect for the item |
| **Part of** | [Business Central and WooCommerce integration](../overview.md) |

## Step by step

1. An item is marked for the web shop in Business Central.
2. Web Connect asks WooCommerce for the product with the item number as SKU, once for each language.
3. The product ID in the answer is stored as the external ID of the item for that language.
4. [Price update](price-update.md) and [Stock update](stock-update.md) use the stored ID.

```mermaid
sequenceDiagram
    participant BC as 🔄 Business Central
    participant WC as ⚙️ Web Connect
    participant W as 🛒 WooCommerce

    BC-->>WC: Item marked for the web
    WC->>W: GET products by SKU, language 1
    W-->>WC: Product ID
    WC->>W: GET products by SKU, language 2
    W-->>WC: Product ID
    WC->>WC: Store product IDs on the item
```

## Data mapping

| Business Central field | WooCommerce field | Note |
|---|---|---|
| No. | `sku` | Search parameter, together with the language |
| External ID in Web Connect | `id` | Read from the answer |

## Web Connect objects

| Object | Role |
|---|---|
| `WOC-ITEM` | Finds the product in the first language |
| `WOC-ITEM_ENG` | Finds the product in the second language |

## Related

- [Business Central and WooCommerce integration](../overview.md)
- [Price update](price-update.md) · [Stock update](stock-update.md)
