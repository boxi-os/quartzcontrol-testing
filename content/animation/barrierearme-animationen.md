---
type: page
status: active
publish: true
title: "Barrierearme Animationen"
description: "Bewegung auf Websites so einsetzen, dass sie niemandem schadet: prefers-reduced-motion, WCAG 2.2.2 und 2.3.3, günstige Eigenschaften."
---

# Barrierearme Animationen

## Empfehlung

**Statisch zuerst, Bewegung als Zusatz.** Alles, was sich bewegt, steht in einer Media Query, die nur greift, wenn Nutzer keine reduzierte Bewegung eingestellt haben:

```css
/* statische Grundstile */
.hero-image { opacity: 1; }

@media (prefers-reduced-motion: no-preference) {
  .hero-image {
    animation: slide-in 600ms ease-out both;
  }
}
```

<a href="beispiele/barrierearm-01-statisch-zuerst.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

Dazu drei Regeln:

1. **Automatisch startende Bewegung, die länger als fünf Sekunden läuft, braucht einen Pause- oder Stopp-Mechanismus** – unabhängig von der Systemeinstellung.[^wcag-222]
2. **Große, raumgreifende Bewegung vermeiden** (Parallax, Zoom, Tiefenunschärfe); kleine, langsame Bewegung ist deutlich unkritischer.[^webkit]
3. **Nur `transform` und `opacity` animieren**, wo es geht.[^webdev]

## Begründung

- **Gesundheit:** Bewegung, die über das eigentliche Scrollen hinausgeht, kann vestibuläre Störungen auslösen – Schwindel, Übelkeit, Migräne, im Extremfall Bettruhe.[^wcag-233] Parallax-Scrolling ist das Standardbeispiel.
- **Die Einstellung existiert:** Betriebssysteme bieten „Bewegung reduzieren“ seit Langem an; `prefers-reduced-motion` macht sie in CSS und JavaScript abfragbar.[^webdev-rm]
- **WCAG:**
  - SC 2.3.3 „Animation from Interactions“ (AAA): Durch Interaktion ausgelöste Bewegung muss abschaltbar sein, außer sie ist essenziell. `prefers-reduced-motion` ist eine anerkannte Technik dafür (C39).[^wcag-233][^c39]
  - SC 2.2.2 „Pause, Stop, Hide“ (A): Automatisch startende Bewegung über fünf Sekunden neben anderem Inhalt braucht einen Mechanismus zum Anhalten.[^wcag-222]
- **Warum „statisch zuerst“:** C39 nennt beide Richtungen gleichwertig – Bewegung bei `reduce` abschalten oder nur bei `no-preference` einschalten.[^c39] Die zweite Richtung ist robuster: Wer eine Regel vergisst, erzeugt weniger statt mehr Bewegung. Das ist eigene Einordnung.
- **Performance ist auch Barrierefreiheit:** Ruckelnde sticky oder fixe Elemente nennt MDN ausdrücklich als Problem für empfindliche Menschen.[^mdn-position]

## Wann anwenden?

Immer, wenn sich etwas bewegt, das nicht direkt vom Nutzer gezogen oder gescrollt wird:

- Einblend- und Ausblend-Animationen ([[animation/ein-und-ausblenden|Ein- und Ausblenden mit CSS animieren]])
- Scroll-getriebene Effekte ([[animation/scroll-getriebene-animationen|Scroll-getriebene Animationen]])
- Seiten- und Zustandsübergänge ([[animation/view-transitions|View Transitions]])
- Hover-Effekte mit Verschiebung oder Skalierung
- Karussells, Laufschriften, Endlos-Animationen – hier zusätzlich SC 2.2.2

## Ausnahmen / Gegenbeispiele

- **Essenzielle Bewegung** ist ausgenommen, z. B. die Vorschau in einem Werkzeug zum Erstellen von Animationen.[^wcag-233]
- **Das Scrollen selbst** – neuer Inhalt kommt ins Bild – ist essenziell und steht unter Kontrolle der Nutzer.[^wcag-233]
- **„Reduziert“ heißt nicht „keine“.** Ein kurzes Überblenden der Deckkraft kann auch bei `reduce` sinnvoll bleiben, weil es Zustandswechsel verständlich macht. Bushell weist darauf hin, dass unklar ist, wie viel Reduktion genügt; „keine Bewegung“ sei die sichere Wahl.[^bushell] Die Einordnung von Deckkraft als unkritisch ist eigene Einschätzung, gestützt auf die WebKit-Unterscheidung zwischen kleiner und raumgreifender Bewegung.[^webkit]
- **Kleine Fortschrittsanzeigen** hält WebKit für unbedenklich genug, um sie nicht in die Media Query zu legen.[^webkit]

## Checkliste

- [ ] Jede Bewegung steht in `@media (prefers-reduced-motion: no-preference)` oder hat eine `reduce`-Variante.
- [ ] Die Seite funktioniert und ist vollständig lesbar, wenn keine einzige Animation läuft (Startzustände wie `opacity: 0` nur **innerhalb** der Media Query).
- [ ] Automatisch laufende Bewegung über fünf Sekunden hat Pause/Stopp oder lässt sich ausblenden.
- [ ] Kein Parallax, keine großen Zoom- oder Tiefeneffekte ohne Abschaltmöglichkeit.
- [ ] Animiert werden `transform`/`opacity`; Layout-Eigenschaften nur bewusst.
- [ ] `will-change` nur gezielt, nicht pauschal.
- [ ] Skript-Animationen reagieren auf `matchMedia('(prefers-reduced-motion: reduce)')` und dessen Änderungen.[^webdev-rm]
- [ ] Mit aktivierter Systemeinstellung „Bewegung reduzieren“ getestet (Prüfschritt aus C39).[^c39]

JavaScript-Variante für Skript-Animationen:

```js
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function applyMotionPreference() {
  document.documentElement.classList.toggle("reduce-motion", reduceMotion.matches);
}

applyMotionPreference();
reduceMotion.addEventListener("change", applyMotionPreference);
```

Das Muster mit Listener stammt sinngemäß aus web.dev; die Klasse am Wurzelelement ist eigene Ergänzung. Nur die Syntax ist geprüft: Die Einstellung „Bewegung reduzieren“ ließ sich im Chrome-Test nicht umschalten, die `reduce`-Zweige aller Notizen sind daher ungetestet.

## Quellen / Erfahrungen

- [[quellen/dokumente/wcag-2-3-3|Understanding SC 2.3.3 Animation from Interactions (W3C WCAG)]] — Kriterium, vestibuläre Störungen, Ausnahmen
- [[quellen/dokumente/wcag-2-2-2|Understanding SC 2.2.2 Pause, Stop, Hide (W3C WCAG)]] — Fünf-Sekunden-Regel
- [[quellen/dokumente/wcag-c39|Technique C39 prefers-reduced-motion (W3C WCAG)]] — beide Richtungen der Media Query, Testschritte
- [[quellen/artikel/prefers-reduced-motion-webdev|prefers-reduced-motion – Sometimes less movement is more (web.dev)]] — Hintergrund, JavaScript
- [[quellen/artikel/scroll-driven-webkit|A guide to Scroll-driven Animations with just CSS (WebKit)]] — kleine vs. raumgreifende Bewegung
- David Bushell, „Declarative Dialog Menu with Invoker Commands“ (siehe Fußnote) — „reduziert ist nicht keine“
- [[quellen/artikel/performante-animationen-webdev|How to create high-performance CSS animations (web.dev)]] — günstige Eigenschaften, `will-change`
- [[quellen/artikel/position-mdn|position CSS-Eigenschaft (MDN)]] — Ruckeln als Barrierefreiheitsproblem

Eigene Erfahrungen liegen nicht vor. „Statisch zuerst“ als Vorzug und die Einordnung von Deckkraft-Übergängen sind eigene Einschätzung.

[^wcag-222]: [[quellen/dokumente/wcag-2-2-2|Understanding SC 2.2.2 Pause, Stop, Hide (W3C WCAG)]], Wortlaut des Kriteriums.
[^wcag-233]: [[quellen/dokumente/wcag-2-3-3|Understanding SC 2.3.3 Animation from Interactions (W3C WCAG)]], Abschnitte „Success Criterion“, „Intent“ und „Examples“.
[^c39]: [[quellen/dokumente/wcag-c39|Technique C39 prefers-reduced-motion (W3C WCAG)]].
[^webdev-rm]: [[quellen/artikel/prefers-reduced-motion-webdev|prefers-reduced-motion – Sometimes less movement is more (web.dev)]].
[^webkit]: [[quellen/artikel/scroll-driven-webkit|A guide to Scroll-driven Animations with just CSS (WebKit)]], Abschnitte zum Fortschrittsbalken und zu `view()`.
[^webdev]: [[quellen/artikel/performante-animationen-webdev|How to create high-performance CSS animations (web.dev)]].
[^mdn-position]: [[quellen/artikel/position-mdn|position CSS-Eigenschaft (MDN)]], Abschnitt „Accessibility“.
[^bushell]: David Bushell, „Declarative Dialog Menu with Invoker Commands“, dbushell.com, 12.02.2026, <https://dbushell.com/2026/02/12/declarative-dialog-menu-invoker-commands/>, Abschnitt „Fancy styles“.
