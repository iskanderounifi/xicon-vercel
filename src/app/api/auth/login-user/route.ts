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
    // Vérifie que l'utilisateur existe
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouvé." }, { status: 400 });
    }
    // Vérifie le mot de passe
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json({ error: "Mot de passe incorrect." }, { status: 400 });
    }
    // Connexion réussie : retourne l'info pour rediriger côté client
    return NextResponse.json({
      message: "Connexion réussie.",
      type: "user",
      redirect: "/dashboard",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      }
    });
  } catch (e) {
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
