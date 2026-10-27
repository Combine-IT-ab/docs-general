# Nothing Downloads to Business Central

## Symptom

No data at all is downloaded from the external system into Microsoft Business Central.

## Cause

This is often caused by incorrect setup in [Web Connect Integrations](../../products/web-connect/general/integrations.md), such as:

- a wrong **GET URL**
- an incorrect **Data Array JPath**, so Web Connect does not find the records in the response

## How to Fix It

1. Call the endpoint and verify that it returns the data you expect.
2. Check that the Data Array JPath points to the array of records in the JSON response.

If the setup is correct and nothing still downloads, work through [Integrations or automation not running](integration-not-running.md), which checks that Web Connect, the integration and the job queue are running.

## Related

- [Web Connect Integrations](../../products/web-connect/general/integrations.md)
- [Web Connect Incoming Data](../../products/web-connect/general/incoming-data/README.md)
- [Web Connect Entries](../../products/web-connect/general/entries.md)
