---
type: page
status: active
publish: true
title: "details-Element (MDN)"
description: "Quellennotiz zur MDN-Referenz des details-Elements: Disclosure-Widget, name-Attribut, toggle-Event."
authors: []
publisher: "MDN Web Docs"
source_published:
url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details"
archive_url:
source_kind: secondary
---

# details-Element (MDN)

## Quelle / bibliografische Angaben

MDN-Referenz „`<details>` HTML details disclosure element“, englische Fassung.

- Stand laut Seite: „last modified on Apr 24, 2026“
- URL: <https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details>, abgerufen 2026-09-12 (über Firecrawl)
- Ausgewertet per Stichwortsuche: Beschreibung, `name`, `toggle`, Beispiel mit benannten Boxen

## Kurzfassung

`details` ist ein natives Disclosure-Widget: Der Inhalt ist nur im offenen Zustand sichtbar, `summary` liefert die Beschriftung.

## Kernaussagen

- **Aufbau:** `summary` ist die Beschriftung; ohne `summary` setzt der Browser einen Standardtext. Der Inhalt von `details` dient als zugängliche Beschreibung der `summary`.
- **Darstellung:** geschlossen nur Dreieck und Beschriftung; `summary` erhält `display: list-item`, anpassbar auch über `::marker`.
- **`name`:** Mehrere `details` mit gleichem `name` bilden eine Gruppe, von der nur eines offen sein kann. Öffnen eines schließt das andere. Haben mehrere das `open`-Attribut, ist nur das erste in der Quelltext-Reihenfolge offen.
- **`toggle`-Event:** feuert nach dem Zustandswechsel; mehrere schnelle Wechsel können zusammengefasst werden.

## Eigene Einordnung

Für Akkordeons die einfachste Grundlage ohne JavaScript. `name` ist laut `web-features` 3.38.0 seit 2024-09-03 Baseline *newly available*.

## Verknüpftes Wissen

- [[navigation/akkordeon|Akkordeon mit details bauen]]
