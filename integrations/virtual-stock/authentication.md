# Authentication — Virtual Stock

Virtual Stock supports multiple authentication methods depending on the integration type. All REST API integrations in Web Connect use OAuth 2.0.

---

## Supported Methods

| Method | Used for | Notes |
|---|---|---|
| OAuth 2.0 (Client Credentials) | REST API — all flows | Standard for Web Connect integrations |
| Basic Auth | REST API — legacy | Deprecated; not recommended for new integrations |
| SFTP key / password | CSV/SFTP file transfers | Separate from API auth |

---

## Variant A — OAuth 2.0 via Web Connect (Standard)

Web Connect handles OAuth 2.0 token acquisition and refresh automatically. Tokens are short-lived and refreshed transparently before expiry.

### How it works

1. Web Connect uses a configured **Client ID** and **Client Secret** to request an access token from the Virtual Stock OAuth endpoint
2. The token is stored temporarily and reused for subsequent API calls
3. When the token expires, Web Connect automatically requests a new one using the client credentials

### Web Connect configuration

Two objects are involved in authentication:

| Object | Role |
|---|---|
| `VS_OAUTH` | Handles token acquisition and refresh — referenced by all other VS objects |
| *(Auth config)* | Named config entry (e.g. `VS JOHN LEWIS`) — holds Client ID and points to the secret store |

The **Client Secret** is stored securely (e.g. in a Web Connect secret/credential store, not in plain text in the config).

### OAuth token endpoint

The token endpoint is provided by Virtual Stock and is retailer-specific. The format is typically:

```
POST https://auth.virtualstock.com/oauth/token
```

with the following body:
```
grant_type=client_credentials
client_id=<client_id>
client_secret=<client_secret>
```

> The exact endpoint URL varies per retailer. Confirm with the Virtual Stock account manager or onboarding documentation.

### Configuration checklist

- [ ] Client ID provided by Virtual Stock / retailer
- [ ] Client Secret stored securely in Web Connect (not hardcoded)
- [ ] OAuth config object (`VS_OAUTH` or equivalent) created and linked to all VS objects
- [ ] Token endpoint URL confirmed and configured
- [ ] Token tested (401/403 errors resolved)

---

## Variant B — Basic Auth (Legacy)

Some older integrations may use HTTP Basic Auth (Base64-encoded username:password in the Authorization header). This method is deprecated and not recommended for new setups.

---

## Variant C — SFTP (File-based flows)

For CSV/SFTP-based flows (e.g. batch stock updates or product data), authentication uses SFTP credentials (username + password or SSH key) provided by Virtual Stock.

SFTP credentials are separate from the API OAuth credentials and are managed independently.

---

## Troubleshooting Auth Errors

| Error | Likely cause | Resolution |
|---|---|---|
| 401 Unauthorized | Invalid or expired token | Check client credentials; re-test token request |
| 403 Forbidden | Correct token, but missing permissions | Confirm scopes/permissions with Virtual Stock |
| Token not refreshing | Misconfigured refresh logic | Check `VS_OAUTH` config; verify secret is accessible |
| SFTP connection refused | Wrong host/port or blocked IP | Confirm SFTP details with Virtual Stock; check firewall |

---

**Related:**
[Overview](overview.md) · [API Reference](https://api-docs.virtualstock.com)
