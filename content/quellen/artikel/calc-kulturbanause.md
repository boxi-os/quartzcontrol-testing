---
type: page
status: active
publish: true
title: "Die CSS calc()-Funktion – Berechnungen mit CSS"
description: "Quellennotiz zu einem kulturbanause-Artikel von 2013 über calc(), mit Anmerkungen zu überholten Aussagen."
authors:
  - "Jonas Hellwig"
publisher: "Agentur kulturbanause"
source_published: "2013-11-13"
url: "https://kulturbanause.de/blog/berechnungen-mit-css-calc/"
archive_url:
source_kind: secondary
---

# Die CSS calc()-Funktion – Berechnungen mit CSS

## Quelle / bibliografische Angaben

Blogartikel der Agentur kulturbanause zu `calc()`.

- Autor laut Byline und Clip-Metadaten: Jonas Hellwig
- Stand laut Seite: erschienen 2013-11-13, dazu die abgeschnittene Zeile „Aktualisiert von 2013 –". Das Endjahr der Aktualisierung fehlt im Clip.
- URL: <https://kulturbanause.de/blog/berechnungen-mit-css-calc/>, abgerufen 2026-09-03
- Erfasst über den Obsidian Web Clipper; ausgewertet wurde der geclippte Text, nicht die Live-Seite.

## Kurzfassung

Kurze Einführung mit zwei ausgearbeiteten Layoutbeispielen: eine Subtraktion für Inhalt neben fixer Sidebar und eine Division für ein Spaltenraster, das nur über Breakpoints umgeschaltet wird.

## Kernaussagen

- `calc()` erlaubt die vier Grundrechenarten; vor und nach dem Operator „sollte" ein Leerzeichen stehen. Division durch 0 erzeugt einen Fehler.
- Syntax: `calc([wert] [operator] [wert])`
- **Beispiel 1 — feste Sidebar:** `article { width: calc(100% - 135px) }` neben `aside { width: 135px }`, dazu `box-sizing: border-box`. Der Inhalt bleibt flexibel, obwohl die Werbespalte eine feste Pixelbreite hat.
- **Beispiel 2 — Spaltenraster:** Alle Spalten tragen nur die Klasse `.col`; die Spaltenzahl ändert sich allein über die Division im Breakpoint: `calc(100%/3)` → `/6` ab 600px → `/8` ab 800px → `/12` ab 1000px. Kein Grid-Framework, keine zusätzlichen Klassen.
- Eingeordnet wird `calc()` als Ergänzung zu Flexbox und Grid, nicht als deren Ersatz.

## Eigene Einordnung

Der Artikel ist der älteste der drei `calc()`-Quellen im Vault und merkt es an den Beispielen: `float: left` für Spalten, feste Pixel-Breakpoints, Werbebanner rechts. Als `calc()`-Erklärung funktioniert er trotzdem, weil das Prinzip vom Layout unabhängig ist.

Die Rasteridee im zweiten Beispiel ist der eigentliche Punkt und heute noch brauchbar, nur anders umgesetzt: Was hier `calc(100%/12)` pro Breakpoint leistet, macht heute `grid-template-columns: repeat(auto-fill, minmax(…, 1fr))` ohne Media Query. `calc()` bleibt dort im Vorteil, wo die Teilung exakt vorgegeben ist statt vom Platz abzuhängen.

Zwei Ungenauigkeiten:

- Die Leerzeichenregel steht als Empfehlung („sollte") da. Bei `+` und `-` ist sie zwingend, sonst wird der Ausdruck nicht als Rechnung geparst — Begründung in [[quellen/artikel/calc-mediaevent|CSS calc – Rechnen mit gemischten CSS-Einheiten]].
- `calc()` wird im Text als „CSS-Eigenschaft" bezeichnet; es ist eine Funktion, die als Wert steht.
- Die CSS-Codeblöcke sind im Clip als JavaScript ausgezeichnet — derselbe kosmetische Fehler wie in [[quellen/artikel/color-mix-funktion|CSS color-mix() Funktion]] desselben Blogs.

## Verknüpftes Wissen

- [[grundlagen/berechnungen|CSS calc()]] — verdichtetes Wissen
- [[quellen/artikel/calc-mdn|calc() CSS-Funktion (MDN)]] — formale Referenz
- [[quellen/artikel/calc-mediaevent|CSS calc – Rechnen mit gemischten CSS-Einheiten]] — MediaEvent, erklärt die Leerzeichenregel

## Offene Fragen

- Bis wann wurde der Artikel aktualisiert? Der Clip bricht die Zeile ab.
- Die verlinkten Live-Beispiele auf media.kulturbanause.de wurden nicht aufgerufen.
