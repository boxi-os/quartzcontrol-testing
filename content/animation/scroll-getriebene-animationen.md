---
type: page
status: active
publish: true
title: "Scroll-getriebene Animationen"
description: "CSS-Animationen, die dem Scrollen statt der Zeit folgen: scroll() und view(), animation-range, Einsatz nur als Zusatz, weil Firefox fehlt."
applies_to:
  - "Baseline-Angaben nach web-features 3.38.0, Stand 2026-09-12"
  - "Beispiele getestet in Chrome 152"
---

# Scroll-getriebene Animationen

## Kurz erklärt

Eine normale CSS-Animation läuft in der Zeit ab. Bei einer scroll-getriebenen Animation tritt an die Stelle der Zeit der **Scrollfortschritt**, festgelegt mit `animation-timeline`: Scrollt man, bewegt sich die Animation. Hört man auf, bleibt sie stehen.[^webkit]

```css
@keyframes grow-progress {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}

.reading-progress {
  display: none;
}

@supports (animation-timeline: scroll()) {
  .reading-progress {
    display: block;
    position: fixed;
    inset: 0 0 auto 0;
    height: 4px;
    transform-origin: left;
    animation: grow-progress linear;
    animation-timeline: scroll();
  }
}
```

<a href="beispiele/scroll-getrieben-01-lesefortschritt.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

Ohne die Abfrage mit `@supports` stünde der Balken in Browsern, die das nicht können, die ganze Zeit in voller Breite da. In Chrome 152 nachgestellt: Eine Animation ohne Timeline und ohne Dauer hinterlässt `transform: none`, der Balken ist also voll breit.

## Hintergrund

Für solche Effekte brauchte man bisher JavaScript und Bibliotheken.[^webkit] `animation-timeline` stammt aus CSS Animations Level 2 (Juni 2023). Die `@keyframes` bleiben wie gewohnt, neu ist nur die Timeline.

## Wichtige Aspekte

### Drei Bausteine

- **Ziel:** das animierte Element
- **Keyframes:** was passiert
- **Timeline:** wovon der Fortschritt abhängt[^webkit]

### Zwei Timelines

| | `scroll()` | `view()` |
| --- | --- | --- |
| Fortschritt folgt | dem Scrollen eines Containers | dem Weg des Elements durch den sichtbaren Bereich |
| 0 % | Scroll-Anfang | erstes Pixel tritt ein |
| 100 % | Scroll-Ende | letztes Pixel ist wieder draußen |
| Typisch | Lesefortschritt, Header-Effekte | Bilder oder Abschnitte beim Hereinscrollen |

Die Zeilen 0 % und 100 % für `scroll()` habe ich selbst formuliert, für `view()` stehen sie so in der Quelle.[^webkit]

### Parameter

- **Scroller:** `nearest` (Standard, nächster Vorfahr mit Scrollbalken), `root`, `self`.
- **Achse:** `block` (Standard), `inline`, `x`, `y`.[^webkit]

```css
animation-timeline: scroll(root block);
```

### `animation-range`

Legt fest, in welchem Abschnitt der Timeline die Animation läuft. Standard ist 0 % bis 100 %. Bei `view()` heißt das: Das Element bewegt sich die ganze Zeit, solange es sichtbar ist. Mit `animation-range: 0% 50%` ist es nach der Hälfte des Weges am Ziel und bleibt dann stehen. Das ist angenehmer anzusehen.[^webkit]

### Reihenfolge

`animation-timeline` muss **nach** der Kurzform `animation` stehen,[^webkit] weil die Kurzform die Timeline zurücksetzt. In Chrome 152 bestätigt: Steht `animation` dahinter, ist `animation-timeline` wieder `auto`.

### Abgrenzung zu Scroll-State-Queries

Scroll-State-Queries schalten Styles **um**, sobald ein Zustand eintritt (etwa „angedockt“). Scroll-getriebene Animationen koppeln dagegen den **Fortschritt** an die Scrollposition. Welche Technik für welchen Effekt besser passt, ist laut Adam Argyle noch „unerforschtes Terrain“.[^scroll-state] Ein Beispiel für Scroll-State steht in [[navigation/sticky-header|Sticky-Header einrichten]].

## Beispiele

Ein Bild gleitet beim Hereinscrollen herein und steht ab der Hälfte still. Das Beispiel folgt WebKit und greift nur, wenn der Browser es kann und keine reduzierte Bewegung eingestellt ist:[^webkit]

```css
@keyframes slide-in {
  from { opacity: 0; translate: 100% 0; }
  to   { opacity: 1; translate: 0 0; }
}

@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .article img {
      animation: slide-in linear both;
      animation-timeline: view();
      animation-range: 0% 50%;
    }
  }
}
```

<a href="beispiele/scroll-getrieben-02-einblenden.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

Bei WebKit steht `transform: translateX(100%)` und `@media not (prefers-reduced-motion)` ohne `@supports`. Die Umstellung auf `translate` und `both` und die Abfrage mit `@supports` habe ich ergänzt.

## Eigene Notizen / Einordnung

**Nur als Zusatz einsetzen.** Firefox kann das laut Baseline-Daten nicht (auch in `web-features` 3.43.0 vom 2026-10-18 noch nicht). Daraus folgt:

- Der Inhalt darf nie von der Animation abhängen. Ein Startzustand wie `opacity: 0` gehört **in** die `@supports`-Abfrage, sonst bleibt der Inhalt in Firefox unsichtbar.
- Mit `@supports (animation-timeline: scroll())` bzw. `view()` trennt man sauber zwischen beiden Fällen.

**Bewegung hinterfragen.** Ein dünner Fortschrittsbalken ist unproblematisch. Großflächige Bewegung beim Scrollen, also Einfliegen, Parallax oder Zoom, ist genau das, wovor WCAG 2.3.3 warnt.[^wcag-233] Siehe [[animation/barrierearme-animationen|Barrierearme Animationen]].

Der Fortschrittsbalken ist das Lehrbeispiel von WebKit, aber eigentlich selbst ein Grenzfall, denn Browser haben ja schon Scrollbalken.[^webkit]

### Browsersupport

| Feature | Stand |
| --- | --- |
| Scroll-getriebene Animationen (`animation-timeline`, `scroll()`, `view()`, `animation-range`) | *limited*: Chrome/Edge 115, Safari 26, **Firefox fehlt** |
| Scroll-State-Queries | *limited*: nur Chromium ab 133 |
| `@supports` | Baseline *widely available* |

Quelle: `web-features` 3.38.0 (Baseline-Daten der W3C WebDX Community Group), lokal abgefragt am 2026-09-12. Die `@supports`-Zeile ist nicht eigens abgefragt.

## Siehe auch

- [[animation/transitions-und-keyframes|CSS-Transitions und Keyframe-Animationen]]
- [[animation/barrierearme-animationen|Barrierearme Animationen]]
- [[navigation/sticky-header|Sticky-Header einrichten]]
- [[animation/view-transitions|View Transitions]]

## Quellen

- [[quellen/artikel/scroll-driven-webkit|A guide to Scroll-driven Animations with just CSS (WebKit)]] — Grundlagen, Beispiele, Parameter, Reihenfolge, Bewegungsempfindlichkeit
- [[quellen/artikel/scroll-state-chrome|CSS scroll-state() (Chrome for Developers)]] — Abgrenzung zu Scroll-State-Queries
- [[quellen/dokumente/wcag-2-3-3|Understanding SC 2.3.3 Animation from Interactions (W3C WCAG)]] — Bewegung beim Scrollen
- [[quellen/artikel/css-animations-mdn|Using CSS animations (MDN)]] — `animation-timeline` als Teileigenschaft

Das Beispiel mit dem Fortschrittsbalken ist an WebKit angelehnt, aber umgebaut (`inset`, `transform-origin: left`, eigenes Element statt `footer::after`). Die Vergleichstabelle und die Regel „Startzustand in `@supports`“ sind eigene Einordnung. Am 2026-09-13 in Chrome 152 (macOS) getestet: Der Balken folgt dem Scrollen (0 → 0,5 → 1), das Bild blendet beim Hereinkommen ein und ist ab der Hälfte fertig. Nicht getestet: Safari.

[^webkit]: [[quellen/artikel/scroll-driven-webkit|A guide to Scroll-driven Animations with just CSS (WebKit)]].
[^scroll-state]: [[quellen/artikel/scroll-state-chrome|CSS scroll-state() (Chrome for Developers)]], Abschnitt „Overview“.
[^wcag-233]: [[quellen/dokumente/wcag-2-3-3|Understanding SC 2.3.3 Animation from Interactions (W3C WCAG)]].
