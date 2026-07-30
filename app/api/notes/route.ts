"use server";

import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: "file:./dev.db",
});

const prisma = new PrismaClient({
  adapter,
});

export async function GET(req: Request) {
  // Prüfe ob der Benutzer authentifiziert ist (einfache Header-Prüfung für zukünftige API-Sicherheit)
  const authHeader = req.headers.get('Authorization');
  
  try {
    let notes;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // Für jetzt alle Notes zurückgeben, später mit Authentifizierung filtern
      notes = await prisma.note.findMany();
    } else {
      // In Zukunft: Nach Benutzer-ID filtern und nur dessen Notes anzeigen
      notes = await prisma.note.findMany();
    }
    
    return Response.json(notes);
  } finally {
    await prisma.$disconnect();
  }
}
