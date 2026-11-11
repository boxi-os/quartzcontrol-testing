---
type: page
status: active
publish: true
title: "Ein- und Ausblenden mit CSS animieren"
description: "Elemente aus display: none heraus und wieder hinein animieren – Popover, Dialog, Menüs – mit @starting-style, allow-discrete und den Grenzen je Browser."
applies_to:
  - "Baseline-Angaben nach web-features 3.38.0, Stand 2026-09-12"
  - "Beispiele getestet in Chrome 152"
---

# Ein- und Ausblenden mit CSS animieren

## Ziel

Ein Element wie ein Popover, Dialog, Menü oder Hinweis soll weich einblenden, wenn es erscheint, und weich ausblenden, wenn es verschwindet, obwohl es dazwischen `display: none` hat. Auf Wunsch soll es auch auf seine natürliche Höhe (`height: auto`) auf- und zuklappen.

## Voraussetzungen

- Grundlagen zu Transitions: [[animation/transitions-und-keyframes|CSS-Transitions und Keyframe-Animationen]].
- Browser mit `@starting-style` und `transition-behavior` (seit 2024-08-06 Baseline *newly available*).

## Getestet mit / Stand

Stand 2026-09-12. Die CSS-Muster stammen von MDN. **Am 2026-09-13 in Chrome 152 (macOS) getestet:** Das Popover blendet ein und aus, `display: none` in Keyframes greift am Ende, `interpolate-size` animiert in beide Richtungen, der Trick mit `0fr`/`1fr` ebenfalls. **Nicht getestet:** Firefox und Safari, dort gelten die Einschränkungen unten. Vorab das Wichtigste laut `web-features` 3.38.0:

- **Einblenden** mit `@starting-style` funktioniert in allen großen Browsern.
- **Ausblenden** hängt davon ab, dass `display` beim Schließen verzögert wird. Das kann Firefox nicht (Feature „display animation“: Chrome 117, Safari 18). Dort verschwindet das Element sofort.
- **`overlay`** gibt es nur in Chromium.
- **`interpolate-size`** gibt es nur in Chromium.

## Vorgehen

### Popover oder Dialog mit Transition

1. **Den offenen Zustand festlegen**, also das, worauf das Einblenden hinläuft.
2. **Den geschlossenen Zustand am Element selbst festlegen**, also das, worauf das Ausblenden hinläuft.
3. **`display` und `overlay` in die Transition-Liste aufnehmen**, beide mit `allow-discrete`.
4. **`@starting-style` hinter die Regel für den offenen Zustand schreiben.** Beide sind gleich spezifisch, also gewinnt die spätere.
5. **`::backdrop` gesondert behandeln**, mit eigenem `@starting-style`-Block außerhalb, weil `&` keine Pseudoelemente abbilden kann.

```css
@media (prefers-reduced-motion: no-preference) {
  /* 1. offen */
  [popover]:popover-open {
    opacity: 1;
    translate: 0 0;
  }

  /* 2. geschlossen + 3. Transition-Liste */
  [popover] {
    opacity: 0;
    translate: 0 -0.5rem;
    transition:
      opacity 200ms ease-out,
      translate 200ms ease-out,
      overlay 200ms allow-discrete,
      display 200ms allow-discrete;
  }

  /* 4. Startzustand – nach Regel 1 */
  @starting-style {
    [popover]:popover-open {
      opacity: 0;
      translate: 0 -0.5rem;
    }
  }

  /* 5. Backdrop */
  [popover]::backdrop {
    background-color: transparent;
    transition:
      background-color 200ms,
      overlay 200ms allow-discrete,
      display 200ms allow-discrete;
  }
  [popover]:popover-open::backdrop {
    background-color: rgb(0 0 0 / 25%);
  }
  @starting-style {
    [popover]:popover-open::backdrop {
      background-color: transparent;
    }
  }
}
```

<a href="beispiele/ein-ausblenden-01-popover.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

Das ist das MDN-Beispiel, nur mit `translate` statt `transform: scaleX()` und in der Media Query.[^mdn-popover] Für einen modalen Dialog geht dasselbe mit `dialog:open` und `dialog`, oder mit `dialog[open]`, wo `:open` fehlt.[^mdn-dialog]

Kürzer geht es mit `transition: all 200ms allow-discrete;`, dann aber für alle Eigenschaften. So steht es als Kommentar im MDN-Beispiel.[^mdn-popover]

### Alternative: Keyframes

Mit Keyframe-Animationen ist `@starting-style` nicht nötig, und `display` darf direkt in Keyframes stehen.[^starting-style][^chrome-entry-exit]

```css
@keyframes fade-out {
  to {
    opacity: 0;
    display: none;
  }
}
.toast.is-leaving {
  animation: fade-out 300ms forwards;
}
```

<a href="beispiele/ein-ausblenden-02-keyframes.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

`forwards` hält den Endzustand fest.[^chrome-entry-exit] Keyframes lohnen sich bei Effekten mit mehreren Stufen, die mit einer Transition nicht gehen. Die Klasse muss dann ein Skript setzen. Wer das Element danach entfernt, wartet das Ende der Animation ab.

### Auf `height: auto` animieren

```css
@supports (interpolate-size: allow-keywords) {
  :root {
    interpolate-size: allow-keywords;
  }
}

.panel {
  height: 0;
  overflow: clip;
  transition: height 300ms ease;
}
.panel.is-open {
  height: auto;
}
```

<a href="beispiele/ein-ausblenden-03-height-auto.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

`interpolate-size` wird vererbt. An `:root` gilt es für die ganze Seite, an einem Teilbaum wie `main` nur dort.[^height-auto] Browser, die es nicht können, springen einfach, und das ist so gewollt.[^height-auto]

Wer die Animation in allen Browsern braucht, kann Grid-Zeilen animieren (laut `web-features` 3.38.0 Baseline *widely available* seit 2022-10-27).

```css
.panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 300ms ease;
}
.panel.is-open {
  grid-template-rows: 1fr;
}
.panel > * {
  overflow: hidden;
}
```

<a href="beispiele/ein-ausblenden-04-grid-rows.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

Der Trick mit `0fr`/`1fr` steht in keiner der ausgewerteten Quellen, ist aber weit verbreitet. In Chrome 152 getestet. Ob er in Firefox und Safari genauso läuft, ist offen, auch wenn die Baseline-Daten dafür sprechen.

## Warum funktioniert das?

- Transitions starten normalerweise **nicht**, wenn ein Element zum ersten Mal Styles bekommt oder aus `display: none` kommt. `@starting-style` liefert genau für diesen Moment Startwerte.[^starting-style]
- Es gibt **drei Zustände**: Start (`@starting-style`), offen und Standard. Beim Schließen geht es zum Standardzustand, nicht zurück zum Start. Ein- und Ausblenden dürfen also unterschiedlich aussehen.[^starting-style]
- `display` kennt keine Zwischenwerte. Mit `allow-discrete` springt es beim Einblenden gleich am Anfang um, beim Ausblenden erst am Ende. So bleibt das Element während der Transition sichtbar.[^mdn-popover]
- `overlay` sorgt dafür, dass das Element erst am Ende der Transition aus dem Top Layer genommen wird.[^mdn-popover]
- `interpolate-size` muss man ausdrücklich einschalten, weil viele bestehende Stylesheets davon ausgehen, dass `auto` nicht animiert wird.[^height-auto]

## Fallstricke

- **`@starting-style` vor der Regel für den offenen Zustand:** Dann wird es überschrieben, und das Einblenden fehlt.[^starting-style] Verschachtelt man es in die Regel, tritt das Problem nicht auf.
- **`display` fehlt in der Transition-Liste:** Dann sieht man das Ausblenden nicht, das Element verschwindet sofort.[^mdn-popover]
- **Firefox** blendet laut Baseline-Daten nicht aus, egal wie korrekt das CSS ist. Das Einblenden funktioniert.
- **Firefox und `display` in Keyframes:** Auch das gehört zum Feature „display animation“. Beim Keyframe-Beispiel bleibt das Element dort vermutlich unsichtbar, ist aber noch da (`opacity: 0`, weiter im Layout und klickbar). Das ist abgeleitet, nicht getestet. Wer sichergehen will, entfernt oder versteckt es nach dem `animationend`-Event per Skript.
- **Ohne `overlay` (Firefox, Safari):** Bei einfachen Animationen ist der Unterschied laut MDN „möglicherweise nicht bemerkbar“. Bei aufwendigeren kann das Element vor dem Ende der Transition aus dem Top Layer fallen.[^mdn-popover]
- **`::backdrop` und Nesting:** Der Startzustand für `::backdrop` muss als eigener Block dastehen.[^mdn-popover]
- **`interpolate-size` für die ganze Seite:** Kann Stellen verändern, die bisher bewusst gesprungen sind. Dann besser auf einen Teilbaum beschränken.[^height-auto]
- **Tippfehler in der Chrome-Quelle:** Dort steht einmal `interpolate-size: allow-sizes`, richtig ist `allow-keywords`.
- **`height` animiert das Layout:** Das ist teurer als `transform` oder `opacity`.[^webdev] Bei kurzem Aufklappen meist vertretbar, bei vielen Elementen gleichzeitig sollte man es prüfen.
- **Bewegung:** alles in `@media (prefers-reduced-motion: no-preference)` packen, siehe [[animation/barrierearme-animationen|Barrierearme Animationen]]. Übergänge der Deckkraft sind meist unproblematisch, Verschiebungen eher nicht.

### Browsersupport

| Feature | Stand |
| --- | --- |
| `@starting-style` | Baseline *newly available* seit 2024-08-06 (Chrome 117, Firefox 129, Safari 17.5) |
| `transition-behavior` | Baseline *newly available* seit 2024-08-06 (Chrome 117, Firefox 129, Safari 17.4) |
| `display`/`content-visibility` animieren | *limited*: Chrome 116/117, Safari 18, **Firefox fehlt** |
| `overlay` | *limited*: nur Chromium ab 117 |
| `:popover-open` | Baseline *newly available* seit 2024-04-16 |
| `:open` | Baseline *newly available* seit 2026-05-11 |
| `interpolate-size`, `calc-size()` | *limited*: nur Chromium ab 129 |
| `grid-template-rows` animieren | Baseline *widely available* (seit 2022-10-27 *newly*) |

Quelle: `web-features` 3.38.0 (Baseline-Daten der W3C WebDX Community Group), lokal abgefragt am 2026-09-12.

## Siehe auch

- [[animation/transitions-und-keyframes|CSS-Transitions und Keyframe-Animationen]]
- [[navigation/top-layer|Top Layer mit popover und dialog]]
- [[navigation/mobilmenue|Mobile-Menü ohne Checkbox-Hack bauen]]
- [[navigation/akkordeon|Akkordeon mit details bauen]]
- [[animation/barrierearme-animationen|Barrierearme Animationen]]

## Quellen

- [[quellen/artikel/popover-api-mdn|Using the Popover API (MDN)]] — vollständiges Transition-Muster, `display`/`overlay`, Backdrop
- [[quellen/artikel/dialog-element-mdn|dialog-Element (MDN)]] — dasselbe Muster für `dialog`
- [[quellen/artikel/starting-style-mdn|starting-style At-Regel (MDN)]] — Zweck, Reihenfolge, drei Zustände
- [[quellen/artikel/entry-exit-animations-chrome|Four new CSS features for smooth entry and exit animations (Chrome for Developers)]] — `display` in Keyframes, `transition-behavior`
- [[quellen/artikel/height-auto-chrome|Animate to height auto (Chrome for Developers)]] — `interpolate-size`, `calc-size()`
- [[quellen/artikel/performante-animationen-webdev|How to create high-performance CSS animations (web.dev)]] — Layout-Animationen sind teurer

Eigene Einordnung bzw. nicht aus den Quellen: der Trick mit `0fr`/`1fr`, die Anpassung mit `translate` und die Media Query drumherum. Getestet nur in Chrome 152.

[^mdn-popover]: [[quellen/artikel/popover-api-mdn|Using the Popover API (MDN)]], Abschnitte „Animating popovers“ und „Transitioning a popover“.
[^mdn-dialog]: [[quellen/artikel/dialog-element-mdn|dialog-Element (MDN)]], Abschnitt „Animating dialogs“.
[^starting-style]: [[quellen/artikel/starting-style-mdn|starting-style At-Regel (MDN)]].
[^chrome-entry-exit]: [[quellen/artikel/entry-exit-animations-chrome|Four new CSS features for smooth entry and exit animations (Chrome for Developers)]].
[^height-auto]: [[quellen/artikel/height-auto-chrome|Animate to height auto (Chrome for Developers)]].
[^webdev]: [[quellen/artikel/performante-animationen-webdev|How to create high-performance CSS animations (web.dev)]].
