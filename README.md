# 📝 Note App

A sleek note-taking application that lets you quickly capture, edit, and organize your thoughts. Built with Next.js 15 (App Router), React 19, and Tailwind CSS v4. The app uses a SQLite database via Prisma ORM for persistent storage of users and notes.

## Features

- **Add Notes** — Type in the text field and press Enter or click "✨ Add Note" to create new entries
- **Edit Notes** — Click "✏️ Edit" on any note to change its content directly in an inline editor
- **Delete Notes** — Remove unwanted notes with a single click on "🗑️ Delete"
- **Timestamps** — Each note automatically displays its creation date
- **Change Log** — Edited notes show their last update date
- **Empty States** — Displays a friendly message when no notes exist yet
- **Login System** — Secure login with username and password via the /api/login endpoint

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 15.x | React framework with App Router (Server Components) |
| React | 19.2.4 | UI library for interactive components |
| Tailwind CSS | ^4.3.3 | Utility-first CSS framework |
| Prisma ORM | latest | Database abstraction layer |
| SQLite | - | Relational database engine |
| Cypress | ^15.19.0 | End-to-end testing framework |

## Project Structure

```
app/
├── layout.js          # Root layout component (HTML shell, meta data) — RSC
├── page.js            # Main application with note functionality — Client Component
├── api/               # API routes folder
│   └── login/route.ts # Login authentication endpoint

components/            # Reusable UI components
├── Header.jsx         # Application header with navigation and logout button
├── InputArea.jsx      # Main text input area for new notes
├── NotesList.jsx      # List of existing notes with inline edit/delete actions
└── Login.jsx          # Login form component

prisma/                # Prisma schema, seed files, migrations
├── schema.prisma      # Database schema (users + notes tables)
└── seed.ts            # Database seeding script

public/                # Static assets folder

docs/                  # Project documentation and guides
├── API.md             # API endpoint documentation
├── ARCHITECTURE.md    # System architecture overview
├── COMPONENTS.md      # Component reference guide
├── DATABASE.md        # Database structure and schema details
└── SETUP.md           # Setup instructions for new developers
```

## Installation & Development

### Prerequisites

- Node.js 18+ installed locally
- A modern web browser for development and testing

### Starting the Project

```bash
npm run prisma
npm install
npm run tailwind:css
npm run dev
```

This starts the Next.js development server on `http://localhost:3000`.

### Production Build

```bash
npm run prisma
npm run tailwind:css
npm run build
npm start
```

## How It Works

The app is built with React Server Components (RSC) and Client Components. The layout (`layout.js`) and page (`page.js`) are server components, while the interactive UI elements like Header, InputArea, NotesList, and Login are client components that manage state in the browser.

**State Management:**
- **`notes`** — Array containing all notes (each with an `id`, `text`). Stored locally in the browser via React's `useState` hook
- **`noteText`** — The current text value entered in the main textarea
- **`editText`** — The text content when editing a note

When the user clicks "✨ Add Note" or presses Enter, the text is validated and a new note with a unique ID (based on `Date.now()`) is created. The app then automatically focuses the newly created note.

When editing a note, edit mode is activated which hides the body overflow and reveals an inline editor. After saving or cancelling, focus returns to the main textarea.

**Database:**
Notes and user data are persisted in a SQLite database via Prisma ORM. The `users` table stores login credentials (username + password), while the `notes` table holds all note content linked to their respective users.

## Tailwind CSS Configuration

The app uses Tailwind CSS v4 with a custom config file (`tailwind.config.ts`):

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: { extend: {} },
  plugins: [],
}

```

- **`content`** — Scan paths for Tailwind class names in JavaScript/TypeScript files
- **`darkMode: 'class'`** — Enables class-based dark mode system (see `layout.js`)
- **`theme.extend`** — Empty extension for custom theme values

## Testing with Cypress

The project includes end-to-end testing powered by [Cypress](https://cypress.io/) to ensure UI functionality works as expected.

```bash
npm run cypress   # Opens the Cypress Test Runner GUI (interactive)
npx cypress run   # Executes tests in headless mode
```

### Lighthouse Report

The app includes a [Lighthouse](https://developers.google.com/web/tools/lighthouse) report for each test run.

```bash
npm run lighthouse   # Generates a Lighthouse report for each test in lighthouse-report folder
```

## License

MIT License – This project uses MIT license for the application source code.

---

## Important Note

All content in this README, including the project description, features, technical details, and code structure, has been fully generated by artificial intelligence. No human authorship or original creative input was involved in any part of this documentation.