---
type: page
status: active
publish: true
title: "CSS scroll-state() (Chrome for Developers)"
description: "Quellennotiz zum Chrome-Artikel über Scroll-State-Container-Queries: stuck, snapped, scrollable."
authors:
  - "Adam Argyle"
publisher: "Chrome for Developers"
source_published: "2025-01-15"
url: "https://developer.chrome.com/blog/css-scroll-state-queries"
archive_url:
source_kind: secondary
---

# CSS scroll-state() (Chrome for Developers)

## Quelle / bibliografische Angaben

Blogartikel auf Chrome for Developers.

- Autor: Adam Argyle
- Veröffentlicht: 15. Januar 2025 („Published: Jan 15, 2025“)
- URL: <https://developer.chrome.com/blog/css-scroll-state-queries>, abgerufen 2026-09-12 (über Firecrawl)
- Ausgewertet: Überblick, erste Abfrage, Progressive Enhancement, Abschnitt „Stuck“; Snapped und Scrollable nur überflogen

## Kurzfassung

Ab Chrome 133 lassen sich browserverwaltete Scroll-Zustände – angedockt (`stuck`), eingerastet (`snapped`), scrollbar (`scrollable`) – per Container Query abfragen, ohne JavaScript.

## Kernaussagen

- **Schritt 1:** Das Element, dessen Zustand abgefragt wird, erhält `container-type: scroll-state` (beim Sticky-Fall das sticky Element selbst).
- **Schritt 2:** Ein **Kindelement** reagiert per `@container scroll-state(stuck: top) { … }`. Wie bei Container Queries kann es nicht dasselbe Element sein.
- **Progressive Enhancement:** `@supports (container-type: scroll-state)` um die Abfrage legen.
- **Bewegung:** Animationen, die über Scroll-State-Queries laufen, in `@media (prefers-reduced-motion: no-preference)` legen.
- **Anwendungsfall:** Navigationsleiste bekommt einen `box-shadow`, sobald sie oben andockt.
- Zwischen Scroll-getriebenen Animationen und Scroll-State-Queries gebe es „unerforschtes Terrain“: welche Technik für welchen Effekt besser passt, müsse sich noch zeigen.

## Eigene Einordnung

Herstellerartikel zur eigenen Implementierung. Laut `web-features` 3.38.0 gibt es Scroll-State-Queries weiterhin nur in Chromium (ab 133), also nur als Zusatz einsetzen.

## Verknüpftes Wissen

- [[navigation/sticky-header|Sticky-Header einrichten]]
- [[animation/scroll-getriebene-animationen|Scroll-getriebene Animationen]]
