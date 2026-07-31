# Components Documentation

## Header Component (`app/components/Header.jsx`)

Displays the application header with a yellow SVG note logo and an optional logout button when logged in. Features responsive layout classes, aria-labels for accessibility, and hover/active animations on the logout button.

```jsx
"use client";

export default function Header({ username, onLogout }) {
  return (
    <header className="mb-5 py-2 bg-gray-900" role="banner">
      <h1 className="max-w-2xl mx-auto font-bold flex gap-3">
        <svg className="w-6 h-6 text-yellow-400" viewBox="0 0 24 24">
          {/* SVG note icon */}
        </svg>
        <span className="sr-only">Note</span>
        <span>Notes</span>
      </h1>
      {username && (
        <button onClick={onLogout} aria-label="Logout" className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all duration-200 shadow-lg focus-visible:ring-2 focus-visible:ring-red-500 active:scale-[0.98]">
          Logout
        </button>
      )}
    </header>
  );
}
```

**Props:**
- `username` — Current logged-in user's username; if null, the logout button is hidden.
- `onLogout` — Callback function invoked when the logout button is clicked.

## InputArea Component (`app/components/InputArea.jsx`)

A textarea and "✨ Add Note" button for creating new notes. The textarea auto-focuses on mount via a ref callback, supports Enter-to-add (with Shift+Enter for multi-line), and resets its value after adding a note to allow fresh input.

```jsx
"use client";

export default function InputArea({ noteText, setNoteText, addNote, ref }) {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  // ... textarea and button rendering
}
```

**Props:**
- `noteText` — Current text content of the textarea.
- `setNoteText` — Setter function for updating the text.
- `addNote` — Callback invoked when the user adds a note (Enter or button click).
- `ref` — Optional ref callback passed to the textarea element (used via forwardRef pattern in main app).

## NotesList Component (`app/components/NotesList.jsx`)

Renders all existing notes with inline editing, deletion, and empty-state messaging. Uses React hooks (`useState`, `useEffect`, `useRef`) for state management. Each note article has an edit button (✏️) that switches to inline editing mode and a delete button (🗑️). An "Add Note" placeholder is shown when no notes exist.

```jsx
"use client";
import { useState, useRef } from 'react';

export default function NotesList({ notes, setNotes, username, onLogout }) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const textareaRef = useRef(null);

  // ... renders list of note articles with edit/delete buttons
}
```

**Props:**
- `notes` — Array of note objects to display.
- `setNotes` — Setter for updating the notes array in state.
- `username` — Current logged-in user's username; if null, the logout button is hidden.
- `onLogout` — Callback function invoked when the logout button is clicked.

## Login Component (`app/components/Login.jsx`)

The login page with username and password inputs that call `/api/login`. Supports auto-focus on mount, error state management for failed attempts, and displays success feedback after login.

```jsx
"use client";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // ... form handling and submission logic
}
```

**Props:**
- `onLogin` — Callback invoked with the authenticated user data after a successful login. The component calls this with `{ id, username, createdAt, isAuthenticated: true, role: "user" }`.