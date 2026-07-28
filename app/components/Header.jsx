"use client";

export default function Header({ username, onLogout }) {
  return (
    <header className="mb-8 max-w-2xl mx-auto" role="banner">
      <h1 className="text-4xl font-bold flex gap-3 max-w-4xl mx-auto">
        <span aria-hidden="true">📝</span>
        <span className="sr-only">Note</span>
        <span>Notes</span>
      </h1>
      {username && (
        <button onClick={onLogout} aria-label="Logout" className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all duration-200 shadow-lg focus-visible:ring-2 focus-visible:ring-red-500 active:scale-[0.98]">
          <span aria-hidden="true">🚪</span> Logout
        </button>
      )}
    </header>
  );
}
