---
type: page
status: active
publish: true
title: "Exclusive Accordion (Chrome for Developers)"
description: "Quellennotiz zum Chrome-Artikel über exklusive Akkordeons mit details und name, samt Polyfill-Idee."
authors:
  - "Bramus"
publisher: "Chrome for Developers"
source_published:
url: "https://developer.chrome.com/docs/css-ui/exclusive-accordion"
archive_url:
source_kind: secondary
---

# Exclusive Accordion (Chrome for Developers)

## Quelle / bibliografische Angaben

Artikel auf Chrome for Developers.

- Autor laut Seite: Bramus
- Stand laut Seite: „Last updated 2023-12-11“
- URL: <https://developer.chrome.com/docs/css-ui/exclusive-accordion>, abgerufen 2026-09-12 (über Firecrawl)
- Codeblöcke im erfassten Text weitgehend leer; ausgewertet ist der Fließtext

## Kurzfassung

Mehrere `details` mit demselben `name` bilden ein exklusives Akkordeon, in dem immer nur ein Eintrag offen ist.

## Kernaussagen

- **Akkordeon:** mehrere Disclosure-Widgets, die einzeln auf- und zuklappen, visuell gruppiert.
- **Exklusiv:** gleicher `name` → semantische Gruppe; Öffnen eines Eintrags schließt den zuvor offenen.
- **Mehrere Gruppen:** Jeder neue `name`-Wert bildet eine eigene Gruppe.
- **Ort egal:** Die Elemente müssen keine Geschwister sein und dürfen im Dokument verstreut stehen; es zählt nur `name`.
- **Polyfill:** über das `toggle`-Event – beim Öffnen die anderen offenen `details` mit gleichem `name` schließen. Ältere Browser ohne `toggle` bleiben unverändert, was als Progressive Enhancement akzeptabel sei.

## Eigene Einordnung

Kurz und eindeutig. Dass verstreute Elemente eine Gruppe bilden, kann bei gleichen Namen in verschiedenen Komponenten zu ungewolltem Schließen führen – eigene Ableitung, nicht getestet.

## Verknüpftes Wissen

- [[navigation/akkordeon|Akkordeon mit details bauen]]
