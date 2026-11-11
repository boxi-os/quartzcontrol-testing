---
type: page
status: active
publish: true
title: "Contextually Marking up accessible images and SVGs (Scott O'Hara)"
description: "Quellennotiz zu Scott O'Haras Test von Markup-Mustern für zugängliche Bilder und SVGs, auch in Links und Buttons (2019, aktualisiert 2021)."
authors: 
  - "Scott O'Hara"
publisher: "scottohara.me"
source_published: "2019-05-22"
url: "https://www.scottohara.me/blog/2019/05/22/contextual-images-svgs-and-a11y.html"
archive_url:
source_kind: secondary
---

# Contextually Marking up accessible images and SVGs (Scott O'Hara)

## Quelle / bibliografische Angaben

Scott O'Hara: „Contextually Marking up accessible images and SVGs“.

- Veröffentlicht 2019-05-22, aktualisiert 2021-09-03 (laut Seite)
- URL: <https://www.scottohara.me/blog/2019/05/22/contextual-images-svgs-and-a11y.html>, abgerufen 2026-10-18 (über Firecrawl)
- Ausgewertet: ganzer Text; die verlinkten Testergebnisse nicht

## Kurzfassung

Testet, welche Markup-Muster Bildern und SVGs in verschiedenen Browser-Screenreader-Kombinationen zuverlässig einen Namen geben.

## Kernaussagen

- Getestet mit VoiceOver (macOS, iOS), Narrator, NVDA, JAWS und TalkBack in verschiedenen Browsern.
- **SVG mit Information:** `<svg role="img" focusable="false">` mit `<title>` als erstem Kind war am robustesten. Ohne Tooltip geht `aria-label` statt `<title>`.
- Bei `<use>` darin: `aria-hidden="true"` an `<use>`, damit Screenreader nichts doppelt oder Unerwünschtes ansagen.
- Exportierte SVGs haben oft nutzlose Titel wie „Created by Sketch“. Die gehören bereinigt.
- **Dekoratives SVG:** `aria-hidden="true"`. `focusable="false"` war nur nötig, damit der Internet Explorer nicht mit Tab hineinspringt.
- Manche Screenreader sagen ein SVG ohne Rolle und Namen als leere „Gruppe“ an. Deshalb dekorative SVGs immer mit `aria-hidden` verstecken.
- **In Links und Buttons:** Ein SVG mit `role="img"` und Namen hatte dort je nach Kombination Lücken. Am zuverlässigsten ist es, das SVG dekorativ zu behandeln und den Namen anders zu liefern: sichtbarer oder visuell versteckter Text, oder `aria-label` am Button bzw. Link.

## Eigene Einordnung

Einige Probleme betrafen den Internet Explorer und das alte Edge, die heute keine Rolle mehr spielen. Das Grundmuster (SVG in Bedienelementen dekorativ, Name am Bedienelement) ist davon unabhängig. In Chrome 155 (2026-10-18) waren Inline-SVGs auch ohne `focusable="false"` nicht per Tab erreichbar.

## Verknüpftes Wissen

- [[svg/svg-icons|SVG-Icons barrierefrei einbinden]]

## Offene Fragen

- Aktuelle Testergebnisse mit heutigen Screenreadern.
