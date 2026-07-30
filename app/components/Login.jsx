"use client";

import React, { useState } from "react";

export default function Login({ onLogin }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  async function handleSubmit(e) {

    e.preventDefault();

    setError("");
    setLoading(true);


    try {

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });


      const data = await response.json();


      if (!response.ok) {
        throw new Error(
          data.error || "Login fehlgeschlagen"
        );
      }


      localStorage.setItem(
        "token",
        data.token
      );


      if (onLogin) {
        onLogin(data.user);
      }


    } catch (error) {

      setError(error.message);


    } finally {

      setLoading(false);

    }

  }


  return (
    <form onSubmit={handleSubmit}>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) =>
          setUsername(e.target.value)
        }
      />


      <input
        type="password"
        placeholder="Passwort"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />


      {
        error &&
        <p>
          {error}
        </p>
      }


      <button
        type="submit"
        disabled={loading}
      >
        {
          loading
            ? "Login..."
            : "Login"
        }
      </button>


    </form>
  );
}