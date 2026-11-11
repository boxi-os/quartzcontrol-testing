---
type: page
status: active
publish: true
title: "CSS-Pseudoklassen not(), is() und where()"
description: "Elemente ausschließen mit :not(), Selektoren bündeln mit :is() und :where() — und worin sich die drei bei Spezifität und Fehlertoleranz unterscheiden."
applies_to:
  - "Baseline-Angaben nach web-features 3.43.0, Stand 2026-10-18"
  - "Verhalten getestet in Chrome 155"
---

# CSS-Pseudoklassen not(), is() und where()

## Kurz erklärt

Alle drei nehmen eine **Liste von Selektoren** entgegen und prüfen, ob das Element selbst dazu passt:

- `:not(…)` trifft, wenn das Element zu **keinem** der Selektoren passt.
- `:is(…)` trifft, wenn es zu **irgendeinem** passt.
- `:where(…)` macht dasselbe wie `:is()`, zählt aber bei der Spezifität **nichts**.

```css
p:not(.hinweis) { color: CanvasText; }        /* alle p ohne .hinweis */
:is(article, aside) h2 { margin-top: 0; }      /* h2 in article oder aside */
:where(ul, ol)[class] { list-style: none; }     /* leicht überschreibbar */
```

Zusammen mit [[selektoren/has|:has()]] bilden sie so etwas wie die Logik der Selektoren: `:is()` ist das ODER, `:not()` das NICHT, und mehrere Bedingungen hintereinander ergeben ein UND.

## Hintergrund

Früher durfte in `:not()` nur ein einfacher Selektor stehen, also etwa `:not(.aktiv)` oder `:not(p)`. Seit Selectors Level 4 sind ganze Listen und komplexe Selektoren erlaubt, zum Beispiel `:not(.a, .b)` oder `a:not(nav a)`.[^mdn-not] `:is()` und `:where()` kamen mit derselben Spezifikation dazu.

Für die Praxis heißt das: Viele Regeln, die man früher mit langen Selektorlisten oder mit Hilfsklassen im HTML gelöst hat, lassen sich heute knapp und lesbar schreiben.

## Wichtige Aspekte

### :not() — „alles außer"

Der häufigste Einsatz ist eine Ausnahme von einer allgemeinen Regel:

```css
/* Trennlinie zwischen Listeneinträgen, aber nicht nach dem letzten */
li:not(:last-child) { border-block-end: 1px solid; }

/* Links, die nicht in der Navigation stehen */
a:not(nav a) { text-decoration-thickness: 2px; }

/* Bilder ohne Alternativtext sichtbar machen (Entwicklungshilfe) */
img:not([alt]) { outline: 4px solid red; }
```

<a href="beispiele/notiswhere-01-ausnahmen.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

Mehrere Selektoren in einem `:not()` bedeuten „weder das eine noch das andere": `:not(.a, .b)` ist gleichbedeutend mit `:not(.a):not(.b)`.[^mdn-not]

### Zwei typische Denkfehler bei :not()

**1. „Nicht X" trifft sehr viel.** `:not(.foo)` passt auf jedes Element ohne diese Klasse — auch auf `<html>` und `<body>`.[^mdn-not] Darum `:not()` fast immer an einen konkreten Selektor hängen (`p:not(.foo)`), nicht frei stehen lassen.

**2. Bei Nachfahren-Selektoren greift die Negation an der falschen Stelle.** `body :not(table) a` soll Links außerhalb von Tabellen treffen, trifft aber auch Links **in** Tabellen. Denn `tr`, `td` und Co. sind ja ebenfalls „kein `table`“ und erfüllen damit die Bedingung. Richtig ist, den ganzen Pfad in die Negation zu packen:[^mdn-not]

```css
body a:not(table a) { … }   /* nur Links, die nicht in einer Tabelle stehen */
```

<a href="beispiele/notiswhere-02-nachfahren-falle.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

### :is() — Selektorlisten zusammenfassen

`:is()` spart Schreibarbeit, wenn sich lange Kombinationen nur in einem Teil unterscheiden. MDN zeigt das mit verschachtelten Listen:[^mdn-is]

```css
/* statt 18 Zeilen wie "ol ol ul, ol ul ul, ol menu ul, …" */
:is(ol, ul, menu) :is(ol, ul, menu) :is(ul, menu) {
  list-style-type: square;
}
```

Ebenso bei Überschriften in Sektionen: `:is(section, article, aside, nav) h1` ersetzt vier einzelne Selektoren, und für jede weitere Verschachtelungsebene wächst die Liste ohne `:is()` explosionsartig an.

### :where() — dasselbe ohne Gewicht

`:where()` verhält sich wie `:is()`, hat aber immer die Spezifität 0.[^mdn-where] Das ist praktisch für **Grundstile**, die später leicht überschrieben werden sollen:

```css
:where(.inhalt) a { color: orange; }   /* Spezifität wie "a" allein */
footer a          { color: blue; }     /* gewinnt trotzdem */
```

<a href="beispiele/notiswhere-03-where-spezifitaet.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

Mit `:is(.inhalt) a` würde die Klasse mitzählen, und `footer a` käme nicht dagegen an. Das Beispiel stammt von MDN.[^mdn-where]

### Spezifität im Überblick

| Pseudoklasse | Spezifität |
| --- | --- |
| `:is(…)` | die des spezifischsten Selektors in der Liste |
| `:not(…)` | wie `:is()` — der spezifischste Selektor in der Liste zählt |
| `:where(…)` | immer 0 |
| `:has(…)` | wie `:is()` (siehe [[selektoren/has|CSS-Pseudoklasse has()]]) |

Daraus folgt eine Falle: `#foo:not(#bar)` trifft dasselbe Element wie `#foo`, ist aber so spezifisch wie zwei IDs.[^mdn-not] Eine einzige ID in einer `:is()`- oder `:not()`-Liste hebt die ganze Regel auf ID-Niveau, auch wenn das Element über eine harmlose Klasse aus derselben Liste getroffen wird.

### Fehlertoleranz: wo eine Liste kaputtgeht

Normalerweise gilt in CSS: Enthält eine Selektorliste einen ungültigen oder unbekannten Selektor, wird die **ganze** Regel verworfen.

- `:is()` und `:where()` nehmen eine **fehlertolerante** Liste (*forgiving selector list*): Unbekannte Einträge werden einfach ignoriert, der Rest gilt weiter.[^mdn-is]
- `:not()` ist **nicht** fehlertolerant. Ein unbekannter Selektor darin macht die ganze Regel ungültig.[^mdn-not]

Wer in `:not()` etwas Neues ausprobieren will, kann es mit `:is()` absichern:

```css
p:not(.foo, :neue-pseudoklasse)       { … }   /* ganze Regel ungültig, wenn unbekannt */
p:not(:is(.foo, :neue-pseudoklasse))  { … }   /* bleibt gültig, wirkt wie p:not(.foo) */
```

<a href="beispiele/notiswhere-04-fehlertoleranz.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

### Was nicht geht

In keiner der drei Pseudoklassen dürfen Pseudoelemente stehen.[^mdn-not][^mdn-is] `a:is(::before, ::after)` funktioniert also nicht; dafür braucht es die klassische Liste `a::before, a::after`.

## Beispiele

**Abstände nur zwischen Elementen** (statt am Ende wieder abzuziehen):

```css
.stack > :not(:first-child) { margin-block-start: 1rem; }
```

**Externe Links markieren**, aber nicht die eigenen:

```css
a[href^="http"]:not([href*="example.org"])::after { content: " ↗"; }
```

**Zebrastreifen, die ausgeblendete Zeilen überspringen** — hier steckt `:not()` in `:nth-child()`:[^mdn-nth]

```css
tbody tr:nth-child(even of :not([hidden])) { background: whitesmoke; }
```

**Karten ohne Bild** — die Kombination mit `:has()`. Wichtig ist die Reihenfolge, denn `:not(:has(…))` und `:has(:not(…))` bedeuten etwas völlig anderes; ausführlich in [[selektoren/nach-inhalt-auswaehlen|Elemente anhand ihres Inhalts auswählen]].

```css
.karte:not(:has(img)) { padding-block-start: 2rem; }
```

## Eigene Notizen / Einordnung

`:not()` ist das Werkzeug, mit dem man am schnellsten zu viel trifft. Faustregel: immer an einen konkreten Selektor binden und bei Nachfahren-Selektoren den Pfad **in** die Negation schreiben.

`:where()` ist im Alltag unterschätzt. Für Reset- und Basis-Stylesheets ist es oft die einfachere Alternative zu Cascade Layers (`@layer`), wenn es nur darum geht, dass eigene Komponentenregeln ohne Spezifitäts-Wettrüsten gewinnen. Für größere Strukturen bleiben Layer das bessere Mittel, weil sie die Reihenfolge ganzer Regelgruppen festlegen.

`:is()` ist vor allem Lesbarkeit. Bei [[selektoren/nesting|CSS-Nesting]] taucht es ohnehin implizit auf, weil verschachtelte Selektoren intern wie `:is()` behandelt werden — inklusive der Spezifitätsfalle.

### Browsersupport

- `:not()` mit einfachem Selektor: Baseline *widely available* seit 2018-01-29.
- `:not()` mit **Selektorliste** (Level 4): Baseline *newly available* seit 2021-01-21, *widely available* seit 2023-07-21 (Chrome 88, Firefox 84, Safari 9).
- `:is()` und `:where()`: Baseline *newly available* seit 2021-01-21, *widely available* seit 2023-07-21 (Chrome 88, Firefox 82, Safari 14).

MDN zeigt für `:not()` oben „available since July 2015" an; das bezieht sich auf die alte Form mit einem einzelnen Selektor, nicht auf Listen.

Quelle: `web-features` 3.43.0 (Baseline-Daten der W3C WebDX Community Group), lokal abgefragt am 2026-10-18.

Alle Codebeispiele dieser Seite habe ich am 2026-10-18 in Chrome 155 nachgestellt, auch die beiden Denkfehler, die Spezifitätsfalle mit `#foo:not(#bar)` und die Fehlertoleranz. Firefox und Safari habe ich nicht getestet.

## Siehe auch

- [[selektoren/has|CSS-Pseudoklasse has()]]
- [[selektoren/nach-inhalt-auswaehlen|Elemente anhand ihres Inhalts auswählen]]
- [[selektoren/nesting|CSS-Nesting]]

## Quellen

- [[quellen/artikel/not-mdn|not() Pseudoklasse (MDN)]] — Syntax, Fallstricke, Fehlertoleranz
- [[quellen/artikel/is-mdn|is() Pseudoklasse (MDN)]] — Selektorlisten vereinfachen, fehlertolerante Liste
- [[quellen/artikel/where-mdn|where() Pseudoklasse (MDN)]] — Spezifität 0 im Vergleich zu `:is()`
- [[quellen/artikel/nth-child-mdn|nth-child() Pseudoklasse (MDN)]] — `of <selector>`-Syntax

Die Beispiele zu Abständen, externen Links und `img:not([alt])` sowie die Einordnung zu `:where()` vs. Cascade Layers sind eigene Ergänzungen. Die Aussage, Nesting verhalte sich intern wie `:is()`, stützt sich auf [[selektoren/nesting|CSS-Nesting]] und ist hier nicht neu geprüft.

[^mdn-not]: [[quellen/artikel/not-mdn|not() Pseudoklasse (MDN)]], Abschnitte „Parameters" und „Description", Stand 2026-09-10.
[^mdn-is]: [[quellen/artikel/is-mdn|is() Pseudoklasse (MDN)]], Abschnitte „Forgiving Selector Parsing" und „Examples", Stand 2026-05-27.
[^mdn-where]: [[quellen/artikel/where-mdn|where() Pseudoklasse (MDN)]], Beispiel „Comparing :where() and :is()", Stand 2026-04-17.
[^mdn-nth]: [[quellen/artikel/nth-child-mdn|nth-child() Pseudoklasse (MDN)]], Beispiel „Using of selector to fix striped tables", Stand 2026-07-17.
