---
type: page
status: active
publish: true
title: "How to build Accessible Navigation Menus with the Popover API"
description: "Quellennotiz zu einem Blogartikel über Fly-out-Navigation mit der Popover-API ohne ARIA-Menürollen."
authors:
  - "Alexander Lehner"
publisher: "oidaisdes.org"
source_published: "2024-10-17"
url: "https://www.oidaisdes.org/blog/accessible-navigation-menu/"
archive_url:
source_kind: secondary
---

# How to build Accessible Navigation Menus with the Popover API

## Quelle / bibliografische Angaben

Blogartikel auf oidaisdes.org.

- Autor: Alexander Lehner (Bildnachweis des Screenshots „© Alexander Lehner“; eine ausdrückliche Autorenzeile steht im erfassten Text nicht)
- Veröffentlicht laut Seite: „Posted on 10/17/2024“
- URL: <https://www.oidaisdes.org/blog/accessible-navigation-menu/>, abgerufen 2026-09-12 (über Firecrawl)
- Verweist auf eine CodePen-Demo, die nicht ausgewertet wurde

## Kurzfassung

Fly-out-Menüs lassen sich mit der Popover-API zugänglich bauen: `nav` mit Liste, Button mit `popovertarget` für jedes Untermenü, keine `menu`-Rollen. Browser übernehmen Top-Layer-Darstellung, Tastaturverhalten und Schließen per Klick daneben.

## Kernaussagen

- **Ziele:** Untermenüs liegen über dem Seiteninhalt und verschwinden nicht sofort, wenn die Maus den Bereich verlässt. Screenreader brauchen sinnvolles Markup, Tastaturnutzer volle Bedienbarkeit.
- **Markup:** `nav` > `ul` > `li`. Ein Listenpunkt enthält entweder einen Link oder einen `button popovertarget="…"` plus `div popover`. Die Liste lässt assistive Technologien die Anzahl der Punkte ansagen.
- **Zustand:** Die Popover-API teilt assistiven Technologien automatisch mit, ob ein Untermenü offen ist. Verweis auf [[quellen/artikel/popover-accessibility-devries|Hidde de Vries]].
- **Keine `menu`-Rolle:** `menu` und `menuitem` sind für Widgets gedacht, die sich wie Betriebssystem-Menüs verhalten. Verweis auf Adrian Roselli, „Don’t Use ARIA Menu Roles for Site Nav“.
- **Position:** Geöffnete Popover liegen im Top Layer. Standardmäßig erscheinen sie mittig im Viewport. Der Artikel setzt `top: var(--header-height)`, `margin: 0` und `width: 100%`.
- **Tastatur:** Nach dem Öffnen ist der Popover-Inhalt als Nächstes in der Fokusreihenfolge. `Esc` schließt und gibt den Fokus an den Button zurück.
- **Light dismiss:** Ein Klick außerhalb schließt das Untermenü und gibt den Fokus zurück, ohne `focusout`-Handler.

## Eigene Einordnung

Knapper, gut begründeter Artikel. Zwei Punkte fehlen:

- Er nennt keine Browserunterstützung. Die Popover-API ist laut `web-features` 3.38.0 erst seit 2025-01-27 in allen großen Browsern (Baseline *newly available*).
- Die Aussage „Fokus kehrt beim Klick daneben zum Button zurück“ deckt sich nicht ganz mit [[quellen/artikel/popover-api-mdn|MDN]] und [[quellen/artikel/popover-accessibility-devries|de Vries/O’Hara]]. Beide beschreiben die Fokusrückgabe beim Schließen per Tastatur beziehungsweise nur dann, wenn der Fokus im Popover lag. In Chrome 152 getestet: Nach `Esc` liegt der Fokus wieder auf dem Button, nach einem Klick daneben auf `body`.

## Verknüpftes Wissen

- [[navigation/dropdown-navigation|Dropdown-Navigation mit Disclosure-Buttons bauen]]
- [[navigation/top-layer|Top Layer mit popover und dialog]]
- [[quellen/dokumente/disclosure-navigation-apg|Example Disclosure Navigation Menu (W3C APG)]]

## Offene Fragen

- Wie sich das Menü in der Demo auf kleinen Bildschirmen verhält, beschreibt der Text nur mit einem Satz („mobile menu instead“).
