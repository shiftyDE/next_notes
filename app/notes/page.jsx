"use client";

import { useEffect, useState } from "react";
import NotesList from "@/app/components/NotesList";


export default function NotesPage() {

  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");



  useEffect(() => {

    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");


    if (!token) {

      setError("Nicht eingeloggt");

      setLoading(false);

      return;

    }


    if (savedUser) {

      setUser(
        JSON.parse(savedUser)
      );

    }



    fetch("/api/notes", {

      method: "GET",

      headers: {
        "Authorization": `Bearer ${token}`,
      },

    })

      .then(async (response) => {

        const data = await response.json();


        if (!response.ok) {

          throw new Error(
            data.error || "Notes konnten nicht geladen werden"
          );

        }


        return data;

      })

      .then((data) => {

        setNotes(data);

      })

      .catch((error) => {

        setError(
          error.message
        );

      })

      .finally(() => {

        setLoading(false);

      });


  }, []);



  if (loading) {

    return (
      <main className="p-6">
        Loading...
      </main>
    );

  }



  if (error) {

    return (
      <main className="p-6">

        <p>
          {error}
        </p>

      </main>
    );

  }



  return (

    <main className="min-h-screen">

      <div className="p-6">

        <h1 className="text-2xl font-bold">

          Meine Notes

        </h1>


        {user && (

          <p className="text-gray-400">

            Eingeloggt als: {user.username}

          </p>

        )}

      </div>



      <NotesList

        notes={notes}

        setNotes={setNotes}

        user={user}

      />


    </main>

  );

}