---
title: Bases-Beispiele
---
Eine kleine Bibliothek, um zu sehen, wie Obsidian Bases mit quartz-betterbases auf der Website aussehen. Die neun Bücher liegen in `buecher/`, jedes mit Autor (als Link), Jahr, Seiten, Status, Bewertung, Lesedatum, Farbe und Tags.

## Die Base-Datei

[[bibliothek.base|Bibliothek]] ist eine eigene Seite mit sieben Ansichten als Reiter:

- [[bibliothek.base#Alle Bücher|Alle Bücher]]: Tabelle, nach Jahr sortiert, mit Formeln (Sterne, Alter) und Summenzeile.
- [[bibliothek.base#Nach Status|Nach Status]]: gruppierte Tabelle mit Summe je Gruppe.
- [[bibliothek.base#Regal|Regal]]: Karten, die Farbe als Cover.
- [[bibliothek.base#Lesefortschritt|Lesefortschritt]]: Board mit einer Spalte je Status.
- [[bibliothek.base#Kurzliste|Kurzliste]]: Liste.
- [[bibliothek.base#Galerie|Galerie]]: Galerie.
- [[bibliothek.base#Gelesen seit 2024|Gelesen seit 2024]]: eigener Filter der Ansicht, Datumsformel.

Ein Link mit `#Ansicht` öffnet die Base auf dieser Ansicht.

## Eingebettet

Dieselbe Base, in diese Notiz eingebettet; die Reiter wechseln, ohne die Adresse zu ändern:

![[bibliothek.base]]

## Als Codeblock

Eine Base kann auch direkt in einer Notiz stehen. Hier: alles mit dem Tag `klassiker`, das noch nicht gelesen ist.

```base
filters:
  and:
    - file.inFolder("bases-beispiele/buecher")
    - file.hasTag("klassiker")
    - status != "gelesen"
views:
  - type: list
    name: Klassiker auf der Liste
    order:
      - file.name
      - autor
      - status
```

## Mit `this`

Jede Notiz in `autoren/` enthält denselben Codeblock und zeigt trotzdem nur die eigenen Bücher, weil der Filter mit `this` die Notiz meint, in der er steht: [[Franz Kafka]], [[Thomas Mann]], [[Theodor Fontane]].
