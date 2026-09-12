---
type: page
status: active
publish: true
title: "Scroll-getriebene Animationen"
description: "CSS-Animationen, die dem Scrollen statt der Zeit folgen: scroll() und view(), animation-range, Einsatz nur als Zusatz, weil Firefox fehlt."
---

# Scroll-getriebene Animationen

## Kurz erklärt

Eine normale CSS-Animation läuft auf der Zeit ab. Bei einer scroll-getriebenen Animation ersetzt `animation-timeline` die Zeit durch **Scrollfortschritt**: Scrollt man, bewegt sich die Animation; hört man auf, steht sie still.[^webkit]

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

Ohne die `@supports`-Weiche stünde der Balken in Browsern ohne Unterstützung dauerhaft in voller Breite da. In Chrome 152 nachgestellt: Eine Animation ohne Zeitleiste und ohne Dauer hinterlässt `transform: none`, der Balken ist voll breit.

## Hintergrund

Solche Effekte brauchten bisher JavaScript und Bibliotheken.[^webkit] `animation-timeline` stammt aus CSS Animations Level 2 (Juni 2023). Die bestehenden `@keyframes` bleiben unverändert – nur die Zeitleiste ist neu.

## Wichtige Aspekte

### Drei Bausteine

- **Ziel:** das animierte Element
- **Keyframes:** was passiert
- **Zeitleiste:** wovon der Fortschritt abhängt[^webkit]

### Zwei Zeitleisten

| | `scroll()` | `view()` |
| --- | --- | --- |
| Fortschritt folgt | dem Scrollen eines Containers | dem Weg des Elements durch den sichtbaren Bereich |
| 0 % | Scroll-Anfang | erstes Pixel tritt ein |
| 100 % | Scroll-Ende | letztes Pixel ist wieder draußen |
| Typisch | Lesefortschritt, Header-Effekte | Bilder oder Abschnitte beim Hereinscrollen |

Die Zeilen 0 %/100 % für `scroll()` sind eigene Formulierung; für `view()` stehen sie so in der Quelle.[^webkit]

### Parameter

- **Scroller:** `nearest` (Standard, nächster Vorfahr mit Scrollbalken), `root`, `self`.
- **Achse:** `block` (Standard), `inline`, `x`, `y`.[^webkit]

```css
animation-timeline: scroll(root block);
```

### `animation-range`

Legt fest, in welchem Abschnitt der Zeitleiste die Animation läuft. Standard ist 0 % bis 100 %. Bei `view()` bedeutet das: Das Element ist die ganze Zeit in Bewegung, solange es sichtbar ist. Mit `animation-range: 0% 50%` ist es zur Hälfte des Weges am Ziel und steht dann still – angenehmer zum Anschauen.[^webkit]

### Reihenfolge

`animation-timeline` muss **nach** der Kurzschreibweise `animation` stehen.[^webkit] Grund: Die Kurzschreibweise setzt die Zeitleiste zurück. In Chrome 152 bestätigt – steht `animation` danach, ist `animation-timeline` wieder `auto`.

### Abgrenzung zu Scroll-State-Queries

Scroll-State-Queries lösen einen Stilwechsel **aus**, wenn ein Zustand eintritt (etwa „angedockt“). Scroll-getriebene Animationen koppeln den **Fortschritt** an die Scrollposition. Welche Technik für welchen Effekt besser passt, nennt Adam Argyle „unerforschtes Terrain“.[^scroll-state] Beispiel für Scroll-State: [[navigation/sticky-header|Sticky-Header einrichten]].

## Beispiele

Bild gleitet beim Hereinscrollen ein und steht ab der Hälfte still – nach WebKit, nur mit Unterstützung und ohne reduzierte Bewegung:[^webkit]

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

WebKit schreibt `transform: translateX(100%)` und `@media not (prefers-reduced-motion)` ohne `@supports`. Die Umstellung auf `translate`, `both` und die `@supports`-Hülle sind eigene Änderungen.

## Eigene Notizen / Einordnung

**Nur als Zusatz einsetzen.** Firefox unterstützt die Funktion laut Baseline-Daten nicht. Daraus folgt:

- Inhalt darf nie von der Animation abhängen. Ein Startzustand wie `opacity: 0` gehört **in** die `@supports`-Abfrage, sonst bleibt der Inhalt in Firefox unsichtbar.
- `@supports (animation-timeline: scroll())` bzw. `view()` ist die saubere Weiche.

**Bewegung hinterfragen.** Ein dünner Fortschrittsbalken ist unkritisch. Großflächige Bewegung beim Scrollen – Einfliegen, Parallax, Zoom – ist genau das, wovor WCAG 2.3.3 warnt.[^wcag-233] Siehe [[animation/barrierearme-animationen|Barrierearme Animationen]].

Der Fortschrittsbalken ist WebKits Lehrbeispiel, aber selbst ein Grenzfall: Browser haben schon Scrollbalken.[^webkit]

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

Das Fortschrittsbalken-Beispiel oben ist an WebKit angelehnt, aber umgebaut (`inset`, `transform-origin: left`, eigenes Element statt `footer::after`). Die Vergleichstabelle und die Regel „Startzustand in `@supports`“ sind eigene Einordnung. In Chrome 152 (macOS), 2026-09-13 getestet: Der Balken folgt dem Scrollen (0 → 0,5 → 1), das Bild blendet beim Eintreten ein und ist ab der Hälfte fertig. Nicht getestet: Safari.

[^webkit]: [[quellen/artikel/scroll-driven-webkit|A guide to Scroll-driven Animations with just CSS (WebKit)]].
[^scroll-state]: [[quellen/artikel/scroll-state-chrome|CSS scroll-state() (Chrome for Developers)]], Abschnitt „Overview“.
[^wcag-233]: [[quellen/dokumente/wcag-2-3-3|Understanding SC 2.3.3 Animation from Interactions (W3C WCAG)]].
