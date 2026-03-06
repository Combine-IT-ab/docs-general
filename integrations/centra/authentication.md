# Authentication — Centra

All Web Connect integrations with Centra use **Centra Integration API tokens**.

---

## How It Works

Centra issues unique API tokens that are used to authenticate GraphQL requests. Web Connect stores the token securely and includes it in the Authorization header for all Centra API calls.

1. API token is generated in Centra AMS (Account Management System)
2. Token is stored in Web Connect's credential store
3. Web Connect includes the token in every GraphQL request to Centra
4. Tokens have a **default expiry of 30 days** — no automatic renewal

---

## Web Connect Configuration

| Component | Role |
|---|---|
| `CA_OAUTH` (or similar) | Authentication object that holds the token reference |
| Web Connect secret store | Secure storage for the API token |

The **token itself is not stored in plain text** in the configuration — only a reference to the secure store.

---

## Token Management

### Where to Generate Tokens

Tokens are created in **Centra AMS** (Account Management System):

1. Log in to Centra AMS
2. Navigate to **System** → **API Tokens**
3. Create a new Integration API token
4. Copy the token value
5. Store it in Web Connect's credential store

### Token Expiry & Rotation

Centra tokens **expire silently** after 30 days by default:

- There is **no automatic notification** when a token is about to expire
- Web Connect will receive `401 Unauthorized` errors when using an expired token
- **Establish a manual process** with the customer for regular token rotation
- Set calendar reminders if necessary

### Best Practices

- **Separate tokens per environment:** Use one token for QA/staging, another for production
- **Document token owner:** Record who in the customer organization has access to Centra AMS
- **Plan rotation:** Decide on a rotation schedule (e.g. every 30 days) to avoid service interruptions
- **Test after rotation:** After updating the token in Web Connect, test with a simple query to verify it works

---

## Setup Checklist (New Customer)

- [ ] Customer generates API token in Centra AMS
- [ ] Token stored in Web Connect credential store
- [ ] Authentication object (`CA_OAUTH`) created and linked to all Centra integration objects
- [ ] Test query executed successfully (no 401 errors)
- [ ] Document token expiry date
- [ ] Plan token rotation schedule with customer

---

## Troubleshooting

| Error | Likely cause | Resolution |
|---|---|---|
| 401 Unauthorized | Expired or invalid token | Check token expiry date; generate a new token in Centra AMS |
| 401 Unauthorized | Wrong token stored | Verify token value in Web Connect credential store |
| GraphQL errors | Token valid, but API scope mismatch | Verify token has necessary API permissions in Centra AMS |

---

**Related:**
[Overview](overview.md) · [Centra API Documentation](https://docs.centraapis.com/)
