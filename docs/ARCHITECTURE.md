# Architecture Documentation
 
 ## Tech Stack
 - **Framework**: Next.js 16 (App Router)
 - **Language**: TypeScript
 - **Styling**: Tailwind CSS v4
 - **Database**: SQLite 3
 
 ## Database Setup
 Uses a simple SQLite database file (`./dev.db`) accessed directly by Prisma. No external PostgreSQL bridge is needed — the connection string `"postgresql://postgres@localhost:5432/notesdb?connection=sqlite"` is **no longer used**.
 
 ## Project Structure
 ```
 next_notes/
 ├── app/                    # Next.js App Router pages and API routes
 │   ├── api/login/route.ts  # Login API route (POST /api/login)
 │   └── components/         # Shared React components
 ├── docs/                   # Project documentation
 ├── prisma/                 # Prisma schema and seed scripts
 ├── public/                 # Static assets
 └── package.json            # Dependencies and scripts
 ```
 
 ## API Routes
 - **POST /api/login** — Authenticates users via username/password against the User model. Returns `{ message, user }` on success or an error object with status 401 on failure.