---
type: page
status: active
publish: true
title: "Akkordeon mit details bauen"
description: "Ein Akkordeon ohne JavaScript aus details und summary bauen, exklusiv per name-Attribut, gestylt und animiert über ::details-content."
applies_to:
  - "Baseline-Angaben nach web-features 3.38.0, Stand 2026-09-12"
  - "Beispiele getestet in Chrome 152"
  - "Test-Hinweise nach jsdom 25.0.1"
---
# Akkordeon mit details bauen

## Ziel

Ein Akkordeon, also mehrere Abschnitte zum Auf- und Zuklappen, das ganz ohne JavaScript funktioniert. Auf Wunsch **exklusiv** (immer nur ein Abschnitt offen) und mit weichem Auf- und Zuklappen.

## Voraussetzungen

- Keine für das Grundakkordeon.
- Exklusiv: `name` an `details` (seit 2024-09-03 Baseline *newly available*).
- Styling des Inhalts: `::details-content` (seit 2025-09-16 Baseline *newly available*).

## Getestet mit / Stand

Stand 2026-09-12. **Am 2026-09-13 in Chrome 152 (macOS) getestet:** Bei mehreren `open` in einer Gruppe ist nur das erste offen, `name` schließt den vorigen Abschnitt, `Enter` auf `summary` öffnet per Tastatur, die Höhe klappt in beide Richtungen animiert, und der eigene Marker ersetzt den Standardpfeil. **Am 2026-10-18 in Chrome 155 ergänzt:** `toggle` beim Laden und die Gruppenbildung über verschiedene Elternelemente (siehe Fallstricke). **Nicht getestet:** Firefox, Safari, Screenreader. Grundlage sind die MDN-Referenzen und ein Chrome-Artikel. Die Animation des Inhalts funktioniert laut `web-features` 3.38.0 nicht in Firefox, die Höhenanimation nur in Chromium.

## Vorgehen

1. **Abschnitte als `details` mit `summary`:**[^mdn-details]

   ```html
   <div class="accordion">
     <details name="faq">
       <summary>Wie lange dauert die Lieferung?</summary>
       <p>In der Regel zwei bis drei Werktage.</p>
     </details>
     <details name="faq">
       <summary>Kann ich zurückgeben?</summary>
       <p>Innerhalb von 30 Tagen.</p>
     </details>
     <details name="faq">
       <summary>Welche Zahlungsarten gibt es?</summary>
       <p>Rechnung, Karte, Überweisung.</p>
     </details>
   </div>
   ```

2. **Mit gleichem `name` exklusiv machen.** Öffnet man einen Abschnitt, schließt sich der zuvor offene.[^mdn-details][^chrome] Ohne `name` können beliebig viele gleichzeitig offen sein.

3. **Einen Abschnitt von Anfang an öffnen** mit `open`. Haben in einer Gruppe mehrere Abschnitte `open`, ist nur der erste im Quelltext offen.[^mdn-details]

4. **Marker gestalten.** `summary` hat `display: list-item`. Den Pfeil kann man über `::marker` gestalten oder durch eigenes Styling ersetzen.[^mdn-details]

   ```css
   .accordion summary {
     list-style: none;
     cursor: pointer;
     padding: 0.75rem 1rem;
   }
   .accordion summary::-webkit-details-marker {
     display: none;
   }
   .accordion summary::after {
     content: "+";
     float: inline-end;
   }
   .accordion details[open] > summary::after {
     content: "–";
   }
   ```

   <a href="beispiele/akkordeon-01-eigener-marker.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

   `list-style: none` und der `-webkit-`-Pseudoselektor stammen nicht aus den ausgewerteten Quellen, sondern sind der übliche Weg, den Standardpfeil zu entfernen. `::marker` ist laut `web-features` 3.38.0 *limited* (Chrome 86, Firefox 68, Safari fehlt). Deshalb ersetzt man den Pfeil besser wie oben durch ein eigenes `::after`, statt `::marker` zu stylen. Ob der WebKit-Selektor noch nötig ist, habe ich nicht geprüft.

5. **Inhalt stylen** über `::details-content`:[^mdn-content]

   ```css
   .accordion details::details-content {
     padding-inline: 1rem;
   }
   ```

   <a href="beispiele/akkordeon-02-inhalt-stylen.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

6. **Ein- und Ausblenden animieren**: Deckkraft plus `content-visibility` mit `allow-discrete`, nach MDN:[^mdn-content]

   ```css
   @media (prefers-reduced-motion: no-preference) {
     .accordion details::details-content {
       opacity: 0;
       transition:
         opacity 300ms,
         content-visibility 300ms allow-discrete;
     }
     .accordion details[open]::details-content {
       opacity: 1;
     }
   }
   ```

   <a href="beispiele/akkordeon-03-einblenden.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

7. **Optional die Höhe mitanimieren** (nur Chromium):

   ```css
   @supports (interpolate-size: allow-keywords) {
     .accordion {
       interpolate-size: allow-keywords;
     }

     @media (prefers-reduced-motion: no-preference) {
       .accordion details::details-content {
         block-size: 0;
         overflow-y: clip;
         transition:
           block-size 300ms ease,
           opacity 300ms,
           content-visibility 300ms allow-discrete;
       }
       .accordion details[open]::details-content {
         block-size: auto;
       }
     }
   }
   ```

   <a href="beispiele/akkordeon-04-hoehe.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

   Laut dem Chrome-Artikel zu `height: auto` braucht man für beide Richtungen `interpolate-size` und `::details-content` zusammen. Den genauen Code dafür enthält der ausgewertete Text nicht.[^height-auto] Das Beispiel habe ich selbst gebaut und in Chrome 152 getestet.

## Warum funktioniert das?

- `details` ist ein natives Disclosure-Widget: Zustand, Tastaturbedienung und Ansage bringt das Element selbst mit.[^mdn-details] Dass `summary` per Tastatur bedienbar ist und als aufklappbar angesagt wird, steht in den ausgewerteten Abschnitten nicht ausdrücklich. Die Tastaturbedienung ist in Chrome 152 bestätigt (`Enter` öffnet), die Ansage im Screenreader habe ich nicht geprüft.
- `name` bildet eine Gruppe. Die Elemente müssen dafür keine Geschwister sein, es zählt nur der gleiche Wert.[^chrome]
- Beim Auf- und Zuklappen schaltet der Browser `content-visibility` des Inhalts zwischen `hidden` und `visible` um. Mit `allow-discrete` wartet diese Umschaltung beim Schließen, bis die Transition fertig ist. So sieht man das Ausblenden.[^mdn-content]
- `interpolate-size: allow-keywords` erlaubt Übergänge von `0` zu `auto` und wird vererbt.[^height-auto]

## Fallstricke

- **Gleicher `name` an anderer Stelle:** Weil `details` mit gleichem Namen überall auf der Seite eine Gruppe bilden, schließt ein FAQ-Abschnitt womöglich einen gleichnamigen Abschnitt in einer ganz anderen Komponente. Deshalb eindeutige Namen wählen. In Chrome 155 bestätigt: Ein `details` in einer `section` und eines in einem `aside` mit gleichem `name` schließen sich gegenseitig.
- **Exklusiv ist nicht immer besser:** Wer zwei Antworten vergleichen will, kann das dann nicht. `name` nur setzen, wenn es keinen Sinn hat, mehrere gleichzeitig zu öffnen (eigene Einschätzung).
- **Firefox:** Dort lässt sich `content-visibility` laut Baseline-Daten nicht per Transition verzögern. Die Abschnitte klappen sofort zu, und auch das Einblenden kann fehlen. Funktion und Inhalt bleiben aber erhalten.
- **Höhe nur in Chromium:** Andere Browser springen. Dank `@supports` hat das keine Nebenwirkungen.
- **Ältere Browser ohne `name`:** Chrome beschreibt ein Polyfill über das `toggle`-Event. In Browsern ohne `toggle` bleibt es ein normales Akkordeon.[^chrome]
- **Mehrfache Toggles:** Bei schnellem Wechsel kann der Browser mehrere `toggle`-Events zu einem zusammenfassen. Das ist nur für eigenes JavaScript wichtig.[^mdn-details]
- **Gemerkten Zustand per Skript wiederherstellen:** Die Exklusivität gilt nicht nur für Klicks. Wird `open` an einem `details` mit `name` gesetzt, auch per Skript, entfernt der Browser `open` beim bisher offenen Element der Gruppe.[^whatwg-details] Stellt ein Skript nach dem Rendern gemerkte offene Abschnitte wieder her, schließt es damit womöglich genau den Abschnitt, den der Server absichtlich geöffnet hat, etwa den mit der aktuellen Seite. Regel aus einem eigenen Quartz-Plugin: Gemerkten Zustand in einer Gruppe nur anwenden, wenn dort noch nichts absichtlich geöffnet ist.
- **Keine Animation beim Laden:** Öffnet ein Skript Abschnitte nach dem Rendern, kann die Transition aus Schritt 6 und 7 sichtbar ablaufen, obwohl niemand geklickt hat. Abhilfe aus demselben Plugin: Die Animation an ein Attribut wie `data-animate` binden, das erst bei der ersten Nutzerinteraktion gesetzt wird (`details[data-animate][open]::details-content …`). Nicht eigens im Browser nachgetestet.
- **`toggle` feuert auch für `details`, die von Anfang an offen sind:** Laut HTML-Standard laufen die Schritte für Attributänderungen auch dann, wenn der Parser das Element mit `open` einfügt. Dabei wird ein `toggle`-Event eingereiht.[^whatwg-details] jsdom 25.0.1 macht das genauso: Es reiht `toggle` per `setTimeout` ein, sobald `open` gesetzt wird, auch beim Parsen.[^jsdom] Ein `toggle`-Listener, der Zustand speichert, läuft also schon beim Laden, in Tests wie im Browser. In Chrome 155 bestätigt: Für ein `details` mit `open` im HTML kam beim Laden ein `toggle` mit `newState: "open"`.
- **Exklusivität in jsdom-Tests:** jsdom 25.0.1 wertet das `name`-Attribut von `details` nicht aus.[^jsdom] Ein Fehler wie beim Wiederherstellen oben lässt sich dort nicht nachstellen, nur im echten Browser.

### Browsersupport

| Feature | Stand |
| --- | --- |
| `details`, `summary` | Baseline *widely available* |
| `name` (exklusives Akkordeon) | Baseline *newly available* seit 2024-09-03 (Chrome 120, Firefox 130, Safari 17.2) |
| `::details-content` | Baseline *newly available* seit 2025-09-16 (Chrome 131, Firefox 143, Safari 18.4) |
| `content-visibility` transitionieren | *limited*: Chrome 117, Safari 18, **Firefox fehlt** |
| `interpolate-size` | *limited*: nur Chromium ab 129 |

Quelle: `web-features` 3.38.0 (Baseline-Daten der W3C WebDX Community Group), lokal abgefragt am 2026-09-12.

## Siehe auch

- [[animation/ein-und-ausblenden|Ein- und Ausblenden mit CSS animieren]]
- [[navigation/top-layer|Top Layer mit popover und dialog]]
- [[animation/barrierearme-animationen|Barrierearme Animationen]]

## Quellen

- [[quellen/artikel/details-element-mdn|details-Element (MDN)]] — Aufbau, `name`, `open`, Marker, `toggle`
- [[quellen/artikel/details-content-mdn|details-content Pseudo-Element (MDN)]] — Styling und Transition des Inhalts
- [[quellen/artikel/exclusive-accordion-chrome|Exclusive Accordion (Chrome for Developers)]] — exklusive Gruppen, Polyfill
- [[quellen/artikel/height-auto-chrome|Animate to height auto (Chrome for Developers)]] — `interpolate-size`, `details`-Animation
- HTML Living Standard, Abschnitt zum `details`-Element (siehe Fußnote) — Exklusivität bei gesetztem `open`, `toggle` beim Parsen
- jsdom 25.0.1, Quelltext `HTMLDetailsElement-impl.js` (siehe Fußnote) — `toggle` in Tests, fehlende Exklusivität

Nicht aus den Quellen: das Marker-Styling mit `list-style` und `::-webkit-details-marker`, das Höhenbeispiel in Schritt 7 und die Fallstricke zu Namen und Exklusivität. Das APG-Muster „Accordion“ habe ich nicht ausgewertet. Die Fallstricke zum Wiederherstellen und zu `data-animate` stammen aus einem eigenen Quartz-Plugin, der Mechanismus dahinter ist durch den HTML-Standard belegt.

[^mdn-details]: [[quellen/artikel/details-element-mdn|details-Element (MDN)]].
[^mdn-content]: [[quellen/artikel/details-content-mdn|details-content Pseudo-Element (MDN)]], Abschnitt „Transition example“.
[^chrome]: [[quellen/artikel/exclusive-accordion-chrome|Exclusive Accordion (Chrome for Developers)]].
[^height-auto]: [[quellen/artikel/height-auto-chrome|Animate to height auto (Chrome for Developers)]], Abschnitt „Animate the details element“.
[^whatwg-details]: WHATWG, HTML Living Standard, Abschnitt „The details element“: Attributänderungs-Schritte („ensure details exclusivity by closing other elements if needed“) und Hinweis „these attribute change and insertion steps also run when an attribute or element is inserted via the parser“, <https://html.spec.whatwg.org/multipage/interactive-elements.html#the-details-element>. Abgerufen 2026-09-25.
[^jsdom]: jsdom 25.0.1, `lib/jsdom/living/nodes/HTMLDetailsElement-impl.js` (behandelt nur `open`, nicht `name`) und `lib/jsdom/browser/parser/html.js` (setzt Attribute beim Parsen über dieselbe Änderungslogik). Lokal gelesen am 2026-09-25.
