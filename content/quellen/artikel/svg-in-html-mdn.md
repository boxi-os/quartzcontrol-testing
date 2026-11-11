---
type: page
status: active
publish: true
title: "SVG in HTML (MDN)"
description: "Quellennotiz zum MDN-Leitfaden für Inline-SVG: viewBox, preserveAspectRatio, role=img, title, desc und aria-labelledby."
authors: []
publisher: "MDN Web Docs"
source_published: 
url: "https://developer.mozilla.org/en-US/docs/Web/SVG/Guides/SVG_in_HTML"
archive_url:
source_kind: secondary
---

# SVG in HTML (MDN)

## Quelle / bibliografische Angaben

MDN Web Docs, englische Fassung.

- Stand laut Seite: „last modified on Jul 30, 2026“
- URL: <https://developer.mozilla.org/en-US/docs/Web/SVG/Guides/SVG_in_HTML>, abgerufen 2026-10-18 (über Firecrawl)


## Kurzfassung

Zeigt ein Inline-SVG und wie man es zugänglich macht.

## Kernaussagen

- Für Inline-SVG fügt man den kompletten SVG-Code ins HTML ein.
- `role="img"` sorgt dafür, dass assistive Technologien das SVG als Bild behandeln.
- `<title>` liefert den kurzen zugänglichen Namen. Er wird nicht angezeigt, kann aber als Tooltip erscheinen, und sollte das erste Kind von `<svg>` sein.
- `<desc>` liefert eine längere Beschreibung, ebenfalls unsichtbar.
- Inline-SVG kennt kein `alt`. Gibt es sichtbaren Text, verweist man mit `aria-labelledby` darauf, sonst auf die `id` des `<title>`.
- MDN nimmt Titel und Beschreibung zusammen in `aria-labelledby` auf, weil das besser unterstützt sei als `aria-describedby`.

## Verknüpftes Wissen

- [[svg/svg-icons|SVG-Icons barrierefrei einbinden]]
- [[svg/svg-code|SVG-Code verstehen]]

## Offene Fragen

- Keine.
