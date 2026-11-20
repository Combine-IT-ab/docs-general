# Från Business Central till Centra: produktdata

**Riktning:** Business Central → Centra
**Syfte:** Synka information om produkter, varianter och priser från Business Central till Centra (valfritt).

---

## Översikt

Flödet är **valfritt** och används bara när Business Central är master för produktdata. Är det påslaget synkas artiklar, varianter, storlekar och priser till Centra så fort de skapas eller ändras i Business Central.

---

## Så fungerar det

**Startas av:** Automatiskt, när artiklar, varianter eller priser ändras i Business Central (går att ställa in)
**API-anrop:** Skapar eller uppdaterar produkt, variant, storlek och pris i Centra

**Objekt som används:**

| Objekt | Roll |
|---|---|
| `CA_PRODUCT` | Skapar eller uppdaterar produkten i Centra |
| `CA_PRODUCT_VARIANT` | Skapar eller uppdaterar produktvarianten (till exempel färg) |
| `CA_PRODUCT_VARIANT_SIZE` | Skapar eller uppdaterar storlek eller dimension (till exempel S, M, L) |
| `CA_PRODUCTPRICE` | Sätter priser på prislistor i Centra (`setPrices`) |

**Produkthierarkin i Centra:**

```
Product
  ├─ Variant (e.g. color: Red, Blue)
  │   ├─ Size (e.g. S, M, L)
  │   └─ Price
  └─ Variant (e.g. color: Green)
```

---

## Viktigt: storlekstabeller

När en **Size Chart** (storlekstabell) väl har kopplats till en produkt i Centra **går den inte att ändra utan att produkten tas bort och skapas på nytt**. Storleksstrukturen måste därför planeras innan produkten publiceras.

---

## Varianter

### Variant A: enkel produkt

Produkter utan varianter för färg eller storlek: en produkt, ett pris.

### Variant B: produkt med färg och storlek

Produkter med färgvarianter och flera storlekar (till exempel kläder).

### Variant C: bara varianter

Produkterna har varianter (till exempel modeller) men ingen storleksdimension.

---

## När flödet inte ska användas

- Centra är master för produkterna
- Produkterna behöver rikt innehåll (bilder, SEO) som sköts bättre i Centra
- Produkterna ändras sällan och det går bra att uppdatera dem manuellt

---

**Relaterat:**
[Översikt](../overview.md) · [Lagersaldo](stock-update.md) · [Instruktioner](../../../../../how-to/web-connect/README.md)
