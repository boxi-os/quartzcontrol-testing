---
type: page
status: active
publish: true
title: "Invoker Commands API (MDN)"
description: "Quellennotiz zur MDN-Übersicht der Invoker Commands API: command und commandfor an Buttons."
authors: []
publisher: "MDN Web Docs"
source_published:
url: "https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API"
archive_url:
source_kind: secondary
---

# Invoker Commands API (MDN)

## Quelle / bibliografische Angaben

MDN-Übersicht „Invoker Commands API“, englische Fassung.

- Stand laut Seite: „last modified on Jan 19, 2026“
- URL: <https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API>, abgerufen 2026-09-12 (über Firecrawl)
- Ausgewertet: Einleitung, Attribute, Schnittstellen; nicht die Beispiele

## Kurzfassung

Buttons bekommen deklarativ ein Verhalten gegenüber einem anderen Element: `commandfor` nennt die ID des Ziels, `command` die Aktion.

## Kernaussagen

- **Baseline laut Seite:** 2025, *newly available* seit Dezember 2025.
- **Zweck:** Buttons steuern häufig Popovers oder Dialoge. Bisher brauchte das JavaScript-Listener. Die API erledigt das für eine begrenzte Menge von Aktionen deklarativ.
- **Attribute:** `commandfor` (ID des Zielelements), `command` (Aktion).
- **JavaScript:** `HTMLButtonElement.commandForElement` und `.command` spiegeln die Attribute. Das Zielelement erhält ein `command`-Event (`CommandEvent`).

## Eigene Einordnung

Die Befehle für `dialog` (`show-modal`, `close`, `request-close`) stehen in der [[quellen/artikel/dialog-element-mdn|dialog-Referenz]], nicht auf dieser Übersichtsseite. Weil die API erst seit Ende 2025 überall verfügbar ist, lohnt für ältere Browser ein kleines Polyfill (Beispiel in [[navigation/mobilmenue|Mobile-Menü ohne Checkbox-Hack bauen]]).

## Verknüpftes Wissen

- [[navigation/top-layer|Top Layer mit popover und dialog]]
- [[navigation/mobilmenue|Mobile-Menü ohne Checkbox-Hack bauen]]
