---
type: page
status: active
publish: true
title: "On popover accessibility – what the browser does and doesn't do"
description: "Quellennotiz zu einem Artikel darüber, welche Barrierefreiheits-Semantik Browser beim popover-Attribut selbst ergänzen und welche nicht."
authors:
  - "Hidde de Vries"
  - "Scott O’Hara"
publisher: "hidde.blog"
source_published:
url: "https://hidde.blog/popover-accessibility/"
archive_url:
source_kind: secondary
---

# On popover accessibility – what the browser does and doesn't do

## Quelle / bibliografische Angaben

Blogartikel auf hidde.blog.

- Autoren: Hidde de Vries; laut Hinweis im Artikel bis auf diesen Hinweis gemeinsam mit Scott O’Hara geschrieben
- Titel laut Verlinkung in [[quellen/artikel/popover-navigation-lehner|How to build Accessible Navigation Menus with the Popover API]]; im erfassten Text fehlt die Überschrift
- Erstveröffentlichung im erfassten Text nicht belegt; Aktualisierung „15 March 2025“ (Links ergänzt)
- URL: <https://hidde.blog/popover-accessibility/>, abgerufen 2026-09-12 (über Firecrawl)

## Kurzfassung

„Eingebaute Barrierefreiheit“ bei `popover` heißt: Leitplanken. Browser ergänzen einige Zustände, Beziehungen und Tastaturverhalten. Rolle und komponentenspezifisches Verhalten bleiben Aufgabe der Entwickler.

## Kernaussagen

- **Keine Rolle:** `popover` ist ein Attribut, kein Element, und bringt keine eigene Rolle mit. Man nutzt es auf einem passenden Element oder ergänzt `role`.
- **`aria-expanded`:** Der Button mit `popovertarget` meldet automatisch offen/geschlossen. Das gilt **nur** bei deklarativer Verknüpfung und nur für Buttons. Öffnet ein Skript das Popover oder erzwingt CSS `display: block`, stimmt der Zustand nicht.
- **`aria-details`:** Folgt das Popover nicht direkt auf den Button im Accessibility-Tree, soll der Browser eine `aria-details`-Beziehung anlegen. Zum Zeitpunkt des Schreibens in Chrome, Edge und Firefox umgesetzt. JAWS und NVDA bieten Sprungtasten dafür, VoiceOver nicht. Die UX sei noch unausgereift.
- **`group`-Rolle:** Chrome, Edge und Firefox geben Popovers ohne eigene Rolle die Rolle `group`, damit Grenzen erkennbar sind. Unbenannte Gruppen ignorieren Screenreader oft.
- **Fokusrückgabe:** Edge/Chrome, Firefox und Safari geben den Fokus beim Schließen an den auslösenden Button zurück – **nur, wenn der Fokus im Popover war**.
- **Tab-Reihenfolge:** Desktop-Browser setzen den Popover-Inhalt in der Tab-Reihenfolge direkt hinter den Button, auch wenn er im DOM woanders steht. Der Accessibility-Tree ändert sich dabei nicht. Deshalb soll das Popover im DOM trotzdem nach dem Button stehen.
- **Was Browser nicht tun:** nichts darüber hinaus. Kein Verhalten abhängig von Element oder Rolle.
- **Safari** setzte zum Zeitpunkt des Schreibens nur `aria-expanded`, weder `aria-details` noch die `group`-Rolle.

## Eigene Einordnung

Die genaueste Quelle zu der Frage, was man bei `popover` noch selbst tun muss. Die Browser-Angaben sind datiert „at the time of writing“, das Datum ist aber nicht sicher belegt. Stand der Safari-Aussagen daher als veraltungsgefährdet behandeln.

## Verknüpftes Wissen

- [[navigation/top-layer|Top Layer mit popover und dialog]]
- [[navigation/dropdown-navigation|Dropdown-Navigation mit Disclosure-Buttons bauen]]
- [[quellen/artikel/popover-api-mdn|Using the Popover API (MDN)]]

## Offene Fragen

- Ob Safari inzwischen `aria-details` und die `group`-Rolle setzt, ist nicht geprüft.
