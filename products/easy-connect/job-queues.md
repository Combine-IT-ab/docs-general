# Easy Connect Job Queues

Easy Connect uses Microsoft Business Central Job Queues to automatically synchronize documents and master data between companies. These job queues must be set up correctly for Easy Connect to work as intended.

## Order Synchronization Job Queue

**Job:** `WCM Run Document Sync`

This job queue handles order synchronization between companies. It synchronizes sales orders between Subsidiary Company and Central Company and handles updates such as shipment, invoicing, and status changes.

> **Important:** This job queue must be configured and running in **both** the Central and Subsidiary companies. Recommended to run frequently (e.g. every few minutes).

## Price List Synchronization Job Queue

**Job:** `WCM EasyConnect PriceList Job`

This job queue is responsible for intercompany price list handling. It creates and updates internal price lists and is used when pricing is derived from the Central company.

Typically scheduled once per day.

## Master Data Synchronization Job Queue

**Job:** `WCM Job Queue Master Data`

This job queue synchronizes master data from the Central company to other companies. It sends master data such as items, price lists, and other configured master tables.

Runs only in the **Central company**. Uses the configuration defined in [Easy Connect Master Data Handling](master-data-handling.md).

## Related

- [Easy Connect Setup](setup.md)
- [Easy Connect Master Data Handling](master-data-handling.md)
- [Easy Connect Master Data Change Log](master-data-change-log.md)
