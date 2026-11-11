---
type: page
status: active
publish: true
title: "Cards (Inclusive Components)"
description: "Quellennotiz zu Heydon Pickerings Artikel über barrierearme Karten: Pseudoelement-Trick, JavaScript-Alternative, Fokusstile."
authors:
  - "Heydon Pickering"
publisher: "Inclusive Components"
source_published: "2018-06-04"
url: "https://inclusive-components.design/cards/"
archive_url:
source_kind: secondary
---

# Cards (Inclusive Components)

## Quelle / bibliografische Angaben

Kapitel „Cards“ aus der Reihe *Inclusive Components* von Heydon Pickering (auch als Buch erschienen).

- Datum laut Seite: 04 June, 2018
- URL: <https://inclusive-components.design/cards/>, abgerufen 2026-10-18 (über Firecrawl)
- Ausgewertet: alle Abschnitte bis „Content tolerance“ ausführlich, den Rest (Layout mit Grid, Call-to-Action, Bilder) nur überflogen

## Kurzfassung

Pickering rät davon ab, eine ganze Karte in einen Link zu packen, und zeigt zwei Wege, die Karte trotzdem überall klickbar zu machen: per CSS-Pseudoelement oder per JavaScript.

## Kernaussagen

- **Alles in `<a>`:** Der ganze Inhalt wird zum Linktext und entsprechend lang vorgelesen; weitere Links in der Karte sind verwirrend bis unmöglich.
- **Besser:** Link nur auf die Überschrift. Jeder Link hat dann einen eindeutigen Namen, was in Linklisten von Screenreadern hilft.
- **Pseudo-Content-Trick:** Karte `position: relative`, `a::after` `position: absolute` mit `top/right/bottom/left: 0`. Kein JavaScript nötig.
- **Nachteil:** Text in der Karte lässt sich kaum noch markieren. Einzelne Elemente anzuheben erzeugt Lücken in der Klickfläche.
- **Redundant Click Event:** Ein Klick-Handler auf der Karte löst `link.click()` aus. Um Textmarkieren zu erlauben, wird die Zeit zwischen `mousedown` und `mouseup` gemessen; unter 200 ms gilt als Klick. Tastaturnutzung bleibt unberührt. `cursor: pointer` dann per JavaScript setzen, damit es ohne Script nicht täuscht.
- **Fokus:** `:focus-within` an der Karte, um den Hover-Stil auch für Tastaturnutzer zu zeigen. Hover und `:focus-within` nicht im selben Regelblock, weil der ganze Block verworfen wird, wenn `:focus-within` unbekannt ist.
- **Weitere Links:** `position: relative` hebt sie über das Pseudoelement; `z-index` ist nicht nötig, wenn sie im Quelltext nach dem Hauptlink stehen. Klickfläche mit `padding` vergrößern.
- **„Weiterlesen“-Button** nur als Optik, mit `aria-hidden="true"`, und per `aria-describedby` dem Link als Beschreibung zuordnen.

## Eigene Einordnung

Der Grundlagentext zu dem Muster; spätere Artikel (Giraudel, Roselli) beziehen sich darauf. Die Hinweise zur Browser-Unterstützung von `:focus-within` sind 2026 überholt — es ist längst überall verfügbar. Die JavaScript-Lösung nutzt `+new Date()` und `Array.prototype.forEach.call`; heute würde man das kürzer schreiben.

## Verknüpftes Wissen

- [[komponenten/klickbare-karte|Ganze Karte klickbar machen]]
- [[quellen/artikel/cards-giraudel|Accessible Cards (Kitty Giraudel)]]
- [[quellen/artikel/block-links-roselli|Block Links, Cards, Clickable Regions, Rows (Adrian Roselli)]]

## Offene Fragen

- Ob die 200-ms-Schwelle für Touch-Geräte taugt, behandelt der Artikel nicht.
