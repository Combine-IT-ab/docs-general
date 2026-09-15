# A Ready Integrations field is not visible or not editable

> ⚠️ Changes to Web Connect in a production environment are sensitive and may cause integrations to stop working if configured incorrectly. We strongly recommend testing all changes in a test/sandbox environment first. If you are unsure, contact us before making changes.

## Symptom

A field that belongs to a Ready Integrations setup (for example a status field for Norce or Centra) is missing from the page in one environment, or it is shown but cannot be edited, while it works in another environment.

## Cause

Fields added by Ready Integrations are behind feature flags. A new environment, or one created from an older copy, may not have the feature enabled.

## Fix

1. Open **Ready Integrations → Features**.
2. Enable the feature for the field or integration in question.
3. Reopen the page. The field is now visible and editable.

Check this before investigating permissions or page customisations. It is the most common reason a Ready Integrations field is missing in a sandbox.

## Related

- [Integrations or automation not running](integration-not-running.md)
