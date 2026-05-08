# Web Connect Text Mapping

> **BC view name:** Web Connect Textmappning

## Overview

Web Connect Text Mapping translates values between Business Central and external systems. When a value in one system doesn't match what the other system expects, a text mapping defines the translation.

## Directions

Text mappings can apply in two directions:

| Direction | Description |
|-----------|-------------|
| **Incoming** | Translates values received from an external system into BC values before processing. |
| **Outgoing** | Translates BC values into the format expected by the external system before sending. |

A single text mapping can support both directions simultaneously.

## Common Use Cases

**Warehouse codes** — the external system uses its own location identifiers:

```
BC Value: MAIN    →  External: warehouse-01
BC Value: NORTH   →  External: warehouse-02
```

**Payment methods** — map BC payment codes to external payment types:

```
BC Value: CARD    →  External: credit_card
BC Value: INVOICE →  External: invoice
```

**Shipping methods** — translate carrier codes:

```
BC Value: DHL     →  External: dhl_express
BC Value: POSTNORD →  External: postnord_mypack
```

**Order types** — map document types to external order classifications:

```
BC Value: Order   →  External: B2C
BC Value: Invoice →  External: B2B
```

## Fields

| Field | Description |
|-------|-------------|
| **Code** | Unique identifier for the text mapping. |
| **Description** | Human-readable explanation. |
| **Direction** | Incoming, Outgoing, or Both. |
| **BC Value** | The value as it appears in Business Central. |
| **External Value** | The corresponding value in the external system. |
| **Default Value** | Fallback value if no match is found. Leave blank to pass the original value through. |
| **Case Sensitive** | Whether matching is case-sensitive. |

## Best Practices

- Always define a **Default Value** when the external system requires a specific fallback.
- Use **Both** direction when BC and external values need two-way translation (e.g. for order sync that includes both downloads and uploads).
- Keep mappings focused — one text mapping per concept (don't mix warehouse codes and payment methods in the same mapping).

## Related

- [Web Connect Objects](objects.md)
- [Web Connect Incoming Data](incoming-data/README.md)
- [Web Connect Outgoing Data](outgoing-mapping/outgoing-data-web.md)
