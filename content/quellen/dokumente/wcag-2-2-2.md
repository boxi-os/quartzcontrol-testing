---
type: page
status: active
publish: true
title: "Understanding SC 2.2.2 Pause, Stop, Hide (W3C WCAG)"
description: "Quellennotiz zum WCAG-Erfolgskriterium 2.2.2: automatisch startende Bewegung über fünf Sekunden braucht Pause, Stopp oder Ausblenden."
authors: []
publisher: "W3C Web Accessibility Initiative (WAI), Understanding WCAG 2.2"
source_published:
url: "https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html"
archive_url:
source_kind: primary
---

# Understanding SC 2.2.2 Pause, Stop, Hide (W3C WCAG)

## Quelle / bibliografische Angaben

W3C WAI, „Understanding SC 2.2.2: Pause, Stop, Hide (Level A)“.

- URL: <https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html>, abgerufen 2026-09-12 (über Firecrawl)
- Datum im erfassten Text nicht angegeben
- Ausgewertet wurde nur der Wortlaut des Kriteriums, nicht die Beispiele und Techniken der Seite

## Dokumentart und Kontext

Erläuterungsdokument zu einem Erfolgskriterium der WCAG 2.2, Stufe **A** – also Teil jeder Konformitätsstufe.

## Kurzfassung

Bewegte, blinkende, scrollende oder sich selbst aktualisierende Inhalte, die automatisch starten, brauchen einen Mechanismus zum Anhalten, Stoppen oder Ausblenden.

## Kernaussagen mit Fundstellen

- **Bewegen, Blinken, Scrollen:** Startet solche Information automatisch, dauert sie länger als **fünf Sekunden** und steht sie parallel zu anderem Inhalt, muss es einen Mechanismus zum Pausieren, Stoppen oder Ausblenden geben – außer die Bewegung ist essenziell (Success Criterion).
- **Automatische Aktualisierung:** Startet sie automatisch und steht parallel zu anderem Inhalt, muss sie sich pausieren, stoppen, ausblenden oder in der Frequenz steuern lassen (Success Criterion).

## Eigene Einordnung

Relevant für automatisch laufende Karussells, Laufschriften und Endlos-Keyframe-Animationen (`animation-iteration-count: infinite`). `prefers-reduced-motion` allein erfüllt das Kriterium nicht zwingend, weil es eine Systemeinstellung voraussetzt, die nicht jeder kennt. Das ist eigene Einordnung, auf der ausgewerteten Seite nicht so formuliert.

## Verknüpftes Wissen

- [[animation/barrierearme-animationen|Barrierearme Animationen]]
- [[quellen/dokumente/wcag-2-3-3|Understanding SC 2.3.3 Animation from Interactions (W3C WCAG)]]
