"use client";
import { useState, useRef, useEffect } from 'react';
import Header from './components/Header.jsx';
import InputArea from './components/InputArea.jsx';
import NotesList from './components/NotesList.jsx';
import Login from './components/Login.jsx';

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState('');
  const [editText, setEditText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const textareaRef = useRef(null);

  // Fetch notes from API on mount
  useEffect(() => {
    fetch('/api/notes')
      .then(res => res.json())
      .then(data => setNotes(data))
      .catch(err => console.error('Failed to load notes:', err));
  }, []);

  const handleLogin = ({ username, password }) => {
    setUsername(username);
    setUser({ id: Date.now(), username });
    setIsAuthenticated(true);
  };

  const addNote = () => {
    if (noteText.trim()) {
      setNotes([...notes, { id: Date.now(), text: noteText, timestamp: new Date().toISOString() }]);
      setNoteText('');
      // Move focus to the newly added note or back to textarea
      const lastNote = notes[notes.length - 1];
      if (lastNote) {
        document.querySelector(`[data-note-id="${lastNote.id}"]`)?.focus();
      } else {
        textareaRef.current?.focus();
      }
    }
  };

  const deleteNote = (id, e) => {
    e.preventDefault();
    setNotes(notes.filter(note => note.id !== id));
  };

  const startEdit = (note, index) => {
    setEditingId(note.id);
    setEditText(note.text);
    
    // Focus the textarea in edit mode after a short delay to allow React render
    setTimeout(() => {
      document.querySelector(`[data-note-id="${note.id}"]`)?.querySelector('textarea')?.focus();
    }, 100);
  };

  const saveEdit = () => {
    if (editingId && editText.trim()) {
      setNotes(notes.map(note => 
        note.id === editingId ? { ...note, text: editText, updatedAt: new Date().toISOString() } : note
      ));
      setEditingId(null);
      setEditText('');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
    
    // Return focus to the main textarea after edit is cancelled or saved
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 100);
  };

  // Focus trap helper for modals  
  useEffect(() => {
    if (editingId) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [editingId]);

  const handleKeyDown = (e, action) => {
    switch(e.key) {
      case 'Enter': 
        // Add new line instead of saving on Enter press
        if(editText && editText.trim()) {
          setEditText(editText + '\n');
        } else {
          e.preventDefault();
          saveEdit();
        }
        break;
      case 'Escape': cancelEdit(); break;
      default: break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200" role="main">
      {/* Skip Navigation Link */}
      <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-purple-600 focus:text-white focus:p-3 focus:rounded-lg z-50" aria-label="Skip to content">
        Skip to content
      </a>

      {!isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          {/* Header Area */}
          <Header />

           {/* Input Area */}
           <InputArea noteText={noteText} setNoteText={setNoteText} addNote={addNote} />

          {/* Notes List */}
          <NotesList notes={notes} setNotes={setNotes} user={user} username={username} />
        </>
      )}

    </div>
  );
}
