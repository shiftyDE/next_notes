"use client";

import React, { useRef, useEffect } from "react";

export default function InputArea({ noteText, setNoteText, addNote, ref }) {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  return (
    <PartialInput>
      <textarea
        ref={ref}
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); addNote(); } }}
        placeholder="Write your note here..."
        aria-label="Input note"
        className="w-full p-4 border border-gray-700 rounded-xl bg-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors duration-200 resize-y h-32 focus-visible:ring-2 focus-visible:ring-purple-500"
      />
      <button
        onClick={addNote}
        aria-label="Add note"
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); addNote(); } }}
        className="mt-4 w-full py-3 px-6 bg-gradient-to-r from-teal-800 to-blue-900 hover:from-teal-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg focus-visible:ring-2 focus-visible:ring-purple-500 active:scale-[0.98] disabled:opacity-50"
      >
        ✨ Add Note
      </button>
    </PartialInput>
  );
}

function PartialInput({ children }) {
  return <div className="mb-8 max-w-2xl mx-auto">{children}</div>;
}