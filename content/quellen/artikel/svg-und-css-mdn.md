---
type: page
status: active
publish: true
title: "SVG und CSS (MDN)"
description: "Quellennotiz zum MDN-Tutorial „SVG and CSS“: Demo mit Stylesheet, Hinweise zu use, Custom Properties und :hover."
authors: []
publisher: "MDN Web Docs"
source_published: 
url: "https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch/SVG_and_CSS"
archive_url:
source_kind: secondary
---

# SVG und CSS (MDN)

## Quelle / bibliografische Angaben

MDN Web Docs, englische Fassung.

- Stand laut Seite: „last modified on Aug 3, 2026“
- URL: <https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch/SVG_and_CSS>, abgerufen 2026-10-18 (über Firecrawl)


## Kurzfassung

Eine Demo (Blume aus Pfaden), die komplett per Stylesheet gefärbt wird, mit Hinweisen zu `<use>`.

## Kernaussagen

- Ein SVG-Dokument kann ein Stylesheet per `<link>` (im XHTML-Namensraum) oder per `@import` in `<style>` einbinden.
- SVG hat eigene CSS-Eigenschaften, manche ähneln denen für HTML.
- Elemente, die über `<use>` eingefügt werden, erben die Styles vom `<use>`-Element. Um sie unterschiedlich zu stylen, soll man **Custom Properties** verwenden.
- `:hover` und komplexere Selektoren auf Elementen, die über `<use>` eingefügt werden, unterstützen laut Seite „nur wenige Browser“. Das Verhalten ist in der Arbeitsgruppe noch in Diskussion.

## Eigene Einordnung

In Chrome 155 reagierte ein Element im `<use>`-Klon auf `:hover` (Regel `#symbol path:hover`, getestet am 2026-10-18). Firefox und Safari habe ich nicht geprüft.

## Verknüpftes Wissen

- [[svg/svg-gestalten|SVG mit CSS gestalten]]

## Offene Fragen

- Welche Browser `:hover` im `<use>`-Klon unterstützen.
