# Från Business Central till Centra: lagersaldo

**Riktning:** Business Central → Centra
**Syfte:** Hålla lagersaldot i Centra i takt med det tillgängliga lagret i Business Central.

---

## Översikt

Centra visar lagersaldot för kunderna när de tittar på produkterna. Lagersaldot synkas automatiskt från Business Central till Centra så fort lagret ändras.

---

## Så fungerar det

**Startas av:** Automatiskt, när lagret ändras i Business Central (försäljningsorder, inköp, flyttar, justeringar)
**API-anrop:** En mutation för lageruppdatering via GraphQL

**Ändringar som startar flödet (Web Connect bevakar dem):**

| Tabell i Business Central | Händelse | Varför |
|---|---|---|
| Item Ledger Entry | Efter bokföring | Lagret minskar när försäljning skickas och ökar när inköp kommer in |
| Sales Line | Rad skapad eller ändrad | Tillgängligt lagersaldo minskar när en order skapas |
| Purchase Line | Rad skapad eller ändrad | Tillgängligt lagersaldo ökar när ett inköp planeras |
| Transfer Line | Rad skapad eller ändrad | Lager fördelas mellan lagerställen |

**Steg i processen:**

1. En lagerhändelse sker i Business Central
2. Web Connect upptäcker ändringen
3. Produkten identifieras i Centra med en produktuppslagning (EAN → produkt-id i Centra)
4. Aktuellt tillgängligt lagersaldo beräknas i Business Central
5. Är lagersaldot negativt → skickas `0` (Centra tar inte emot negativa värden)
6. Lagersaldot skickas till Centra med en GraphQL-mutation

---

## Beräkning av lagersaldo

Lagersaldot som skickas till Centra är det **tillgängliga lagret**:

- Utgångspunkt: artikelns antal i lager i Business Central
- Minus: antal som är reserverade av försäljningsorder och flyttar
- Resultat: fritt, tillgängligt antal

**Negativt lagersaldo:** Blir det beräknade lagersaldot lägre än noll skickas `0` till Centra i stället.

---

## Varianter

### Variant A: uppslagning på EAN (standard)

Artiklarna matchas på EAN-kod. EAN-koden slås upp i en inställd mappning för att hitta produkt-id i Centra.

### Variant B: lagersaldo per lager

Lagersaldot beräknas per lager och skickas separat för varje lagerställe i Centra.

---

## Felhantering

| Steg | Vad som kan gå fel | Vad som händer |
|---|---|---|
| Produktuppslagning | EAN-koden finns inte i mappningen | Uppdateringen hoppas över och lagersaldot i Centra ändras inte |
| Skicka uppdateringen | Fel i Centras API | Posten i jobbkön misslyckas och körs igen nästa gång |

---

**Relaterat:**
[Översikt](../overview.md) · [Produktdata](product-data.md) · [Instruktioner](../../../../../how-to/web-connect/README.md)
