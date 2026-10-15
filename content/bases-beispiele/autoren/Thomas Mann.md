---
geboren: 1875
geburtsort: Lübeck
---
Thomas Mann, geboren 1875 in Lübeck.

## Bücher in der Bibliothek

Dieser Codeblock steht in jeder Autorennotiz gleich; `this` ist die Notiz, in der er steht.

```base
filters:
  and:
    - file.inFolder("bases-beispiele/buecher")
    - 'autor == this.file.asLink()'
formulas:
  sterne: 'if(bewertung, "★".repeat(bewertung), "")'
properties:
  file.name:
    displayName: Titel
  note.jahr:
    displayName: Jahr
  note.status:
    displayName: Status
  formula.sterne:
    displayName: Bewertung
views:
  - type: table
    name: Bücher
    order:
      - file.name
      - jahr
      - status
      - formula.sterne
    sort:
      - property: jahr
        direction: ASC
```
