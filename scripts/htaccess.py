"""Lägger in omdirigeringarna för BetterDocs kategori- och taggsidor i WordPress .htaccess.

Blocket står mellan två markeringar före WordPress-blocket och byts ut helt vid
varje körning, så att filen aldrig får dubbla regler. Resten av filen rörs inte.

    python3 scripts/htaccess.py <htaccess> <regler>
"""
import re
import sys

BORJAN = "# BEGIN CombineIT docs (docs-general)"
SLUT = "# END CombineIT docs (docs-general)"

htaccess, regelfil = sys.argv[1], sys.argv[2]
text = open(htaccess, encoding="utf-8").read()
regler = [r for r in open(regelfil, encoding="utf-8").read().splitlines() if r.startswith("RewriteRule ")]

# Säkerhetskontroll: bara exakta docs-category- och docs-tag-adresser får finnas
for r in regler:
    if not re.fullmatch(r"RewriteRule \^docs-(category|tag)/[a-z0-9/-]+/\?\$ /docs/([a-z0-9/-]*/)? \[R=301,L\]", r):
        sys.exit(f"Otillåten regel, avbryter: {r}")
if not regler:
    sys.exit("Inga regler hittades, avbryter")

block = "\n".join([
    BORJAN,
    "# Gamla kategori- och taggsidor från BetterDocs till nya combineit.se/docs.",
    "# Genereras av docs-general. Ändra inte här, ändra adresser/gamla-adresser.csv.",
    "<IfModule mod_rewrite.c>",
    "RewriteEngine On",
    "RewriteBase /",
    *regler,
    "</IfModule>",
    SLUT,
])

if BORJAN in text:
    text = re.sub(re.escape(BORJAN) + r".*?" + re.escape(SLUT), lambda _: block, text, flags=re.S)
elif "# BEGIN WordPress" in text:
    text = text.replace("# BEGIN WordPress", block + "\n\n# BEGIN WordPress", 1)
else:
    sys.exit("Hittar inte '# BEGIN WordPress' i .htaccess, avbryter")

open(htaccess, "w", encoding="utf-8").write(text)
print(f"{len(regler)} regler inlagda")
