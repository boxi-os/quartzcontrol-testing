---
type: page
status: active
publish: true
title: "Selecting previous siblings with CSS has() (Tobias Ahlin)"
description: "Quellennotiz zu Tobias Ahlins Artikel über das Auswählen vorheriger Geschwister mit :has()."
authors:
  - "Tobias Ahlin"
publisher: "tobiasahlin.com"
source_published: 
url: "https://tobiasahlin.com/blog/previous-sibling-css-has/"
archive_url:
source_kind: secondary
---

# Selecting previous siblings with CSS has() (Tobias Ahlin)

## Quelle / bibliografische Angaben

Kurzer Blogartikel auf der Website von Tobias Ahlin. Doppelpunkt im Dateinamen weggelassen.

- Datum laut Seite: „09/03/2023“. Ob 9. März oder 3. September gemeint ist, geht aus der Seite nicht hervor; darum `source_published` leer.
- URL: <https://tobiasahlin.com/blog/previous-sibling-css-has/>, abgerufen 2026-10-18 (über Firecrawl)
- Vollständig ausgewertet

## Kurzfassung

Mit `:has()` und den Geschwister-Kombinatoren `+` und `~` lassen sich Elemente auswählen, die **vor** einem anderen stehen.

## Kernaussagen

- `.box:has(+ .circle)` — direkter Vorgänger
- `.box:has(+ * + .circle)` — zwei Positionen davor; beliebig verlängerbar
- `.box:has(~ .circle)` — alle Vorgänger
- `.box:has(~ * + .circle)` — alle Vorgänger außer dem direkten
- Lesehilfe: erst alle `.box` nehmen, dann auf die filtern, die zum Muster „ich + … + Kreis“ passen.

## Eigene Einordnung

Der Support-Absatz ist veraltet: Firefox hatte `:has()` zum Zeitpunkt nur hinter einem Flag; seit Firefox 121 (Dezember 2023) ist es regulär verfügbar, laut `web-features` 3.43.0 Baseline *widely available* seit 2026-06-19.

## Verknüpftes Wissen

- [[selektoren/nach-inhalt-auswaehlen|Elemente anhand ihres Inhalts auswählen]]
- [[selektoren/has|CSS-Pseudoklasse has()]]

## Offene Fragen

- Genaues Veröffentlichungsdatum.
