---
type: page
status: active
publish: true
title: "symbol-Element (MDN)"
description: "Quellennotiz zur MDN-Referenz von <symbol>: Vorlagen mit eigener viewBox, die erst über <use> erscheinen."
authors: []
publisher: "MDN Web Docs"
source_published: 
url: "https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/symbol"
archive_url:
source_kind: secondary
---

# symbol-Element (MDN)

## Quelle / bibliografische Angaben

MDN Web Docs, englische Fassung.

- Stand laut Seite: „last modified on Jul 1, 2025“
- URL: <https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/symbol>, abgerufen 2026-10-18 (über Firecrawl)


## Kurzfassung

`<symbol>` definiert eine Vorlage, die nur über `<use>` dargestellt wird.

## Kernaussagen

- Banner: Baseline widely available seit Juli 2015.
- Ein `<symbol>` selbst wird nicht gezeichnet, nur seine Instanzen. Manche Browser zeigen es auch dann nicht direkt an, wenn `display` es erlauben würde.
- Hat eigene `viewBox` und `preserveAspectRatio` (Standard `xMidYMid meet`), dazu `x`, `y`, `width`, `height`, `refX`, `refY`.
- Wiederverwendete Symbole geben dem Dokument Struktur, was laut MDN auch der Barrierefreiheit hilft.

## Verknüpftes Wissen

- [[svg/svg-icons|SVG-Icons barrierefrei einbinden]]

## Offene Fragen

- Keine.
