'use client'
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Récupérer un package par id
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const pack = await prisma.package.findUnique({ where: { id: params.id } });
  if (!pack) return NextResponse.json({ error: "Package non trouvé" }, { status: 404 });
  return NextResponse.json(pack);
}

// Modifier un package
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json();
  const pack = await prisma.package.update({
    where: { id: params.id },
    data,
  });
  return NextResponse.json(pack);
}

// Supprimer un package
export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  await prisma.package.delete({ where: { id: params.id } });
  return NextResponse.json({ message: "Package supprimé" });
} 