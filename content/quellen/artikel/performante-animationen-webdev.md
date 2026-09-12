---
type: page
status: active
publish: true
title: "How to create high-performance CSS animations (web.dev)"
description: "Quellennotiz zum web.dev-Leitfaden für performante CSS-Animationen mit transform und opacity."
authors:
  - "Kayce Basques"
  - "Rachel Andrew"
publisher: "web.dev"
source_published:
url: "https://web.dev/articles/animations-guide"
archive_url:
source_kind: secondary
---

# How to create high-performance CSS animations (web.dev)

## Quelle / bibliografische Angaben

Leitfaden auf web.dev.

- Autoren laut Seite: Kayce Basques, Rachel Andrew
- Stand laut Seite: „Last updated 2020-10-06“
- URL: <https://web.dev/articles/animations-guide>, abgerufen 2026-09-12 (über Firecrawl)
- Die Theorie dahinter steht im verlinkten Artikel „Why are some animations slow?“, nicht ausgewertet

## Kurzfassung

Für flüssige Animationen `transform` und `opacity` animieren und Eigenschaften meiden, die Layout oder Paint auslösen. `will-change` nur gezielt einsetzen.

## Kernaussagen

- **Bewegen:** `transform` mit `translate`; **Drehen:** `rotate`; **Skalieren:** `scale`; **Ein-/Ausblenden:** `opacity`.
- **Meiden:** Eigenschaften, die Layout oder Paint auslösen, außer es ist unbedingt nötig. Vorher die Wirkung auf die Rendering-Pipeline prüfen.
- **Ebenen erzwingen:** `will-change` legt ein Element auf eine eigene Ebene. Laut Spezifikation nur für Elemente, die sich gleich ändern werden, z. B. eine ein- und ausfahrende Seitenleiste. Sonst per JavaScript kurz vorher setzen und danach wieder entfernen.
- **Ohne `will-change`-Unterstützung:** `transform: translateZ(0)`.

## Eigene Einordnung

Kernaussagen gelten weiter, die Seite ist aber von 2020. Einzelne Transform-Eigenschaften (`translate`, `rotate`, `scale` als eigene CSS-Eigenschaften) erwähnt sie nicht. Der `translateZ(0)`-Hinweis ist heute praktisch überflüssig, weil `will-change` laut `web-features` 3.38.0 Baseline *widely available* ist. Die Empfehlung, `will-change` nur gezielt zu setzen, widerspricht dem pauschalen Tipp in [[quellen/artikel/position-mdn|position CSS-Eigenschaft (MDN)]].

## Verknüpftes Wissen

- [[animation/transitions-und-keyframes|CSS-Transitions und Keyframe-Animationen]]
- [[animation/barrierearme-animationen|Barrierearme Animationen]]
