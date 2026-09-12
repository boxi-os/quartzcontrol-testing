---
type: page
status: active
publish: true
title: "Menus Tutorial (W3C WAI)"
description: "Quellennotiz zum WAI-Tutorial über barrierefreie Menüs: Struktur, aktueller Menüpunkt, Fly-out-Untermenüs."
authors: []
publisher: "W3C Web Accessibility Initiative (WAI)"
source_published:
url: "https://www.w3.org/WAI/tutorials/menus/"
archive_url:
source_kind: primary
---

# Menus Tutorial (W3C WAI)

## Quelle / bibliografische Angaben

Mehrseitiges Tutorial der W3C WAI. Ausgewertet wurden drei Seiten:

- Übersicht: <https://www.w3.org/WAI/tutorials/menus/>
- Structure: <https://www.w3.org/WAI/tutorials/menus/structure/>
- Fly-out Menus: <https://www.w3.org/WAI/tutorials/menus/flyout/>

Alle abgerufen 2026-09-12 über Firecrawl. Ein Datum steht im erfassten Hauptinhalt nicht. Die Codebeispiele fehlen im erfassten Text weitgehend, ausgewertet ist nur der Fließtext.

## Dokumentart und Kontext

Informatives Tutorial der WAI, keine normative Vorgabe. Die Seite „Styling“ und „Application Menus“ wurden nicht ausgewertet.

## Kurzfassung

Menüs sollen ihre Struktur im Markup abbilden, beschriftet sein, den aktuellen Punkt kennzeichnen und Untermenüs so anbieten, dass Maus-, Tastatur- und Touch-Nutzer sie bedienen können.

## Kernaussagen mit Fundstellen

- **Warum:** Screenreader- und Tastaturnutzer brauchen bedienbares Markup. Touch-Nutzer und Menschen mit feinmotorischen Einschränkungen brauchen große Ziele, und Untermenüs sollen nicht sofort verschwinden, wenn die Maus den Bereich verlässt (Übersicht).
- **Liste:** Menüs als `ul` auszeichnen, damit assistive Technologien die Anzahl der Punkte ansagen können. `ol` nur, wenn die Reihenfolge Bedeutung hat (Structure).
- **Identifizieren und beschriften:** Menü möglichst mit `nav` auszeichnen und mit Überschrift, `aria-label` oder `aria-labelledby` benennen, damit sich mehrere Menüs unterscheiden lassen (Structure).
- **Aktueller Punkt:** entweder unsichtbarer Text wie „Current Page:“ und `span` statt Link, oder `aria-current="page"`, wenn der Link bleiben muss (Structure).
- **Responsive:** Die Menüstruktur bleibt über Bildschirmgrößen konsistent. Sichtbare Punkte behalten Reihenfolge, Wortlaut und Ziel (Structure).
- **Untermenüs kennzeichnen:** visuell mit Icon und im Markup mit `aria-expanded` (Fly-out).
- **Maus:** Ein Skript verzögert das Schließen beim Verlassen, im Beispiel um eine Sekunde (Fly-out).
- **Tastatur:** Untermenüs sollen **nicht** beim Durchtabben aufgehen. Stattdessen öffnet der Elternpunkt per Aktivierung (wenn er selbst kein Link ist) oder ein **separater Button** neben dem Elternlink (wenn dieser auf eine Seite führt). `aria-expanded` wird dabei mitgeführt (Fly-out).

## Eigene Einordnung

Das Tutorial beschreibt eine Umsetzung mit Skripten und `aria-expanded` von Hand. Die Grundregeln – Liste, Label, `aria-current`, Button statt Hover-only – gelten unabhängig davon, ob man heute `popover` einsetzt.

## Verknüpftes Wissen

- [[navigation/hauptnavigation|Hauptnavigation semantisch aufbauen]]
- [[navigation/dropdown-navigation|Dropdown-Navigation mit Disclosure-Buttons bauen]]
- [[quellen/dokumente/disclosure-navigation-apg|Example Disclosure Navigation Menu (W3C APG)]]
