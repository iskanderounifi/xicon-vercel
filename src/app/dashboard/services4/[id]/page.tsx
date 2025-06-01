import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import RequestForm from "./RequestForm";

export default async function ServiceDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const service = await prisma.service.findUnique({
    where: { id: params.id },
    include: {
      packages: true,
    },
  });

  if (!service) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-64 sm:h-96">
          <Image
            src={service.coverImage}
            alt={service.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{service.icon}</span>
            <h1 className="text-3xl font-bold text-gray-900">{service.name}</h1>
          </div>
          <p className="text-lg text-gray-600 mb-6">{service.shortDesc}</p>
          <div className="prose max-w-none mb-8">{service.detailedDesc}</div>

          <div className="border-t pt-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Available Packages
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="border rounded-lg p-4 hover:border-blue-500 transition"
                >
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{pkg.description}</p>
                  <p className="text-2xl font-bold text-blue-600">${pkg.price}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Request This Service
            </h2>
            <RequestForm service={service} />
          </div>
        </div>
      </div>
    </div>
  );
} 