---
type: page
status: active
publish: true
title: "Dropdown-Navigation mit Disclosure-Buttons bauen"
description: "Untermenüs einer Navigation über Buttons statt Hover öffnen – klassisch mit aria-expanded oder mit der Popover-API."
applies_to:
  - "Baseline-Angaben nach web-features 3.38.0, Stand 2026-09-12"
  - "Beispiele getestet in Chrome 152"
---

# Dropdown-Navigation mit Disclosure-Buttons bauen

## Ziel

Eine Navigation mit Untermenüs, die mit Maus, Tastatur, Touch und Screenreader funktioniert. Die Untermenüs öffnen sich per **Button**, nicht nur beim Hover und nicht schon beim Durchtabben.

Grundstruktur der Navigation: [[navigation/hauptnavigation|Hauptnavigation semantisch aufbauen]].

## Voraussetzungen

- Variante A (Popover): kein JavaScript nötig. Die Popover API ist seit 2025-01-27 Baseline *newly available*.
- Variante B (klassisch): JavaScript für den Zustand, `Esc` und den Fokus.

## Getestet mit / Stand

Stand 2026-09-12. **Variante A am 2026-09-13 in Chrome 152 (macOS) getestet:** Ein echter Klick öffnet, ein zweites Untermenü schließt das erste, `Tab` springt ins Untermenü, `Esc` schließt und setzt den Fokus zurück auf den Button, ein Klick daneben schließt. Beide Platzierungen landen wie gewollt. **Nicht getestet:** Variante B, Firefox, Safari, Screenreader. Den automatischen `aria-expanded`-Zustand konnte das verwendete Werkzeug nicht anzeigen. Das APG betont selbst, dass man die Beispiele vor dem Produktiveinsatz mit assistiven Technologien prüfen muss.[^apg]

## Vorgehen

### Gemeinsame Regeln

1. **Kein `role="menu"`.** Die Rolle verspricht ein Verhalten wie in Desktop-Programmen, das Navigationen auf Websites nicht bieten.[^apg][^lehner]
2. **Button statt Hover.** Ein Untermenü öffnet sich erst, wenn man den Button betätigt. Beim Tabben durch die Navigation bleiben die Untermenüs zu, sonst müsste man sich mit der Tastatur durch alle Unterpunkte arbeiten.[^wai-flyout]
3. **Oberpunkt, der selbst eine Seite ist:** ein Link und **daneben** ein eigener Button für das Untermenü.[^wai-flyout]
4. **Struktur:** Das Untermenü ist eine verschachtelte Liste im selben Listenpunkt wie sein Button.[^apg]
5. **`Esc` schließt** und setzt den Fokus zurück auf den Button. Das ist für WCAG 1.4.13 „Content on Hover or Focus“ nötig.[^apg]

### Variante A: Popover

```html
<nav aria-label="Hauptmenü">
  <ul class="nav-list">
    <li><a href="/">Start</a></li>
    <li>
      <button type="button" popovertarget="sub-leistungen">Leistungen</button>
      <ul id="sub-leistungen" popover class="submenu">
        <li><a href="/leistungen/beratung/">Beratung</a></li>
        <li><a href="/leistungen/umsetzung/">Umsetzung</a></li>
      </ul>
    </li>
    <li><a href="/kontakt/">Kontakt</a></li>
  </ul>
</nav>
```

Das Popover steht im DOM direkt nach seinem Button.[^hidde]

Platzierung unter dem Header in voller Breite. Das lehnt sich an Lehner an, der `top`, `margin: 0` und `width: 100%` setzt. `inset: auto` und `left: 0` habe ich ergänzt:[^lehner]

```css
.submenu {
  inset: auto;
  top: var(--header-height, 4rem);
  left: 0;
  margin: 0;
  width: 100%;
}
```

<a href="beispiele/dropdown-01-unter-dem-header.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

Oder direkt unter dem Button, als Zusatz für Browser mit Anchor Positioning. Popover und Button sind über `popovertarget` bzw. `commandfor` automatisch verankert, `anchor-name` und `position-anchor` braucht man nicht:[^mdn-popover][^mdn-anchor]

```css
@supports (position-area: bottom) {
  .submenu {
    inset: auto;
    margin: 0;
    width: auto;
    position-area: bottom span-right;
  }
}
```

<a href="beispiele/dropdown-02-am-button.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

### Variante B: klassisch mit `aria-expanded`

```html
<li>
  <button type="button" aria-expanded="false" aria-controls="sub-leistungen">Leistungen</button>
  <ul id="sub-leistungen" class="submenu" hidden>
    …
  </ul>
</li>
```

JavaScript muss dann selbst:[^apg]

- beim Klick `aria-expanded` umschalten und `hidden` entfernen oder setzen,
- bei `Esc` schließen und den Fokus auf den Button setzen,
- schließen, wenn der Fokus die Navigation verlässt.

Das Aussehen an den Zustand koppeln statt an eine Klasse:

```css
button[aria-expanded="true"]::after { rotate: 180deg; }
```

<a href="beispiele/dropdown-03-aria-expanded.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

Das APG zeichnet den Pfeil mit einem Rahmen in `::after`, damit er im Hochkontrastmodus sichtbar bleibt.[^apg]

## Warum funktioniert das?

Bei der Popover-Variante erledigt der Browser, was man bei Variante B von Hand bauen muss:[^mdn-popover][^hidde]

| Aufgabe | Popover | klassisch |
| --- | --- | --- |
| `aria-expanded` am Button | automatisch (nur deklarativ) | Skript |
| `Esc` schließt | automatisch | Skript |
| Fokus zurück an den Button | automatisch, wenn der Fokus im Menü lag | Skript |
| Klick daneben schließt | automatisch | Skript |
| nur ein Untermenü offen | automatisch (`auto`-Popovers) | Skript |
| Über anderem Inhalt, nicht abgeschnitten | Top Layer | `z-index`, `overflow` beachten |
| Schließen, wenn der Fokus die Navigation verlässt | **nein**, in Chrome 152 bleibt das Untermenü beim Wegtabben offen | Skript |

Die letzte Zeile habe ich getestet, in den Quellen steht sie nicht: Weder MDN noch de Vries/O’Hara beschreiben ein Schließen beim Wegtabben, und Chrome 152 tut es auch nicht. Das APG verlangt es für seine Variante. Wer das will, ergänzt einen kleinen `focusout`-Handler.

## Fallstricke

- **Popover per Skript öffnen:** Dann fällt das automatische `aria-expanded` weg.[^hidde]
- **Untermenü per CSS mit `display: block` dauerhaft anzeigen** (z. B. auf dem Desktop): Der Button meldet trotzdem „zugeklappt“.[^hidde]
- **`width: 100%` mit Innenabstand oder Rahmen:** Das Untermenü wird dann breiter als der Viewport, und es entsteht horizontales Scrollen. `box-sizing: border-box` am Untermenü verhindert das. Im Beispiel mit Chrome 152 nachgestellt (ohne ragte es 34 Pixel über).
- **Standardposition des Popovers:** mittig im Viewport mit Rahmen. Ohne eigene Platzierung wirkt das Untermenü „verloren“.[^mdn-popover]
- **Popover per `showPopover()` ohne Button geöffnet:** Dann fehlt die automatische Ankerbeziehung, und das Popover landet mit `inset: auto; margin: 0` oben links im Viewport (in Chrome 152 getestet). Mit `showPopover({ source: button })` stimmt die Position wieder.
- **`position-area` lässt sich nicht mischen:** Physische und logische Werte in einer Deklaration machen sie ungültig. `bottom span-right` geht, `block-end span-right` nicht.[^mdn-anchor]
- **Ohne feste Breite** verhält sich das verankerte Untermenü wie `width: max-content`, höchstens so breit wie der Viewport.[^mdn-anchor]
- **Eigene Ankernamen in wiederholten Komponenten:** Wer statt der automatischen Verknüpfung `anchor-name` benutzt, bekommt bei gleichem Namen immer den letzten Anker im Dokument. `anchor-scope` begrenzt den Namen auf die Komponente.[^mdn-anchor]
- **Anchor Positioning ohne Fallback:** Browser, die das nicht können, zeigen das Popover dann an der Standardposition. Die `@supports`-Abfrage im Beispiel verhindert das. Ob die automatische Verankerung in Firefox und Safari greift, habe ich nicht geprüft.
- **Zusätzlich beim Hover öffnen:** Wer das will, braucht JavaScript und eine Verzögerung beim Schließen. WAI nennt eine Sekunde als Beispiel.[^wai-flyout] Öffnen beim Hover ohne JavaScript („interest invokers“) gibt es laut `web-features` 3.38.0 nur in Chromium (ab 142).
- **Safari und `aria-details`:** Laut de Vries/O’Hara setzte Safari zum Zeitpunkt ihres Artikels nur `aria-expanded`, nicht `aria-details` und keine `group`-Rolle.[^hidde]
- **Pfeiltasten:** Im APG sind sie optional und ersetzen `Tab` nicht. Screenreader im Lesemodus fangen sie ohnehin ab.[^apg]

## Siehe auch

- [[navigation/top-layer|Top Layer mit popover und dialog]]
- [[navigation/hauptnavigation|Hauptnavigation semantisch aufbauen]]
- [[navigation/mobilmenue|Mobile-Menü ohne Checkbox-Hack bauen]]
- [[animation/ein-und-ausblenden|Ein- und Ausblenden mit CSS animieren]]

## Quellen

- [[quellen/dokumente/disclosure-navigation-apg|Example Disclosure Navigation Menu (W3C APG)]] — Muster, Tastatur, Attribute
- [[quellen/dokumente/menus-tutorial-wai|Menus Tutorial (W3C WAI)]] — Fly-out-Regeln für Maus und Tastatur
- [[quellen/artikel/popover-navigation-lehner|How to build Accessible Navigation Menus with the Popover API]] — Popover-Variante, Platzierung
- [[quellen/artikel/popover-api-mdn|Using the Popover API (MDN)]] — Verhalten, implizite Verankerung
- [[quellen/artikel/popover-accessibility-devries|On popover accessibility – what the browser does and doesn't do]] — Grenzen der Automatik
- [[quellen/artikel/anchor-positioning-mdn|Using CSS anchor positioning (MDN)]] — implizite Verknüpfung, `position-area`, `anchor-scope`

Das Anchor-Beispiel mit `@supports` und `position-area: bottom span-right`, die Vergleichstabelle und der Pfeil per `rotate` habe ich selbst umgesetzt. MDN zeigt `span-right` nur nach demselben Muster (`top span-left`). Laut `web-features` 3.38.0 gibt es den Wert in Chrome 129, Firefox 147 und Safari 26.

[^apg]: [[quellen/dokumente/disclosure-navigation-apg|Example Disclosure Navigation Menu (W3C APG)]].
[^wai-flyout]: [[quellen/dokumente/menus-tutorial-wai|Menus Tutorial (W3C WAI)]], Seite „Fly-out Menus“.
[^lehner]: [[quellen/artikel/popover-navigation-lehner|How to build Accessible Navigation Menus with the Popover API]], Abschnitte „Avoid the menu role“ und „Visual Placement“.
[^mdn-popover]: [[quellen/artikel/popover-api-mdn|Using the Popover API (MDN)]], Abschnitte „Popover accessibility features“, „Positioning popovers“ und „Popover anchor positioning“.
[^hidde]: [[quellen/artikel/popover-accessibility-devries|On popover accessibility – what the browser does and doesn't do]].
[^mdn-anchor]: [[quellen/artikel/anchor-positioning-mdn|Using CSS anchor positioning (MDN)]], Abschnitte „Implicit anchor association“, „Anchor scoping“ und „Setting a position-area“.
