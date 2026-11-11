---
type: page
status: active
publish: true
title: "Formularfehler erst nach der Eingabe anzeigen"
description: "Formularfelder erst dann als fehlerhaft markieren, wenn jemand sie ausgefüllt hat: :user-invalid und :user-valid statt :invalid, Fehlermeldung per :has()."
applies_to:
  - "Baseline-Angaben nach web-features 3.43.0, Stand 2026-10-18"
  - "Verhalten getestet in Chrome 155"
---

# Formularfehler erst nach der Eingabe anzeigen

## Ziel

Ein Pflichtfeld soll nicht schon beim Laden der Seite rot leuchten, sondern erst, wenn jemand es falsch ausgefüllt und verlassen hat. Wird der Fehler korrigiert, soll die Markierung sofort verschwinden. Das alles ohne JavaScript.

## Voraussetzungen

- Die Regeln für gültige Eingaben stehen im HTML: `required`, `type="email"`, `minlength`, `pattern`, `min`/`max` usw. Daraus leitet der Browser ab, ob ein Feld gültig ist.
- `:user-invalid` und `:user-valid` sind Baseline *widely available* seit 2026-05-02.

## Getestet mit / Stand

Stand 2026-10-18. Alle Schritte habe ich in **Chrome 155** nachgestellt, Firefox und Safari nicht. Screenreader habe ich nicht getestet.

## Vorgehen

### Warum nicht einfach :invalid?

`:invalid` prüft nur den aktuellen Wert. Ein leeres Pflichtfeld ist ungültig, also trifft `:invalid` schon beim Laden der Seite, bevor überhaupt jemand etwas eingegeben hat. Das Formular begrüßt einen dann mit lauter roten Rahmen.[^webdev]

`:user-invalid` trifft erst, wenn die Person mit dem Feld etwas gemacht hat. Früher musste man das per JavaScript nachbauen: Ausgangswert merken, Fokus verfolgen, Änderungen prüfen, Klasse setzen.[^webdev]

### 1. Felder im HTML beschreiben

```html
<form>
  <div class="feld">
    <label for="mail">E-Mail</label>
    <input id="mail" type="email" required aria-describedby="mail-hinweis">
    <p id="mail-hinweis" class="hinweis">Zum Beispiel name@example.org</p>
    <p class="fehler">Bitte eine gültige E-Mail-Adresse eingeben.</p>
  </div>
  <button>Absenden</button>
</form>
```

### 2. Fehler und Erfolg markieren

```css
input:user-invalid {
  border-color: crimson;
}
input:user-valid {
  border-color: seagreen;
}
```

### 3. Fehlermeldung einblenden

Mit `:has()` reagiert das umgebende `.feld` auf den Zustand des Eingabefelds und blendet den Fehlertext ein:

```css
.fehler { display: none; color: crimson; }

.feld:has(input:user-invalid) .fehler {
  display: block;
}
```

<a href="beispiele/formular-01-user-invalid.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

### 4. Das Zusammenspiel verstehen

So verhält sich `:user-invalid` im Detail, laut MDN und in Chrome 155 genauso beobachtet:[^mdn-valid][^mdn-invalid]

| Situation | Ergebnis |
| --- | --- |
| Seite geladen, Pflichtfeld leer | keine Markierung |
| Person tippt Ungültiges, ist noch im Feld | noch keine Markierung |
| Person verlässt das Feld mit ungültigem Wert | Fehler (`:user-invalid`) |
| Person kehrt zurück und korrigiert | **sofort** gültig, schon während des Tippens |
| Feld war gültig, Person ändert es, bleibt im Feld | noch keine Markierung, erst beim Verlassen |
| Absendeversuch | alle ungültigen Felder markiert, auch unberührte |

Das ist genau das Verhalten, das man sich wünscht: Beim ersten Ausfüllen wird man nicht unterbrochen, beim Korrigieren gibt es aber sofort Entwarnung.

### 5. Mit eigener Fehlerbehandlung: novalidate

Ohne weitere Angaben zeigt der Browser beim Absenden eine eigene Fehlerblase und schickt das Formular nicht ab. Wer das selbst übernehmen will, setzt `novalidate` an das Formular. In Chrome 155 habe ich dabei Folgendes beobachtet:

- Das Formular wird abgeschickt, das `submit`-Event feuert also trotz ungültiger Felder.
- `:user-invalid` greift trotzdem nach dem Absendeversuch.

Damit kann man die CSS-Markierung behalten und im `submit`-Handler mit `form.checkValidity()` selbst entscheiden, ob gesendet wird. Ob Firefox und Safari sich genauso verhalten, habe ich nicht geprüft.

<a href="beispiele/formular-02-novalidate.htm" target="_blank" rel="noopener">↗ Beispiel in neuem Tab öffnen</a>

## Warum funktioniert das?

Der Browser kennt aus den HTML-Attributen die Regeln für jedes Feld (Constraint Validation) und merkt sich zusätzlich, ob die Person schon damit gearbeitet hat. `:user-invalid` ist die Kombination aus beidem: ungültig **und** schon bearbeitet. Nach der ersten Markierung prüft der Browser bei jedem Tastendruck neu, deshalb verschwindet der Fehler beim Korrigieren sofort.[^mdn-valid]

## Fallstricke

- **Farbe allein reicht nicht.** Ein roter Rahmen ist für Menschen mit Farbsehschwäche schwer zu erkennen. Deshalb gehört ein Text dazu (Schritt 3) oder zumindest ein Symbol. (Eigene Ergänzung, nicht aus den Quellen.)
- **Eingeblendeter Text wird nicht automatisch vorgelesen.** Wenn per CSS ein Fehlertext erscheint, bekommen Screenreader das nicht unbedingt mit. Für eine verlässliche Ansage braucht es `aria-describedby` auf den Fehlertext oder eine Live-Region, und dafür meist doch etwas JavaScript. (Eigene Einordnung, nicht getestet.)
- **`:user-valid` sparsam einsetzen.** Grüne Haken an jedem Feld sind oft eher Lärm als Hilfe. Bei Feldern mit kniffligen Regeln (Passwort, IBAN) sind sie dagegen nützlich. (Eigene Einordnung.)
- **Gilt nur für Felder mit Regeln.** Ein Feld ohne `required`, `type` oder `pattern` ist nie ungültig, also trifft auch `:user-invalid` nie.

### Browsersupport

Laut `web-features` 3.43.0 (abgefragt 2026-10-18): Baseline *widely available* seit 2026-05-02 (*newly available* seit 2023-11-02), Chrome/Edge 119, Firefox 88, Safari 16.5.

## Siehe auch

- [[selektoren/nach-inhalt-auswaehlen|Elemente anhand ihres Inhalts auswählen]] – weitere Zustände mit `:has()`
- [[selektoren/has|CSS-Pseudoklasse has()]]
- [[komponenten/fokusstile|Sichtbare Fokusstile]]

## Quellen

- [[quellen/artikel/user-invalid-mdn|user-invalid Pseudoklasse (MDN)]] — Definition, Verhalten nach dem Absendeversuch, Beispiel mit Symbol
- [[quellen/artikel/user-valid-mdn|user-valid Pseudoklasse (MDN)]] — genaue Regeln, wann neu geprüft wird
- [[quellen/artikel/user-valid-webdev|The user-valid and user-invalid pseudo-classes (web.dev)]] — Vergleich mit `:invalid`, welcher JavaScript-Aufwand wegfällt

Eigene Ergänzungen: die Tabelle (aus MDN abgeleitet und in Chrome 155 nachgeprüft), das Verhalten mit `novalidate` (nur beobachtet, nicht aus den Quellen) und die Fallstricke zu Farbe, Screenreadern und `:user-valid`.

[^mdn-invalid]: [[quellen/artikel/user-invalid-mdn|user-invalid Pseudoklasse (MDN)]], Einleitung, Stand 2026-10-14.
[^mdn-valid]: [[quellen/artikel/user-valid-mdn|user-valid Pseudoklasse (MDN)]], Einleitung mit Aufzählung der Auslöser, Stand 2026-10-14.
[^webdev]: [[quellen/artikel/user-valid-webdev|The user-valid and user-invalid pseudo-classes (web.dev)]], Abschnitte „The user interaction pseudo-class selectors“ und „Better user experience with less code“, 2023-11-08.
