import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const data = await req.json();
  const contact = await prisma.contactHome.create({
    data: {
      nom: data.nom,
      prenom: data.prenom,
      email: data.email,
      telephone: data.telephone,
    },
  });
  return NextResponse.json(contact, { status: 201 });
}
