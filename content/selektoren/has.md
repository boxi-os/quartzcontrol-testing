---
type: page
status: active
publish: true
title: "CSS-Pseudoklasse has()"
description: "Elemente abhängig von ihrem Inhalt oder ihrer Nachbarschaft auswählen — und warum der Parent-Selector sparsam eingesetzt gehört."
applies_to:
  - "Baseline-Angaben nach web-features 3.36.0, Stand 2026-09-03"
---

# CSS-Pseudoklasse has()

## Kurz erklärt

`:has()` wählt ein Element danach aus, **was es enthält oder was ihm folgt**. Bisher konnte CSS nur nach unten und nach vorn schauen, mit `:has()` geht es auch nach oben und zurück.

```css
figure:has(figcaption) { margin-block-end: 2rem; }
```

<a href="beispiele/has-01-figure-mit-caption.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

Der geläufige Name „Parent Selector“ beschreibt nur den einfachsten Fall. In den Klammern dürfen beliebige Selektoren stehen, also kann man auch nach Geschwistern und Zuständen fragen.

## Hintergrund

Vor `:has()` brauchte jede Bedingung dieser Art JavaScript oder eine Hilfsklasse im HTML: „Karte anders stylen, wenn sie ein Bild enthält“, „Label hervorheben, wenn die Checkbox aktiv ist“, „Layout ändern, wenn ein Element fehlt“. Diese Klassen musste man bei jeder Änderung im DOM mitpflegen.

Mit `:has()` wandert das zurück ins CSS. Die Darstellung passt dann automatisch zu dem, was tatsächlich im Dokument steht.

## Wichtige Aspekte

### Syntax

```css
<target>:has(<selector-liste>) { }
```

Die Selektoren in den Klammern gehen **vom Zielelement aus**. Ohne Kombinator sind Nachfahren gemeint:

```css
a:has(> img)     { }  /* a mit direktem img-Kind */
p:has(+ img)     { }  /* p, auf das ein img folgt */
h2:has(~ .note)  { }  /* h2 mit späterem Geschwister .note */
section:has(h1, h2, h3) { }  /* eine der Bedingungen genügt */
```

Man kann von dort aus auch weiter nach innen gehen und etwas anderes stylen als das Element mit `:has()`:

```css
figure:has(figcaption) img { border-radius: 0; }
```

<a href="beispiele/has-02-bild-in-figure.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

### Negation

Am nützlichsten ist die Kombination mit `:not()`, also „enthält nicht“:

```css
.card:not(:has(img)) { padding-block-start: 2rem; }
```

<a href="beispiele/has-03-karte-ohne-bild.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

### Spezifität

`:has()` selbst zählt nicht, übernimmt aber wie `:is()` die Spezifität des spezifischsten Selektors in den Klammern. `div:has(#main)` ist damit so spezifisch wie eine ID-Regel.

### Grenzen

- `:has()` lässt sich nicht in `:has()` schachteln.[^mdn-has]
- Pseudoelemente sind weder in den Klammern noch als Ziel erlaubt. Viele Pseudoelemente hängen vom Styling ihrer Vorfahren ab, die Abfrage könnte sich also im Kreis drehen.[^mdn-has]
- Es wirkt nur innerhalb des Dokuments, nicht über Shadow-DOM-Grenzen hinweg.

Die ersten beiden Grenzen sind durch MDN belegt, die dritte ist eigene Einordnung und nicht gegengeprüft. In Chrome 155 verwirft der Browser Regeln mit geschachteltem `:has()` oder Pseudoelement darin komplett (getestet am 2026-10-18).

### Performance

Bei `:has()` muss der Browser Beziehungen rückwärts auflösen. In der Praxis ist das unproblematisch, solange das Zielelement eng gefasst ist. Teuer werden kann es bei sehr breiten Selektoren wie `*:has(…)` oder `body:has(…)`, wenn sich gleichzeitig das DOM häufig ändert. Gemessen habe ich das nicht. MDN rät ebenfalls, das Element vor `:has()` nicht zu breit zu wählen (also nicht `body`, `:root` oder `*`) und die Bedingung in den Klammern eng zu fassen, etwa mit `>` oder `+`.[^mdn-has]

## Beispiele

Formularfeld abhängig vom Zustand seines Inputs:

```css
.field:has(input:invalid)   { border-color: crimson; }
.field:has(input:focus)     { outline: 2px solid var(--brand); }
.field:has(input:checked) .label { font-weight: 600; }
```

<a href="beispiele/has-04-formularfeld.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

Layoutentscheidung abhängig vom Inhalt:

```css
.card:has(> .media) { grid-template-columns: 8rem 1fr; }
```

<a href="beispiele/has-05-karte-mit-media.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

Zustand am Wurzelelement. Dafür hätte man früher per JavaScript eine Klasse gesetzt:

```css
body:has(dialog[open]) { overflow: hidden; }
```

<a href="beispiele/has-06-dialog-sperrt-scrollen.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

## Eigene Notizen / Einordnung

Der praktische Nutzen liegt weniger im „Parent Selector“ als darin, **Zustände nicht mehr per JavaScript verwalten zu müssen**. Vieles, wofür man bisher eine `is-open`- oder `has-image`-Klasse gepflegt hat, ist heute eine CSS-Regel.

Das hat aber auch eine Kehrseite: Styles werden schwerer nachvollziehbar. Eine Regel, die weit oben im Baum ansetzt und auf ein tief verschachteltes Element reagiert, findet man beim Debuggen nur schwer. Deshalb sparsam einsetzen und das Zielelement möglichst eng fassen.

### Browsersupport

`:has()` ist Baseline **widely available seit 2026-06-19**; Baseline *newly available* seit 2023-12-19 (Chrome/Edge 105, Firefox 121, Safari 15.4).

Firefox kam als Letzter dazu: Chrome und Safari konnten `:has()` schon 2022, Firefox erst ab Version 121 im Dezember 2023. Als die Quelle erschien, ging es also tatsächlich noch nicht überall.

Quelle: `web-features` 3.36.0 (Baseline-Daten der W3C WebDX Community Group), lokal abgefragt am 2026-09-03.

## Siehe auch

- [[selektoren/nach-inhalt-auswaehlen|Elemente anhand ihres Inhalts auswählen]] – viele Rezepte mit `:has()`
- [[selektoren/not-is-where|CSS-Pseudoklassen not(), is() und where()]]
- [[komponenten/klickbare-karte|Ganze Karte klickbar machen]]
- [[selektoren/nesting|CSS-Nesting]]
- [[grundlagen/farben|Farben in CSS]]

## Quellen

- [[quellen/artikel/has-kulturbanause|CSS-Pseudoklasse has() – CSS Parent-Selector]] — Syntax und Grundbeispiele
- [[quellen/artikel/has-mdn|has() Pseudoklasse (MDN)]] — Grenzen und Performance

Negation, Spezifität, die Grenze beim Shadow DOM und die Beispiele zu Formularzuständen stammen nicht aus den Quellen, sondern sind eigene Einordnung.

[^mdn-has]: [[quellen/artikel/has-mdn|has() Pseudoklasse (MDN)]], Abschnitte „Description“ und „Performance considerations“, Stand 2026-08-11.
