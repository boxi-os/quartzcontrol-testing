---
type: page
status: active
publish: true
title: "Ein- und Ausblenden mit CSS animieren"
description: "Elemente aus display: none heraus und wieder hinein animieren – Popover, Dialog, Menüs – mit @starting-style, allow-discrete und den Grenzen je Browser."
---

# Ein- und Ausblenden mit CSS animieren

## Ziel

Ein Element – Popover, Dialog, Menü, Hinweis – soll beim Erscheinen einblenden und beim Verschwinden ausblenden, obwohl es dazwischen `display: none` hat. Optional auch auf seine natürliche Höhe (`height: auto`) auf- und zuklappen.

## Voraussetzungen

- Grundlagen zu Transitions: [[animation/transitions-und-keyframes|CSS-Transitions und Keyframe-Animationen]].
- Browser mit `@starting-style` und `transition-behavior` (seit 2024-08-06 Baseline *newly available*).

## Getestet mit / Stand

Stand 2026-09-12. Die CSS-Muster stammen aus MDN. **In Chrome 152 (macOS), 2026-09-13 getestet:** Popover blendet ein und aus, `display: none` in Keyframes greift am Ende, `interpolate-size` animiert in beide Richtungen, der `0fr`/`1fr`-Trick ebenfalls. **Nicht getestet:** Firefox und Safari – dort gelten die Einschränkungen unten. Wichtig vorab – laut `web-features` 3.38.0:

- **Einblenden** mit `@starting-style` funktioniert in allen großen Browsern.
- **Ausblenden** hängt davon ab, dass `display` beim Schließen verzögert wird. Das kann Firefox nicht (Feature „display animation“: Chrome 117, Safari 18). Dort verschwindet das Element sofort.
- **`overlay`** gibt es nur in Chromium.
- **`interpolate-size`** gibt es nur in Chromium.

## Vorgehen

### Popover oder Dialog mit Transition

1. **Offenen Zustand definieren** – das Ziel des Einblendens.
2. **Geschlossenen Zustand am Element selbst definieren** – das Ziel des Ausblendens.
3. **`display` und `overlay` in die Transition-Liste** und beide mit `allow-discrete` versehen.
4. **`@starting-style` nach der Regel für den offenen Zustand** – gleiche Spezifität, also gewinnt die spätere Regel.
5. **`::backdrop` separat**, mit eigenem `@starting-style`-Block außerhalb – `&` kann keine Pseudoelemente abbilden.

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

Das ist das MDN-Beispiel mit `translate` statt `transform: scaleX()` und eingebettet in die Media Query.[^mdn-popover] Für einen modalen Dialog dasselbe mit `dialog:open` und `dialog` – oder `dialog[open]`, wo `:open` fehlt.[^mdn-dialog]

Kürzer, aber mit allen Eigenschaften: `transition: all 200ms allow-discrete;` – so steht es als Kommentar im MDN-Beispiel.[^mdn-popover]

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

`forwards` hält den Endzustand fest.[^chrome-entry-exit] Keyframes lohnen sich bei mehrstufigen Effekten, die mit einer Transition nicht gehen. Die Klasse muss dann ein Skript setzen. Wer das Element anschließend entfernt, wartet das Ende der Animation ab.

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

`interpolate-size` wird vererbt; auf `:root` gilt es für die ganze Seite, auf einem Teilbaum wie `main` nur dort.[^height-auto] Browser ohne Unterstützung springen einfach – das ist gewollt.[^height-auto]

Wer die Animation überall braucht: Grid-Zeilen lassen sich animieren (laut `web-features` 3.38.0 Baseline *widely available* seit 2022-10-27).

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

Der `0fr`/`1fr`-Trick ist in keiner der ausgewerteten Quellen beschrieben, sondern verbreitete Praxis. In Chrome 152 getestet; ob er in Firefox und Safari genauso läuft, ist offen, obwohl die Baseline-Daten dafür sprechen.

## Warum funktioniert das?

- Transitions starten normalerweise **nicht**, wenn ein Element zum ersten Mal Stile bekommt oder aus `display: none` kommt. `@starting-style` liefert für genau diesen Moment Startwerte.[^starting-style]
- Es gibt **drei Zustände**: Start (`@starting-style`), offen und Standard. Beim Schließen geht es zum Standardzustand, nicht zurück zum Start – Ein- und Ausblenden dürfen sich unterscheiden.[^starting-style]
- `display` ist diskret. Mit `allow-discrete` wechselt es beim Einblenden bei 0 %, beim Ausblenden erst bei 100 % – das Element bleibt während der Transition sichtbar.[^mdn-popover]
- `overlay` verzögert das Entfernen aus dem Top Layer bis zum Ende der Transition.[^mdn-popover]
- `interpolate-size` ist Opt-in, weil viele bestehende Stylesheets davon ausgehen, dass `auto` nicht animiert.[^height-auto]

## Fallstricke

- **`@starting-style` vor der offenen Regel:** wird überschrieben, das Einblenden fehlt.[^starting-style] Verschachtelt in der Regel stellt sich das Problem nicht.
- **`display` fehlt in der Transition-Liste:** Das Ausblenden ist unsichtbar, das Element verschwindet sofort.[^mdn-popover]
- **Firefox:** blendet laut Baseline-Daten nicht aus, egal wie korrekt das CSS ist. Das Einblenden funktioniert.
- **Firefox und `display` in Keyframes:** Auch das gehört zum Feature „display animation“. Beim Keyframe-Beispiel bleibt das Element dort vermutlich unsichtbar, aber vorhanden (`opacity: 0`, weiter im Layout und klickbar) – abgeleitet, nicht getestet. Wer sichergehen will, entfernt oder versteckt es nach dem `animationend`-Event per Skript.
- **Ohne `overlay` (Firefox, Safari):** MDN nennt den Unterschied bei einfachen Animationen „möglicherweise nicht bemerkbar“, bei komplexeren kann das Element vor Ende der Transition aus dem Top Layer fallen.[^mdn-popover]
- **`::backdrop` und Nesting:** Der Startzustand für `::backdrop` muss als eigener Block stehen.[^mdn-popover]
- **`interpolate-size` global:** Kann Stellen der Seite verändern, die bisher bewusst gesprungen sind. Dann auf einen Teilbaum beschränken.[^height-auto]
- **Tippfehler in der Chrome-Quelle:** Dort steht einmal `interpolate-size: allow-sizes`; richtig ist `allow-keywords`.
- **`height` animiert Layout:** Das ist teurer als `transform`/`opacity`.[^webdev] Bei kurzen Aufklapp-Effekten meist vertretbar, bei vielen Elementen gleichzeitig prüfen.
- **Bewegung:** alles in `@media (prefers-reduced-motion: no-preference)`, siehe [[animation/barrierearme-animationen|Barrierearme Animationen]]. Deckkraft-Übergänge sind meist unkritisch, Verschiebungen weniger.

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

Eigene Einordnung bzw. nicht aus den Quellen: der `0fr`/`1fr`-Trick, die Anpassung mit `translate` und die Einbettung in die Media Query. Getestet nur in Chrome 152.

[^mdn-popover]: [[quellen/artikel/popover-api-mdn|Using the Popover API (MDN)]], Abschnitte „Animating popovers“ und „Transitioning a popover“.
[^mdn-dialog]: [[quellen/artikel/dialog-element-mdn|dialog-Element (MDN)]], Abschnitt „Animating dialogs“.
[^starting-style]: [[quellen/artikel/starting-style-mdn|starting-style At-Regel (MDN)]].
[^chrome-entry-exit]: [[quellen/artikel/entry-exit-animations-chrome|Four new CSS features for smooth entry and exit animations (Chrome for Developers)]].
[^height-auto]: [[quellen/artikel/height-auto-chrome|Animate to height auto (Chrome for Developers)]].
[^webdev]: [[quellen/artikel/performante-animationen-webdev|How to create high-performance CSS animations (web.dev)]].
