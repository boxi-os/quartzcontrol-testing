---
type: page
status: active
publish: true
title: "Understanding SC 2.3.3 Animation from Interactions (W3C WCAG)"
description: "Quellennotiz zum WCAG-Erfolgskriterium 2.3.3: durch Interaktion ausgelöste Bewegung muss abschaltbar sein."
authors: []
publisher: "W3C Web Accessibility Initiative (WAI), Understanding WCAG 2.2"
source_published:
url: "https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html"
archive_url:
source_kind: primary
---

# Understanding SC 2.3.3 Animation from Interactions (W3C WCAG)

## Quelle / bibliografische Angaben

W3C WAI, „Understanding SC 2.3.3: Animation from Interactions (Level AAA)“.

- URL: <https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html>, abgerufen 2026-09-12 (über Firecrawl)
- Datum im erfassten Text nicht angegeben

## Dokumentart und Kontext

Erläuterungsdokument zu einem Erfolgskriterium der WCAG 2.2. Das Kriterium selbst ist normativ, die Erläuterung informativ. Stufe **AAA** – also nicht Teil der üblichen AA-Anforderungen.

## Kurzfassung

Bewegungsanimationen, die durch eine Interaktion ausgelöst werden, müssen sich abschalten lassen, sofern sie nicht essenziell sind.

## Kernaussagen mit Fundstellen

- Wortlaut des Kriteriums: „Motion animation triggered by interaction can be disabled, unless the animation is essential to the functionality or the information being conveyed.“ (Success Criterion)
- Vestibuläre Reaktionen reichen von Schwindel und Übelkeit bis zu Migräne. Parallax-Scrolling nennt die Seite als häufig nicht essenzielle Animation (Intent).
- Abgrenzung: 2.3.3 gilt für Bewegung **nach einer Nutzeraktion**. [[quellen/dokumente/wcag-2-2-2|2.2.2 Pause, Stop, Hide]] gilt für Bewegung, die **automatisch** startet. Eine Animation kann gegen beide verstoßen (Intent).
- Drei gleichwertige Wege: unnötige Animation vermeiden, einen eigenen Schalter anbieten oder die Systemeinstellung „Bewegung reduzieren“ nutzen (Intent).
- Das Hereinscrollen neuer Inhalte selbst ist essenziell und erlaubt. Zusätzliche Bewegung beim Scrollen soll abschaltbar sein (Intent).
- Als ausreichende Technik ist unter anderem [[quellen/dokumente/wcag-c39|C39]] aufgeführt (Techniques).

## Eigene Einordnung

Auch wenn AAA selten gefordert ist: Die Maßnahme kostet in CSS eine Media Query. Für Scroll-getriebene Effekte und View Transitions ist das Kriterium der direkte Maßstab.

## Verknüpftes Wissen

- [[animation/barrierearme-animationen|Barrierearme Animationen]]
- [[animation/scroll-getriebene-animationen|Scroll-getriebene Animationen]]
