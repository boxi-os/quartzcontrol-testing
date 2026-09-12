---
type: page
status: active
publish: true
title: "linear() CSS-Funktion (MDN)"
description: "Quellennotiz zur MDN-Referenz der Easing-Funktion linear() mit Stützpunkten."
authors: []
publisher: "MDN Web Docs"
source_published:
url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/easing-function/linear"
archive_url:
source_kind: secondary
---

# linear() CSS-Funktion (MDN)

## Quelle / bibliografische Angaben

MDN-Referenz „`linear()` CSS function“, englische Fassung.

- Stand laut Seite: „last modified on Apr 18, 2026“
- URL: <https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/easing-function/linear>, abgerufen 2026-09-12 (über Firecrawl)
- Ausgewertet: Einleitung, Syntax, Parameter, Anfang der Beschreibung

## Kurzfassung

`linear()` ist eine Easing-Funktion aus Stützpunkten. Zwischen den Punkten wird linear interpoliert; mit vielen Punkten lassen sich beliebige Kurven annähern.

## Kernaussagen

- **Baseline laut Seite:** *Widely available*, browserübergreifend seit Dezember 2023.
- **Syntax:** `linear(0, 1)`, `linear(0, 0.25, 1)`, `linear(0, 0.25 75%, 1)`, `linear(0, 0.5 25% 75%, 1)`.
- **Parameter:** mindestens zwei Zahlen; `0` = Anfang, `1` = Ende, Werte außerhalb von 0–1 sind erlaubt. Optional ein oder zwei Prozentwerte je Punkt (außer erstem und letztem), die festlegen, wann bzw. von wann bis wann der Wert erreicht ist. Ohne Prozente werden die Punkte gleichmäßig verteilt.
- **Typische Nutzung:** viele Punkte, um eine Kurve anzunähern.

## Eigene Einordnung

Werte außerhalb von 0–1 machen Überschwinger und Federeffekte möglich, die mit `cubic-bezier()` nur eingeschränkt gehen. Das ist eigene Einordnung; die Seite zeigt im ausgewerteten Teil keine solchen Beispiele.

## Verknüpftes Wissen

- [[animation/transitions-und-keyframes|CSS-Transitions und Keyframe-Animationen]]
