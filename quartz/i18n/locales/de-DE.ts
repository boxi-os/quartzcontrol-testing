import { Translation } from "./definition"

export default {
  propertyDefaults: {
    title: "Unbenannt",
    description: "Ohne Beschreibung",
  },
  components: {
    callout: {
      note: "Hinweis",
      abstract: "Zusammenfassung",
      info: "Info",
      todo: "Zu erledigen",
      tip: "Tipp",
      success: "Erfolg",
      question: "Frage",
      warning: "Warnung",
      failure: "Fehlgeschlagen",
      danger: "Gefahr",
      bug: "Fehler",
      example: "Beispiel",
      quote: "Zitat",
    },
    backlinks: {
      title: "Verweise hierher",
      noBacklinksFound: "Noch verweist nichts hierher",
    },
    themeToggle: {
      lightMode: "Helles Farbschema",
      darkMode: "Dunkles Farbschema",
    },
    readerMode: {
      title: "Nur der Text",
    },
    explorer: {
      title: "Inhalt",
    },
    footer: {
      createdWith: "Erstellt mit",
    },
    graph: {
      title: "Umgebung",
    },
    recentNotes: {
      title: "Zuletzt geändert",
      seeRemainingMore: ({ remaining }) => `${remaining} weitere ansehen →`,
    },
    transcludes: {
      transcludeOf: ({ targetSlug }) => `Transklusion von ${targetSlug}`,
      linkToOriginal: "Zur vollständigen Seite",
    },
    search: {
      title: "Suche",
      searchBarPlaceholder: "Suchen …",
    },
    tableOfContents: {
      title: "Inhaltsverzeichnis",
    },
    contentMeta: {
      readingTime: ({ minutes }) => `${minutes} Min. Lesezeit`,
    },
  },
  pages: {
    rss: {
      recentNotes: "Zuletzt bearbeitete Seiten",
      lastFewNotes: ({ count }) => `Letzte ${count} Seiten`,
    },
    error: {
      title: "Nicht gefunden",
      notFound: "Diese Seite ist entweder nicht öffentlich oder existiert nicht.",
      home: "Zur Startseite",
    },
    folderContent: {
      folder: "Ordner",
      itemsUnderFolder: ({ count }) =>
        count === 1 ? "1 Datei in diesem Ordner." : `${count} Dateien in diesem Ordner.`,
    },
    tagContent: {
      tag: "Tag",
      tagIndex: "Tag-Übersicht",
      itemsUnderTag: ({ count }) =>
        count === 1 ? "1 Datei mit diesem Tag." : `${count} Dateien mit diesem Tag.`,
      showingFirst: ({ count }) => `Die ersten ${count} Tags werden angezeigt.`,
      totalTags: ({ count }) => `${count} Tags insgesamt.`,
    },
  },
} as const satisfies Translation
