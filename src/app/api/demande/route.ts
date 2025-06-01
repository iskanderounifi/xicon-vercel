import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { userId, services } = await req.json();
    if (!userId || !services || !Array.isArray(services) || services.length === 0) {
      return NextResponse.json({ error: "Champs obligatoires manquants." }, { status: 400 });
    }
    // Crée une demande pour chaque service sélectionné
    const demandes = await Promise.all(
      services.map((serviceId: string) =>
        prisma.serviceRequest.create({
          data: {
            userId,
            serviceId,
            status: "PENDING",
          },
        })
      )
    );
    return NextResponse.json({ message: "Demande(s) envoyée(s) avec succès.", demandes });
  } catch {
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
