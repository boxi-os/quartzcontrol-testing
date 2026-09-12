---
type: page
status: active
publish: true
title: "CSS-Pseudoklasse has() – CSS Parent-Selector"
description: "Quellennotiz zu einem kulturbanause-Artikel über die Pseudoklasse :has() als Parent-Selector."
authors:
  - "Konstantin Hanke"
publisher: "Agentur kulturbanause"
source_published: "2022-03-30"
url: "https://kulturbanause.de/blog/css-pseudoklasse-has/"
archive_url:
source_kind: secondary
---

# CSS-Pseudoklasse has() – CSS Parent-Selector

## Quelle / bibliografische Angaben

Kurzer Blogartikel der Agentur kulturbanause zur relationalen Pseudoklasse `:has()`. Der Doppelpunkt des Originaltitels (`:has()`) fehlt im Dateinamen, weil er plattformübergreifend nicht zulässig ist.

- Autor laut Frontmatter des Clips: Konstantin Hanke. Byline auf der Seite: „Konstantin", „Jonas"; der zweite Name ist nicht mit Nachnamen belegt.
- Stand laut Seite: erschienen 2022-03-30, „Aktualisiert von 2022 – 2023"
- URL: <https://kulturbanause.de/blog/css-pseudoklasse-has/>, abgerufen 2026-09-02
- Erfasst über den Obsidian Web Clipper; ausgewertet wurde der geclippte Text, nicht die Live-Seite.

## Kurzfassung

Mit `:has()` lassen sich Elemente abhängig von untergeordneten oder nachfolgenden Elementen auswählen. Die verbreitete Bezeichnung „Parent Selector" greift laut Artikel zu kurz, weil sich auch Geschwisterbeziehungen und komplexere Konstellationen ausdrücken lassen.

## Kernaussagen

### Syntax

```css
<target>:has(<selector>) { /* … */ }
```

`<target>` ist das Element, das gestylt wird, `<selector>` die Bedingung. Die Selektoren im Argument verhalten sich relativ zum Zielselektor. Mehrere Bedingungen werden kommasepariert angegeben.

### Beispiele aus dem Artikel

```css
/* Elternelement in Abhängigkeit vom Kind */
figure:has(figcaption) { /* … */ }
section:has(h1, h2, h3) { /* … */ }

/* Direktes Kind */
a:has(> img) { /* … */ }

/* Nachfolgendes Geschwisterelement */
p:has(+ img) { /* … */ }

/* Kombination mit Nachfahren-Selektor */
figure:has(figcaption) img { /* … */ }
```

### Einordnung des Artikels

`:has()` ist mehr als ein Parent Selector: In Kombination mit anderen Pseudoklassen wie `:not()` lassen sich komplexe relationale Selektoren bauen, die sehr zielgerichtetes Styling erlauben.

## Eigene Einordnung

Knapper, korrekter Einstieg — allerdings sehr dünn und auf dem Stand von 2022/2023. Anmerkungen:

- Im Originalbeispiel steht `section:has(h1, h2, h3))` mit einer überzähligen schließenden Klammer. In der Wiedergabe oben ist der Tippfehler korrigiert.
- Der Artikel nennt weder Browsersupport noch Performance-Hinweise. `:has()` war zum Erscheinungszeitpunkt in Firefox noch nicht verfügbar; das ist inzwischen erledigt, hier aber nicht gegengeprüft.
- Nicht erwähnt: `:has()` ist selbst nicht in `:has()` schachtelbar und funktioniert nicht mit Pseudoelementen. Meine Einordnung, nicht am Spezifikationstext geprüft.
- Ebenfalls nicht erwähnt: Die Spezifität von `:has()` richtet sich nach dem spezifischsten Selektor im Argument, ähnlich `:is()`.

Verdichtetes Wissen steht in [[selektoren/has|CSS-Pseudoklasse has()]].

## Verknüpftes Wissen

- [[selektoren/has|CSS-Pseudoklasse has()]]
- [[selektoren/nesting|CSS-Nesting]]

## Offene Fragen

- Browsersupport und praktische Performance-Auswirkungen sind im Artikel nicht behandelt und hier nicht recherchiert.
- Der Artikel verlinkt einen weiteren Beitrag zu CSS-Selektoren, der nicht ausgewertet ist.
