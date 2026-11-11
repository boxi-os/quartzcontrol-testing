---
type: page
status: active
publish: true
title: "CSS has() Interactive Guide (Ahmad Shadeed)"
description: "Quellennotiz zu Ahmad Shadeeds interaktivem Guide zu :has() mit vielen Praxisbeispielen."
authors:
  - "Ahmad Shadeed"
publisher: "ishadeed.com"
source_published: "2024-02-23"
url: "https://ishadeed.com/article/css-has-guide/"
archive_url:
source_kind: secondary
---

# CSS has() Interactive Guide (Ahmad Shadeed)

## Quelle / bibliografische Angaben

Interaktiver Artikel „CSS :has() Interactive Guide“ auf der Website von Ahmad Shadeed. Doppelpunkt im Dateinamen weggelassen.

- Datum laut Seite: Feb 23, 2024
- URL: <https://ishadeed.com/article/css-has-guide/>, abgerufen 2026-10-18 (über Firecrawl)
- Ausgewertet: „The previous sibling selector“, „Select the box with 3+ books“, „Logical operators“, „File download“, „Quantity queries“, „Section empty state“, „The download attribute“; die übrigen Anwendungsfälle nur anhand der Überschriften. Die interaktiven Demos sind im Scrape nicht bedienbar.

## Kurzfassung

Sehr umfangreiche Sammlung von `:has()`-Mustern, erklärt an einem Bücherregal-Modell und an realistischen UI-Komponenten.

## Kernaussagen

- **Vorherige Geschwister:** `.book:has(+ .frame)` bzw. `.book:has(~ .frame)`.
- **UND/ODER:** `:has(a):has(b)` = und, `:has(a, b)` = oder.
- **Mengen:** `.box:has(.book:nth-last-child(n + 3))` = Box mit mindestens drei Büchern. Mit Custom Properties lässt sich so die Spaltenbreite eines Grids nach Anzahl der Einträge steuern. Die Idee der Quantity Queries geht laut Shadeed auf einen Artikel von Heydon Pickering bei A List Apart zurück.
- **Dateityp:** `.file:not(:has(img))` zeigt ein Ersatz-Icon, `.file:has([href$=".pdf"])` setzt per Variable das passende.
- **Leerer Abschnitt:** `.section:has(.sectionContent:empty)` schaltet in einen Leer-Zustand.
- **Download-Link:** `.content:has(a[download])` zeigt ein Icon.
- Weitere Fälle (nur Überschriften gesichtet): Sidebar-Breite, Cookie-Banner, Modal, deaktivierte Buttons, Checkbox/Radio/Select, Quiz, Navigation mit Untermenü.

## Eigene Einordnung

Die beste Beispielsammlung zum Thema. Im Quantity-Query-Code steht ein Tippfehler (`flex-direciton`). Die Beispiele verschachteln teils CSS (`&:before`), was natives [[selektoren/nesting|CSS-Nesting]] voraussetzt.

## Verknüpftes Wissen

- [[selektoren/nach-inhalt-auswaehlen|Elemente anhand ihres Inhalts auswählen]]
- [[selektoren/has|CSS-Pseudoklasse has()]]

## Offene Fragen

- Die übrigen rund 15 Anwendungsfälle sind nicht im Detail ausgewertet.
