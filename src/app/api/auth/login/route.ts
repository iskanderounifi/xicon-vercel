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

    // Correction : la table s'appelle Admin (avec un A majuscule) dans Prisma par défaut
    const admin = await prisma.admin
      ? await prisma.admin.findUnique({ where: { email } })
      : await prisma.Admin.findUnique({ where: { email } });
    // Si la propriété admin n'existe pas, utilise Admin (selon la casse du modèle dans schema.prisma)
    // Si tu utilises le modèle généré par Prisma, c'est souvent prisma.admin ou prisma.Admin

    if (!admin) {
      return NextResponse.json({ error: "Admin non trouvé." }, { status: 400 });
    }
    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) {
      return NextResponse.json({ error: "Mot de passe incorrect." }, { status: 400 });
    }
    // TODO: gérer la session ou le JWT ici pour admin
    return NextResponse.json({ message: "Connexion admin réussie.", type: "admin" });
  } catch {
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}

// Prisma Client est bien généré, tu peux continuer à utiliser prisma.admin et prisma.user.
