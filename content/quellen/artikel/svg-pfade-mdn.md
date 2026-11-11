---
type: page
status: active
publish: true
title: "SVG-Pfade (MDN)"
description: "Quellennotiz zum MDN-Tutorial „Paths“: die Befehle im d-Attribut, absolut und relativ, Linien, Bézierkurven und Bögen."
authors: []
publisher: "MDN Web Docs"
source_published: 
url: "https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch/Paths"
archive_url:
source_kind: secondary
---

# SVG-Pfade (MDN)

## Quelle / bibliografische Angaben

MDN Web Docs, englische Fassung.

- Stand laut Seite: „last modified on Aug 31, 2026“
- URL: <https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch/Paths>, abgerufen 2026-10-18 (über Firecrawl)


## Kurzfassung

Erklärt die Befehlssprache im Attribut `d` von `<path>`.

## Kernaussagen

- Jeder Befehl ist ein Buchstabe mit Zahlen dahinter. **Großbuchstabe = absolute Koordinaten, Kleinbuchstabe = relativ** zum letzten Punkt.
- Die Zahlen in `d` haben nie eine Einheit, es sind User Units.
- Linien: `M` (bewegen ohne zu zeichnen), `L` (Linie), `H` (waagerecht), `V` (senkrecht), `Z` (Pfad schließen, groß und klein gleich).
- Mehrere Koordinatenpaare nach `M` zeichnen ab dem zweiten Paar Linien: `M 10 10 90 10` entspricht `M 10 10 L 90 10`.
- Kurven: `C` (kubische Bézierkurve mit zwei Kontrollpunkten), `S` (Fortsetzung davon), `Q` (quadratisch, ein Kontrollpunkt), `T` (Fortsetzung) und `A` (Ellipsenbogen mit `rx ry Drehung large-arc-flag sweep-flag x y`).
- Pfade von Hand zu schreiben empfiehlt MDN nicht. Man sollte sie aber lesen können, um Darstellungsfehler zu finden.
- Zwischen `path` und `polygon`/`polyline` gibt es keinen nennenswerten Performance-Unterschied.

## Verknüpftes Wissen

- [[svg/svg-code|SVG-Code verstehen]]

## Offene Fragen

- Keine.
