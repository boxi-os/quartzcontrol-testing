---
type: page
status: active
publish: true
title: "Relative Farbangaben (SELFHTML)"
description: "Quellennotiz zum SELFHTML-Tutorial über relative Farbangaben und Farbinterpolation, mit Hinweis auf einen Wertebereichsfehler im Beispiel."
authors:
  - "Matthias Scharwies"
publisher: "SELFHTML-Wiki"
source_published: "2025-12-01"
url: "https://wiki.selfhtml.org/wiki/Farbe/Relative_Farbangaben"
archive_url:
source_kind: secondary
---

# Relative Farbangaben (SELFHTML)

## Quelle / bibliografische Angaben

Tutorial des SELFHTML-Wikis zur relativen Farbsyntax und zur Farbinterpolation.

- Als Autor signiert im Tutorialteil: Matthias Scharwies, Signatur „13:11, 1. Dezember 2025 (CET)". Die hinteren Abschnitte (Farbinterpolation, Koordinatensysteme) tragen keine Signatur und stammen möglicherweise von anderen Autoren — kollektiv bearbeitetes Wiki, siehe [[quellen/wiki-selfhtml|SELFHTML-Wiki]].
- `source_published` ist deshalb das Datum der Autorensignatur, nicht ein Publikationsdatum der Seite; ein solches weist die Seite nicht aus.
- Die Seite datiert ihre Supportaussage selbst auf „Stand: Dezember 2025".
- URL: <https://wiki.selfhtml.org/wiki/Farbe/Relative_Farbangaben>, abgerufen 2026-09-03
- Lizenz der Wiki-Inhalte: CC BY-SA 3.0 DE
- Erfasst über den Obsidian Web Clipper; die Farbfelder und interaktiven Beispiele fehlen im Clip, die Farbwerte stehen aber als Text daneben.
- Angegebene Spezifikationen: CSS Color Module Level 5 (<https://www.w3.org/TR/css-color-5/>), Abschnitt Relative Colors

## Kurzfassung

Zeigt, wie sich aus **einer** Grundfarbe eine vollständige Palette ableiten lässt: Aufhellungen, Abdunklungen, Akzente, Komplementär- und Triadenfarben, kontrastreiche Schriftfarben. Der zweite Teil erklärt systematisch die Farbinterpolation und die Wahl des Interpolationsfarbraums.

## Kernaussagen

### Das Problem: Magic Numbers

Feste Farbwerte sind isoliert — sie tragen keine Information darüber, wie sie entstanden sind. `#3a7bd5` und daneben `#2a6bb8` als Hover-Farbe: 10 % dunkler? 20 %? Niemand weiß es später. Relative Farbangaben ersetzen die Herleitung im Grafikprogramm durch eine im CSS sichtbare Rechenvorschrift.

### Schlüsselwort `from`

- In Level 5 sind alle Farbfunktionen um `from` erweitert: `funktion(from <bezugsfarbe> <kanal> <kanal> <kanal> [/ alpha])`.
- Die Kanäle werden durch die Buchstaben des jeweiligen Farbmodells repräsentiert, die Transparenz über `alpha`.
- Beispiel: `background: rgb(from var(--bg-color) r g b / 20%)` übernimmt die Farbe und setzt die Deckkraft unabhängig vom Ausgangswert auf 20 %.
- **Die Bezugsfarbe darf in einem beliebigen Farbmodell stehen**, CSS rechnet um. Achtung: Liegt eine OKLCH-Farbe außerhalb von sRGB und wird in `rgb()` als Bezug verwendet, entsteht bei der Umrechnung eine Ersatzfarbe — Genauigkeitsverlust.
- Der Artikel weist auf die Kontextabhängigkeit durchscheinender Farben hin: derselbe Wert wirkt auf Weiß pastellblau, im Dark Mode nahezu mitternachtsblau.

### Palette aus einer Grundfarbe

Helligkeitsstufen über `calc()` auf dem L-Kanal:

```css
:root {
  --base: blue;
  --base-light-1: oklch(from var(--base) calc(l + 0.25) c h);
  --base-dark-1:  oklch(from var(--base) calc(l - 0.25) c h);
}
```

Akzente und Harmonien über den H-Kanal:

```css
--accent-warm:        oklch(from var(--base) l c calc(h + 20));
--accent-cool:        oklch(from var(--base) l c calc(h - 20));
--accent-complement:  oklch(from var(--base) l c calc(h + 180));
/* triadisch: calc(h + 120) und calc(h - 120) */
```

### Kontrastreiche Schriftfarben

Weil alle Grundfarben der Palette dieselbe wahrgenommene Helligkeit haben, lässt sich die Schriftfarbe mitberechnen — helle Schrift auf dunklen Tönen, dunkle auf hellen. Noch einfacher mit `contrast-color(var(--tone))`: Der Browser wählt selbst die kontrastreichste Farbe zum übergebenen Hintergrund; Voraussetzung ist, dass dieser hell oder dunkel genug ist. Ausdrücklicher Hinweis der Seite: Wichtiges wie Fehlermeldungen darf nicht allein über Farbe gekennzeichnet werden.

### `color-mix()` als Fallback

In älteren Browsern bleiben Felder mit relativen Farbangaben weiß. `color-mix(in <farbraum>, farbe1 [p1], farbe2 [p2])` ist breiter verfügbar und deckt einen Teil der Fälle ab. Für noch ältere Browser nennt der Artikel einen Polyfill sowie den Weg, die errechneten Werte einmalig in Hex zu übersetzen.

### Farbinterpolation

Interpolation betrifft `transition`, `animation`, Verläufe, Filter und `color-mix()`. Syntax: `in <system> [<richtung> hue]`.

| System | Charakter laut Artikel |
| --- | --- |
| `srgb` | ursprüngliches Verfahren; nicht auf gleichmäßige Wahrnehmung ausgelegt, Verläufe oft zu dunkel oder grau |
| `srgb-linear`, `xyz`, `xyz-d50`, `xyz-d65` | lineare Lichtintensität, entspricht der Mischung farbigen Lichts |
| `lab`, `oklab` | wahrnehmungsnäher, gleichmäßigerer Farbübergang; `oklab` ist Ottosons verbesserte Umrechnung von XYZ nach Lab |
| `hsl`, `hwb` | polar, Übergang als Wechsel der Farbtöne — bei Rot nach Blau eher ein Spektrum als ein Übergang |
| `lch`, `oklch` | polar, wahrnehmungsgleichförmig, vermeidet das „Ausgrauen" |

**Interpolationsrichtung** bei polaren Systemen: Standard ist `shorter` (kleinerer Drehwinkel), `longer` nimmt den größeren, `increasing` und `decreasing` folgen auf- bzw. absteigenden Winkelwerten unabhängig von der Länge.

## Eigene Einordnung

Das ist die inhaltlich stärkste der bisher im Vault erfassten Farbquellen, weil sie zwei Dinge verbindet, die anderswo getrennt stehen: die relative Syntax als *Ableitungsmechanismus* und die Interpolation als *Übergangsmechanismus*. Beide beantworten dieselbe Frage — in welchem Farbraum wird gerechnet — und beide sind der Grund, warum OKLCH mehr ist als eine hübschere Schreibweise (vgl. [[grundlagen/farben|Farben in CSS]]).

Praktisch heißt das: `--base` als einzige gepflegte Farbe, alles andere abgeleitet. Wer das durchzieht, ändert ein Theme über einen einzigen Wert und behält trotzdem konsistente Kontraste. Das ist ein qualitativer Sprung gegenüber der HSL-Rechnerei aus [[quellen/artikel/custom-properties-selfhtml|CSS Custom properties (CSS-Variablen) (SELFHTML)]], weil die Helligkeit dort nicht wahrnehmungsgleich ist.

Drei Einschränkungen, die die Seite selbst nicht klar zieht:

- **Die Supportaussage ist datiert, nicht dauerhaft.** „Funktioniert in allen modernen Browsern (Stand Dezember 2025)" gilt für die relative Syntax. `contrast-color()` ist deutlich neuer und wird im selben Atemzug empfohlen, ohne eigene Supportangabe. Nicht geprüft.
- **Ein Beispiel ist offensichtlich fehlerhaft.** Im Abschnitt zu Schriftfarben steht `oklch(from var(--tone) calc(l + 45) …)` und `calc(l + 40)`. In OKLCH liegt L zwischen 0 und 1; Werte um 40 klemmen auf Weiß. Das passt zu LCH (L in Prozent, 0–100), nicht zu OKLCH. Vermutlich ein beim Umschreiben stehengebliebener Wert. Die Beispiele weiter oben verwenden korrekt `calc(l + 0.25)`.
- **Der Polyfill-Link passt nicht zur Aussage.** Verwiesen wird auf `postcss/postcss-relative-opacity`; das ist dem Namen nach kein Polyfill für die relative Farbsyntax. Nicht nachgeprüft, aber der Verweis trägt so nicht.

Der Hinweis auf `contrast-color()` ist trotzdem der interessanteste Ausblick: Wenn der Browser den Kontrast selbst bestimmt, entfällt die manuelle Prüfung jeder Farbkombination. Bis das verlässlich verfügbar ist, bleibt die berechnete Variante mit anschließendem Kontrasttest der sichere Weg.

## Verknüpftes Wissen

- [[grundlagen/farben|Farben in CSS]] — verdichtetes Wissen
- [[quellen/wiki-selfhtml|SELFHTML-Wiki]] — Herkunft und Einordnung der Quelle
- [[quellen/artikel/custom-properties-selfhtml|CSS Custom properties (CSS-Variablen) (SELFHTML)]] — die Variablen, auf denen die Ableitung aufsetzt
- [[quellen/artikel/color-mix-funktion|CSS color-mix() Funktion]] — Mischen als Fallback und als eigenes Werkzeug
- [[quellen/artikel/farben-in-der-praxis|CSS Farben in der Praxis – von Hexadezimal bis oklch()]] — Notationen und Wertebereiche
- [[grundlagen/berechnungen|CSS calc()]] — die Rechenvorschrift in den Kanälen
- [[quellen/artikel/farbrechner|Farbrechner – OKLCH, HSL, HSV, RGB und Hex umrechnen]] — Werte praktisch ermitteln

## Offene Fragen

- Browsersupport von `contrast-color()` — nicht geprüft.
- Stimmt der genannte Polyfill? Der Name deutet auf etwas anderes hin.
- Die Vergleichstafel zur Interpolationswirkung ist laut Seite „in Arbeit" und enthält keine Ergebnisse.
- Nach welchem Kriterium wählt `contrast-color()` — WCAG-Kontrastverhältnis oder APCA? Steht nicht in der Quelle.
