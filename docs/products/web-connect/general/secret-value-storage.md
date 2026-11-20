# Web Connect Secret Value Storage

> **BC view name:** Web Connect Hemliga värden

## Overview

Secret Value Storage holds the passwords, tokens, API keys and client secrets that Web Connect uses to log in to external systems. Each secret has a code. The [authentication setups](authentication.md) refer to the code, so the secret itself is never written on an authentication line, an integration or a mapping.

The secret is kept in the isolated storage of Business Central, which only the Web Connect app can read. The Secret Value Storage line only holds the code, a description and a reference to the stored value.

## Fields

| Field | Description |
|-------|-------------|
| **Code** | The code of the secret, for example `WMS-PASSWORD` or `PLATFORM-TOKEN`. Authentication setups refer to it. |
| **Description** | A readable note about what the secret is for. Never write the secret itself here: the description is shown in plain text and is copied when the setup is exported. |
| **Isolated Storage Id** | The reference to the place in the isolated storage where the value is kept. Web Connect fills it in when the value is saved. Do not change it. |

## Where secrets are used

| Field on the [authentication setup](authentication.md) | What the secret holds |
|---|---|
| **Password/Key Value Code** | The password for `Basic Auth`, the token for `Bearer Token` or the key for `API Key` |
| **Client Secret Value Code** | The client secret for `OAuth 2.0` |
| **Temp. Authorization Value Code** | The temporary token that Web Connect fetches with `OAuth 2.0`. Web Connect replaces it by itself. |

## Good to know

- One code per secret and per system makes it easy to see what to replace when a password or key changes. Name the code after the system and what it holds, for example `WMS-PASSWORD`.
- If you delete a secret that an authentication setup refers to, the integration can no longer log in.
- Test and production systems usually have different keys. Keep them as separate secrets, and point the authentication setup to the right one.
- Values in an [integration variable](integration-variables.md) are shown in plain text. Keep passwords and keys here, never in a variable.

## Configure it yourself in Business Central

| What you can change | Where | Example |
|---|---|---|
| Replace a password, token or key | The value of the secret with the code that the authentication setup refers to | The external system has given you a new API key |
| Add a secret for a new login | A new line with a new **Code** | A test login is created in the warehouse system |

## Related

- [Web Connect Authentication](authentication.md)
- [Web Connect Integrations](integrations.md)
- [Web Connect Integration Variables](integration-variables.md)
