---
type: page
status: active
publish: true
title: "Attributselektoren (MDN)"
description: "Quellennotiz zur MDN-Referenz der Attributselektoren: alle Operatoren und das i-Flag."
authors: []
publisher: "MDN Web Docs"
source_published: 
url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Attribute_selectors"
archive_url:
source_kind: secondary
---

# Attributselektoren (MDN)

## Quelle / bibliografische Angaben

MDN-Referenz „Attribute selectors“, englische Fassung.

- Stand laut Seite: „last modified on Sep 4, 2026“
- URL: <https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Attribute_selectors>, abgerufen 2026-10-18 (über Firecrawl)
- Ausgewertet: Syntax mit allen Operatoren; Beispiele nicht

## Kurzfassung

Attributselektoren treffen Elemente nach dem Vorhandensein oder dem Wert eines Attributs.

## Kernaussagen

- `[attr]` — Attribut vorhanden
- `[attr=value]` — Wert genau `value`
- `[attr~=value]` — Leerzeichen-getrennte Liste enthält das Wort `value`
- `[attr|=value]` — genau `value` oder beginnt mit `value-`; typisch für Sprachcodes
- `[attr^=value]` — beginnt mit `value`
- `[attr$=value]` — endet mit `value`
- `[attr*=value]` — enthält `value` irgendwo
- `[attr operator value i]` — Vergleich ohne Beachtung von Groß-/Kleinschreibung (ASCII)

## Eigene Einordnung

Im Zusammenspiel mit `:has()` deutlich nützlicher als früher, etwa um einen Container nach dem Dateityp eines enthaltenen Links zu stylen.

## Verknüpftes Wissen

- [[selektoren/nach-inhalt-auswaehlen|Elemente anhand ihres Inhalts auswählen]]

## Offene Fragen

- Das `s`-Flag (Groß-/Kleinschreibung erzwingen) wird auf der Seite ebenfalls behandelt, ist hier aber nicht ausgewertet.
