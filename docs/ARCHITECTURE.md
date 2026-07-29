# Architecture

## Application Structure

The project follows a clean separation of concerns with client components, server-side API routes, and a dedicated database layer.

```
src/
├── app/
│   ├── layout.js          # Root layout component
│   ├── page.js            # Home page (NotesList)
│   └── api/
│       └── login/         # Authentication endpoint
│           └── route.ts   # POST handler for user login
├── components/
│   ├── Header.jsx          # Navigation header
│   ├── InputArea.jsx       # Text input area with textarea ref
│   ├── NotesList.jsx       # List of all notes
│   └── Login.jsx           # Login form component
├── prisma/
│   ├── schema.prisma       # Database schema definition
│   └── seed.ts             # Initial data seeding script
├── public/                 # Static assets (SVG icons)
├── test/                   # Testing infrastructure
│   ├── cypress/            # E2E tests with Cypress
│   └── lighthouse-config.js
└── docs/                   # Documentation files
```

## Data Flow

### Client-Side Logic

1. **NotesList** manages the notes array locally and handles CRUD operations (add, edit, delete) in client-side state using React hooks (`useState`, `useRef`).
2. **InputArea** provides a shared textarea with keyboard event handling for adding new lines or saving edits.
3. **Header** displays navigation links including a logout button that triggers the logout flow.

### Server-Side Logic

1. The login API route validates credentials against the database, returns user data, and manages session state.
2. Prisma is instantiated once in the server-side context with an adapter for SQLite connectivity.

## State Management Strategy

The app uses **client-only React state** rather than a global store (like Redux or Zustand). This means:

- Notes are stored directly in component props/state
- The `InputArea` and `NotesList` components communicate via prop passing (`notes`, `setNotes`)
- Authentication state is passed down through context-like props (`username`, `onLogout`)

This approach keeps the app lightweight but requires careful coordination between parent and child components.