---
type: page
status: active
publish: true
title: "CSS Custom Properties"
description: "CSS-Variablen von der Vererbung bis @property: Auflösungszeitpunkt, Typisierung, Animierbarkeit und die häufigsten Missverständnisse."
applies_to:
  - "Baseline-Angaben nach web-features 3.36.0, Stand 2026-09-03"
---

# CSS Custom Properties

## Kurz erklärt

Custom Properties sind eigene CSS-Eigenschaften mit frei wählbarem Namen, der mit `--` beginnt. Ausgelesen werden sie mit `var()`.

Der entscheidende Unterschied zu Variablen aus Präprozessoren: Sie sind **Teil der Kaskade**. Sie werden vererbt, lassen sich pro Element überschreiben, reagieren auf Media Queries und können aus JavaScript gelesen und gesetzt werden. Eine Sass-Variable gibt es dagegen nur bis zum Build, vom DOM weiß sie nichts.

Streng genommen ist eine Custom Property keine Variable, sie *ermöglicht* nur eine, die man dann über `var()` verwendet. In der Praxis benutzen sogar die Spezifikation und MDN beide Begriffe nebeneinander.

## Hintergrund

### Wann `var()` ausgewertet wird: die wichtigste Falle

`var()` wird in dem Moment eingesetzt, in dem die **Eigenschaft, in der es steht,** auf ein Element angewendet wird. Danach steht der Wert fest und wird als fertiger Wert weitervererbt.

```html
<style>
  body { --farbe: red; }
  ul   { color: var(--farbe); }
  li   { --farbe: blue; }
</style>
<ul><li>Welt</li></ul>
```

<a href="beispiele/variablen-01-aufloesungszeitpunkt.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

Das `li` bleibt **rot**. `color` wurde schon am `ul` ausgewertet, und vererbt wird das Ergebnis, nicht die Formel. `--farbe: blue` am `li` bewirkt nichts, weil dort keine Eigenschaft `var(--farbe)` benutzt.

Anders ist es, wenn die Regel mit `var()` direkt auf das Element selbst zielt:

```html
<style>
  p           { color: var(--farbe); }
  section.a   { --farbe: red; }
  section.b   { --farbe: blue; }
</style>
```

<a href="beispiele/variablen-02-aufloesung-pro-element.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

Hier wird für jedes `p` neu ausgewertet, weil die `color`-Deklaration jedes Mal am `p` selbst greift und `--farbe` von der jeweiligen `section` erbt. Ergebnis: erster Absatz rot, zweiter blau.

**Faustregel:** Die Custom Property muss an dem Element (oder einem Vorfahren davon) gesetzt sein, an dem die Eigenschaft mit `var()` greift, nicht dort, wo die Farbe am Ende zu sehen ist.

### Was im Wert stehen darf

Im Wert darf fast alles stehen, aber eine Bedingung ist unverhandelbar: **Nach dem Einsetzen muss an der Stelle gültiges CSS stehen.**

- Die öffnende Klammer einer CSS-Funktion kann nicht aus der Variablen kommen.
- Wert und Einheit müssen zusammen in der Variablen stehen, oder die Einheit wird per `calc()` angehängt.
- Bei Text gehören die Anführungszeichen in den Wert. So ein Wert taugt dann nur dort, wo Text erwartet wird (`content`, `font-family`).

Bei Namen zählt die Groß- und Kleinschreibung (`--self` ≠ `--Self`). Sie dürfen Unicode ab `\x80` enthalten (Umlaute, sogar Emojis), aber keine Leerzeichen.

### Fallback in `var()`

```css
color: var(--akzentfarbe, red);
```

Der Fallback greift, wenn die Property nicht gesetzt ist. Ist der Fallback selbst ungültig, gilt `unset`. Als Absicherung für alte Browser braucht man ihn nicht mehr, weil alle Browser Custom Properties können. Als bewusster Standardwert in wiederverwendbaren Komponenten ist er aber nützlich.

## Wichtige Aspekte

### Registrieren mit `@property`

Ohne Registrierung kennt der Browser den Typ einer Custom Property nicht, für ihn ist der Wert nur eine Folge von Zeichen. Mit `@property` (oder `CSS.registerProperty()`) bekommt sie einen Typ, ein Vererbungsverhalten und einen Anfangswert.

```css
@property --textcolor {
  syntax: "<color>";
  inherits: true;
  initial-value: white;
}
```

<a href="beispiele/variablen-03-property-animierbar.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

Was das bringt:

- **Animierbar.** Ohne Typ kann der Browser keine Zwischenwerte berechnen und springt zwischen den Keyframe-Werten hart um. Erst mit Registrierung gibt es weiche Übergänge.
- **Fehler fallen früher auf.** Ein ungültiger Wert wird schon beim Zuweisen verworfen. Ohne Registrierung wird er gespeichert, überschreibt einen geerbten Wert, und der Fehler zeigt sich erst dort, wo die Variable benutzt wird, also an einer ganz anderen Stelle.
- **Vererbung lässt sich abschalten** (`inherits: false`). Das ist nützlich für Werte, die nur lokal gelten sollen.
- **Ein zentraler Standardwert** statt eines Fallbacks in jedem einzelnen `var()`.

### Zusammenspiel mit `calc()`

Custom Properties speichern Werte, `calc()` macht sie rechenbar. Siehe [[grundlagen/berechnungen|CSS calc()]].

```css
.icon {
  --scale: 1;
  font-size: calc(var(--scale) * 1rem);  /* Einheit anhängen */
}
```

<a href="beispiele/variablen-04-skalieren.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

### Aus JavaScript

- Lesen: `getComputedStyle(el).getPropertyValue('--name')`. Das liefert immer einen String, Längen sind in px umgerechnet. Über `el.computedStyleMap()` bekommt man bei registrierten Properties auch den Typ.
- Setzen: `el.style.setProperty('--baseHue', wert)`.

So baut man üblicherweise Themes, die man selbst einstellen kann: Ein Regler schreibt einen Wert, und das ganze Stylesheet passt sich an.

### Mehr als Farben

- **Teilwerte:** `--akzent: 195 46 4`, verwendet als `rgb(var(--akzent) / 0.5)`. So hat man eine Farbe in beliebiger Deckkraft.
- **Doppelte Deklarationen vermeiden:** `--clip` einmal setzen und an `-webkit-clip-path` und `clip-path` zuweisen.
- **Werte nach Position:** `sibling-index()` und `sibling-count()` liefern die Position und die Anzahl unter den Geschwistern und funktionieren in `calc()`. Damit muss man keine Index-Variablen mehr per `:nth-child` von Hand setzen.
- **Reines CSS statt JavaScript:** ein Countdown über `--duration` im `style`-Attribut, verwendet in `animation-duration` und `steps()`.

### Was nicht geht

`@media (max-width: var(--breakpoint))` funktioniert nicht, denn in Media Queries lassen sich Custom Properties nicht verwenden. `@custom-media` steht zwar seit Jahren in Media Queries Level 5, wird aber offenbar von keinem Browser umgesetzt.

## Beispiele

Theme mit Dark Mode über einen Satz Tokens:

```css
:root {
  --bg:   oklch(0.95 0.02 90);
  --text: oklch(0.35 0.03 260);
}

[data-theme="dark"] {
  --bg:   oklch(0.18 0.02 260);
  --text: oklch(0.92 0.02 90);
}

body { background: var(--bg); color: var(--text); }
```

<a href="beispiele/variablen-05-farbschema.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

Soll ein Token in beiden Modi **gleich** sein, lässt man es im Dark-Block ganz weg, statt den hellen Wert dorthin zu kopieren. Dann gilt auch im dunklen Modus die Deklaration aus `:root`, und eine spätere Änderung am hellen Wert wirkt in beiden Modi. Eine Kopie sieht heute gleich aus, zieht aber später nicht mehr mit. Allgemein gesagt: „Übernimm den Wert von X“ drückt man aus, indem man **keinen** eigenen Wert setzt, nicht durch denselben Wert.[^eigene-werte]

Countdown ohne JavaScript:

```html
<div class="time-bar" style="--duration: 9"><div></div></div>
```

```css
.time-bar div {
  animation: roundtime calc(var(--duration) * 1s) steps(var(--duration)) forwards;
  transform-origin: left center;
}
@keyframes roundtime { to { transform: scaleX(0); } }
```

<a href="beispiele/variablen-06-countdown.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

Dass hier `transform: scaleX()` animiert wird und nicht `width`, ist Absicht: Das ist für den Browser deutlich günstiger.

## Eigene Notizen / Einordnung

Faustregel: **Custom Properties in `:root` sind Design-Tokens, Custom Properties an Komponenten sind Parameter.** Die erste Gruppe pflegt man global (Farben, Abstände, Zeiten), die zweite überschreibt man lokal. Genau dafür ist die Kaskade da, und genau das kann ein Präprozessor nicht.

Zwei Punkte, die oft unterschätzt werden:

- **`@property` sollte der Normalfall sein**, nicht die Ausnahme. Allein dass sich registrierte Properties animieren lassen, lohnt sich schon. Dazu kommt die frühe Typprüfung, die eine besonders lästige Art von Fehler verhindert: einen kaputten Wert, der erst weit weg von seiner Ursache auffällt.
- **Der Zeitpunkt, zu dem `var()` ausgewertet wird, steckt hinter den meisten „Warum ändert sich nichts?“-Momenten.** Wer einmal verstanden hat, dass das Ergebnis vererbt wird und nicht die Formel, macht den Fehler nicht wieder.

### Browsersupport

| Feature | Baseline | Seit | Ab Version |
| --- | --- | --- | --- |
| Custom Properties | widely available | 2019-10-05 (newly: 2017-04-05) | Chrome 49, Firefox 31, Safari 9.1 |
| `@property` (registrierte Properties) | newly available | 2024-07-09 | Chrome 85, Firefox 128, Safari 16.4 |
| `sibling-index()` / `sibling-count()` | newly available | 2026-08-18 | Chrome 138, Firefox 154, Safari 26.2 |

**Korrektur einer früheren Annahme:** `@property` ist *nicht* breit verfügbar. Es ist seit Juli 2024 Baseline *newly available*: Alle aktuellen Browser können es, aber die Schwelle zur breiten Verfügbarkeit ist noch nicht erreicht. Der Rat oben, `@property` zum Normalfall zu machen, gilt deshalb für Projekte, die keine älteren Browser unterstützen müssen. Sonst braucht es einen Fallback. `sibling-index()` und `sibling-count()` gibt es erst seit Mitte August 2026 in allen Browsern, sie sind also noch sehr neu.

Nicht geprüft ist, wie sich sehr viele Properties oder lange `var()`-Ketten auf die Performance auswirken.

Quelle: `web-features` 3.36.0 (Baseline-Daten der W3C WebDX Community Group), lokal abgefragt am 2026-09-03.

## Siehe auch

- [[grundlagen/berechnungen|CSS calc()]]
- [[grundlagen/farben|Farben in CSS]]
- [[selektoren/nesting|CSS-Nesting]]

## Quellen

- [[quellen/artikel/custom-properties-selfhtml|CSS Custom properties (CSS-Variablen) (SELFHTML)]] — Syntax, `@property`, Auflösungszeitpunkt, Anwendungsbeispiele
- [[quellen/artikel/relative-farbangaben|Relative Farbangaben (SELFHTML)]] — Paletten aus einer Grundfarbe ableiten
- [[quellen/artikel/calc-mediaevent|CSS calc – Rechnen mit gemischten CSS-Einheiten]] — Variablen in Berechnungen, auch für Zeiten
- [[quellen/artikel/calc-mdn|calc() CSS-Funktion (MDN)]] — Auflösung verschachtelter Variablen

Eigene Einordnung, nicht aus den Quellen: die Trennung in Tokens und Parameter, die Empfehlung, `@property` zum Normalfall zu machen, und die Einschätzung, dass der Auswertungszeitpunkt von `var()` die häufigste Fehlerquelle ist.

[^eigene-werte]: Projekterfahrung aus einer Theme-Oberfläche (QuartzControl 1.0.1, 2026-09-28): Die Option „In beiden Modi gleich“ füllte den dunklen Wert mit dem hellen, statt ihn zu entfernen; spätere Änderungen am hellen Wert kamen im dunklen Modus nicht mehr an.
