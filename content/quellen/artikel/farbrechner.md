---
type: page
status: active
publish: true
title: "Farbrechner – OKLCH, HSL, HSV, RGB und Hex umrechnen"
description: "Quellennotiz zu einem MediaEvent-Beitrag über Farbumrechnung und den Unterschied zwischen HSL und HSB/HSV."
authors:
  - "U. Häßler"
publisher: "MediaEvent"
source_published: "2023-03-25"
url: "https://www.mediaevent.de/css/farbrechner.html"
archive_url:
source_kind: secondary
---

# Farbrechner – OKLCH, HSL, HSV, RGB und Hex umrechnen

## Quelle / bibliografische Angaben

Seite von mediaevent.de mit einem interaktiven Farbrechner (OKLCH-Farbrad, Umrechnung zwischen OKLCH, HSL, HSV, RGB und Hex) und begleitendem Erklärtext.

- Autor laut Clip-Metadaten: U. Häßler
- Stand laut Seite: 2023-03-25
- URL: <https://www.mediaevent.de/css/farbrechner.html>, abgerufen 2026-09-03
- Erfasst über den Obsidian Web Clipper. **Der eigentliche Nutzwert der Seite — der interaktive Rechner — ist im Clip nicht enthalten**, nur der erklärende Text und die abgedruckten Palettenwerte. Als Werkzeug ist die Live-Seite aufzurufen.

## Kurzfassung

Behandelt zwei Dinge: den praktischen Umgang mit dem OKLCH-Farbrad zum Bauen harmonischer Paletten und — wichtiger — die dauerhafte Verwechslungsfalle zwischen HSL (CSS) und HSB/HSV (Bildbearbeitung).

## Kernaussagen

### HSL ist nicht HSB/HSV

- Das W3C hat sich für **HSL** entschieden, Photoshop und viele Color Picker arbeiten mit **HSB** (auch HSV genannt).
- Beide teilen den Farbton, aber nicht Sättigung und Helligkeit. Wer HSB-Werte aus Photoshop unverändert als HSL ins CSS überträgt, bekommt denselben Farbton bei falscher Sättigung und falscher Helligkeit.
- Beispiel der Seite: HSB (300, 18 %, 78 %) entspricht HSL (300, 24 %, 71 %) — nicht HSL (300, 18 %, 78 %).
- Der macOS-Color-Picker nutzt laut Seite HSB, sagt es aber nicht dazu; jQuery-Color-Picker meist ebenso.
- Der Autor argumentiert, HSL trenne Sättigung und Helligkeit besser, hält es aber selbst für einen Kompromiss aus den 1990ern: technisch eine einfache Transformation von RGB, dessen Helligkeiten dem menschlichen Sehen nicht entsprechen.

### OKLCH

- CSS Color 4/5 hat OKLCH ergänzt. Das L basiert auf wahrgenommener Helligkeit; bei L = 50 % wirken alle Farben ähnlich hell, Verläufe werden gleichmäßiger.
- Grobe Hue-Orientierung laut Seite: 0–30 Rot, ab 30 Orange, bis 60 Gelb, 60–150 Grün, bis 270 Blau, darüber Violett und Purpur.
- Höheres L hellt auf, höheres C ergibt reinere, intensivere Farben.
- Farben außerhalb von sRGB werden geclippt; die Seite zeigt dazu eine Warnung — analog zur Farbumfangwarnung in Photoshop.

### Paletten bauen

- Vorgehen: Grundfarbe wählen, Helligkeit über den Lightness-Slider regeln, drei oder mehr Farben mit gleicher Sättigung und Helligkeit ergeben eine harmonische Palette.
- Abgedruckt sind eine Light- und eine Dark-Mode-Palette (Rosa, Pfirsich, Türkis plus Neutrale), gesteuert über Custom Properties und `[data-theme="dark"]`.
- Faustregel der Seite: Light Mode L ≈ 0.7–0.9, Dark Mode L ≈ 0.4–0.6, und im Dark Mode die Sättigung leicht anheben, damit die Farben lebendig bleiben.

## Eigene Einordnung

Der HSL/HSB-Abschnitt ist der Teil, der hängen bleiben sollte. Die Verwechslung ist ein klassischer Übergabefehler zwischen Design und Umsetzung: Werte aus dem Farbwähler wandern ungeprüft ins Stylesheet, das Ergebnis ist „irgendwie nicht die Farbe" und niemand findet den Grund. Merksatz: **Aus einem Bildbearbeitungsprogramm nie HSB-Zahlen ins CSS übertragen, sondern Hex oder RGB nehmen — oder gleich in OKLCH arbeiten.**

Die Dark-Mode-Faustregel (L absenken, C leicht anheben) ist eine brauchbare Ausgangsheuristik und deckt sich mit der Erfahrung, dass unveränderte Sättigung auf dunklem Grund flau wirkt. Belegt ist sie nicht, sie steht als Empfehlung des Autors.

Zwei Einschränkungen:

- Der Text ist erkennbar um den Rechner herumgeschrieben und schlecht lektoriert (Tippfehler, „HLV / HLB", ein widersprüchlicher Satz zu CIELAB). Inhaltlich fiel mir nichts Falsches auf, die Sorgfalt ist aber niedriger als bei [[quellen/artikel/relative-farbangaben|Relative Farbangaben (SELFHTML)]].
- Die Palettenwerte sind Beispiele, keine geprüften Kontrastpaare. Ob `Text: oklch(0.35 0.03 260)` auf `Background: oklch(0.95 0.02 90)` die WCAG-Kontrastanforderungen erfüllt, ist hier nicht nachgerechnet.

Als Werkzeug ist die Live-Seite trotzdem nützlich, gerade weil sie OKLCH und HSV nebeneinander stellt — genau die Brücke, die beim Wechsel zwischen Affinity/Photoshop und CSS gebraucht wird.

## Verknüpftes Wissen

- [[grundlagen/farben|Farben in CSS]] — verdichtetes Wissen
- [[quellen/artikel/relative-farbangaben|Relative Farbangaben (SELFHTML)]] — Paletten rechnen statt ablesen
- [[quellen/artikel/farben-in-der-praxis|CSS Farben in der Praxis – von Hexadezimal bis oklch()]] — Notationen und Wertebereiche
- [[grundlagen/variablen|CSS Custom Properties]] — Träger der Palettenwerte
- [[quellen/mediaevent-de|MediaEvent]] — Herkunft und Einordnung der Quelle

## Offene Fragen

- Die Umrechnungsgenauigkeit des Rechners ist nicht geprüft.
- Ob die abgedruckten Paletten die Kontrastanforderungen erfüllen, sagt die Seite nicht.
