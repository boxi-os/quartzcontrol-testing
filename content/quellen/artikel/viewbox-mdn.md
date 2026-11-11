---
type: page
status: active
publish: true
title: "viewBox Attribut (MDN)"
description: "Quellennotiz zur MDN-Referenz des viewBox-Attributs: vier Zahlen, die das Koordinatensystem auf den Viewport abbilden."
authors: []
publisher: "MDN Web Docs"
source_published: 
url: "https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/viewBox"
archive_url:
source_kind: secondary
---

# viewBox Attribut (MDN)

## Quelle / bibliografische Angaben

MDN Web Docs, englische Fassung.

- Stand laut Seite: „last modified on Apr 7, 2026“
- URL: <https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/viewBox>, abgerufen 2026-10-18 (über Firecrawl)


## Kurzfassung

Referenz für das Attribut, das das innere Koordinatensystem eines SVG festlegt.

## Kernaussagen

- Vier Zahlen: `min-x min-y width height`, getrennt durch Leerzeichen oder Kommas.
- Der so beschriebene Ausschnitt wird auf den Viewport des SVG-Elements abgebildet (nicht auf das Browserfenster).
- Gilt für `<svg>`, `<symbol>`, `<marker>`, `<pattern>` und `<view>`.
- Beispiel: dieselben Formen in `viewBox="0 0 100 100"`, `"0 0 10 10"` und `"-5 -5 10 10"` sehen völlig unterschiedlich aus.
- `width` oder `height` von 0 oder kleiner schalten die Darstellung ab.

## Verknüpftes Wissen

- [[svg/svg-code|SVG-Code verstehen]]
- [[quellen/artikel/preserveaspectratio-mdn|preserveAspectRatio Attribut (MDN)]]

## Offene Fragen

- Keine.
