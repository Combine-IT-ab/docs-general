# Web Connect Secret Value Storage

> **BC view name:** Web Connect Hemliga värden

## Overview

Web Connect Secret Value Storage is used to securely store sensitive configuration values — such as API keys, passwords, and tokens — that are referenced by integrations without exposing the actual value in plain text.

## Purpose

Instead of storing sensitive values directly in integration configuration fields, you store them in Secret Value Storage and reference them by code. The value is encrypted at rest in Business Central.

This is especially useful for:

- API keys used in HTTP headers
- Shared secrets for webhook validation
- Passwords for SFTP or other connections

## Fields

| Field | Description |
|-------|-------------|
| **Code** | Unique identifier used to reference the secret in integration config. |
| **Description** | Human-readable note about what the secret is for. |
| **Encrypted Value** | The actual secret value, stored encrypted. Entered once and not visible after saving. |

## Important Behavior

- Once saved, the encrypted value **cannot be read back** from the UI — only replaced.
- Deleting a secret that is actively used by an integration will cause that integration to fail authentication.
- Secrets are company-scoped — each BC company has its own secret storage.

## Usage

Reference a stored secret by its **Code** in the relevant integration field (e.g. API Key Value, Bearer Token). Web Connect resolves the code to the encrypted value at runtime.

## Related

- [Web Connect Integrations](integrations.md)
