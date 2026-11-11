---
type: page
status: active
publish: true
title: "user-valid Pseudoklasse (MDN)"
description: "Quellennotiz zur MDN-Referenz von :user-valid, mit den genauen Regeln, wann der Browser nach einer Eingabe neu prüft."
authors: []
publisher: "MDN Web Docs"
source_published: 
url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:user-valid"
archive_url:
source_kind: secondary
---

# user-valid Pseudoklasse (MDN)

## Quelle / bibliografische Angaben

MDN-Referenz „`:user-valid` CSS pseudo-class“, englische Fassung. Dateiname ohne Doppelpunkt.

- Stand laut Seite: „last modified on Oct 14, 2026“
- URL: <https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:user-valid>, abgerufen 2026-10-18 (über Firecrawl)
- Ausgewertet: ganze Seite

## Kurzfassung

Wie `:valid`, aber erst nach einer Interaktion. Die Seite beschreibt genauer als die zu `:user-invalid`, wann die Prüfung greift.

## Kernaussagen

Die Pseudoklasse greift, wenn das Feld gültig ist und eines davon passiert ist:

- Die Person hat den Wert geändert und die Änderung abgeschlossen, zum Beispiel indem sie das Feld verlassen hat.
- Die Person hat versucht, das Formular abzuschicken, auch ohne das Feld zu ändern.
- Der Wert war beim Fokussieren ungültig, und die Person hat ihn gültig gemacht. Das zählt sofort, auch wenn der Fokus noch im Feld ist.

Danach prüft der Browser bei jedem Tastendruck neu. Das Ergebnis:

- War das Feld anfangs gültig, ändert sich die Darstellung erst, wenn die Person das Feld verlässt.
- Korrigiert die Person einen markierten Fehler, verschwindet die Markierung sofort.
- Pflichtfelder gelten erst als ungültig, wenn sie geändert wurden oder ein Absendeversuch stattfand.

Banner und Kompatibilität wie bei `:user-invalid`: seit November 2023 in allen Browsern, Chrome/Edge 119, Firefox 88, Safari 16.5.

## Eigene Einordnung

Genau dieses Verhalten musste man früher mit JavaScript nachbauen: erst nach dem Verlassen schimpfen, beim Korrigieren aber sofort Entwarnung geben.

## Verknüpftes Wissen

- [[komponenten/formularfehler|Formularfehler erst nach der Eingabe anzeigen]]
- [[quellen/artikel/user-invalid-mdn|user-invalid Pseudoklasse (MDN)]]

## Offene Fragen

- Keine.
