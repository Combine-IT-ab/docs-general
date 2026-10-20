# Mallar för integrationssidor

Mallarna här används för varje integration mellan Business Central och ett annat system. De ligger utanför `docs/` och publiceras inte.

| Mall | Används för |
|---|---|
| [integration-oversikt.md](integration-oversikt.md) | En sida per integrationspar, till exempel Business Central och Centra |
| [integration-flode.md](integration-flode.md) | En sida per flöde inom integrationen, till exempel orderimport från Centra |

Mallarna bygger på nulägesmätningen i Combine-IT-ab/docs-internal#47: sökorden, vad Google blandar ihop och varför AI-assistenterna rekommenderar konkurrenterna i stället för oss.

## Varför sidorna ser ut så här

- **AI-assistenter citerar sidor som svarar direkt.** ChatGPT valde Junipeer för Centra med motiveringen "a documented connector with nine data flows" och valde bort Easy Connect för att omfattningen inte gick att avgöra. Varje sida börjar därför med ett kort svar och en tabell som visar exakt vad som synkas.
- **Svenskar söker på engelska.** Engelska är huvudspråk. Den svenska versionen har samma struktur och samma fakta.
- **De nischade systemen har låg sökvolym i Google.** Där vinner vi genom att vara den bästa källan för AI-assistenterna och genom att synas på systemleverantörens partnersida.
- **Google blandar ihop flera systemnamn.** Därför står systemnamnet alltid tillsammans med kategori och "Business Central".

## Regler för all text

1. **Rubriken (H1) börjar alltid med "Business Central"** och innehåller systemnamnet med kategori: "Business Central and Centra integration". Se tabellen nedan för hur varje system skrivs.
2. **Första stycket är svaret.** Två till tre meningar: vad som synkas, åt vilket håll, med vilken produkt. Det ska gå att citera utan resten av sidan.
3. **Bara verifierade fakta.** Inga påhittade siffror, tider eller kundantal. Saknas en uppgift står `[ATT FYLLA I: vad som saknas]` kvar tills den är bekräftad, och sidan publiceras inte.
4. **Inga kunduppgifter.** Inga kundnamn, kundspecifika fält, konfigurationer eller priser. Repot är publikt. Kundunika lösningar beskrivs generellt ("kan mappas per försäljningskanal").
5. **Skriv ut begränsningarna.** Det som inte stöds står under "Limitations". Det gör sidan trovärdig för både läsare och AI.
6. **Web Connect nämns alltid tillsammans med Business Central och CombineIT**, aldrig ensamt. Namnet är generiskt och hittas inte annars.
7. **Inga streck som skiljetecken** i löptexten, på varken engelska eller svenska. Skriv om med punkt, kolon eller komma.
8. **Diagram i Mermaid**, med samma ikoner som i de befintliga flödena (🛒 webbshop, ⚙️ Web Connect, 🔄 Business Central, 📦 lager, 🏪 kassa).

## Systemnamn

| System | Skriv så här | Kategori |
|---|---|---|
| Centra | Centra | e-commerce |
| Shopify | Shopify | e-commerce |
| Norce | Norce Commerce | e-commerce |
| Crystallize | Crystallize | e-commerce |
| WooCommerce | WooCommerce | e-commerce |
| Optimizely | Optimizely Commerce | e-commerce |
| Askås | Askås | e-commerce |
| Sitoo | Sitoo POS | POS |
| Ongoing | Ongoing WMS | warehouse (WMS) |
| Astro | Astro WMS | warehouse (WMS) |
| NYCE | Nyce Logic WMS | warehouse (WMS) |
| Nowaste | Nowaste | warehouse (3PL) |
| 3PL Central | 3PL Central | warehouse (WMS) |
| Reclaimit | Reclaimit | returns |
| Shelfless | Shelfless | returns |
| Global-e | Global-e returns | returns |
| Inretrn | Inretrn | returns |
| Virtual Stock | Virtualstock | marketplace (dropship) |
| Boots | Boots marketplace | marketplace |
| Sello | Sello | marketplaces |
| Voyado | Voyado | loyalty and CRM |
| Plytix | Plytix PIM | PIM |
| Milient | Milient (formerly Milltime) | time and project management |
| Keen | Keen member portal | membership |
| Provet Cloud | Provet Cloud | veterinary practice management |
| Peppol | Peppol | e-invoicing |
| EDI | EDIFACT EDI | EDI |

Är ett namn osäkert: stäm av mot systemleverantörens egen webbplats.

## Adresser

Engelska: `/docs/integrations/business-central-<system>/`, svenska: `/docs/sv/integrations/business-central-<system>/`. Flöden ligger under integrationen: `/docs/integrations/business-central-centra/order-inbound/`.

Inga integrationssidor finns på de gamla BetterDocs-adresserna, så de nya adresserna krockar inte med adresslistan i `adresser/gamla-adresser.csv`. En publicerad adress byts aldrig. Behöver den bytas: lägg in en omdirigering och uppdatera adresslistan.

## Frontmatter

Varje sida har frontmatter. Bygget (docs-internal#50 och #51) använder den till sidans titel, metabeskrivning, strukturerad data (TechArticle och FAQPage), sitemap och `hreflang`.

| Fält | Krav | Används till |
|---|---|---|
| `title` | Samma som H1 | `<title>` och rubrik |
| `description` | 140 till 160 tecken, svaret i en mening | Metabeskrivning, sökresultat, AI-sammanfattningar |
| `summary` | Två till tre meningar, samma som första stycket | FAQ-svar och integrationskatalogen |
| `slug` | Enligt adressreglerna ovan | Adress |
| `lang` | `en` eller `sv` | Språk och `hreflang` |
| `translation_key` | Samma för båda språken | Kopplar ihop språkversionerna |
| `product` | `web-connect` | Filter och navigation |
| `type` | `integration` eller `integration-flow` | Mall och strukturerad data |
| `system` | Systemnamnet enligt tabellen | Katalog och filter |
| `system_category` | Kategorin enligt tabellen | Katalog och filter |
| `keywords` | Sökorden från docs-internal#47 som sidan ska ranka på | Granskning, inte metataggar |
| `faq` | Frågor och svar, se mallen | FAQPage |
| `last_reviewed` | Datum när fakta senast stämdes av | Visas på sidan |

## Checklista före PR

- [ ] H1 och `title` börjar med "Business Central" och har systemnamnet med kategori.
- [ ] Första stycket svarar på frågan utan resten av sidan.
- [ ] Alla `[ATT FYLLA I]` är ersatta med verifierade uppgifter.
- [ ] Inga kunduppgifter.
- [ ] Begränsningar finns med.
- [ ] Minst tre riktiga frågor i FAQ, gärna från supportärenden.
- [ ] Svensk version med samma `translation_key` (kan komma i en senare PR).
