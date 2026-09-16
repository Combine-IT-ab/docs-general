# "Entity already exists" when sending to an external API

> ⚠️ Changes to Web Connect in a production environment are sensitive and may cause integrations to stop working if configured incorrectly. We strongly recommend testing all changes in a test/sandbox environment first. If you are unsure, contact us before making changes.

## Symptom

Outgoing calls fail with an error such as `Entity Already Exist`, `customer already exists` or a primary key violation, for records that the external system already has.

## Cause

Web Connect sends a `POST` (create) for a record that was created earlier. Most APIs require an update call (`PUT` or `PATCH`) addressed to the existing entity, typically by its ID in the URL.

## Fix

1. **Store the external ID.** On the outgoing object, enable **Process created content** and map the ID from the external system's response (for example `Product ID` or `id`) to the BC record's **External ID**. For incoming objects, use **Set External ID** and **External ID Identifier** so the ID is saved on the incoming data record.
2. **Use an update method for existing records.** Change the HTTP method on the object to `PUT` or `PATCH`, as the API requires.
3. **Put the ID in the URL.** Add the external ID or the key the API expects to the endpoint, for example `/customers/{externalId}` or `/products/1023`. See below for how to add the ID only on update.
4. **Send create-only fields only on create.** Use the **Applies to service type** column on the mapping so that fields the API rejects on update (such as the product number) are sent only for `Create`.

The same pattern applies whether the external system is an ERP, a WMS or a portal.

## Add the ID to the URL only on update

Many APIs reject a trailing slash on create: `POST /customers` is accepted, `POST /customers/` is not. At the same time the update call needs the ID: `PUT /customers/1023`. One object handles both cases with a **URL Parameters Object** and a text mapping.

1. **Add a placeholder to the path.** Set the object's **Path** to `/customers%1`. Web Connect replaces `%1` with the output of the URL Parameters Object.
2. **Create the URL Parameters Object.** Create an object on the outgoing data table and select it as **URL Parameters Object** on the main object. Add one outgoing mapping line for the **External ID** field with **Fixed Value** `/%1` and **Exclude if Blank** enabled. The line produces `/1023` when the record has an external ID.
3. **Remove the slash when the ID is blank.** Create a text mapping, for example `REMOVE-SLASH`, with the incoming values `/`, `/%1`, `//%1` and `///%1`, all translated to an empty value. Select it in the **Mapping** column on the mapping line from step 2.

On create the external ID is empty, the line produces `/` or `/%1`, the text mapping turns it into an empty string and the request goes to `/customers`. On update the line produces `/1023`, which no text mapping matches, and the request goes to `/customers/1023`.

## Related

- [Web Connect Outgoing Mapping](../../products/web-connect/general/outgoing-mapping/README.md)
- [Web Connect Objects](../../products/web-connect/general/objects.md)
- [Web Connect Text Mapping](../../products/web-connect/general/text-mapping.md)
