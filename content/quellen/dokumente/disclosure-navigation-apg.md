---
type: page
status: active
publish: true
title: "Example Disclosure Navigation Menu (W3C APG)"
description: "Quellennotiz zum APG-Beispiel für eine Seitennavigation mit Disclosure-Buttons statt ARIA-Menürollen."
authors: []
publisher: "W3C Web Accessibility Initiative (WAI), ARIA Authoring Practices Guide"
source_published:
url: "https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/"
archive_url:
source_kind: primary
---

# Example Disclosure Navigation Menu (W3C APG)

## Quelle / bibliografische Angaben

Beispielseite aus dem ARIA Authoring Practices Guide (APG) der W3C WAI.

- URL: <https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/>, abgerufen 2026-09-12 (über Firecrawl)
- Veröffentlichungs- oder Änderungsdatum im erfassten Text nicht angegeben
- Die Seite enthält einen Bericht des ARIA-AT-Projekts mit dem ausdrücklichen Hinweis „Unapproved Report“

## Dokumentart und Kontext

Das APG ist eine informative Praxisanleitung der W3C, keine normative Spezifikation. Die Seite warnt selbst: Der Code sei nicht für den Produktiveinsatz gedacht und müsse mit assistiven Technologien getestet werden. Außerdem gilt der Grundsatz „No ARIA is better than Bad ARIA“.

## Kurzfassung

Eine Seitennavigation mit aufklappbaren Linklisten wird als Reihe von **Disclosure-Buttons** gebaut, nicht mit den ARIA-Rollen `menu`/`menubar`. Jeder Button blendet eine verschachtelte Liste von Links ein oder aus.

## Kernaussagen mit Fundstellen

- Das Beispiel benutzt „menu“ nur umgangssprachlich und **bewusst nicht die Rolle `menu`**, weil eine Seitennavigation die komplexe Funktionalität nicht bietet, die assistive Technologien bei dieser Rolle erwarten (Abschnitt „About This Example“).
- Die Liste der Buttons liegt in einem `nav`-Landmark mit Namen. Die Links eines Buttons stehen in einer verschachtelten Liste im selben Listenpunkt (Accessibility Features, Punkt 1–2).
- `Esc` schließt ein offenes Dropdown und setzt den Fokus auf den steuernden Button. Verlässt der Fokus die Navigation, schließt das Dropdown ebenfalls. Das `Esc`-Verhalten ist nötig für WCAG 2.1 SC 1.4.13 „Content on Hover or Focus“ (Punkt 3).
- Der Pfeil für den Auf-/Zu-Zustand wird per `::after` mit Rahmen gezeichnet, damit er im Hochkontrastmodus sichtbar bleibt (Punkt 4).
- Pfeiltasten, `Home` und `End` sind **optional** und ergänzen `Tab`, ersetzen es aber nicht. Screenreader im Lesemodus fangen diese Tasten ab (Punkt 5).
- Attribute: `aria-controls` und `aria-expanded="true|false"` am Button. CSS-Attributselektoren auf `aria-expanded` synchronisieren die Optik mit dem Zustand. `aria-current="page"` markiert den Link der aktuellen Seite (Tabelle „Role, Property, State, and Tabindex Attributes“).

## Eigene Einordnung

Die Seite ist die maßgebliche Referenz gegen `role="menu"` in Seitennavigationen. Sie setzt JavaScript für Zustand und Tastatur voraus. Die Popover-API übernimmt heute einen Teil davon (`aria-expanded`, `Esc`, Fokusrückgabe), siehe [[navigation/top-layer|Top Layer mit popover und dialog]].

## Verknüpftes Wissen

- [[navigation/dropdown-navigation|Dropdown-Navigation mit Disclosure-Buttons bauen]]
- [[navigation/hauptnavigation|Hauptnavigation semantisch aufbauen]]
- [[quellen/dokumente/menus-tutorial-wai|Menus Tutorial (W3C WAI)]]
