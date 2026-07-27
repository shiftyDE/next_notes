"use client";

import { useState } from "react";
import Login from "./components/Login";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [username, setUsername] = useState(null);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 max-w-4xl mx-auto" role="navigation">
        <a href="/" aria-label="Home">📝 Notes</a>
        {username && (
          <div className="flex items-center gap-3 ml-auto">
            <span className="text-gray-400">{username}</span>
            <button onClick={() => setUsername(null)} aria-label="Logout" className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all duration-200 focus-visible:ring-2 focus-visible:ring-red-500">Logout</button>
          </div>
        )}
      </nav>

      <main role="main" className="max-w-4xl mx-auto px-6 py-8">
        {username ? (
          <>
            <NotesList notes={notes} setNotes={setNotes} username={username} onLogout={() => setUsername(null)} />
          </>
        ) : (
          <Login onLogin={(data) => setUsername(data.username)} />
        )}
      </main>

      {/* Structured Data */}
      {username && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Note App",
            "description": "An elegant note app for capturing, editing, and organizing your thoughts.",
            "url": "https://notes.app/",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "CrossPlatform",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "EUR"
            }
          })}
        </script>
      )}
    </div>
  );
}

export default App;