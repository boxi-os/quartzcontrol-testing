---
type: page
status: active
publish: true
title: "Using CSS animations (MDN)"
description: "Quellennotiz zum MDN-Leitfaden für CSS-Animationen: animation-Teileigenschaften, @keyframes, Vorteile gegenüber Skript-Animation."
authors: []
publisher: "MDN Web Docs"
source_published:
url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Animations/Using"
archive_url:
source_kind: secondary
---

# Using CSS animations (MDN)

## Quelle / bibliografische Angaben

MDN-Leitfaden „Using CSS animations“, englische Fassung.

- Stand laut Seite: „last modified on Dec 15, 2025“
- URL: <https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Animations/Using>, abgerufen 2026-09-12 (über Firecrawl)
- Ausgewertet: Einleitung und „Configuring an animation“; die Beispiele nur über die Gliederung

## Kurzfassung

Eine CSS-Animation besteht aus zwei Teilen: den `animation`-Eigenschaften am Element (Timing, Dauer, Wiederholung) und einer `@keyframes`-Regel mit Start-, End- und optionalen Zwischenzuständen.

## Kernaussagen

- **Vorteile gegenüber Skript-Animation laut MDN:** wenige Zeilen CSS ohne JavaScript; läuft auch unter moderater Last gut, weil die Rendering-Engine Frames überspringen kann; der Browser kann optimieren, z. B. Animationen in nicht sichtbaren Tabs seltener aktualisieren.
- **Teileigenschaften:** `animation-composition` (nicht Teil der Kurzschreibweise), `animation-delay`, `animation-direction`, `animation-duration`, `animation-fill-mode`, `animation-iteration-count`, `animation-name`, `animation-play-state`, `animation-timeline`, `animation-timing-function`.
- **`animation-fill-mode: forwards`:** Animierte Eigenschaften verhalten sich wie in `will-change` aufgeführt. Ein währenddessen entstandener Stapelkontext bleibt nach dem Ende erhalten.
- **Gliederung der Beispiele:** Text durchs Fenster schieben, weitere Keyframes, Wiederholen, Hin und Her, Animations-Events, Animieren von `display` und `content-visibility`.

## Eigene Einordnung

Der Hinweis zum Stapelkontext bei `forwards` erklärt manche überraschende `z-index`-Wirkung nach einer Animation. `animation-timeline` ist hier nur aufgezählt; die Grundlage für Scroll-getriebene Animationen steht in [[quellen/artikel/scroll-driven-webkit|A guide to Scroll-driven Animations with just CSS (WebKit)]].

## Verknüpftes Wissen

- [[animation/transitions-und-keyframes|CSS-Transitions und Keyframe-Animationen]]
