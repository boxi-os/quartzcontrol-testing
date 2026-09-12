---
type: page
status: active
publish: true
title: "prefers-reduced-motion – Sometimes less movement is more (web.dev)"
description: "Quellennotiz zum web.dev-Artikel über die Media Query prefers-reduced-motion in CSS und JavaScript."
authors:
  - "Thomas Steiner"
publisher: "web.dev"
source_published:
url: "https://web.dev/articles/prefers-reduced-motion"
archive_url:
source_kind: secondary
---

# prefers-reduced-motion – Sometimes less movement is more (web.dev)

## Quelle / bibliografische Angaben

Artikel auf web.dev.

- Titel laut Seite: „prefers-reduced-motion: Sometimes less movement is more“
- Autor laut Seite: Thomas Steiner
- Stand laut Seite: „Last updated 2019-03-11“
- URL: <https://web.dev/articles/prefers-reduced-motion>, abgerufen 2026-09-12 (über Firecrawl)
- Ausgewertet: Einleitung, Abschnitte zu vestibulären Störungen und zur Nutzung in CSS/JavaScript, per Stichwortsuche; die Demo nicht

## Kurzfassung

`prefers-reduced-motion` erkennt, ob Nutzer im Betriebssystem weniger Bewegung eingestellt haben. Darauf kann eine Seite mit einer bewegungsärmeren Variante reagieren – in CSS und in JavaScript.

## Kernaussagen

- Nicht jeder mag dekorative Animationen; manche bekommen bei Parallax- oder Zoom-Effekten Bewegungsübelkeit.
- Animation dient oft als Rückmeldung (z. B. Produkt „fliegt“ in den Warenkorb) oder um Wartezeit kürzer wirken zu lassen.
- Scroll-Animationen und Parallax können vestibuläre Störungen auslösen: Schwindel, Übelkeit, Migräne.
- Betriebssysteme bieten die Einstellung seit Langem (Beispiele: macOS „Reduce motion“, Android „Remove animations“).
- Werte: `no-preference` und `reduce`.
- Die Variante kann von „keine Autoplay-Videos“ über „dekorative Effekte aus“ bis zu einer komplett anderen Gestaltung reichen.
- In JavaScript über `window.matchMedia('(prefers-reduced-motion: reduce)')`; Änderungen der Einstellung lösen ein Ereignis aus, auf das Skript-Animationen reagieren können.

## Eigene Einordnung

Grundlagenartikel von 2019, inhaltlich weiter gültig. Die Screenshots (macOS Mojave) sind veraltet. Die Media Query ist laut `web-features` 3.38.0 Baseline *widely available*.

## Verknüpftes Wissen

- [[animation/barrierearme-animationen|Barrierearme Animationen]]
- [[quellen/dokumente/wcag-c39|Technique C39 prefers-reduced-motion (W3C WCAG)]]
