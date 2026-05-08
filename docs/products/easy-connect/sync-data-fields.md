# Easy Connect Sync Data Fields

> **BC view name:** Sync Data Fields

## Overview

Sync Data Fields define how each field is synchronized between the Subsidiary company and the Central company in Easy Connect. This configuration determines which fields participate in synchronization, which direction data flows, whether a field should be replaced with a fixed value, whether certain fields are mandatory, and the order in which values are validated.

Access the mapping from: **Easy Connect Setup → Actions → Field Mappings**

Each row represents a field in a Business Central table that Easy Connect can synchronize. Only fields with **OnField Validate** enabled are processed during synchronization.

## Field Descriptions

### Company & Field Identification

| Field | Description |
|-------|-------------|
| **Subsidiary Company Name** | The subsidiary company configured in Easy Connect Setup. Visible only when the setup links multiple subsidiaries. |
| **Table Name** | The BC table where the field exists (e.g. Sales Header, Sales Line). |
| **Field No.** | Internal field number in the table. |
| **Field Caption** | The readable name of the field (e.g. Sell-to Customer No.). |

### Synchronization & Validation Logic

| Field | Description |
|-------|-------------|
| **OnField Validate** | Must be enabled for the field to be included in synchronization. If OFF, Easy Connect ignores this field entirely. |
| **Subsidiary Field Mandatory (SO)** | Indicates the field is required on Sales Orders in the subsidiary company. |
| **Subsidiary Field Mandatory (RO)** | Indicates the field is required on Return Orders in the subsidiary company. |
| **Condition Code** | Optional condition that controls when the field should be applied. Uses the same condition logic as Web Connect. |
| **Validation Order** | Determines processing order when multiple fields in the same table must be validated in sequence. 0 = standard order. |

### Value Substitution & Overrides

| Field | Description |
|-------|-------------|
| **Substitute Value Type** | Specifies how the replacement value should be determined: Fixed Text or Field Value. |
| **Substitute Value** | The actual value to use instead of the source field value. Common for pricing, customer no., posting groups. |

**Example:** If a Sales Order in the Subsidiary must always use customer number `IC-AS` in the Central company:
- Substitute Value Type = Fixed Text
- Substitute Value = IC-AS

The customer number from the Subsidiary is ignored — the order in Central always uses `IC-AS`.

### Direction Control (One-way vs Two-way Sync)

| Field | Description |
|-------|-------------|
| **Active – Subsidiary → Central** | Enables synchronization from Subsidiary to Central. Typically ON for most fields. |
| **Active – Central → Subsidiary** | Enables synchronization from Central to Subsidiary. Normally OFF except for special cases like tracking numbers. |

**Typical usage:**

Subsidiary → Central: Sell-to Customer No., Item No., quantities, dimensions, line descriptions.

Central → Subsidiary: Tracking numbers, shipment references.

## Related

- [Easy Connect Setup](setup.md)
- [Easy Connect Sync Log Entries](sync-log-entries.md)
