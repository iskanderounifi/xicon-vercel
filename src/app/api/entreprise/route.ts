import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nom, emailPro, telephone, mf, adresse, siteweb, service, description, userId } = body;
    if (!nom || !emailPro || !telephone || !mf || !adresse || !service || !description || !userId) {
      return NextResponse.json(
        { error: "Tous les champs obligatoires doivent être remplis (y compris userId)." },
        { status: 400 }
      );
    }
    // Vérifie si une entreprise existe déjà avec le même emailPro ou MF
    const existing = await prisma.entreprise.findFirst({
      where: {
        OR: [
          { emailPro: emailPro },
          { mf: mf }
        ]
      }
    });
    if (existing) {
      return NextResponse.json(
        { error: "Une entreprise avec cet email professionnel ou MF existe déjà." },
        { status: 400 }
      );
    }
    // Ajoute l'entreprise à la base de données avec la clé étrangère userId
    const entreprise = await prisma.entreprise.create({
      data: {
        nom,
        emailPro,
        telephone,
        mf,
        adresse,
        siteweb,
        service,
        description,
        userId, // <-- clé étrangère obligatoire
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    return NextResponse.json({ message: "Entreprise enregistrée.", entreprise });
  } catch (e) {
    // Ajoute un log pour aider au debug
    console.error("Erreur lors de l'enregistrement entreprise:", e);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
