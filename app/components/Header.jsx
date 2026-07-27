"use client";

export default function Header() {
  return (
    <header className="mb-8 animate-fade-in-down" role="banner">
      <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
        <span aria-hidden="true">📝</span>
        <span className="sr-only">Note</span>
        Notes
      </h1>
      <p className="text-gray-400 text-sm" role="status">Capture your thoughts</p>
    </header>
  );
}