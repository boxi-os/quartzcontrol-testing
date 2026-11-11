---
type: page
status: active
publish: true
title: "Hauptnavigation semantisch aufbauen"
description: "Die Hauptnavigation einer Website mit nav, Liste, aria-current und Skip-Link aufbauen – ohne ARIA-Menürollen."
applies_to:
  - "Baseline-Angaben nach web-features 3.38.0, Stand 2026-09-12"
  - "Beispiele getestet in Chrome 152"
---

# Hauptnavigation semantisch aufbauen

## Ziel

Eine Hauptnavigation, die Screenreader als Navigation erkennen, die man mit der Tastatur schnell überspringen kann, die den aktuellen Punkt markiert und die bei jeder Bildschirmbreite gleich aufgebaut ist.

Untermenüs und Mobilmenü sind eigene Anleitungen: [[navigation/dropdown-navigation|Dropdown-Navigation mit Disclosure-Buttons bauen]], [[navigation/mobilmenue|Mobile-Menü ohne Checkbox-Hack bauen]].

## Voraussetzungen

- Kein JavaScript nötig.
- Die Seite hat einen Hauptinhalt in `main`.

## Getestet mit / Stand

Stand 2026-09-12. Die Regeln stammen von W3C WAI, APG und WebAIM (siehe Quellen). **Am 2026-09-13 in Chrome 152 (macOS) getestet:** Das CSS greift vollständig, der Skip-Link liegt oberhalb des Viewports und erscheint, sobald er den Fokus bekommt, und `[aria-current]` greift. **Nicht getestet:** Firefox, Safari, Screenreader. Alle verwendeten Features sind laut `web-features` 3.38.0 Baseline *widely available*.

## Vorgehen

1. **Skip-Link als erstes Element im `body`.** Er springt zum Hauptinhalt und bleibt versteckt, bis er per Tastatur den Fokus bekommt. Aber nicht mit `display: none` oder `hidden` verstecken, denn dann ist er mit der Tastatur nicht mehr erreichbar.[^webaim]

   ```html
   <a class="skip-link" href="#inhalt">Direkt zum Inhalt</a>
   ```

2. **`nav` als Landmark mit Namen.** Über das Label lassen sich mehrere Navigationen (Haupt-, Fuß-, Breadcrumb-Navigation) auseinanderhalten.[^wai-structure]

   ```html
   <header class="site-header">
     <a href="/" class="logo">Beispiel</a>
     <nav aria-label="Hauptmenü">
       …
     </nav>
   </header>
   ```

   Das Wort „Navigation“ gehört nicht ins Label, denn Screenreader sagen die Rolle ohnehin an. Der Hinweis stammt aus Rückmeldungen von Lesern, die David Bushell in einem Blogartikel wiedergibt (dbushell.com, 12.02.2026).

3. **Links als ungeordnete Liste.** Dann können assistive Technologien ansagen, wie viele Punkte es gibt.[^wai-structure]

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

4. **Die aktuelle Seite mit `aria-current="page"` markieren** und das Aussehen direkt an das Attribut hängen, statt eine zusätzliche Klasse zu pflegen.[^apg] Als Alternative nennt WAI unsichtbaren Text und ein `span` statt eines Links.[^wai-structure]

5. **Keine `menu`- oder `menuitem`-Rollen.** Diese Rollen versprechen eine Tastaturbedienung wie in Desktop-Programmen, die eine Navigation auf einer Website nicht hat.[^apg]

6. **Layout per Flexbox mit Umbruch** und mit deutlichem Fokusstil:

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

   <a href="beispiele/hauptnavigation-01-linkliste.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

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

   <a href="beispiele/hauptnavigation-02-skip-link.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

8. **Ziel des Skip-Links** ist `main`:

   ```html
   <main id="inhalt">…</main>
   ```

9. **Bei allen Breakpoints gleich bleiben.** Einträge dürfen in Untermenüs wandern, aber die sichtbaren Punkte behalten Reihenfolge, Wortlaut und Ziel.[^wai-structure]

## Warum funktioniert das?

- `nav` erzeugt ein Landmark. Screenreader können direkt dorthin springen, und mit dem Label ist klar, *welche* Navigation gemeint ist.
- Die Liste liefert Struktur und Anzahl, ganz ohne ARIA.
- `aria-current="page"` gibt den Zustand an assistive Technologien weiter. Weil das CSS am Attribut ansetzt, passen Aussehen und Zustand automatisch zusammen. Dasselbe Prinzip nutzt das APG für `aria-expanded`.[^apg]
- Der Skip-Link erfüllt WCAG 2.4.1 „Bypass Blocks“ auch für Menschen, die sehen und mit der Tastatur arbeiten. `main` allein würde das Kriterium formal erfüllen, hilft ihnen ohne Screenreader aber kaum.[^webaim]

## Fallstricke

- **Skip-Link mit `display: none` versteckt:** Dann ist er für niemanden erreichbar. Auch 0 Pixel Größe oder volle Transparenz sind problematisch.[^webaim]
- **Skip-Link zu kurz sichtbar:** Wer schnell tabbt, übersieht ihn. WebAIM schlägt eine auffällige Gestaltung vor, und eine Transition kann ihn länger sichtbar halten.[^webaim]
- **`translate` statt `transform` im Beispiel:** Das ist die einzelne Transform-Eigenschaft, Baseline *widely available*. Wer am Element schon `transform` setzt, muss beides zusammen im Blick haben.
- **Mehrere `nav` ohne Namen:** Screenreader listen dann mehrere Navigationen mit demselben Namen auf.
- **Untermenüs, die nur beim Hover aufgehen:** gehören nicht in diese Anleitung, sind aber der häufigste Fehler im nächsten Schritt, siehe [[navigation/dropdown-navigation|Dropdown-Navigation mit Disclosure-Buttons bauen]].

## Siehe auch

- [[navigation/dropdown-navigation|Dropdown-Navigation mit Disclosure-Buttons bauen]]
- [[navigation/mobilmenue|Mobile-Menü ohne Checkbox-Hack bauen]]
- [[navigation/sticky-header|Sticky-Header einrichten]]

## Quellen

- [[quellen/dokumente/menus-tutorial-wai|Menus Tutorial (W3C WAI)]] — Liste, Label, aktueller Punkt, Konsistenz über Breakpoints
- [[quellen/dokumente/disclosure-navigation-apg|Example Disclosure Navigation Menu (W3C APG)]] — keine `menu`-Rolle, `aria-current`, Attributselektoren
- [[quellen/artikel/skip-links-webaim|Skip Navigation Links (WebAIM)]] — Skip-Link, Verstecken, WCAG 2.4.1
- David Bushell, „Declarative Dialog Menu with Invoker Commands“, <https://dbushell.com/2026/02/12/declarative-dialog-menu-invoker-commands/> — Hinweis zu Label-Wortlaut aus zitiertem Feedback

Die CSS-Beispiele (Flexbox-Layout, Skip-Link per `translate`, Stil über `[aria-current]`) habe ich selbst nach den Regeln umgesetzt, sie stammen nicht aus den Quellen.

[^webaim]: [[quellen/artikel/skip-links-webaim|Skip Navigation Links (WebAIM)]], Abschnitte „Temporarily hidden skip links“ und „WCAG conformance“.
[^wai-structure]: [[quellen/dokumente/menus-tutorial-wai|Menus Tutorial (W3C WAI)]], Seite „Structure“.
[^apg]: [[quellen/dokumente/disclosure-navigation-apg|Example Disclosure Navigation Menu (W3C APG)]], „About This Example“ und Attributtabelle.
