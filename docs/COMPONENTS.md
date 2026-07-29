# Components Reference

## NotesList

The main application component that renders all user notes in a scrollable list.

### Props

| Name | Type | Description |
|---|---|---|
| `notes` | array of objects | Array containing note data with id, text, timestamp, updatedAt fields |
| `setNotes` | function | Callback to update the notes array after additions, edits, or deletions |
| `username` | string \| null | Current authenticated user's username (empty/null when not logged in) |
| `onLogout` | function | Callback triggered when the user clicks the logout button |

### Features

- **Inline editing**: Clicking "Edit" switches a note to an editable textarea with Save/Cancel buttons.
- **Delete**: Each note has a delete button that removes it from the list immediately.
- **Empty state**: Displays a centered message and decorative star when no notes exist.
- **Accessibility**: Full ARIA labels, roles, and keyboard navigation support throughout.

## InputArea

A shared text input component placed above the notes list to add new notes or continue existing ones.

### Features

- Uses `useRef` on the textarea for direct DOM focus control.
- Handles keydown events: Enter adds a new line; Escape cancels any pending edit.
- When focused, it highlights with a purple ring via CSS focus-visible styles.

## Header

The top navigation bar displayed after successful login.

### Features

- Shows "Next Notes" branding on the left.
- Displays logout button when user is authenticated.
- Styled with gradient background using Tailwind's `bg-gradient-to-r`.

## Login

The initial login form shown before authentication.

### Features

- Centered layout with animated fade-in effect.
- Username and password inputs with placeholder text.
- Error display area for invalid credentials or connection errors.
- Loading spinner during API call.
- Gradient background using Tailwind's `bg-gradient-to-br`.

## Layout

The root layout component wraps all pages and provides global styling, including the dark theme base styles.