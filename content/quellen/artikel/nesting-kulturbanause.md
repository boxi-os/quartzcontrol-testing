---
type: page
status: active
publish: true
title: "CSS-Nesting (kulturbanause)"
description: "Quellennotiz zu einem kulturbanause-Artikel über natives CSS-Nesting, samt Hinweis auf ein fehlerhaftes Codebeispiel."
authors:
  - "Charleen Warkentin"
publisher: "Agentur kulturbanause"
source_published: "2025-04-11"
url: "https://kulturbanause.de/blog/css-nesting/"
archive_url:
source_kind: secondary
---

# CSS-Nesting (kulturbanause)

## Quelle / bibliografische Angaben

Blogartikel der Agentur kulturbanause zum nativen CSS-Nesting. Der Dateiname trägt den Zusatz „(kulturbanause)", weil der Originaltitel mit der Wissensnotiz [[selektoren/nesting|CSS-Nesting]] kollidieren würde.

- Autorin laut Frontmatter des Clips: Charleen Warkentin. Byline auf der Seite: „Charleen", „Jonas"; der zweite Name ist nicht mit Nachnamen belegt.
- Stand laut Seite: „Aktualisiert am 11. April 2025"
- URL: <https://kulturbanause.de/blog/css-nesting/>, abgerufen 2026-09-02
- Erfasst über den Obsidian Web Clipper; ausgewertet wurde der geclippte Text, nicht die Live-Seite.

## Kurzfassung

Natives CSS unterstützt inzwischen die Verschachtelung von Regeln, die lange Präprozessoren wie Sass vorbehalten war. Der Artikel erklärt die Syntax (`&`, `>`, `+`, `~`, `@`-Regeln), die Kombination mit Media Queries und warnt vor zu tiefer Verschachtelung.

## Kernaussagen

### Prinzip

Regeln werden hierarchisch ineinander geschrieben, statt jeden Selektor vollständig auszuschreiben. `.container { .item { … } }` entspricht `.container .item { … }`. Vorteil laut Artikel: weniger Redundanz, Struktur des Stylesheets folgt der HTML-Struktur.

### Der `&`-Selektor

`&` steht für den übergeordneten Selektor. Erforderlich bei Pseudoklassen und Pseudoelementen des Elternselektors (`&:hover`, `&::before`). Nach dem `&` darf kein Leerzeichen stehen. Für einfache Nachfahren-Selektoren ist `&` laut Artikel „nicht mehr notwendig" — ein Hinweis darauf, dass frühe Entwürfe der Spezifikation es noch verlangten.

### Kombinatoren

`>`, `+` und `~` funktionieren auch verschachtelt und können am Anfang der verschachtelten Regel stehen:

```css
.nav {
  > .menu { color: red; }
}
```

### `@`-Regeln

`@font-face`, `@keyframes` und `@import` dürfen nicht innerhalb einer verschachtelten Regel stehen. `@media` dagegen schon.

### Media Queries

Media Queries können direkt im Selektor stehen, auch mehrere hintereinander für verschiedene Breakpoints. Empfehlung des Artikels: Gilt eine Media Query für mehrere Komponenten, gehört sie außerhalb des Nestings definiert.

### Best Practice: flach bleiben

Häufigster Fehler ist zu tiefe Verschachtelung — dasselbe Problem wie bei Sass. Folgen laut Artikel: schwer lesbarer Code, unnötig lange Selektoren, steigende Spezifität, schlechtere Wartbarkeit. Das Gegenbeispiel im Artikel zieht `.card` auf die oberste Ebene und verschachtelt nur noch eine Ebene darunter.

## Eigene Einordnung

Guter, kompakter Einstieg mit sinnvollem Schwerpunkt auf der Verschachtelungstiefe. Zwei Einschränkungen:

- **Fehlerhaftes Beispiel:** Im Abschnitt zu Media Queries steht als „ohne Nesting"-Variante ein `@media`-Block, der nur `flex-direction: column;` ohne umschließenden Selektor enthält. Das ist ungültiges CSS und in dieser Form wirkungslos; gemeint war offensichtlich `@media (max-width: 600px) { .container { flex-direction: column; } }`.
- **Spezifität nur gestreift:** Der Artikel nennt Spezifität als Stichwort, erklärt aber nicht, dass verschachtelte Regeln in CSS anders bewertet werden können als der ausgeschriebene Selektor (`&` und die Verschachtelung selbst wirken wie `:is()` und übernehmen die höchste Spezifität der Selektorliste). Das ist in der Praxis die eigentliche Stolperfalle. Nicht am Spezifikationstext gegengeprüft.
- Zum Browsersupport nennt der Artikel nur „alle modernen Browser", ohne Datum oder Beleg.

Verdichtetes Wissen steht in [[selektoren/nesting|CSS-Nesting]].

## Verknüpftes Wissen

- [[selektoren/nesting|CSS-Nesting]]
- [[selektoren/has|CSS-Pseudoklasse has()]]
- [[quellen/artikel/color-mix-funktion|CSS color-mix() Funktion]] — ebenfalls eine Funktion, die Präprozessoren ersetzt

## Offene Fragen

- Wie sich Spezifität bei verschachtelten Selektoren konkret berechnet, beantwortet der Artikel nicht.
- Konkreter Browsersupport und Baseline-Status sind nicht belegt und hier nicht nachgeprüft.
