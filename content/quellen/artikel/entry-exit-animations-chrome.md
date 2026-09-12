---
type: page
status: active
publish: true
title: "Four new CSS features for smooth entry and exit animations (Chrome for Developers)"
description: "Quellennotiz zum Chrome-Artikel über display in Keyframes, transition-behavior, @starting-style und overlay."
authors:
  - "Una Kravets"
  - "Joey Arhar"
publisher: "Chrome for Developers"
source_published:
url: "https://developer.chrome.com/blog/entry-exit-animations"
archive_url:
source_kind: secondary
---

# Four new CSS features for smooth entry and exit animations (Chrome for Developers)

## Quelle / bibliografische Angaben

Blogartikel auf Chrome for Developers.

- Autoren laut Seite: Una Kravets, Joey Arhar
- Stand laut Seite: „Last updated 2023-08-16“; ein separates Veröffentlichungsdatum steht im erfassten Text nicht
- URL: <https://developer.chrome.com/blog/entry-exit-animations>, abgerufen 2026-09-12 (über Firecrawl)
- Ausgewertet: Einleitung, „Display animations in keyframes“, Beginn von „Transitioning discrete properties“

## Kurzfassung

Chrome 116 und 117 brachten vier Bausteine, um Elemente beim Erscheinen und Verschwinden – auch in den und aus dem Top Layer – flüssig zu animieren.

## Kernaussagen

- **Die vier Bausteine laut Artikel:**
  - `display` und `content-visibility` in Keyframes (ab Chrome 116)
  - `transition-behavior: allow-discrete` für diskrete Eigenschaften (ab 117)
  - `@starting-style` für Eintrittseffekte aus `display: none` und in den Top Layer (ab 117)
  - `overlay` zur Steuerung des Top-Layer-Verhaltens während einer Animation (ab 117)
- **Keyframes:** `display: none` im letzten Keyframe wechselt zu diesem Zeitpunkt. `forwards` hält den Endzustand (`opacity: 0`, `display: none`).
- **Mehrstufig:** Komplexe Ausblendeffekte (Drehung, Farbverschiebung, dann Ausblenden) gehen nur mit Keyframes, nicht mit Transitions. Auslöser ist typischerweise eine per JavaScript gesetzte Klasse. Wer den DOM-Knoten danach entfernen will, wartet das Animationsende ab.
- **`transition-behavior`:** `normal` (Standard) startet Transitions nur für interpolierbare Eigenschaften, `allow-discrete` auch für diskrete.

## Eigene Einordnung

Herstellerartikel von 2023 mit Chrome-Versionen. Für die heutige Verfügbarkeit gilt `web-features` 3.38.0: `@starting-style` und `transition-behavior` sind seit 2024-08-06 Baseline *newly available*, **`overlay` aber weiterhin nur in Chromium**. Und: `display` und `content-visibility` in Keyframes oder Transitions (Feature „display animation“) sind *limited* – Chrome 117, Safari 18, Firefox fehlt. `transition-behavior` gibt es in Firefox also, nur eben nicht für `display`.

## Verknüpftes Wissen

- [[animation/ein-und-ausblenden|Ein- und Ausblenden mit CSS animieren]]
- [[animation/transitions-und-keyframes|CSS-Transitions und Keyframe-Animationen]]
