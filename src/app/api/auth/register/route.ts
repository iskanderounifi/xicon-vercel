import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Body reçu:", body);
    const { name, email, password } = body;
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants." },
        { status: 400 }
      );
    }

    // Enregistrement uniquement dans la table Admin
    const existingAdmin = await prisma.admin.findUnique({ where: { email } });
    if (existingAdmin) {
      return NextResponse.json(
        { error: "Cet email admin existe déjà." },
        { status: 400 }
      );
    }
    const hashed = await bcrypt.hash(password, 10);
    await prisma.admin.create({
      data: {
        name,
        email,
        password: hashed,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    return NextResponse.json({
      message: "Inscription admin réussie.",
    });
  } catch (e) {
    console.error("Erreur register:", e);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}