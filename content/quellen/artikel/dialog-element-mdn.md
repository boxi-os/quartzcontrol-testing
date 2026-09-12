---
type: page
status: active
publish: true
title: "dialog-Element (MDN)"
description: "Quellennotiz zur MDN-Referenz des dialog-Elements: modal und nicht modal, closedby, Barrierefreiheit, Animation."
authors: []
publisher: "MDN Web Docs"
source_published:
url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog"
archive_url:
source_kind: secondary
---

# dialog-Element (MDN)

## Quelle / bibliografische Angaben

MDN-Referenz „`<dialog>` HTML dialog element“, englische Fassung.

- Stand laut Seite: „last modified on Sep 2, 2026“
- URL: <https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog>, abgerufen 2026-09-12 (über Firecrawl)

## Kurzfassung

`dialog` ist das native Element für modale und nicht modale Dialoge. Modal geöffnet macht es den Rest der Seite inert, legt eine `::backdrop` an und schließt per `Esc`.

## Kernaussagen

- **Baseline laut Seite:** „Widely available“, seit März 2022 browserübergreifend verfügbar; einzelne Teile variieren.
- **Öffnen:** `showModal()` modal, `show()` nicht modal. Das `open`-Attribut öffnet immer nicht modal und wird nicht empfohlen.
- **Modal:** Andere Bedienelemente werden blockiert, der Rest der Seite ist inert.
- **Deklarativ:** Invoker Commands `command="show-modal" | "close" | "request-close"` mit `commandfor`. Nicht modal geht es auch über `popover` am `dialog` plus `popovertarget` – dann schließt ein Klick daneben.
- **`closedby`:** `any` (Klick daneben, Plattformgeste wie `Esc`, eigener Mechanismus), `closerequest` (Plattformgeste, eigener Mechanismus), `none` (nur eigener Mechanismus). Ohne gültigen Wert gilt bei `showModal()` `closerequest`, sonst `none`.
- **Schließen:** Formular mit `method="dialog"`, `close()`, `Esc` (wo aktiv), Klick daneben (wo aktiv). Es soll immer einen expliziten Schließen-Button geben, auch für Geräte ohne Tastatur.
- **CSS:** `:modal`, `:open`, `::backdrop`. Ohne `:open`-Unterstützung `dialog[open]` verwenden.
- **Hinweise:** `autofocus` auf das Element setzen, mit dem Nutzer zuerst interagieren – sonst auf den Schließen-Button. **Kein `tabindex` auf `dialog`.**
- **Barrierefreiheit:** `showModal()` fokussiert das erste fokussierbare Element im Dialog. `Esc` schließt bei mehreren offenen modalen Dialogen nur den zuletzt geöffneten. Modal geöffnet gilt implizit `aria-modal="true"`, sonst `aria-modal="false"`. Wer Dialoge mit anderen Elementen nachbaut, muss dieses Verhalten selbst herstellen.
- **Animation:** wie bei Popovers – `@starting-style`, `display` und `overlay` mit `allow-discrete`. Das Beispiel nutzt `dialog:open` für den offenen und `dialog` für den geschlossenen Zustand, `@starting-style` danach.

## Eigene Einordnung

Maßgebliche Referenz für Dialog-Verhalten. Die Baseline-Angaben der Seite betreffen das Element insgesamt; `closedby` fehlt laut `web-features` 3.38.0 in Safari, `:open` ist erst seit 2026-05-11 überall verfügbar. Für das Animationsbeispiel gilt: `overlay` nur in Chromium, `display`-Transitions fehlen in Firefox.

## Verknüpftes Wissen

- [[navigation/top-layer|Top Layer mit popover und dialog]]
- [[navigation/mobilmenue|Mobile-Menü ohne Checkbox-Hack bauen]]
- [[animation/ein-und-ausblenden|Ein- und Ausblenden mit CSS animieren]]
