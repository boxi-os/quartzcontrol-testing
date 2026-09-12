---
type: page
status: active
publish: true
title: "Technique C39 prefers-reduced-motion (W3C WCAG)"
description: "Quellennotiz zur WCAG-Technik C39: Bewegung per prefers-reduced-motion abschaltbar machen."
authors: []
publisher: "W3C Web Accessibility Initiative (WAI), WCAG 2.2 Techniques"
source_published:
url: "https://www.w3.org/WAI/WCAG22/Techniques/css/C39"
archive_url:
source_kind: primary
---

# Technique C39 prefers-reduced-motion (W3C WCAG)

## Quelle / bibliografische Angaben

W3C WAI, WCAG 2.2 Techniques, „Technique C39: Using the CSS `prefers-reduced-motion` query to prevent motion“.

- URL: <https://www.w3.org/WAI/WCAG22/Techniques/css/C39>, abgerufen 2026-09-12 (über Firecrawl)
- Datum im erfassten Text nicht angegeben

## Dokumentart und Kontext

Eine WCAG-Technik ist ein Beispiel, wie ein Erfolgskriterium erfüllt werden kann. Techniken sind laut Seite **nicht verpflichtend**. C39 gilt als ausreichende Technik („Sufficient“) für [[quellen/dokumente/wcag-2-3-3|SC 2.3.3 Animation from Interactions]] und betrifft Bewegung, die durch Nutzerinteraktion ausgelöst wird.

## Kurzfassung

Mit der Media Query `prefers-reduced-motion` respektiert CSS die Einstellung „Bewegung reduzieren“ des Betriebssystems oder Browsers und schaltet Bewegung für Nutzer ab, die das wünschen.

## Kernaussagen mit Fundstellen

- Manche Menschen reagieren auf animierte Inhalte mit Ablenkung oder Übelkeit. Bewegen sich beim Scrollen Elemente über die eigentliche Scrollbewegung hinaus, kann das vestibuläre Störungen auslösen (Description).
- Beispiel 1 zeigt zwei Richtungen:
  - Bewegung definieren und in `@media (prefers-reduced-motion: reduce)` abschalten.
  - Umgekehrt statische Stile als Standard und Bewegung nur in `@media (prefers-reduced-motion: no-preference)`.
- Test: Einstellung aktivieren, dann prüfen, ob die Animation entweder essenziell ist oder unterdrückt wird (Tests).

## Eigene Einordnung

Die umgekehrte Richtung – statisch zuerst, Bewegung nur bei `no-preference` – ist robuster, weil eine vergessene Regel dann zu weniger statt zu mehr Bewegung führt. Das ist eigene Einordnung, die Technik nennt beide Wege gleichrangig.

## Verknüpftes Wissen

- [[animation/barrierearme-animationen|Barrierearme Animationen]]
- [[quellen/artikel/prefers-reduced-motion-webdev|prefers-reduced-motion – Sometimes less movement is more (web.dev)]]
