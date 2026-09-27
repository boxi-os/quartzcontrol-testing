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

Ein Akkordeon – mehrere auf- und zuklappbare Abschnitte –, das ohne JavaScript funktioniert. Optional **exklusiv** (immer nur ein Abschnitt offen) und mit weichem Auf- und Zuklappen.

## Voraussetzungen

- Keine für das Grundakkordeon.
- Exklusiv: `name` an `details` (seit 2024-09-03 Baseline *newly available*).
- Styling des Inhalts: `::details-content` (seit 2025-09-16 Baseline *newly available*).

## Getestet mit / Stand

Stand 2026-09-12. **In Chrome 152 (macOS), 2026-09-13 getestet:** Bei mehreren `open` in einer Gruppe ist nur das erste offen, `name` schließt den vorigen Abschnitt, `Enter` auf `summary` öffnet per Tastatur, die Höhe klappt in beide Richtungen animiert, der eigene Marker ersetzt den Standardpfeil. **Nicht getestet:** Firefox, Safari, Screenreader. Grundlage sind die MDN-Referenzen und ein Chrome-Artikel. Die Animation des Inhalts funktioniert laut `web-features` 3.38.0 nicht in Firefox, die Höhenanimation nur in Chromium.

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

2. **Exklusiv machen mit gleichem `name`.** Öffnen eines Abschnitts schließt den zuvor offenen.[^mdn-details][^chrome] Ohne `name` können beliebig viele gleichzeitig offen sein.

3. **Einen Abschnitt vorab öffnen** mit `open`. Haben in einer Gruppe mehrere `open`, ist nur der erste in der Quelltext-Reihenfolge offen.[^mdn-details]

4. **Marker gestalten.** `summary` hat `display: list-item`; der Pfeil lässt sich über `::marker` oder durch eigenes Styling ersetzen.[^mdn-details]

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

   `list-style: none` und der `-webkit-`-Pseudoselektor sind nicht aus den ausgewerteten Quellen, sondern verbreitete Praxis, um den Standardpfeil zu entfernen. `::marker` ist laut `web-features` 3.38.0 *limited* (Chrome 86, Firefox 68, Safari fehlt) – das spricht dafür, den Pfeil wie oben durch ein eigenes `::after` zu ersetzen, statt `::marker` zu stylen. Ob der WebKit-Selektor noch nötig ist, ist nicht geprüft.

5. **Inhalt stylen** über `::details-content`:[^mdn-content]

   ```css
   .accordion details::details-content {
     padding-inline: 1rem;
   }
   ```

   <a href="beispiele/akkordeon-02-inhalt-stylen.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

6. **Ein- und Ausblenden animieren** – Deckkraft plus `content-visibility` mit `allow-discrete`, nach MDN:[^mdn-content]

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

7. **Optional: Höhe mitanimieren** – nur Chromium:

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

   Dem Chrome-Artikel zu `height: auto` zufolge braucht es für beide Richtungen die Kombination aus `interpolate-size` und `::details-content`; den genauen Code dafür enthält der ausgewertete Text nicht.[^height-auto] Das Beispiel ist eigene Konstruktion und in Chrome 152 getestet.

## Warum funktioniert das?

- `details` ist ein natives Disclosure-Widget: Zustand, Tastaturbedienung und Ansage bringt das Element mit.[^mdn-details] Dass `summary` per Tastatur bedienbar ist und als aufklappbar angesagt wird, steht in den ausgewerteten Abschnitten nicht ausdrücklich. Die Tastaturbedienung ist in Chrome 152 bestätigt (`Enter` öffnet), die Ansage im Screenreader nicht geprüft.
- `name` bildet eine semantische Gruppe. Die Elemente müssen dafür keine Geschwister sein; allein der gleiche Wert zählt.[^chrome]
- Beim Auf- und Zuklappen schaltet der Browser `content-visibility` des Inhalts zwischen `hidden` und `visible`. Mit `allow-discrete` wartet dieser Wechsel beim Schließen das Ende der Transition ab, sodass das Ausblenden sichtbar bleibt.[^mdn-content]
- `interpolate-size: allow-keywords` erlaubt die Interpolation von `0` zu `auto` und wird vererbt.[^height-auto]

## Fallstricke

- **Gleicher `name` an anderer Stelle:** Da verstreute `details` mit gleichem Namen eine Gruppe bilden, schließt ein FAQ-Abschnitt womöglich einen gleichnamigen Abschnitt in einer anderen Komponente. Namen eindeutig wählen – abgeleitet, nicht getestet.
- **Exklusiv ist nicht immer besser:** Wer zwei Antworten vergleichen will, kann es nicht. `name` nur setzen, wenn gleichzeitiges Öffnen keinen Sinn hat – eigene Einschätzung.
- **Firefox:** `content-visibility` lässt sich dort laut Baseline-Daten nicht per Transition verzögern. Abschnitte klappen sofort zu; das Einblenden kann ebenfalls fehlen. Funktion und Inhalt bleiben unberührt.
- **Höhe nur in Chromium:** Andere Browser springen. Durch `@supports` bleibt das ohne Nebenwirkung.
- **Ältere Browser ohne `name`:** Chrome beschreibt ein Polyfill über das `toggle`-Event; Browser ohne `toggle` bleiben ein normales Akkordeon.[^chrome]
- **Mehrfach-Toggles:** Das `toggle`-Event kann bei schnellen Wechseln zusammengefasst werden – relevant nur für eigenes JavaScript.[^mdn-details]
- **Gemerkten Zustand per Skript wiederherstellen:** Die Exklusivität gilt nicht nur für Klicks. Wird `open` an einem `details` mit `name` gesetzt – auch per Skript –, entfernt der Browser `open` beim bisher offenen Element der Gruppe.[^whatwg-details] Stellt ein Skript nach dem Rendern gemerkte offene Abschnitte wieder her, schließt es damit womöglich genau den Abschnitt, den der Server absichtlich geöffnet hat, etwa den mit der aktuellen Seite. Regel aus einem eigenen Quartz-Plugin: Gemerkten Zustand in einer Gruppe nur anwenden, wenn dort noch nichts absichtlich geöffnet ist.
- **Keine Öffnungsanimation beim Laden:** Öffnet ein Skript Abschnitte nach dem Rendern, kann die Transition aus Schritt 6 und 7 sichtbar anlaufen, obwohl niemand geklickt hat. Abhilfe aus demselben Plugin: Die Animation an ein Attribut wie `data-animate` binden, das erst bei der ersten Nutzerinteraktion gesetzt wird (`details[data-animate][open]::details-content …`). Nicht separat im Browser nachgetestet.
- **`toggle` feuert auch für von Anfang an offene `details`:** Laut HTML-Standard laufen die Attributänderungs-Schritte auch, wenn der Parser das Element mit `open` einfügt; dabei wird ein `toggle`-Event eingereiht.[^whatwg-details] jsdom 25.0.1 macht das genauso: Es reiht `toggle` per `setTimeout` ein, sobald `open` gesetzt wird, auch beim Parsen.[^jsdom] Ein `toggle`-Listener, der Zustand speichert, läuft also schon beim Laden – in Tests wie im Browser. Das Browserverhalten ist aus dem Standard abgeleitet, nicht getestet.
- **Exklusivität in jsdom-Tests:** jsdom 25.0.1 wertet das `name`-Attribut von `details` nicht aus.[^jsdom] Ein Fehler wie beim Wiederherstellen oben lässt sich dort nicht nachstellen, sondern nur im echten Browser.

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

Nicht aus den Quellen: das Marker-Styling mit `list-style` und `::-webkit-details-marker`, das Höhenbeispiel in Schritt 7 und die Fallstricke zu Namen und Exklusivität. Das APG-Muster „Accordion“ wurde nicht ausgewertet. Die Fallstricke zum Wiederherstellen und zu `data-animate` stammen aus einem eigenen Quartz-Plugin; der Mechanismus dahinter ist am HTML-Standard belegt.

[^mdn-details]: [[quellen/artikel/details-element-mdn|details-Element (MDN)]].
[^mdn-content]: [[quellen/artikel/details-content-mdn|details-content Pseudo-Element (MDN)]], Abschnitt „Transition example“.
[^chrome]: [[quellen/artikel/exclusive-accordion-chrome|Exclusive Accordion (Chrome for Developers)]].
[^height-auto]: [[quellen/artikel/height-auto-chrome|Animate to height auto (Chrome for Developers)]], Abschnitt „Animate the details element“.
[^whatwg-details]: WHATWG, HTML Living Standard, Abschnitt „The details element“: Attributänderungs-Schritte („ensure details exclusivity by closing other elements if needed“) und Hinweis „these attribute change and insertion steps also run when an attribute or element is inserted via the parser“, <https://html.spec.whatwg.org/multipage/interactive-elements.html#the-details-element>. Abgerufen 2026-09-25.
[^jsdom]: jsdom 25.0.1, `lib/jsdom/living/nodes/HTMLDetailsElement-impl.js` (behandelt nur `open`, nicht `name`) und `lib/jsdom/browser/parser/html.js` (setzt Attribute beim Parsen über dieselbe Änderungslogik). Lokal gelesen am 2026-09-25.
