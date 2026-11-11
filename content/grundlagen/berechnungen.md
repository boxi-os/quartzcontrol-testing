---
type: page
status: active
publish: true
title: "CSS calc()"
description: "Rechnen mit gemischten Einheiten in CSS: Syntax, Fallstricke, das Zusammenspiel mit Custom Properties und wo modernere Werkzeuge besser passen."
applies_to:
  - "Baseline-Angaben nach web-features 3.36.0, Stand 2026-09-03"
---

# CSS calc()

## Kurz erklärt

`calc()` rechnet direkt im Stylesheet und kann überall stehen, wo sonst ein Zahlenwert stünde. Das Besondere ist dabei nicht das Rechnen an sich, sondern dass sich **Einheiten mischen lassen**: `100% - 150px` kann kein Präprozessor ausrechnen, weil erst der Browser weiß, wie viel 100 % gerade sind.

Daraus folgt zweierlei:

- `calc()` wird **zur Laufzeit** ausgewertet, nicht zur Buildzeit. Es reagiert auf Fenstergröße, Schriftgröße und Custom Properties.
- Oft spart man sich damit JavaScript, das sonst bei jeder Größenänderung neu rechnen müsste.

## Hintergrund

### Die Leerzeichenregel und ihr Grund

Um `+` und `-` muss auf beiden Seiten ein Leerzeichen stehen. Das ist keine Geschmacksfrage, sonst kann der Browser den Ausdruck nicht richtig lesen:

```css
width: calc(50% -8px);   /* ungültig: Prozentwert, dann negative Länge — zwei Werte */
width: calc(50% - 8px);  /* gültig: Prozentwert, Minusoperator, Länge */
```

`-8px` ist für sich schon eine gültige Länge. Ohne Leerzeichen erkennt der Parser das Minus deshalb nicht als Rechenzeichen. Bei `*` und `/` gibt es dieses Problem nicht. Dort sind Leerzeichen freiwillig, man setzt sie aber besser einheitlich.

### Was herauskommen darf

Das Ergebnis muss zu der Eigenschaft passen, in der es steht: eine Länge, ein Prozentwert, ein Winkel, eine Zeit, eine Zahl und so weiter. Formal heißen diese Typen `<length>`, `<percentage>`, `<angle>`, `<time>`, `<number>`, `<integer>`, `<frequency>`, `<flex>` und `<resolution>`, dazu kommen Mischtypen wie `<length-percentage>`.

```css
margin: calc(1px + 2px);  /* gültig */
margin: calc(1 + 2);      /* ungültig — entspräche margin: 3 */
```

`calc()` steht immer für den **ganzen** Wert, nicht nur für die Zahl davor: `calc(100 / 4)%` ist ungültig, `calc(100% / 4)` ist richtig.

### Einheiten bei Multiplikation und Division

- **Multiplikation:** Nur einer der beiden Werte darf eine Einheit haben. `200px * 4px` wäre px², und damit kann CSS nichts anfangen.
- **Division:** Hier dürfen beide Seiten eine Einheit haben, solange es dieselbe Art von Einheit ist. `200px / 4px` ergibt `50`, `100vw / 1px` eine Zahl ohne Einheit. Diese Zahl kann man überall weiterverwenden, wo eine `<number>` erwartet wird.

### Grenzen

- Mit Größen wie `auto` oder `fit-content` kann `calc()` nicht rechnen. Dafür ist `calc-size()` gedacht.
- `calc()` darf in `calc()` stehen und wirkt dann genau wie eine Klammer.
- Wird eine ganze Zahl (`<integer>`) erwartet, rundet der Browser. Bei genau `.5` rundet er nach oben: `calc(1.5)` → `2`, `calc(-1.5)` → `-1`.

## Wichtige Aspekte

### Zusammenspiel mit Custom Properties

Dafür braucht man `calc()` heute am häufigsten. Man setzt einen Wert einmal und leitet alles andere davon ab:

```css
:root {
  --space: 1rem;
  --time: 6s;
}

.card      { padding: calc(var(--space) * 1.5); }
.slider    { animation-duration: calc(var(--time) * 4); }
.progress  { animation-duration: var(--time); }
```

<a href="beispiele/calc-01-custom-properties.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

Am deutlichsten wird der Nutzen bei der Slideshow: Die beiden Animationen dauern unterschiedlich lang, bleiben aber immer im Takt, weil beide an derselben Variablen hängen.

### Einheiten anhängen

Eine Custom Property kann auch eine nackte Zahl enthalten. Die Einheit kommt dann durch eine Multiplikation dazu. So macht man das üblicherweise, wenn der Wert aus dem HTML oder aus JavaScript kommt:

```css
.time-bar { --duration: 9; }              /* auch als style="--duration: 9" im HTML */
.time-bar div {
  animation-duration: calc(var(--duration) * 1s);
}
```

<a href="beispiele/calc-02-einheit-anhaengen.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

`var(--scale) + 'px'` funktioniert nicht, weil CSS Werte nicht wie Strings aneinanderhängen kann.

### Auf Farbkanälen

In der relativen Farbsyntax kann `calc()` direkt mit den einzelnen Farbkanälen rechnen. Darauf bauen abgeleitete Farbpaletten auf (siehe [[grundlagen/farben|Farben in CSS]]):

```css
--accent-complement: oklch(from var(--base) l c calc(h + 180));
--base-light:        oklch(from var(--base) calc(l + 0.25) c h);
```

### Barrierefreiheit

Wenn man mit `calc()` Schriftgrößen berechnet, muss mindestens ein Wert eine relative Einheit wie `rem` haben. Sonst wächst der Text beim Zoomen nicht mit:

```css
h1 { font-size: calc(1.5rem + 3vw); }
```

<a href="beispiele/calc-03-fluide-schrift.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

Für Schriftgrößen ist `clamp()` aber meist besser, weil man damit gleich Minimum und Maximum festlegt.

## Beispiele

Inhalt neben fester Spalte:

```css
* { box-sizing: border-box; }
.content { width: calc(100% - 135px); }
.sidebar { width: 135px; }
```

<a href="beispiele/calc-04-inhalt-sidebar.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

Raster, bei dem sich je nach Breite nur der Teiler ändert:

```css
.col { width: calc(100% / 3); }

@media (min-width: 800px)  { .col { width: calc(100% / 8);  } }
@media (min-width: 1000px) { .col { width: calc(100% / 12); } }
```

<a href="beispiele/calc-05-spalten.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

Zentrieren, ohne die Breite des Containers zu kennen:

```css
figcaption {
  position: absolute;
  max-width: 300px;
  left:  calc(50% - 150px);
  right: calc(50% - 150px);
}
```

<a href="beispiele/calc-06-zentrierte-bildunterschrift.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

## Eigene Notizen / Einordnung

Faustregel: **`calc()` immer dann, wenn man der Rechnung ansieht, was gemeint ist.** `calc(100% / 3)` sagt „ein Drittel“, `33.3333%` sagt gar nichts. Alle Browser können `calc()` seit Jahren, aus Vorsicht muss man also keine Werte mehr vorher ausrechnen.

Wo `calc()` heute *nicht* mehr die erste Wahl ist:

- **Spaltenraster.** Das Beispiel oben stammt noch aus der Zeit der Float-Layouts. `grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))` kommt ganz ohne Media Queries aus. `calc()` lohnt sich nur noch, wenn die Spaltenzahl fest vorgegeben ist und nicht vom Platz abhängt.
- **Fluide Schriftgrößen.** `clamp(1.4rem, 3vw, 2rem)` ist kürzer und klarer als eine `calc()`-Rechnung mit eigenen Regeln für Minimum und Maximum.

Wirklich unverzichtbar bleibt `calc()` zusammen mit Custom Properties: ein Grundwert, und alles andere wird davon abgeleitet. Das klappt bei Abständen genauso wie bei Zeiten und Farben.

### Browsersupport

| Feature | Baseline | Seit | Ab Version |
| --- | --- | --- | --- |
| `calc()` (Kern) | widely available | 2018-01-29 (newly: 2015-07-29) | Chrome 26, Firefox 16, Safari 7 |
| Schlüsselwörter in `calc()` (`pi`, `e`, `infinity`) | widely available | 2025-12-06 (newly: 2023-06-06) | Chrome 110, Firefox 114, Safari 16 |
| `calc-size()` | **nicht Baseline** | – | bisher nur Chrome/Edge 129 |

`calc-size()` gehört damit noch nicht in Produktivcode, man sollte es aber im Auge behalten. Wenn MDN „Juli 2015“ angibt, ist der Tag gemeint, ab dem alle damaligen Browser `calc()` konnten. Breit verfügbar im Sinne von Baseline war es erst 30 Monate später.

Für die Division mit Einheiten auf beiden Seiten (typed arithmetic) gibt es in den Baseline-Daten keinen eigenen Eintrag. Ob sie überall funktioniert, lässt sich daraus also nicht ablesen.

Quelle: `web-features` 3.36.0 (Baseline-Daten der W3C WebDX Community Group), lokal abgefragt am 2026-09-03.

## Siehe auch

- [[grundlagen/variablen|CSS Custom Properties]]
- [[grundlagen/farben|Farben in CSS]]

## Quellen

- [[quellen/artikel/calc-mdn|calc() CSS-Funktion (MDN)]] — formale Referenz: Typen, Rundung, typed arithmetic, Grammatik
- [[quellen/artikel/calc-mediaevent|CSS calc – Rechnen mit gemischten CSS-Einheiten]] — Begründung der Leerzeichenregel, Zeit- und Variablenbeispiele
- [[quellen/artikel/calc-kulturbanause|Die CSS calc()-Funktion – Berechnungen mit CSS]] — Layoutbeispiele (Sidebar, Spaltenraster)
- [[quellen/artikel/custom-properties-selfhtml|CSS Custom properties (CSS-Variablen) (SELFHTML)]] — Einheit anhängen, Countdown-Beispiel

Nicht aus den Quellen, sondern eigene Ergänzung: wo Grid und `clamp()` heute besser passen und die Faustregel zur Lesbarkeit. Die MediaEvent-Quelle behauptet, `calc()` lasse sich in `:root` nicht verwenden. Das stimmt so nicht und ist in [[quellen/artikel/calc-mediaevent|CSS calc – Rechnen mit gemischten CSS-Einheiten]] richtiggestellt.
