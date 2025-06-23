import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      );
    }

    // Supprimer toutes les données associées à l'utilisateur
    await prisma.$transaction(async (tx) => {
      // Supprimer les demandes de service
      await tx.serviceRequest.deleteMany({
        where: { userId: session.user.id },
      });

      // Supprimer l'entreprise
      await tx.entreprise.deleteMany({
        where: { userId: session.user.id },
      });

      // Supprimer l'utilisateur
      await tx.user.delete({
        where: { email: session.user.email },
      });
    });

    return NextResponse.json({ message: "Compte supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du compte:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression du compte" },
      { status: 500 }
    );
  }
} 