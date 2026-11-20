---
title: "Från Astro WMS till Business Central: inleveranser"
description: "Web Connect hämtar inleveranser av inköpsorder från Astro WMS enligt schema och bokför mottagna antal och batchnummer i Business Central."
summary: "Enligt schema, till exempel var femte minut under dagen, frågar Web Connect Astro WMS efter nya inleveranser av inköpsorder. Mottagna antal och batchnummer skrivs till lagerdokumentet i Business Central, och inleveransen kan bokföras automatiskt. Varje inleverans läses en gång, utifrån ordernumret."
lang: sv
translation_key: integration-astro-receipt
product: web-connect
type: integration-flow
system: "Astro WMS"
system_category: "warehouse (WMS)"
keywords:
  - business central astro wms receipt
  - astro wms goods receipt business central
faq:
  - question: "Hur snabbt syns en inleverans i Business Central?"
    answer: "Web Connect hämtar inleveranser enligt schema, till exempel var femte minut under dagen. När lagret har registrerat inleveransen bokförs den oftast i Business Central inom några minuter. Schemat kan ändras i Web Connect."
last_reviewed: 2026-11-19
---

# Från Astro WMS till Business Central: inleveranser

Enligt schema, till exempel var femte minut under dagen, frågar Web Connect Astro WMS efter nya inleveranser av inköpsorder. Mottagna antal och batchnummer skrivs till lagerdokumentet i Business Central, och inleveransen kan bokföras automatiskt. Varje inleverans läses en gång, utifrån ordernumret.

| | |
|---|---|
| **Riktning** | Astro WMS → Business Central |
| **Startas av** | Schema i Web Connect, anpassat efter dina behov, till exempel var femte minut mellan 04.00 och 22.00 |
| **Resultat** | En bokförd inleverans i Business Central med mottagna antal och batchnummer |
| **Del av** | [Business Central och Astro WMS: integration](../overview.md) |

## Steg för steg

1. Lagret tar emot varorna på inleveransordern (Astro WMS).
2. Web Connect hämtar nya inleveranser av inköpsorder från lagrets API (Web Connect).
3. Varje inleverans matchas mot sitt lagerdokument med dokumentnumret som skickades med [inköpsordern](purchase-order.md) (Web Connect).
4. Mottaget antal per rad, och batchnumren med sina antal, skrivs till lagerdokumentet (Web Connect).
5. Inleveransen bokförs med arbetsdatumet som bokföringsdatum, med batchnummer på raderna (Business Central).

```mermaid
sequenceDiagram
    participant AS as 📦 Astro WMS
    participant WC as ⚙️ Web Connect
    participant BC as 🔄 Business Central

    WC->>AS: GET inleveranser av inköpsorder (enligt schema)
    AS-->>WC: Orderhuvud och rader med batcher
    alt Inköpsordern hittas
        WC->>BC: Mottagna antal och batchnummer
        BC-->>WC: Inleveransen bokförd
    else Hittas inte eller bokföringen misslyckas
        WC-->>WC: Loggas i Entries, försöker igen ⚠️
    end
```

## Mappning av data

| Fält i Astro WMS | Fält i Business Central | Kommentar |
|---|---|---|
| `ORDERHEAD.DocNbr` | Lagerdokumentets nummer och externt ID | Varje inleverans läses en gång |
| `ORDERHEAD.DocDate` | Datum på lagerdokumentet | |
| `OrderLineNbr` | Radnummer | |
| `ArticleNbr` | Item No. | |
| `Quantity` | Mottaget antal | |
| `Batches.BatchId`, `Quantity` | Lot No. och antal per batch | |

## Objekt i Web Connect

| Objekt | Roll |
|---|---|
| `SPD_RECEIPT-NOTICE` | Hämtar inleveranser av inköpsorder från lagrets API |
| `SPD_ORDERLINE1`, `SPD_LINE` | Mottagna rader |
| `SPD_BATCHES`, `SPD_BATCH1` | Batchnummer och antal per rad |

## Felhantering

| Situation | Vad som händer | Vad du gör |
|---|---|---|
| Ett batchnummer saknas | Inleveransen bokförs inte, eftersom batchnummer krävs på inleveranser | Kontrollera batchen i [Entries](../../../general/entries.md) och artikelspårningen på artikeln |
| Bokföringen misslyckas | Nya försök görs upp till det högsta antalet fel, sedan kommer posten med i det dagliga felmejlet | Rätta orsaken i Business Central och bearbeta posten igen |
| Ingenting kommer in | Inga inleveranser hämtas | Se [Ingenting hämtas till Business Central](../../../../../how-to/web-connect/nothing-downloads-to-business-central.md) |

## Vanliga frågor

### Hur snabbt syns en inleverans i Business Central?

Web Connect hämtar inleveranser enligt schema, till exempel var femte minut under dagen. När lagret har registrerat inleveransen bokförs den oftast i Business Central inom några minuter. Schemat kan ändras i Web Connect.

## Relaterat

- [Business Central och Astro WMS: integration](../overview.md)
- [Inköpsorder](purchase-order.md) · [Leveranser](shipment.md)
- [WMS-dokument](../../../general/wms-documents.md) · [Logistics Setup](../../../general/logistics-setup.md)
