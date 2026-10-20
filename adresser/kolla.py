"""Kontrollerar att alla gamla adresser under combineit.se/docs har ett mål.

Utan flaggor: varje mål i gamla-adresser.csv ska finnas som fil i repot.
Adresser utan mål är tillåtna men listas som varningar.

--strikt: adresser utan mål stoppar också. Används före publicering.

--bygge KATALOG: kontrollerar det byggda resultatet i stället. Varje gammal
adress under /docs/ ska finnas som KATALOG/<slug>/index.html, där KATALOG
motsvarar /docs/ på sajten. Kategori- och taggsidor ligger utanför /docs och
omdirigeras i WordPress, så de kontrolleras inte här.
"""

import argparse
import csv
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
LISTA = REPO / "adresser" / "gamla-adresser.csv"


def main():
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--strikt", action="store_true")
    parser.add_argument("--bygge", type=Path)
    args = parser.parse_args()

    with LISTA.open(newline="") as f:
        rader = list(csv.DictReader(f))

    fel, varningar = [], []
    for rad in rader:
        adress, mal = rad["gammal_adress"], rad["mal"]
        if args.bygge:
            if not adress.startswith("/docs/"):
                continue
            sida = args.bygge / adress.removeprefix("/docs/") / "index.html"
            if not sida.is_file():
                fel.append(f"{adress} saknas i bygget ({sida})")
        elif not mal:
            (fel if args.strikt else varningar).append(f"{adress} har inget mål: {rad['kommentar']}")
        elif not (REPO / mal).is_file():
            fel.append(f"{adress} pekar på {mal}, som inte finns")

    for v in varningar:
        print(f"::warning::{v}")
    for e in fel:
        print(f"::error::{e}")
    print(f"{len(rader)} adresser, {len(fel)} fel, {len(varningar)} varningar")
    sys.exit(1 if fel else 0)


if __name__ == "__main__":
    main()
