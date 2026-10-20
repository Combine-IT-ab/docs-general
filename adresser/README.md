# Gamla adresser

`gamla-adresser.csv` listar alla adresser som www.combineit.se/docs svarar på i dag (BetterDocs i WordPress). Varje adress ska fortsätta fungera när dokumentationen flyttas hit.

Listan togs fram 20 oktober 2026 från sajtens sitemap, WordPress API och Wayback Machine.

| Typ | Antal | Hur adressen behålls |
|---|---|---|
| `start` | 1 | `/docs/` blir startsidan i den nya dokumentationen. |
| `sida` | 39 | Den nya dokumentationen har en sida på exakt samma adress. |
| `kategori` | 12 | `/docs-category/...` ligger utanför `/docs`. Omdirigeras med 301 i WordPress `.htaccess` vid bytet. |
| `tagg` | 33 | `/docs-tag/...` ligger utanför `/docs`. Omdirigeras med 301 i WordPress `.htaccess` vid bytet. |

Kolumnen `mal` är filen i repot som adressen ska visa eller leda till. Tom betyder att sidan inte finns här än.

## Kontrollen

```sh
python3 adresser/kolla.py            # alla mål finns som filer, tomma mål ger varning
python3 adresser/kolla.py --strikt   # tomma mål stoppar också, körs före publicering
python3 adresser/kolla.py --bygge dist/docs   # varje /docs/-adress finns i bygget
```

Kontrollen körs på varje pull request. Ändras eller tas en sida bort ska listan uppdateras i samma pull request. En adress tas aldrig bort ur listan.
