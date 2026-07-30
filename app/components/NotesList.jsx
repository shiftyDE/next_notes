"use client";
import { useState, useRef } from 'react';

export default function NotesList({ notes, setNotes, username, onLogout }) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const textareaRef = useRef(null);

  const startEdit = (note) => {
    setEditingId(note.id);
    setEditText(note.title || '');
    
    setTimeout(() => {
      document.querySelector(`[data-note-id="${note.id}"]`)?.querySelector('textarea')?.focus();
    }, 100);
  };

  const saveEdit = (e) => {
    if (editingId && editText.trim()) {
      e.preventDefault();
      setNotes(notes.map(note => 
        note.id === editingId ? { ...note, title: editText, updatedAt: new Date().toISOString() } : note
      ));
      setEditingId(null);
      setEditText('');
    }
  };

  const deleteNote = (noteId) => {
    setNotes(notes.filter(note => note.id !== noteId));
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
    
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 100);
  };

  const handleKeyDown = (e, action) => {
    switch(e.key) {
      case 'Enter': 
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
    <div className="max-w-2xl mx-auto" aria-label="Notes list">
      {notes.map((note, index) => (
        <article key={note.id} data-note-id={note.id} role="region" aria-label={`Note ${index + 1}`} className="mb-4 p-5 bg-gray-800 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300 group animate-fade-in focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:outline-none outline-none">
          {editingId === note.id ? (
            <>
              <label htmlFor={`edit-note-${note.id}`} className="sr-only">Edit note</label>
                <textarea
                  id={`edit-note-${note.id}`}
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, 'save')}
                  aria-label="Edit note"
                  ref={(el) => { if (el && editingId === note.id) textareaRef.current = el; }}
                  className="w-full p-2 mb-3 bg-gray-900 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors duration-200 resize-y h-24 focus-visible:ring-2 focus-visible:ring-purple-500"
                />
                <div className="flex justify-end gap-3">
                  <button
                    onClick={cancelEdit}
                    aria-label="Cancel editing"
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); cancelEdit(); } }}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-200 focus-visible:ring-2 focus-visible:ring-purple-500 active:scale-[0.98] opacity-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveEdit}
                    aria-label="Save note"
                    onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg focus-visible:ring-2 focus-visible:ring-green-500 active:scale-[0.98] disabled:opacity-50 opacity-100"
                  >
                    <span aria-hidden="true">💾</span>
                    Save
                  </button>
                </div>
              </>
          ) : (
            <>
              <p className="text-gray-300 whitespace-pre-wrap mb-2 focus:outline-none">{note.title}</p>
              <div className="flex items-center gap-2" role="group">
                <span aria-hidden="true" className="text-xl">🕐</span>
                <p className="sr-only">Created on {new Date(note.createdAt).toLocaleString('en-US')}</p>
                <p className="mt-1 text-xs text-gray-400" aria-label={`Created on ${new Date(note.createdAt).toLocaleString('en-US')}`}>{note.createdAt ? new Date(note.createdAt).toLocaleString('en-US') : ''}</p>
              </div>
              <div className="flex items-center gap-2" role="group">
                <span aria-hidden="true" className="text-xl">⏱️</span>
                <p className="sr-only">{note.updatedAt ? `Modified on ${new Date(note.updatedAt).toLocaleString('en-US')}` : 'Not yet edited'}</p>
                <p className="text-xs text-teal-400 mt-0.5" aria-label={note.updatedAt ? `Modified on ${new Date(note.updatedAt).toLocaleString('en-US')}` : 'Not yet edited'}>{note.updatedAt ? new Date(note.updatedAt).toLocaleString('en-US') : 'Not edited'}</p>
              </div>
              <div className="flex justify-end gap-2" role="group">
                <button
                  onClick={() => startEdit(note)}
                  aria-label="Edit note"
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); startEdit(note); } }}
                  className="px-4 py-2 bg-blue-600/80 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-500 active:scale-[0.98] opacity-100"
                >
                  <span aria-hidden="true">✏️</span>
                  Edit
                </button>
                <button
                  onClick={() => deleteNote(note.id)}
                  aria-label="Delete note"
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); deleteNote(note.id); } }}
                  className="px-4 py-2 bg-red-600/80 hover:bg-red-700 text-white rounded-lg transition-all duration-200 focus-visible:ring-2 focus-visible:ring-red-500 active:scale-[0.98] opacity-100"
                >
                  <span aria-hidden="true">🗑️</span>
                  Delete
                </button>
              </div>
            </>
          )}
        </article>
      ))}

      {/* Empty State */}
      {notes.length === 0 && (
        <div className="text-center py-12 animate-fade-in" role="status">
          <span aria-hidden="true">🌟</span>
          <p className="sr-only">Stars decorative element</p>
          <p className="text-gray-400 text-lg mb-3">Your notes will appear here</p>
          <p className="text-gray-400 text-sm">Start typing above to create your first note!</p>
        </div>
      )}

      {/* Logout Button */}
      {username && (
        <button
          onClick={onLogout}
          aria-label="Logout"
          className="mt-6 w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all duration-200 shadow-lg focus-visible:ring-2 focus-visible:ring-red-500 active:scale-[0.98]"
        >
          <span aria-hidden="true">🚪</span> Logout
        </button>
      )}
    </div>
  );
}
