---
type: page
status: active
publish: true
title: "CSS color-mix() Funktion"
description: "Quellennotiz zu einem kulturbanause-Artikel über color-mix(), mit Richtigstellung des Standardfarbraums anhand der Spezifikation."
authors:
  - "Felix Lehmann"
publisher: "Agentur kulturbanause"
source_published: "2022-03-14"
url: "https://kulturbanause.de/blog/css-color-mix-funktion/"
archive_url:
source_kind: secondary
---

# CSS color-mix() Funktion

## Quelle / bibliografische Angaben

Kurzer Blogartikel der Agentur kulturbanause zur CSS-Funktion `color-mix()`.

- Autor laut Frontmatter des Clips: Felix Lehmann. Die Byline auf der Seite nennt zusätzlich einen zweiten Vornamen („Jonas"), ohne Nachnamen; hier nicht ergänzt.
- Stand laut Seite: erschienen 2022-03-14, „Aktualisiert von 2022 – 2023"
- URL: <https://kulturbanause.de/blog/css-color-mix-funktion/>, abgerufen 2026-09-02
- Erfasst über den Obsidian Web Clipper; ausgewertet wurde der geclippte Text, nicht die Live-Seite.

## Kurzfassung

`color-mix()` mischt zwei Farbwerte nativ in CSS und gibt das Ergebnis in einem angegebenen Farbraum zurück. Damit entfällt der bisher übliche Umweg über Präprozessor-Funktionen wie `mix()` in Sass.

## Kernaussagen

- Vor `color-mix()` war Farbmischung nur über Präprozessoren möglich, z. B. `mix(#147c85, white, 20%)` in Sass, das zur Buildzeit einen festen Hex-Wert erzeugt.
- `color-mix()` nimmt zwei Farbwerte mit optionaler Prozentangabe und den Zielfarbraum entgegen. Als Farbwert ist jeder gültige CSS-Farbcode zulässig, auch eine CSS-Variable — das ist der entscheidende Unterschied zum Präprozessor, weil die Mischung zur Laufzeit im Browser stattfindet.
- Beispiel aus dem Artikel: `color-mix(in srgb, #147c85 20%, white)` hellt Petrol um 80 % auf.
- Genannte Farbräume: `lch`, `lab`, `srgb`, `hsl`, `hwb`, `xyz`.
- `color-mix()` ist Teil von [CSS Color Module Level 5](https://www.w3.org/TR/css-color-5/).
- Browsersupport laut Artikel: ab Mai 2023 alle Grade-A-Browser (Chrome, Firefox, Safari), belegt über [caniuse](https://caniuse.com/mdn-css_types_color_color-mix).

## Eigene Einordnung

Der Artikel ist inhaltlich brauchbar, aber an mehreren Stellen nicht auf Stand. Der erste Punkt ist am Spezifikationstext gegengeprüft, die übrigen nicht:

- **Der Standardfarbraum ist Oklab, nicht `lch`.** Der Artikel nennt `lch` als Standard, wenn kein Farbraum angegeben wird. Der Editor's Draft von CSS Color Level 5 sagt dazu ausdrücklich: „If no color interpolation method is specified, assume Oklab." Die Grammatik führt die Interpolationsmethode als optional (`<color-interpolation-method>?`), der Artikel liegt also nur beim Standardwert falsch, nicht bei der Optionalität (<https://drafts.csswg.org/css-color-5/#color-mix>, abgerufen 2026-09-02).
  Nicht geprüft ist, ob aktuelle Browser die Kurzform `color-mix(#147c85 20%, white)` tatsächlich annehmen. Implementierungen haben die Farbraumangabe lange verlangt. Solange das nicht nachgeschlagen ist, `in <colorspace>` immer ausschreiben — das ist ohnehin die klarere Schreibweise.
- **Die Liste der Farbräume ist unvollständig.** Sie stammt aus dem Stand 2022/2023. Level 5 erlaubt unter anderem auch `oklab` und `oklch`, die für gleichmäßige Mischungen die bessere Wahl sind (siehe [[quellen/artikel/farben-in-der-praxis|CSS Farben in der Praxis – von Hexadezimal bis oklch()]]).
- Der Artikel enthält einen Tippfehler („`in srg`" statt `in srgb`) und kennzeichnet die CSS-Codeblöcke fälschlich als JavaScript. Beides ist nur kosmetisch, aber ein Zeichen dafür, dass der Text nicht sorgfältig nachgepflegt wurde.

Praktisch relevant ist vor allem der Punkt, den der Artikel nur beiläufig nennt: `color-mix()` funktioniert mit CSS-Variablen und damit zur Laufzeit. Genau das kann ein Präprozessor nicht, und darauf lassen sich Themes und Hover-Zustände aufbauen.

Verdichtetes Wissen steht in [[grundlagen/farben|Farben in CSS]].

## Verknüpftes Wissen

- [[grundlagen/farben|Farben in CSS]]
- [[quellen/artikel/farben-in-der-praxis|CSS Farben in der Praxis – von Hexadezimal bis oklch()]]
- [[quellen/artikel/nesting-kulturbanause|CSS-Nesting (kulturbanause)]] — ebenfalls eine Funktion, die Präprozessoren ersetzt

## Offene Fragen

- Der genaue aktuelle Stand der zulässigen Farbräume und der Syntax ist hier nicht an der Spezifikation geprüft.
- Der Artikel geht nicht darauf ein, wie sich Prozentangaben verhalten, wenn beide Farben eine Angabe erhalten oder die Summe nicht 100 % ergibt.
