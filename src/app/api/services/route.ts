import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  // Récupère tous les services avec les champs principaux
  const services = await prisma.service.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      shortDesc: true,
      icon: true,
      color: true,
      // Ajoutez d'autres champs si besoin
    },
  });
  return NextResponse.json(services);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const newService = await prisma.service.create({
    data: {
      name: data.name,
      shortDesc: data.shortDesc,
      icon: data.icon,
      color: data.color && data.color.trim() !== "" ? data.color : "#6863BF", // valeur par défaut si null ou vide
      detailedDesc: data.detailedDesc,
      price: data.price,
      coverImage: data.coverImage,
    },
  });
  return NextResponse.json(newService, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const updatedService = await prisma.service.update({
    where: { id: data.id },
    data: {
      name: data.name,
      shortDesc: data.shortDesc,
      icon: data.icon,
      color: data.color && data.color.trim() !== "" ? data.color : "#6863BF",
      detailedDesc: data.detailedDesc,
      price: data.price,
      coverImage: data.coverImage,
      updatedAt: new Date(),
    },
  });
  return NextResponse.json(updatedService);
}