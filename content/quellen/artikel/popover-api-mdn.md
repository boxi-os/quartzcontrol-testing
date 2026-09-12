---
type: page
status: active
publish: true
title: "Using the Popover API (MDN)"
description: "Quellennotiz zur MDN-Anleitung der Popover-API: Zustände, Barrierefreiheit, Positionierung und Animation."
authors: []
publisher: "MDN Web Docs"
source_published:
url: "https://developer.mozilla.org/en-US/docs/Web/API/Popover_API/Using"
archive_url:
source_kind: secondary
---

# Using the Popover API (MDN)

## Quelle / bibliografische Angaben

MDN-Leitfaden „Using the Popover API“, englische Fassung.

- Stand laut Seite: „last modified on Jul 9, 2026“
- URL: <https://developer.mozilla.org/en-US/docs/Web/API/Popover_API/Using>, abgerufen 2026-09-12 (über Firecrawl)
- Die HTML-Beispiele sind im erfassten Text teilweise leer; ausgewertet wurden Fließtext und CSS-Beispiele

## Kurzfassung

Das Attribut `popover` blendet ein Element aus und zeigt es bei Bedarf im Top Layer an. Steuerbar deklarativ über Buttons oder per JavaScript, in den Zuständen `auto`, `manual` und `hint`.

## Kernaussagen

- **Grundlage:** `popover` ohne Wert entspricht `popover="auto"`. Das Element erhält `display: none`. Ein Button mit `popovertarget` schaltet es um. `popovertargetaction` kennt `show`, `hide`, `toggle` (Standard).
- **Invoker Commands:** `commandfor` und `command` können `popovertarget`/`popovertargetaction` ersetzen und sind allgemeiner angelegt.
- **`auto`-Zustand:** Schließen per Klick daneben („light dismiss“) und per `Esc`. Normalerweise ist nur ein `auto`-Popover gleichzeitig offen, ein zweites schließt das erste. Ausnahme: verschachtelte Popovers. `showModal()` und `requestFullscreen()` an anderen Elementen schließen `auto`-Popovers.
- **Barrierefreiheit bei `popovertarget`:**
  - Das geöffnete Popover rückt in der Tab-Reihenfolge direkt hinter den Button.
  - Beim Schließen per Tastatur (meist `Esc`) geht der Fokus zurück an den Button.
  - Implizite `aria-details`- und `aria-expanded`-Beziehung zwischen Button und Popover.
  - Über die `source`-Option von `showPopover()`/`togglePopover()` entsteht nur die Tab-Reihenfolge, nicht die ARIA-Beziehung.
- **`manual`:** kein Light dismiss, beliebig viele gleichzeitig offen.
- **Events:** `beforetoggle` (vorher, abbrechbar) und `toggle` (nachher) mit `oldState`, `newState`, `source`.
- **CSS:** `[popover]`, `[popover="auto"]`, `:popover-open`, `::backdrop`. UA-Standard: `position: fixed; inset: 0; width/height: fit-content; margin: auto; border: solid; padding: 0.25em; overflow: auto` – daher mittig mit Rahmen.
- **Anker:** Popover und auslösender Button haben eine **implizite Ankerbeziehung**. Positionierung mit `anchor()` oder `position-area` ohne `anchor-name`/`position-anchor`. Die UA-Standardstile können dabei stören (Beispiele setzen `margin: 0; inset: auto`).
- **Animation:** `display` wechselt beim Einblenden bei 0 %, beim Ausblenden bei 100 %. Für Transitions nötig: `@starting-style`, `display` und `overlay` in der Transition-Liste, `transition-behavior: allow-discrete`. Keyframe-Animationen brauchen das nicht. `@starting-style` muss nach der Regel für den offenen Zustand stehen (gleiche Spezifität). Der `::backdrop`-Startzustand lässt sich nicht verschachteln, weil `&` keine Pseudoelemente abbilden kann.

## Eigene Einordnung

Vollständigste Referenz zur Popover-API. Zwei Einschränkungen zur Animation nennt die Seite nicht – beide laut `web-features` 3.38.0:

- `overlay` existiert nur in Chromium (ab 117).
- Das Animieren und Transitionieren von `display` (Feature „display animation“) ist *limited*: Chrome 117, Safari 18, **Firefox fehlt**. Ausblend-Animationen laufen dort also nicht.

## Verknüpftes Wissen

- [[navigation/top-layer|Top Layer mit popover und dialog]]
- [[navigation/dropdown-navigation|Dropdown-Navigation mit Disclosure-Buttons bauen]]
- [[animation/ein-und-ausblenden|Ein- und Ausblenden mit CSS animieren]]

## Offene Fragen

- Ob die implizite Ankerbeziehung in Firefox und Safari genauso greift, sagt die Seite nicht.
