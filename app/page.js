"use client";
import styles from './page.module.css';
import { useState } from 'react';

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState('');
  const [editText, setEditText] = useState('');
  const [editingId, setEditingId] = useState(null);

  const addNote = () => {
    if (noteText.trim()) {
      setNotes([...notes, { id: Date.now(), text: noteText }]);
      setNoteText('');
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const startEdit = (note) => {
    setEditingId(note.id);
    setEditText(note.text);
  };

  const saveEdit = () => {
    if (editingId && editText.trim()) {
      setNotes(notes.map(note => 
        note.id === editingId ? { ...note, text: editText } : note
      ));
      setEditingId(null);
      setEditText('');
    }
  };

  return (
    <div className={styles.container}>
      <h1>📝 Notes</h1>
      <textarea
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        placeholder="Type your note here..."
        className={styles.textarea}
      />
      <button onClick={addNote} className={styles.addButton}>Add Note</button>

      {notes.map(note => (
        <div key={note.id} className={styles.noteCard}>
          {editingId === note.id ? (
            <>
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className={styles.textarea}
              />
              <button onClick={saveEdit} className={styles.saveButton}>💾 Save</button>
            </>
          ) : (
            <>
              <span className={styles.noteText}>{note.text}</span>
              <div className={styles.actions}>
                <button onClick={() => startEdit(note)} className={styles.editButton}>✏️ Edit</button>
                <button onClick={() => deleteNote(note.id)} className={styles.deleteButton}>🗑️ Delete</button>
              </div>
            </>
          )}
        </div>
      ))}

      {notes.length === 0 && (
        <p className={styles.emptyMessage}>No notes yet. Start typing above!</p>
      )}
    </div>
  );
}