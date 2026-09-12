---
type: page
status: active
publish: true
title: "CSS Farben in der Praxis – von Hexadezimal bis oklch()"
description: "Quellennotiz zu einem kulturbanause-Artikel über CSS-Farbnotationen von Hexadezimal bis oklch()."
authors:
  - "Charleen Warkentin"
publisher: "Agentur kulturbanause"
source_published: "2025-09-24"
url: "https://kulturbanause.de/blog/css-farben-in-der-praxis-von-hexadezimal-bis-oklch/"
archive_url:
source_kind: secondary
---

# CSS Farben in der Praxis – von Hexadezimal bis oklch()

## Quelle / bibliografische Angaben

Blogartikel der Agentur kulturbanause, Überblick über die Farbnotationen in CSS.

- Autorin laut Frontmatter des Clips: Charleen Warkentin. Die Byline auf der Seite nennt zwei Vornamen („Jonas", „Charleen"); der zweite Name ist nicht mit Nachnamen belegt und hier nicht ergänzt.
- Stand laut Seite: „Aktualisiert am 24. September 2025"
- URL: <https://kulturbanause.de/blog/css-farben-in-der-praxis-von-hexadezimal-bis-oklch/>, abgerufen 2026-09-02
- Erfasst über den Obsidian Web Clipper; ausgewertet wurde der geclippte Text, nicht die Live-Seite.

## Kurzfassung

Durchgang durch alle gebräuchlichen CSS-Farbnotationen, von den 140 vordefinierten Farbnamen über Hex, `rgb()`/`rgba()` und `hsl()`/`hsla()` bis zu den wahrnehmungsbasierten Modellen `lab()`, `lch()` und `oklch()`. Die Auswahl soll sich nach Anwendungsfall und Browser-Kompatibilität richten; für neue Projekte empfiehlt der Artikel `oklch()`.

## Kernaussagen

### Farbnamen

140 vordefinierte Namen, von allen Browsern unterstützt, keine Anpassung von Transparenz oder Helligkeit möglich. Für schnelle Prototypen oder Anfänger geeignet.

### Hexadezimal

Sechs Zeichen in drei Paaren für Rot, Grün, Blau, je `00`–`FF` (256 Stufen). Kurzform mit drei Zeichen, wenn alle Paare doppelt vorkommen (`#FFCC00` → `#FC0`). Ein viertes Paar ergänzt den Alphakanal (`#FF000080` = 50 % transparentes Rot).

### rgb() / rgba()

Drei Kanäle mit Werten `0`–`255` oder alternativ in Prozent (`100%` entspricht `255`). `rgba()` ergänzt den Alphawert zwischen `0` und `1`. Vorteil gegenüber Hex laut Artikel: Werte lassen sich ohne Umrechnung anpassen.

### hsl() / hsla()

Hue als Winkel `0`–`360` (ohne Gradzeichen), Saturation und Lightness in Prozent. Bei `L: 100%` ist die Farbe immer weiß, bei `0%` immer schwarz, unabhängig von Hue und Sättigung. Ohne Sättigung ist der Farbton irrelevant (`hsl(0, 0%, 50%)` = mittleres Grau). Laut Artikel gut geeignet für dynamische Farbvariationen.

### lab()

Geräteunabhängiger Farbraum. `L` = Helligkeit, `a` = Grün-Magenta-Achse, `b` = Blau-Gelb-Achse, jeweils von `-128` bis `+127`. Der Helligkeitswert ist unabhängig von den Farbachsen.

### lch()

Auf LAB aufbauend, aber mit intuitiveren Parametern: `L` in Prozent (`0%` schwarz bis `100%` weiß), `C` (Chroma/Sättigung) von `0` bis etwa `130`, `H` (Hue) als Winkel `0`–`360`. Chroma-Werte über `100` sind nur in erweiterten Farbräumen wie Display P3 darstellbar und werden in sRGB auf den nächstmöglichen Wert reduziert.

### oklch()

Notation auf Basis von OKLab, laut Artikel speziell für Displays optimiert: gleichmäßigere Farbverläufe, konstantere Helligkeitswiedergabe, bessere Kontraste. Abweichende Wertebereiche gegenüber `lch()`:

- `L` als Dezimalzahl zwischen `0` und `1`
- `C` zwischen `0` und rund `0.4`
- `H` als Winkel `0`–`360`

Alle Farben mit gleichem `L` erscheinen visuell gleich hell — das ist der praktische Hauptvorteil für Farbpaletten. Prognose des Artikels: `oklch()` wird künftig Standard im Webdesign.

## Eigene Einordnung

Sauberer Überblicksartikel mit korrekten Wertebereichen; als Nachschlagewerk brauchbar. Einordnungen und Einschränkungen:

- Die moderne, kommaslose Schreibweise von `rgb()` und `hsl()` (`rgb(255 0 0 / 50%)`) fehlt. `rgba()` und `hsla()` sind heute nur noch Aliase; `rgb()` und `hsl()` nehmen den Alphawert selbst entgegen. Nicht am Spezifikationstext gegengeprüft.
- Der Artikel nennt keine konkreten Browser-Support-Daten für `lab()`, `lch()` und `oklch()`, argumentiert aber, sie seien „von allen moderneren Browsern" unterstützt. Nicht verifiziert.
- Der Hinweis, dass Chroma-Werte außerhalb von sRGB „auf den nächstkleineren darstellbaren Wert reduziert" werden, ist eine Vereinfachung; das konkrete Gamut-Mapping ist browserabhängig.

Verdichtetes Wissen steht in [[grundlagen/farben|Farben in CSS]].

## Verknüpftes Wissen

- [[grundlagen/farben|Farben in CSS]]
- [[quellen/artikel/color-mix-funktion|CSS color-mix() Funktion]]

## Offene Fragen

- Ab welchem Chroma-Wert Farben in der Praxis sichtbar auf sRGB zurückfallen, ist im Artikel nicht quantifiziert.
- Der Artikel verlinkt weitere kulturbanause-Beiträge zu Farbmodellen, Farbräumen und CSS-Variablen-Farbsystemen. Diese sind hier nicht ausgewertet.
