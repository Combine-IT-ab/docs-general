# Web Connect Incoming Data Mapping

> **BC view name:** Web Connect Mappning inkommande data

## Overview

Web Connect Incoming Data Mapping defines how values from an external payload are extracted and written into Business Central. Mappings are configured per Web Connect Object and determine the field-by-field translation between the incoming data structure and BC fields.

## Mapping Basics

| Concept | Description |
|---------|-------------|
| **Key Name** | The field name in the incoming payload (JSON key, XML element, etc.). |
| **Field No.** | The BC field to write the value to. |
| **Field Name** | BC field name (read-only reference). |
| **Fixed Value** | Write a fixed value to a BC field regardless of the payload content. |
| **Required** | If checked, processing fails when this field is missing from the payload. |

## Value Transformations

| Transformation | Description |
|----------------|-------------|
| **Text Mapping** | Translate the incoming value before writing to BC. See [Web Connect Text Mapping](../text-mapping.md). |
| **Date Format** | Specify the date format in the incoming payload (e.g. `YYYY-MM-DD`). |
| **Decimal Separator** | Specify whether the payload uses `.` or `,` as decimal separator. |
| **Max Length** | Truncate the incoming value to a maximum length before writing. |
| **Convert to Uppercase** | Convert value to uppercase before writing. |
| **Convert to Lowercase** | Convert value to lowercase before writing. |

## Lookup & Advanced Logic

| Feature | Description |
|---------|-------------|
| **Lookup Field** | Instead of writing the raw value, look up a related BC record and write its key. For example, look up Customer by e-mail and write Customer No. |
| **Lookup Table** | The BC table to look up in. |
| **Lookup Field No.** | The field in the lookup table to match against the incoming value. |
| **Lookup Result Field** | The field from the matched record to write back. |
| **Dynamic Flow Field** | Calculate the value using a [Web Connect Dynamic Flow Field](../dynamic-flow-fields.md) instead of reading directly from the payload. |

## Triggers

| Feature | Description |
|---------|-------------|
| **Trigger on Insert** | Run additional BC logic after inserting the record. |
| **Trigger on Modify** | Run additional BC logic after modifying the record. |
| **Codeunit Trigger** | Reference a custom codeunit for advanced processing. |

## Uniqueness & Filtering

| Feature | Description |
|---------|-------------|
| **Primary Key Field** | Mark a mapping line as contributing to the primary key. Used to determine whether a record should be created or updated. |
| **Condition Code** | Only apply this mapping line when the condition is met. See [Web Connect Condition List](../condition-list.md). |
| **Ignore if Empty** | Skip writing this field if the incoming value is blank. |

## Additional Record Logic

| Feature | Description |
|---------|-------------|
| **Create if Not Found** | Create a new BC record if no matching record exists. |
| **Update if Found** | Update an existing BC record if a matching record is found. |
| **Delete if Not in Payload** | Delete BC records that are not present in the incoming payload (useful for sync of complete lists). |

## Examples

**Map an order number:** Key Name = `orderNumber` → Field No. = 3 (Document No. on Sales Header)

**Look up customer by email:** Key Name = `customerEmail` → Lookup Table = Customer → Lookup Field = E-Mail → Lookup Result = No.

**Fixed document type:** Fixed Value = `Order` → Field No. = 1 (Document Type on Sales Header)

## Best Practices

- Always define a **Primary Key Field** so Web Connect can distinguish between create and update operations.
- Use **Ignore if Empty** for optional fields to avoid overwriting existing BC values with blank.
- Combine **Lookup** with **Create if Not Found** for master data like customers and items when you want Web Connect to maintain BC data automatically.
- Use **Condition Code** to apply different mappings for different record types within the same payload structure.

## Related

- [Web Connect Incoming Data](README.md)
- [Web Connect Objects](../objects.md)
- [Web Connect Text Mapping](../text-mapping.md)
- [Web Connect Condition List](../condition-list.md)
- [Web Connect Dynamic Flow Fields](../dynamic-flow-fields.md)
