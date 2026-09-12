---
type: page
status: active
publish: true
title: "The large, small, and dynamic viewport units (web.dev)"
description: "Quellennotiz zum web.dev-Artikel über svh, lvh und dvh: Viewport-Einheiten für mobile Browser mit einblendbaren Leisten."
authors:
  - "Bramus"
publisher: "web.dev"
source_published:
url: "https://web.dev/blog/viewport-units"
archive_url:
source_kind: secondary
---

# The large, small, and dynamic viewport units (web.dev)

## Quelle / bibliografische Angaben

Artikel auf web.dev.

- Autor laut Seite: Bramus (ohne Nachnamen angegeben)
- Stand laut Seite: „Last updated 2022-11-29“; ein separates Veröffentlichungsdatum steht im erfassten Text nicht
- URL: <https://web.dev/blog/viewport-units>, abgerufen 2026-09-12 (über Firecrawl)

## Kurzfassung

Auf Mobilgeräten ändern ein- und ausfahrende Browserleisten die Viewport-Höhe. Neue Einheiten beziehen sich wahlweise auf den kleinen, großen oder dynamischen Viewport.

## Kernaussagen

- `100vh` passt auf dem Desktop, auf Mobilgeräten hängt die Viewport-Größe aber von dynamischen Leisten (Adressleiste, Tab-Leiste) ab.
- **Large Viewport** (`lv*`: `lvw`, `lvh`, `lvi`, `lvb`, `lvmin`, `lvmax`): Größe mit eingefahrenen Leisten.
- **Small Viewport** (`sv*`): Größe mit ausgefahrenen Leisten.
- **Dynamic Viewport** (`dv*`): folgt dem Zustand der Leisten und liegt zwischen `sv*` und `lv*`.
- Die `dv*`-Werte aktualisieren sich **nicht mit 60 fps**; Browser drosseln die Aktualisierung, manche entprellen sie je nach Geste ganz.

## Eigene Einordnung

Relevant für Vollbild-Menüs und Overlays. Aus der Drosselung folgt: `dvh` passt für Elemente, die einmal geöffnet werden, eignet sich aber schlecht für Größen, die beim Scrollen flüssig mitgehen sollen. Das ist eigene Ableitung. Die Einheiten sind laut `web-features` 3.38.0 Baseline *widely available* (seit 2022-12-05 *newly*).

## Verknüpftes Wissen

- [[navigation/mobilmenue|Mobile-Menü ohne Checkbox-Hack bauen]]
