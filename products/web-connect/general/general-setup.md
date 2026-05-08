# Web Connect General Setup

> **BC view name:** Web Connect Allmänna inställningar

## Overview

Web Connect General Setup contains the global configuration for how Web Connect behaves in Microsoft Business Central. Settings here affect all integrations within the installation.

## Copy & Automation Actions

| Action | Description |
|--------|-------------|
| **Copy Setup to Company** | Copies the current Web Connect General Setup to another BC company. |
| **Copy Automation Setup** | Copies automation-related settings to another company. |

## General Settings

| Field | Description |
|-------|-------------|
| **Base URL** | The base URL used for outgoing HTTP requests. |
| **Default Timeout (ms)** | Default timeout in milliseconds for HTTP calls. |
| **Log Level** | Controls how much is logged. Higher levels log more detail. |
| **Enable Test Mode** | When enabled, Web Connect runs in test mode — no data is sent to external systems. |
| **Job Queue Category Code** | The BC Job Queue category used for all Web Connect background jobs. |

## Retention Policies

Web Connect uses BC's standard retention policy framework to control how long log data is kept. Configure retention under **Administration → Retention Policies** in Business Central.

Recommended retention objects: Web Connect Entries, Web Connect Incoming Data, Web Connect Outgoing Data.

## Automatic Processes

### Downloads (Incoming)

| Field | Description |
|-------|-------------|
| **Integration Code** | Which integration the download job runs for. |
| **Object Code** | Which Web Connect Object to process. |
| **Interval (minutes)** | How often the job runs. |
| **Enabled** | Whether the job is active. |

### Uploads (Outgoing)

| Field | Description |
|-------|-------------|
| **Integration Code** | Which integration the upload job runs for. |
| **Object Code** | Which Web Connect Object to process. |
| **Interval (minutes)** | How often the job runs. |
| **Enabled** | Whether the job is active. |

## Item SKU Settings

Controls how Item SKU values are constructed and sent to external systems.

| Field | Description |
|-------|-------------|
| **SKU Field** | Which BC field is used as the SKU (e.g. Item No., Vendor Item No.). |
| **Include Variant Code** | Whether to append the variant code to the SKU. |
| **Separator** | Character used to separate Item No. and Variant Code. |

## Ready Integration Features

Some Web Connect features are pre-built and can be activated without custom configuration: inventory sync, price sync, order download, and shipment upload. These features follow the standard Web Connect flow and can be combined with custom objects.

## Related

- [Web Connect Integrations](integrations.md)
- [Web Connect Destinations](destinations.md)
- [Web Connect Entries](entries.md)
