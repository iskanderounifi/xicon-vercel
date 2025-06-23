import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Champs obligatoires manquants." }, { status: 400 });
    }

    // Recherche de l'utilisateur avec l'email
    const user = await prisma.user.findUnique({
      where: { 
        email: email.toLowerCase() // Normalisation de l'email en minuscules
      }
    });

    if (!user) {
      return NextResponse.json({ error: "Email ou mot de passe incorrect." }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json({ error: "Email ou mot de passe incorrect." }, { status: 401 });
    }

    // Retourne les informations de l'utilisateur (sans le mot de passe)
    return NextResponse.json({
      message: "Connexion réussie",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: "USER"
      }
    });
  } catch (error) {
    console.error("Erreur de connexion:", error);
    return NextResponse.json({ error: "Erreur lors de la connexion." }, { status: 500 });
  }
}

// Prisma Client est bien généré, tu peux continuer à utiliser prisma.admin et prisma.user.
