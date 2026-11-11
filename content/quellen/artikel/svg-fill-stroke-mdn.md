---
type: page
status: active
publish: true
title: "SVG Füllung und Kontur (MDN)"
description: "Quellennotiz zum MDN-Tutorial „Fills and strokes“: fill, stroke und ihre Varianten, paint-order und Styling per CSS."
authors: []
publisher: "MDN Web Docs"
source_published: 
url: "https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch/Fills_and_strokes"
archive_url:
source_kind: secondary
---

# SVG Füllung und Kontur (MDN)

## Quelle / bibliografische Angaben

MDN Web Docs, englische Fassung.

- Stand laut Seite: „last modified on Aug 7, 2026“
- URL: <https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch/Fills_and_strokes>, abgerufen 2026-10-18 (über Firecrawl)


## Kurzfassung

Erklärt die Attribute für Füllung und Kontur und wie man sie per CSS setzt.

## Kernaussagen

- `fill` färbt die Fläche, `stroke` die Kontur. Erlaubt sind alle CSS-Farbschreibweisen. Deckkraft getrennt über `fill-opacity` und `stroke-opacity`.
- Die Kontur liegt **mittig** auf dem Pfad, halb innen, halb außen.
- `stroke-linecap` (`butt`, `square`, `round`) bestimmt die Linienenden, `stroke-linejoin` (`miter`, `round`, `bevel`) die Ecken.
- `stroke-dasharray` erzeugt Strichmuster. Eine ungerade Anzahl Werte wird verdoppelt.
- `paint-order` legt fest, ob erst Füllung oder erst Kontur gemalt wird.
- Fast alles zum Malen lässt sich auch per CSS setzen: `fill`, `stroke`, `stroke-dasharray` usw. Laut Seite gehen `width`, `height` und die Pfadbefehle **nicht** per CSS.
- CSS kann inline (`style`), in einem `<style>` (gern in `<defs>`) oder als externes Stylesheet kommen. `:hover` funktioniert.

## Eigene Einordnung

Die Aussage zu `width`, `height` und Pfaden ist veraltet. Seit SVG 2 sind das Geometry Properties, so steht es auch auf [[quellen/artikel/use-mdn|use-Element (MDN)]]. In Chrome 155 ließen sich `width`, `height`, `r`, `cx` und sogar `d` per CSS setzen (getestet am 2026-10-18).

## Verknüpftes Wissen

- [[svg/svg-gestalten|SVG mit CSS gestalten]]

## Offene Fragen

- Wie gut Firefox und Safari Geometry Properties per CSS unterstützen.
