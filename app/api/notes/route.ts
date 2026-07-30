import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";


function getUserFromToken(req: Request) {

  const authHeader = req.headers.get("Authorization");


  if (!authHeader?.startsWith("Bearer ")) {
    return null;
  }


  const token = authHeader.substring(7);


  try {

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as {
      id: number;
      username: string;
    };


    return decoded;


  } catch {

    return null;

  }

}



export async function GET(req: Request) {

  try {

    const user = getUserFromToken(req);


    if (!user) {

      return NextResponse.json(
        {
          error: "Nicht eingeloggt",
        },
        {
          status: 401,
        }
      );

    }


    const notes = await prisma.note.findMany({

      where: {
        userId: user.id,
      },

      orderBy: {
        createdAt: "desc",
      },

    });


    return NextResponse.json(notes);


  } catch (error) {

    console.error(error);


    return NextResponse.json(
      {
        error: "Fehler beim Laden der Notes",
      },
      {
        status: 500,
      }
    );

  }

}



export async function POST(req: Request) {

  try {

    const user = getUserFromToken(req);


    if (!user) {

      return NextResponse.json(
        {
          error: "Nicht eingeloggt",
        },
        {
          status:401,
        }
      );

    }


    const body = await req.json();


    const note = await prisma.note.create({

      data: {

        title: body.title,

        content: body.content,

        userId: user.id,

      },

    });


    return NextResponse.json(note);


  } catch(error) {

    console.error(error);


    return NextResponse.json(
      {
        error:"Fehler beim Erstellen der Note",
      },
      {
        status:500,
      }
    );

  }

}