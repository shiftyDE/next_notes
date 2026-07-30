"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";


export default function Login({ onLogin }) {

  const router = useRouter();


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
          username,
          password,
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


      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );


      if (onLogin) {
        onLogin(data.user);
      }


      // Weiterleitung nach erfolgreichem Login
      router.push("/notes");


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


      {error && (
        <p>
          {error}
        </p>
      )}


      <button
        type="submit"
        disabled={loading}
      >
        {loading ? "Login..." : "Login"}
      </button>


    </form>
  );

}