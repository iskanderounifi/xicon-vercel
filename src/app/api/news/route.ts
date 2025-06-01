import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Si l'erreur "Property 'news' does not exist..." apparaît, 
// cela signifie que Prisma n'a pas généré le modèle News.
// 1. Vérifiez que le modèle News existe bien dans schema.prisma (model News {...})
// 2. Exécutez dans le terminal : npx prisma generate
// 3. Redémarrez votre serveur Next.js

export async function GET() {
  // Si l'erreur persiste ici, cela signifie que Prisma n'a pas généré le modèle News.
  // Solution :
  // 1. Vérifiez que le modèle News existe bien dans prisma/schema.prisma :
  //    model News { ... }
  // 2. Exécutez dans le terminal à la racine du projet :
  //    npx prisma generate
  // 3. Vérifiez que le fichier node_modules/.prisma/client/index.d.ts contient bien "news"
  // 4. Redémarrez votre serveur Next.js
  // Après cela, prisma.news sera accessible.
  const newsList = await prisma.news.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(newsList);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  // Correction : valeur par défaut pour imageCart si non fourni
  const newNews = await prisma.news.create({
    data: {
      titre: data.titre,
      imageCover: data.imageCover,
      imageCart: data.imageCart ?? "",
      description: data.description,
    },
  });
  return NextResponse.json(newNews, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const updatedNews = await prisma.news.update({
    where: { id: data.id },
    data: {
      titre: data.titre,
      imageCover: data.imageCover,
      imageCart: data.imageCart,
      description: data.description,
      updatedAt: new Date(),
    },
  });
  return NextResponse.json(updatedNews);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await prisma.news.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
