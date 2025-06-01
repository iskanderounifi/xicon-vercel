import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const data = await req.json();
  const contact = await prisma.contactFooter.create({
    data: {
      nom: data.nom,
      prenom: data.prenom,
      email: data.email,
      phone: data.phone ?? "",
      message: data.message ?? "",
    },
  });
  return NextResponse.json(contact, { status: 201 });
}
