---
type: page
status: active
publish: true
title: "focus-visible Pseudoklasse (MDN)"
description: "Quellennotiz zur MDN-Referenz von :focus-visible: Fokusring nur, wenn der Browser ihn für nötig hält, mit Hinweisen zu Kontrast und Kognition."
authors: []
publisher: "MDN Web Docs"
source_published: 
url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:focus-visible"
archive_url:
source_kind: secondary
---

# focus-visible Pseudoklasse (MDN)

## Quelle / bibliografische Angaben

MDN-Referenz „`:focus-visible` CSS pseudo-class“, englische Fassung. Dateiname ohne Doppelpunkt.

- Stand laut Seite: „last modified on Oct 6, 2026“
- URL: <https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:focus-visible>, abgerufen 2026-10-18 (über Firecrawl)
- Ausgewertet: Einleitung, „:focus vs :focus-visible“, Accessibility, Beispiele

## Kurzfassung

`:focus-visible` trifft ein fokussiertes Element nur dann, wenn der Browser meint, dass der Fokus sichtbar sein sollte.

## Kernaussagen

- Der Browser entscheidet per Heuristik. Typisch: Klick auf einen Button mit der Maus zeigt keinen Fokus an, ein Textfeld mit Fokus dagegen schon, und bei Tastaturbedienung immer.
- Hintergrund: Früher bekam jedes fokussierte Element einen Ring, auch nach einem Mausklick. Das fanden viele hässlich und haben `outline` entfernt, wodurch Tastaturnutzer nicht mehr sehen konnten, wo sie sind.
- Mit `:focus-visible` ändert man **wie** der Fokus aussieht, ohne zu ändern, **wann** er erscheint.
- Barrierefreiheit: Der Fokusindikator braucht nach WCAG 1.4.11 mindestens 3:1 Kontrast.
- Kognition: Wer Maus und Tastatur mischt, versteht unter Umständen nicht, warum der Fokusring mal da ist und mal nicht.
- Banner: Baseline widely available, „available across browsers since March 2022“.

## Eigene Einordnung

Der Kognitions-Hinweis ist ein echtes Gegenargument und spricht dafür, `:focus-visible` nicht als Freibrief zu nehmen, um alle anderen Fokusanzeigen zu entfernen.

## Verknüpftes Wissen

- [[komponenten/fokusstile|Sichtbare Fokusstile]]

## Offene Fragen

- Keine.
