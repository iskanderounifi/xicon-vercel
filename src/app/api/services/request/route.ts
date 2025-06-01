import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";

const requestSchema = z.object({
  serviceId: z.string(),
  message: z.string(),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    // Use email as user identifier since session.user.id does not exist by default
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { serviceId, message } = requestSchema.parse(body);

    // Check if service exists
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) {
      return NextResponse.json(
        { message: "Service not found" },
        { status: 404 }
      );
    }

    // Find user by email to get userId
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true }
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Create service request
    const serviceRequest = await prisma.serviceRequest.create({
      data: {
        userId: user.id,
        serviceId,
        message,
        status: "PENDING",
      },
    });

    return NextResponse.json(
      {
        message: "Service request created successfully",
        request: serviceRequest,
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