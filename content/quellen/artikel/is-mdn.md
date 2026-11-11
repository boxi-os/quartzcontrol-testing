---
type: page
status: active
publish: true
title: "is() Pseudoklasse (MDN)"
description: "Quellennotiz zur MDN-Referenz von :is(): Selektorlisten bündeln, fehlertolerante Liste, keine Pseudoelemente."
authors: []
publisher: "MDN Web Docs"
source_published: 
url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:is"
archive_url:
source_kind: secondary
---

# is() Pseudoklasse (MDN)

## Quelle / bibliografische Angaben

MDN-Referenz „`:is()` CSS pseudo-class“, englische Fassung. Dateiname ohne Doppelpunkt.

- Stand laut Seite: „last modified on May 27, 2026“
- URL: <https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:is>, abgerufen 2026-10-18 (über Firecrawl)
- Ausgewertet: Syntax, Unterschied zu `:where()`, Forgiving Selector Parsing, alle Beispiele

## Kurzfassung

`:is()` nimmt eine Selektorliste und trifft jedes Element, das zu einem der Selektoren passt. Damit lassen sich lange Selektorlisten stark verkürzen.

## Kernaussagen

- **Spezifität:** die des spezifischsten Arguments. Einziger Unterschied zu `:where()`, das immer 0 hat.
- **Fehlertolerant:** Ein ungültiger oder nicht unterstützter Selektor in der Liste wird ignoriert, der Rest gilt. Eine normale Selektorliste würde komplett verworfen.
- **Beispiel Listen:** 18 Kombinationen wie `ol ol ul, ol ul ul, …` werden zu `:is(ol, ul, menu) :is(ol, ul, menu) :is(ul, menu)`.
- **Beispiel Überschriften:** `:is(section, article, aside, nav) h1` je Verschachtelungsebene statt exponentiell wachsender Listen.
- **Keine Pseudoelemente:** `el:is(::before, ::after)` funktioniert nicht; stattdessen klassische Liste.

## Eigene Einordnung

Klar und vollständig für den Alltag. Die Spezifitätsfalle bei gemischten Listen (eine ID hebt alles an) wird nur indirekt über den Vergleich mit `:where()` deutlich.

## Verknüpftes Wissen

- [[selektoren/not-is-where|CSS-Pseudoklassen not(), is() und where()]]
- [[quellen/artikel/where-mdn|where() Pseudoklasse (MDN)]]

## Offene Fragen

- Keine.
