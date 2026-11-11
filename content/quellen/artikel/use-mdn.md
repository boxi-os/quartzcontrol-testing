---
type: page
status: active
publish: true
title: "use-Element (MDN)"
description: "Quellennotiz zur MDN-Referenz von <use>: Elemente wiederverwenden, Shadow-Klon, Attribute, Geometry Properties, externe Dateien."
authors: []
publisher: "MDN Web Docs"
source_published: 
url: "https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/use"
archive_url:
source_kind: secondary
---

# use-Element (MDN)

## Quelle / bibliografische Angaben

MDN Web Docs, englische Fassung.

- Stand laut Seite: „last modified on Aug 14, 2026“
- URL: <https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/use>, abgerufen 2026-10-18 (über Firecrawl)


## Kurzfassung

`<use>` kopiert Elemente an eine andere Stelle, als wären sie in ein verstecktes DOM geklont.

## Kernaussagen

- Banner: Baseline widely available seit Juli 2015, mit Hinweis auf Teile mit unterschiedlicher Unterstützung.
- `href` zeigt auf das Original. `xlink:href` ist seit SVG 2 veraltet. Sind beide da, gilt `href`.
- `width` und `height` wirken nur, wenn das Ziel ein `<svg>` oder `<symbol>` (also mit `viewBox`) ist.
- Seit SVG 2 sind `x`, `y`, `width`, `height` **Geometry Properties** und lassen sich auch per CSS setzen.
- Die meisten Attribute am `<use>` werden ignoriert, wenn das Original sie schon setzt. Nur `x`, `y`, `width`, `height` und `href` gelten immer.
- Die Klone sind nicht im DOM sichtbar. CSS-Eigenschaften werden in den Klon nur sicher übertragen, wenn sie vererbt werden.
- Browser können Verweise auf fremde Origins blockieren, eine Cross-Origin-Regelung gibt es nicht.
- Externe Dateien gehen: `href="icons.svg#stern"`. Ohne Fragment das ganze Dokument zu laden, ist experimentell (laut Tabelle Chrome 137, nicht Firefox und Safari).

## Verknüpftes Wissen

- [[svg/svg-gestalten|SVG mit CSS gestalten]]
- [[svg/svg-icons|SVG-Icons barrierefrei einbinden]]

## Offene Fragen

- Keine.
