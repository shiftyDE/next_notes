"use server";

import { NextResponse } from "next/server";

// In einer realen Anwendung würdet ihr hier Prisma oder ein Auth-System verwenden.
// Da wir aktuell keine Datenbank-Anbindung haben, simulieren wir den Login.

export async function POST(req: Request) {

  let body: any;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid JSON" },
      { status: 400 }
    );
  }

  const { username, password } = body;

  // Einfache Validierung
  if (!username || !password) {
    return NextResponse.json(
      { error: "Username and password are required" },
      { status: 400 }
    );
  }

  // In einer echten Anwendung würdet ihr hier die Benutzerdaten mit der Datenbank vergleichen.
  // Für jetzt simulieren wir einen erfolgreichen Login.
  
  const user = {
    username,
    isAuthenticated: true,
    role: "user"
  };

  return NextResponse.json({ 
    message: "Login erfolgreich",
    user 
  });
}