# How do I prevent Web Connect from updating an existing customer using Unique Identifier?

> ⚠️ Changes to Web Connect in a production environment are sensitive and may cause integrations to stop working if configured incorrectly. We strongly recommend testing all changes in a test/sandbox environment first. If you are unsure, contact us before making changes.

## Short Answer

Set **Unique Identity Action** to **No Action** for the customer object in Web Connect Incoming Data.

This ensures that Web Connect does not update existing customer records when the identifier already exists in Business Central.

## When Is This Useful?

This setup is commonly used when handling both B2C and B2B customers.

**B2C (Web customers):** Customers are mapped per market (e.g. WEB-SE, WEB-NO). Web Connect should reuse the same customer and update invoice/delivery address from the incoming order.

**B2B (Business customers):** Customers are fully maintained in Business Central. Incoming orders should not overwrite addresses, payment terms, or other master data. In this case, **No Action** should be used.

## How to Configure It

1. Go to **Web Connect Incoming Data**
2. Filter on the Web Object you want to change (e.g. Customer)
3. In the Object Tree, select the row where the identifier is defined and click **Edit Incoming Field Mapping**
4. On the mapping line where **Unique Identifier** is enabled, set **Unique Identity Action = No Action**

## What Does "No Action" Mean?

When Unique Identity Action = No Action:

- Web Connect checks if the record exists
- If found → the record is left untouched (no update, no overwrite, no validation error)
- If not found → normal creation rules apply

## Important Notes

- This setting only applies when the record already exists
- It is typically used for B2B customers
- B2C customers usually use Update/Create instead
- If the identifier consists of several fields, for example a code and a value, all of them must have the **same Validation Order**. Fields with the same Validation Order form one key, and with different orders Web Connect does not find the existing record
- If a key value can contain characters such as `&` or `*`, tick **As Is Filter**, see ["Already exists" when a code contains filter characters](already-exists-code-contains-filter-characters.md)
- To check whether the identifier matches, set the record back to not validated and process it. If **Record ID** is filled in, the existing record was found, see [How do I find out which part of an incoming message is failing?](debug-why-an-incoming-record-fails.md)

## Related

- [Web Connect Incoming Data](../../products/web-connect/general/incoming-data/README.md)
- [Web Connect Incoming Data Mapping](../../products/web-connect/general/incoming-data/mapping.md)
