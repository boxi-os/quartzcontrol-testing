---
type: page
status: active
publish: true
title: "CSS calc – Rechnen mit gemischten CSS-Einheiten"
description: "Quellennotiz zu einem MediaEvent-Artikel über calc(), mit Richtigstellung zur Verwendbarkeit in :root."
authors:
  - "U. Häßler"
publisher: "MediaEvent"
source_published: "2017-06-12"
url: "https://www.mediaevent.de/css/calc.html"
archive_url:
source_kind: secondary
---

# CSS calc – Rechnen mit gemischten CSS-Einheiten

## Quelle / bibliografische Angaben

Tutorialseite von mediaevent.de zu `calc()`.

- Autor laut Clip-Metadaten: U. Häßler
- Stand laut Seite: 2017-06-12. Der Text nennt `clamp()` und moderne Anwendungsfälle, wurde also erkennbar später überarbeitet; ein Änderungsdatum steht nicht auf der Seite.
- URL: <https://www.mediaevent.de/css/calc.html>, abgerufen 2026-09-03
- Erfasst über den Obsidian Web Clipper; ausgewertet wurde der geclippte Text, nicht die Live-Seite.

## Kurzfassung

Praxisorientierte Einführung in `calc()` mit dem Schwerpunkt, den kein Präprozessor bietet: das Rechnen mit gemischten Einheiten. Enthält als einzige der drei `calc()`-Quellen im Vault die Begründung für die Leerzeichenregel.

## Kernaussagen

- `calc()` steht überall dort, wo sonst eine Längenangabe oder ein numerischer Wert stünde — Positionierung, Breite, Höhe, Farben, sogar Zeitangaben in Animationen.
- **Der Vorteil gegenüber Präprozessoren wie SASS ist das Rechnen mit gemischten Maßeinheiten**, z. B. `width: calc(100% - 150px)`.
- **Warum `+` und `-` Leerzeichen brauchen:** `calc(50% -8px)` wird als Prozentanteil gefolgt von einer *negativen Länge* geparst — zwei Werte statt einer Rechnung, also ungültig. Erst `calc(50% - 8px)` ist ein Ausdruck mit Minusoperator. `*` und `/` brauchen keinen Weißraum, Leerzeichen sind der Konsistenz halber trotzdem empfohlen.
- Beispiele für Unsinn, die die Seite selbst kennzeichnet: `calc(2rem * 3rem)` (falsch) und `calc(2rem / blue)`.
- **Lesbarkeitsargument:** Weil der Support so gut ist, darf `calc()` auch dort stehen, wo ein fester Wert reichen würde — `width: calc(100% / 3)` sagt mehr als `33.333%`.
- **Zentrieren ohne bekannte Containerbreite:** Ein absolut positioniertes Element mit `max-width: 300px` lässt sich über `left: calc(50% - 150px)` mittig setzen, ohne die Breite des umgebenden Elements zu kennen.
- **Mit Custom Properties:** `width: calc(var(--base-size) * 2)`, und ebenso auf Zeiteinheiten: `animation-duration: calc(var(--time) * 4)` synchronisiert mehrere Animationen über eine einzige Variable.
- Browsersupport laut Seite: von Anfang an einheitlich, selbst IE10 konnte `calc()`.

## Eigene Einordnung

Die Leerzeichenerklärung ist der eigentliche Mehrwert dieser Seite. [[quellen/artikel/calc-kulturbanause|Die CSS calc()-Funktion – Berechnungen mit CSS]] nennt die Regel nur, [[quellen/artikel/calc-mdn|calc() CSS-Funktion (MDN)]] erwähnt für `+`/`-` gar keine Begründung. Wer den Parsergrund einmal verstanden hat, vergisst die Regel nicht mehr.

Ein Satz am Seitenende ist irreführend:

> calc() kann aber nicht direkt in `:root` verwendet werden, weil CSS-Variablen nur Werte speichern, aber keine Berechnungen ausführen.

Das trifft so nicht zu. `--x: calc(2 * 10px)` ist in `:root` zulässig; der Wert bleibt bis zur Verwendung ein unausgewerteter Token-Strom und wird erst beim Einsetzen berechnet — genau das beschreibt [[quellen/artikel/calc-mdn|calc() CSS-Funktion (MDN)]] am Beispiel verschachtelter Variablen. Gemeint sein dürfte, dass die *Auswertung* nicht in `:root` stattfindet. Als Formulierung ist es falsch und kann Anfänger von einem gängigen Muster abhalten.

Das Slideshow-Beispiel mit `--time` ist trotzdem lehrreich: Eine Variable steuert zwei Animationen mit unterschiedlicher Dauer, die dadurch zwangsläufig synchron bleiben. Das ist ein Fall, den man ohne `calc()` nur mit doppelt gepflegten Werten bekäme.

## Verknüpftes Wissen

- [[grundlagen/berechnungen|CSS calc()]] — verdichtetes Wissen
- [[quellen/artikel/calc-mdn|calc() CSS-Funktion (MDN)]] — formale Referenz
- [[quellen/artikel/calc-kulturbanause|Die CSS calc()-Funktion – Berechnungen mit CSS]] — kulturbanause, Layoutbeispiele
- [[grundlagen/variablen|CSS Custom Properties]]
- [[quellen/mediaevent-de|MediaEvent]] — Herkunft und Einordnung der Quelle

## Offene Fragen

- Wann genau wurde die Seite zuletzt überarbeitet? Das Frontmatter-Datum 2017 passt nicht zum Inhalt.
- Der Abschnitt zur Slideshow verweist auf ein CodePen von „thebabydino"; das Beispiel selbst wurde nicht geprüft.
