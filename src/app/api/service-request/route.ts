import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { user, entreprise, serviceId, packageId } = body;
    if (!user?.id || !serviceId) {
      return NextResponse.json({ error: "Informations utilisateur ou service manquantes." }, { status: 400 });
    }
    // Permet la demande soit pour un package précis, soit pour le service global
    const request = await prisma.serviceRequest.create({
      data: {
        userId: user.id,
        serviceId,
        message: `
Nom: ${user.name || ""}
Email: ${user.email || ""}
Entreprise: ${entreprise?.nom || ""}
MF: ${entreprise?.mf || ""}
Téléphone: ${entreprise?.telephone || ""}
Adresse: ${entreprise?.adresse || ""}
Site web: ${entreprise?.siteweb || ""}
Service demandé: ${entreprise?.service || ""}
Description: ${entreprise?.description || ""}
${packageId ? `Package: ${packageId}` : "Demande globale pour le service"}
        `.trim(),
        status: "PENDING",
        // Ajoutez packageId si besoin dans votre modèle Prisma
        ...(packageId ? { packageId } : {}),
      },
    });
    return NextResponse.json({ message: "Demande envoyée.", request });
  } catch (e) {
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
