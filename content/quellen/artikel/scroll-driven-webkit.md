---
type: page
status: active
publish: true
title: "A guide to Scroll-driven Animations with just CSS (WebKit)"
description: "Quellennotiz zum WebKit-Leitfaden für Scroll-getriebene Animationen mit scroll(), view() und animation-range."
authors:
  - "Saron Yitbarek"
publisher: "WebKit"
source_published: "2025-06-20"
url: "https://webkit.org/blog/17101/a-guide-to-scroll-driven-animations-with-just-css/"
archive_url:
source_kind: secondary
---

# A guide to Scroll-driven Animations with just CSS (WebKit)

## Quelle / bibliografische Angaben

Beitrag im WebKit-Blog.

- Autorin: Saron Yitbarek
- Veröffentlicht: 20. Juni 2025
- URL: <https://webkit.org/blog/17101/a-guide-to-scroll-driven-animations-with-just-css/>, abgerufen 2026-09-12 (über Firecrawl)

## Kurzfassung

Scroll-getriebene Animationen bestehen aus Ziel, Keyframes und Zeitleiste. Die Zeitleiste folgt nicht der Zeit, sondern dem Scrollen (`scroll()`) oder der Sichtbarkeit eines Elements im Viewport (`view()`).

## Kernaussagen

- **Anlass:** in Safari 26 beta verfügbar.
- **Drei Teile:** Ziel, Keyframes, Zeitleiste. Die Standard-Zeitleiste ist die zeitbasierte Document Timeline. `animation-timeline` kam mit CSS Animations Level 2 (Juni 2023).
- **`scroll()`:** Fortschritt folgt dem Scrollen. Beispiel: Fortschrittsbalken als `footer::after`, `position: fixed`, `transform-origin: top left`, `animation: grow-progress linear` mit `scaleX(0)` → `scaleX(1)` und `animation-timeline: scroll()`.
- **Reihenfolge:** `animation-timeline` muss **nach** `animation` stehen, sonst funktioniert es nicht.
- **`view()`:** Fortschritt folgt dem Durchlaufen des Elements durch den Viewport. Beispiel: Bilder gleiten von rechts herein und werden sichtbar.
- **`animation-range`:** Standard 0 % (erstes Pixel tritt ein) bis 100 % (letztes Pixel verlässt den Viewport). Mit `animation-range: 0% 50%` ist das Bild zur Hälfte des Viewports am Ziel und bleibt dann ruhig.
- **Parameter:** Scroller `nearest` (Standard), `root`, `self`; Achse `block` (Standard), `inline`, `x`, `y`.
- **Bewegungsempfindlichkeit:** Kleine, langsame Bewegung wie ein Fortschrittsbalken löst selten Beschwerden aus. Große Animationen, die Bewegung im Raum simulieren (Parallax, Zoom, Tiefenunschärfe), eher. Im Zweifel in `@media not (prefers-reduced-motion)` legen – beim Bilderbeispiel getan.

## Eigene Einordnung

Gut aufgebaute Einführung aus Sicht eines Browserherstellers. Der Grund für die Reihenfolge wird nicht genannt: Die Kurzschreibweise `animation` setzt `animation-timeline` auf den Standardwert zurück. Das ist eigene Erklärung, nicht an der Spezifikation geprüft, in Chrome 152 aber bestätigt: Nach der Kurzschreibweise ist `animation-timeline` wieder `auto`. Firefox fehlt laut `web-features` 3.38.0 weiterhin; das Feature ist *limited*.

## Verknüpftes Wissen

- [[animation/scroll-getriebene-animationen|Scroll-getriebene Animationen]]
- [[animation/barrierearme-animationen|Barrierearme Animationen]]
