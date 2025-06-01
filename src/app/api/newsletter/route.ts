import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Use the correct property: prisma.newsletter (all lowercase, matching your model Newsletter)
export async function POST(req: Request) {
  try {
    const { email, name } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email requis." }, { status: 400 });
    }
    // Vérifie si l'email existe déjà
    const exists = await prisma.newsletter.findUnique({ where: { email } });
    if (exists) {
      return NextResponse.json({ error: "Cet email est déjà inscrit à la newsletter." }, { status: 409 });
    }
    // Save to DB
    const newsletter = await prisma.newsletter.create({
      data: { email, name },
    });
    return NextResponse.json({ message: "Subscribed", newsletter }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}

export async function GET() {
  try {
    const list = await prisma.newsletter.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(list);
  } catch (error) {
    console.error("Failed to fetch newsletter list:", error);
    return NextResponse.json({ message: "Failed to retrieve newsletter subscribers" }, { status: 500 });
  }
}
