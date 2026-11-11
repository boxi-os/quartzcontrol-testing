---
type: page
status: active
publish: true
title: "SVG als Bild (MDN)"
description: "Quellennotiz zum MDN-Leitfaden „SVG as an image“: wo SVG als Bildquelle dient und welche Einschränkungen dann gelten."
authors: []
publisher: "MDN Web Docs"
source_published: 
url: "https://developer.mozilla.org/en-US/docs/Web/SVG/Guides/SVG_as_an_image"
archive_url:
source_kind: secondary
---

# SVG als Bild (MDN)

## Quelle / bibliografische Angaben

MDN Web Docs, englische Fassung.

- Stand laut Seite: „last modified on May 13, 2025“
- URL: <https://developer.mozilla.org/en-US/docs/Web/SVG/Guides/SVG_as_an_image>, abgerufen 2026-10-18 (über Firecrawl)


## Kurzfassung

Listet die Stellen, an denen SVG als Bild verwendet werden kann, und die Einschränkungen dabei.

## Kernaussagen

- SVG als Bild geht in `<img>`, CSS `background-image`, `list-style-image`, `content`, SVG `<image>`/`<feImage>` und Canvas `drawImage`.
- Als Bild gelten Einschränkungen: kein JavaScript, keine externen Ressourcen (außer als `data:`-URL), keine `:visited`-Styles, kein Styling der Bedienelemente nach Betriebssystem.
- Diese Einschränkungen gelten nicht, wenn das SVG direkt aufgerufen oder per `<iframe>`, `<object>` oder `<embed>` eingebunden wird.

## Eigene Einordnung

Nicht auf der Seite, aber in Chrome 155 beobachtet (2026-10-18): Das CSS der Seite erreicht ein SVG in `<img>` nicht. Ein `@media (prefers-color-scheme: dark)` im SVG selbst greift dagegen. Es richtet sich nach `color-scheme` am `<img>` bzw. auf der Seite: Bei `color-scheme: light` bleibt das SVG hell, auch wenn das System dunkel eingestellt ist.

## Verknüpftes Wissen

- [[svg/svg-code|SVG-Code verstehen]]

## Offene Fragen

- Keine.
