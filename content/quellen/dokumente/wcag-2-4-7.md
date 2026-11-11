---
type: page
status: active
publish: true
title: "Understanding SC 2.4.7 Focus Visible (W3C WCAG)"
description: "Quellennotiz zum WCAG-Erfolgskriterium 2.4.7 (AA): Tastaturfokus muss sichtbar sein."
authors: []
publisher: "W3C Web Accessibility Initiative (WAI), Understanding WCAG 2.2"
source_published: 
url: "https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html"
archive_url:
source_kind: primary
---

# Understanding SC 2.4.7 Focus Visible (W3C WCAG)

## Quelle / bibliografische Angaben

W3C WAI: „Understanding SC 2.4.7 Focus Visible (Level AA)“, Teil von Understanding WCAG 2.2.

- URL: <https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html>, abgerufen 2026-10-18 (über Firecrawl)
- Datum: auf der abgerufenen Seite nicht angegeben

## Kurzfassung

Wer die Seite mit der Tastatur bedient, muss sehen können, welches Element den Fokus hat.

## Kernaussagen

- Kriterium: Jede per Tastatur bedienbare Oberfläche hat einen Bedienmodus, in dem der Fokusindikator sichtbar ist.
- „Mode of operation“ erlaubt ausdrücklich, dass Browser den Fokus nur bei Tastaturbedienung zeigen. Genau das macht `:focus-visible`.
- Der Fokusindikator darf nicht nach einiger Zeit verschwinden.
- Fokusindikatoren unterliegen auch 1.4.11 Non-text Contrast.
- Empfehlung als Best Practice: auch Maus- und Pointer-Nutzern einen sichtbaren Fokus anbieten, wo es hilft.
- Häufiger Fehler laut Seite: per Stylesheet den Fokusindikator entfernen oder unsichtbar machen (Failure F78).

## Eigene Einordnung

Für Stufe AA reicht es also, wenn der Fokus bei Tastaturbedienung sichtbar ist. Größe und Kontrast regelt erst 2.4.13 (AAA).

## Verknüpftes Wissen

- [[komponenten/fokusstile|Sichtbare Fokusstile]]
- [[quellen/dokumente/wcag-2-4-13|Understanding SC 2.4.13 Focus Appearance (W3C WCAG)]]

## Offene Fragen

- Keine.
