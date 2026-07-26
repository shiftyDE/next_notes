"use client";
import { useState, useRef, useEffect } from 'react';

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState('');
  const [editText, setEditText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    // Set focus to textarea when page loads and no notes exist
    if (notes.length === 0 && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [notes]);

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
      case 'Enter': if(action === 'save') saveEdit(); break;
      case 'Escape': cancelEdit(); break;
      default: break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 dark:bg-gray-900 text-white p-6" role="main">
      {/* Skip Navigation Link */}
      <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-purple-600 focus:text-white focus:p-3 focus:rounded-lg z-50" aria-label="Zum Hauptinhalt springen">
        Zum Inhalt springen
      </a>

      {/* Header */}
      <header className="mb-8 animate-fade-in-down" role="banner">
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
          <span aria-hidden="true">📝</span>
          <span className="sr-only">Notiz</span>
          Notizen
        </h1>
        <p className="text-gray-400 text-sm" role="status">Fange deine Gedanken auf</p>
      </header>

      {/* Input Area */}
      <div className="mb-8 max-w-2xl mx-auto">
        <textarea
          ref={textareaRef}
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); addNote(); } }}
          placeholder="Schreibe deine Notiz hier..."
          aria-label="Notiz eingeben"
          className="w-full p-4 border border-gray-700 rounded-xl bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors duration-200 resize-y h-32 focus-visible:ring-2 focus-visible:ring-purple-500"
          tabIndex={1}
        />
        <button
          onClick={addNote}
          aria-label="Notiz hinzufügen"
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); addNote(); } }}
          className="mt-4 w-full py-3 px-6 bg-gradient-to-r from-teal-800 to-blue-900 hover:from-teal-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg focus-visible:ring-2 focus-visible:ring-purple-500 active:scale-[0.98] disabled:opacity-50"
          tabIndex={1}
        >
          ✨ Notiz hinzufügen
        </button>
      </div>

      {/* Notes List */}
      <nav className="max-w-2xl mx-auto" aria-label="Notizenliste">
        {notes.map((note, index) => (
            <article key={note.id} data-note-id={note.id} tabIndex={index + 1} className="mb-4 p-5 bg-gray-800 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300 group animate-fade-in">
            {editingId === note.id ? (
              <>
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, 'save')}
                  aria-label="Notiz bearbeiten"
                  className="w-full p-2 mb-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors duration-200 resize-y h-24 focus-visible:ring-2 focus-visible:ring-purple-500"
                />
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setEditingId(null)}
                    aria-label="Bearbeiten abbrechen"
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setEditingId(null); } }}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-200 focus-visible:ring-2 focus-visible:ring-purple-500 active:scale-[0.98] opacity-100"
                  >
                    Abbrechen
                  </button>
                  <button
                    onClick={() => handleKeyDown({ key: 'Enter' }, 'save')}
                    aria-label="Notiz speichern"
                    onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg focus-visible:ring-2 focus-visible:ring-green-500 active:scale-[0.98] disabled:opacity-50 opacity-100"
                  >
                    💾 Speichern
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-gray-300 whitespace-pre-wrap focus:outline-none">{note.text}</p>
                <p className="mt-1 text-xs text-gray-500" aria-label={`Erstellt am ${new Date(note.timestamp).toLocaleString('de-DE')}`}>🕐 {new Date(note.timestamp).toLocaleString('de-DE')}</p>
                <p className="text-xs text-teal-400 mt-0.5" aria-label={note.updatedAt ? `Geändert am ${new Date(note.updatedAt).toLocaleString('de-DE')}` : 'Noch nicht bearbeitet'}>{note.updatedAt ? new Date(note.updatedAt).toLocaleString('de-DE') : 'Nicht bearbeitet'}</p>
                <div className="mt-3 flex justify-end gap-2" role="group">
                  <button
                    onClick={() => startEdit(note)}
                    aria-label="Notiz bearbeiten"
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); startEdit(note); } }}
                    className="px-4 py-2 bg-blue-600/80 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-500 active:scale-[0.98] opacity-100"
                  >
                    ✏️ Bearbeiten
                  </button>
                  <button
                    onClick={(e) => deleteNote(note.id, e)}
                    aria-label="Notiz löschen"
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); deleteNote(note.id, e); } }}
                    className="px-4 py-2 bg-red-600/80 hover:bg-red-700 text-white rounded-lg transition-all duration-200 focus-visible:ring-2 focus-visible:ring-red-500 active:scale-[0.98] opacity-100"
                  >
                    🗑️ Löschen
                  </button>
                </div>
              </>
            )}
          </article>
        ))}

        {/* Empty State */}
        {notes.length === 0 && (
          <div className="text-center py-12 animate-fade-in" role="status">
            <p className="text-gray-400 text-lg mb-3">🌟 Deine Notizen erscheinen hier</p>
            <p className="text-gray-500 text-sm">Beginne mit dem Tippen oben, um deine erste Notiz zu erstellen!</p>
          </div>
        )}
      </nav>

      {/* Footer */}
      <footer id="content" className="mt-12 text-center text-gray-600 text-xs" role="contentinfo">
        <p>Built with ✨ Tailwind CSS & React</p>
      </footer>
    </div>
  );
}