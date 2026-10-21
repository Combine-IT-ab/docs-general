# How do I find out which part of an incoming message is failing?

> ⚠️ Changes to Web Connect in a production environment are sensitive and may cause integrations to stop working if configured incorrectly. We strongly recommend testing all changes in a test/sandbox environment first. If you are unsure, contact us before making changes.

## When to use this

An Incoming Data record fails and the error does not tell you which object in the payload causes it, or a Unique Identifier does not seem to find existing records.

## Steps

1. **Reset the record.** Set the object's record in Incoming Data to **Not Validated**.
2. **Process only that object.** Choose **Process** on the record. Validation runs again, including the check whether the record already exists.
3. **Check Record ID.** If **Record ID** is filled in, the Unique Identifier found an existing record. If it stays empty, the identifier did not match, and Web Connect will try to create a new record.
4. **Narrow it down.** If the whole message fails, process each underlying object in the object tree on its own and see which one fails. This works as long as the objects do not depend on each other. A sales line cannot be created before its sales header, but objects such as dimensions can be processed in any order.
5. **Compare values.** On the field lines, compare **Source Value** (as received) with **Value Text** (after mapping) to see whether the value is wrong in the payload or in the mapping.

After you change a mapping, reset to **Not Validated** again before processing, otherwise the old values are used.

## Common causes when Record ID stays empty

- The Unique Identifier fields have different **Validation Order**. All fields in one key must share the same order.
- A key value contains characters that BC reads as a filter, see ["Already exists" when a code contains filter characters](already-exists-code-contains-filter-characters.md).
- An element that should not become a record is not skipped. Use **Process Condition Code** on the object, see [Condition Codes on the Web Object](../../products/web-connect/general/objects.md#condition-codes-on-the-web-object).

## Related

- [Web Connect Incoming Data](../../products/web-connect/general/incoming-data/README.md)
- [Web Connect Incoming Data Mapping](../../products/web-connect/general/incoming-data/mapping.md)
- [Incoming record is stuck: Locked by Session](record-stuck-locked-by-session.md)
