# Integrationer i Web Connect

Web Connect kopplar ihop Business Central med systemen nedan. Varje sida beskriver vad som synkroniseras, vilka val som finns för varje flöde och vad du själv kan ställa in i Business Central.

Alla mappningar, villkor och triggers sätts upp i Web Connect i ditt eget Business Central, där du kan se och ändra dem.

## E-handel

| Integration | Vad som synkroniseras |
|---|---|
| [Centra](centra/overview.md) | Order, lagersaldo, produkter, leveranser |
| [Shopify](shopify/README.md) | Order, produkter, priser, lagersaldo, leveranser |
| [Norce Commerce](norce/overview.md) | Order, orderstatus, leveranser, lagersaldo, produkter, priser, kunder |
| [Crystallize](crystallize/overview.md) | Order, orderstatus, lagersaldo, priser |
| [WooCommerce](woocommerce/overview.md) | Order, kunder, slutförda order, lagersaldo, priser, produktmatchning |

## Marknadsplatser

| Integration | Vad som synkroniseras |
|---|---|
| [Virtualstock](virtual-stock/overview.md) | Dropshiporder, orderkvittenser, utleveranser, lagersaldo, makuleringar, produktdata |
| [Boots marketplace](boots/overview.md) | Lagersaldo |
| [Sello](sello/overview.md) | Returorder |

## Lager (WMS och 3PL)

| Integration | Vad som synkroniseras |
|---|---|
| [Ongoing WMS](ongoing/overview.md) | Artiklar, order, leveranser, inköpsorder, inleveranser, returer, lagersaldo |
| [Astro WMS](astro/overview.md) | Artiklar, order, inköpsorder, leveranser, inleveranser, lagersaldo |
| [Nyce Logic WMS](nyce/overview.md) | Artiklar, order, inköpsorder, leveranser, inleveranser, returer, lagersaldo |
| [Nowaste](nowaste/overview.md) | Artiklar, order, leveranser, inkommande leveranser, inleveranser, lagersaldo |
| [Shelfless](shelfless/overview.md) | Produktdata, inkommande och utgående leveranser, inleveranser, leveranser, returer, inventering |

## Kassasystem

| Integration | Vad som synkroniseras |
|---|---|
| [Sitoo POS](sitoo/overview.md) | Produkter, priser, försäljning, leveranser till och inleveranser i butik, returer, lagersaldo |

## Returer

| Integration | Vad som synkroniseras |
|---|---|
| [Global-e returns](global-e/overview.md) | Returer och återbetalningar |
| [Inretrn](inretrn/overview.md) | Fakturerade order, returorder |
| [Reclaimit](reclaimit/overview.md) | Uppslagning av köp, returorder, returstatus |

## Produktdata (PIM och PLM)

| Integration | Vad som synkroniseras |
|---|---|
| [Plytix PIM](plytix/overview.md) | Produktdata, produktmatchning |
| [Resourced PLM](resourced/overview.md) | Produktdata, varianter och streckkoder, försäljningspriser, inköpspriser och kostnader |

## Övriga system

| Integration | Typ | Vad som synkroniseras |
|---|---|---|
| [Voyado](voyado/overview.md) | Lojalitet och CRM | Kontakter, kontakternas samtycken, order |
| [Addimotion](addimotion/overview.md) | Leveranshantering | Försäljningsorder |
| [CHESS](chess/overview.md) | Hantering av kemikalier | Ärenden för leveranser, säkerhetsdatablad, dokument markerade som utskrivna |
| [Milient Time Flow](milient/overview.md) | Tid och projekt | Projekt, kunder, leverantörskostnader, fakturor |

## Relaterat

[Allmän dokumentation för Web Connect](../general/README.md) · [Instruktioner och felsökning](../../../how-to/web-connect/README.md)
