# How to Stop Sending a Value in Web Connect (Outgoing)

> ⚠️ Changes to Web Connect in a production environment are sensitive and may cause integrations to stop working if configured incorrectly. We strongly recommend testing all changes in a test/sandbox environment first. If you are unsure, contact us before making changes.

## Step 1: Locate the Correct Web Object

1. Go to **Web Connect Integrations**
2. Select the integration where the data is sent
3. Under **Web Objects**, locate the object you want to adjust and click **Edit**

If the value is part of a nested structure, open **Underlying Web Objects** and navigate to the object where the value is defined.

## Step 2: Review Outgoing Mapping

Inside the Web Object, locate the **Outgoing Mapping** section and identify the field/value that is currently being sent.

## Step 3: Choose How to Stop Sending the Value

### Option A — Send a blank value

Use this when the field must still exist in the payload but should be empty.

1. Locate the mapping line
2. Clear the value in **Field No.**
3. Leave the mapping row active

Result: the field is sent with an empty value.

### Option B — Remove the field entirely

Use this when the field should be completely excluded from outgoing messages.

1. Locate the mapping line
2. Click the three-dot menu → **Delete**

Result: the field is no longer included in outgoing messages.

### When to Use Each Option

| Scenario | Recommended Action |
|----------|--------------------|
| External system requires the field but accepts empty, or you want to send this value again soon | Clear Field No. |
| External system rejects unknown fields | Delete mapping row |
| Value should no longer be controlled by the integration | Delete mapping row |

## Step 4: Apply and Resend Data (If Needed)

If the data was already sent previously:

1. Go to **Web Connect Outgoing Data**
2. Mark the affected records as Non-Synced
3. Generate a new Web Entry or let the Job Queue handle it automatically

## Related

- [Web Connect Outgoing Data](../../products/web-connect/general/outgoing-mapping/outgoing-data-web.md)
- [Web Connect Outgoing Mapping](../../products/web-connect/general/outgoing-mapping/README.md)
- [How do I resend an outgoing message?](resend-outgoing-message.md)
