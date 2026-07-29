# Database Schema
  
 ## Prisma Models
  
 The application uses **Prisma ORM** with a SQLite backend via the native adapter for local development and testing only.

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

- **Provider**: SQLite (`sqlite`) via the native adapter
- **ORM**: Prisma Client v5.x
- **Database file location**: Relative path from the project root, stored as `file:./dev.db`

> ⚠️ The seed script (`prisma/seed.ts`) still imports `@prisma/adapter-better-sqlite3`, but this package is no longer a dependency. The connection works directly with Prisma's native SQLite adapter — the bridge package has been removed from `package.json`.

## Seed Data

The seed script (`prisma/seed.ts`) creates two test users:
- **test** / test (password)
- **anna** / test456 (password)

It uses `upsert` operations to insert or update these records. After seeding, it logs "Dummy-Daten eingefügt" and disconnects the client.

## Production Considerations

- ⚠️ **Password Security**: Currently passwords are stored in plain text. For any production deployment, integrate a password hashing library (e.g., bcrypt, argon2) and update both Prisma schema and API route logic accordingly.
