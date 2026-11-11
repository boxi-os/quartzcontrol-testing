---
type: page
status: active
publish: true
title: "Accessible Cards (Kitty Giraudel)"
description: "Quellennotiz zu Kitty Giraudels Artikel über barrierearme Karten mit erweiterter Klickfläche und verschachtelten Aktionen."
authors:
  - "Kitty Giraudel"
publisher: "kittygiraudel.com"
source_published: "2022-04-02"
url: "https://kittygiraudel.com/2022/04/02/accessible-cards/"
archive_url:
source_kind: secondary
---

# Accessible Cards (Kitty Giraudel)

## Quelle / bibliografische Angaben

Blogartikel auf der persönlichen Website von Kitty Giraudel.

- Datum laut Seite: April 2, 2022, „Edited on April 24, 2026“
- URL: <https://kittygiraudel.com/2022/04/02/accessible-cards/>, abgerufen 2026-10-18 (über Firecrawl)
- Vollständig ausgewertet

## Kurzfassung

Kurze, praxisnahe Anleitung für Karten in Listen: Link nur auf die wichtigste Information, Klickfläche per Pseudoelement über die Karte ziehen, weitere Aktionen per `z-index` darüberlegen.

## Kernaussagen

- **Anforderungen:** Karte ist interaktiv, kann in einer Liste stehen (Screenreader nennen die Anzahl), kann weitere Aktionen enthalten.
- **Markup:** Karten als `<li>` in `<ul>`; der Link umfasst nur den Titel. Begründung: In Linklisten von Hilfsmitteln soll „Lilith, link“ stehen, nicht der ganze Karteninhalt.
- **CSS:** Karte `position: relative`; `a::before` mit `content: ''`, `position: absolute`, `inset: 0`, `z-index: 1`.
- **Fokus:** Rahmen am Pseudoelement bei `:hover` und `:focus`; das Standard-`outline` wird entfernt, weil der Rahmen es ersetzt.
- **Verschachtelte Aktionen:** Zusatzbutton `position: relative; z-index: 2`. Hinweis von Adrian Roselli: tote Zone um den Button lassen, um Fehltipper zu vermeiden.
- **Überschrift oder nicht:** abhängig davon, ob die Karte viel Inhalt einleitet und ob sie in der Überschriftenliste der Seite auftauchen soll. Bei hunderten Transaktionen eher nicht.

## Eigene Einordnung

Kompakter als Pickering, mit `inset` statt vier Einzelwerten. Das Entfernen des `outline` bei `:focus` ist nur vertretbar, weil ein gleichwertiger Ersatz da ist; heute würde man `:focus-visible` verwenden. Der Artikel verweist selbst auf Pickering als ausführlichere Quelle.

## Verknüpftes Wissen

- [[komponenten/klickbare-karte|Ganze Karte klickbar machen]]
- [[quellen/artikel/cards-pickering|Cards (Inclusive Components)]]

## Offene Fragen

- Keine.
