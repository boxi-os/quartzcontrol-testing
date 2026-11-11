---
type: page
status: active
publish: true
title: "focus-within Pseudoklasse (MDN)"
description: "Quellennotiz zur MDN-Referenz von :focus-within: ein Element hervorheben, wenn es selbst oder etwas darin den Fokus hat."
authors: []
publisher: "MDN Web Docs"
source_published: 
url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:focus-within"
archive_url:
source_kind: secondary
---

# focus-within Pseudoklasse (MDN)

## Quelle / bibliografische Angaben

MDN-Referenz „`:focus-within` CSS pseudo-class“, englische Fassung. Dateiname ohne Doppelpunkt.

- Stand laut Seite: „last modified on Oct 14, 2026“
- URL: <https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:focus-within>, abgerufen 2026-10-18 (über Firecrawl)
- Ausgewertet: ganze Seite

## Kurzfassung

Trifft ein Element, wenn es selbst oder einer seiner Nachfahren den Fokus hat, auch Nachfahren in Shadow Trees.

## Kernaussagen

- Typischer Einsatz: ein ganzes Formular oder eine Gruppe hervorheben, solange ein Feld darin aktiv ist.
- Beispiel: `.group:focus-within` färbt eine Liste mit zwei Eingabefeldern ein.
- Banner: Baseline widely available, „available across browsers since January 2020“.

## Eigene Einordnung

`:focus-within` reagiert auf jeden Fokus, auch nach einem Mausklick. Wer nur Tastaturfokus will, nimmt `:has(:focus-visible)`. Das ist eine eigene Ableitung, nicht von MDN.

## Verknüpftes Wissen

- [[komponenten/fokusstile|Sichtbare Fokusstile]]
- [[komponenten/klickbare-karte|Ganze Karte klickbar machen]]

## Offene Fragen

- Keine.
