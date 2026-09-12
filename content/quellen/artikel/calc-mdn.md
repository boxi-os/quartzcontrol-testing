---
type: page
status: active
publish: true
title: "calc() CSS-Funktion (MDN)"
description: "Quellennotiz zur MDN-Referenz von calc(): formale Syntax, Verschachtelung und Einheitenbehandlung."
authors: []
publisher: "MDN Web Docs"
source_published:
url: "https://developer.mozilla.org/de/docs/Web/CSS/Reference/Values/calc"
archive_url:
source_kind: secondary
---

# calc() CSS-Funktion (MDN)

## Quelle / bibliografische Angaben

Referenzseite von MDN Web Docs zur CSS-Funktion `calc()`, deutschsprachige Übersetzung.

- URL: <https://developer.mozilla.org/de/docs/Web/CSS/Reference/Values/calc>, abgerufen 2026-09-03
- Kein Autor und kein Publikationsdatum auf der Seite ausgewiesen; MDN-Referenzseiten werden kollektiv gepflegt. Das Änderungsdatum steht nur in der Versionsgeschichte des Repositorys und wurde hier nicht nachgeschlagen.
- Erfasst über den Obsidian Web Clipper; ausgewertet wurde der geclippte Text, nicht die Live-Seite. Die Abschnitte „Browser-Kompatibilität" und die interaktiven Beispiele sind im Clip leer.
- Angegebene Spezifikation: CSS Values and Units Module Level 4, Abschnitt `calc-func` (<https://drafts.csswg.org/css-values/#calc-func>)

## Kurzfassung

Die formale Referenz zu `calc()`: erlaubte Ergebnistypen, Operatoren, Regeln für Einheiten und die formale Grammatik. Deutlich präziser als die Blog-Darstellungen zum selben Thema und die richtige Adresse für Grenzfälle.

## Kernaussagen

- **Baseline:** laut Seite „weitgehend verfügbar", browserübergreifend seit Juli 2015. Der Zusatz „Einige Teile dieser Funktion werden möglicherweise unterschiedlich gut unterstützt" steht ausdrücklich dabei — er zielt vermutlich auf die neueren Teile (typisierte Arithmetik, Farbkanäle), das sagt die Seite aber nicht.
- **Zulässige Ergebnistypen:** `<length>`, `<frequency>`, `<angle>`, `<time>`, `<flex>`, `<resolution>`, `<percentage>`, `<number>`, `<integer>` sowie Mischtypen wie `<length-percentage>`.
- **`calc()` ersetzt immer den vollständigen Wert, nie nur die Zahl.** `calc(100 / 4)%` ist ungültig, `calc(100% / 4)` gültig.
- **Der Ergebnistyp muss zum Kontext passen.** `margin: calc(1px + 2px)` ist gültig, `margin: calc(1 + 2)` nicht — das entspräche `margin: 3` und wird ignoriert.
- **Rundung bei erwartetem `<integer>`:** `calc(1.4)` → `1`; bei genau `.5` wird Richtung positiv unendlich gerundet, also `calc(1.5)` → `2`, `calc(-1.5)` → `-1`.
- **Gleitkomma nach IEEE 754**, mit den Schlüsselwörtern `e`, `pi`, `infinity`, `-infinity`, `NaN` (siehe `<calc-keyword>`).
- **Keine Berechnung auf intrinsischen Größen** wie `auto` oder `fit-content`. Dafür ist `calc-size()` vorgesehen.
- **Verschachtelung ist erlaubt**, innere `calc()` wirken wie Klammern. Beispiel: `--width-c: calc(var(--width-b) / 2)` löst am Ende zu `calc((100px / 2) / 2)` = `25px` auf.
- **Typisierte Arithmetik:** Bei Multiplikation darf nur ein Operand eine Einheit tragen (`200px * 4px` ergäbe px², sinnlos). Division mit Einheiten auf beiden Seiten ist dagegen zulässig, wenn beide vom selben Datentyp sind: `200px / 4px` → `50`, `100vw / 1px` → einheitsloser Wert.
- **Farbkanäle in relativen Farben:** `calc()` kann direkt auf Kanal-Schlüsselwörter rechnen, z. B. `lch(from rebeccapurple l c calc(h + 80))`.
- **Barrierefreiheit:** Wird `calc()` für Textgrößen genutzt, muss mindestens ein Operand eine relative Einheit sein, sonst skaliert der Text beim Zoomen nicht — Beispiel der Seite: `font-size: calc(1.5rem + 3vw)`.
- **Formale Grammatik:** `<calc-sum>` = Produkte, verbunden mit `+`/`-`; `<calc-product>` = Werte, verbunden mit `*`/`/`; `<calc-value>` = Zahl, Dimension, Prozentwert, Schlüsselwort oder geklammerte Summe.

## Eigene Einordnung

Von den drei `calc()`-Quellen im Vault ist diese die einzige, die Grenzfälle sauber beschreibt: Rundung, Typkompatibilität, Multiplikation vs. Division mit Einheiten. Die deutschen Blogartikel bleiben bei „Grundrechenarten und Leerzeichen".

Zwei Punkte fallen auf:

- Die Seite nennt bei `*` und `/` nur die Empfehlung, Leerzeichen zu setzen, und begründet nicht — anders als [[quellen/artikel/calc-mediaevent|CSS calc – Rechnen mit gemischten CSS-Einheiten]] —, warum sie bei `+` und `-` zwingend sind. Beide Aussagen widersprechen sich nicht, sie ergänzen sich.
- Die typisierte Arithmetik (Division mit Einheiten auf beiden Seiten) und `calc-size()` sind neuere Ergänzungen. Wie breit sie tatsächlich unterstützt werden, ist hier nicht geprüft; die Baseline-Angabe „seit Juli 2015" gilt für den Kern der Funktion, nicht für diese Teile.

Die Übersetzung ist an einzelnen Stellen holprig („Layou-Tabellen", ein verunglückter Satz zu Prozentwerten). Inhaltlich ist das unkritisch, im Zweifel hilft die englische Fassung.

## Verknüpftes Wissen

- [[grundlagen/berechnungen|CSS calc()]] — verdichtetes Wissen
- [[quellen/artikel/calc-mediaevent|CSS calc – Rechnen mit gemischten CSS-Einheiten]] — MediaEvent, praxisnäher
- [[quellen/artikel/calc-kulturbanause|Die CSS calc()-Funktion – Berechnungen mit CSS]] — kulturbanause, Layoutbeispiele
- [[grundlagen/variablen|CSS Custom Properties]] — `calc()` ist der Weg, Variablen rechenbar zu machen
- [[quellen/artikel/relative-farbangaben|Relative Farbangaben (SELFHTML)]] — `calc()` auf Farbkanälen

## Offene Fragen

- Welche Teile von `calc()` sind mit dem Baseline-Sternchen gemeint? Der Clip enthält die Kompatibilitätstabelle nicht.
- Browsersupport von `calc-size()` und der typisierten Arithmetik — nicht geprüft.
