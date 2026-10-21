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

## Mapping to Option and Enum Fields

When the BC field is an option or enum field, the BC value in the text mapping is the field's **ordinal value** (the number BC stores), not the caption shown on the page.

Ordinal values are not always a simple sequence `0, 1, 2`. Values that an app extension adds to a standard enum use that app's number range, for example `12096900`. Hard coding `2` because the value is third in the list will then fail or pick the wrong value. Look up the actual ordinal before you map, see [How do I map to an enum value added by an extension?](../../../how-to/web-connect/map-to-extended-enum-value.md)

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
