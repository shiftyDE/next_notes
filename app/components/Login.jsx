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
      setError("Please enter username and password.");
      return;
    }

    // Check hardcoded credentials only - case sensitive comparison for both username and password
    const inputUser = username.trim();
    const inputPass = password;
    
    if (inputUser !== VALID_USER || 
        inputPass !== VALID_PASS) {
      setError("Invalid credentials. Only user 'test' with password 'test' is allowed.");
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      onLogin({ username, password });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-900 relative flex items-center justify-center overflow-hidden" role="main">
      {/* Gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20 -z-10" />
      <div className="max-w-md mx-auto px-6 py-8 animate-fade-in-up">
        {/* Header */}
        <div className="text-center mb-8 z-10">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span aria-hidden="true" className="text-4xl">🔐</span>
            <h1 className="text-4xl font-bold text-gray-100">Login</h1>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="animate-fade-in-up">
          {error && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 rounded-xl text-red-400 text-sm animate-shake" role="alert">
              ✖️ {error}
            </div>
          )}

          {/* Username Input */}
          <div className="mb-6">
            <label htmlFor="username" className="sr-only">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(e); }}
              placeholder="Username..."
              aria-label="Username"
              className="w-full p-3 border border-gray-700/50 rounded-xl bg-gray-800/50 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-all duration-200 h-12 focus-visible:ring-2 focus-visible:ring-purple-400"
            />
            <p className="mt-1.5 p-2 text-xs text-gray-500">Username must match 'test'</p>
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(e); }}
              placeholder="Password..."
              aria-label="Password"
              className="w-full p-3 border border-gray-700/50 rounded-xl bg-gray-800/50 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-all duration-200 h-12 focus-visible:ring-2 focus-visible:ring-purple-400"
            />
            <p className="mt-1.5 p-2 text-xs text-gray-500">Password must match 'test'</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            aria-label="Login"
            disabled={loading}
            className="mt-4 w-full py-3 px-6 bg-gradient-to-r from-teal-800 to-blue-900 hover:from-teal-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg focus-visible:ring-2 focus-visible:ring-purple-500 active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.333 0 2 3.333 2 8h2z"></path>
                </svg>
                <span>Login...</span>
              </span>
            ) : (
              "Log in"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
