"use client";

export default function NotesList({
  notes = [],
  setNotes,
  user,
  username,
  userId
}) {

  const resolvedUserId = userId || user?.id;


  const filteredNotes = notes.filter(
    (note) => note.userId === resolvedUserId
  );


  function deleteNote(id, e) {

    e.preventDefault();

    setNotes((currentNotes) =>
      currentNotes.filter(
        (note) => note.id !== id
      )
    );

  }


  return (
    <div className="flex flex-col gap-4 p-6">

      <div
        data-testid="notes-area"
        role="list"
        aria-label="Your notes"
        className="space-y-3"
      >

        {filteredNotes.map((note) => (

          <div
            key={note.id}
            data-note-id={note.id}
            className="group relative p-4 bg-gray-800/50 border border-gray-700/50 rounded-xl hover:border-teal-900/30 transition-all duration-200 animate-fade-in-up"
            role="listitem"
          >

            <div
              data-testid="note-item"
              className="flex flex-col gap-1.5"
            >

              <p
                data-testid="note-text"
                className="text-gray-200 whitespace-pre-wrap leading-relaxed break-words"
              >
                {note.content}
              </p>


              {note.updatedAt && (

                <p className="text-xs text-gray-600 mt-1">

                  Updated:
                  {" "}
                  {new Date(
                    note.updatedAt
                  ).toLocaleString("de-DE")}

                </p>

              )}


            </div>


            <button

              onClick={(e) =>
                deleteNote(note.id, e)
              }

              data-testid="delete-button"

              className="absolute -top-1.5 -right-1.5 w-6 h-6 flex items-center justify-center rounded-full bg-red-900/20 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-900/30"

              aria-label={`Delete note ${note.id}`}

            >

              ✖️

            </button>


          </div>

        ))}



        {filteredNotes.length === 0 && (

          <p className="text-gray-500 text-sm">
            No notes yet
          </p>

        )}


      </div>

    </div>
  );

}