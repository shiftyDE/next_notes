"use server";

import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: "file:./dev.db",
});

const prisma = new PrismaClient({
  adapter,
});

// Einfache JWT-Decodierung für den Authorization-Header (ohne echte Verschlüsselung)
function decodeToken(token: string): { userId?: number } | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    // Base64-Entschlüsselung mit URL-safe Zeichen
    const base64Url = parts[1];
    const padding = '='.repeat((4 - (base64Url.length % 4)) % 4);
    const base64 = `${base64Url}${padding}`;

    let decoded: string;
    try {
      decoded = atob(base64);
    } catch {
      // Wenn es nicht funktioniert, versuche es mit der Standard-Funktion
      try {
        decoded = Buffer.from(base64, 'base64').toString('utf-8');
      } catch {
        return null;
      }
    }

    const payload: any = JSON.parse(decoded);
    
    // Prüfe ob userId im Token enthalten ist
    if (payload.userId !== undefined) {
      return { userId: payload.userId };
    }
  } catch {
    return null;
  }
  
  return null;
}

export async function GET(req: Request) {
  const authHeader = req.headers.get('Authorization');
  
  try {
    let notes;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // Für jetzt alle Notes zurückgeben, später mit Authentifizierung filtern
      notes = await prisma.note.findMany();
    } else {
      const token = authHeader.slice(7);
      const decodedToken = decodeToken(token);
      
      if (decodedToken?.userId) {
        // Benutzer-Notes zeigen
        notes = await prisma.note.findMany({ where: { userId: decodedToken.userId } });
      } else {
        // Fallback: Alle Notes anzeigen
        notes = await prisma.note.findMany();
      }
    }

    return Response.json(notes);
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req: Request) {
  const authHeader = req.headers.get('Authorization');
  
  try {
    let userId;
    
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.slice(7);
      const decodedToken = decodeToken(token);
      
      if (decodedToken?.userId) {
        userId = decodedToken.userId;
      } else {
        // Wenn kein Token, aber Body-Parameter vorhanden sind
        const body = await req.json();
        userId = body.userId || undefined;
      }
    } else {
      const body = await req.json();
      userId = body.userId || undefined;
    }

    if (!userId) {
      return new Response(JSON.stringify({ message: 'User ID is required' }), { status: 400 });
    }

    // Note erstellen mit der Benutzer-ID
    const parsedBody = await req.json();
    
    const newNote = await prisma.note.create({
      data: {
        title: parsedBody.title,
        content: parsedBody.content,
        userId,
      },
    });

    return Response.json(newNote);
  } catch (error) {
    console.error('Error creating note:', error);
    return new Response(JSON.stringify({ message: 'Error creating note' }), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}