# How do I test what a mapping produces?

> ⚠️ Changes to Web Connect in a production environment are sensitive and may cause integrations to stop working if configured incorrectly. We strongly recommend testing all changes in a test/sandbox environment first. If you are unsure, contact us before making changes.

## When to use this

You have changed an outgoing mapping, for example the format of a date, and want to see the result without waiting for the next job run or sending anything to the external system.

## Steps

1. Open the Web Object and go to its outgoing mapping.
2. Choose **Test Message**. Web Connect builds the message from a BC record and shows it, so you can see how each field is generated.
3. If Test Message cannot build the message because the object has no request codeunit, run **Create Default Outgoing Code Units** from the actions first. The default codeunit is chosen from the object's source, so the object needs a **Source**, see [Source on a Web Object](../../products/web-connect/general/objects.md#source-on-a-web-object).
4. Adjust the mapping and run Test Message again until the output is right.

Test Message does not send anything. The next job run uses the updated mapping.

## Related

- [Web Connect Outgoing Mapping](../../products/web-connect/general/outgoing-mapping/README.md)
- [How to stop sending a value in Web Connect (Outgoing)](stop-sending-value-outgoing.md)
