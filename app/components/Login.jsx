"use client";

import { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Only this hardcoded user/password is allowed
  const VALID_USER = "test";
  const VALID_PASS = "test";

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      setError("Bitte Benutzernamen und Passwort eingeben.");
      return;
    }

    // Check hardcoded credentials only
    if (username.trim().toLowerCase() !== VALID_USER.toLowerCase() || 
        password.toLowerCase() !== VALID_PASS) {
      setError("Ungültige Zugangsdaten. Nur Benutzer 'test' mit Passwort 'test' ist erlaubt.");
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      onLogin({ username, password });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4" role="main">
      <div className="w-full max-w-md animate-fade-in-up">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-down">
          <h1 className="text-4xl font-bold mb-2 text-gray-100 flex items-center gap-3 justify-center">
            <span aria-hidden="true">🔐</span>
            <span>Login</span>
          </h1>
          <p className="text-gray-400 text-sm" role="status">Willkommen zurück</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="animate-fade-in-up">
          {error && (
            <div className="mb-6 p-3 bg-red-900/20 border border-red-500/50 rounded-xl text-red-400 text-sm animate-shake" role="alert">
              ✖️ {error}
            </div>
          )}

          {/* Username Input */}
          <PartialInput>
            <label htmlFor="username" className="sr-only">Benutzername</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(e); }}
              placeholder="Benutzername..."
              aria-label="Benutzername"
              className="w-full p-4 border border-gray-700 rounded-xl bg-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors duration-200 resize-y h-14 focus-visible:ring-2 focus-visible:ring-purple-500"
            />
          </PartialInput>

          {/* Password Input */}
          <PartialInput>
            <label htmlFor="password" className="sr-only">Passwort</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(e); }}
              placeholder="Passwort..."
              aria-label="Passwort"
              className="w-full p-4 border border-gray-700 rounded-xl bg-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors duration-200 resize-y h-14 focus-visible:ring-2 focus-visible:ring-purple-500"
            />
          </PartialInput>

          {/* Submit Button */}
          <button
            type="submit"
            aria-label="Login"
            disabled={loading}
            className="mt-6 w-full py-3 px-6 bg-gradient-to-r from-teal-800 to-blue-900 hover:from-teal-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg focus-visible:ring-2 focus-visible:ring-purple-500 active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.333 0 2 3.333 2 8h2z"></path>
                </svg>
                Login...
              </span>
            ) : (
              "Anmelden"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

function PartialInput({ children }) {
  return <div className="mb-6 max-w-md mx-auto">{children}</div>;
}