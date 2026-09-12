---
type: page
status: active
publish: true
title: "starting-style At-Regel (MDN)"
description: "Quellennotiz zur MDN-Referenz von @starting-style: Startwerte für Transitions beim ersten Rendern und aus display: none."
authors: []
publisher: "MDN Web Docs"
source_published:
url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@starting-style"
archive_url:
source_kind: secondary
---

# starting-style At-Regel (MDN)

## Quelle / bibliografische Angaben

MDN-Referenz „`@starting-style` CSS at-rule“, englische Fassung. Dateiname ohne `@`.

- Stand laut Seite: „last modified on Apr 20, 2026“
- URL: <https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@starting-style>, abgerufen 2026-09-12 (über Firecrawl)
- Ausgewertet: Einleitung, Syntax, Beschreibung, „When exactly are starting styles used?“; die Beispiele nicht

## Kurzfassung

`@starting-style` liefert Startwerte für eine Transition, wenn ein Element zum ersten Mal Stile erhält – beim ersten Rendern oder beim Wechsel aus `display: none`.

## Kernaussagen

- **Baseline laut Seite:** 2024, *newly available* seit August 2024.
- **Warum:** Transitions starten standardmäßig nicht beim ersten Style-Update eines Elements und nicht, wenn `display` von `none` wechselt.
- **Einsatz:** Ein- und Ausblendeffekte für Top-Layer-Elemente (Popover, modale Dialoge), Elemente mit `display: none` und neu ins DOM eingefügte oder entfernte Elemente.
- **Nur für Transitions:** Mit CSS-Animationen ist `@starting-style` nicht nötig.
- **Zwei Schreibweisen:** als eigener Block mit Regelsätzen oder verschachtelt in der ursprünglichen Regel.
- **Reihenfolge:** Block und ursprüngliche Regel haben dieselbe Spezifität. Der Block muss **nach** der ursprünglichen Regel stehen, sonst überschreibt diese die Startwerte.
- **Drei Zustände:** Startzustand, Übergangsziel (offen) und Standardzustand. Beim Schließen geht es nicht zurück zum Startzustand, sondern zum Standardzustand. Ein- und Ausblenden können sich daher unterscheiden.

## Eigene Einordnung

Der Reihenfolge-Hinweis ist die häufigste Fehlerquelle. Laut `web-features` 3.38.0 funktioniert `@starting-style` in allen großen Browsern; das Verzögern von `display: none` beim Ausblenden aber nicht in Firefox (Feature „display animation“ *limited*). Verschachtelt stellt sich das Problem nicht, dafür geht die Verschachtelung nicht mit Pseudoelementen wie `::backdrop` (siehe [[quellen/artikel/popover-api-mdn|Using the Popover API (MDN)]]).

## Verknüpftes Wissen

- [[animation/ein-und-ausblenden|Ein- und Ausblenden mit CSS animieren]]
- [[quellen/artikel/entry-exit-animations-chrome|Four new CSS features for smooth entry and exit animations (Chrome for Developers)]]
