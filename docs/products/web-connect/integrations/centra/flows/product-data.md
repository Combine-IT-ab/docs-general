# Product Data Flow

**Direction:** BC → Centra
**Purpose:** Sync product, variant, and pricing information from Business Central to Centra (optional).

---

## Overview

This flow is **optional** and used only when Business Central is the master for product data. If enabled, it synchronizes items, variants, sizes, and prices to Centra whenever they are created or updated in BC.

---

## How It Works

**Trigger:** Automatic — item/variant/price changes in BC (configurable)
**API operations:** Create/update product, variant, size, and price in Centra

**Objects used:**

| Object | Role |
|---|---|
| `CA_PRODUCT` | Creates or updates product in Centra |
| `CA_VARIANT` | Creates or updates product variant (e.g. color) |
| `CA_SIZE` | Creates or updates size/dimension (e.g. S, M, L) |
| `CA_PRICE` | Creates or updates price for the product/variant/size combination |

**Product Hierarchy in Centra:**

```
Product
  ├─ Variant (e.g. color: Red, Blue)
  │   ├─ Size (e.g. S, M, L)
  │   └─ Price
  └─ Variant (e.g. color: Green)
```

---

## Important: Size Charts

In Centra, once a **Size Chart** is assigned to a product, it **cannot be changed without deleting and recreating the product**. Size structure must be planned before the product is published.

---

## Variants

### Variant A — Simple Product

Products without color/size variants — one product, one price.

### Variant B — Color + Size Product

Products with color variants and multiple sizes (e.g. clothing).

### Variant C — Variant-only

Products have variants (e.g. styles) but no size dimension.

---

## When NOT to Use This Flow

- Centra is the master for products
- Products need rich content (images, SEO) better managed in Centra
- Product changes are infrequent and manual updates are acceptable

---

**Related:**
[Overview](../overview.md) · [Stock Update](stock-update.md) · [How-to](../../../../../how-to/web-connect/README.md)
