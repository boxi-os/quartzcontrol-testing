---
type: page
status: active
publish: true
title: "not() Pseudoklasse (MDN)"
description: "Quellennotiz zur MDN-Referenz der Negations-Pseudoklasse :not(): Selektorlisten, Spezifität, typische Fehlschlüsse."
authors: []
publisher: "MDN Web Docs"
source_published: 
url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:not"
archive_url:
source_kind: secondary
---

# not() Pseudoklasse (MDN)

## Quelle / bibliografische Angaben

MDN-Referenz „`:not()` CSS pseudo-class“, englische Fassung. Dateiname ohne Doppelpunkt.

- Stand laut Seite: „last modified on Sep 10, 2026“
- URL: <https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:not>, abgerufen 2026-10-18 (über Firecrawl)
- Ausgewertet: Syntax, Parameters, Description, beide Beispiele

## Kurzfassung

`:not()` trifft Elemente, die zu keinem Selektor der übergebenen Liste passen. Die Seite listet ausdrücklich mehrere „quirks, tricks, and unexpected results“.

## Kernaussagen

- **Argument:** eine kommagetrennte Selektorliste; einfache, zusammengesetzte und komplexe Selektoren sind erlaubt, Pseudoelemente nicht.
- **Spezifität:** die des spezifischsten Selektors im Argument, wie bei `:not(:is(argument))`. `#foo:not(#bar)` trifft dasselbe wie `#foo`, zählt aber wie zwei IDs.
- **Trifft viel:** `:not(.foo)` passt auch auf `<html>` und `<body>`.
- **Nachfahren-Falle:** `body :not(table) a` trifft auch Links in Tabellen, weil `tr`, `td` usw. den `:not(table)`-Teil erfüllen. Richtig: `body a:not(table a)`.
- **Liste:** `:not(.foo, .bar)` entspricht `:not(.foo):not(.bar)`.
- **Nicht fehlertolerant:** Ein ungültiger oder unbekannter Selektor im Argument macht die ganze Regel ungültig. Absichern mit `:not(:is(…))`, weil `:is()` eine fehlertolerante Liste nimmt.
- **Baseline-Hinweis oben auf der Seite:** „available across browsers since July 2015“.

## Eigene Einordnung

Die Baseline-Angabe 2015 gilt für die alte Form mit einem einzelnen Selektor. Die Listenform ist laut `web-features` 3.43.0 erst seit 2021 überall verfügbar (Chrome 88, Firefox 84, Safari 9). Die Seite unterscheidet das oben nicht, nur in der Kompatibilitätstabelle.

## Verknüpftes Wissen

- [[selektoren/not-is-where|CSS-Pseudoklassen not(), is() und where()]]
- [[quellen/artikel/is-mdn|is() Pseudoklasse (MDN)]]

## Offene Fragen

- Keine.
