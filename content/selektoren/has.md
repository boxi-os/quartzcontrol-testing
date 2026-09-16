---
type: page
status: active
publish: true
title: "CSS-Pseudoklasse has()"
description: "Elemente abhängig von ihrem Inhalt oder ihrer Nachbarschaft auswählen — und warum der Parent-Selector sparsam eingesetzt gehört."
---

# CSS-Pseudoklasse has()

## Kurz erklärt

`:has()` wählt ein Element danach aus, **was es enthält oder was ihm folgt**. Damit fällt die Einschränkung, dass CSS nur nach unten und nach vorn schauen kann.

```css
figure:has(figcaption) { margin-block-end: 2rem; }
```

<a href="beispiele/has-01-figure-mit-caption.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

Der geläufige Name „Parent Selector" beschreibt nur den einfachsten Fall. Weil im Argument beliebige Selektoren stehen dürfen, lassen sich auch Geschwister- und Zustandsbeziehungen ausdrücken.

## Hintergrund

Vor `:has()` brauchte jede Bedingung dieser Art JavaScript oder eine Hilfsklasse im Markup: „Karte anders stylen, wenn sie ein Bild enthält", „Label hervorheben, wenn die Checkbox aktiv ist", „Layout ändern, wenn ein Element fehlt". Diese Klassen mussten bei jeder Änderung im DOM mitgepflegt werden.

`:has()` verlagert das zurück ins CSS und hält es damit automatisch synchron zum tatsächlichen Zustand des Dokuments.

## Wichtige Aspekte

### Syntax

```css
<target>:has(<selector-liste>) { }
```

Die Selektoren im Argument sind **relativ zum Zielelement**. Ohne Kombinator meinen sie Nachfahren:

```css
a:has(> img)     { }  /* a mit direktem img-Kind */
p:has(+ img)     { }  /* p, auf das ein img folgt */
h2:has(~ .note)  { }  /* h2 mit späterem Geschwister .note */
section:has(h1, h2, h3) { }  /* eine der Bedingungen genügt */
```

Kombiniert mit weiteren Selektoren wird der Treffer weitergereicht:

```css
figure:has(figcaption) img { border-radius: 0; }
```

<a href="beispiele/has-02-bild-in-figure.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

### Negation

Die interessanteste Kombination ist die mit `:not()` — „enthält nicht":

```css
.card:not(:has(img)) { padding-block-start: 2rem; }
```

<a href="beispiele/has-03-karte-ohne-bild.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

### Spezifität

`:has()` selbst zählt nicht, aber es übernimmt die Spezifität des spezifischsten Selektors im Argument — wie `:is()`. `div:has(#main)` ist damit so spezifisch wie eine ID-Regel.

### Grenzen

- `:has()` lässt sich nicht in `:has()` schachteln.
- Pseudoelemente sind im Argument nicht zulässig.
- Es wirkt nur innerhalb des Dokuments, nicht über Shadow-DOM-Grenzen hinweg.

Diese Grenzen sind eigene Einordnung und nicht am Spezifikationstext gegengeprüft.

### Performance

`:has()` zwingt den Browser, Beziehungen rückwärts aufzulösen. In der Praxis ist das unkritisch, wenn das Zielelement eng gefasst ist. Sehr breite Selektoren wie `*:has(…)` oder `body:has(…)` in Kombination mit häufigen DOM-Änderungen sind der Fall, bei dem es teuer werden kann — gemessen ist das hier nicht.

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

Zustand am Wurzelelement — der Fall, für den man früher eine Klasse per JavaScript gesetzt hätte:

```css
body:has(dialog[open]) { overflow: hidden; }
```

<a href="beispiele/has-06-dialog-sperrt-scrollen.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

## Eigene Notizen / Einordnung

Der praktische Wert liegt weniger im „Parent Selector" als darin, **Zustand aus dem JavaScript herauszuhalten**. Vieles, wofür bisher eine `is-open`- oder `has-image`-Klasse gepflegt wurde, ist heute eine CSS-Regel.

Gegenargument dazu: Genau das macht Styles schwerer nachvollziehbar. Eine Regel, die weit oben im Baum ansetzt und auf ein tief liegendes Element reagiert, ist beim Debuggen schwer zu finden. Sparsam einsetzen und das Zielelement möglichst eng fassen.

### Browsersupport

`:has()` ist Baseline **widely available seit 2026-06-19**; Baseline *newly available* seit 2023-12-19 (Chrome/Edge 105, Firefox 121, Safari 15.4).

Firefox war der Nachzügler: Chrome und Safari konnten `:has()` schon 2022, Firefox erst ab Version 121 im Dezember 2023. Zum Erscheinungsdatum der Quelle war es also tatsächlich noch nicht überall verfügbar.

Quelle: `web-features` 3.36.0 (Baseline-Daten der W3C WebDX Community Group), lokal abgefragt am 2026-09-03.

## Siehe auch

- [[selektoren/nesting|CSS-Nesting]]
- [[grundlagen/farben|Farben in CSS]]

## Quellen

- [[quellen/artikel/has-kulturbanause|CSS-Pseudoklasse has() – CSS Parent-Selector]] — Syntax und Grundbeispiele

Negation, Spezifität, Grenzen, Performance-Hinweis und die Beispiele zu Formularzuständen stammen nicht aus der Quelle, sondern sind eigene Einordnung.
