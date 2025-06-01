import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const rdvs = await prisma.rdv.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(rdvs);
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { prenom, nom, email, telephone, message, date, heure, typeMeet } =
      await req.json();
    if (!prenom || !nom || !email || !date || !heure || !typeMeet) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants." },
        { status: 400 }
      );
    }
    const rdv = await prisma.rdv.create({
      data: {
        prenom,
        nom,
        email,
        telephone,
        message,
        date: new Date(date),
        heure,
        typeMeet,
      },
    });
    return NextResponse.json({
      message: "RDV enregistré avec succès.",
      rdv,
    });
  } catch (error) {
    console.error("Erreur RDV API:", error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
