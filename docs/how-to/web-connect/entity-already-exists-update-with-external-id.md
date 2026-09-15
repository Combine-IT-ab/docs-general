# "Entity already exists" when sending to an external API

> ⚠️ Changes to Web Connect in a production environment are sensitive and may cause integrations to stop working if configured incorrectly. We strongly recommend testing all changes in a test/sandbox environment first. If you are unsure, contact us before making changes.

## Symptom

Outgoing calls fail with an error such as `Entity Already Exist`, `customer already exists` or a primary key violation, for records that the external system already has.

## Cause

Web Connect sends a `POST` (create) for a record that was created earlier. Most APIs require an update call (`PUT` or `PATCH`) addressed to the existing entity, typically by its ID in the URL.

## Fix

1. **Store the external ID.** On the outgoing object, enable **Process created content** and map the ID from the external system's response (for example `Product ID` or `id`) to the BC record's **External ID**. For incoming objects, use **Set External ID** and **External ID Identifier** so the ID is saved on the incoming data record.
2. **Use an update method for existing records.** Change the HTTP method on the object to `PUT` or `PATCH`, as the API requires.
3. **Put the ID in the URL.** Add the external ID or the key the API expects to the endpoint, for example `/customers/{externalId}` or `/products/1023`.
4. **Send create-only fields only on create.** Use the **Applies to service type** column on the mapping so that fields the API rejects on update (such as the product number) are sent only for `Create`.

The same pattern applies whether the external system is an ERP, a WMS or a portal.

## Related

- [Web Connect Outgoing Mapping](../../products/web-connect/general/outgoing-mapping/README.md)
- [Web Connect Objects](../../products/web-connect/general/objects.md)
