"""Kontrollerar att varje intern länk i bygget pekar på en fil som finns.

    python3 scripts/kolla_lankar.py dist /docs
"""
import os
import re
import sys
from pathlib import Path

bygge, bas = Path(sys.argv[1]), sys.argv[2].rstrip("/")
fel = {}
for sida in bygge.rglob("*.html"):
    for lank in re.findall(r'(?:href|src)="(' + re.escape(bas) + r'/[^"#?]*)"', sida.read_text(errors="ignore")):
        mal = bygge / lank[len(bas) + 1:]
        if not (mal.is_file() or (mal / "index.html").is_file()):
            fel.setdefault(lank, set()).add(str(sida.relative_to(bygge)))
for lank, sidor in sorted(fel.items()):
    print(f"::error::{lank} finns inte, länkas från {len(sidor)} sidor, till exempel {sorted(sidor)[0]}")
print(f"{len(fel)} trasiga interna länkar")
sys.exit(1 if fel else 0)
