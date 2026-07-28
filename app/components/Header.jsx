"use client";

export default function Header({ username, onLogout }) {
  return (
    <header className="mb-5 py-2 bg-gray-900" role="banner">
      <h1 className="max-w-2xl mx-auto font-bold flex gap-3">
        <svg className="w-6 h-6 text-yellow-400" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2.5" fill="#fef3c7" stroke="#fbbf24" strokeWidth="1"/>
          <circle cx="9" cy="9" r="1.5" fill="#d97706"/>
          <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="#fbbf24" strokeWidth="0.8"/>
        </svg>
        <span className="sr-only">Note</span>
        <span>Notes</span>
      </h1>
      {username && (
        <button onClick={onLogout} aria-label="Logout" className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all duration-200 shadow-lg focus-visible:ring-2 focus-visible:ring-red-500 active:scale-[0.98]">
          <span aria-hidden="true">Logout</span>
        </button>
      )}
    </header>
  );
}
