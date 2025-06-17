import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const requestSchema = z.object({
  packageId: z.string(),
  message: z.string(),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { packageId, message } = requestSchema.parse(body);

    // Check if package exists
    const pkg = await prisma.package.findUnique({
      where: { id: packageId },
    });

    if (!pkg) {
      return NextResponse.json(
        { message: "Package not found" },
        { status: 404 }
      );
    }

    // Create package request
    const packageRequest = await prisma.packageRequest.create({
      data: {
        userId: session.user.id,
        packageId,
        message,
        status: "PENDING",
      },
    });

    return NextResponse.json(
      {
        message: "Package request created successfully",
        request: packageRequest,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid request data", errors: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}