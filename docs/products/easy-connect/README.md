# Easy Connect

## Overview

Easy Connect is an extension for Microsoft Business Central designed to simplify and automate internal flows between companies in the same group. Its core purpose is to make intercompany (IC) flows easy — hence the name.

Where BC's standard intercompany functionality is strict, order-dependent, and often error-prone in real operations, Easy Connect offers a flexible, configurable, and automated alternative that works reliably in day-to-day logistics and finance.

## What Problems Does Easy Connect Solve?

Internal group flows often break down because BC standard requires that events occur in a specific sequence, documents match perfectly when invoiced, and deliveries always happen before intercompany invoices. In reality, deliveries and invoices rarely happen in the same order, subsidiaries and warehouse companies often use different posting groups, and maintaining master data across companies is time-consuming and error-prone.

Easy Connect removes these limitations by providing automatic order synchronization between companies, central master data distribution, automated intercompany pricing flows, improved handling of store replenishment, and configuration-based behaviour instead of rigid rules.

## Order Synchronization (Core Feature)

Easy Connect replaces BC's rigid IC-flow with a simplified, reliable, and configuration-driven process. The key difference: the same order number is synchronized between companies and Easy Connect ensures that documents flow correctly even when delivery and invoicing do not happen in the same order.

### BC Standard IC-flow (requires strict sequence)

1. Sales Order in company A
2. Creates Purchase Order in company B
3. Delivery must occur
4. Invoice arrives — documents must match line by line

If the invoice arrives before the delivery has been posted (extremely common in practice), the flow breaks.

### How Easy Connect Handles Orders

The flow involves two companies — a **Selling Company** and a **Warehouse Company**:

1. Sales Order is created in the Selling Company
2. Easy Connect synchronizes the Sales Order to the Warehouse Company (same order number, with customer/location/pricing mapped by configuration)
3. Warehouse Company posts the shipment
4. Easy Connect sends shipment information back to the Selling Company
5. The Selling Company invoices without line-level matching requirements — it can invoice as soon as the shipment is registered

## In This Section

- [Easy Connect Setup](setup.md)
- [Easy Connect Sync Data Fields](sync-data-fields.md)
- [Easy Connect Master Data Handling](master-data-handling.md)
- [Easy Connect Master Data Companies](master-data-companies.md)
- [Easy Connect Master Data Change Log](master-data-change-log.md)
- [Easy Connect Sync Log Entries](sync-log-entries.md)
- [Easy Connect Job Queues](job-queues.md)
