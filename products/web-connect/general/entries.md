# Web Connect Entries

> **BC view name:** Web Connect Poster

## Overview

Web Connect Entries is the technical log of all processed requests — both incoming and outgoing. Each entry represents one HTTP call or one processed payload.

Entries are created automatically by the system. They are not edited manually.

## Purpose

Entries provide a full audit trail of:

- What was sent or received
- When it happened
- Whether it succeeded or failed
- The raw request and response payloads

## When to Use Entries vs Other Views

| Scenario | Use |
|----------|-----|
| Check if a specific record was sent | Web Connect Outgoing Data |
| See what payload was received from an external system | Web Connect Incoming Data |
| Debug a failed HTTP call — see full request/response | **Web Connect Entries** |
| Audit all activity for a time period | **Web Connect Entries** |
| Check retry history for a failed call | **Web Connect Entries** |
| Review current mapping or object configuration | Objects / Integrations |

## Best Practices

- Use retention policies to avoid unbounded growth. See [Web Connect General Setup](general-setup.md).
- Filter by **Status = Error** to quickly find problems.
- Use **Entry No.** to correlate an entry with its associated Incoming or Outgoing Data record.

## Related

- [Web Connect General Setup](general-setup.md) — configure retention policies
- [Web Connect Incoming Data](incoming-data/README.md)
- [Web Connect Outgoing Data](outgoing-mapping/outgoing-data-web.md)
