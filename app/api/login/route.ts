"use server";

import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: "file:./dev.db",
});

const prisma = new PrismaClient({
  adapter,
});

export async function POST(req: Request) {

  let body: any;
  try {
    body = await req.json();
  } catch (error) {
    return Response.json(
      { error: "Invalid JSON" },
      { status: 400 }
    );
  }

  const { username, password } = body;

  // Einfache Validierung
  if (!username || !password) {
    return Response.json(
      { error: "Username and password are required" },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user || user.password !== password) {
      return Response.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const authenticatedUser = {
      id: user.id,
      username: user.username,
      createdAt: user.createdAt,
      isAuthenticated: true,
      role: "user",
    };

    return Response.json({ 
      message: "Login successful",
      user: authenticatedUser 
    });
  } finally {
    await prisma.$disconnect();
  }
}
