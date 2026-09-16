---
type: page
status: active
publish: true
title: "CSS-Transitions und Keyframe-Animationen"
description: "Die zwei Animationsmechanismen von CSS: wann Transition, wann Keyframes, welche Eigenschaften günstig sind und was Easing mit linear() kann."
---

# CSS-Transitions und Keyframe-Animationen

## Kurz erklärt

CSS hat zwei Mechanismen für Bewegung:

- **Transition:** Eine Eigenschaft ändert sich – durch `:hover`, eine Klasse, ein Attribut –, und der Browser lässt die Änderung über eine Zeitspanne ablaufen. Die Zwischenwerte rechnet er selbst aus.[^mdn-transitions]
- **Keyframe-Animation:** Ein Ablauf mit Start, Ende und beliebigen Zwischenständen, definiert in `@keyframes` und über `animation` an ein Element gehängt. Sie kann ohne Zustandswechsel starten, sich wiederholen und rückwärts laufen.[^mdn-animations]

```css
/* Transition: reagiert auf eine Zustandsänderung */
.button {
  transition: background-color 200ms ease-out;
}
.button:hover {
  background-color: oklch(55% 0.15 250);
}

/* Keyframes: eigener Ablauf */
@keyframes pulse {
  50% { scale: 1.05; }
}
.badge {
  animation: pulse 1.5s ease-in-out infinite;
}
```

<a href="beispiele/transitions-01-transition-und-keyframes.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

## Hintergrund

Transitions heißen auch „implizite“ Übergänge, weil nur Anfang und Ende feststehen.[^mdn-transitions] Keyframes machen den Ablauf explizit.

MDN nennt drei Vorteile gegenüber Animation per JavaScript: wenige Zeilen ohne Skript, stabiles Verhalten auch unter Last (die Engine kann Frames auslassen) und Optimierungen wie seltenere Aktualisierung in nicht sichtbaren Tabs.[^mdn-animations]

## Wichtige Aspekte

### Transition oder Keyframes?

| Frage | Transition | Keyframes |
| --- | --- | --- |
| Gibt es einen Auslöser (Zustand A → B)? | ja, Voraussetzung | nicht nötig |
| Mehr als zwei Stationen? | nein | ja |
| Wiederholen, hin und her? | nein | `animation-iteration-count`, `animation-direction` |
| Endzustand halten | ergibt sich aus dem Zielzustand | `animation-fill-mode: forwards` |

Die Tabelle ist eigene Zusammenfassung der beiden MDN-Leitfäden.

### Teileigenschaften

- **Transition:** `transition-property`, `transition-duration`, `transition-timing-function`, `transition-delay`; MDN empfiehlt die Kurzschreibweise `transition`, damit die Werte nicht auseinanderlaufen. Dazu seit 2024 `transition-behavior`, siehe [[animation/ein-und-ausblenden|Ein- und Ausblenden mit CSS animieren]].[^mdn-transitions]
- **Animation:** `animation-name`, `-duration`, `-timing-function`, `-delay`, `-iteration-count`, `-direction`, `-fill-mode`, `-play-state`, `-timeline` und `animation-composition` (nicht in der Kurzschreibweise).[^mdn-animations]

### Nicht alles ist animierbar

- Manche Eigenschaften lassen sich gar nicht animieren.[^mdn-transitions]
- Von oder zu `auto` soll man laut Spezifikation nicht animieren; Browser verhalten sich dabei unterschiedlich.[^mdn-transitions] Gezielt erlaubt `interpolate-size` das – derzeit nur in Chromium.[^height-auto]
- `display` und `content-visibility` lassen sich in Keyframes und mit `transition-behavior: allow-discrete` animieren – laut `web-features` 3.38.0 aber **nicht in Firefox**.

### Günstig und teuer

Flüssig bleiben Animationen von **`transform` und `opacity`**. Eigenschaften, die Layout oder Paint auslösen (Breite, Höhe, Position über `top`/`left`, Schatten …), nur animieren, wenn es unbedingt nötig ist.[^webdev]

`will-change` legt ein Element vorab auf eine eigene Ebene – aber nur für Elemente, die sich gleich ändern, nicht pauschal.[^webdev]

### Einzelne Transform-Eigenschaften

`translate`, `rotate` und `scale` sind eigene Eigenschaften neben `transform`. MDN nutzt `rotate` im Transition-Beispiel direkt.[^mdn-transitions] Vorteil: Eine Hover-Drehung überschreibt nicht versehentlich eine Verschiebung, die an `transform` hängt – eigene Einordnung.

### Easing

- Schlüsselwörter (`ease`, `ease-in`, `ease-out`, `ease-in-out`, `linear`) und `cubic-bezier()` beschreiben Kurven über vier Punkte.[^mdn-transitions]
- **`linear()`** nimmt beliebig viele Stützpunkte und interpoliert dazwischen linear. Mit vielen Punkten lassen sich komplexe Kurven annähern; Werte außerhalb 0–1 sind erlaubt.[^linear]

```css
.pop {
  transition: scale 400ms linear(0, 1.2 60%, 0.95 80%, 1);
}
```

<a href="beispiele/transitions-02-linear-easing.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

Das Beispiel (kurz überschwingen, zurückfedern) ist eigene Konstruktion aus der Syntax. In Chrome 152 getestet: Bei `scale` von 1 auf 2 erreicht der Wert zwischendurch etwa 2,17 und pendelt dann auf 2 ein.

### Custom Properties animieren

Eine normale Custom Property ist für den Browser nur Text und springt. Mit `@property` und Typangabe wird sie interpolierbar – Details und Beispiel in [[grundlagen/variablen|CSS Custom Properties]].

### Nebenwirkung von `forwards`

Mit `animation-fill-mode: forwards` verhalten sich die animierten Eigenschaften wie in `will-change` eingetragen. Ein Stapelkontext, der während der Animation entsteht, bleibt danach bestehen.[^mdn-animations] Das erklärt manche `z-index`-Überraschung nach einer Animation.

## Beispiele

Karte beim Hover leicht anheben – nur `translate` und Schatten auf einem Pseudoelement per `opacity`, damit kein Schatten animiert werden muss:

```css
.card {
  position: relative;
  transition: translate 200ms ease-out;
}
.card::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: 0 12px 24px rgb(0 0 0 / 20%);
  pointer-events: none;
  opacity: 0;
  transition: opacity 200ms ease-out;
}
.card:hover { translate: 0 -4px; }
.card:hover::after { opacity: 1; }
```

<a href="beispiele/transitions-03-karte-anheben.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

Das Muster „Schatten per `opacity` einblenden statt `box-shadow` animieren“ folgt der Regel aus web.dev, ist dort aber nicht vorgeführt.

Endloser Lade-Spinner:

```css
@keyframes spin {
  to { rotate: 1turn; }
}
.spinner {
  animation: spin 1s linear infinite;
}
```

<a href="beispiele/transitions-04-spinner.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

Beide Beispiele gehören für bewegungsempfindliche Menschen in `@media (prefers-reduced-motion: no-preference)` – siehe [[animation/barrierearme-animationen|Barrierearme Animationen]]. Endlos laufende Bewegung neben anderem Inhalt kann außerdem unter WCAG 2.2.2 fallen, sobald sie länger als fünf Sekunden läuft. Ob und wann Ladeanzeigen als „essenziell“ ausgenommen sind, ist hier nicht ausgewertet.

## Eigene Notizen / Einordnung

Faustregel: **Zustandswechsel → Transition, eigener Ablauf → Keyframes.** Die meisten UI-Effekte sind Zustandswechsel.

Wer nur `transform`/`opacity` animiert und Bewegung an `prefers-reduced-motion` koppelt, hat die beiden häufigsten Probleme – Ruckeln und Unwohlsein – bereits vermieden.

### Browsersupport

| Feature | Stand |
| --- | --- |
| Transitions, Keyframe-Animationen | Baseline *widely available* (seit 2015) |
| `translate`, `rotate`, `scale` | Baseline *widely available* (seit 2022-08-05 *newly*) |
| `will-change` | Baseline *widely available* |
| `linear()` | Baseline *widely available* seit 2026-06-11 (*newly* seit 2023-12-11) |
| `@property` | Baseline *newly available* seit 2024-07-09 |
| `display`/`content-visibility` animieren | *limited*: Chrome 116/117, Safari 18, Firefox fehlt |
| `interpolate-size` | *limited*: nur Chromium ab 129 |

Quelle: `web-features` 3.38.0 (Baseline-Daten der W3C WebDX Community Group), lokal abgefragt am 2026-09-12.

## Siehe auch

- [[animation/ein-und-ausblenden|Ein- und Ausblenden mit CSS animieren]]
- [[animation/barrierearme-animationen|Barrierearme Animationen]]
- [[animation/scroll-getriebene-animationen|Scroll-getriebene Animationen]]
- [[animation/view-transitions|View Transitions]]
- [[grundlagen/variablen|CSS Custom Properties]]

## Quellen

- [[quellen/artikel/css-transitions-mdn|Using CSS transitions (MDN)]] — Transition-Grundlagen, `auto`-Warnung
- [[quellen/artikel/css-animations-mdn|Using CSS animations (MDN)]] — Keyframes, Teileigenschaften, Vorteile, `forwards`
- [[quellen/artikel/performante-animationen-webdev|How to create high-performance CSS animations (web.dev)]] — `transform`/`opacity`, `will-change`
- [[quellen/artikel/linear-easing-mdn|linear() CSS-Funktion (MDN)]] — Easing mit Stützpunkten
- [[quellen/artikel/height-auto-chrome|Animate to height auto (Chrome for Developers)]] — `interpolate-size`

Eigene Einordnung: Vergleichstabelle, Vorteil einzelner Transform-Eigenschaften, alle Codebeispiele. Die Beispiele sind in Chrome 152 (macOS), 2026-09-13 getestet (Karten-Link bleibt klickbar, Spinner dreht, `linear()` schwingt über), nicht in Firefox und Safari.

[^mdn-transitions]: [[quellen/artikel/css-transitions-mdn|Using CSS transitions (MDN)]].
[^mdn-animations]: [[quellen/artikel/css-animations-mdn|Using CSS animations (MDN)]], Einleitung und „Configuring an animation“.
[^webdev]: [[quellen/artikel/performante-animationen-webdev|How to create high-performance CSS animations (web.dev)]].
[^linear]: [[quellen/artikel/linear-easing-mdn|linear() CSS-Funktion (MDN)]].
[^height-auto]: [[quellen/artikel/height-auto-chrome|Animate to height auto (Chrome for Developers)]].
