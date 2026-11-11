---
type: page
status: active
publish: true
title: "View Transitions"
description: "Übergänge zwischen Zuständen und Seiten mit der View Transition API: Ablauf, view-transition-name, Anpassung und Browserstand."
applies_to:
  - "Baseline-Angaben nach web-features 3.38.0, Stand 2026-09-12"
  - "Beispiele getestet in Chrome 152"
---

# View Transitions

## Kurz erklärt

Eine View Transition animiert den Wechsel von einem Zustand der Seite zum nächsten oder von einer Seite zur nächsten. Dafür muss man nicht beide Zustände gleichzeitig im DOM halten: Der Browser macht ein Bild vom alten Zustand, führt die Änderung durch und blendet über.[^mdn]

Zwischen zwei Seiten derselben Website genügt CSS auf **beiden** Seiten:[^mdn]

```css
@view-transition {
  navigation: auto;
}
```

<a href="beispiele/view-transitions-01-zwischen-seiten.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

Innerhalb einer Seite startet JavaScript den Übergang:[^mdn]

```js
function update() {
  // DOM ändern
}

if (document.startViewTransition) {
  document.startViewTransition(update);
} else {
  update();
}
```

## Hintergrund

Zwei Arten:[^mdn]

- **Same-Document** (typisch für Single-Page-Apps): Man startet sie mit `document.startViewTransition(callback)`.
- **Cross-Document** (klassische Websites mit mehreren Seiten): Sie startet bei einer Navigation zwischen zwei Seiten **derselben Origin**, wenn beide mit `@view-transition` zustimmen. Man ruft keine Funktion auf, der Klick auf den Link genügt.

## Wichtige Aspekte

### Ablauf

1. Der Browser macht ein Bild von allen Elementen mit `view-transition-name` im alten Zustand.
2. Die Änderung passiert.
3. Den neuen Zustand zeigt der Browser „live“, man kann also schon während der Animation damit arbeiten.
4. Standardmäßig wird übergeblendet (alt `opacity` 1 → 0, neu 0 → 1). Ändert sich die Größe, wird skaliert, ändert sich die Position, gleitet das Element weich an die neue Stelle.
5. Danach verschwinden die Snapshots.[^mdn]

Ist die Seite beim Aufruf nicht sichtbar (anderer Tab aktiv, Fenster minimiert), lässt der Browser den Übergang aus.[^mdn]

### Pseudoelemente

```
::view-transition
└─ ::view-transition-group(name)
   └─ ::view-transition-image-pair(name)
      ├─ ::view-transition-old(name)
      └─ ::view-transition-new(name)
```

`:root` hat standardmäßig `view-transition-name: root`. Bei Cross-Document-Übergängen gibt es diesen Baum nur auf der Zielseite.[^mdn]

### Einzelne Elemente getrennt animieren

Jedes Element mit eigenem `view-transition-name` bekommt eine eigene Gruppe und lässt sich einzeln stylen. Der Name muss **eindeutig** sein: Haben zwei sichtbare Elemente denselben Namen, fällt der Übergang aus. `match-element` vergibt automatisch eindeutige Namen.[^mdn]

### Anpassen

Die Dauer setzt man an der Gruppe, damit `old` und `new` sie erben:[^mdn]

```css
::view-transition-group(root) {
  animation-duration: 0.3s;
}
```

<a href="beispiele/view-transitions-02-dauer.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

Eigene Animationen gehören an `::view-transition-old()` und `::view-transition-new()`. Bei Cross-Document gehört das CSS auf die Zielseite. Soll es in beide Richtungen funktionieren, also auf beide Seiten.[^mdn]

## Beispiele

Der Header bleibt beim Seitenwechsel ruhig stehen, nur der Inhalt blendet über. Auf beiden Seiten steht dasselbe CSS:

```css
@view-transition {
  navigation: auto;
}

.site-header {
  view-transition-name: site-header;
}
```

<a href="beispiele/view-transitions-03-header-bleibt.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

Der Header bekommt eine eigene Gruppe. Steht er auf beiden Seiten an derselben Stelle, gibt es für ihn nichts zu bewegen, während der Rest der Seite in der Gruppe `root` überblendet.[^mdn] Das Beispiel habe ich selbst gebaut und beim Seitenwechsel in Chrome 152 geprüft.

Eigene Animationen nur ohne reduzierte Bewegung:

```css
@media (prefers-reduced-motion: no-preference) {
  ::view-transition-old(root) {
    animation: 0.4s ease-in both move-out;
  }
  ::view-transition-new(root) {
    animation: 0.4s ease-in both move-in;
  }
}
```

<a href="beispiele/view-transitions-04-eigene-animation.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

Die Keyframes `move-out` und `move-in` (nach oben herausschieben, von unten hereinschieben) stammen aus dem MDN-Beispiel.[^mdn] Auch `@view-transition` selbst lässt sich in `@media (prefers-reduced-motion: no-preference)` packen: In Chrome 152 lief der Übergang damit (`pagereveal` meldet eine View Transition). Den Fall `reduce` konnte ich nicht prüfen, und in den Quellen steht dazu nichts.

## Eigene Notizen / Einordnung

- **Für klassische Websites ist Cross-Document das Spannende:** zwei Zeilen CSS, und auch statisch erzeugte Seiten wirken flüssiger. Firefox kann das noch nicht, dort wird einfach normal navigiert. Das folgt daraus, dass beide Seiten ausdrücklich zustimmen müssen, getestet habe ich es nicht.
- **Nicht jede Navigation braucht Bewegung.** Eine Überblendung fällt kaum auf. Schiebende oder zoomende Übergänge sind dagegen großflächige Bewegung und gehören an `prefers-reduced-motion` gekoppelt. Siehe [[animation/barrierearme-animationen|Barrierearme Animationen]].
- **Eindeutige Namen** sind bei Listen die häufigste Fehlerquelle: Jedes Element braucht einen eigenen Namen oder `match-element`.

### Browsersupport

| Feature | Stand |
| --- | --- |
| Same-Document (`startViewTransition`, `view-transition-name`) | Baseline *newly available* seit 2025-10-14 (Chrome 111, Firefox 144, Safari 18) |
| `view-transition-class` | Baseline *newly available* seit 2025-10-14 |
| Cross-Document (`@view-transition`) | *limited*: Chrome 126, Safari 18.2, **Firefox fehlt** |
| Element-scoped (`element.startViewTransition`) | *limited*: nur Chromium ab 147 |

Quelle: `web-features` 3.38.0 (Baseline-Daten der W3C WebDX Community Group), lokal abgefragt am 2026-09-12.

## Siehe auch

- [[animation/transitions-und-keyframes|CSS-Transitions und Keyframe-Animationen]]
- [[animation/barrierearme-animationen|Barrierearme Animationen]]
- [[navigation/mobilmenue|Mobile-Menü ohne Checkbox-Hack bauen]]
- [[animation/scroll-getriebene-animationen|Scroll-getriebene Animationen]]

## Quellen

- [[quellen/artikel/view-transition-api-mdn|Using the View Transition API (MDN)]] — Ablauf, Pseudoelemente, SPA und MPA, Anpassung, Namen

Eigene Einordnung: die Hinweise zum Verhalten ohne Unterstützung und zur Bewegung sowie dass die MDN-Animation in der Media Query steckt. Am 2026-09-13 in Chrome 152 (macOS) getestet: Same-Document-Übergang mit Feature-Erkennung, ein doppelter `view-transition-name` lässt `ready` mit `InvalidStateError` scheitern, Cross-Document-Übergang zwischen zwei Seiten. Nicht getestet: Safari und das Verhalten in Firefox.

[^mdn]: [[quellen/artikel/view-transition-api-mdn|Using the View Transition API (MDN)]].
