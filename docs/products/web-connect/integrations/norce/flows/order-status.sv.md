---
title: "Från Business Central till Norce Commerce: orderstatus"
description: "Web Connect bekräftar varje order i Norce Commerce när försäljningsordern skapas och skickar sedan status för behandlad, dellevererad och levererad till Norce."
summary: "När försäljningsordern skapas i Business Central bekräftar Web Connect ordern i Norce Commerce. När orderstatusen i Web Connect ändras i Business Central skickas den nya statusen, så att Norce Commerce visar om ordern är behandlad, dellevererad eller levererad."
lang: sv
translation_key: integration-norce-order-status
product: web-connect
type: integration-flow
system: "Norce Commerce"
system_category: "e-commerce"
keywords:
  - business central norce order status
faq:
  - question: "Vet Norce Commerce om resten av en dellevererad order ligger i restorder?"
    answer: "Ja. När en order skickas delvis skickar Web Connect statusen dellevererad tillsammans med ett informationsfält som säger om de återstående raderna ligger i restorder eller inte."
last_reviewed: 2026-11-19
---

# Från Business Central till Norce Commerce: orderstatus

När försäljningsordern skapas i Business Central bekräftar Web Connect ordern i Norce Commerce. När orderstatusen i Web Connect ändras i Business Central skickas den nya statusen, så att Norce Commerce visar om ordern är behandlad, dellevererad eller levererad.

| | |
|---|---|
| **Riktning** | Business Central → Norce Commerce |
| **Startas av** | Utgående synktriggers: det externa order-ID:t sätts på försäljningsordern (bekräftelse), och en ny post för orderstatus skapas i Web Connect (statusuppdateringar) |
| **Resultat** | Ordern i Norce Commerce har statusen Confirmed, ErpConfirmed, PartlyDelivered eller Delivered |
| **Del av** | [Business Central och Norce Commerce: integration](../overview.md) |

## Steg för steg

1. Flödet för [order in](order-inbound.md) skapar försäljningsordern och sätter orderreferensen från Norce Commerce på den.
2. Triggern skickar orderreferensen, ordernumret i Business Central och statusen `Confirmed` till Norce Commerce (`Order/SendOrderStatus`).
3. När ordern går vidare i Business Central skriver Web Connect en ny post för orderstatus.
4. Triggern skickar motsvarande status i Norce Commerce. För en delvis skickad order säger ett informationsfält om resten ligger i restorder.

```mermaid
sequenceDiagram
    participant BC as 🔄 Business Central
    participant WC as ⚙️ Web Connect
    participant S as 🛒 Norce Commerce

    BC->>WC: Försäljningsorder skapad med orderreferens
    WC->>S: SendOrderStatus: Confirmed
    BC->>WC: Ny post för orderstatus
    alt Delvis skickad
        WC->>S: SendOrderStatus: PartlyDelivered, med info om restorder
    else Helt skickad eller behandlad
        WC->>S: SendOrderStatus: Delivered eller ErpConfirmed
    end
    S-->>WC: Resultatet loggas i Entries
```

## Mappning av data

| Orderstatus i Business Central | Status i Norce Commerce | Kommentar |
|---|---|---|
| Order bekräftad | `Confirmed` | Skickas när försäljningsordern skapas |
| Order under behandling | `ErpConfirmed` | |
| Delvis skickad, ingen restorder | `PartlyDelivered` | Informationsfältet säger ingen restorder |
| Delvis skickad, med restorder | `PartlyDelivered` | Informationsfältet säger med restorder |
| Skickad | `Delivered` | |

Översättningen är en textmappning i Web Connect och går att ändra.

## Objekt i Web Connect

| Objekt | Roll |
|---|---|
| `NORCE_CONFIRM_ORDER` | Bekräftar ordern när orderreferensen sätts |
| `NORCE_ORDERSTATUSUPDATE` | Skickar varje ny orderstatus |
| `NORCE_ORDERSTATUSUPDATE_INFOS` | Info om restorder för delvis skickade order |

## Felhantering

| Situation | Vad som händer | Vad du gör |
|---|---|---|
| Norce Commerce avvisar statusen | Felet loggas i Entries | Läs feltexten, rätta orsaken och [skicka om meddelandet](../../../../../how-to/web-connect/resend-outgoing-message.md) |
| Ordern har en annan status i Norce Commerce än väntat | Web Connect skickar alltid en status i varje meddelande, så det senaste meddelandet avgör statusen | Kontrollera det senaste meddelandet om orderstatus i Entries, och att statusmappningen stämmer |

## Vanliga frågor

### Vet Norce Commerce om resten av en dellevererad order ligger i restorder?

Ja. När en order skickas delvis skickar Web Connect statusen dellevererad tillsammans med ett informationsfält som säger om de återstående raderna ligger i restorder eller inte.

## Relaterat

- [Business Central och Norce Commerce: integration](../overview.md)
- [Order in](order-inbound.md) · [Leveranser](shipment.md)
- [Outgoing Sync Triggers](../../../general/outgoing-mapping/outgoing-sync-triggers.md)
