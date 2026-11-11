---
type: page
status: active
publish: true
title: "Block Links, Cards, Clickable Regions, Rows (Adrian Roselli)"
description: "Quellennotiz zu Adrian Rosellis Artikel über klickbare Karten und Bereiche, mit Screenreader-Tests und Varianten."
authors:
  - "Adrian Roselli"
publisher: "adrianroselli.com"
source_published: "2020-02-17"
url: "https://adrianroselli.com/2020/02/block-links-cards-clickable-regions-etc.html"
archive_url:
source_kind: secondary
---

# Block Links, Cards, Clickable Regions, Rows (Adrian Roselli)

## Quelle / bibliografische Angaben

Blogartikel „Block Links, Cards, Clickable Regions, Rows, Etc.“ von Adrian Roselli. Der Titel enthält im Original „Etc.“; im Dateinamen weggelassen, weil ein abschließender Punkt nicht zulässig ist.

- Datum laut Seite: „originally posted February 17, 2020“, „Updated September 29, 2025“; Nachträge vom 23.02., 31.03., 01.04. und 18.08.2020
- URL: <https://adrianroselli.com/2020/02/block-links-cards-clickable-regions-etc.html>, abgerufen 2026-10-18 (über Firecrawl)
- Ausgewertet: Artikel und Updates; Kommentare nur die ersten fünf

## Kurzfassung

Roselli zeigt mit Screenreader-Aufnahmen, warum ganze Karten in einem Link problematisch sind, und beschreibt den Pseudoelement-Ansatz samt Varianten für Bildreihenfolge und Zusatzbedienelemente.

## Kernaussagen

- **Alles im Link:** Ohne `display: block` gibt es tote Bereiche; mit Unterstreichung ist der Block schwer lesbar. Im Test (Firefox 72, NVDA 2019.3.1) dauerte das Vorlesen eines solchen Links rund 25 Sekunden, bevor er als Link angesagt wurde. Beim Pfeiltasten-Lesen wird jedes Textstück als Link angesagt.
- **CSS:** `a[href]::after` mit `content: ""`, `display: block`, `position: absolute` und allen vier Kanten auf 0. Nachteil: Text lässt sich nicht markieren.
- **Bildreihenfolge:** Bild im DOM hinter der Überschrift, optisch per `display: flex; flex-direction: column` und `img { order: -1 }` nach oben. Einer der wenigen Fälle, in denen Roselli Umsortieren per CSS befürwortet.
- **Zusatzbedienelemente:** Platz lassen, etwa `::after { bottom: 3.75em }`, damit eine tote Zone um den Zusatzbutton entsteht.
- **Buttons:** Struktur in einem `<button>` geht verloren; eine `<h3>` darin ist keine Überschrift mehr.
- **Tabellenzeilen:** Lassen sich nach demselben Prinzip klickbar machen; ganze Zeilen klickbar zu machen, hält Roselli aber schon für ein Anti-Pattern.
- **Smashing-Magazine-Beispiel (Update 23.02.2020):** Ein `::before` über der ganzen Karte überdeckte sieben andere Links. Einfachste Lösung: Pseudoelement weglassen.

## Eigene Einordnung

Die Stärke des Artikels sind die Screenreader-Aufnahmen und das ehrliche „context matters, test with your users“. Die getesteten Versionen (Firefox 72, NVDA 2019.3) sind alt; ob sich das Verhalten geändert hat, ist nicht geprüft.

## Verknüpftes Wissen

- [[komponenten/klickbare-karte|Ganze Karte klickbar machen]]
- [[quellen/artikel/cards-pickering|Cards (Inclusive Components)]]
- [[quellen/artikel/cards-giraudel|Accessible Cards (Kitty Giraudel)]]

## Offene Fragen

- Die eingebetteten Videos und CodePens sind nicht ausgewertet.
