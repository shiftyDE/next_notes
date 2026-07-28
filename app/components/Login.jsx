"use client";

import { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError("Please enter username and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Invalid credentials");
        setLoading(false);
        return;
      }

      setLoading(false);

      onLogin(data.user);

    } catch {
      setError("Connection error");
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-900 relative flex items-center justify-center overflow-hidden"
      role="main"
    >
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20 -z-10" />

      <div className="max-w-md mx-auto px-6 py-8 animate-fade-in-up">

        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span aria-hidden="true" className="text-4xl">
              🔐
            </span>
            <h1 className="text-4xl font-bold text-gray-100">
              Login
            </h1>
          </div>
        </div>

        <form onSubmit={handleSubmit}>

          {error && (
            <div
              className="mb-6 p-4 bg-red-900/20 border border-red-500/50 rounded-xl text-red-400 text-sm"
              role="alert"
            >
              ✖️ {error}
            </div>
          )}

          <div className="mb-6">
            <label htmlFor="username" className="sr-only">
              Username
            </label>

            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username..."
              aria-label="Username"
              className="w-full p-3 border border-gray-700/50 rounded-xl bg-gray-800/50 text-gray-200 placeholder-gray-500 h-12"
            />

            <p className="mt-1.5 text-xs text-gray-500">
              Enter your registered username
            </p>
          </div>


          <div className="mb-6">
            <label htmlFor="password" className="sr-only">
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password..."
              aria-label="Password"
              className="w-full p-3 border border-gray-700/50 rounded-xl bg-gray-800/50 text-gray-200 placeholder-gray-500 h-12"
            />

            <p className="mt-1.5 text-xs text-gray-500">
              Enter your password
            </p>
          </div>


          <button
            type="submit"
            aria-label="Login"
            disabled={loading}
            className="mt-4 w-full py-3 px-6 bg-gradient-to-r from-teal-800 to-blue-900 text-white font-semibold rounded-xl disabled:opacity-50"
          >
            {loading ? "Login..." : "Log in"}
          </button>

        </form>
      </div>
    </div>
  );
}
