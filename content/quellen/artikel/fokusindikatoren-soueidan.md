---
type: page
status: active
publish: true
title: "A guide to designing accessible, WCAG-conformant focus indicators (Sara Soueidan)"
description: "Quellennotiz zu Sara Soueidans Leitfaden für Fokusindikatoren: WCAG-Anforderungen, zweifarbiger Fokusring, Forced Colors."
authors: 
  - "Sara Soueidan"
publisher: "sarasoueidan.com"
source_published: "2021-08-13"
url: "https://www.sarasoueidan.com/blog/focus-indicators/"
archive_url:
source_kind: secondary
---

# A guide to designing accessible, WCAG-conformant focus indicators (Sara Soueidan)

## Quelle / bibliografische Angaben

Sara Soueidan: „A guide to designing accessible, WCAG-conformant focus indicators“.

- Veröffentlicht laut Seite: 2021-08-13, „Last updated on 27 Aug, 2023“
- URL: <https://www.sarasoueidan.com/blog/focus-indicators/>, abgerufen 2026-10-18 (über Firecrawl)
- Ausgewertet: Abschnitte zu WCAG-Anforderungen, „A ‘universal’ focus indicator“, „Showing the focus indicator only for keyboard users“

## Kurzfassung

Ausführlicher Leitfaden, wie ein Fokusindikator aussehen muss, damit er WCAG 2.1 und 2.2 erfüllt, mit einem universellen Muster.

## Kernaussagen

- Der Fokusindikator ist für Tastaturnutzer das, was für Mausnutzer der Mauszeiger ist.
- **Universeller Fokusring:** zwei Ringe in Schwarz und Weiß, damit er auf jedem Hintergrund sichtbar ist. Weil `outline` nur eine Farbe kann, kombiniert sie `outline: 3px solid black` mit `box-shadow: 0 0 0 6px white`. Der Schatten ist 6px breit, weil die Outline 3px davon überdeckt.
- Bei dunklen Komponenten die Farben tauschen.
- Variante „Oreo“ nach Erik Kroes: `outline: 9px double black` plus weißer `box-shadow`.
- **Forced Colors (z. B. Windows-Kontrastmodus):** `outline` bleibt erhalten, `box-shadow` und Hintergrundfarben werden durch Systemfarben ersetzt. Ein Fokusindikator nur aus `box-shadow` verschwindet dort.
- Für ältere Browser ohne `:focus-visible` zeigt sie das Muster `:focus:not(:focus-visible)` von Patrick Lauke, um Fokusstile für Mausnutzer zurückzunehmen.

## Eigene Einordnung

- Soueidan schreibt, `:focus-visible` greife nur bei *Tastaturfokus*. MDN beschreibt es genauer als Heuristik des Browsers: Textfelder zeigen den Fokus auch nach einem Mausklick, siehe [[quellen/artikel/focus-visible-mdn|focus-visible Pseudoklasse (MDN)]].
- Der Abschnitt zur Abwärtskompatibilität ist bei Baseline *widely available* seit 2024-09-14 nicht mehr nötig.

## Verknüpftes Wissen

- [[komponenten/fokusstile|Sichtbare Fokusstile]]

## Offene Fragen

- Keine.
