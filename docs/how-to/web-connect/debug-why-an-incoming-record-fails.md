# How do I find out which part of an incoming message is failing?

> ⚠️ Changes to Web Connect in a production environment are sensitive and may cause integrations to stop working if configured incorrectly. We strongly recommend testing all changes in a test/sandbox environment first. If you are unsure, contact us before making changes.

## When to use this

An incoming data record fails and the error does not tell you which part of the message causes it, or a Unique Identifier does not seem to find records that already exist.

## Steps

1. **Reset the record.** Set the record in the incoming data back to not validated.
2. **Process only that record.** Choose **Process** on it. Validation runs again, including the check whether the record already exists.
3. **Check Record ID.** If **Record ID** is filled in, the Unique Identifier found an existing record. If it stays empty, nothing matched, and Web Connect will try to create a new record.
4. **Narrow it down.** If the whole message fails, process each underlying object in the object tree on its own and see which one fails. This works as long as the objects do not depend on each other. A sales line cannot be created before its sales header, but objects such as dimensions can be processed in any order.
5. **Compare values.** On the field lines, compare **Source Value** (as received) with **Value Text** (after mapping). If Source Value is already wrong, the problem is in the sending system. Otherwise it is in the mapping.

After you change a mapping, set the record back to not validated again before you process it, otherwise the old values are used. To see exactly what was received, open the [Web Connect Entry](../../products/web-connect/general/entries.md) that the record came from.

## Common causes when Record ID stays empty

- The Unique Identifier fields have different **Validation Order**. Fields with the same Validation Order form one key, so all fields in one key must share it.
- A key value contains characters that Business Central reads as a filter, see ["Already exists" when a code contains filter characters](already-exists-code-contains-filter-characters.md).
- A part of the message that should not become a record is not skipped. Tick **Ignore Object In Download** on objects you never need, or set a **Process Condition Code** on the [object](../../products/web-connect/general/objects.md) so that only records that meet the [condition](../../products/web-connect/general/condition-list.md) are processed.

## Related

- [Web Connect Incoming Data](../../products/web-connect/general/incoming-data/README.md)
- [Web Connect Incoming Data Mapping](../../products/web-connect/general/incoming-data/mapping.md)
- [Incoming record is stuck: Locked by Session](record-stuck-locked-by-session.md)
