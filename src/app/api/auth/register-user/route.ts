import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants." },
        { status: 400 }
      );
    }
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "Cet email existe déjà." },
        { status: 400 }
      );
    }
    const hashed = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
      },
    });
    return NextResponse.json({
      message: "Inscription utilisateur réussie.",
    });
  } catch (e) {
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
