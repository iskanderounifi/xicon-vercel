import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

// This is a placeholder for your actual ServiceForm component.
// The build error indicates that the props for this component expect `service.icon`
// to be a `string`, but Prisma returns `string | null`.
// You would import your actual form component like this:
// import ServiceForm from "./ServiceForm";

interface ServiceFormProps {
  service: {
    id: string;
    name: string;
    shortDesc: string;
    icon: string; // The error indicates this is expected to be a `string`.
    color: string;
    detailedDesc: string;
    price: number; // The error indicates this is expected to be a `number`.
    coverImage: string;
    packages: any[]; // Replace 'any' with your Package type
  };
}

// Dummy component to make the code compile and demonstrate props.
// Replace this with your actual form component.
const ServiceForm = ({ service }: ServiceFormProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">Service Details (Placeholder)</h2>
      <pre className="mt-4 text-sm bg-slate-100 p-4 rounded">
        {JSON.stringify(service, null, 2)}
      </pre>
      <p className="mt-4 text-slate-600">
        You need to create and import your own ServiceForm component to handle
        editing.
      </p>
    </div>
  );
}

// The build error "Type '{ params: { id: string; }; }' does not satisfy the constraint 'PageProps'"
// is fixed by using the correct signature for a Next.js App Router page component.
export default async function ServiceEditPage({
  params,
}: {
  params: { id: string };
}) {
  if (!params.id) {
    notFound();
  }

  const service = await prisma.service.findUnique({
    where: { id: params.id },
    include: { packages: true },
  });

  if (!service) {
    notFound();
  }

  // The build error "Type 'string | null' is not assignable to type 'string'" for the 'icon' property
  // is fixed here. We ensure that any potentially null fields from Prisma are converted to empty
  // strings before being passed to the form component, satisfying its type requirements.
  // The error for `price` is also fixed by providing a default value.
  const serviceForForm = {
    ...service,
    icon: service.icon ?? "",
    color: service.color ?? "",
    coverImage: service.coverImage ?? "",
    detailedDesc: service.detailedDesc ?? "",
    price: service.price ?? 0, // Handle null price
    // Ensure all other nullable fields on your Service model are handled here if needed.
  };

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-10">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">
        Edit Service: {service.name}
      </h1>
      <ServiceForm service={serviceForForm} />
    </main>
  );
}