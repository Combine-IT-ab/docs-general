# Web Connect Authentication

## Overview

An authentication setup tells Web Connect how to log in to an external system. It holds the type of login, the user name or client ID, and references to the passwords and keys. The passwords and keys themselves are stored in [Secret Value Storage](secret-value-storage.md), never on the authentication line.

An [integration](integrations.md) points to its authentication setup with **Authentication Code**. Every call that the integration makes then carries the login. Integration sites can also point to an authentication setup of their own.

All authentication setups live in your own Business Central. You can see and change every line yourself.

## Types of authentication

| Type | How it works | Fields to fill in |
|------|--------------|-------------------|
| `Basic Auth` | A user name and a password are sent with every call. Common for warehouse systems and POS systems. | **User Name**, **Password/Key Value Code** |
| `Bearer Token` | A fixed token from the external system is sent with every call. Common for e-commerce platforms that give you an API token. | **Password/Key Value Code** |
| `API Key` | A fixed key is sent in a header of its own with every call. | **Authorizaton Header/Key Name**, **Password/Key Value Code** |
| `OAuth 2.0` | Web Connect first asks the external system for a temporary token and then uses that token in its calls. A new token is fetched before the old one runs out. | **Client ID** and **Client Secret Value Code**, or **User Name** and **Password/Key Value Code**, plus **Auth. Request Content Obj.**, **Temp. Authorization Value Code** and **Refresh Temp. Auth After (Min)** |

If the list shows another type on one of your lines, leave it as it is unless CombineIT has set it up for you.

## Fields

| Field | Description |
|-------|-------------|
| **Code** | The code of the authentication setup. The integration refers to it with **Authentication Code**. |
| **Description** | A readable name, for example `Basic auth WMS`. Never write a password or a key here: the description is shown in plain text. |
| **Type** | The type of login. See the table above. |
| **Authorizaton Header/Key Name** | The HTTP header that the login is sent in. It is `Authorization` in almost all setups. Some systems want the key in a header of their own, for example `apikey` or a platform specific token header. |
| **User Name** | The user name for `Basic Auth`, or for `OAuth 2.0` when the external system logs in with a user name and a password. |
| **Password/Key Value Code** | The code of the [secret value](secret-value-storage.md) that holds the password, the token or the API key. |
| **Client ID** | The client ID that the external system gave you for `OAuth 2.0`. |
| **Client Secret Value Code** | The code of the [secret value](secret-value-storage.md) that holds the client secret for `OAuth 2.0`. |
| **Auth. Request Content Obj.** | The [object](objects.md) that fetches the temporary token for `OAuth 2.0`. See below. |
| **Temp. Authorization Value Code** | The code of the [secret value](secret-value-storage.md) where the temporary token is saved when it has been fetched. Web Connect uses it in the calls until the next token is fetched. |
| **Temp. Authorization Expires** | When the current temporary token runs out. Web Connect fills it in. |
| **Refresh Temp. Auth After (Min)** | How many minutes a temporary token is used before Web Connect fetches a new one, for example `10`, `30` or `240`. Set it lower than the lifetime that the external system gives its tokens. |

## How a token is fetched with OAuth 2.0

Systems use OAuth 2.0 in many different ways. Some want the login as JSON, some as a form, some with a client ID and a secret and some with a user name and a password. That is why Web Connect does not have one fixed way to fetch the token. The token call is set up as an ordinary [object](objects.md) with mappings, so it can be adjusted to each system without new code.

1. The authentication line points to the token object with **Auth. Request Content Obj.**
2. The token object has its own integration with the address of the token endpoint, and runs on the authentication line itself.
3. The [outgoing mapping](outgoing-mapping/README.md) of the object builds the request. The values come from the fields on the authentication line, for example `client_id` from **Client ID** and `client_secret` from **Client Secret Value Code**. Fixed values such as `grant_type` with `client_credentials` or `password`, and `scope`, are set as fixed values on the mapping lines.
4. The [incoming mapping](incoming-data/mapping.md) of the object reads the response and writes the token, for example `access_token`, to **Temp. Authorization Value Code**.
5. When **Refresh Temp. Auth After (Min)** has passed, the token object runs again and the token is replaced.

The token object usually gets a negative download priority, so that it runs before the objects that need the token, and is sometimes placed in a job queue of its own.

Some integrations need the token as a value of its own, for example in a header that is built in the outgoing mapping. Then the incoming mapping also saves the token in an [integration variable](integration-variables.md) with **Update Integration Value**, and the mappings that need the token read it with **Integration Value**.

**Good to know:** the request and the response of the token call are saved like any other message. The client ID, the secret and the token can therefore be read in plain text in the entries of the token object. Give access to Web Connect entries only to the people who need it.

## Troubleshooting

| Symptom | What to check |
|---------|---------------|
| All calls to one system fail with `401 Unauthorized` | That the password, token or key in [Secret Value Storage](secret-value-storage.md) is still valid. Tokens and keys are often replaced in the external system without notice. |
| Calls fail with `401` after some time, with OAuth 2.0 | That the job queue that runs the token object is running. If it has stopped, the old token runs out and is not replaced. Also check that **Refresh Temp. Auth After (Min)** is lower than the lifetime of the token. |
| The token object itself fails | Open its latest entry and read the response from the external system. It usually says if the client ID, the secret or the scope is wrong. |

## Advanced settings

These fields are used in a few setups for special cases. Leave them as they are unless CombineIT has set them up for you.

| Field | Description |
|-------|-------------|
| **Authentication URL** | Advanced setting for the address of the token call. |
| **Update Requested** | Advanced setting for when a new temporary token is fetched. |
| **Last Update Request** | Advanced setting that shows the last time a new temporary token was requested. |

The fields **OAuth Scope** and **Authentication Code** on the authentication line are not used in the standard setups and can be left empty. The scope is set as a fixed value in the mapping of the token object instead.

## Configure it yourself in Business Central

| What you can change | Where | Example |
|---|---|---|
| Replace a password, token or key | The [secret value](secret-value-storage.md) that **Password/Key Value Code** or **Client Secret Value Code** points to | The external system has given you a new API token |
| Change the user that logs in | **User Name** or **Client ID** | A new API user is created in the warehouse system |
| Fetch the OAuth token more often | **Refresh Temp. Auth After (Min)** | The external system has shortened the lifetime of its tokens |
| Use another login for an integration | **Authentication Code** on the [integration](integrations.md) | Switch from the test login to the production login after go-live |

## Related

- [Web Connect Integrations](integrations.md)
- [Web Connect Secret Value Storage](secret-value-storage.md)
- [Web Connect Integration Variables](integration-variables.md)
- [Web Connect Objects](objects.md)
