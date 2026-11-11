---
type: page
status: active
publish: true
title: "has() Pseudoklasse (MDN)"
description: "Quellennotiz zur MDN-Referenz von :has(): Spezifität, Grenzen und ausführliche Performance-Hinweise."
authors: []
publisher: "MDN Web Docs"
source_published: 
url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:has"
archive_url:
source_kind: secondary
---

# has() Pseudoklasse (MDN)

## Quelle / bibliografische Angaben

MDN-Referenz „`:has()` CSS pseudo-class“, englische Fassung. Dateiname ohne Doppelpunkt.

- Stand laut Seite: „last modified on Aug 11, 2026“
- URL: <https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:has>, abgerufen 2026-10-18 (über Firecrawl)
- Ausgewertet: Description, Performance considerations; die Beispiele nur überflogen

## Kurzfassung

`:has()` trifft ein Element, wenn ein relativer Selektor ausgehend von diesem Element etwas findet. Die Seite enthält einen eigenen Abschnitt zur Performance.

## Kernaussagen

- **Spezifität:** die des spezifischsten Arguments, wie bei `:is()` und `:not()`.
- **Fehlender Support:** Kennt ein Browser `:has()` nicht, scheitert der ganze Selektorblock — außer `:has()` steht in einer fehlertoleranten Liste von `:is()` oder `:where()`.
- **Keine Schachtelung:** `:has()` darf nicht in `:has()` stehen.
- **Keine Pseudoelemente**, weder im Argument noch als Anker. Begründung: Viele Pseudoelemente existieren nur abhängig vom Styling ihrer Vorfahren; sie per `:has()` abzufragen, könnte zirkuläre Abfragen erzeugen.
- **Performance:** Bei DOM-Änderungen muss der Browser `:has()` neu bewerten. Der Anker (das `A` in `A:has(B)`) sollte kein Element mit sehr vielen Nachfahren sein, also nicht `body`, `:root` oder `*`. Das Argument eng fassen, etwa mit `>` oder `+`, damit nicht ganze Teilbäume durchsucht werden.

## Eigene Einordnung

Die Grenzen (keine Schachtelung, keine Pseudoelemente), die in [[selektoren/has|CSS-Pseudoklasse has()]] bisher als ungeprüft markiert waren, sind hiermit durch MDN belegt. Der Performance-Abschnitt ist deutlicher als die meisten Blogartikel.

## Verknüpftes Wissen

- [[selektoren/has|CSS-Pseudoklasse has()]]
- [[selektoren/nach-inhalt-auswaehlen|Elemente anhand ihres Inhalts auswählen]]

## Offene Fragen

- Konkrete Messwerte zur Performance nennt die Seite nicht.
