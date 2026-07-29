# Database Schema

## Prisma Models

The application uses **Prisma ORM** with a SQLite backend via the `better-sqlite3` adapter for local development and testing.

### User Model

```prisma
model User {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  username  String   @unique
  password  String
}
```

| Field | Type | Constraints | Description |
|---|---|---|---|
| `id` | Int | Primary key, auto-incrementing | Unique identifier for each user record |
| `createdAt` | DateTime | Default: current timestamp | When the account was created |
| `username` | String | **Unique** constraint | The login username (must be unique across all users) |
| `password` | String | - | Stored in plain text. ⚠️ For production, switch to a hashed password storage strategy. |

## Current Implementation Details

- **Provider**: SQLite (`sqlite`)
- **Adapter**: `better-sqlite3` (file-based database at `./dev.db`)
- **ORM**: Prisma Client v7.9.1
- **Database file location**: Relative path from the project root, stored as `file:./dev.db`

## Seed Data

The seed script (`prisma/seed.ts`) is used to populate initial data into the database after setup or migration. It typically creates default admin users for development purposes.

## Production Considerations

- ⚠️ **Password Security**: Currently passwords are stored in plain text. For any production deployment, integrate a password hashing library (e.g., bcrypt, argon2) and update both Prisma schema and API route logic accordingly.
- 🗄️ **Database Migration**: When switching to PostgreSQL or MySQL, update the datasource provider in `prisma/schema.prisma` and consider using environment variables for connection strings.