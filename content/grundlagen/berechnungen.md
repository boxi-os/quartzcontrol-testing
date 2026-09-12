---
type: page
status: active
publish: true
title: "CSS calc()"
description: "Rechnen mit gemischten Einheiten in CSS: Syntax, Fallstricke, das Zusammenspiel mit Custom Properties und wo modernere Werkzeuge besser passen."
---

# CSS calc()

## Kurz erklärt

`calc()` rechnet direkt im Stylesheet und steht überall dort, wo sonst ein Zahlenwert stünde. Der eigentliche Grund für die Funktion ist nicht die Rechnung selbst, sondern dass sie **Einheiten mischen kann**: `100% - 150px` kennt weder ein Präprozessor noch eine statische Angabe, weil erst der Browser weiß, wie viel 100 % gerade sind.

Zwei Konsequenzen daraus:

- `calc()` wird **zur Laufzeit** ausgewertet, nicht zur Buildzeit. Es reagiert auf Fenstergröße, Schriftgröße und Custom Properties.
- Es ersetzt in vielen Fällen JavaScript, das sonst bei jedem Resize nachrechnen müsste.

## Hintergrund

### Die Leerzeichenregel und ihr Grund

Bei `+` und `-` müssen beide Seiten von Leerzeichen umgeben sein. Das ist keine Stilfrage, sondern Parsing:

```css
width: calc(50% -8px);   /* ungültig: Prozentwert, dann negative Länge — zwei Werte */
width: calc(50% - 8px);  /* gültig: Prozentwert, Minusoperator, Länge */
```

`-8px` ist eine gültige Längenangabe, deshalb kann der Parser das Minus nicht als Operator erkennen. Bei `*` und `/` besteht diese Mehrdeutigkeit nicht; Leerzeichen sind dort optional, der Konsistenz halber aber sinnvoll.

### Was herauskommen darf

Der Ausdruck muss einen für den Kontext gültigen Typ ergeben — `<length>`, `<percentage>`, `<angle>`, `<time>`, `<number>`, `<integer>`, `<frequency>`, `<flex>`, `<resolution>` oder einen Mischtyp wie `<length-percentage>`.

```css
margin: calc(1px + 2px);  /* gültig */
margin: calc(1 + 2);      /* ungültig — entspräche margin: 3 */
```

`calc()` ersetzt immer den **ganzen** Wert, nie nur die Zahl davor: `calc(100 / 4)%` ist ungültig, `calc(100% / 4)` richtig.

### Einheiten bei Multiplikation und Division

- **Multiplikation:** höchstens ein Operand mit Einheit. `200px * 4px` wäre px² und ergibt in CSS keinen Sinn.
- **Division:** Einheiten auf beiden Seiten sind erlaubt, wenn sie vom selben Typ sind — `200px / 4px` ergibt `50`, `100vw / 1px` einen einheitslosen Wert. Dieser Quotient lässt sich dann weiterverwenden, wo eine `<number>` erwartet wird.

### Grenzen

- Keine Rechnung auf intrinsischen Größen (`auto`, `fit-content`). Dafür ist `calc-size()` gedacht.
- Verschachtelte `calc()` sind erlaubt und verhalten sich exakt wie Klammern.
- Wird ein `<integer>` erwartet, wird gerundet — bei genau `.5` Richtung positiv unendlich: `calc(1.5)` → `2`, `calc(-1.5)` → `-1`.

## Wichtige Aspekte

### Zusammenspiel mit Custom Properties

Das ist der Fall, für den `calc()` heute vor allem gebraucht wird. Ein Wert wird einmal gesetzt, alles andere leitet sich ab:

```css
:root {
  --space: 1rem;
  --time: 6s;
}

.card      { padding: calc(var(--space) * 1.5); }
.slider    { animation-duration: calc(var(--time) * 4); }
.progress  { animation-duration: var(--time); }
```

Der Slideshow-Fall zeigt den Nutzen am deutlichsten: Zwei Animationen mit unterschiedlicher Dauer bleiben zwangsläufig synchron, weil beide auf derselben Variablen sitzen.

### Einheiten anhängen

Custom Properties können einheitslose Zahlen tragen; die Einheit kommt per Multiplikation dazu. Das ist der Standardtrick, wenn ein Wert aus dem HTML oder aus JavaScript kommt:

```css
.time-bar { --duration: 9; }              /* auch als style="--duration: 9" im HTML */
.time-bar div {
  animation-duration: calc(var(--duration) * 1s);
}
```

`var(--scale) + 'px'` funktioniert nicht — CSS kennt keine Stringkonkatenation für Werte.

### Auf Farbkanälen

In der relativen Farbsyntax rechnet `calc()` direkt auf den Kanal-Schlüsselwörtern. Das ist die Grundlage abgeleiteter Paletten (siehe [[grundlagen/farben|Farben in CSS]]):

```css
--accent-complement: oklch(from var(--base) l c calc(h + 180));
--base-light:        oklch(from var(--base) calc(l + 0.25) c h);
```

### Barrierefreiheit

Wird `calc()` für Textgrößen verwendet, muss mindestens ein Operand eine relative Einheit sein, sonst skaliert der Text beim Zoomen nicht mit:

```css
h1 { font-size: calc(1.5rem + 3vw); }
```

Für Schriftgrößen ist `clamp()` allerdings meist die bessere Wahl, weil es Minimum und Maximum gleich mitbringt.

## Beispiele

Inhalt neben fester Spalte:

```css
* { box-sizing: border-box; }
.content { width: calc(100% - 135px); }
.sidebar { width: 135px; }
```

Raster, dessen Spaltenzahl nur über die Division wechselt:

```css
.col { width: calc(100% / 3); }

@media (min-width: 800px)  { .col { width: calc(100% / 8);  } }
@media (min-width: 1000px) { .col { width: calc(100% / 12); } }
```

Zentrieren ohne bekannte Containerbreite:

```css
figcaption {
  position: absolute;
  max-width: 300px;
  left:  calc(50% - 150px);
  right: calc(50% - 150px);
}
```

## Eigene Notizen / Einordnung

Arbeitsregel: **`calc()` dort einsetzen, wo die Rechenvorschrift die Absicht ausdrückt** — `calc(100% / 3)` sagt „ein Drittel", `33.3333%` sagt nichts. Der Support ist seit Jahren lückenlos, es gibt also keinen Grund, aus Vorsicht auf ausgerechnete Werte zurückzufallen.

Wo `calc()` heute *nicht* mehr die erste Wahl ist:

- **Spaltenraster.** Das Beispiel oben stammt aus der Float-Ära. `grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))` kommt ohne Media Queries aus. `calc()` bleibt im Vorteil, wenn die Teilung fest vorgegeben ist statt vom Platz abzuhängen.
- **Fluide Schriftgrößen.** `clamp(1.4rem, 3vw, 2rem)` ist ausdrucksstärker als eine `calc()`-Konstruktion mit separaten Min/Max-Regeln.

Der eigentliche Dauerbrenner ist die Kombination mit Custom Properties: ein Basiswert, alles andere abgeleitet. Das gilt für Abstände genauso wie für Zeiten und Farben.

### Browsersupport

| Feature | Baseline | Seit | Ab Version |
| --- | --- | --- | --- |
| `calc()` (Kern) | widely available | 2018-01-29 (newly: 2015-07-29) | Chrome 26, Firefox 16, Safari 7 |
| Schlüsselwörter in `calc()` (`pi`, `e`, `infinity`) | widely available | 2025-12-06 (newly: 2023-06-06) | Chrome 110, Firefox 114, Safari 16 |
| `calc-size()` | **nicht Baseline** | – | bisher nur Chrome/Edge 129 |

`calc-size()` ist damit kein Werkzeug für Produktivcode, sondern etwas zum Beobachten. Die MDN-Angabe zu Juli 2015 meint das Datum, an dem alle damaligen Browser den Kern unterstützten, nicht die 30 Monate später erreichte breite Verfügbarkeit.

Die typisierte Arithmetik mit Einheiten auf beiden Seiten der Division führen die Baseline-Daten nicht als eigenes Feature; dazu ist hier keine belastbare Aussage möglich.

Quelle: `web-features` 3.36.0 (Baseline-Daten der W3C WebDX Community Group), lokal abgefragt am 2026-09-03.

## Siehe auch

- [[grundlagen/variablen|CSS Custom Properties]]
- [[grundlagen/farben|Farben in CSS]]

## Quellen

- [[quellen/artikel/calc-mdn|calc() CSS-Funktion (MDN)]] — formale Referenz: Typen, Rundung, typisierte Arithmetik, Grammatik
- [[quellen/artikel/calc-mediaevent|CSS calc – Rechnen mit gemischten CSS-Einheiten]] — Begründung der Leerzeichenregel, Zeit- und Variablenbeispiele
- [[quellen/artikel/calc-kulturbanause|Die CSS calc()-Funktion – Berechnungen mit CSS]] — Layoutbeispiele (Sidebar, Spaltenraster)
- [[quellen/artikel/custom-properties-selfhtml|CSS Custom properties (CSS-Variablen) (SELFHTML)]] — Einheit anhängen, Countdown-Beispiel

Eigene Ergänzung, nicht aus den Quellen: die Einordnung, wo Grid und `clamp()` heute die bessere Wahl sind, sowie die Arbeitsregel zur Lesbarkeit. Die MediaEvent-Quelle behauptet, `calc()` sei in `:root` nicht verwendbar — das ist so nicht richtig und in [[quellen/artikel/calc-mediaevent|CSS calc – Rechnen mit gemischten CSS-Einheiten]] richtiggestellt.
