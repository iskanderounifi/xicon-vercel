import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      );
    }

    const { emailNotifications, requestNotifications } = await req.json();

    const updatedUser = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        emailNotifications: emailNotifications,
        requestNotifications: requestNotifications,
      },
    });

    return NextResponse.json({
      emailNotifications: updatedUser.emailNotifications,
      requestNotifications: updatedUser.requestNotifications,
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour des notifications:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour des notifications" },
      { status: 500 }
    );
  }
} 