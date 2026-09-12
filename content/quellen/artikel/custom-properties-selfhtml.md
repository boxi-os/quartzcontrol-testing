---
type: page
status: active
publish: true
title: "CSS Custom properties (CSS-Variablen) (SELFHTML)"
description: "Quellennotiz zum SELFHTML-Tutorial über CSS-Variablen, von der Grundsyntax bis @property."
authors: []
publisher: "SELFHTML-Wiki"
source_published:
url: "https://wiki.selfhtml.org/wiki/CSS/Custom_properties_(CSS-Variablen)"
archive_url:
source_kind: secondary
---

# CSS Custom properties (CSS-Variablen) (SELFHTML)

## Quelle / bibliografische Angaben

Wiki-Artikel des SELFHTML-Wikis zu Custom Properties.

- Kollektiv bearbeitetes Wiki, keine Einzelautoren ausgewiesen; Autorschaft steht in der Versionsgeschichte der Seite. Siehe [[quellen/wiki-selfhtml|SELFHTML-Wiki]].
- Kein sichtbares Publikations- oder Änderungsdatum im Text. Der Artikel erwähnt `sibling-index()` und `sibling-count()`, ist also erkennbar aktuell gepflegt.
- URL: <https://wiki.selfhtml.org/wiki/CSS/Custom_properties_(CSS-Variablen)>, abgerufen 2026-09-03
- Lizenz der Wiki-Inhalte: CC BY-SA 3.0 DE
- Erfasst über den Obsidian Web Clipper; ausgewertet wurde der geclippte Text, nicht die Live-Seite. Die interaktiven Beispiele („Ausprobieren") sind im Clip nicht enthalten.

## Kurzfassung

Umfassende deutschsprachige Darstellung von Custom Properties: Syntax, `var()` mit Fallback, Registrierung über `@property`, Zusammenspiel mit Kaskade und Vererbung, dazu mehrere Anwendungsbeispiele über Farben hinaus.

## Kernaussagen

### Syntax und Grundregeln

- Der Name **muss** mit zwei Minuszeichen beginnen und ist — anders als reguläre CSS-Eigenschaften — **case-sensitive**: `--self` und `--Self` sind verschiedene Properties.
- Erlaubt sind Buchstaben, Ziffern, Minuszeichen und alle Unicode-Zeichen ab `\x80` (also auch Umlaute und Emojis), keine Leerzeichen. Zeichen mit CSS-Sonderbedeutung müssen maskiert werden.
- Der Wert ist eine weitgehend beliebige Zeichenfolge, aber: **An der Einsetzstelle muss nach dem Einsetzen gültige CSS-Syntax stehen.** Eine öffnende Klammer einer CSS-Funktion kann nicht aus dem Custom Property kommen; Wert und Einheit müssen zusammen in der Variablen stehen.
- Ein Custom Property kann nur Werte annehmen, keine Eigenschaften.
- Festlegen ist überall möglich, wo Deklarationen stehen — auch im `style`-Attribut eines Elements.

### Verwenden

- `var(--name)` bzw. `var(--name, fallback)`. Ist der Fallback selbst ungültig, greift `unset`.
- `var()` darf einzelne Bestandteile einer Sammeleigenschaft beisteuern, z. B. `border: thin solid var(--akzentfarbe)`.
- Ältere Browser ohne `var()`-Verständnis ignorieren die ganze Deklaration und rendern nach Default-Stylesheet.

### Registrieren mit `@property`

Die Deklaration ist optional. Ohne sie ist der Wertetyp unspezifiziert, das Property wird vererbt und hat keinen Anfangswert. Mit `@property` (oder `CSS.registerProperty()`) lassen sich Syntax, Vererbungsverhalten und Anfangswert festlegen. Vorteile laut Artikel:

- **Das Property wird animierbar.** Ohne Registrierung schaltet der Browser hart zwischen Keyframe-Werten um.
- Ungültige Werte werden **schon beim Zuweisen** verworfen. Ohne Registrierung wird der ungültige Wert gespeichert, überschreibt einen geerbten Wert und fällt erst bei der Verwendung auf.
- Vererbung ist steuerbar (`inherits: true|false`).
- Ein Defaultwert gilt zentral, statt bei jeder `var()`-Verwendung wiederholt zu werden.

```css
@property --textcolor { syntax: "<color>"; inherits: true; initial-value: white; }
```

### Kaskade und Auflösungszeitpunkt

- Custom Properties verhalten sich wie normale vererbbare Eigenschaften und folgen Kaskade und Spezifität.
- **Entscheidend:** `var()` wird in dem Moment aufgelöst, in dem die *umgebende* Eigenschaft auf ein Element angewendet wird. Wird die so gesetzte Eigenschaft weitervererbt, ist der Wert eingefroren.
- Beispiel des Artikels: `body { --farbe: red }`, `ul { color: var(--farbe) }`, `li { --farbe: blue }` — die `li` bleiben rot, weil `color` bereits auf dem `ul` aufgelöst wurde. Setzt man dagegen `p { color: var(--farbe) }` und die Sections darüber unterschiedlich, wird pro `p` neu aufgelöst.

### Anwendungsbeispiele über Farben hinaus

- **Teilwerte statt ganzer Farben:** `--akzentfarbe: 195 46 4` und dann `rgb(var(--akzentfarbe) / 0.5)` — nutzt die Leerzeichen-Syntax moderner Farbfunktionen.
- **Theme über einen einzigen Farbton:** `--baseHue: 240`, Akzente als `hsl(calc(var(--baseHue) - 231) 80% 40%)`; per JavaScript `root.style.setProperty('--baseHue', wert)` aus einem Schieberegler.
- **Einheit anhängen:** Ein einheitsloser Wert wird mit `calc(var(--scale) * 1rem)` zur Längenangabe. `var(--scale) + 'px'` funktioniert nicht.
- **Countdown ohne JavaScript:** `--duration: 9` im `style`-Attribut, verwendet in `animation: roundtime calc(var(--duration) * 1s) steps(var(--duration)) forwards`. Animiert wird `transform: scaleX(0)`, nicht `width` — performanter.
- **Vendor-Präfixe entkoppeln:** `--clip` einmal setzen, dann an `-webkit-clip-path` und `clip-path` zuweisen.
- **`sibling-index()` und `sibling-count()`** liefern Position und Anzahl unter Geschwistern und funktionieren innerhalb von `calc()`; damit entfallen manuell gesetzte Index-Variablen pro `:nth-child`.

### Begriffsfrage

Die Spezifikation unterscheidet: Eine benutzerdefinierte Eigenschaft *ist* keine Variable, sie *ermöglicht* die Festlegung einer Variablen, die dann über `var()` verwendet wird. MDN und die Spezifikation selbst benutzen den Begriff „Variable" trotzdem.

### Custom Media Queries

`@media (max-width: var(--breakpoint))` funktioniert nicht. `@custom-media` steht seit Jahren in Media Queries Level 5, ist aber laut Artikel weder bei MDN noch caniuse als Feature geführt — Implementierungsinteresse offenbar gering.

## Eigene Einordnung

Die stärksten Abschnitte sind die, die über „Farben zentral definieren" hinausgehen: der Auflösungszeitpunkt von `var()` und der Nutzen von `@property`.

**Der Auflösungszeitpunkt ist die häufigste Verständnisfalle.** Wer Custom Properties für Variablen im Programmiersinn hält, erwartet im `ul`/`li`-Beispiel blaue Listenpunkte. Dass sie rot bleiben, ist keine Kuriosität, sondern die Regel: Vererbt wird der berechnete Wert der Eigenschaft, nicht die Rechenvorschrift.

**`@property` ist unterschätzt.** Der Animierbarkeitspunkt allein rechtfertigt die Registrierung — ohne sie sind Farb- oder Winkelübergänge auf Custom Properties keine Übergänge, sondern Sprünge. Für einen konkreten Fall ist mir das noch nicht gegengeprüft, es steht so im Artikel und deckt sich mit dem, was die Registrierung technisch leistet (der Browser kennt den Typ und kann interpolieren).

Der Artikel ist an einigen Stellen erkennbar gewachsen statt geschrieben: Die Beispiele springen zwischen HSL-Rechnerei (älterer Stand) und `sibling-index()` (sehr neu), und die Aufzählungen sind uneinheitlich verschachtelt. Inhaltlich habe ich nichts gefunden, das falsch wäre — die HSL-Beispiele sind aber Stand der Zeit vor OKLCH und relativen Farbangaben; wer heute ein Theme baut, sollte [[quellen/artikel/relative-farbangaben|Relative Farbangaben (SELFHTML)]] daneben legen.

Nicht behandelt wird die Frage, was Custom Properties kosten — ob große Mengen davon oder tiefe `var()`-Ketten Performanceeffekte haben.

## Verknüpftes Wissen

- [[grundlagen/variablen|CSS Custom Properties]] — verdichtetes Wissen
- [[quellen/wiki-selfhtml|SELFHTML-Wiki]] — Herkunft und Einordnung der Quelle
- [[quellen/artikel/relative-farbangaben|Relative Farbangaben (SELFHTML)]] — Farbpaletten aus einer Grundfarbe ableiten
- [[grundlagen/berechnungen|CSS calc()]] — Einheit anhängen, Werte rechenbar machen
- [[grundlagen/farben|Farben in CSS]]

## Offene Fragen

- Performanceverhalten bei sehr vielen Custom Properties oder tiefen `var()`-Ketten — im Artikel nicht behandelt.
- Wie breit werden `sibling-index()` und `sibling-count()` unterstützt? Der Artikel nennt keinen Stand.
- Der Browsersupport von `@property` wird nur über einen caniuse-Link angedeutet, ohne Aussage im Text.
