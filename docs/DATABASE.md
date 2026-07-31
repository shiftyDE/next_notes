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

### Note Model

```prisma
model Note {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  title     String?
  content   String
  userId    Int
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

| Field | Type | Constraints | Description |
|---|---|---|---|
| `id` | Int | Primary key, auto-incrementing | Unique identifier for each note record |
| `createdAt` | DateTime | Default: current timestamp | When the note was created |
| `updatedAt` | DateTime | **@updatedAt** (auto-updated) | Last modification time of the note |
| `title` | String? | Nullable | Optional title for the note |
| `content` | String | Not null, default empty string | The main body text of the note |
| `userId` | Int | Foreign key to User.id | Links the note to its owner user |

## Current Implementation Details

- **Provider**: SQLite (`sqlite`) via the native adapter
- **ORM**: Prisma Client v5.x
- **Database file location**: Relative path from the project root, stored as `file:./dev.db`
- **Cascade delete**: When a User is deleted, all associated Notes are automatically removed (via `onDelete: Cascade`).

> ⚠️ The seed script (`prisma/seed.ts`) still imports `@prisma/adapter-better-sqlite3`, but this package is no longer a dependency. The connection works directly with Prisma's native SQLite adapter — the bridge package has been removed from `package.json`.

## Database Operations Status (WIP)

The following operations are currently marked as **Work In Progress**:
- ❌ **Deleting** notes via API: Not yet implemented (delete endpoint missing)
- ❌ **Editing/Updating** notes via API: Not yet implemented (update endpoint missing)

These features are planned for future implementation.