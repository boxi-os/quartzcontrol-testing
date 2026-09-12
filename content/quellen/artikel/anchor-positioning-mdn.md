---
type: page
status: active
publish: true
title: "Using CSS anchor positioning (MDN)"
description: "Quellennotiz zum MDN-Leitfaden für CSS Anchor Positioning: Verknüpfung, anchor(), position-area, anchor-center, anchor-size() und anchor-scope."
authors: []
publisher: "MDN Web Docs"
source_published:
url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Anchor_positioning/Using"
archive_url:
source_kind: secondary
---

# Using CSS anchor positioning (MDN)

## Quelle / bibliografische Angaben

MDN-Leitfaden „Using CSS anchor positioning“, englische Fassung.

- Stand laut Seite: „last modified on Jul 13, 2026“
- URL: <https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Anchor_positioning/Using>, abgerufen 2026-09-12 (über Firecrawl), vollständig ausgewertet 2026-09-13
- Die Seite trägt im erfassten Text kein Baseline-Kennzeichen
- Fallback-Positionen (`position-try-fallbacks`) und `position-visibility` behandelt MDN in einem eigenen Leitfaden, der hier nicht ausgewertet ist

## Kurzfassung

Ein Element („positioniertes Element“) wird an einem anderen Element („Anker“) ausgerichtet statt am Viewport oder einem positionierten Vorfahren – und folgt ihm, wenn es sich verschiebt, etwa beim Scrollen. Zwei Schritte: **verknüpfen** und **positionieren**.

## Kernaussagen

### Anwendungsfälle

Fehlermeldungen neben Formularfeldern, Tooltips und Infoboxen, Einstellungsdialoge an einem Bedienelement, Dropdown- und Popover-Menüs an einer Navigationsleiste oder einem Button. Bisher brauchte das JavaScript, mit Komplexität und Performancekosten.

### Verknüpfen

- **Explizit:** Anker bekommt `anchor-name: --name` (ein `<dashed-ident>`). Das positionierte Element braucht `position: absolute` oder `fixed` und `position-anchor: --name`.
- **Implizit** – ohne `anchor-name`/`position-anchor`:
  - Popover mit Steuerelement über `popovertarget` + `id` oder `commandfor` + `id`,
  - Popover-Aktion wie `showPopover()` mit der Option `source`,
  - anpassbares `<select>` (`appearance: base-select`) und seine Auswahlliste.
- Verknüpfen allein **bindet noch nicht** – die Position kommt erst über CSS.
- **Lösen:** `anchor-name: none` oder `position-anchor: none` bzw. einen nicht existierenden Namen. Implizite Verknüpfungen lassen sich nur über `position-anchor` lösen.
- **Mehrfache Namen:** Tragen mehrere Anker denselben Namen, gilt der **letzte** in der Quelltext-Reihenfolge. `anchor-scope` (`all`, eine Namensliste oder `none`) begrenzt die Sichtbarkeit eines Namens auf einen Teilbaum – nötig bei wiederholten Komponenten.

### Positionieren

- Voraussetzung: Der Anker ist sichtbar. Mit `display: none` fällt das positionierte Element auf seinen nächsten positionierten Vorfahren zurück.
- **`anchor()` in Inset-Eigenschaften:** `anchor(<anchor-name> <anchor-side>, <fallback>)`. Ohne Namen gilt der Standardanker. Seiten physisch (`top`, `left`), logisch (`start`, `self-end`), `center` oder als Prozentwert. Unpassende Seite, fehlender Anker oder fehlende absolute/fixe Positionierung → Fallback-Wert. Ergebnis ist eine Länge, also in `calc()` nutzbar, z. B. `inset-block-end: calc(anchor(start) + 10px)`.
- **`position-area`:** 3×3-Raster, der Anker ist die Mitte. Werte physisch (`top`, `bottom`, `left`, `right`, `center`), logisch (`start`, `end`) oder als Koordinaten (`x-start`, `y-end`); zwei Werte für eine Zelle, `span-*` für zwei oder drei Zellen. Ein einzelner physischer Wert wirkt wie `… span-all`, ein einzelner logischer wie doppelt gesetzt. **Logische und physische Werte zu mischen macht die Deklaration ungültig.**
- **Breite bei `position-area`:** Ohne feste Größe verhält sich das Element wie `width: max-content`, begrenzt durch den Viewport. Bei einer mittig ausgerichteten Zelle wie `bottom center` entspricht die Breite der des Ankers.
- **`anchor-center`:** neuer Wert für `justify-self`, `align-self`, `justify-items`, `align-items` (und Kurzschreibweisen) – zentriert auf den Standardanker, wenn mit Inset-Eigenschaften statt `position-area` positioniert wird. Beispiel: `top: calc(anchor(bottom) + 5px); justify-self: anchor-center;`.
- **`anchor-size()`:** Größe relativ zur Ankergröße in `width`, `height`, `min-/max-*`, `block-size`, `inline-size`; Dimension `width`, `height`, `inline`, `block`, `self-inline`, `self-block`; Fallback-Wert möglich. Auch in Inset- und Margin-Eigenschaften nutzbar – dort folgt das Element aber nicht der Ankerposition, sondern bleibt normal absolut/fix positioniert.

## Eigene Einordnung

Klar aufgebauter Leitfaden. Für Navigationen sind drei Punkte entscheidend:

- Die **implizite Verknüpfung** über `popovertarget` bzw. `commandfor` macht Dropdowns ohne Namen möglich. In Chrome 152 getestet: Mit Button oder `source` sitzt das Popover am Anker, mit `showPopover()` ohne `source` nicht.
- **`anchor-scope`** löst das Problem wiederholter Komponenten mit gleichem Ankernamen.
- **Physisch und logisch nicht mischen** – `bottom span-right` ist gültig, `block-end span-right` nicht.

**Browserstand laut `web-features` 3.38.0:** `anchor-name`, `position-area`, `anchor()`, `anchor-center`, `anchor-size()`, `anchor-scope` und `position-try-order` sind in Chrome/Edge (125–132), Firefox (147/148) und Safari (26) verfügbar; `anchor-name` ist seit 2026-01-13 Baseline *newly available*. Das Gesamtfeature steht trotzdem auf *limited*, weil der Eintrag `css.properties.position-anchor` Chrome und Firefox erst ab 151 und Safari gar nicht führt. Derselbe Datensatz führt `position-anchor` als Deskriptor von `@position-try` aber schon ab Chrome 125 und Safari 26. Der Eintrag bildet also offenbar eine spätere Änderung der Eigenschaft ab (Chrome listet ihn erst ab 151, obwohl es `position-anchor` seit 125 kennt), nicht die Grundfunktion. Welche Änderung das ist, ist nicht geklärt.

## Verknüpftes Wissen

- [[navigation/dropdown-navigation|Dropdown-Navigation mit Disclosure-Buttons bauen]]
- [[navigation/top-layer|Top Layer mit popover und dialog]]
- [[quellen/artikel/popover-api-mdn|Using the Popover API (MDN)]]

## Offene Fragen

- Welche Änderung an `position-anchor` der `web-features`-Eintrag ab Chrome/Firefox 151 abbildet und ob Safari sie nachzieht.
- Fallback-Positionen und `position-visibility` sind nicht ausgewertet.
