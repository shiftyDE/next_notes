"use client";
import { useState, useRef, useEffect } from 'react';

export default function NotesList({ notes = [], setNotes, user, username }) {
  const [isAddingNote, setIsAddingNote] = useState(false);
  const textareaRef = useRef(null);

  // Focus the new note textarea when adding a note starts
  useEffect(() => {
    if (isAddingNote) {
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 50);
    }
  }, [isAddingNote]);

  const handleAddNote = () => {
    setIsAddingNote(true);
  };

  const handleTextareaKeyDown = (e, note) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      saveCurrentNote(note);
    } else if (e.key === 'Escape') {
      cancelEditing();
    }
  };

  const saveCurrentNote = (note) => {
    if (!textareaRef.current?.value?.trim()) return;

    setNotes(prevNotes => {
      // Remove the temporary empty note from the list
      let updatedNotes = prevNotes.filter(n => n.id !== note.id);

      // If we were adding a brand new note, replace it with the real content
      if (note.id === undefined || note.id === null) {
        const realNote = {
          id: Date.now(),
          title: textareaRef.current.value.trim() || 'Untitled Note',
          content: textareaRef.current.value.trim(),
          userId: user?.id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        return [realNote, ...updatedNotes];
      }

      // If editing an existing note, update it
      if (note.id) {
        return prevNotes.map(n =>
          n.id === note.id ? {
            ...n,
            title: textareaRef.current.value.trim() || 'Untitled Note',
            content: textareaRef.current.value.trim(),
            updatedAt: new Date().toISOString(),
          } : n
        );
      }

      return prevNotes;
    });

    setIsAddingNote(false);
  };

  const cancelEditing = () => {
    if (textareaRef.current) {
      textareaRef.current.value = '';
    }
    setIsAddingNote(false);
  };

  // Build the notes list from the database data
  const displayNotes = notes.map(note => ({
    id: note.id,
    title: note.title || 'Untitled Note',
    content: note.content,
    createdAt: new Date(note.createdAt).toLocaleString('de-DE'),
    updatedAt: new Date(note.updatedAt).toLocaleString('de-DE'),
  }));

  // Add a temporary empty note for the textarea (will be replaced when Enter is pressed)
  const tempNote = { id: undefined, title: '', content: '' };

  return (
    <div className="max-w-4xl mx-auto" role="list">
      {/* Notes List Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-300 flex items-center gap-2">
          <span aria-hidden="true">&#9670;</span>
          Meine Notizen
        </h2>
        {isAddingNote && (
          <button
            onClick={cancelEditing}
            aria-label="Cancel editing"
            className="text-sm px-3 py-1 bg-gray-800 hover:bg-gray-700 text-gray-400 rounded-lg transition-all duration-200 shadow focus-visible:ring-2 focus-visible:ring-purple-500 active:scale-[0.95]"
          >
            Abbrechen
          </button>
        )}
      </div>

      {/* Notes List */}
      {displayNotes.length === 0 ? (
        <p className="text-gray-500 text-sm py-8 text-center">Noch keine Notizen vorhanden.</p>
      ) : (
        displayNotes.map((note) => (
          <div
            key={note.id}
            data-note-id={note.id}
            role="listitem"
            className="mb-4 animate-fade-in-up"
          >
            {/* Note Card */}
            <div className="bg-gray-800/50 border border-gray-700/30 rounded-xl p-4 shadow-lg focus-trap-notes">
              <textarea
                ref={isAddingNote ? textareaRef : null}
                onKeyDown={(e) => handleTextareaKeyDown(e, note)}
                placeholder="Schreibe hier deine Notiz..."
                aria-label={`Notiz ${note.id}`}
                className="w-full bg-transparent border-none outline-none resize-y min-h-[80px] text-gray-200 placeholder-gray-500 h-auto p-1"
                defaultValue={note.content}
              />

              {/* Note Footer */}
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-700/30">
                {/* Timestamps and Actions */}
                <span className="text-xs text-gray-500 flex items-center gap-1.5">
                  <span aria-hidden="true">&#8984;</span>
                  {note.updatedAt}
                </span>

                {/* Delete Button */}
                <button
                  onClick={() => setNotes(prevNotes => prevNotes.filter(n => n.id !== note.id))}
                  aria-label={`Delete note ${note.id}`}
                  className="opacity-0 group-hover:opacity-100 transition-all duration-300 focus:opacity-100 text-gray-400 hover:text-red-400 rounded-lg px-2 py-0.5 focus-visible:ring-2 focus-visible:ring-red-500 active:scale-[0.95]"
                >
                  <span aria-hidden="true">&#x2718;</span>
                </button>

                {/* Edit Button */}
                <button
                  onClick={() => {
                    setNotes(prevNotes =>
                      prevNotes.map(n =>
                        n.id === note.id ? { ...n, isEditing: true } : n
                      )
                    );
                  }}
                  aria-label={`Edit note ${note.id}`}
                  className="opacity-0 group-hover:opacity-100 transition-all duration-300 focus:opacity-100 text-gray-400 hover:text-blue-400 rounded-lg px-2 py-0.5 focus-visible:ring-2 focus-visible:ring-blue-500 active:scale-[0.95]"
                >
                  <span aria-hidden="true">&#9998;</span>
                </button>
              </div>
            </div>

            {/* Add new note button */}
            {isAddingNote && (
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-gray-500">Neue Notiz eingeben...</span>
                <button
                  onClick={handleAddNote}
                  aria-label="Cancel adding note"
                  className="text-sm px-2 py-1 bg-gray-800 hover:bg-gray-700 text-gray-400 rounded-lg transition-all duration-200 shadow focus-visible:ring-2 focus-visible:ring-purple-500 active:scale-[0.95]"
                >
                  Abbrechen
                </button>
              </div>
            )}

            {/* Add new note textarea */}
            {isAddingNote && (
              <textarea
                ref={textareaRef}
                onKeyDown={(e) => handleTextareaKeyDown(e, null)}
                placeholder="Schreibe hier deine neue Notiz..."
                aria-label="Neue Notiz"
                className="w-full bg-gray-800/50 border border-gray-700/30 rounded-xl p-4 shadow-lg focus-trap-notes mt-2"
              />
            )}
          </div>
        ))
      )}

      {/* Add new note button */}
      {!isAddingNote && (
        <button
          onClick={handleAddNote}
          aria-label="Add new note"
          className="mt-4 px-6 py-2 bg-gradient-to-r from-teal-800 to-blue-900 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg focus-visible:ring-2 focus-visible:ring-purple-500 active:scale-[0.98] hover:from-teal-700 hover:to-blue-800"
        >
          + Neue Notiz hinzufügen
        </button>
      )}

      {/* Focus trap helper */}
      <div className="hidden" aria-hidden="true">
        {isAddingNote ? (textareaRef.current) : null}
      </div>
    </div>
  );
}