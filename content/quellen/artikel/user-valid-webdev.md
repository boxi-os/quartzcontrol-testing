---
type: page
status: active
publish: true
title: "The user-valid and user-invalid pseudo-classes (web.dev)"
description: "Quellennotiz zum web.dev-Artikel von 2023 über :user-valid und :user-invalid: Unterschied zu :valid/:invalid und welcher JavaScript-Aufwand wegfällt."
authors: []
publisher: "web.dev"
source_published: "2023-11-08"
url: "https://web.dev/articles/user-valid-and-user-invalid-pseudo-classes"
archive_url:
source_kind: secondary
---

# The user-valid and user-invalid pseudo-classes (web.dev)

## Quelle / bibliografische Angaben

„The :user-valid and :user-invalid pseudo-classes“, web.dev. Dateiname ohne Doppelpunkte.

- Veröffentlicht: 2023-11-08 („Published: November 8, 2023“)
- Autor: auf der abgerufenen Seite nicht erkennbar
- URL: <https://web.dev/articles/user-valid-and-user-invalid-pseudo-classes>, abgerufen 2026-10-18 (über Firecrawl)
- Ausgewertet: ganzer Text; die CodePen-Demo nicht

## Kurzfassung

Kurzer Ankündigungsartikel zur Einführung in Chrome.

## Kernaussagen

- Ein leeres Pflichtfeld trifft `:invalid` schon beim Laden der Seite, `:user-invalid` erst, wenn die Person etwas eingegeben und das Feld ungültig verlassen hat.
- Funktioniert bei `input`, `select` und `textarea`.
- Ohne die Pseudoklassen musste man per JavaScript den Ausgangswert, den Fokus und das Ausmaß der Änderungen verfolgen, die Gültigkeit prüfen und eine Klasse setzen.

## Eigene Einordnung

Inhaltlich deckungsgleich mit MDN, aber anschaulicher beim Vergleich mit `:invalid`.

## Verknüpftes Wissen

- [[komponenten/formularfehler|Formularfehler erst nach der Eingabe anzeigen]]

## Offene Fragen

- Autor des Artikels.
