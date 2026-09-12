---
type: page
status: active
publish: true
title: "details-content Pseudo-Element (MDN)"
description: "Quellennotiz zur MDN-Referenz von ::details-content: den aufklappbaren Inhalt von details stylen und animieren."
authors: []
publisher: "MDN Web Docs"
source_published:
url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::details-content"
archive_url:
source_kind: secondary
---

# details-content Pseudo-Element (MDN)

## Quelle / bibliografische Angaben

MDN-Referenz „`::details-content` CSS pseudo-element“, englische Fassung. Dateiname ohne Doppelpunkte.

- Stand laut Seite: „last modified on Apr 17, 2026“
- URL: <https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::details-content>, abgerufen 2026-09-12 (über Firecrawl)

## Kurzfassung

`::details-content` steht für den auf- und zuklappbaren Inhalt eines `details`-Elements, also alles außer `summary`.

## Kernaussagen

- **Baseline laut Seite:** 2025, *newly available* seit September 2025.
- **Styling:** z. B. `details[open]::details-content { padding: 0.5em; border: thin solid grey; }`.
- **Transition-Beispiel:** `opacity` über 600 ms plus `content-visibility 600ms allow-discrete`. Beim Auf- und Zuklappen schaltet der Browser `content-visibility` zwischen `hidden` und `visible`; mit `allow-discrete` bleibt der Inhalt während der Transition sichtbar. Ergebnis: Einblenden beim Öffnen, Ausblenden beim Schließen.

## Eigene Einordnung

Löst das Problem aus [[quellen/artikel/height-auto-chrome|Animate to height auto (Chrome for Developers)]], dass eine Höhen-Transition an `details` nur beim Öffnen läuft. Das MDN-Beispiel animiert allerdings nur die Deckkraft, nicht die Höhe. Und: `::details-content` selbst ist Baseline, die Transition auf `content-visibility` gehört aber zum Feature „display animation“, das laut `web-features` 3.38.0 *limited* ist (Chrome 117, Safari 18, Firefox fehlt).

## Verknüpftes Wissen

- [[navigation/akkordeon|Akkordeon mit details bauen]]
- [[animation/ein-und-ausblenden|Ein- und Ausblenden mit CSS animieren]]
