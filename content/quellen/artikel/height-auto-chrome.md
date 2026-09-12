---
type: page
status: active
publish: true
title: "Animate to height auto (Chrome for Developers)"
description: "Quellennotiz zum Chrome-Artikel über interpolate-size und calc-size(): Animieren zu height: auto und anderen intrinsischen Größen."
authors:
  - "Bramus"
publisher: "Chrome for Developers"
source_published: "2024-09-17"
url: "https://developer.chrome.com/docs/css-ui/animate-to-height-auto"
archive_url:
source_kind: secondary
---

# Animate to height auto (Chrome for Developers)

## Quelle / bibliografische Angaben

Artikel auf Chrome for Developers.

- Titel laut Seite: „Animate to height: auto; (and other intrinsic sizing keywords) in CSS“ (Doppelpunkt und Semikolon im Dateinamen weggelassen)
- Autor laut Seite: Bramus
- Veröffentlicht: 17. September 2024
- URL: <https://developer.chrome.com/docs/css-ui/animate-to-height-auto>, abgerufen 2026-09-12 (über Firecrawl)

## Kurzfassung

Animationen zwischen einer Länge und Schlüsselwörtern wie `auto`, `min-content` oder `fit-content` werden per Opt-in möglich: global mit `interpolate-size: allow-keywords` oder gezielt mit `calc-size()`.

## Kernaussagen

- **Browserunterstützung laut Seite:** Chrome und Edge 129, Firefox und Safari nicht.
- **`interpolate-size`:** Standard `numeric-only` (keine Interpolation). `allow-keywords` erlaubt Interpolation von Längen zu intrinsischen Schlüsselwörtern, wo der Browser das kann. Die Eigenschaft wird vererbt.
- **Eingrenzen:** statt auf `:root` nur auf einen Teilbaum setzen, z. B. `main`, wenn andere Bereiche nicht damit zurechtkommen.
- **Warum Opt-in:** Standardmäßig einschalten wäre nicht rückwärtskompatibel, weil viele Stylesheets davon ausgehen, dass `auto` nicht animiert (Verweis auf CSSWG-Issue 626).
- **`calc-size()`:** für Berechnungen, z. B. `calc-size(fit-content, size + 1em)`. Braucht einen Fallback, etwa eine vorangestellte Deklaration ohne `calc-size()`.
- **Empfehlung:** in den meisten Fällen `interpolate-size: allow-keywords` auf `:root`. Browser ohne Unterstützung fallen auf „keine Transition“ zurück – Progressive Enhancement.
- **`details`:** Mit `interpolate-size` und einer Transition auf `height` animiert nur das Öffnen. Für beide Richtungen verweist der Artikel auf `::details-content` (damals angekündigt).

## Eigene Einordnung

Klar erklärt. Ein Tippfehler in der Quelle: Im Abschnitt zur Begründung heißt es `interpolate-size: allow-sizes`; der gültige Wert ist `allow-keywords`, wie überall sonst im Artikel und in der MDN-Referenz zu `interpolate-size` (abgerufen 2026-09-12, keine eigene Quellennotiz). Laut `web-features` 3.38.0 weiterhin nur Chromium.

## Verknüpftes Wissen

- [[animation/ein-und-ausblenden|Ein- und Ausblenden mit CSS animieren]]
- [[navigation/akkordeon|Akkordeon mit details bauen]]
