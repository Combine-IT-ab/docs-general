# How do I prevent Web Connect from updating an existing customer using Unique Identifier?

> ⚠️ Changes to Web Connect in a production environment are sensitive and may cause integrations to stop working if configured incorrectly. We strongly recommend testing all changes in a test/sandbox environment first. If you are unsure, contact us before making changes.

## Short Answer

Set **Unique Identifier Action** to **No Action** for the customer object in Web Connect Incoming Data.

This ensures that Web Connect does not update existing customer records when the identifier already exists in Business Central.

## When Is This Useful?

This setup is commonly used when handling both B2C and B2B customers.

**B2C (Web customers):** Customers are mapped per market (e.g. WEB-SE, WEB-NO). Web Connect should reuse the same customer and update invoice/delivery address from the incoming order.

**B2B (Business customers):** Customers are fully maintained in Business Central. Incoming orders should not overwrite addresses, payment terms, or other master data. In this case, **No Action** should be used.

## How to Configure It

1. Go to **Web Connect Incoming Data**
2. Filter on the Web Object you want to change (e.g. Customer)
3. In the Object Tree, select the row where the identifier is defined and click **Edit Incoming Field Mapping**
4. On the mapping line where **Unique Identifier** is enabled, set **Unique Identifier Action = No Action**

## What Does "No Action" Mean?

When Unique Identifier Action = No Action:

- Web Connect checks if the record exists
- If found → the record is left untouched (no update, no overwrite, no validation error)
- If not found → normal creation rules apply

## Important Notes

- This setting only applies when the record already exists
- It is typically used for B2B customers
- B2C customers usually use Update/Create instead

## Related

- [Web Connect Incoming Data](../../products/web-connect/general/incoming-data/README.md)
- [Web Connect Incoming Data Mapping](../../products/web-connect/general/incoming-data/mapping.md)
