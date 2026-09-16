---
type: page
status: active
publish: true
title: "CSS-Nesting"
description: "Native Verschachtelung in CSS ohne Präprozessor: der &-Selektor, die Spezifitätsfalle und wie flach man verschachteln sollte."
---
# CSS-Nesting

## Kurz erklärt

CSS erlaubt es, Regeln ineinander zu schreiben, statt jeden Selektor vollständig auszuformulieren. Was jahrelang der Hauptgrund war, überhaupt Sass einzusetzen, geht heute nativ im Browser — ohne Build-Schritt.

```css
.card {
  padding: 1rem;

  .title { font-size: 1.5rem; }

  &:hover { border-color: currentColor; }

  @media (min-width: 48rem) { padding: 2rem; }
}
```

<a href="beispiele/nesting-01-karte.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

## Hintergrund

Der Gewinn ist nicht Tipparbeit, sondern **Lokalität**: Alles, was zu einer Komponente gehört — Zustände, Breakpoints, Kindelemente — steht an einer Stelle. Wer die Komponente löscht, löscht auch ihre Sonderfälle mit, statt sie irgendwo im Stylesheet zurückzulassen.

Der Preis ist derselbe wie bei Sass: Verschachtelung verführt dazu, die HTML-Struktur eins zu eins nachzubauen. Das erzeugt lange, spezifische Selektoren, die sich später nur mit noch spezifischeren überschreiben lassen.

## Wichtige Aspekte

### Der `&`-Selektor

`&` steht für den übergeordneten Selektor. Nötig, sobald etwas direkt am Elternselektor hängt:

```css
.button {
  &:hover { }        /* .button:hover */
  &::after { }       /* .button::after */
  &.is-active { }    /* .button.is-active — ohne & wäre es ein Nachfahre */
  .theme-dark & { }  /* .theme-dark .button — Elternkontext */
}
```

Nach `&` darf kein Leerzeichen stehen. Für einfache Nachfahren (`.card .title`) ist `&` nicht erforderlich.

### Kombinatoren

`>`, `+` und `~` dürfen die verschachtelte Regel eröffnen:

```css
.nav {
  > .menu { }   /* .nav > .menu */
  + .content { } /* .nav + .content */
}
```

### `@`-Regeln

`@media`, `@supports` und `@container` sind verschachtelbar und einer der Hauptgründe für Nesting. `@font-face`, `@keyframes` und `@import` sind es nicht — sie gehören auf die oberste Ebene.

### Spezifität

Der wichtigste Fallstrick, und der am seltensten erwähnte: Ein verschachtelter Selektor verhält sich wie `:is()` und übernimmt die Spezifität des **spezifischsten** Selektors in der Liste. `h2, .title { & span { } }` ist damit spezifischer als der ausgeschriebene `h2 span`. Bei gemischten Selektorlisten kann das Regeln unerwartet gewinnen lassen.

### Kaskadenschichten schlagen Spezifität

Nesting verschiebt Spezifität, `@layer` hebelt sie aus — beides gehört zusammen gedacht. Die Regel, die dabei am häufigsten überrascht: **Ungeschichtetes CSS schlägt geschichtetes, unabhängig von der Spezifität.** Eine unbeteiligte Regel außerhalb jeder Schicht gewinnt also gegen eine sehr spezifische Regel in `@layer`.

Praktische Folge für erzeugtes CSS: **Es gehört in die Kaskadenschicht dessen, was es nachspricht.** Wer fremde Regeln kopiert — Kompatibilitätsblöcke, Theme-Nachbauten — und das ungeschichtet tut, überholt damit nicht nur die Quelle, sondern auch jeden, der die Quelle überschreiben dürfte.

Zwei Sätze, die daraus folgen:

- **Wer fremdes CSS abschreibt, schreibt beide Hälften ab** — Regeln *und* Schicht.
- Die Behauptung „vollständig übernommen" wird Regel für Regel gegen die Quelle geprüft, nicht gegen die Erinnerung an sie.

Eigene Regeln, die eine Frage beantworten, die sonst niemand beantwortet, dürfen dagegen bewusst ungeschichtet bleiben.

### Verschachtelungstiefe

Faustregel: **höchstens eine Ebene unter dem Komponenten-Selektor.** Wird es tiefer, ist das fast immer ein Hinweis darauf, dass die innere Struktur eine eigene Komponente sein sollte.

```css
/* Zu tief */
.container { .card { .title { &:hover { } } } }

/* Besser: .card auf oberste Ebene ziehen */
.container { }
.card { .title { &:hover { } } }
```

## Beispiele

Zustände und Breakpoints bei der Komponente statt am Ende des Stylesheets:

```css
.button {
  background: var(--brand);
  color: white;

  &:hover  { background: color-mix(in oklab, var(--brand) 80%, black); }
  &:focus-visible { outline: 2px solid currentColor; }
  &[disabled] { opacity: 0.5; cursor: not-allowed; }
}
```

<a href="beispiele/nesting-02-button.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

Gilt eine Media Query für mehrere Komponenten, gehört sie **nicht** ins Nesting, sondern als eigener Block nach außen.

## Eigene Notizen / Einordnung

Nesting ist eine Strukturhilfe, kein Architekturersatz. Es verbessert lesbaren Code, macht schlechten aber schneller unübersichtlich, weil die Spezifität im Verborgenen wächst.

Für dieses Vault und eigene Projekte: nutzen, aber flach halten und die Spezifitätsregel im Kopf behalten. Zusammen mit [[selektoren/has|CSS-Pseudoklasse has()]], `color-mix()` (siehe [[grundlagen/farben|Farben in CSS]]) und Custom Properties bleibt von den ursprünglichen Sass-Argumenten kaum noch etwas übrig — außer Variablen-Scoping zur Buildzeit und Mixins.

### Browsersupport

Nesting ist Baseline **widely available seit 2026-06-11**; Baseline *newly available* war es seit 2023-12-11 (Chrome/Edge 120, Firefox 117, Safari 17.2).

Die breite Verfügbarkeit ist also erst wenige Monate alt — deutlich jünger, als das Gefühl „gibt es doch schon lange" nahelegt. Ältere Syntaxvarianten verlangten `&` auch vor Nachfahren-Selektoren; Code aus dieser Zeit sieht deshalb anders aus.

Quelle: `web-features` 3.36.0 (Baseline-Daten der W3C WebDX Community Group), lokal abgefragt am 2026-09-03.

## Siehe auch

- [[selektoren/has|CSS-Pseudoklasse has()]]
- [[grundlagen/farben|Farben in CSS]]

## Quellen

- [[quellen/artikel/nesting-kulturbanause|CSS-Nesting (kulturbanause)]] — Syntax, Media Queries, Warnung vor zu tiefer Verschachtelung

Der Abschnitt zur Spezifität, die Ein-Ebenen-Faustregel und die Einordnung gegenüber Sass stammen nicht aus der Quelle, sondern sind eigene Einordnung und nicht am Spezifikationstext gegengeprüft. Dasselbe gilt für den Abschnitt zu Kaskadenschichten: Er stammt aus eigener Projektpraxis (Kompatibilitäts-CSS, das fremde Plugin-Regeln nachspricht) und ist ebenfalls nicht am Spezifikationstext gegengeprüft.
