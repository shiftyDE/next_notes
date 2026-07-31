# API Documentation

## Authentication Endpoint

### POST `/api/login`

Validates user credentials and returns an authenticated user object along with a JWT token.

#### Request

**Headers:**

| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |

**Body (JSON):**

| Field | Type | Description |
|---|---|---|
| `username` | string | The user's registered username |
| `password` | string | The user's password |

#### Response Codes

- **200 OK**: Successful login. Returns the authenticated user data and a JWT token.

    ```json
    {
      "success": true,
      "user": {
        "id": 1,
        "username": "shiftyDE"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

- **400 Bad Request**: Invalid JSON or missing fields.

    ```json
    {
      "error": "Username und Passwort erforderlich"
    }
    ```

- **401 Unauthorized**: Credentials do not match any registered user or password is incorrect.

    ```json
    {
      "error": "Login fehlgeschlagen"
    }
    ```

#### Response Fields (Success)

| Field | Type | Description |
|---|---|---|
| `success` | boolean | Always `true` on success |
| `user.id` | number | The user's unique identifier |
| `user.username` | string | The username of the authenticated user |
| `token` | string | JWT token valid for 7 days |

## Notes API Endpoint

### GET `/api/notes`

Returns all notes belonging to the currently authenticated user. Requires a valid Bearer token in the Authorization header.

#### Request

**Headers:**

| Header | Value | Required |
|---|---|---|
| `Authorization` | `Bearer <token>` | Yes |

#### Response Codes

- **200 OK**: Returns an array of note objects.

    ```json
    [
      {
        "id": 1,
        "title": "My Note",
        "content": "Note content here...",
        "createdAt": "2026-07-29T08:35:43.879Z",
        "updatedAt": "2026-07-29T10:00:00.000Z"
      }
    ]
    ```

- **401 Unauthorized**: Missing or invalid token.

    ```json
    {
      "error": "Nicht eingeloggt"
    }
    ```

### POST `/api/notes`

Creates a new note for the currently authenticated user. Requires a valid Bearer token in the Authorization header.

#### Request

**Headers:**

| Header | Value | Required |
|---|---|---|
| `Authorization` | `Bearer <token>` | Yes |
| `Content-Type` | `application/json` | Yes |

**Body (JSON):**

| Field | Type | Description |
|---|---|---|
| `title` | string | Optional note title |
| `content` | string | The note's content text |

#### Response Codes

- **201 Created**: Successfully created. Returns the new note object.

    ```json
    {
      "id": 2,
      "title": null,
      "content": "New note content",
      "createdAt": "2026-07-29T10:05:00.000Z",
      "updatedAt": "2026-07-29T10:05:00.000Z"
    }
    ```

- **401 Unauthorized**: Missing or invalid token.

    ```json
    {
      "error": "Nicht eingeloggt"
    }
    ```

## Security Notes

- Passwords are stored and compared in **plain text**. For production use, implement password hashing (e.g., bcrypt or argon2).
- The current implementation uses SQLite for storage. For production deployments, consider migrating to PostgreSQL or MySQL with proper connection pooling.