# Outgoing Triggers Do Not Fire: No Entry in Outgoing Data

## Symptom

A document in Microsoft Business Central (for example a Sales Order, Sales Invoice, Return Order or Transfer Order) does **not** create any entry in **Web Connect Outgoing Data Web**, and no status update is sent to the external system.

There is also **no record of a status change** in the Web Connect logs.

## Cause

In these cases the cause is almost always that **the user who performed the action (posting, releasing or modifying the document) does not have the permission set WCM WEB CONNECT.**

Without this permission:

- Outgoing sync triggers do **not fire**
- No outgoing data entry is created
- No update is sent to the external system
- There is **no log**, because the trigger never ran

This affects **all document types** handled in Business Central.

## Why This Happens

Outgoing sync triggers in Web Connect run **in the context of the user** performing the action. If that user lacks the permission set, Business Central never calls the trigger logic, Web Connect never receives the event and nothing enters the outgoing queue.

This applies to posting, releasing, modifying, renaming, deleting and any other event meant to trigger outgoing integration data.

## How to Fix It

Documents that were already handled by a user without the permission are not sent automatically afterwards. Change them manually so that the trigger fires again, or contact us and we can run a trigger script for them.

## How to Prevent It

- Make sure every user who handles documents (sales, purchasing, warehouse, accounting) has the **WCM WEB CONNECT** permission set
- Include it in your standard permission template for new users
- If you use security groups, add it to the relevant group
- Monitor for missing outgoing entries

## Related

- [Web Connect Outgoing Sync Triggers](../../products/web-connect/general/outgoing-mapping/outgoing-sync-triggers.md)
- [Web Connect Outgoing Data](../../products/web-connect/general/outgoing-mapping/outgoing-data-web.md)
- [Integrations or automation not running](integration-not-running.md)
