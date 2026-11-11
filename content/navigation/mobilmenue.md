---
type: page
status: active
publish: true
title: "Mobile-Menü ohne Checkbox-Hack bauen"
description: "Ein Hamburger- bzw. Off-Canvas-Menü mit dialog oder popover bauen statt mit dem Checkbox-Hack – mit Entscheidungshilfe."
applies_to:
  - "Baseline-Angaben nach web-features 3.38.0, Stand 2026-09-12"
  - "Beispiele getestet in Chrome 152"
---

# Mobile-Menü ohne Checkbox-Hack bauen

## Ziel

Ein aufklappbares Menü für kleine Bildschirme, bei dem Fokus, `Esc`, die Ansage im Screenreader und das Schließen zuverlässig funktionieren, und zwar mit so wenig JavaScript wie möglich.

## Voraussetzungen

- Eine semantisch aufgebaute Linkliste, siehe [[navigation/hauptnavigation|Hauptnavigation semantisch aufbauen]].
- Für Variante A: Invoker Commands (seit 2025-12-12 Baseline *newly available*) oder das kleine Polyfill unten.
- Das Zusammenspiel von `popover` und `dialog`: [[navigation/top-layer|Top Layer mit popover und dialog]].

## Getestet mit / Stand

Stand 2026-09-13. **Variante A in Chrome 152 (macOS) getestet:** Invoker Commands öffnen modal, `autofocus` landet auf „Schließen“, `Esc` schließt und gibt den Fokus an den Menü-Button zurück, Ein- und Ausblenden laufen, und das Polyfill schaltet nicht doppelt, wenn der Browser Invoker Commands selbst kann. **Am 2026-10-18 in Chrome 155 ergänzt:** die Standardbegrenzung modaler Dialoge und das Scrollen dahinter (siehe Schritt 4 und Fallstricke). **Nicht getestet:** Varianten B und C, Firefox, Safari, Mobilgeräte, Screenreader. Die Idee, ein Off-Canvas-Menü als modalen `dialog` mit Invoker Commands zu bauen, stammt aus einem Praxisbericht von David Bushell. Die Codebeispiele hier habe ich selbst geschrieben, weil seine Website unter „All Rights Reserved“ steht.

## Vorgehen

### Variante wählen

```mermaid
flowchart TD
    S["Mobilmenü"] --> Q1{"Überdeckt das Menü die Seite<br/>und soll sie dahinter gesperrt sein?"}
    Q1 -- ja --> A["A: dialog mit showModal()"]
    Q1 -- nein --> Q2{"Soll es über dem Inhalt liegen<br/>und bei Klick daneben schließen?"}
    Q2 -- ja --> B["B: popover"]
    Q2 -- "nein, es darf den Inhalt<br/>nach unten schieben" --> C["C: details / summary"]
```

Die Entscheidungsregeln habe ich aus den Eigenschaften von `dialog` und `popover` abgeleitet. Variante C beschreibt keine der ausgewerteten Quellen als Navigationsmuster.

### Variante A: Vollbild-Menü als modaler Dialog

1. **Button und Dialog:**

   ```html
   <button type="button" class="menu-button" commandfor="site-menu" command="show-modal">
     Menü
   </button>

   <dialog id="site-menu" class="menu-dialog" aria-label="Menü">
     <button type="button" class="menu-close" commandfor="site-menu" command="close" autofocus>
       Schließen
     </button>
     <nav aria-label="Hauptmenü">
       <ul>
         <li><a href="/" aria-current="page">Start</a></li>
         <li><a href="/leistungen/">Leistungen</a></li>
         <li><a href="/kontakt/">Kontakt</a></li>
       </ul>
     </nav>
   </dialog>
   ```

   `command="show-modal"` und `command="close"` sind die Invoker-Befehle für Dialoge.[^mdn-dialog] `autofocus` gehört laut MDN auf das Element, mit dem man zuerst interagiert, im Zweifel auf den Schließen-Button.[^mdn-dialog]

2. **Polyfill für Browser ohne Invoker Commands:**

   ```js
   if (!("command" in HTMLButtonElement.prototype)) {
     document.addEventListener("click", (event) => {
       const button = event.target.closest("button[commandfor]");
       if (!button) return;
       const dialog = document.getElementById(button.getAttribute("commandfor"));
       if (!(dialog instanceof HTMLDialogElement)) return;
       const command = button.getAttribute("command");
       if (command === "show-modal" && !dialog.open) dialog.showModal();
       if (command === "close" && dialog.open) dialog.close();
     });
   }
   ```

   Die Feature-Erkennung prüft die JavaScript-Eigenschaft `command` am Button, die MDN als Gegenstück zum Attribut beschreibt.[^mdn-invoker] Das Skript deckt nur Dialoge und die zwei Befehle ab. Für die volle API gibt es das Polyfill von Keith Cirkel.

3. **Ein Klick auf den Hintergrund schließt** nur mit `closedby="any"` am `dialog`.[^mdn-dialog] Laut `web-features` 3.38.0 kann Safari das nicht, dort bleiben `Esc` und der Schließen-Button. Beim Vollbild-Menü aus Schritt 4 gibt es allerdings gar keinen sichtbaren Hintergrund zum Anklicken. `closedby` wirkt nur, wenn der Dialog kleiner als der Viewport ist.

4. **Als Vollbild darstellen:**

   ```css
   .menu-dialog {
     margin: 0;
     width: 100%;
     max-width: none;
     height: 100dvh;
     max-height: none;
     border: 0;
     box-sizing: border-box;
   }
   ```

   <a href="beispiele/mobilmenue-01-vollbild-dialog.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

   `dvh` passt sich an, wenn auf Mobilgeräten die Browserleisten ein- und ausfahren.[^viewport] `max-width` und `max-height` muss man zurücksetzen, weil Browser modale Dialoge standardmäßig begrenzen. In keiner Quelle belegt, aber in Chrome 155 nachgemessen: Ein modaler Dialog hat dort `max-width` und `max-height` von `calc(100% - 38px)`. `box-sizing: border-box` ist nötig, weil `dialog` in Chrome standardmäßig `padding: 16px` hat. Ohne diese Zeile war das Menü im Test 17 × 32 Pixel größer als der Viewport.

5. **Button nur auf kleinen Bildschirmen zeigen**, sonst die normale Navigation:

   ```css
   @media (width >= 48rem) {
     .menu-button { display: none; }
   }
   @media (width < 48rem) {
     .site-header > nav { display: none; }
   }
   ```

   <a href="beispiele/mobilmenue-02-breakpoint.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

   Die Links stehen damit zweimal im HTML: sichtbar im Header und im Dialog. Das ist ein bewusster Kompromiss, damit man den Dialog nicht per CSS dauerhaft anzeigen muss. Alternativ nutzt man das Menü bei allen Breiten, so macht es Bushell.

### Variante B: Menü als Popover

```html
<button type="button" class="menu-button" popovertarget="menu-panel">Menü</button>
<nav id="menu-panel" popover aria-label="Hauptmenü">
  <ul>…</ul>
</nav>
```

<a href="beispiele/mobilmenue-03-popover.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

- Ein Klick daneben und `Esc` schließen, `aria-expanded` am Button setzt der Browser, und beim Tabben springt der Fokus in das Menü.[^mdn-popover][^hidde]
- Die Seite dahinter bleibt bedienbar: Der Fokus wird nicht festgehalten, und der Hintergrund ist nicht gesperrt. Für ein Panel, das nur einen Teil der Seite überdeckt, passt das.
- Die Position wie in [[navigation/dropdown-navigation|Dropdown-Navigation mit Disclosure-Buttons bauen]] überschreiben, sonst erscheint das Menü in der Mitte.

### Variante C: `details` / `summary`

```html
<details class="menu-disclosure">
  <summary>Menü</summary>
  <nav aria-label="Hauptmenü">
    <ul>…</ul>
  </nav>
</details>
```

<a href="beispiele/mobilmenue-04-details.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

Ohne JavaScript und ohne Top Layer: Das Menü schiebt den Inhalt nach unten. `details` ist ein natives Disclosure-Widget.[^mdn-details] Wie Screenreader `summary` als Menüschalter ansagen, habe ich nicht geprüft.

### Ein- und Ausblenden animieren

Das Menü fährt von rechts herein und blendet dabei ein, nach dem Muster aus der MDN-Referenz für `dialog`:[^mdn-dialog]

```css
@media (prefers-reduced-motion: no-preference) {
  .menu-dialog[open] {
    opacity: 1;
    translate: 0 0;
  }

  .menu-dialog {
    opacity: 0;
    translate: 2rem 0;
    transition:
      opacity 250ms ease-out,
      translate 250ms ease-out,
      overlay 250ms allow-discrete,
      display 250ms allow-discrete;
  }

  @starting-style {
    .menu-dialog[open] {
      opacity: 0;
      translate: 2rem 0;
    }
  }
}
```

<a href="beispiele/mobilmenue-05-einfahren.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

Hintergründe und Fallen: [[animation/ein-und-ausblenden|Ein- und Ausblenden mit CSS animieren]].

## Warum funktioniert das?

- `showModal()` legt den Dialog in den Top Layer, sperrt den Rest der Seite (inert) und setzt den Fokus auf das erste fokussierbare Element. `Esc` schließt.[^mdn-dialog] Genau das musste man früher für Off-Canvas-Menüs selbst bauen.
- Invoker Commands verbinden Button und Dialog ohne eigenes Skript.[^mdn-invoker]
- Beim Popover übernimmt der Browser `aria-expanded`, die Tab-Reihenfolge und das Schließen per Klick daneben (Light Dismiss).[^hidde]

### Warum nicht der Checkbox-Hack?

Beim Checkbox-Hack steuert ein verstecktes `<input type="checkbox">` mit `<label>` über `:checked`, ob das Menü sichtbar ist. Dagegen spricht (**eigene Einordnung, in keiner der ausgewerteten Quellen belegt**):

- Assistive Technologien sagen eine Checkbox an, keinen Schalter für ein Menü, und ein `aria-expanded` gibt es nicht.
- `Esc`, die Rückgabe des Fokus, das Festhalten des Fokus im Menü und das Schließen per Klick daneben fehlen und müssten ohnehin per Skript nachgebaut werden.
- Seit sich `popover` und `dialog` ohne JavaScript steuern lassen, fällt das Hauptargument „ohne JavaScript“ weg.

**Gegenbeispiel aus der Praxis:** Ein eigenes Quartz-Plugin baut sein Off-Canvas-Menü noch mit der Checkbox und zeigt, was man dafür alles nachrüsten muss. Die Checkbox hat `aria-controls` und ein `aria-expanded`, das ein Skript bei jeder Änderung anpasst. Die Labels für Burger-Icon und Hintergrund sind per `aria-hidden` versteckt. Das Skript schließt außerdem bei `Esc` und vor einem Seitenwechsel, gibt den Fokus an die Checkbox zurück, wenn er im Panel lag, und sperrt das Scrollen der Seite über eine Klasse am Wurzelelement. Den Fokus im Menü festhalten oder den Hintergrund sperren tut es nicht. Das relativiert den ersten Punkt oben: Ein `aria-expanded` lässt sich nachrüsten, eben nur per Skript. Ob Screenreader `aria-expanded` an einer Checkbox sinnvoll ansagen, habe ich nicht geprüft. Ein Kandidat für eine spätere Umstellung auf Variante A.

## Fallstricke

- **Fokusring in WebKit:** Nach `showModal()` bzw. Invoker Commands zeigt WebKit laut David Bushell den `:focus-visible`-Stil am ersten Button auch bei Mausbedienung.[^bushell] Einen Workaround nennt er, hat ihn nach eigener Aussage aber nicht getestet. In Safari habe ich das nicht nachgeprüft.
- **Kein `tabindex` an `dialog`.**[^mdn-dialog]
- **Scrollen der Seite hinter dem Dialog:** Ob ein modaler Dialog das verhindert, beschreiben die Quellen nicht. Eine verbreitete Lösung ist `body:has(dialog[open]) { overflow: hidden; }` (siehe [[selektoren/has|CSS-Pseudoklasse has()]]). In Chrome 155 am 2026-10-18 mit dem Mausrad geprüft: Ohne die Regel scrollte die Seite hinter dem offenen Dialog weiter (500 px), mit der Regel gar nicht. Ein früherer Test in Chrome 152 hatte das nicht gezeigt, weil das damalige Werkzeug vermutlich per Skript scrollte. Auf Touch-Geräten ist es noch nicht geprüft.
- **`closedby` fehlt in Safari:** Das Menü bleibt bedienbar, nur ein Klick daneben schließt dort nicht.
- **Ausblenden nicht überall animiert:** Firefox kann `display` nicht per Transition verzögern, das Menü verschwindet dort beim Schließen sofort. `overlay` gibt es nur in Chromium. Ob die Animation in Safari ohne `overlay` sichtbar abgeschnitten wird, habe ich nicht geprüft. MDN nennt den Effekt bei einfachen Animationen „möglicherweise nicht bemerkbar“.[^mdn-popover]
- **Beschriftung des Buttons:** Nur ein Icon ohne Text ist schwer verständlich, ein sichtbares Wort wie „Menü“ hilft. Zusatzwörter wie „öffnen“ im Namen können laut den Rückmeldungen, die Bushell wiedergibt, die Sprachsteuerung stören.[^bushell]
- **Doppelte Links (Variante A):** Die Menüinhalte müssen an beiden Stellen gleich gepflegt werden. Mit Templates oder Komponenten ist das kein Problem, von Hand ist es fehleranfällig.

### Browsersupport

| Feature | Stand |
| --- | --- |
| `dialog`, `inert` | Baseline *widely available* |
| `details` | Baseline *widely available* |
| Viewport-Einheiten `dvh`, `svh`, `lvh` | Baseline *widely available* (seit 2022-12-05 *newly*) |
| `popover` | Baseline *newly available* seit 2025-01-27 |
| `@starting-style`, `transition-behavior` | Baseline *newly available* seit 2024-08-06 |
| `display` animieren/transitionieren | *limited*: Chrome 117, Safari 18, Firefox fehlt |
| Invoker Commands | Baseline *newly available* seit 2025-12-12 |
| `closedby` | *limited*: Chrome 134, Firefox 141, Safari fehlt |
| `overlay` | *limited*: nur Chromium ab 117 |

Quelle: `web-features` 3.38.0 (Baseline-Daten der W3C WebDX Community Group), lokal abgefragt am 2026-09-12.

## Siehe auch

- [[navigation/top-layer|Top Layer mit popover und dialog]]
- [[navigation/hauptnavigation|Hauptnavigation semantisch aufbauen]]
- [[navigation/dropdown-navigation|Dropdown-Navigation mit Disclosure-Buttons bauen]]
- [[animation/ein-und-ausblenden|Ein- und Ausblenden mit CSS animieren]]
- [[animation/view-transitions|View Transitions]]

## Quellen

- David Bushell, Praxisbericht (siehe Fußnote) — Idee für Variante A, WebKit-Fokusfehler, Hinweis zur Beschriftung; kein Code übernommen
- [[quellen/artikel/dialog-element-mdn|dialog-Element (MDN)]] — Verhalten modaler Dialoge, `closedby`, `autofocus`
- [[quellen/artikel/invoker-commands-mdn|Invoker Commands API (MDN)]] — `command`, `commandfor`, Feature-Erkennung
- [[quellen/artikel/popover-api-mdn|Using the Popover API (MDN)]] und [[quellen/artikel/popover-accessibility-devries|On popover accessibility – what the browser does and doesn't do]] — Variante B
- [[quellen/artikel/details-element-mdn|details-Element (MDN)]] — Variante C
- [[quellen/artikel/viewport-einheiten-webdev|The large, small, and dynamic viewport units (web.dev)]] — `dvh`

Eigene Einordnung bzw. eigener Code: Entscheidungsdiagramm, alle HTML-, CSS- und JavaScript-Beispiele (Animation nach dem MDN-Muster), Variante C als Menü, Breakpoint-Umschaltung, die Kritik am Checkbox-Hack und der Hinweis zu `body:has(dialog[open])`. Das Gegenbeispiel stammt aus dem Quelltext eines eigenen Quartz-Plugins (Stand 2026-09-25), nicht aus einer externen Quelle.

[^bushell]: David Bushell, „Declarative Dialog Menu with Invoker Commands“, dbushell.com, 12.02.2026, <https://dbushell.com/2026/02/12/declarative-dialog-menu-invoker-commands/>. Abgerufen 2026-09-12; die Website steht unter „All Rights Reserved“, daher hier nur sinngemäß und ohne Code.
[^mdn-invoker]: [[quellen/artikel/invoker-commands-mdn|Invoker Commands API (MDN)]].
[^mdn-dialog]: [[quellen/artikel/dialog-element-mdn|dialog-Element (MDN)]], Abschnitte „Attributes“, „Additional notes“ und „Accessibility“.
[^mdn-popover]: [[quellen/artikel/popover-api-mdn|Using the Popover API (MDN)]].
[^hidde]: [[quellen/artikel/popover-accessibility-devries|On popover accessibility – what the browser does and doesn't do]].
[^mdn-details]: [[quellen/artikel/details-element-mdn|details-Element (MDN)]].
[^viewport]: [[quellen/artikel/viewport-einheiten-webdev|The large, small, and dynamic viewport units (web.dev)]].
