---
type: page
status: active
publish: true
title: "CSS-Nesting"
description: "Native Verschachtelung in CSS ohne Präprozessor: der &-Selektor, die Spezifitätsfalle und wie flach man verschachteln sollte."
applies_to:
  - "Baseline-Angaben nach web-features 3.36.0, Stand 2026-09-03"
---
# CSS-Nesting

## Kurz erklärt

In CSS kann man Regeln ineinander schreiben, statt jeden Selektor vollständig auszuschreiben. Jahrelang war das der Hauptgrund, überhaupt Sass zu benutzen. Heute kann es der Browser selbst, ganz ohne Build-Schritt.

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

Der Gewinn liegt nicht darin, dass man weniger tippt, sondern dass **alles beisammen steht**: Zustände, Breakpoints und Kindelemente einer Komponente stehen an einer Stelle. Wer die Komponente löscht, löscht ihre Sonderfälle gleich mit, statt sie irgendwo im Stylesheet zu vergessen.

Der Nachteil ist derselbe wie bei Sass: Man ist versucht, die HTML-Struktur eins zu eins nachzubauen. So entstehen lange, spezifische Selektoren, die sich später nur mit noch spezifischeren überschreiben lassen.

## Wichtige Aspekte

### Der `&`-Selektor

`&` steht für den übergeordneten Selektor. Man braucht es, sobald etwas direkt am übergeordneten Selektor hängt:

```css
.button {
  &:hover { }        /* .button:hover */
  &::after { }       /* .button::after */
  &.is-active { }    /* .button.is-active — ohne & wäre es ein Nachfahre */
  .theme-dark & { }  /* .theme-dark .button — Elternkontext */
}
```

Bei `&:hover` oder `&.is-active` darf zwischen `&` und dem Rest kein Leerzeichen stehen, sonst wird daraus ein Nachfahre. Für einfache Nachfahren (`.card .title`) braucht man `&` gar nicht.

### Kombinatoren

Eine verschachtelte Regel darf mit `>`, `+` oder `~` anfangen:

```css
.nav {
  > .menu { }   /* .nav > .menu */
  + .content { } /* .nav + .content */
}
```

### `@`-Regeln

`@media`, `@supports` und `@container` lassen sich verschachteln, und das ist einer der Hauptgründe für Nesting. `@font-face`, `@keyframes` und `@import` dagegen nicht, die gehören auf die oberste Ebene.

### Spezifität

Der wichtigste Fallstrick, und der am seltensten erwähnte: Ein verschachtelter Selektor verhält sich wie `:is()` und übernimmt die Spezifität des **spezifischsten** Selektors in der Liste. `h2, .title { & span { } }` ist damit spezifischer als der ausgeschriebene `h2 span`. Bei gemischten Selektorlisten kann deshalb eine Regel gewinnen, mit der man nicht gerechnet hat.

### Cascade Layers schlagen Spezifität

Nesting verschiebt die Spezifität, `@layer` hebelt sie aus. Beides sollte man zusammen im Blick haben. Am häufigsten überrascht dabei diese Regel: **CSS ohne Layer schlägt CSS in einem Layer, egal wie spezifisch es ist.** Irgendeine Regel außerhalb eines Layers gewinnt also gegen eine sehr spezifische Regel in `@layer`.

Für erzeugtes CSS heißt das: **Es gehört in denselben Layer wie das CSS, das es nachbildet.** Wer fremde Regeln kopiert, etwa Kompatibilitätsblöcke oder nachgebaute Themes, und sie ohne Layer einfügt, überholt damit nicht nur das Original, sondern auch alle, die das Original überschreiben dürften.

Zwei Faustregeln, die daraus folgen:

- **Wer fremdes CSS abschreibt, übernimmt beides:** die Regeln *und* den Layer.
- Ob wirklich alles übernommen wurde, prüft man Regel für Regel gegen das Original, nicht aus dem Gedächtnis.

Eigene Regeln, die etwas regeln, das sonst niemand regelt, dürfen dagegen bewusst ohne Layer bleiben.

### Verschachtelungstiefe

Faustregel: **höchstens eine Ebene unter dem Selektor der Komponente.** Wird es tiefer, sollte der innere Teil fast immer eine eigene Komponente sein.

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

Gilt eine Media Query für mehrere Komponenten, gehört sie **nicht** verschachtelt in eine davon, sondern als eigener Block auf die oberste Ebene.

## Eigene Notizen / Einordnung

Nesting hilft beim Ordnen, ersetzt aber keine durchdachte Struktur. Guten Code macht es lesbarer, schlechten dagegen schneller unübersichtlich, weil die Spezifität unbemerkt wächst.

Für eigene Projekte: nutzen, aber flach halten und die Spezifitätsregel im Kopf behalten. Zusammen mit [[selektoren/has|CSS-Pseudoklasse has()]], `color-mix()` (siehe [[grundlagen/farben|Farben in CSS]]) und Custom Properties bleibt von den alten Argumenten für Sass kaum etwas übrig, außer Variablen, die nur beim Build existieren, und Mixins.

### Browsersupport

Nesting ist Baseline **widely available seit 2026-06-11**; Baseline *newly available* war es seit 2023-12-11 (Chrome/Edge 120, Firefox 117, Safari 17.2).

Breit verfügbar ist Nesting also erst seit wenigen Monaten, deutlich kürzer, als es sich anfühlt. Frühere Fassungen der Syntax verlangten `&` auch vor Nachfahren-Selektoren, deshalb sieht Code aus dieser Zeit anders aus.

Quelle: `web-features` 3.36.0 (Baseline-Daten der W3C WebDX Community Group), lokal abgefragt am 2026-09-03.

## Siehe auch

- [[selektoren/has|CSS-Pseudoklasse has()]]
- [[grundlagen/farben|Farben in CSS]]

## Quellen

- [[quellen/artikel/nesting-kulturbanause|CSS-Nesting (kulturbanause)]] — Syntax, Media Queries, Warnung vor zu tiefer Verschachtelung

Der Abschnitt zur Spezifität, die Faustregel mit der einen Ebene und der Vergleich mit Sass stammen nicht aus der Quelle, sondern sind eigene Einordnung und nicht an der Spezifikation gegengeprüft. Dasselbe gilt für den Abschnitt zu Cascade Layers: Er stammt aus eigener Projektpraxis (Kompatibilitäts-CSS, das Regeln fremder Plugins nachbildet) und ist ebenfalls nicht an der Spezifikation gegengeprüft.
