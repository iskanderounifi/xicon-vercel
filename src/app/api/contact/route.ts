import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const data = await req.json();
  await prisma.contact.create({
    data: {
      prenom: data.prenom,
      nom: data.nom,
      email: data.email,
      telephone: data.telephone,
      message: data.message,
    },
  });
  return NextResponse.json({ success: true, message: "Message enregistré !" });
}
