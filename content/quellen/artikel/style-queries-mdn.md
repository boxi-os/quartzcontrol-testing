---
type: page
status: active
publish: true
title: "Container Size und Style Queries (MDN)"
description: "Quellennotiz zum MDN-Leitfaden über Size und Style Queries: Containment gegen Endlosschleifen, style() mit Custom Properties, Vergleichssyntax."
authors: []
publisher: "MDN Web Docs"
source_published: 
url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_size_and_style_queries"
archive_url:
source_kind: secondary
---

# Container Size und Style Queries (MDN)

## Quelle / bibliografische Angaben

MDN-Leitfaden „Using container size and style queries“, englische Fassung.

- Stand laut Seite: „last modified on Oct 14, 2026“
- URL: <https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_size_and_style_queries>, abgerufen 2026-10-18 (über Firecrawl)
- Ausgewertet: ganze Seite

## Kurzfassung

Vertieft Size Queries, Containernamen und vor allem Style Queries mit `style()`.

## Kernaussagen

- Fünf Arten von Container Queries: Size, Style, Name-only, Scroll-State, Anchored.
- **Warum Containment:** Size-Container bekommen Containment, weil es sonst zu teuer wäre, ständig die Größe jedes Elements abzufragen, und weil Styles im Inneren die Größe des Containers ändern und so eine Endlosschleife auslösen könnten.
- Abfragbare Größenmerkmale: `width`, `height`, `inline-size`, `block-size`, `aspect-ratio`, `orientation`. Die Logik (`and`, `or`, `not`, Bereichssyntax) ist dieselbe wie bei `@media`.
- Ohne Namen trifft eine Query nur den **nächsten** Container-Vorfahren. Ein Element darf mehrere Namen haben (`container-name: wide narrow`). Namen unterscheiden Groß- und Kleinschreibung.
- **Style Queries:** Jedes Element ist automatisch ein Style-Container, `container-type` ist nicht nötig. Bisher funktionieren nur Custom Properties in `style()`, normale Eigenschaften wie `style(font-weight: bold)` unterstützt laut Seite noch kein Browser.
- `style(--x)` ohne Wert ist bei nicht registrierten Properties immer wahr, sobald sie gesetzt sind. Bei mit `@property` registrierten ist es nur wahr, wenn der Wert vom `initial-value` abweicht.
- `style(--x: blue)` vergleicht den berechneten Wert. `#00f` passt nur dann auf `blue`, wenn die Property mit `syntax: "<color>"` registriert ist.
- **Zwei Vergleichsformen:** `style(--n: 3)` vergleicht Text, `calc(6/2)` ist dann nicht `3`. `style(--n = 3)` vergleicht Zahlen und rechnet `calc()` aus. Auch Bereiche gehen: `style(0 < --n < 10)`. Für Schlüsselwörter wie `--theme: dark` nimmt man die Doppelpunkt-Form.
- Container Queries lassen sich verschachteln, dann müssen alle Bedingungen zutreffen.

## Eigene Einordnung

- Kleiner Fehler auf der Seite: Zur Query `(10em <= width <= 20em)` heißt es im Text „between `10em` and `30em`“. Gemeint sind 20em.
- Der Satz „At the time of this writing (February 2024)“ steht noch im Text, obwohl die Seite 2026 aktualisiert wurde. Die Aussage zu Custom Properties gilt laut Seite aber weiterhin.
- Die Vergleichsform mit `=` und `<` taucht in `web-features` 3.43.0 nicht als eigener Eintrag auf. Wie gut die Browser sie unterstützen, ist hier nicht geprüft.

## Verknüpftes Wissen

- [[grundlagen/container-queries|Container Queries]]
- [[grundlagen/variablen|CSS Custom Properties]]

## Offene Fragen

- Welche Browser die Vergleichsform `style(--n = 3)` schon können.
