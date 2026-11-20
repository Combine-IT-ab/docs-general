# Web Connect Text Mapping

> **BC view name:** Web Connect Textmappning

## Overview

A text mapping translates a value from one system into the value the other system expects. For example, a payment method called `klarna_checkout` in the e-commerce platform becomes the code `KLARNA` in Business Central, or a shipping option becomes a shipping agent code.

A text mapping is a list of pairs. Each pair has the value that comes in and the value it is translated to. The same text mapping can be used in several places, so you only need to add a new payment method or shipping option once.

All text mappings live in your own Business Central. You can see and change every line yourself.

## Where text mappings are used

| Where | Field | Example |
|---|---|---|
| [Incoming data mapping](incoming-data/mapping.md) | **Logic Mapping** on the mapping line | A payment method in an incoming order becomes the payment method code in Business Central |
| [Outgoing data](outgoing-mapping/outgoing-data-web.md) | **Mapping** on the outgoing mapping line | A location code in Business Central becomes the warehouse ID in the external system |
| [Lookup values](lookup-values.md) | **Return Field Mapping** | The value found in a lookup is translated before it is used |
| [WMS documents](wms-documents.md) | **Map Value Code** | A document type is translated for the warehouse system |

The text mapping itself has no direction. On incoming data, the value from the message is translated to the value in Business Central. On outgoing data, the value in Business Central is translated to the value in the external system.

## Text mapping header

| Field | Description |
|-------|-------------|
| **Code** | Unique identifier for the text mapping, for example `PAYMENT-METHODS` or `SHIPPING-TO-AGENT`. Use one text mapping per kind of value, so that payment methods and shipping options are not mixed. |

## Text mapping lines

| Field | Description |
|-------|-------------|
| **Mapping Code** | The text mapping the line belongs to. |
| **Incoming Value** | The value before translation, for example `klarna_checkout`. A line with an empty **Incoming Value** translates an empty value. |
| **WCM Value** | The value after translation, for example `KLARNA`. |

**Wildcards:** a line with `*` as **Incoming Value** catches every value that has no line of its own. A value such as `DHL*` catches every value that starts with `DHL`. If no line matches and there is no `*` line, the value is not translated.

## Examples

**Payment methods:**

| Incoming Value | WCM Value |
|---|---|
| `klarna_checkout` | `KLARNA` |
| `stripe` | `CARD` |
| `*` | `OTHER` |

**Shipping options to shipping agent:**

| Incoming Value | WCM Value |
|---|---|
| `dhl_express` | `DHL` |
| `budbee_home` | `BUDBEE` |

**Market to customer:** an incoming market ID is translated to the customer number used for the order, so that every market gets its own customer and currency.

## Setting several fields from one value

Sometimes one value from the external system should fill in several fields in Business Central. A shipping option, for example, decides both the shipping agent and the shipping agent service on the order. Then you use an object template instead of a text mapping. It is selected with **Set Values From Template** on the [incoming mapping line](incoming-data/mapping.md).

### Object template

| Field | Description |
|-------|-------------|
| **Template Code** | Unique identifier for the template, for example `SHIPPING-DATA`. |
| **Description** | What the template sets, for example "Shipping data from the e-commerce platform". |
| **Object Code** | The [Web Connect Object](objects.md) the template is used on, for example the sales header. |
| **Table No.** | The Business Central table of the object. It is filled in from the object. |

### Template fields

| Field | Description |
|-------|-------------|
| **Field No.** | A field on the record that the template sets, for example **Shipping Agent Code** and **Shipping Agent Service Code**. |
| **Validation Order** | The order in which the fields are set. Business Central runs the field's own logic when a value is set, so set the shipping agent before the service. |

### Template value mapping

| Field | Description |
|-------|-------------|
| **Incoming Value** | The value from the message, for example the name of the shipping option. |
| **Field No.** | The template field the line sets. |
| **Outgoing Value** | The value written to that field, for example `DHL` for the shipping agent and `PARCEL` for the service. |

You add one line per incoming value and field. A new shipping option with two fields needs two lines.

## Configure it yourself in Business Central

| What you can change | Where | Example |
|---|---|---|
| Add a new value | A new line with **Incoming Value** and **WCM Value** | Add a new payment method or shipping option |
| Change what a value becomes | **WCM Value** | Send a shipping option to another shipping agent |
| Catch values you have not mapped | A line with `*` as **Incoming Value** | Use a default payment method for new ones |
| Set several fields from one value | **Template Value Mapping** | Let a new shipping option set both agent and service |

Add the new value in Business Central before it is used in the external system. Otherwise the first orders with the new value are not translated and may stop with an error.

## Related

- [Web Connect Incoming Data Mapping](incoming-data/mapping.md)
- [Web Connect Outgoing Data](outgoing-mapping/outgoing-data-web.md)
- [Web Connect Lookup Values](lookup-values.md)
- [Web Connect Objects](objects.md)
