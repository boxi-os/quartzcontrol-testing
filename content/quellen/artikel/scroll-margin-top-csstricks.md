---
type: page
status: active
publish: true
title: "Fixed Headers and Jump Links – scroll-margin-top (CSS-Tricks)"
description: "Quellennotiz zu einem kurzen CSS-Tricks-Artikel: Sprungziele mit scroll-margin-top unter festem Header sichtbar halten."
authors:
  - "Chris Coyier"
publisher: "CSS-Tricks"
source_published: "2020-02-21"
url: "https://css-tricks.com/fixed-headers-and-jump-links-the-solution-is-scroll-margin-top/"
archive_url:
source_kind: secondary
---

# Fixed Headers and Jump Links – scroll-margin-top (CSS-Tricks)

## Quelle / bibliografische Angaben

Kurzartikel auf [[quellen/css-tricks-com|CSS-Tricks]].

- Titel laut Suchergebnis: „Fixed Headers and Jump Links? The Solution is scroll-margin-top“ (Fragezeichen im Dateinamen ersetzt)
- Autor laut Autorenzeile der Seite: Chris Coyier
- Datum laut Seite: „Feb 21, 2020“ (bei erneutem Abruf der vollständigen Seite am 2026-09-13 bestätigt; der erste Abruf nur des Hauptinhalts enthielt Autorenzeile und Datum nicht)
- URL: <https://css-tricks.com/fixed-headers-and-jump-links-the-solution-is-scroll-margin-top/>, abgerufen 2026-09-12 (über Firecrawl)

## Kurzfassung

Ein fester Header verdeckt Überschriften, zu denen ein Sprunglink führt. `scroll-margin-top` am Sprungziel löst das ohne Hacks.

## Kernaussagen

- Problem: `<a href="#header-3">` springt zu `<h3 id="header-3">`, aber ein `position: fixed`-Header liegt darüber.
- Früher halfen „wilde Hacks“ oder großzügiges `padding-top` an Überschriften.
- Lösung: `h3 { scroll-margin-top: 5rem; }` – der Wert muss über die Headerhöhe hinausreichen.
- Die Eigenschaft wird oft im Zusammenhang mit Scroll Snapping genannt; dieser Anwendungsfall sei praktischer.

## Eigene Einordnung

Kurz und korrekt, aber alt (2020). Die Aussage zur Browserunterstützung („essentially everywhere“) war damals nicht ganz richtig, wie Kommentare zu IE/Edge zeigen. Heute ist `scroll-margin-top` laut `web-features` 3.38.0 Baseline *widely available* (seit 2021-04-26 *newly*). Die Alternative `scroll-padding-top` am Scroll-Container behandelt der Artikel nicht.

## Verknüpftes Wissen

- [[navigation/sticky-header|Sticky-Header einrichten]]
