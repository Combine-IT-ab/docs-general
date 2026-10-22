# docs-general

Källan till CombineIT:s produktdokumentation på [www.combineit.se/docs](https://www.combineit.se/docs/). Repot är publikt: inga kunduppgifter här.

## Skriva

- Sidorna ligger som Markdown i `docs/`. Den första rubriken (`# ...`) blir sidans titel.
- Länka till andra sidor med relativa länkar till `.md`-filen. Bygget gör om dem till rätt adress.
- Bilder läggs i `docs/assets/bilder/`.
- Diagram skrivs som Mermaid (```` ```mermaid ````) och ritas när sajten byggs.
- Ny sida syns i menyn först när den finns i `meny.yml`.
- Integrationssidor följer mallen i `mallar/`.
- Adressen till en sida i `adresser/gamla-adresser.csv` ändras aldrig.

## Bygga lokalt

```sh
npm ci
npm run dev      # http://localhost:4321/docs/
npm run build    # bygger till dist/
python3 adresser/kolla.py --strikt --bygge dist
```

Bygget är Astro Starlight. `scripts/forbered.mjs` gör om `docs/` till sidor i `src/content/docs/` (genereras, checkas inte in). Designen ligger i `src/styles/tema.css` och komponenterna i `src/components/`.

## Publicering

| Flöde | När | Vad |
|---|---|---|
| Bygg dokumentationen | Varje pull request och merge till main | Bygger, kontrollerar adresserna och lägger förhandsvisningen på [www.combineit.se/docs-preview/](https://www.combineit.se/docs-preview/) (noindex) |
| Publicera till combineit.se/docs | Startas för hand, skriv PUBLICERA | Bygger, laddar upp till en ny mapp och byter in den på /docs |
| Backa publiceringen | Startas för hand, skriv BACKA | Lägger tillbaka föregående version |

Kategori- och taggadresserna från BetterDocs ligger utanför /docs. Deras 301-regler skrivs till `dist-wordpress/htaccess-docs.txt` vid bygget och läggs in i WordPress `.htaccess` vid bytet.
