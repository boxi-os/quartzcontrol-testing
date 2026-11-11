---
type: page
status: active
publish: true
title: "nth-child() Pseudoklasse (MDN)"
description: "Quellennotiz zur MDN-Referenz von :nth-child(), mit Schwerpunkt auf der of-<selector>-Syntax."
authors: []
publisher: "MDN Web Docs"
source_published: 
url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:nth-child"
archive_url:
source_kind: secondary
---

# nth-child() Pseudoklasse (MDN)

## Quelle / bibliografische Angaben

MDN-Referenz „`:nth-child()` CSS pseudo-class“, englische Fassung. Dateiname ohne Doppelpunkt.

- Stand laut Seite: „last modified on Jul 17, 2026“
- URL: <https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:nth-child>, abgerufen 2026-10-18 (über Firecrawl)
- Ausgewertet: Syntax, „The of <selector> syntax“, Beispiele „of selector syntax vs selector nth-child“ und „Using of selector to fix striped tables“; die übrigen Beispiele nicht

## Kurzfassung

`:nth-child()` trifft Elemente nach ihrer Position unter den Geschwistern (1-basiert, Muster `An+B`, `odd`, `even`). Mit `of <selector>` werden nur die Geschwister gezählt, die zum Selektor passen.

## Kernaussagen

- `:nth-child(-n + 3 of li.important)` trifft die ersten drei `li.important`.
- Das ist etwas anderes als `li.important:nth-child(-n + 3)`: Das trifft nur `.important`-Einträge, die unter **allen** Geschwistern auf Position 1–3 stehen.
- **Zebrastreifen:** `tr:nth-child(even of :not([hidden]))` überspringt ausgeblendete Zeilen, sodass das Muster nicht kippt.
- **Support `of <selector>`** laut Kompatibilitätstabelle: Chrome 111, Firefox 113, Safari 9.

## Eigene Einordnung

Safari hatte die Syntax schon sehr früh, Chrome und Firefox erst 2023. Laut `web-features` 3.43.0 *widely available* seit 2025-11-09.

## Verknüpftes Wissen

- [[selektoren/nach-inhalt-auswaehlen|Elemente anhand ihres Inhalts auswählen]]
- [[selektoren/not-is-where|CSS-Pseudoklassen not(), is() und where()]]

## Offene Fragen

- Keine.
