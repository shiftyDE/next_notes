# 📝 Note App

A simple, lightweight notes application built with Next.js 16 and React 19. This entire project was created using AI-generated code, showcasing how artificial intelligence can rapidly prototype functional web applications.

## Features

- **Add Notes** — Type in the textarea and click "Add Note" to create new entries
- **Edit Notes** — Click "✏️ Edit" on any note to modify its content inline
- **Delete Notes** — Remove unwanted notes with a single click using "🗑️ Delete"
- **Empty State** — Displays a friendly message when no notes exist yet

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 16.2.11 | React framework with SSR/SSG support |
| React | 19.2.4 | UI library for building interactive components |
| React DOM | 19.2.4 | Core ReactDOM package |
| Sass | ^1.69.0 | CSS preprocessor for stylesheets |

## Project Structure

```
app/
├── layout.js          # Root layout component (HTML shell, title metadata)
├── page.js            # Main client-side notes application
├── page.module.css    # Client-side styling modules
└── globals.scss       # Global stylesheet (background color: #f5f5f5)

public/                # Static assets folder
```

## Getting Started

### Prerequisites

- Node.js 18+ installed locally

### Installation & Development

```bash
npm install
npm run dev
```

This starts the Next.js development server at `http://localhost:3000`.

### Build for Production

```bash
npm run build
npm start
```

## How It Works

The app uses React's `useState` hook to manage three pieces of state in a single client component (`"use client"`):

1. **`notes`** — Array storing all note objects, each with an `id` and `text` property
2. **`noteText`** — The current text value being typed in the main textarea
3. **`editingId`** — Tracks which note (if any) is currently in edit mode

When a user types in the textarea and clicks "Add Note", the app checks if the text has content (`trim()`), generates a unique ID using `Date.now()`, and pushes the new note into the array. The textarea is then reset for the next entry.

During editing, clicking "✏️ Edit" sets the `editingId` to that note's id and populates the textarea with its current text. To save changes, the app maps over the notes array and replaces only the note matching the `editingId`, keeping all other notes untouched. This preserves immutability best practices.

## AI-Generated Project

This entire project was created using artificial intelligence. It demonstrates how modern LLMs can generate complete, functional web applications from scratch — including proper component structure, state management, and styling — without human intervention in the initial coding phase.