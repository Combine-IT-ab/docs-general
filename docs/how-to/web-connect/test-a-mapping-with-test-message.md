# How do I test what an outgoing mapping produces?

> ⚠️ Changes to Web Connect in a production environment are sensitive and may cause integrations to stop working if configured incorrectly. We strongly recommend testing all changes in a test/sandbox environment first. If you are unsure, contact us before making changes.

## When to use this

You have changed an outgoing mapping, for example the format of a date, and want to see the result without waiting for the next job run or sending anything to the external system.

## Steps

1. Open the [object](../../products/web-connect/general/objects.md) and go to its [outgoing mapping](../../products/web-connect/general/outgoing-mapping/README.md).
2. Choose **Test Message**. Web Connect builds the message from a record in Business Central and shows it, so you can see how each field is generated.
3. If Test Message cannot build the message because the object has no codeunits set, set the standard codeunits on the object first. Web Connect picks them from the object's **Source**, so give the object the same source as the integration it belongs to.
4. Adjust the mapping and run Test Message again until the result is right.

Test Message does not send anything. The next job run uses the updated mapping.

## Example: a date without milliseconds

Web Connect sends date and time values in UTC, with milliseconds and a `Z` at the end. If the external system does not accept that, set **Output Format** to `String` and **Max Length** to `19` on the mapping line, and check the result with Test Message. See [Date and time values](../../products/web-connect/general/outgoing-mapping/README.md#date-and-time-values).

## Related

- [Web Connect Outgoing Mapping](../../products/web-connect/general/outgoing-mapping/README.md)
- [How to stop sending a value in Web Connect (Outgoing)](stop-sending-value-outgoing.md)
