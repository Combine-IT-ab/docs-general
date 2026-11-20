# Web Connect Integration Sites

## Overview

An integration site holds a second set of connection details for an [integration](integrations.md), for example one for the production environment of the external system and one for its test environment. Each site has its own addresses, source value and authentication, while the objects and the mapping stay the same.

Sites are only used by a few integrations. Most integrations keep their connection details on the integration itself.

## Fields

| Field | Description |
|-------|-------------|
| **Integration Source** | The integration that the site belongs to. |
| **Site Code** | The code of the site, for example `PROD` or `TEST`. |
| **Type** | Whether the site is a `Production` or a `QA` environment. |
| **Enabled** | The site is in use. |
| **Description** | A name for the site, for example the system and the environment. |
| **Web URL Download** | The address that downloads are sent to for this site. |
| **Web URL Upload** | The address that uploads are sent to for this site. |
| **Fixed Source Value** | The source that incoming data from this site gets. See **Fixed Source Value** on the [integration](integrations.md). |
| **Authentication Code** | The authentication setup that this site uses. Keys and passwords are stored in [Secret Value Storage](secret-value-storage.md). |

The same fields exist on the integration. A site lets the same integration reach more than one environment without copying the objects.

## Configure it yourself in Business Central

| What you can change | Where | Example |
|---|---|---|
| The address of an environment | **Web URL Download** and **Web URL Upload** | The external system moves its test environment to a new address |
| Which credentials an environment uses | **Authentication Code** | Use new credentials after the external system has renewed them |

Adding a new site to an integration is done together with CombineIT.

## Related

- [Web Connect Integrations](integrations.md)
- [Web Connect Logistics Setup](logistics-setup.md)
- [Web Connect Secret Value Storage](secret-value-storage.md)
