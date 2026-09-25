# "Already exists" when a code contains filter characters

> ⚠️ Changes to Web Connect in a production environment are sensitive and may cause integrations to stop working if configured incorrectly. We strongly recommend testing all changes in a test/sandbox environment first. If you are unsure, contact us before making changes.

## Symptom

An incoming record fails with an error such as `The record already exists` or `table value already exists`, even though a **Unique Identifier** is set up with the action **Update** or **No Action**. When you process the record again, **Record ID** stays empty: Web Connect does not find the record that is clearly there.

## Cause

Before creating a record, Web Connect filters the table on the Unique Identifier fields. By default the incoming value is used as a BC filter expression. If the value contains characters that BC reads as filter syntax, such as `&`, `|`, `*`, `<`, `>` or `[`, the filter means something else than the literal value. The lookup finds nothing, Web Connect tries to create the record, and BC rejects it because it already exists.

It is typical for code fields filled from another system, such as dimension values, where the sender does not know that some characters are special in BC.

## Fix

1. Open the incoming mapping for the object that fails and find the mapping lines marked as **Unique Identifier**.
2. Tick **As Is Filter** on the line or lines whose values can contain special characters. The value is then used literally.
3. Set the failing Incoming Data record back to **Not Validated** and process it again. Check that **Record ID** is now filled in.

## Prevent it

Avoid special characters in BC code fields when you can agree on the codes with the other system. When the codes come from another system you do not control, tick **As Is Filter** on the key fields from the start.

If Record ID is still empty after this, check that all Unique Identifier fields have the same **Validation Order**, see [How do I prevent Web Connect from updating an existing customer using Unique Identifier?](prevent-customer-update-unique-identifier.md)

## Related

- [Web Connect Incoming Data Mapping](../../products/web-connect/general/incoming-data/mapping.md)
- [How do I find out which part of an incoming message is failing?](debug-why-an-incoming-record-fails.md)
