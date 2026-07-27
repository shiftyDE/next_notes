"use client";

export default function Header({ username, onLogout }) {
  return (
    <header className="mb-8 animate-fade-in-down" role="banner">
      <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
        <span aria-hidden="true">📝</span>
        <span className="sr-only">Note</span>
        Notes
      </h1>
      {username && (
        <div className="flex justify-end mt-4">
          <button onClick={onLogout} aria-label="Logout" className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all duration-200 focus-visible:ring-2 focus-visible:ring-red-500">Logout</button>
        </div>
      )}
    </header>
  );
}
