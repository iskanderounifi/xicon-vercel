import React from "react";

type Demande = {
  id: string;
  titre?: string;
  description?: string;
  status?: string;
  createdAt?: string;
  service?: {
    nom?: string;
    name?: string;
  };
};

interface DemandeListProps {
  demandes: Demande[];
  userId: string;
}

const DemandeList: React.FC<DemandeListProps> = ({ demandes }) => {
  if (!demandes || demandes.length === 0) {
    return (
      <div className="text-slate-500 text-center py-6">
        Aucune demande trouvée.
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {demandes.map((demande) => (
        <li
          key={demande.id}
          className="p-4 bg-slate-50 rounded-lg shadow flex flex-col md:flex-row md:items-center md:justify-between"
        >
          <div>
            <div className="font-semibold text-slate-800">
              {demande.titre || "Demande sans titre"}
            </div>
            {/* Affichage du nom du service lié */}
            {demande.service && (
              <div className="text-indigo-600 text-sm font-medium mt-1">
                Service :{" "}
                {demande.service.nom ||
                  demande.service.name ||
                  "Non spécifié"}
              </div>
            )}
            <div className="text-slate-600 text-sm mt-1">
              {demande.description || "Pas de description"}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              {demande.createdAt
                ? new Date(demande.createdAt).toLocaleString()
                : ""}
            </div>
          </div>
          <div className="mt-2 md:mt-0">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                demande.status === "validée"
                  ? "bg-green-100 text-green-700"
                  : demande.status === "refusée"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {demande.status || "En attente"}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default DemandeList;
