import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "votre_secret_jwt";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email et mot de passe requis" },
        { status: 400 }
      );
    }

    // Recherche de l'utilisateur avec l'email
    const user = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase()
      },
      include: {
        entreprises: true
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: "Email ou mot de passe incorrect" },
        { status: 401 }
      );
    }

    // Vérification du mot de passe
    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Email ou mot de passe incorrect" },
        { status: 401 }
      );
    }

    // Génération du token JWT
    const token = jwt.sign(
      { 
        userId: user.id,
        email: user.email,
        role: "USER"
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Retourner les informations de l'utilisateur (sans le mot de passe)
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      message: "Connexion réussie",
      user: userWithoutPassword,
      token,
      redirect: "/dashboard"
    });

  } catch (error: any) {
    console.error("Erreur de connexion:", error);
    return NextResponse.json(
      { error: "Une erreur s'est produite lors de la connexion" },
      { status: 500 }
    );
  }
} 