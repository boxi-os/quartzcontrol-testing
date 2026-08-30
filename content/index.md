---
tags:
  - Artikel
aliases:
Projekt:
Titel:
Autor: Hinterland History
Publisher: Hinterland History
Beschreibung:
Veröffentlicht: 2026-07-28
Artikelbild:

---
# Alle relevanten Elemente zum layouten (h1)

## Bild (h2)

![[titelbild.jpg]]
## Texte (h2)

Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et [[index|interner Link]] accusam et justo duo dolores[^1] et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor[^2] invidunt ut labore [externer Link](https://www.google.de) et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea ==takimata== sanctus est Lorem ipsum dolor sit amet. 

### Ungeordnete Liste (h3)

- Lorem ipsum dolor 
- consetetur sadipscing elitr, sed diam **nonumy** eirmod tempor
	- Sub 1
	- Sub 2
- no sea takimata sanctus est 
- Lorem ipsum dolor sit amet, *consetetur* sadipscing elitr, sed diam nonumy eirmod tempor ***invidunt*** ut labore et dolore magna

### Geordnete Liste (h3)

1. Lorem ipsum
2. no sea takimata sanctus est
	1. Sub 1
	2. Sub 2
3. consetetur sadipscing elitr, sed diam nonumy[^3] eirmod tempor invidunt ut labore et dolore magna

## Boxen (h2)

>[!custom-callout-projekt]+ Projekt-Box
>### Hedline in einer Box (h3)
>Hier steht der Inhalt der Box

>[!custom-callout-dokument] Dokument-Box
>Hier steht der Inhalt der Box

>[!custom-callout-dokument] Dokument-Box mit Bild
>![[alhambra_1997-10.jpg|150]]
>>### [[Alhambra-Zeitung – Die Strukturen der FaschistInnen aufdecken und angreifen]]
>>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna

>[!custom-callout-literatur] Literatur-Box
>Hier steht der Inhalt der Box

>[!custom-callout-links] Link-Box
>Hier steht der Inhalt der Box

> [!quote]
> Lorem ipsum dolor sit amet
#### Code (h4)
```
>[!custom-callout-links] Link-Box
>Hier steht der Inhalt der Box
```

```yaml
- source: github:boxi-os/quartz-layout-box
    enabled: true
    options: 
        datei: snippet.html
        className: layout-box
    order: 50
    layout:
      position: left
      priority: 15
      display: desktop-only
```

#### Blockquote(h4)
>### Blockquote-Header
>Blockquote-Inhalt

#### Base(h4)
```base
filters:
  or:
    - file.folder == "Antifa-Demo in Lingen"
    - file.folder == "Antifa-Demo in Lingen/Kontext"
views:
  - type: cards
    name: Kacheln
    order:
      - file.name
      - file.folder
      - tags
    cardSize: 200

```

---

[^1]: Test-Fußnote für Layout
[^2]: Eine weitere Fußnote zum ausprobieren
[^3]: Dritte Fußnote, die so lang ist, dass der Text umbrochen wird... Lorem ipsum dolor sit amet, *consetetur* sadipscing elitr, sed diam nonumy eirmod tempor ***invidunt*** ut labore et dolore magna 