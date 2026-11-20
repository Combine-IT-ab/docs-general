# Från Business Central till Centra: makuleringar

**Riktning:** Business Central → Centra
**Syfte:** Makulera order eller enskilda orderrader i Centra när de makuleras i Business Central (valfritt).

---

## Översikt

Flödet är **valfritt** och används bara när makuleringar startas i Business Central och måste föras över till Centra. Alla kunder behöver inte flödet.

---

## Så fungerar det

**Startas av:** Manuellt, när en order makuleras i Business Central (går att ställa in)
**API-anrop:** `cancelDirectToConsumerOrder` för en hel order, och `updateDirectToConsumerOrder` med makulerade rader för enskilda rader

**Objekt som används:**

| Objekt | Roll |
|---|---|
| `CA_CANCEL_ORDER` | Makulerar en hel order i Centra |
| `CA_CANCELORDERLINE` | Makulerar enskilda orderrader i Centra |

**Vilka statusar som går att makulera:**

| Status | Går att makulera? |
|---|---|
| **PENDING** | Ja |
| **CONFIRMED** | Ja |
| **PROCESSING** | Ja (bara ej levererade rader) |
| **COMPLETED** | Nej |

---

## Varianter

### Variant A: manuell makulering (standard)

Ordern makuleras manuellt i Business Central. Makuleringen skickas direkt till Centra.

### Variant B: automatisk makulering utifrån affärslogik

Startas automatiskt utifrån bestämda villkor (till exempel att artikeln är slut i lager eller att ordern har blivit liggande).

### Variant B2: makulering avstämd med lagersystemet (rekommenderas med ett WMS)

När Business Central har en lagerintegration via Web Connect skickas makuleringen först som en begäran till lagersystemet. Med Ongoing WMS uppdaterar Web Connect orderstatusen i Ongoing (`orders/{id}/orderStatus`). Har lagret redan börjat med ordern, till exempel plockat, nekar Ongoing ändringen och ordern makuleras inte. Kontakta lagret för att stoppa ordern. Godkänner lagret skickas makuleringen till Centra.

### Variant C: utan stöd för makulering

Makuleringar görs direkt i Centra, och flödet är inte påslaget. Det rekommenderas inte. Makulera i Business Central, så att en lagerintegration kan neka makuleringen om ordern redan plockas.

---

## Felhantering

| Steg | Vad som kan gå fel | Vad som händer |
|---|---|---|
| Skicka makuleringen | Ordern är redan levererad | Centra nekar makulering av hela ordern. Försök på radnivå i stället |
| Skicka makuleringen | Centras API är inte tillgängligt | Posten i jobbkön misslyckas och körs igen nästa gång |

---

**Relaterat:**
[Översikt](../overview.md) · [Order in](order-inbound.md) · [Leverans](shipment.md) · [Instruktioner](../../../../../how-to/web-connect/README.md)
