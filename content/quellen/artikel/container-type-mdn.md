---
type: page
status: active
publish: true
title: "container-type CSS-Eigenschaft (MDN)"
description: "Quellennotiz zur MDN-Referenz von container-type: Werte, Size Containment und warum Container ohne Größe zusammenfallen."
authors: []
publisher: "MDN Web Docs"
source_published: 
url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/container-type"
archive_url:
source_kind: secondary
---

# container-type CSS-Eigenschaft (MDN)

## Quelle / bibliografische Angaben

MDN-Referenz „`container-type` CSS property“, englische Fassung.

- Stand laut Seite: „last modified on Oct 16, 2026“
- URL: <https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/container-type>, abgerufen 2026-10-18 (über Firecrawl)
- Ausgewertet: Syntax, Values, Description, erstes Beispiel

## Kurzfassung

Referenz der Eigenschaft, die ein Element zum Query-Container macht.

## Kernaussagen

- Werte: `normal`, `size`, `inline-size`, `scroll-state`, `anchored`. Zwei Werte gehen nur in der Kombination `scroll-state` plus `size` oder `inline-size`.
- `size` und `inline-size` schalten Size Containment ein: Das Element ermittelt seine Größe in der betreffenden Richtung **ohne Rücksicht auf seinen Inhalt**.
- Deshalb muss die Größe von außen kommen, etwa weil ein Blockelement die volle Breite einnimmt, oder sie muss ausdrücklich gesetzt sein. Sonst fällt das Element zusammen.
- `scroll-state` und `anchored` setzen kein Containment.
- Wird `container-type` nicht gesetzt, taugt das Element trotzdem für Style Queries und Name-only Queries.
- Banner: Baseline widely available, „available across browsers since February 2023“, mit Hinweis, dass Teile unterschiedlich unterstützt werden.

## Eigene Einordnung

Das Zusammenfallen betrifft in der Praxis vor allem `size`: Die Höhe eines Blocks ergibt sich normalerweise aus dem Inhalt, und genau den ignoriert `size`. Deshalb nimmt man fast immer `inline-size`.

## Verknüpftes Wissen

- [[grundlagen/container-queries|Container Queries]]
- [[quellen/artikel/container-queries-comeau|A Friendly Introduction to Container Queries (Josh W. Comeau)]]

## Offene Fragen

- Keine.
