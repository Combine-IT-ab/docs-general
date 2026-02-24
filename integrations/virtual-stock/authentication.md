# Authentication — Virtual Stock

All Web Connect integrations with Virtual Stock use **OAuth 2.0 with Client Credentials**.

---

## How It Works

Web Connect handles token acquisition and refresh automatically. Tokens are short-lived; Web Connect renews them before expiry without any manual action.

1. Web Connect uses a configured **Client ID** and **Client Secret** to request an access token from Virtual Stock's OAuth endpoint
2. The token is stored temporarily and reused for subsequent API calls within its validity window
3. When the token expires, Web Connect requests a new one automatically

---

## Web Connect Configuration

Two objects are involved:

| Object | Role |
|---|---|
| `VS_OAUTH` | Handles token acquisition and refresh — referenced by all other VS objects |
| Auth config entry | Named per retailer (e.g. `VS JOHN LEWIS`) — holds Client ID and points to the secret store |

The **Client Secret** is stored in Web Connect's credential store, not in plain text in the configuration.

---

## OAuth Token Endpoint

The token endpoint is assigned by Virtual Stock and is specific to each retailer. Typical format:

```
POST https://auth.virtualstock.com/oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials
client_id=<client_id>
client_secret=<client_secret>
```

> The exact endpoint URL is provided by Virtual Stock during onboarding. It varies per retailer.

---

## Setup Checklist (New Customer)

- [ ] Client ID received from Virtual Stock / retailer onboarding
- [ ] Client Secret stored securely in Web Connect credential store
- [ ] `VS_OAUTH` object created and linked to all VS integration objects
- [ ] Token endpoint URL configured
- [ ] Token tested successfully (no 401/403 errors)

---

## Troubleshooting

| Error | Likely cause | Resolution |
|---|---|---|
| 401 Unauthorized | Invalid or expired token | Check client credentials; re-test token request manually |
| 403 Forbidden | Token valid, but missing permissions | Confirm API scopes with Virtual Stock |
| Token not refreshing | `VS_OAUTH` misconfigured | Check that VS_OAUTH is linked correctly to all objects |

---

**Related:**
[Overview](overview.md) · [API Reference](https://api-docs.virtualstock.com)
