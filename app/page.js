"use client";
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
    <div className="min-h-screen bg-gray-900 dark:bg-gray-900 text-white p-6">
      {/* Header */}
      <header className="mb-8 animate-fade-in-down">
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
          <span className="text-gray-400">📝</span>
          Notes
        </h1>
        <p className="text-gray-400 text-sm">Capture your thoughts in style</p>
      </header>

      {/* Input Area */}
      <div className="mb-8 max-w-2xl mx-auto">
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Type your note here..."
          className="w-full p-4 border border-gray-700 rounded-xl bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors duration-200 resize-y h-32"
        />
        <button
          onClick={addNote}
          className="mt-4 w-full py-3 px-6 bg-gradient-to-r from-teal-800 to-blue-900 hover:from-teal-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg"
        >
          ✨ Add Note
        </button>
      </div>

      {/* Notes List */}
      <div className="max-w-2xl mx-auto">
        {notes.map((note) => (
          <div key={note.id} className="mb-4 p-5 bg-gray-800 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300 group animate-fade-in">
            {editingId === note.id ? (
              <>
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-full p-2 mb-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors duration-200 resize-y h-24"
                />
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveEdit}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-green-500/25"
                  >
                    💾 Save
                  </button>
                </div>
              </>
            ) : (
              <>
                <pre className="text-gray-300 whitespace-pre-wrap">{note.text}</pre>
                <div className="mt-3 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => startEdit(note)}
                    className="px-4 py-2 bg-blue-600/80 hover:bg-blue-700 text-white rounded-lg transition-all duration-200"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="px-4 py-2 bg-red-600/80 hover:bg-red-700 text-white rounded-lg transition-all duration-200"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}

        {/* Empty State */}
        {notes.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <p className="text-gray-400 text-lg mb-3">🌟 Your notes will appear here</p>
            <p className="text-gray-500 text-sm">Start typing above to create your first note!</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-600 text-xs">
        <p>Built with ✨ Tailwind CSS & React</p>
      </footer>
    </div>
  );
}
