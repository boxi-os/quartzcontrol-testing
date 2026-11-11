---
type: page
status: active
publish: true
title: "SVG-Koordinatensystem (MDN)"
description: "Quellennotiz zum MDN-Tutorial „Positions“: Koordinatensystem, User Units und wie viewBox sie auf CSS-Pixel abbildet."
authors: []
publisher: "MDN Web Docs"
source_published: 
url: "https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch/Positions"
archive_url:
source_kind: secondary
---

# SVG-Koordinatensystem (MDN)

## Quelle / bibliografische Angaben

MDN Web Docs, englische Fassung.

- Stand laut Seite: „last modified on Jul 24, 2026“
- URL: <https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch/Positions>, abgerufen 2026-10-18 (über Firecrawl)


## Kurzfassung

Erklärt, wie SVG Positionen und Größen angibt.

## Kernaussagen

- Der Ursprung (0,0) liegt oben links, x wächst nach rechts, y **nach unten**, wie bei HTML und Canvas.
- Zahlen ohne Einheit in Attributen wie `x`, `y`, `width`, `height` sind **User Units**.
- Ohne `viewBox` entspricht eine User Unit einem CSS-Pixel. `viewBox` kann das umrechnen.
- Beispiel: `<svg width="200" height="200" viewBox="0 0 100 100">`. Ein `rect` mit 40 × 40 User Units erscheint als 80 × 80 CSS-Pixel.
- Absolute Einheiten wie `cm`, `mm`, `pt` sind erlaubt und werden umgerechnet.

## Verknüpftes Wissen

- [[svg/svg-code|SVG-Code verstehen]]
- [[quellen/artikel/viewbox-mdn|viewBox Attribut (MDN)]]

## Offene Fragen

- Keine.
