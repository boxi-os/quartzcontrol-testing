---
type: page
status: active
publish: true
title: "Sichtbare Fokusstile"
description: "Fokus immer sichtbar halten und mit :focus-visible gestalten statt entfernen: outline statt nur box-shadow, Kontrast, :focus-within und :has(:focus-visible) für Gruppen."
applies_to:
  - "Baseline-Angaben nach web-features 3.43.0, Stand 2026-10-18"
  - "WCAG 2.2"
  - "Verhalten getestet in Chrome 155"
---

# Sichtbare Fokusstile

## Empfehlung

**Den Fokus nie ersatzlos entfernen.** Wer den Fokusring des Browsers nicht mag, gestaltet ihn mit `:focus-visible` um, statt `outline: none` zu setzen.

```css
:focus-visible {
  outline: 3px solid black;
  outline-offset: 2px;
  box-shadow: 0 0 0 6px white;   /* zweiter, heller Ring für dunkle Hintergründe */
}
```

<a href="beispiele/fokus-02-zweifarbig.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

Dazu ein paar Regeln:

- Den Ring mit `outline` zeichnen, `box-shadow` höchstens als Ergänzung.
- Mindestens 2px dick und mit mindestens 3:1 Kontrast.
- Für Gruppen und Karten `:focus-within` oder `:has(:focus-visible)` nutzen.
- Sticky Header und Banner dürfen das fokussierte Element nicht vollständig verdecken.

## Begründung

### Warum der Fokus sichtbar sein muss

Für alle, die mit der Tastatur navigieren, ist der Fokusring das, was für alle anderen der Mauszeiger ist. Ohne ihn weiß man nicht, wo man gerade ist.[^soueidan] WCAG verlangt deshalb auf Stufe AA, dass der Tastaturfokus sichtbar ist (2.4.7), und nennt das Entfernen des Fokusindikators per CSS ausdrücklich als typischen Fehler.[^wcag-247]

### Warum :focus-visible statt :focus

Früher bekam jedes fokussierte Element einen Ring, auch nach einem Mausklick auf einen Button. Das fanden viele hässlich, und so landete `outline: none` in unzähligen Stylesheets. Damit war der Fokus auch für Tastaturnutzer weg.[^mdn-fv]

Heute entscheidet der Browser selbst, wann der Fokus sichtbar sein soll, und `:focus-visible` trifft genau dann. So ändert man **wie** der Fokus aussieht, ohne zu ändern, **wann** er erscheint.[^mdn-fv]

In Chrome 155 nachgeprüft:

| Aktion | `:focus` | `:focus-visible` |
| --- | --- | --- |
| Button mit der Maus anklicken | ja | nein |
| Mit Tab auf einen Button | ja | ja |
| Mit der Maus in ein Textfeld klicken | ja | **ja** |

<a href="beispiele/fokus-01-focus-visible.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

Die letzte Zeile ist wichtig: `:focus-visible` heißt nicht „nur Tastatur“. In Textfeldern zeigt der Browser den Fokus auch nach einem Klick, weil man dort ja tippen will. Manche Quellen vereinfachen das zu „nur bei Tastaturfokus“.[^soueidan]

WCAG erlaubt dieses Verhalten ausdrücklich: Es reicht, wenn es einen Bedienmodus gibt, in dem der Fokus sichtbar ist.[^wcag-247]

### Warum outline und nicht nur box-shadow

Im Forced-Colors-Modus (zum Beispiel dem Kontrastmodus von Windows) ersetzt das System Farben, Hintergründe und Schatten. `box-shadow` verschwindet dabei, `outline` bleibt erhalten. Ein Fokusring, der nur aus einem Schatten besteht, ist dort also unsichtbar.[^soueidan]

Der Trick mit zwei Ringen stammt von Sara Soueidan: Die `outline` liegt über dem Schatten. Ein 6px breiter weißer Schatten hinter einer 3px schwarzen Outline ergibt deshalb zwei gleich breite Ringe in Schwarz und Weiß. So ist der Fokus auf hellem und dunklem Hintergrund sichtbar.[^soueidan] Bei dunklen Seiten tauscht man die Farben.

### Wie groß und kontrastreich

WCAG 2.4.13 (Stufe AAA) gibt eine Messlatte: Der Ring soll mindestens so viel Fläche haben wie ein 2px dicker Rahmen um das Element, und zwischen fokussiertem und unfokussiertem Zustand sollen mindestens 3:1 Kontrast liegen.[^wcag-2413] Auch auf Stufe AA gilt für den Fokusring 3:1 gegenüber der Umgebung, über das Kriterium 1.4.11 Non-text Contrast.[^wcag-247][^mdn-fv]

## Wann anwenden?

Immer. Jede Website mit Links, Buttons oder Formularen braucht einen sichtbaren Fokus.

### Gruppen und Karten hervorheben

`:focus-within` trifft ein Element, wenn es selbst oder irgendetwas darin den Fokus hat.[^mdn-fw] Das passt gut zu Formulargruppen:

```css
.feldgruppe:focus-within {
  background: var(--hervorhebung);
}
```

`:focus-within` reagiert aber auf **jeden** Fokus, auch nach einem Mausklick. Soll die Gruppe nur bei Tastaturbedienung reagieren, nimmt man `:has(:focus-visible)`:

```css
.karte:has(:focus-visible) {
  outline: 3px solid;
}
```

<a href="beispiele/fokus-03-gruppen.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

Beides habe ich in Chrome 155 nachgeprüft. Ein Anwendungsfall steht in [[komponenten/klickbare-karte|Ganze Karte klickbar machen]].

### Fokus nicht verdecken

Seit WCAG 2.2 gilt auf Stufe AA: Ein Element mit Tastaturfokus darf nicht **vollständig** hinter etwas verschwinden, das die Website selbst darübergelegt hat. Typische Verursacher sind Sticky Header, Sticky Footer und Cookie-Banner.[^wcag-2411] Gegenmittel ist `scroll-padding`, siehe [[navigation/sticky-header|Sticky-Header einrichten]].

## Ausnahmen / Gegenbeispiele

- **Wer Maus und Tastatur abwechselnd benutzt**, versteht unter Umständen nicht, warum der Ring mal da ist und mal nicht. MDN nennt das ausdrücklich als Problem für Menschen mit kognitiven Einschränkungen.[^mdn-fv] WCAG empfiehlt deshalb als Best Practice, auch Mausnutzern einen sichtbaren Fokus anzubieten, wo es hilft.[^wcag-247] Wer auf Nummer sicher gehen will, gestaltet `:focus` dezent und `:focus-visible` deutlich.
- **Den Fokusstil des Browsers unverändert lassen** ist ebenfalls zulässig. WCAG 2.4.13 nimmt diesen Fall sogar ausdrücklich aus.[^wcag-2413] Er ist nur nicht auf jedem Hintergrund gut sichtbar.
- **Das alte Muster `:focus:not(:focus-visible)`** brauchte man, solange nicht alle Browser `:focus-visible` konnten.[^soueidan] Seit 2024 ist das überflüssig.

## Checkliste

- [ ] Kein `outline: none` oder `outline: 0` ohne gleichwertigen Ersatz
- [ ] Eigener Fokusstil über `:focus-visible`
- [ ] Fokusring mit `outline` (sichtbar im Forced-Colors-Modus)
- [ ] Mindestens 2px dick und mindestens 3:1 Kontrast zur Umgebung
- [ ] Auf allen verwendeten Hintergründen sichtbar (zweiter Ring per `box-shadow` hilft)
- [ ] Sticky Header, Footer und Banner verdecken keine fokussierten Elemente
- [ ] Einmal die ganze Seite mit Tab durchgehen und schauen, ob man immer weiß, wo man ist

## Quellen / Erfahrungen

- [[quellen/artikel/focus-visible-mdn|focus-visible Pseudoklasse (MDN)]] — Heuristik des Browsers, Hintergrund, Kontrast, Kognition
- [[quellen/artikel/focus-within-mdn|focus-within Pseudoklasse (MDN)]] — Definition, Formulargruppen
- [[quellen/artikel/fokusindikatoren-soueidan|A guide to designing accessible, WCAG-conformant focus indicators (Sara Soueidan)]] — zweifarbiger Ring, Forced Colors, alter Fallback
- [[quellen/dokumente/wcag-2-4-7|Understanding SC 2.4.7 Focus Visible (W3C WCAG)]] — Pflicht zum sichtbaren Fokus (AA)
- [[quellen/dokumente/wcag-2-4-11|Understanding SC 2.4.11 Focus Not Obscured Minimum (W3C WCAG)]] — nicht verdecken (AA)
- [[quellen/dokumente/wcag-2-4-13|Understanding SC 2.4.13 Focus Appearance (W3C WCAG)]] — Größe und Kontrast (AAA)

Eigene Ergänzungen: die Tabelle und die Varianten mit `:focus-within` und `:has(:focus-visible)` habe ich am 2026-10-18 in Chrome 155 geprüft. Den Forced-Colors-Modus und Screenreader habe ich nicht getestet.

### Browsersupport

Laut `web-features` 3.43.0 (abgefragt 2026-10-18), alles Baseline *widely available*: `:focus-visible` seit 2024-09-14 (Chrome/Edge 86, Firefox 85, Safari 15.4), `:focus-within` seit 2022-07-15, `:has()` seit 2026-06-19.

[^mdn-fv]: [[quellen/artikel/focus-visible-mdn|focus-visible Pseudoklasse (MDN)]], Abschnitte „:focus vs :focus-visible“ und „Accessibility“, Stand 2026-10-06.
[^mdn-fw]: [[quellen/artikel/focus-within-mdn|focus-within Pseudoklasse (MDN)]], Einleitung, Stand 2026-10-14.
[^soueidan]: [[quellen/artikel/fokusindikatoren-soueidan|A guide to designing accessible, WCAG-conformant focus indicators (Sara Soueidan)]], Einleitung, Abschnitte „A ‘universal’ focus indicator“ und „Showing the focus indicator only for keyboard users“, 2021-08-13, aktualisiert 2023-08-27.
[^wcag-247]: [[quellen/dokumente/wcag-2-4-7|Understanding SC 2.4.7 Focus Visible (W3C WCAG)]], Abschnitte „Intent“ und „Failures“.
[^wcag-2411]: [[quellen/dokumente/wcag-2-4-11|Understanding SC 2.4.11 Focus Not Obscured Minimum (W3C WCAG)]], Abschnitt „Intent“.
[^wcag-2413]: [[quellen/dokumente/wcag-2-4-13|Understanding SC 2.4.13 Focus Appearance (W3C WCAG)]], Kriterium und Abschnitt „Minimum area“.
