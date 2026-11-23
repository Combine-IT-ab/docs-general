# "Already exists" when a code contains filter characters

> ⚠️ Changes to Web Connect in a production environment are sensitive and may cause integrations to stop working if configured incorrectly. We strongly recommend testing all changes in a test/sandbox environment first. If you are unsure, contact us before making changes.

## Symptom

An incoming record fails with an error such as `The record already exists`, even though **Unique Identifier** is set up with **Unique Identity Action** `Update` or `No Action`. When you process the record again, Web Connect does not find the record that is clearly there.

## Cause

Before creating a record, Web Connect filters the table on the Unique Identifier fields. By default the incoming value is read as a Business Central filter. If the value contains characters that Business Central reads as filter syntax, such as `&`, `|`, `*`, `=`, `<` or `>`, the filter means something else than the literal value. The lookup finds nothing, Web Connect tries to create the record, and Business Central rejects it because it already exists.

It is typical for code fields filled from another system, such as dimension values like `A&C`, where the sender does not know that some characters are special in Business Central.

## Fix

1. Open the [incoming mapping](../../products/web-connect/general/incoming-data/mapping.md) for the object that fails and find the lines marked as **Unique Identifier**.
2. Tick **As Is Filter** on the line or lines whose values can contain special characters. The value is then used exactly as it is.
3. Set the failing incoming data record back to not validated and process it again.

## Prevent it

Avoid special characters in Business Central code fields when you can agree on the codes with the other system. When the codes come from a system you do not control, tick **As Is Filter** on the key fields from the start.

If the record is still not found, check that all Unique Identifier fields in the key have the same **Validation Order**, see [How do I prevent Web Connect from updating an existing customer using Unique Identifier?](prevent-customer-update-unique-identifier.md)

## Related

- [Web Connect Incoming Data Mapping](../../products/web-connect/general/incoming-data/mapping.md)
- [How do I find out which part of an incoming message is failing?](debug-why-an-incoming-record-fails.md)
