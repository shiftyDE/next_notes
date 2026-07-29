# API Documentation

## Authentication Endpoint

### POST `/api/login`

Validates user credentials and returns an authenticated user object.

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

- **200 OK**: Successful login. Returns the authenticated user data.

   ```json
   {
     "message": "Login successful",
     "user": {
      "id": 1,
      "username": "shiftyDE",
      "createdAt": "2026-07-29T08:35:43.879Z",
      "isAuthenticated": true,
      "role": "user"
    }
  }
  ```

- **400 Bad Request**: Invalid JSON or missing fields.

  ```json
  {
    "error": "Invalid JSON" | "Username and password are required"
  }
  ```

- **401 Unauthorized**: Credentials do not match any registered user.

  ```json
  {
    "error": "Invalid credentials"
  }
  ```

#### Response Fields (Success)

| Field | Type | Description |
|---|---|---|
| `message` | string | Confirmation message in English ("Login successful") |
| `user.id` | number | The user's unique identifier |
| `user.username` | string | The username of the authenticated user |
| `user.createdAt` | ISO 8601 date string | When the account was created |
| `user.isAuthenticated` | boolean | Always `true` after successful login |
| `user.role` | string | Current role, currently hardcoded as `"user"` |

## Security Notes

- Passwords are stored and compared in **plain text**. For production use, implement password hashing (e.g., bcrypt or argon2).
- The current implementation uses SQLite for storage. For production deployments, consider migrating to PostgreSQL or MySQL with proper connection pooling.