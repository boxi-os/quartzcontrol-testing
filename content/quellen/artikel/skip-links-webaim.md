---
type: page
status: active
publish: true
title: "Skip Navigation Links (WebAIM)"
description: "Quellennotiz zum WebAIM-Artikel über Skip-Links: Zweck, sichtbar bei Fokus, Wortwahl, WCAG 2.4.1."
authors: []
publisher: "WebAIM"
source_published:
url: "https://webaim.org/techniques/skipnav/"
archive_url:
source_kind: secondary
---

# Skip Navigation Links (WebAIM)

## Quelle / bibliografische Angaben

Artikel „Skip Navigation Links“ von WebAIM.

- Autor und Datum im erfassten Hauptinhalt nicht angegeben
- URL: <https://webaim.org/techniques/skipnav/>, abgerufen 2026-09-12 (über Firecrawl)
- Ausgewertet bis einschließlich „WCAG conformance“

## Kurzfassung

Ein Link am Seitenanfang springt direkt zum Hauptinhalt. Er kann versteckt sein, muss aber bei Tastaturfokus deutlich sichtbar werden.

## Kernaussagen

- **Zweck:** Tastatur- und Screenreadernutzer müssen sonst erst alle Navigationslinks durchlaufen; für Menschen mit motorischen Einschränkungen (Kopfschalter, Mundstab) ist das besonders mühsam.
- **Umsetzung:** Link als eines der ersten Elemente, Ziel ist z. B. `<main id="maincontent">`.
- **Versteckte Skip-Links** müssen: standardmäßig versteckt sein, per Tastatur erreichbar bleiben, bei Fokus deutlich sichtbar werden und den Fokus korrekt auf den Hauptinhalt setzen.
- **Falsch versteckt:** `display: none` oder das `hidden`-Attribut entfernen den Link aus der Tastaturnavigation. Auch Hintergrundfarbe, volle Transparenz oder 0 Pixel Größe sind problematisch. Empfohlen: per CSS aus dem Bildschirm schieben und bei Fokus zurückholen.
- **Wortwahl:** mehrere Varianten möglich; WebAIM bevorzugt „Skip to main content“, weil es das Ziel nennt.
- **Anzahl:** Meist genügt ein Skip-Link. Bei sehr wenigen Elementen vor dem Inhalt ist keiner nötig.
- **WCAG 2.4.1 Bypass Blocks (A)** verlangt einen Mechanismus, wiederholte Blöcke zu überspringen. `h1` am Inhaltsbeginn oder `main` würden formal genügen, helfen sehenden Tastaturnutzern ohne Hilfssoftware aber kaum.

## Eigene Einordnung

Praxisnah und klar. Die Technik zum Verstecken verweist auf einen weiteren WebAIM-Artikel, der hier nicht ausgewertet wurde.

## Verknüpftes Wissen

- [[navigation/hauptnavigation|Hauptnavigation semantisch aufbauen]]
