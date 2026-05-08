# Web Connect Integrations

> **BC view name:** Web Connect Integrationer

## Overview

Web Connect Integrations are the top-level configuration objects that define a connection to an external system. Each integration represents one endpoint — for example, a specific e-commerce platform, POS system, or marketplace.

All Web Connect Objects, incoming flows, and outgoing flows are configured under an integration.

## Integration Card

### General

| Field | Description |
|-------|-------------|
| **Code** | Unique identifier for the integration. |
| **Description** | Human-readable name for the integration. |
| **Enabled** | Whether the integration is active. |
| **Base URL** | The base URL for the external system's API. |
| **Timeout (ms)** | HTTP timeout in milliseconds for this integration. Overrides the general setup default. |

### HTTP Server Settings

| Field | Description |
|-------|-------------|
| **HTTP Method** | Default HTTP method used for outgoing requests (POST, PUT, PATCH, etc.). |
| **Content Type** | The Content-Type header sent with requests (e.g. `application/json`). |
| **Accept** | The Accept header for incoming responses. |
| **Additional Headers** | Any extra HTTP headers to include in all requests. |

### Authentication

| Field | Description |
|-------|-------------|
| **Auth Type** | Authentication method: None, Basic, Bearer Token, OAuth 2.0, or API Key. |
| **Username / Client ID** | Used for Basic or OAuth authentication. |
| **Password / Client Secret** | Used for Basic or OAuth authentication. Stored encrypted. |
| **Token URL** | OAuth 2.0 token endpoint. |
| **API Key Header** | Header name for API key authentication (e.g. `X-Api-Key`). |
| **API Key Value** | The API key value. Stored encrypted. See [Web Connect Secret Value Storage](secret-value-storage.md). |

### Content Processing

| Field | Description |
|-------|-------------|
| **Format** | Data format used: JSON, XML, EDIFACT, or custom. |
| **Encoding** | Character encoding (default: UTF-8). |
| **Compress Request** | Whether to GZIP-compress outgoing payloads. |
| **Root Element** | Root XML element name (XML integrations only). |
| **Namespace** | XML namespace (XML integrations only). |

## Related

- [Web Connect General Setup](general-setup.md)
- [Web Connect Objects](objects.md)
- [Web Connect Secret Value Storage](secret-value-storage.md)
- [Web Connect Incoming Data](incoming-data/README.md)
- [Web Connect Outgoing Data](outgoing-mapping/outgoing-data-web.md)
