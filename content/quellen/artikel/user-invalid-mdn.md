---
type: page
status: active
publish: true
title: "user-invalid Pseudoklasse (MDN)"
description: "Quellennotiz zur MDN-Referenz von :user-invalid: ungültige Formularfelder erst nach einer Interaktion markieren."
authors: []
publisher: "MDN Web Docs"
source_published: 
url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:user-invalid"
archive_url:
source_kind: secondary
---

# user-invalid Pseudoklasse (MDN)

## Quelle / bibliografische Angaben

MDN-Referenz „`:user-invalid` CSS pseudo-class“, englische Fassung. Dateiname ohne Doppelpunkt.

- Stand laut Seite: „last modified on Oct 14, 2026“
- URL: <https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:user-invalid>, abgerufen 2026-10-18 (über Firecrawl)
- Ausgewertet: ganze Seite

## Kurzfassung

Wie `:invalid`, aber erst nachdem die Person mit dem Feld etwas gemacht hat.

## Kernaussagen

- Trifft Formularfelder, deren Wert gegen die Validierungsregeln verstößt (`:invalid`, `:out-of-range` oder leer trotz `required`), **nach** einer Interaktion.
- Nach einem Absendeversuch trifft es auch Felder, die noch niemand angefasst hat, bis die Person das Feld wieder bearbeitet.
- Beispiel: roter Rahmen und ein ✖ per `input:user-invalid + span::before`.
- Banner: Baseline widely available, „available across browsers since November 2023“. Kompatibilität: Chrome/Edge 119, Firefox 88, Safari 16.5.

## Eigene Einordnung

Die genauen Regeln, wann die Interaktion als abgeschlossen gilt, stehen ausführlicher auf [[quellen/artikel/user-valid-mdn|user-valid Pseudoklasse (MDN)]].

## Verknüpftes Wissen

- [[komponenten/formularfehler|Formularfehler erst nach der Eingabe anzeigen]]

## Offene Fragen

- Keine.
