import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import ServiceForm from "./ServiceForm";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: PageProps) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const service = await prisma.service.findUnique({
    where: { id: params.id },
    include: {
      packages: true,
    },
  });

  if (!service) {
    redirect("/dashboard/admin");
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Service</h1>
      <ServiceForm service={service} />
    </div>
  );
}