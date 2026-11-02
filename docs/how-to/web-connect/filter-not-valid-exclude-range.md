# "The filter is not valid for the field" when excluding a range

## Symptom

An outgoing object stops sending and the entries in [Web Connect Entries](../../products/web-connect/general/entries.md) fail with an error like:

> The filter 4000..4999&<>4620&<>402001..403601 is not valid for the field G/L Account No.

The filter is usually set as a **Filter String** on a table relation line, or in the **Outgoing Sync Table View** of a web object.

## Cause

In Business Central, `<>` (not equal to) only works with a single value. It cannot be combined with a range.

| Filter | Valid? |
|---|---|
| `4000..4999&<>4620` | Yes |
| `4000..4999&<>402001..403601` | No |

One invalid part makes the whole filter invalid, so nothing is sent.

## How to Fix It

Write the filter as the values that **should be included**, instead of the values that should be excluded. Separate the ranges with `|` (or).

Example: include accounts in the 4000 series, but exclude 402001..403601:

```
4000..402000|403602..4999
```

A simpler and more robust alternative is to list only the accounts or ranges you actually want, for example `401001..401601|404001|421602..429601`.

### Number fields that are text

Account numbers and other **Code** fields are compared as text, not as numbers. `4000..4999` therefore also includes six digit accounts such as `402001` and `421701`, because they start with "40" and "42". Keep this in mind when you set the range limits.

### Test before you save

1. Open the list in Business Central that matches the table, for example **General Ledger Entries**.
2. Paste the new filter in the column filter for the field.
3. Check that exactly the expected records are shown.

Only then save the filter in Web Connect.

## Before You Save the Corrected Filter

While the filter was invalid, every triggered record failed and is waiting in Web Connect Entries. **When the filter becomes valid, all of them are sent at once.** This can include records that should never have been sent.

1. Open Web Connect Entries for the object and filter on entries with an error.
2. Check what is waiting. Remove or close entries that should not be sent.
3. Make sure the object only picks up the right records (see [Outgoing Sync Triggers](../../products/web-connect/general/outgoing-mapping/outgoing-sync-triggers.md) and the Outgoing Sync Table View on the [web object](../../products/web-connect/general/objects.md)).
4. Save the corrected filter.

If you are unsure, contact us before saving the filter in a production environment.

## Related

- [Web Connect Entries](../../products/web-connect/general/entries.md)
- [Outgoing Sync Triggers](../../products/web-connect/general/outgoing-mapping/outgoing-sync-triggers.md)
- [How do I resend an outgoing message?](resend-outgoing-message.md)
