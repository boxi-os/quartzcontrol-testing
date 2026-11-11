---
type: page
status: active
publish: true
title: "Decoding CSS Selectors – has(not) vs not(has) (Polypane)"
description: "Quellennotiz zu einem Polypane-Artikel über den Unterschied zwischen :has(:not()) und :not(:has())."
authors: []
publisher: "Polypane"
source_published: "2025-02-17"
url: "https://polypane.app/blog/decoding-css-selectors-has-not-vs-not-has/"
archive_url:
source_kind: secondary
---

# Decoding CSS Selectors – has(not) vs not(has) (Polypane)

## Quelle / bibliografische Angaben

Blogartikel „Decoding CSS Selectors: :has(:not) vs :not(:has)“ im Blog des Browser-Tools Polypane. Doppelpunkte im Dateinamen weggelassen.

- Datum laut Seite: „Posted on February 17, 2025“
- Autor: auf der abgerufenen Seite nicht genannt
- URL: <https://polypane.app/blog/decoding-css-selectors-has-not-vs-not-has/>, abgerufen 2026-10-18 (über Firecrawl)
- Vollständig ausgewertet

## Kurzfassung

Der Artikel erklärt an einer Karte mit optionalem Bild, warum `.card:has(:not(img))` fast jede Karte trifft und nur `.card:not(:has(img))` die Karten ohne Bild.

## Kernaussagen

- Beide Selektoren haben die Spezifität (0,1,1), bedeuten aber Verschiedenes.
- **Lesetechnik:** implizite Selektoren ergänzen, in Teile zerlegen, von innen nach außen lesen.
- Steht eine Pseudoklasse ohne Selektor davor, ergänzt der Parser ein `*`: `a :focus` heißt `a *:focus`.
- Bei `:has()` beziehen sich die Selektoren im Argument auf Nachfahren, bei `:is()` und `:not()` auf das Element selbst.
- `.card:has(*:not(img))`: `*:not(img)` trifft den `span` — also jede Karte mit Text.
- `.card:not(.card:has(img))`: trifft nur Karten, für die „hat ein Bild“ falsch ist.

## Eigene Einordnung

Sehr gute, knappe Erklärung eines häufigen Fehlers. Verweist am Ende auf einen Artikel von Manuel Matuzović zum selben Thema, der hier nicht ausgewertet ist.

## Verknüpftes Wissen

- [[selektoren/nach-inhalt-auswaehlen|Elemente anhand ihres Inhalts auswählen]]
- [[selektoren/not-is-where|CSS-Pseudoklassen not(), is() und where()]]

## Offene Fragen

- Autorenschaft nicht belegt.
