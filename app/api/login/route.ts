import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";


export async function POST(req: Request) {

  try {

    const body = await req.json();

    console.log("LOGIN BODY:", body);


    const {
      username,
      password,
    } = body;


    if (!username || !password) {

      return NextResponse.json(
        {
          error: "Username und Passwort erforderlich",
        },
        {
          status: 400,
        }
      );

    }


    const user = await prisma.user.findUnique({

      where: {
        username,
      },

    });


    if (!user) {

      return NextResponse.json(
        {
          error: "Login fehlgeschlagen",
        },
        {
          status: 401,
        }
      );

    }


    if (user.password !== password) {

      return NextResponse.json(
        {
          error: "Login fehlgeschlagen",
        },
        {
          status: 401,
        }
      );

    }


    const token = jwt.sign(

      {
        id: user.id,
        username: user.username,
      },

      process.env.JWT_SECRET!,

      {
        expiresIn: "7d",
      }

    );


    return NextResponse.json({

      success: true,

      user: {
        id: user.id,
        username: user.username,
      },

      token,

    });


  } catch (error) {

    console.error(error);


    return NextResponse.json(
      {
        error: "Server Fehler",
      },
      {
        status: 500,
      }
    );

  }

}