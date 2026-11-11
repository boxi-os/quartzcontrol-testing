---
type: page
status: active
publish: true
title: "scope At-Regel (MDN)"
description: "Quellennotiz zur MDN-Referenz von @scope: Scope Root und Scope Limit, :scope, Spezifität und Scoping Proximity in der Kaskade."
authors: []
publisher: "MDN Web Docs"
source_published: 
url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@scope"
archive_url:
source_kind: secondary
---

# scope At-Regel (MDN)

## Quelle / bibliografische Angaben

MDN-Referenz „`@scope` CSS at-rule“, englische Fassung. Dateiname ohne `@`.

- Stand laut Seite: „last modified on Apr 20, 2026“
- URL: <https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@scope>, abgerufen 2026-10-18 (über Firecrawl)
- Ausgewertet: Syntax, Description, Specificity, Conflict resolution, erstes Beispiel

## Kurzfassung

`@scope` beschränkt Selektoren auf einen Teilbaum des DOM, ohne dass man dafür lange, spezifische Selektoren schreiben muss.

## Kernaussagen

- Banner: Baseline 2026, newly available „since March 2026“.
- Zwei Formen: `@scope (root) to (limit) { … }` im Stylesheet oder `@scope { … }` in einem `<style>`-Element. Dann ist das Elternelement des `<style>` der Scope Root.
- **Donut Scope:** Der Scope Root gehört dazu, das Scope Limit nicht. Mit `> *` lässt sich beides umdrehen.
- `:scope` meint im Block den Scope Root selbst und zählt wie eine Klasse (0-1-0).
- Selektoren ohne Präfix und `&` verhalten sich laut Seite so, als stünde `:where(:scope)` davor, zählen also nicht. Dazu eine Warnung: Die Spezifität von `&` in `@scope` behandeln die Browser je nach Engine und Version unterschiedlich.
- Selektoren können nicht aus dem Scope heraus: `:scope + p` ist ungültig.
- Root und Limit dürfen Selektorlisten sein.
- **Kein Stil-Schutz:** Vererbte Eigenschaften wie `color` oder `font-family` wirken weiter über das Scope Limit hinaus.
- **Scoping Proximity:** Neues Kriterium in der Kaskade. Bei sonst gleichwertigen Regeln gewinnt der Scope, dessen Root im DOM näher liegt. Es zählt mehr als die Reihenfolge im Quelltext, aber weniger als `!important`, Layer und Spezifität.
- Beispiel: verschachtelte helle und dunkle Themes, bei denen mit normalen Selektoren die später notierte Regel gewinnt, mit `@scope` dagegen das nächstgelegene Theme.

## Eigene Einordnung

Bei der Spezifität von `&` widerspricht die Seite dem Chrome-Artikel von 2023, siehe [[quellen/artikel/scope-chrome|Limit the reach of your selectors with the CSS scope at-rule (Chrome for Developers)]]. Die Warnung auf MDN deutet darauf hin, dass sich das Verhalten inzwischen geändert hat.

## Verknüpftes Wissen

- [[selektoren/scope|CSS @scope]]
- [[selektoren/not-is-where|CSS-Pseudoklassen not(), is() und where()]]

## Offene Fragen

- Wie Chrome, Firefox und Safari die Spezifität von `&` in `@scope` aktuell berechnen.
