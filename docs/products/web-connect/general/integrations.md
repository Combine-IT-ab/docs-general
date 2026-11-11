# Web Connect Integrations

> **BC view name:** Web Connect Integrationer

## Overview

A Web Connect Integration is the connection to one external system, for example Centra, Shopify or a WMS such as Ongoing. It holds the addresses, HTTP methods, data format and authentication that every object in the integration uses.

All [Web Connect Objects](objects.md), incoming flows and outgoing flows belong to an integration. The integration card is configured in your own Business Central, and you can change every field yourself.

## Integration Card

### General

| Field | Description |
|-------|-------------|
| **Integration Source** | The code of the integration. Objects, mappings and entries refer to it. |
| **Description** | A readable name, for example `Centra GraphQL Integration` or `Ongoing WMS Integration`. |
| **Enabled** | Whether the integration is active. |
| **Source Type** | How Web Connect reaches the external system. `HTTP Server` is used for API integrations. File exchange through Azure Blob Storage uses the storage fields below. |
| **Data Type** | The format of the messages, for example `Json`, `GraphQL` or XML. |
| **Fixed Source Value** | A fixed source that is set on all incoming data from the integration, for example `Centra` or `Ongoing`. Mappings and conditions can be filtered on the source, so that different flows can be handled differently. Use it when the external system does not say in the message where the data comes from. |
| **Source Identifier JPath** | A path in the message that the source is read from, instead of using **Fixed Source Value**. |
| **Web Object Prefix** | The prefix that the codes of the integration's [objects](objects.md) start with, for example `CA_` for Centra (`CA_ALLOCATIONS`) or `ONGOING-` for Ongoing. |
| **Comment** | Free text for your own notes. |

### Addresses and HTTP methods

| Field | Description |
|-------|-------------|
| **Web URL Download** | The address that data is downloaded from, for example the GraphQL endpoint of the platform. |
| **Web URL Upload** | The address that data is sent to. It is often the same as the download address. |
| **HTTP Method Download** | The method used when downloading, usually `GET`. GraphQL APIs use `POST`. |
| **HTTP Method Create** | The method used when a new record is created in the external system, usually `POST`. |
| **HTTP Method Update** | The method used when an existing record is updated, usually `PUT`, or `POST` for GraphQL. |
| **HTTP Method Delete** | The method used when a record is deleted, usually `DELETE`, or `POST` for GraphQL. |
| **HTTP Content Type** | The `Content-Type` header on requests, for example `application/json`. |
| **Accept HTTP Content Type** | The `Accept` header on requests, for example `application/json`. |

Individual [objects](objects.md) can override the HTTP methods when one endpoint needs another method than the rest of the integration.

### Authentication

| Field | Description |
|-------|-------------|
| **Authentication Code** | The authentication setup that the integration uses. Keys and passwords are stored in [Secret Value Storage](secret-value-storage.md), not on the integration card. |
| **Client Certificate** | A client certificate for integrations that require certificate authentication. |
| **Client Certificate Password** | The password of the client certificate. |

### Azure Blob Storage

| Field | Description |
|-------|-------------|
| **ABS Storage Account** | The Azure storage account used for file exchange. |
| **ABS Container** | The container in the storage account. |
| **Delete Blob after Process** | Whether a file is deleted from the container after it has been processed. |

### Processing

**Envelope Object**, **Create Envelope Codeunit**, **Process Codeunit**, **Check New Codeunit**, **Authenticate Codeunit** and **Web Entry Upload Codeunit** are advanced settings for integrations that need special handling. In most integrations they are empty or `0`, and Web Connect uses its standard handling. Leave them as they are unless CombineIT has set them up for your integration.

### Monitoring

| Field | Description |
|-------|-------------|
| **Monitor E-Mail List** | E-mail addresses that are notified when the integration has errors. |

### Fields not used in standard setups

The card also has the fields **Shared External ID**, **Swagger / API Definition**, **Port Number**, **Data Array Jpath**, **Acknowledge Link Jpath**, **Web URL Authentication**, **Authentication Token Download** and **Authentication Token Upload**. They are not used in the standard integrations and can be left empty. Authentication is set up through **Authentication Code**.

## Configure it yourself in Business Central

| What you can change | Where | Example |
|---|---|---|
| Point the integration to a test or production system | **Web URL Download** and **Web URL Upload** | Switch from the sandbox to the live store after go-live |
| Handle flows differently per source | **Fixed Source Value** together with [Condition List](condition-list.md) | Map wholesale and retail orders differently |
| Who is told about errors | **Monitor E-Mail List** | Add the support mailbox |
| Pause the integration | **Enabled** | Stop all traffic during a planned change in the external system |

## Related

- [Web Connect General Setup](general-setup.md)
- [Web Connect Objects](objects.md)
- [Web Connect Secret Value Storage](secret-value-storage.md)
- [Web Connect Incoming Data](incoming-data/README.md)
- [Web Connect Outgoing Data](outgoing-mapping/outgoing-data-web.md)
