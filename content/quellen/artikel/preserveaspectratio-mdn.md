---
type: page
status: active
publish: true
title: "preserveAspectRatio Attribut (MDN)"
description: "Quellennotiz zur MDN-Referenz von preserveAspectRatio: Ausrichtung und meet/slice, wenn viewBox und Viewport unterschiedlich proportioniert sind."
authors: []
publisher: "MDN Web Docs"
source_published: 
url: "https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/preserveAspectRatio"
archive_url:
source_kind: secondary
---

# preserveAspectRatio Attribut (MDN)

## Quelle / bibliografische Angaben

MDN Web Docs, englische Fassung.

- Stand laut Seite: „last modified on Apr 7, 2026“
- URL: <https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/preserveAspectRatio>, abgerufen 2026-10-18 (über Firecrawl)


## Kurzfassung

Legt fest, wie ein SVG mit `viewBox` in einen anders proportionierten Platz passt.

## Kernaussagen

- Ohne `viewBox` wirkt das Attribut nicht (Ausnahme: `<image>`).
- Wert: Ausrichtung plus optional `meet` oder `slice`. Standard ist `xMidYMid meet`.
- Ausrichtung: `xMin`/`xMid`/`xMax` kombiniert mit `YMin`/`YMid`/`YMax`, also neun Möglichkeiten. `none` verzerrt die Grafik, bis sie genau passt.
- `meet`: Die ganze Grafik ist sichtbar, so groß wie möglich. Es bleibt eventuell Rand (wie `object-fit: contain`).
- `slice`: Der ganze Platz ist bedeckt, die Grafik wird eventuell abgeschnitten (wie `object-fit: cover`).

## Eigene Einordnung

Die Vergleiche mit `object-fit` sind meine eigenen, MDN zieht sie nicht.

## Verknüpftes Wissen

- [[svg/svg-code|SVG-Code verstehen]]

## Offene Fragen

- Keine.
