# How to create or edit an order status and its conditions

> ⚠️ Order statuses can be sent on to external systems and trigger customer emails. Always test changes in a test/sandbox environment first. If you are unsure, contact us before making changes.

Order statuses are set on the sales order by rules. Each rule has one or more conditions on the sales header (table 36) or the sales lines (table 37). When all conditions of a rule are met, the order gets the status.

## Pages

| Page | Purpose |
|------|---------|
| **WCM Order Statuses** | One line per status: code, document type, descriptions and style. |
| **Order Status Rules** | One rule per status: trigger and whether the rule is enabled. |
| **Order Status Conditions** | The conditions of each rule. All conditions of a rule must be met. |

## Create a new status

1. Open **WCM Order Statuses** and create a new line.
2. Fill in **Code** (max 30 characters, longer codes are truncated), **Document Type**, **Description Swedish**, **Description English** and **Style**.
3. Set **Status Change Sorting**. It decides which status wins when several rules are met at the same time. Follow the order flow and leave gaps between the values (10, 20, 30) so new statuses can be added in between.
4. Open **Order Status Rules**, create a rule for the code, choose the trigger and enable it.
5. Add the conditions in **Order Status Conditions** as described below.

To rename a status, change the description in **WCM Order Statuses**. Do not change the code if it is mapped to an external system.

## Create or edit a condition

1. Choose the table: **36** for the sales header, **37** for the sales lines.
2. Choose the **Condition Type** that matches the table:

   | Table | Condition Type | Result |
   |-------|----------------|--------|
   | 36 Sales Header | **Field Comparison** | Compares a field on the header. |
   | 37 Sales Line | **Any line matches** | Met if at least one line matches. |

3. Choose the **Trigger**:
   - **On Modify**: the condition is evaluated when the order is modified.
   - **On Schedule**: the condition is evaluated by the job queue. Use this when the field is a FlowField (for example **WMS Status**), since a change there is not a modification of the order.
4. Set **Operator** and **Compare Value**. Boolean fields are compared with `TRUE` or `FALSE`.
5. Test with a new order in the test environment and follow the status through the whole flow. Check that the rule does not fire on an empty order.

## Common mistake: line condition with the wrong Condition Type

**Symptom:** a status is set on orders where it should not be, for example every order gets the final "shipped" status although not all lines are shipped.

**Cause:** a condition on table 37 has Condition Type **Field Comparison**. It is then not evaluated against the lines, and the rule fires incorrectly.

**Fix:** change the Condition Type of every condition on table 37 to **Any line matches**.

## Job queue for scheduled conditions

All conditions with Trigger **On Schedule** are run by codeunit **12096920 WCM Update Order Status**. Set it up as a job queue entry that runs every 5 or 15 minutes. Without it, scheduled conditions are never evaluated.

## Related

- [How-to — Orderly Trust](README.md)
- [Integrations or automation not running](../web-connect/integration-not-running.md)
