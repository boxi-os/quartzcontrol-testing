---
type: page
status: active
publish: true
title: "Hauptnavigation semantisch aufbauen"
description: "Die Hauptnavigation einer Website mit nav, Liste, aria-current und Skip-Link aufbauen – ohne ARIA-Menürollen."
---

# Hauptnavigation semantisch aufbauen

## Ziel

Eine Hauptnavigation, die Screenreader als Navigation erkennen, die per Tastatur schnell übersprungen werden kann, den aktuellen Punkt kennzeichnet und bei jeder Bildschirmbreite gleich aufgebaut bleibt.

Untermenüs und Mobilmenü sind eigene Anleitungen: [[navigation/dropdown-navigation|Dropdown-Navigation mit Disclosure-Buttons bauen]], [[navigation/mobilmenue|Mobile-Menü ohne Checkbox-Hack bauen]].

## Voraussetzungen

- Kein JavaScript nötig.
- Die Seite hat einen Hauptinhalt in `main`.

## Getestet mit / Stand

Stand 2026-09-12. Die Regeln stammen aus W3C WAI, APG und WebAIM (siehe Quellen). **In Chrome 152 (macOS), 2026-09-13 getestet:** Das CSS wird vollständig übernommen, der Skip-Link liegt oberhalb des Viewports und erscheint bei Fokus, `[aria-current]` greift. **Nicht getestet:** Firefox, Safari, Screenreader. Alle verwendeten Features sind laut `web-features` 3.38.0 Baseline *widely available*.

## Vorgehen

1. **Skip-Link als erstes Element im `body`.** Er springt zum Hauptinhalt und ist bis zum Tastaturfokus versteckt – aber nicht mit `display: none` oder `hidden`, denn das nimmt ihn aus der Tastaturnavigation.[^webaim]

   ```html
   <a class="skip-link" href="#inhalt">Direkt zum Inhalt</a>
   ```

2. **`nav` als Landmark, mit Namen.** Das Label unterscheidet mehrere Navigationen (Haupt-, Fuß-, Breadcrumb-Navigation) voneinander.[^wai-structure]

   ```html
   <header class="site-header">
     <a href="/" class="logo">Beispiel</a>
     <nav aria-label="Hauptmenü">
       …
     </nav>
   </header>
   ```

   Das Wort „Navigation“ gehört nicht ins Label; Screenreader sagen die Rolle ohnehin an. Der Hinweis stammt aus Leserfeedback, das David Bushell in einem Blogartikel wiedergibt (dbushell.com, 12.02.2026).

3. **Links als ungeordnete Liste.** So können assistive Technologien die Anzahl der Punkte ansagen.[^wai-structure]

   ```html
   <nav aria-label="Hauptmenü">
     <ul class="nav-list">
       <li><a href="/">Start</a></li>
       <li><a href="/leistungen/" aria-current="page">Leistungen</a></li>
       <li><a href="/blog/">Blog</a></li>
       <li><a href="/kontakt/">Kontakt</a></li>
     </ul>
   </nav>
   ```

4. **Aktuelle Seite mit `aria-current="page"` markieren** und die Optik direkt an das Attribut hängen, statt eine zusätzliche Klasse zu pflegen.[^apg] Alternativ nennt WAI unsichtbaren Text plus `span` statt Link.[^wai-structure]

5. **Keine `menu`- oder `menuitem`-Rollen.** Diese Rollen versprechen Tastaturverhalten wie in Desktop-Programmen, das eine Seitennavigation nicht hat.[^apg]

6. **Layout per Flexbox mit Umbruch** und deutlichem Fokusstil:

   ```css
   .nav-list {
     display: flex;
     flex-wrap: wrap;
     gap: 0.5rem 1.5rem;
     list-style: none;
     margin: 0;
     padding: 0;
   }

   .nav-list a {
     display: block;
     padding: 0.5rem 0.25rem;
   }

   .nav-list a[aria-current="page"] {
     font-weight: 700;
     text-decoration: underline;
     text-underline-offset: 0.3em;
   }

   .nav-list a:focus-visible {
     outline: 2px solid currentColor;
     outline-offset: 2px;
   }
   ```

7. **Skip-Link sichtbar machen, sobald er fokussiert ist:**

   ```css
   .skip-link {
     position: absolute;
     inset-inline-start: 1rem;
     inset-block-start: 0;
     translate: 0 -100%;
   }

   .skip-link:focus {
     translate: 0 0;
   }
   ```

8. **Ziel des Skip-Links** ist `main`:

   ```html
   <main id="inhalt">…</main>
   ```

9. **Über alle Breakpoints gleich bleiben.** Einträge dürfen in Untermenüs wandern, aber sichtbare Punkte behalten Reihenfolge, Wortlaut und Ziel.[^wai-structure]

## Warum funktioniert das?

- `nav` erzeugt ein Landmark. Screenreader springen direkt dorthin; mit Label ist klar, *welche* Navigation gemeint ist.
- Die Liste liefert Struktur und Anzahl, ohne ARIA.
- `aria-current="page"` gibt den Zustand an assistive Technologien weiter. Der Attributselektor im CSS hält Optik und Zustand automatisch synchron – dasselbe Prinzip nutzt das APG für `aria-expanded`.[^apg]
- Der Skip-Link erfüllt WCAG 2.4.1 „Bypass Blocks“ auch für sehende Tastaturnutzer. `main` allein würde das Kriterium formal erfüllen, hilft ihnen ohne Screenreader aber kaum.[^webaim]

## Fallstricke

- **Skip-Link mit `display: none` versteckt:** Dann ist er für niemanden erreichbar. Auch 0 Pixel Größe oder volle Transparenz sind problematisch.[^webaim]
- **Skip-Link zu kurz sichtbar:** Wer schnell tabbt, übersieht ihn. WebAIM schlägt eine deutliche Gestaltung vor; eine Transition kann ihn länger sichtbar halten.[^webaim]
- **`translate` statt `transform` im Beispiel:** Das ist die einzelne Transform-Eigenschaft, Baseline *widely available*. Wer bereits `transform` am Element setzt, muss beides zusammen denken.
- **Mehrere unbenannte `nav`:** Screenreader listen dann mehrere gleichnamige Navigationen.
- **Hover-only-Untermenüs:** gehören nicht in diese Anleitung, sind aber der häufigste Fehler danach, siehe [[navigation/dropdown-navigation|Dropdown-Navigation mit Disclosure-Buttons bauen]].

## Siehe auch

- [[navigation/dropdown-navigation|Dropdown-Navigation mit Disclosure-Buttons bauen]]
- [[navigation/mobilmenue|Mobile-Menü ohne Checkbox-Hack bauen]]
- [[navigation/sticky-header|Sticky-Header einrichten]]

## Quellen

- [[quellen/dokumente/menus-tutorial-wai|Menus Tutorial (W3C WAI)]] — Liste, Label, aktueller Punkt, Konsistenz über Breakpoints
- [[quellen/dokumente/disclosure-navigation-apg|Example Disclosure Navigation Menu (W3C APG)]] — keine `menu`-Rolle, `aria-current`, Attributselektoren
- [[quellen/artikel/skip-links-webaim|Skip Navigation Links (WebAIM)]] — Skip-Link, Verstecken, WCAG 2.4.1
- David Bushell, „Declarative Dialog Menu with Invoker Commands“, <https://dbushell.com/2026/02/12/declarative-dialog-menu-invoker-commands/> — Hinweis zu Label-Wortlaut aus zitiertem Feedback

Die CSS-Beispiele (Flexbox-Layout, Skip-Link per `translate`, Stil über `[aria-current]`) sind eigene Umsetzung der Regeln, nicht aus den Quellen übernommen.

[^webaim]: [[quellen/artikel/skip-links-webaim|Skip Navigation Links (WebAIM)]], Abschnitte „Temporarily hidden skip links“ und „WCAG conformance“.
[^wai-structure]: [[quellen/dokumente/menus-tutorial-wai|Menus Tutorial (W3C WAI)]], Seite „Structure“.
[^apg]: [[quellen/dokumente/disclosure-navigation-apg|Example Disclosure Navigation Menu (W3C APG)]], „About This Example“ und Attributtabelle.
