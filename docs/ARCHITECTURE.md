# Architecture Documentation

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: SQLite 3
- **Authentication**: JWT (jsonwebtoken)
- **ORM**: Prisma Client v5.x

## Database Setup
Uses a simple SQLite database file (`./dev.db`) accessed directly by Prisma. No external PostgreSQL bridge is needed — the connection string `"postgresql://postgres@localhost:5432/notesdb?connection=sqlite"` is **no longer used**. The Prisma schema defines two models: `User` and `Note`, with a cascade delete relationship from User to Note.

## Project Structure
```
next_notes/
├── app/                    # Next.js App Router pages and API routes
│   ├── api/login/route.ts  # Login API route (POST /api/login) - returns JWT token
│   ├── api/notes/route.ts  # Notes API routes (GET, POST /api/notes) - requires auth
│   ├── layout.js           # Root layout component (wraps all pages with Header)
│   ├── page.js             # Home page (NotesList component)
│   └── components/         # Shared React components
├── docs/                   # Project documentation
├── prisma/                 # Prisma schema and seed scripts
├── public/                 # Static assets
├── lib/                    # Utility files (prisma.ts, etc.)
└── package.json            # Dependencies and scripts
```

## API Routes
- **POST /api/login** — Authenticates users via username/password against the User model. Returns JWT token on success or an error object with status 401 on failure.
- **GET /api/notes** — Lists all notes for the authenticated user (requires Bearer token).
- **POST /api/notes** — Creates a new note for the authenticated user (requires Bearer token).

## Security Notes
- Passwords are stored and compared in **plain text**. For production use, implement password hashing (e.g., bcrypt or argon2).
- JWT tokens are generated with a 7-day expiration time using `process.env.JWT_SECRET`.