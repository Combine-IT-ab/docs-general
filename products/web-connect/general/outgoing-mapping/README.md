# Web Connect Outgoing Mapping

> **BC view name:** Web Connect Datamappning utgående

## Overview

Web Connect Outgoing Mapping provides a consolidated, read-only overview of all outbound field mappings configured across Web Connect integrations.

This view is intended for reviewing how data is sent to external systems, analyzing outbound payloads, and gaining a full picture of mapping logic across multiple objects.

> **Important:** Outgoing mappings are configured and maintained on the Web Object level, not directly in this view. This page is for visibility and analysis, not primary configuration.

## How Outgoing Mapping Is Managed

Outbound mappings are defined per Web Connect Object and its Underlying Web Objects. Configuration is done via:

1. Web Connect Integrations → select an integration
2. Open the relevant Web Object
3. Configure Outgoing Mapping and Underlying Mapping (for child/related objects)

The Web Connect Outgoing Mapping view aggregates all these mappings into a single list.

## Filtering the View

Filter by **Object Filter** at the top of the page to display mappings for a specific Web Object. Useful when analyzing which fields are sent for a specific object, or the conditional logic tied to a single outbound flow.

## Field Reference

### Core Mapping Fields

| Field | Description |
|-------|-------------|
| **Key Name** | The field/key name expected by the external system. |
| **Web Object** | The Web Connect Object this mapping belongs to. |
| **Entry No.** | Line number of the mapping entry. |
| **Applies-to-Service Type** | Defines which HTTP method (POST, PUT, PATCH, etc.) this mapping applies to. Blank = all. |

### Conditions

| Field | Description |
|-------|-------------|
| **Condition** | Determines whether the mapping is included: blank (default), Include if valid, or Exclude if valid. |
| **Condition Code** | Reference to a condition in [Web Connect Condition List](../condition-list.md). Required when using Include/Exclude logic. |

### Structure & Positioning (XML / EDIFACT)

| Field | Description |
|-------|-------------|
| **Position No.** | XML hierarchy position or EDIFACT segment number. |
| **Sub Position No.** | EDIFACT component number (not used for XML/JSON). |
| **Is Attribute** | Marks the field as an XML attribute instead of an element. |
| **Data Container Field** | Marks a field that should contain all underlying data when used as an envelope object. |

### Value Source

| Field | Description |
|-------|-------------|
| **Fixed Value** | Sends a fixed value instead of data from Business Central. |
| **Dynamic Field** | Sends a value calculated from a [Web Connect Dynamic Flow Field](../dynamic-flow-fields.md). |
| **Field No.** | Business Central field number used as the source value. |
| **Field Name** | Business Central field name (read-only reference). |
| **Child Field Name** | Indicates the value originates from a related or underlying object. |

### Text Mapping & Formatting

| Field | Description |
|-------|-------------|
| **Mapping** | Reference to [Web Connect Text Mapping](../text-mapping.md) for value translation. |
| **Clear Chars** | Removes special characters using AL DelChr(). |
| **Cut out from Position** | Extracts substring starting from a position. |
| **Max Length** | Truncates output value to a maximum length. |
| **Output Format** | Defines outgoing data type (string, integer, decimal, boolean, date, datetime, Unix timestamp, custom). |
| **Prefix** | Adds an XML prefix if not defined on the object. |
| **Special Namespace** | Overrides the XML namespace for this field. |
| **Encode to Base64** | Encodes Blob field content to Base64 before sending. |

### Child & Related Object Handling

| Field | Description |
|-------|-------------|
| **Child Field Type** | Defines how data is collected from related objects (single object, list, lookup, sum, count, etc.). |
| **Child Object** | Specifies the related Web Object to retrieve data from. |
| **Child Relation** | Relation code for the related object. |
| **Exclude if Blank** | Excludes the field entirely if the resolved value is blank. |

### External Identification & Integration Variables

| Field | Description |
|-------|-------------|
| **Add External ID** | Stores the value as the external identifier for update operations. |
| **Integration Variable** | Uses a value stored in an integration variable. |
| **Update Integration Value** | Updates the stored integration variable with the current value after sending. |

## In This Section

- [Web Connect Outgoing Data](outgoing-data-web.md)
- [Web Connect Outgoing Sync Triggers](outgoing-sync-triggers.md)
- [Web Connect Item Price](item-price.md)
