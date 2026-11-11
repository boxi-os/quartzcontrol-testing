---
type: page
status: active
publish: true
title: "Limit the reach of your selectors with the CSS scope at-rule (Chrome for Developers)"
description: "Quellennotiz zum Chrome-Artikel über @scope (Bramus, 2023): Motivation gegenüber BEM, :scope und &, Proximity, keine Stil-Isolation."
authors: 
  - "Bramus"
publisher: "Chrome for Developers"
source_published: "2023-10-04"
url: "https://developer.chrome.com/docs/css-ui/at-scope"
archive_url:
source_kind: secondary
---

# Limit the reach of your selectors with the CSS scope at-rule (Chrome for Developers)

## Quelle / bibliografische Angaben

Bramus: „Limit the reach of your selectors with the CSS @scope at-rule“, Chrome for Developers. Dateiname ohne `@`. Als Autor steht dort nur „Bramus“ mit Link auf bram.us.

- Veröffentlicht: 2023-10-04, „Last updated 2023-10-04 UTC“
- URL: <https://developer.chrome.com/docs/css-ui/at-scope>, abgerufen 2026-10-18 (über Firecrawl)
- Ausgewertet: ganzer Text; CodePen-Demos nicht

## Kurzfassung

Begründet `@scope` mit dem alten Dilemma zwischen zu spezifischen und zu allgemeinen Selektoren und erklärt die Details.

## Kernaussagen

- Problem: `.card > .content > img.hero` ist sehr spezifisch (0,3,1) und hängt eng an der Struktur des DOM, `img` allein trifft zu viel. Bisherige Auswege: BEM-Klassen, generierte Klassennamen in JavaScript-Lösungen oder Utility-Klassen im Markup.
- Der Selektor im Prelude von `@scope` zählt nicht zur Spezifität der Regeln darin. `img` bleibt (0,0,1).
- `:scope` zählt wie eine Pseudoklasse (0,1,0).
- `&` wird laut Artikel intern zu `:is(<Root-Selektor>)` umgeschrieben und bekommt dessen Spezifität. Bei `@scope (#sidebar, .card)` ergibt `& img` (1,0,1).
- `:scope` steht für das gefundene Root-Element, `&` für den Selektor. Deshalb geht `& &`, aber nicht `:scope :scope`.
- `@scope` ohne Prelude in einem `<style>`-Element gilt für dessen Elternelement.
- Scoping Proximity kommt in der Kaskade nach der Spezifität und vor der Reihenfolge.
- Überschrift „Selector isolation, not style isolation“: Vererbte Werte wie `color` reichen bis in das „Loch“ des Donuts.

## Eigene Einordnung

Die Aussage zu `&` steht im Widerspruch zu [[quellen/artikel/scope-mdn|scope At-Regel (MDN)]] (Stand 2026), wonach `&` wie `:where(:scope)` gar nicht zählt. Der Artikel ist von 2023 und seitdem nicht aktualisiert. Welches Verhalten aktuell gilt, ist hier nicht geprüft.

## Verknüpftes Wissen

- [[selektoren/scope|CSS @scope]]

## Offene Fragen

- Siehe Widerspruch oben.
