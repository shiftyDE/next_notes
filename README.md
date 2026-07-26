# 📝 Note App

Eine elegante Notiz-Anwendung, die es ermöglicht Gedanken schnell zu erfassen, zu bearbeiten und zu organisieren. Die App wurde mit Next.js 16, React 19 und Tailwind CSS v4 entwickelt.

## Features

- **Notizen hinzufügen** — Tippe in das Textfeld und drücke Enter oder klicke auf "✨ Notiz hinzufügen", um neue Einträge zu erstellen
- **Notizen bearbeiten** — Klicke auf "✏️ Bearbeiten" um den Inhalt einer Notiz direkt im Inline-Editor zu ändern
- **Notizen löschen** — Entferne unerwünschte Notizen mit einem Klick auf "🗑️ Löschen"
- **Zeitstempel** — Jede Notiz zeigt automatisch das Erstellungsdatum an
- **Änderungsprotokoll** — Bei bearbeiteten Notizen wird das Änderungsdatum angezeigt
- **Leere Zustände** — Zeigt eine freundliche Nachricht, wenn noch keine Notizen existieren

## Tech Stack

| Technologie | Version | Zweck |
|---|---|---|
| Next.js | 16.2.11 | React-Framework mit SSR/SSG-Unterstützung |
| React | 19.2.4 | UI-Bibliothek für interaktive Komponenten |
| Tailwind CSS | ^4.3.3 | Utility-first CSS-Framework |
| Sass | ^1.69.0 | CSS-Vorverarbeiter für Stylesheets |

## Projektstruktur

```
app/
├── layout.js          # Wurzel-Layout-Komponente (HTML-Schale, Meta-Daten)
├── page.js            # Hauptanwendung mit Notiz-Funktionalität

public/                # Statisische Assets-Ordner
```

## Installation & Entwicklung

### Voraussetzungen

- Node.js 18+ lokal installiert

### Projekt starten

```bash
npm install
npm run tailwind:css
npm run dev
```

Dies startet den Next.js Development Server auf `http://localhost:3000`.

### Production Build

```bash
npm run tailwind:css
npm run build
npm start
```

## Funktionsweise

Die App verwendet React's `useState`-Hook, um drei Zustände in einem einzigen Client-Komponenten-Block zu verwalten:

1. **`notes`** — Array mit allen Notizen, jede enthält eine `id`, `text`, `timestamp` und optional ein `updatedAt`-Feld
2. **`noteText`** — Der aktuelle Textwert, der im Haupt-Textarea eingegeben wird
3. **`editText`** — Der Textinhalt beim Bearbeiten einer Notiz

Wenn der Benutzer auf "✨ Notiz hinzufügen" klickt oder Enter drückt, wird der Text validiert und eine neue Notiz mit einem einzigartigen ID (basierend auf `Date.now()`) erstellt. Die App fokussiert sich dann automatisch auf die neu erstellte Notiz.

Beim Bearbeiten einer Notiz wird der Edit-Modus aktiviert, was den Overflow des Body versteckt und einen Inline-Editor anzeigt. Nach dem Speichern oder Abbrechen kehrt der Fokus zurück zum Haupt-Textarea.

## Tailwind CSS Konfiguration

Die App nutzt Tailwind CSS v4 mit einem Custom-Config-Datei (`tailwind.config.ts`):

```javascript
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: { extend: {} },
  plugins: [],
}
```

- **`content`** — Scanpfade für Tailwind-Klasse-Namen in JavaScript/TypeScript-Dateien
- **`darkMode: 'class'`** — Aktiviert class-basiertes Dark Mode-System (siehe `layout.js`)
- **`theme.extend`** — Leere Erweiterung für benutzerdefinierte Theme-Werte

## Accessibility

Die App ist mit ARIA-Attributen und semantischen HTML-Elementen gestaltet:
- Skip-Navigation Link für Screenreader
- Role-Attribute für Header, Main, Footer
- Keyboard-navigierbar über Tab-Befehl
- Focus-Management beim Bearbeiten von Notizen

## Lizenz

MIT License – Diese App wurde vollständig mit KI-generiertem Code erstellt.