import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import NewsletterList from "./newsletter-list";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  // Check for session.user and use email to fetch user/role
  if (!session || !session.user || !session.user.email) {
    redirect("/dashboard");
  }

  // Fetch user to get role
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { role: true },
  });

  if (!user || user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const [services, requests] = await Promise.all([
    prisma.service.findMany({
      include: {
        packages: true,
      },
    }),
    prisma.serviceRequest.findMany({
      where: {
        status: "PENDING",
      },
      include: {
        user: true,
        service: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);

  // Add types for service and request
  type Pack = {
    id: string;
    name: string;
    description: string;
    price: number;
  };
  type Service = typeof services[number];
  type Request = typeof requests[number];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <Link
          href="/dashboard/admin/services/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Add New Service
        </Link>
      </div>

      {/* Services Overview */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service: Service) => (
            <div
              key={service.id}
              className="border rounded-lg p-4 hover:border-blue-500 transition"
            >
              <div className="flex items-center gap-2 mb-2">
                <Image
                  src={service.coverImage || "/placeholder.png"}
                  alt="Service"
                  width={40}
                  height={40}
                  style={{ borderRadius: 8, objectFit: "cover" }}
                />
                <span className="text-2xl">{service.icon}</span>
                <h3 className="font-medium text-gray-900">{service.name}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">{service.shortDesc}</p>
              <p className="text-sm text-gray-500">
                {service.packages.length} packages available
              </p>
              {/* List all packs for this service with edit/delete */}
              <div className="mt-2">
                <h4 className="font-semibold text-sm text-gray-800 mb-1">Packs:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {service.packages.map((pack: Pack) => (
                    <li key={pack.id} className="flex items-center gap-2">
                      <span className="font-medium">{pack.name}</span>
                      {": "}
                      <span className="text-gray-600">{pack.description}</span>
                      {" - "}
                      <span className="text-blue-700 font-semibold">${pack.price}</span>
                      <Link
                        href={`/dashboard/admin/services/${service.id}/edit-pack/${pack.id}`}
                        className="text-xs text-blue-600 underline ml-2"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/dashboard/admin/services/${service.id}/delete-pack/${pack.id}`}
                        className="text-xs text-red-600 underline ml-1"
                      >
                        Delete
                      </Link>
                    </li>
                  ))}
                  {service.packages.length === 0 && (
                    <li className="text-gray-400">No packs</li>
                  )}
                </ul>
                <div className="mt-2">
                  <Link
                    href={`/dashboard/admin/services/${service.id}/add-packs`}
                    className="text-blue-600 hover:text-blue-800 text-xs font-medium underline"
                  >
                    + Add Packs
                  </Link>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Link
                  href={`/dashboard/admin/services/${service.id}`}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Edit Service →
                </Link>
                <Link
                  href={`/dashboard/admin/services/delete/${service.id}`}
                  className="text-red-600 hover:text-red-800 text-sm font-medium ml-2"
                >
                  Delete Service
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pending Requests */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Pending Requests
        </h2>
        <div className="space-y-4">
          {requests.map((request: Request) => (
            <div
              key={request.id}
              className="border rounded-lg p-4 hover:border-blue-500 transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">
                    {request.service.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    From: {request.user.name} ({request.user.email})
                  </p>
                  <p className="text-sm text-gray-500 mt-2">{request.message}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={async () => {
                      "use server";
                      await prisma.serviceRequest.update({
                        where: { id: request.id },
                        data: { status: "APPROVED" },
                      });
                    }}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={async () => {
                      "use server";
                      await prisma.serviceRequest.update({
                        where: { id: request.id },
                        data: { status: "REJECTED" },
                      });
                    }}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
          {requests.length === 0 && (
            <p className="text-gray-500">No pending requests</p>
          )}
        </div>
      </div>

      <NewsletterList />
    </div>
  );
}