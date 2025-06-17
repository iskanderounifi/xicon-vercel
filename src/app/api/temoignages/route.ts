import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const temoignages = await prisma.temoignage.findMany({
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(temoignages);
  } catch (error) {
    console.error("Erreur lors de la récupération des témoignages:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des témoignages" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { nom, message, photo } = await req.json();
    if (!nom || !message) {
      return NextResponse.json(
        { error: "Nom et message requis" },
        { status: 400 }
      );
    }
    const temoignage = await prisma.temoignage.create({
      data: { nom, message, photo }
    });
    return NextResponse.json(temoignage, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création du témoignage:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du témoignage" },
      { status: 500 }
    );
  }
} 