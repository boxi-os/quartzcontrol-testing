---
type: page
status: active
publish: true
title: "A Friendly Introduction to Container Queries (Josh W. Comeau)"
description: "Quellennotiz zu Josh Comeaus Einführung in Container Queries: das Endlosschleifen-Problem, Containment und warum inline-size der Normalfall ist."
authors: 
  - "Josh W. Comeau"
publisher: "joshwcomeau.com"
source_published: "2024-11-04"
url: "https://www.joshwcomeau.com/css/container-queries-introduction/"
archive_url:
source_kind: secondary
---

# A Friendly Introduction to Container Queries (Josh W. Comeau)

## Quelle / bibliografische Angaben

Josh W. Comeau: „A Friendly Introduction to Container Queries“, Blogartikel mit interaktiven Demos.

- Veröffentlicht laut Seite: 2024-11-04, „Last updated on November 4th, 2024“
- URL: <https://www.joshwcomeau.com/css/container-queries-introduction/>, abgerufen 2026-10-18 (über Firecrawl)
- Ausgewertet: ganzer Text; die interaktiven Demos nur über ihren Begleittext

## Kurzfassung

Erklärt, warum es Container Queries so lange nicht gab, und was `container-type` deshalb am Layout verändert.

## Kernaussagen

- Media Queries fragen **globale** Eigenschaften ab (Fenster, Farbschema), Container Queries **lokale**, zum Beispiel die Breite des umgebenden Elements.
- Das „unmögliche Problem“: Wenn CSS innerhalb einer Query den Container selbst größer oder kleiner macht, gilt die Bedingung plötzlich nicht mehr, und das Layout flackert hin und her. Gelöst wurde das über die Containment API.
- `container-type: size` sagt dem Browser, dass die Größe des Elements nicht vom Inhalt abhängt. Weil sich Höhen normalerweise aus dem Inhalt ergeben, fällt so ein Container ohne feste Höhe auf 0 zusammen (plus Padding).
- `container-type: inline-size` sperrt nur die Breite. Die Höhe wächst weiter mit dem Inhalt, und Abfragen auf die Breite funktionieren.
- „Goldene Regel“ (Comeau schreibt sie Miriam Suzanne zu): Man kann nicht ändern, was man misst. Mit `inline-size` gehen Bedingungen auf die Breite, nicht auf die Höhe.
- Im Beispiel braucht die Karte ein umgebendes `.child-wrapper` als Container und schreibt die `@container`-Regel per Nesting direkt in den Kartenblock.
- Browserunterstützung zum Zeitpunkt des Artikels: Safari 16 (September 2022), Chrome/Edge 105 (August 2022), Firefox 110 (Februar 2023), rund 93 %.
- Container Queries würden noch wenig genutzt, auch weil Designer die Möglichkeit oft nicht kennen.

## Eigene Einordnung

Die verständlichste Erklärung, *warum* `container-type` nötig ist und was es kaputt machen kann. Die Prozentangabe zur Verbreitung ist von 2024 und hier nicht aktualisiert.

## Verknüpftes Wissen

- [[grundlagen/container-queries|Container Queries]]
- [[selektoren/nesting|CSS-Nesting]]

## Offene Fragen

- Keine.
