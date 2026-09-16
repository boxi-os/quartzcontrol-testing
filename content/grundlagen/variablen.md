---
type: page
status: active
publish: true
title: "CSS Custom Properties"
description: "CSS-Variablen von der Vererbung bis @property: Auflösungszeitpunkt, Typisierung, Animierbarkeit und die häufigsten Missverständnisse."
---

# CSS Custom Properties

## Kurz erklärt

Custom Properties sind eigene CSS-Eigenschaften mit frei wählbarem Namen, der mit `--` beginnt. Ausgelesen werden sie mit `var()`.

Der entscheidende Unterschied zu Präprozessor-Variablen: Sie sind **Teil der Kaskade**. Sie werden vererbt, können pro Element überschrieben werden, reagieren auf Media Queries und lassen sich aus JavaScript lesen und setzen. Eine Sass-Variable existiert nur bis zum Build und weiß nichts vom DOM.

Streng genommen ist eine benutzerdefinierte Eigenschaft keine Variable — sie *ermöglicht* eine Variable, die über `var()` verwendet wird. In der Praxis benutzen sogar Spezifikation und MDN beide Begriffe nebeneinander.

## Hintergrund

### Der Auflösungszeitpunkt — die wichtigste Falle

`var()` wird in dem Moment aufgelöst, in dem die **umgebende Eigenschaft** auf ein Element angewendet wird. Danach ist der Wert eingefroren und wird als fertiger Wert weitervererbt.

```html
<style>
  body { --farbe: red; }
  ul   { color: var(--farbe); }
  li   { --farbe: blue; }
</style>
<ul><li>Welt</li></ul>
```

<a href="beispiele/variablen-01-aufloesungszeitpunkt.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

Das `li` bleibt **rot**. `color` wurde bereits auf dem `ul` aufgelöst — vererbt wird der berechnete Wert, nicht die Rechenvorschrift. Das `--farbe: blue` auf dem `li` hat keine Wirkung, weil dort keine Eigenschaft `var(--farbe)` verwendet.

Anders liegt der Fall, wenn die verwendende Regel auf dem Element selbst greift:

```html
<style>
  p           { color: var(--farbe); }
  section.a   { --farbe: red; }
  section.b   { --farbe: blue; }
</style>
```

<a href="beispiele/variablen-02-aufloesung-pro-element.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

Hier wird pro `p` neu aufgelöst, weil die `color`-Deklaration jedes Mal auf dem `p` angewendet wird und `--farbe` von der jeweiligen `section` erbt. Ergebnis: erster Absatz rot, zweiter blau.

**Faustregel:** Das Custom Property muss dort gesetzt sein, wo das Element steht, das die verwendende Eigenschaft trägt — nicht dort, wo die Farbe erscheinen soll.

### Was im Wert stehen darf

Der Wert ist fast beliebig, aber es gilt eine harte Bedingung: **Nach dem Einsetzen muss an der Stelle gültige CSS-Syntax stehen.**

- Die öffnende Klammer einer CSS-Funktion kann nicht aus der Variablen kommen.
- Wert und Einheit müssen gemeinsam in der Variablen stehen — oder die Einheit wird per `calc()` angehängt.
- Anführungszeichen einer Zeichenkette müssen im Wert enthalten sein; ein so notierter Wert ist dann nur dort brauchbar, wo eine Zeichenkette erwartet wird (`content`, `font-family`).

Namen sind **case-sensitive** (`--self` ≠ `--Self`), dürfen Unicode ab `\x80` enthalten (Umlaute, sogar Emojis) und keine Leerzeichen.

### Fallback in `var()`

```css
color: var(--akzentfarbe, red);
```

Greift, wenn das Property nicht gesetzt ist. Ist der Fallback selbst ungültig, gilt `unset`. Als Browserschutz braucht man ihn nicht mehr — der Support ist lückenlos —, als bewusste Vorgabe in wiederverwendbaren Komponenten ist er nützlich.

## Wichtige Aspekte

### Registrieren mit `@property`

Ohne Registrierung ist der Typ eines Custom Property unbekannt: alles ist ein Token-Strom. Mit `@property` (oder `CSS.registerProperty()`) bekommt es Typ, Vererbungsverhalten und Anfangswert.

```css
@property --textcolor {
  syntax: "<color>";
  inherits: true;
  initial-value: white;
}
```

<a href="beispiele/variablen-03-property-animierbar.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

Was das bringt:

- **Animierbarkeit.** Ohne Typ kann der Browser nicht interpolieren und schaltet zwischen Keyframe-Werten hart um. Erst die Registrierung macht weiche Übergänge auf Custom Properties möglich.
- **Frühe Fehlererkennung.** Ein ungültiger Wert wird schon beim Zuweisen verworfen. Ohne Registrierung wird er gespeichert, überschreibt einen geerbten Wert, und der Fehler fällt erst bei der Verwendung auf — an einer ganz anderen Stelle.
- **Vererbung abschaltbar** (`inherits: false`) — nützlich für Werte, die nur lokal gelten sollen.
- **Ein zentraler Defaultwert** statt eines wiederholten Fallbacks in jedem `var()`.

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

- Lesen: `getComputedStyle(el).getPropertyValue('--name')` — immer als Zeichenkette, Längen in px umgerechnet. Über `el.computedStyleMap()` kommt bei registrierten Properties auch der deklarierte Typ zurück.
- Setzen: `el.style.setProperty('--baseHue', wert)`.

Das ist der Standardweg für Themes, die der Nutzer selbst einstellt — ein Regler schreibt einen Wert, das komplette Stylesheet zieht nach.

### Mehr als Farben

- **Teilwerte:** `--akzent: 195 46 4`, verwendet als `rgb(var(--akzent) / 0.5)` — eine Farbe, beliebige Deckkraft.
- **Doppelte Deklarationen entkoppeln:** `--clip` einmal setzen, an `-webkit-clip-path` und `clip-path` zuweisen.
- **Positionsabhängige Werte:** `sibling-index()` und `sibling-count()` liefern Position und Anzahl unter Geschwistern und funktionieren in `calc()`; damit entfallen manuell pro `:nth-child` gesetzte Index-Variablen.
- **Reines CSS statt JavaScript:** ein Countdown über `--duration` im `style`-Attribut, verwendet in `animation-duration` und `steps()`.

### Was nicht geht

`@media (max-width: var(--breakpoint))` funktioniert nicht — in Media Queries sind Custom Properties nicht verwendbar. `@custom-media` steht seit Jahren in Media Queries Level 5, wird aber offenbar nicht implementiert.

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

`transform: scaleX()` statt `width` zu animieren, ist die performantere Variante.

## Eigene Notizen / Einordnung

Arbeitsregel: **Custom Properties in `:root` sind Design-Tokens, Custom Properties auf Komponenten sind Parameter.** Die erste Gruppe wird global gepflegt (Farben, Abstandsraster, Zeiten), die zweite lokal überschrieben — genau dafür ist die Kaskade da, und genau das kann ein Präprozessor nicht.

Zwei Punkte, die ich für unterschätzt halte:

- **`@property` sollte der Normalfall werden**, nicht die Ausnahme. Der Animierbarkeitspunkt allein ist es wert; die frühe Typprüfung erspart dazu eine unangenehme Fehlerklasse, bei der ein kaputter Wert erst weit entfernt von seiner Ursache auffällt.
- **Der Auflösungszeitpunkt ist der Grund für die meisten „warum ändert sich nichts"-Momente.** Wer einmal verstanden hat, dass der berechnete Wert vererbt wird und nicht die Vorschrift, macht den Fehler nicht wieder.

### Browsersupport

| Feature | Baseline | Seit | Ab Version |
| --- | --- | --- | --- |
| Custom Properties | widely available | 2019-10-05 (newly: 2017-04-05) | Chrome 49, Firefox 31, Safari 9.1 |
| `@property` (registrierte Properties) | newly available | 2024-07-09 | Chrome 85, Firefox 128, Safari 16.4 |
| `sibling-index()` / `sibling-count()` | newly available | 2026-08-18 | Chrome 138, Firefox 154, Safari 26.2 |

**Korrektur zur früheren Annahme:** `@property` ist *nicht* breit verfügbar. Es ist seit Juli 2024 Baseline *newly available* — alle aktuellen Browser können es, aber die Schwelle zur breiten Verfügbarkeit ist noch nicht erreicht. Der Rat oben, `@property` zum Normalfall zu machen, gilt deshalb für Projekte ohne Anspruch auf ältere Browserstände; sonst braucht es einen Fallback. `sibling-index()`/`sibling-count()` sind erst seit Mitte August 2026 in allen Browsern und damit noch sehr neu.

Nicht geprüft bleibt das Performanceverhalten bei sehr vielen Properties oder tiefen `var()`-Ketten.

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

Eigene Einordnung, nicht aus den Quellen: die Trennung Tokens/Parameter, die Empfehlung, `@property` zum Normalfall zu machen, und die Bewertung des Auflösungszeitpunkts als häufigste Fehlerquelle.
