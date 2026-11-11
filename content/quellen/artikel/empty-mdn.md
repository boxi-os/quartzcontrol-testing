---
type: page
status: active
publish: true
title: "empty Pseudoklasse (MDN)"
description: "Quellennotiz zur MDN-Referenz von :empty: was als leer gilt und was nicht."
authors: []
publisher: "MDN Web Docs"
source_published: 
url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:empty"
archive_url:
source_kind: secondary
---

# empty Pseudoklasse (MDN)

## Quelle / bibliografische Angaben

MDN-Referenz „`:empty` CSS pseudo-class“, englische Fassung. Dateiname ohne Doppelpunkt.

- Stand laut Seite: „last modified on Jul 8, 2026“
- URL: <https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:empty>, abgerufen 2026-10-18 (über Firecrawl)
- Ausgewertet: Einleitung, Hinweis zu Selectors Level 4, Accessibility; Beispiele nur überflogen

## Kurzfassung

`:empty` trifft Elemente ohne Kinder. Als Kind zählen Elemente **und** Text, auch reine Leerzeichen.

## Kernaussagen

- **Zählt als Inhalt:** Elementknoten und Text einschließlich Whitespace.
- **Zählt nicht:** Kommentare, Processing Instructions und per CSS erzeugter `content`.
- **Selectors Level 4** hat `:empty` so geändert, dass es sich wie `:-moz-only-whitespace` verhält, also reine Leerzeichen ignoriert. Laut MDN unterstützt das noch kein Browser.
- **Barrierefreiheit:** Interaktive Elemente brauchen einen zugänglichen Namen; ein leerer Link oder Button ist für Screenreader nicht verständlich.

## Eigene Einordnung

Der Whitespace-Punkt ist in der Praxis der wichtigste: Template-Engines erzeugen gern Zeilenumbrüche in eigentlich leeren Containern, dann greift `:empty` nicht.

## Verknüpftes Wissen

- [[selektoren/nach-inhalt-auswaehlen|Elemente anhand ihres Inhalts auswählen]]

## Offene Fragen

- Ob einzelne Browser die Level-4-Änderung inzwischen umsetzen, ist nur durch die Aussage von MDN belegt, nicht separat geprüft.
