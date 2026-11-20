"""Kontrollerar att varje länk med #ankare i bygget pekar på ett id som finns.  python3 kolla_ankare.py dist /docs"""
import re, sys
from pathlib import Path
from urllib.parse import unquote
bygge, bas = Path(sys.argv[1]), sys.argv[2].rstrip("/")
ids = {}
def idn(fil):
    if fil not in ids: ids[fil] = set(re.findall(r'\sid="([^"]+)"', fil.read_text(errors="ignore")))
    return ids[fil]
fel = []
for sida in bygge.rglob("*.html"):
    for vag, ankare in re.findall(r'href="(' + re.escape(bas) + r'/[^"#?]*|)#([^"]+)"', sida.read_text(errors="ignore")):
        mal = sida if not vag else bygge / vag[len(bas) + 1:] / "index.html"
        if mal.is_file() and unquote(ankare) not in idn(mal) and ankare != "_top":
            fel.append(f"{sida.relative_to(bygge)}: #{unquote(ankare)} finns inte i {mal.relative_to(bygge)}")
for f in fel: print(f"::error::{f}")
print(f"{len(fel)} trasiga ankare")
sys.exit(1 if fel else 0)
