---
type: page
status: active
publish: true
title: "Dropdown-Navigation mit Disclosure-Buttons bauen"
description: "Untermenüs einer Navigation über Buttons statt Hover öffnen – klassisch mit aria-expanded oder mit der Popover-API."
---

# Dropdown-Navigation mit Disclosure-Buttons bauen

## Ziel

Eine Navigation mit Untermenüs, die mit Maus, Tastatur, Touch und Screenreader funktioniert. Untermenüs öffnen per **Button**, nicht nur per Hover, und nicht schon beim Durchtabben.

Grundstruktur der Navigation: [[navigation/hauptnavigation|Hauptnavigation semantisch aufbauen]].

## Voraussetzungen

- Variante A (Popover): kein JavaScript nötig; Popover-API ist seit 2025-01-27 Baseline *newly available*.
- Variante B (klassisch): JavaScript für Zustand, `Esc` und Fokus.

## Getestet mit / Stand

Stand 2026-09-12. **Variante A in Chrome 152 (macOS), 2026-09-13 getestet:** Echter Klick öffnet, ein zweites Untermenü schließt das erste, `Tab` springt ins Untermenü, `Esc` schließt und setzt den Fokus zurück auf den Button, Klick daneben schließt. Beide Platzierungen landen wie beabsichtigt. **Nicht getestet:** Variante B, Firefox, Safari, Screenreader; den automatischen `aria-expanded`-Zustand zeigt das verwendete Werkzeug nicht an. Das APG betont selbst, dass Beispiele vor dem Produktiveinsatz mit assistiven Technologien geprüft werden müssen.[^apg]

## Vorgehen

### Gemeinsame Regeln

1. **Kein `role="menu"`.** Die Rolle verspricht Desktop-Menüverhalten, das Seitennavigationen nicht bieten.[^apg][^lehner]
2. **Button statt Hover.** Ein Untermenü öffnet per Aktivierung. Beim Tabben durch die Navigation bleiben Untermenüs zu, sonst müssten Tastaturnutzer alle Unterpunkte durchlaufen.[^wai-flyout]
3. **Elternpunkt, der selbst eine Seite ist:** Link und **daneben** ein eigener Button fürs Untermenü.[^wai-flyout]
4. **Struktur:** Das Untermenü ist eine verschachtelte Liste im selben Listenpunkt wie sein Button.[^apg]
5. **`Esc` schließt** und setzt den Fokus zurück auf den Button – nötig für WCAG 1.4.13 „Content on Hover or Focus“.[^apg]

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

Platzierung unter dem Header, volle Breite – angelehnt an Lehner, der `top`, `margin: 0` und `width: 100%` setzt; `inset: auto` und `left: 0` sind hier ergänzt:[^lehner]

```css
.submenu {
  inset: auto;
  top: var(--header-height, 4rem);
  left: 0;
  margin: 0;
  width: 100%;
}
```

Oder direkt unter dem Button, als Erweiterung für Browser mit Anchor Positioning. Popover und Button sind über `popovertarget` bzw. `commandfor` implizit verankert, `anchor-name` und `position-anchor` sind nicht nötig:[^mdn-popover][^mdn-anchor]

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

Optik an den Zustand koppeln statt an eine Klasse:

```css
button[aria-expanded="true"]::after { rotate: 180deg; }
```

Das APG zeichnet den Pfeil mit Rahmen in `::after`, damit er im Hochkontrastmodus sichtbar bleibt.[^apg]

## Warum funktioniert das?

Die Popover-Variante erbt vom Browser, was Variante B von Hand baut:[^mdn-popover][^hidde]

| Aufgabe | Popover | klassisch |
| --- | --- | --- |
| `aria-expanded` am Button | automatisch (nur deklarativ) | Skript |
| `Esc` schließt | automatisch | Skript |
| Fokus zurück an den Button | automatisch, wenn der Fokus im Menü lag | Skript |
| Klick daneben schließt | automatisch | Skript |
| nur ein Untermenü offen | automatisch (`auto`-Popovers) | Skript |
| Über anderem Inhalt, nicht abgeschnitten | Top Layer | `z-index`, `overflow` beachten |
| Schließen, wenn der Fokus die Navigation verlässt | **nein** – in Chrome 152 bleibt das Untermenü beim Wegtabben offen | Skript |

Die letzte Zeile ist getestet, nicht belegt: Weder MDN noch de Vries/O’Hara beschreiben ein Schließen beim Wegtabben, und Chrome 152 tut es nicht. Das APG verlangt es für seine Variante; wer das will, ergänzt einen kleinen `focusout`-Handler.

## Fallstricke

- **Popover per Skript öffnen:** Dann entfällt das automatische `aria-expanded`.[^hidde]
- **Untermenü mit CSS `display: block` erzwingen** (z. B. für Desktop): Der Button meldet trotzdem „zugeklappt“.[^hidde]
- **Standard-Position des Popovers:** mittig im Viewport mit Rahmen. Ohne eigene Platzierung wirkt das Untermenü „verloren“.[^mdn-popover]
- **Popover per `showPopover()` ohne Button geöffnet:** Dann fehlt die implizite Ankerbeziehung, das Popover landet mit `inset: auto; margin: 0` oben links im Viewport (Chrome 152 getestet). Mit `showPopover({ source: button })` stimmt die Position wieder.
- **`position-area` mischt nicht:** Physische und logische Werte in einer Deklaration machen sie ungültig – `bottom span-right` geht, `block-end span-right` nicht.[^mdn-anchor]
- **Ohne feste Breite** verhält sich das verankerte Untermenü wie `width: max-content`, begrenzt durch den Viewport.[^mdn-anchor]
- **Explizite Ankernamen in wiederholten Komponenten:** Wer statt der impliziten Verknüpfung `anchor-name` nutzt, bekommt bei gleichem Namen immer den letzten Anker im Dokument. `anchor-scope` begrenzt den Namen auf die Komponente.[^mdn-anchor]
- **Anchor Positioning ohne Fallback:** Browser ohne Unterstützung zeigen das Popover dann in der Standard-Position. Die `@supports`-Abfrage im Beispiel verhindert das. Ob die implizite Verankerung in Firefox und Safari greift, ist nicht geprüft.
- **Hover-Öffnen zusätzlich:** Wer das will, braucht JavaScript und eine Schließverzögerung, WAI nennt eine Sekunde als Beispiel.[^wai-flyout] Deklaratives Öffnen bei Hover („interest invokers“) gibt es laut `web-features` 3.38.0 nur in Chromium (ab 142).
- **Safari und `aria-details`:** Laut de Vries/O’Hara setzte Safari zum Zeitpunkt ihres Artikels nur `aria-expanded`, nicht `aria-details` und keine `group`-Rolle.[^hidde]
- **Pfeiltasten:** Sind im APG optional und ersetzen `Tab` nicht. Screenreader im Lesemodus fangen sie ohnehin ab.[^apg]

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

Das Anchor-Beispiel mit `@supports` und `position-area: bottom span-right`, die Vergleichstabelle und der Pfeil per `rotate` sind eigene Umsetzung. `span-right` ist bei MDN nur als Muster (`top span-left`) vorgeführt; der Wert steht laut `web-features` 3.38.0 in Chrome 129, Firefox 147 und Safari 26 zur Verfügung.

[^apg]: [[quellen/dokumente/disclosure-navigation-apg|Example Disclosure Navigation Menu (W3C APG)]].
[^wai-flyout]: [[quellen/dokumente/menus-tutorial-wai|Menus Tutorial (W3C WAI)]], Seite „Fly-out Menus“.
[^lehner]: [[quellen/artikel/popover-navigation-lehner|How to build Accessible Navigation Menus with the Popover API]], Abschnitte „Avoid the menu role“ und „Visual Placement“.
[^mdn-popover]: [[quellen/artikel/popover-api-mdn|Using the Popover API (MDN)]], Abschnitte „Popover accessibility features“, „Positioning popovers“ und „Popover anchor positioning“.
[^hidde]: [[quellen/artikel/popover-accessibility-devries|On popover accessibility – what the browser does and doesn't do]].
[^mdn-anchor]: [[quellen/artikel/anchor-positioning-mdn|Using CSS anchor positioning (MDN)]], Abschnitte „Implicit anchor association“, „Anchor scoping“ und „Setting a position-area“.
