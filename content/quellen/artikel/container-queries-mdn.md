---
type: page
status: active
publish: true
title: "Container Queries (MDN)"
description: "Quellennotiz zum MDN-Leitfaden über Container Queries: container-type, Namen, Kurzform, Einheiten cqw bis cqmax."
authors: []
publisher: "MDN Web Docs"
source_published: 
url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries"
archive_url:
source_kind: secondary
---

# Container Queries (MDN)

## Quelle / bibliografische Angaben

MDN-Leitfaden „CSS container queries“, englische Fassung.

- Stand laut Seite: „last modified on Jul 8, 2026“
- URL: <https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries>, abgerufen 2026-10-18 (über Firecrawl)
- Ausgewertet: ganze Seite

## Kurzfassung

Einführung in Container Queries, mit Schwerpunkt auf Size Queries. Container Queries reagieren auf Eigenschaften eines umgebenden Elements statt auf das Browserfenster.

## Kernaussagen

- Abgefragt werden können: der Name des Containers, seine Größe, Styles am Container, sein Scroll-Zustand und ob er per Anchor Positioning platziert ist und gerade eine Ausweichposition nutzt.
- Ein Element wird mit `container-type` zum Container. Werte: `size` (Breite und Höhe), `inline-size` (nur die Inline-Richtung), `normal` (Standard, kein Size-Container, aber für Style Queries und reine Namensabfragen nutzbar).
- `@container (width > 700px) { … }` gilt für Elemente, deren **nächster Vorfahr mit Containment** breiter als 700px ist.
- Mit `container-name` gibt man einem Container einen Namen und spricht ihn gezielt an: `@container sidebar (width > 700px)`.
- **Name-only Queries:** `@container my-container { … }` gilt für alles innerhalb eines Containers mit diesem Namen, ganz ohne Bedingung.
- Kurzform: `container: sidebar / inline-size`.
- Einheiten: `cqw`, `cqh`, `cqi`, `cqb` (jeweils 1 % der Containergröße), `cqmin`, `cqmax`. Ohne passenden Container fallen sie auf die Small-Viewport-Einheiten (`sv*`) zurück.
- Als Fallback für alte Browser schlägt die Seite Grid/Flex mit Media Queries vor.

## Eigene Einordnung

Der Fallback-Abschnitt ist bei Baseline *widely available* (seit 2025-08-14 laut `web-features` 3.43.0) kaum noch relevant.

## Verknüpftes Wissen

- [[grundlagen/container-queries|Container Queries]]
- [[quellen/artikel/style-queries-mdn|Container Size und Style Queries (MDN)]]
- [[quellen/artikel/container-type-mdn|container-type CSS-Eigenschaft (MDN)]]

## Offene Fragen

- Keine.
