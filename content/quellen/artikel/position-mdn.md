---
type: page
status: active
publish: true
title: "position CSS-Eigenschaft (MDN)"
description: "Quellennotiz zur MDN-Referenz von position, ausgewertet mit Schwerpunkt auf sticky."
authors: []
publisher: "MDN Web Docs"
source_published:
url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position"
archive_url:
source_kind: secondary
---

# position CSS-Eigenschaft (MDN)

## Quelle / bibliografische Angaben

MDN-Referenz „`position` CSS property“, englische Fassung.

- Stand laut Seite: „last modified on Jul 26, 2026“
- URL: <https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position>, abgerufen 2026-09-12 (über Firecrawl)
- Ausgewertet mit Schwerpunkt auf `sticky`; `relative`, `absolute` und `fixed` nur überflogen

## Kurzfassung

`position: sticky` verhält sich wie `relative`, bis das Element beim Scrollen eine Schwelle erreicht, und bleibt dann „kleben“, bis es an den gegenüberliegenden Rand seines Containing Blocks stößt.

## Kernaussagen

- **Definition:** Ein sticky positioniertes Element wird relativ positioniert behandelt, bis sein Containing Block eine Schwelle (etwa `top` ungleich `auto`) innerhalb seines Scroll-Containers überschreitet. Dann gilt es als „stuck“, bis es den gegenüberliegenden Rand seines Containing Blocks erreicht.
- **Schwelle Pflicht:** Mindestens eine der Eigenschaften `top`, `right`, `bottom` oder `left` muss gesetzt sein, sonst ist `sticky` nicht von `relative` zu unterscheiden.
- **Stapelkontext:** `sticky` erzeugt immer einen neuen Stacking Context.
- **Overflow-Falle:** Ein sticky Element klebt am nächsten Vorfahren mit „Scroll-Mechanismus“ – den erzeugt `overflow: hidden`, `scroll`, `auto` oder `overlay` –, auch wenn dieser Vorfahr gar nicht tatsächlich scrollt.
- **Barrierefreiheit und Performance:** Sticky oder fixed Inhalte müssen beim Scrollen neu gezeichnet werden. Schafft das Gerät keine 60 fps, entsteht Ruckeln, das auch für empfindliche Menschen problematisch ist. MDN schlägt `will-change: transform` vor, um das Element auf eine eigene Ebene zu legen.
- **Beispiel:** alphabetische Liste mit sticky Überschriften, die jeweils von der nächsten Überschrift abgelöst werden.

## Eigene Einordnung

Die Overflow-Falle ist in der Praxis der häufigste Grund, warum `sticky` „nicht funktioniert“. Der `will-change`-Tipp steht in Spannung zu [[quellen/artikel/performante-animationen-webdev|web.dev]], das `will-change` nur für Elemente empfiehlt, die sich tatsächlich bald ändern. Gemessen ist hier nichts.

## Verknüpftes Wissen

- [[navigation/sticky-header|Sticky-Header einrichten]]
