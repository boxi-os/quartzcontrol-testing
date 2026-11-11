---
type: page
status: active
publish: true
title: "where() Pseudoklasse (MDN)"
description: "Quellennotiz zur MDN-Referenz von :where(): wie :is(), aber mit Spezifität 0."
authors: []
publisher: "MDN Web Docs"
source_published: 
url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:where"
archive_url:
source_kind: secondary
---

# where() Pseudoklasse (MDN)

## Quelle / bibliografische Angaben

MDN-Referenz „`:where()` CSS pseudo-class“, englische Fassung. Dateiname ohne Doppelpunkt.

- Stand laut Seite: „last modified on Apr 17, 2026“
- URL: <https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:where>, abgerufen 2026-10-18 (über Firecrawl)
- Ausgewertet: Syntax, Forgiving Selector Parsing, Beispiel „Comparing :where() and :is()“

## Kurzfassung

`:where()` funktioniert wie `:is()`, hat aber immer die Spezifität 0. Dadurch lassen sich Regeln später mit einfachen Selektoren überschreiben.

## Kernaussagen

- **Spezifität 0**, unabhängig vom Inhalt der Liste.
- **Fehlertolerant** wie `:is()`.
- **Beispiel:** Links in `section`, `aside` und `footer` mit Klassen einfärben. Mit `:is(…)` kann `footer a` die Farbe nicht mehr überschreiben, weil die Klassen mitzählen; mit `:where(…)` schon.

## Eigene Einordnung

Im Syntaxblock steht `<complex-selector-list>`, im Text wird die Liste als fehlertolerant beschrieben. Das ist ein kleiner Widerspruch auf der Seite; maßgeblich für die Praxis ist die Fehlertoleranz, die die Seite ausdrücklich beschreibt. Nicht am Spezifikationstext geprüft.

## Verknüpftes Wissen

- [[selektoren/not-is-where|CSS-Pseudoklassen not(), is() und where()]]
- [[quellen/artikel/is-mdn|is() Pseudoklasse (MDN)]]

## Offene Fragen

- Ob `:where()` laut aktueller Spezifikation eine `<forgiving-selector-list>` oder `<complex-selector-list>` nimmt, ist hier nicht geklärt.
