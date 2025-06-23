import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Récupérer un service par id
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const service = await prisma.service.findUnique({
    where: { id: params.id },
    include: { packages: true },
  });
  if (!service) return NextResponse.json({ error: "Service non trouvé" }, { status: 404 });
  return NextResponse.json(service);
}

// Modifier un service
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json();
  const service = await prisma.service.update({
    where: { id: params.id },
    data,
  });
  return NextResponse.json(service);
}

// Supprimer un service
export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  await prisma.service.delete({ where: { id: params.id } });
  return NextResponse.json({ message: "Service supprimé" });
}
