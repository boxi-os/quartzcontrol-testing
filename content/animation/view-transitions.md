---
type: page
status: active
publish: true
title: "View Transitions"
description: "Übergänge zwischen Zuständen und Seiten mit der View Transition API: Ablauf, view-transition-name, Anpassung und Browserstand."
---

# View Transitions

## Kurz erklärt

Eine View Transition animiert den Wechsel von einem Zustand der Seite zum nächsten – oder von einer Seite zur nächsten –, ohne dass man beide Zustände gleichzeitig im DOM halten muss. Der Browser macht ein Bild vom alten Zustand, führt die Änderung durch und blendet über.[^mdn]

Zwischen zwei Seiten derselben Website genügt CSS auf **beiden** Seiten:[^mdn]

```css
@view-transition {
  navigation: auto;
}
```

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

- **Same-Document** (typisch für Single-Page-Apps): ausgelöst durch `document.startViewTransition(callback)`.
- **Cross-Document** (klassische Websites mit mehreren Seiten): ausgelöst durch eine Navigation zwischen Dokumenten **gleicher Herkunft**, wenn beide per `@view-transition` zustimmen. Es gibt keine Funktion, die man aufruft; der Klick auf den Link genügt.

## Wichtige Aspekte

### Ablauf

1. Der Browser fotografiert alle Elemente mit `view-transition-name` im alten Zustand.
2. Die Änderung passiert.
3. Der neue Zustand wird als „live“ Region erfasst – man kann schon während der Animation damit interagieren.
4. Standard: Überblendung (alt `opacity` 1 → 0, neu 0 → 1). Größenänderungen skalieren, Positionsänderungen bewegen weich.
5. Danach verschwinden die Snapshots.[^mdn]

Ist das Dokument beim Aufruf verborgen (anderer Tab aktiv, Fenster minimiert), wird der Übergang übersprungen.[^mdn]

### Pseudoelemente

```
::view-transition
└─ ::view-transition-group(name)
   └─ ::view-transition-image-pair(name)
      ├─ ::view-transition-old(name)
      └─ ::view-transition-new(name)
```

`:root` trägt standardmäßig `view-transition-name: root`. Bei Cross-Document-Übergängen existiert der Baum nur im Zieldokument.[^mdn]

### Einzelne Elemente getrennt animieren

Jedes Element mit eigenem `view-transition-name` bekommt eine eigene Gruppe und lässt sich eigens stylen. Der Name muss **eindeutig** sein – zwei sichtbare Elemente mit demselben Namen lassen den Übergang ausfallen. `match-element` vergibt automatisch eindeutige Namen.[^mdn]

### Anpassen

Dauer an der Gruppe setzen, damit `old` und `new` sie erben:[^mdn]

```css
::view-transition-group(root) {
  animation-duration: 0.3s;
}
```

Eigene Animationen gehören an `::view-transition-old()` und `::view-transition-new()`. Bei Cross-Document gehört das CSS ins Zieldokument, für beide Richtungen also in beide Seiten.[^mdn]

## Beispiele

Header beim Seitenwechsel ruhig stehen lassen, nur der Inhalt blendet über – auf beiden Seiten dasselbe CSS:

```css
@view-transition {
  navigation: auto;
}

.site-header {
  view-transition-name: site-header;
}
```

Der Header bekommt eine eigene Gruppe. Steht er auf beiden Seiten an derselben Stelle, gibt es für ihn nichts zu bewegen, während der Rest der Seite in der Gruppe `root` überblendet.[^mdn] Das Beispiel ist eigene Konstruktion; beim Seitenwechsel in Chrome 152 geprüft.

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

Die Keyframes `move-out`/`move-in` (nach oben herausschieben, von unten hereinschieben) stammen aus dem MDN-Beispiel.[^mdn] Auch `@view-transition` selbst lässt sich in `@media (prefers-reduced-motion: no-preference)` legen: In Chrome 152 lief der Übergang damit (`pagereveal` meldet eine View Transition). Den `reduce`-Fall konnte ich nicht prüfen. In den Quellen ist das nicht belegt.

## Eigene Notizen / Einordnung

- **Cross-Document ist das Interessante für klassische Websites** – ein Zweizeiler, der auch statisch erzeugte Seiten flüssiger wirken lässt. Firefox fehlt dort noch; ohne Unterstützung wird schlicht normal navigiert. Diese Rückfallwirkung folgt aus dem Opt-in-Mechanismus, ist aber nicht getestet.
- **Nicht jede Navigation braucht Bewegung.** Eine Überblendung ist unauffällig; schiebende oder zoomende Übergänge sind raumgreifende Bewegung und gehören an `prefers-reduced-motion`. Siehe [[animation/barrierearme-animationen|Barrierearme Animationen]].
- **Eindeutige Namen** sind die häufigste Fehlerquelle bei Listen: Jedes Element braucht einen eigenen Namen oder `match-element`.

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

Eigene Einordnung: Hinweise zu Rückfall und Bewegung, die Einbettung der MDN-Animation in die Media Query. In Chrome 152 (macOS), 2026-09-13 getestet: Same-Document-Übergang mit Feature-Erkennung, doppelter `view-transition-name` lässt `ready` mit `InvalidStateError` scheitern, Cross-Document-Übergang zwischen zwei Seiten. Nicht getestet: Safari, Firefox-Rückfall.

[^mdn]: [[quellen/artikel/view-transition-api-mdn|Using the View Transition API (MDN)]].
