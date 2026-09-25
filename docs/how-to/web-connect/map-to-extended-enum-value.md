# How do I map to an enum value added by an extension?

> ⚠️ Changes to Web Connect in a production environment are sensitive and may cause integrations to stop working if configured incorrectly. We strongly recommend testing all changes in a test/sandbox environment first. If you are unsure, contact us before making changes.

## Symptom

A mapping to an option or enum field fails, or writes the wrong value, for a value that is shown in the list in BC. The mapping uses a small number such as `2` because the value is the third one in the list.

## Cause

Web Connect writes the **ordinal value** of an option or enum field, the number BC stores. For standard values this is often `0, 1, 2` and so on. Values that an app extension adds to a standard enum get numbers from that app's own range, for example `12096900`. The position in the dropdown says nothing about the ordinal.

## Fix

1. Find the ordinal of the value you need. It is defined in the enum extension of the app that added the value. If you cannot look it up, ask us.
2. Use that number as the BC value in the text mapping, or as the fixed value on the mapping line.
3. Set the failing record back to **Not Validated** and process it again.

Do not count positions in the list, and do not assume that values from different apps follow each other.

## Related

- [Web Connect Text Mapping](../../products/web-connect/general/text-mapping.md)
- [Web Connect Incoming Data Mapping](../../products/web-connect/general/incoming-data/mapping.md)
