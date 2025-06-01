import { PrismaClient, Rdv } from "@prisma/client";

const prisma = new PrismaClient();

export default async function RdvAdminPage() {
  const rdvs: Rdv[] = await prisma.rdv.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Liste des rendez-vous</h1>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border px-2">Prénom</th>
            <th className="border px-2">Nom</th>
            <th className="border px-2">Email</th>
            <th className="border px-2">Téléphone</th>
            <th className="border px-2">Message</th>
            <th className="border px-2">Date</th>
            <th className="border px-2">Heure</th>
            <th className="border px-2">Type</th>
            <th className="border px-2">Créé le</th>
          </tr>
        </thead>
        <tbody>
          {rdvs.map((rdv: Rdv) => (
            <tr key={rdv.id}>
              <td className="border px-2">{rdv.prenom}</td>
              <td className="border px-2">{rdv.nom}</td>
              <td className="border px-2">{rdv.email}</td>
              <td className="border px-2">{rdv.telephone}</td>
              <td className="border px-2">{rdv.message}</td>
              <td className="border px-2">{rdv.date ? new Date(rdv.date).toLocaleDateString() : ''}</td>
              <td className="border px-2">{rdv.heure}</td>
              <td className="border px-2">{rdv.typeMeet}</td>
              <td className="border px-2">{new Date(rdv.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
