---
type: page
status: active
publish: true
title: "Styling SVG use Content with CSS (Sara Soueidan)"
description: "Quellennotiz zu Sara Soueidans Codrops-Artikel von 2015: Kaskade bei Präsentationsattributen, inherit, currentColor und Custom Properties für <use>."
authors: 
  - "Sara Soueidan"
publisher: "Codrops"
source_published: "2015-07-16"
url: "https://tympanus.net/codrops/2015/07/16/styling-svg-use-content-css/"
archive_url:
source_kind: secondary
---

# Styling SVG use Content with CSS (Sara Soueidan)

## Quelle / bibliografische Angaben

Sara Soueidan: „Styling SVG `<use>` Content with CSS“, Codrops. Dateiname ohne spitze Klammern.

- Veröffentlicht: 2015-07-16 (Datum aus der URL, Bilder-Pfade von 07/2015)
- URL: <https://tympanus.net/codrops/2015/07/16/styling-svg-use-content-css/>, abgerufen 2026-10-18 (über Firecrawl)
- Ausgewertet: ganzer Text; die Live-Demos nicht

## Kurzfassung

Ausführliche Erklärung, warum Inhalte von `<use>` schwer zu stylen sind, und vier Auswege.

## Kernaussagen

- `<g>` gruppiert, `<defs>` definiert Unsichtbares, `<symbol>` ist eine Vorlage mit eigener `viewBox`, `<use>` setzt sie ein.
- Der Inhalt von `<use>` ist ein Klon im Shadow DOM. **CSS-Selektoren von außen erreichen ihn nicht**, nur Vererbung vom `<use>`-Element.
- **Präsentationsattribute** (`fill="…"` usw.) zählen in der Kaskade wie ein Autoren-Stylesheet mit niedrigstem Rang. Jede CSS-Regel schlägt sie, auch eine externe. Sie schlagen nur vererbte Werte.
- Präsentationsattribute im Original sollte man nicht entfernen: Sie sind ein guter Fallback, falls das CSS nicht lädt.
- Mit `fill: inherit` im CSS zwingt man das Original, die Farbe vom `<use>` zu übernehmen.
- **Zwei Farben:** Ein Teil bekommt `fill="currentColor"`, ein anderer gar kein `fill`. Dann steuert man am `<use>` die eine Farbe mit `fill` und die andere mit `color`.
- **Custom Properties** dringen in den Klon ein, weil sie vererbt werden. Mit `fill: var(--farbe, #fallback)` bleiben Fallbacks erhalten.
- Zum Zeitpunkt des Artikels konnte nur Firefox Custom Properties.

## Eigene Einordnung

Der Artikel ist von 2015. Custom Properties sind heute in allen Browsern verfügbar, `xlink:href` ist durch `href` ersetzt. Die Aussagen zur Kaskade gelten weiter, in Chrome 155 nachgeprüft (2026-10-18): CSS schlägt `fill="red"` sogar mit `:where()` und Spezifität 0.

## Verknüpftes Wissen

- [[svg/svg-gestalten|SVG mit CSS gestalten]]
- [[svg/svg-icons|SVG-Icons barrierefrei einbinden]]

## Offene Fragen

- Keine.
