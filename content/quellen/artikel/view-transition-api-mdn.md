---
type: page
status: active
publish: true
title: "Using the View Transition API (MDN)"
description: "Quellennotiz zum MDN-Leitfaden der View Transition API: Ablauf, Pseudoelement-Baum, SPA- und MPA-Übergänge."
authors: []
publisher: "MDN Web Docs"
source_published:
url: "https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using"
archive_url:
source_kind: secondary
---

# Using the View Transition API (MDN)

## Quelle / bibliografische Angaben

MDN-Leitfaden „Using the View Transition API“, englische Fassung.

- Stand laut Seite: „last modified on Jun 19, 2026“
- URL: <https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using>, abgerufen 2026-09-12 (über Firecrawl)
- Ausgewertet: Ablauf, Snapshots, Pseudoelement-Baum, Basisbeispiele SPA und MPA, Anpassen der Animationen, `view-transition-name`; die JavaScript-Steuerung und die Stabilisierung des Seitenzustands nur überflogen

## Kurzfassung

Eine View Transition hält den alten Zustand als Bild fest, führt die Änderung durch und blendet vom alten zum neuen Zustand über. Das geht innerhalb eines Dokuments (SPA) per JavaScript oder zwischen Dokumenten derselben Herkunft (MPA) per CSS-Opt-in.

## Kernaussagen

- **Auslösen:**
  - Same-Document: Callback an `document.startViewTransition()` (oder `element.startViewTransition()` für Element-Scope).
  - Cross-Document: Navigation zwischen Dokumenten **gleicher Herkunft**, beide mit `@view-transition { navigation: auto; }`.
- **Ablauf:**
  1. Snapshots aller Elemente mit `view-transition-name` ungleich `none` im alten Zustand.
  2. Änderung (Callback bzw. Navigation).
  3. „Live“-Snapshots des neuen Zustands.
  4. Standardmäßig Überblendung (alt `opacity` 1 → 0, neu 0 → 1).
  5. Aufräumen; Promises `updateCallbackDone`, `ready`, `finished`.
- Ist das Dokument beim Aufruf verborgen (z. B. anderer Tab aktiv), wird die Transition übersprungen.
- **Snapshots:** Der alte ist ein statisches Bild, der neue eine interaktive DOM-Region.
- **Pseudoelemente:** `::view-transition` > `::view-transition-group(name)` > `::view-transition-image-pair(name)` > `::view-transition-old(name)` / `::view-transition-new(name)`. `:root` hat standardmäßig `view-transition-name: root`. Bei MPA existiert der Baum nur im Zieldokument.
- **Standardanimationen:** Überblenden; Größenänderungen skalieren, Positions- und Transform-Änderungen bewegen weich.
- **Anpassen:** Dauer bevorzugt an `::view-transition-group(root)` setzen, weil `old` und `new` erben. Eigene `@keyframes` auf `::view-transition-old(root)` und `::view-transition-new(root)`. Bei MPA gehören diese Stile ins Zieldokument, für beide Richtungen in beide.
- **Namen:** `view-transition-name` braucht pro gerendertem Element einen **eindeutigen** `<custom-ident>`. Doppelte Namen lassen `ready` scheitern, die Transition wird übersprungen. `match-element` vergibt automatisch eindeutige Namen.
- **Feature-Erkennung im SPA-Beispiel:** Ohne `document.startViewTransition` wird die Änderung direkt ausgeführt.

## Eigene Einordnung

Laut `web-features` 3.38.0 sind Same-Document-Transitions seit 2025-10-14 Baseline *newly available* (Firefox 144). Cross-Document-Transitions fehlen in Firefox; element-scoped Transitions gibt es nur in Chromium (ab 147). Die Seite behandelt Barrierefreiheit im ausgewerteten Teil nicht.

## Verknüpftes Wissen

- [[animation/view-transitions|View Transitions]]
- [[animation/barrierearme-animationen|Barrierearme Animationen]]
