---
type: page
status: active
publish: true
title: "Using CSS transitions (MDN)"
description: "Quellennotiz zum MDN-Leitfaden für CSS-Transitions: Teil-Eigenschaften, Kurzschreibweise, Warnung vor auto."
authors: []
publisher: "MDN Web Docs"
source_published:
url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Transitions/Using"
archive_url:
source_kind: secondary
---

# Using CSS transitions (MDN)

## Quelle / bibliografische Angaben

MDN-Leitfaden „Using CSS transitions“, englische Fassung.

- Stand laut Seite: „last modified on Dec 16, 2025“
- URL: <https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Transitions/Using>, abgerufen 2026-09-12 (über Firecrawl)
- Ausgewertet: Einleitung, animierbare Eigenschaften, Definition, erste zwei Beispiele

## Kurzfassung

Transitions lassen eine Eigenschaftsänderung über eine Zeitspanne ablaufen statt sofort. Die Zwischenwerte berechnet der Browser selbst („implizite Transition“).

## Kernaussagen

- **Implizit:** Zwischen Start- und Endzustand definiert der Browser die Zwischenschritte.
- **Steuerbar:** welche Eigenschaften (`transition-property`), Dauer (`transition-duration`), Beschleunigungskurve (`transition-timing-function`), Verzögerung (`transition-delay`).
- **Kurzschreibweise** `transition: <property> <duration> <timing-function> <delay>;` wird empfohlen, weil sie auseinanderlaufende Teilwerte vermeidet.
- **Nicht alles ist animierbar.**
- **`auto`:** Die Spezifikation empfiehlt, nicht von oder zu `auto` zu animieren. Gecko hält sich daran, WebKit ist weniger streng – Ergebnisse sind unvorhersehbar und sollen vermieden werden.
- Beispiel mit mehreren Eigenschaften nutzt `rotate` als eigene Eigenschaft neben `width`, `height`, `background-color`.

## Eigene Einordnung

Die `auto`-Warnung ist inzwischen teilweise überholt: `interpolate-size` erlaubt es gezielt, aber nur in Chromium (siehe [[quellen/artikel/height-auto-chrome|Animate to height auto (Chrome for Developers)]]). Die Seite verweist darauf im ausgewerteten Teil nicht.

## Verknüpftes Wissen

- [[animation/transitions-und-keyframes|CSS-Transitions und Keyframe-Animationen]]
- [[animation/ein-und-ausblenden|Ein- und Ausblenden mit CSS animieren]]
