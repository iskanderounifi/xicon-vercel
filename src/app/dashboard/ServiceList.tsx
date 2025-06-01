"use client";
import React from "react";
import { Layers, Package as PackageIcon, Info } from "lucide-react";

export default function ServiceList({ services, user, entreprise }: {
  services: any[];
  user: { id: string; name?: string; email?: string };
  entreprise: any;
}) {
  async function handleRequest(serviceId: string, packageId?: string) {
    await fetch("/api/service-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user,
        entreprise,
        serviceId,
        packageId,
      }),
    });
    alert("Votre demande a été envoyée !");
  }

  if (!services || services.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[40vh] bg-white shadow-xl rounded-lg p-8">
        <div className="text-center">
          <Info size={48} className="mx-auto text-blue-500 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Aucun Service Disponible
          </h2>
          <p className="text-gray-600">
            Aucun service n'est disponible pour le moment. Veuillez revenir plus tard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
      {services.map((service) => (
        <div
          key={service.id}
          className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col overflow-hidden"
        >
          {/* Service Info */}
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center gap-3 mb-3">
              <Layers size={24} className="text-indigo-500" />
              <h3 className="text-2xl font-semibold text-indigo-700">
                {service.name}
              </h3>
            </div>
            <p className="text-slate-600 text-sm mb-4 h-16 overflow-y-auto custom-scrollbar">
              {service.shortDesc}
            </p>
            <p className="text-3xl font-bold text-slate-800">
              {service.price} €
              <span className="text-sm font-normal text-slate-500"> /prestation</span>
            </p>
            {/* Demande globale pour le service */}
            <button
              className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded transition flex items-center justify-center gap-2"
              onClick={() => handleRequest(service.id)}
            >
              <Layers size={18} /> Demander ce service
            </button>
          </div>

          {/* Packages */}
          <div className="p-6 bg-slate-50 flex-grow">
            {service.packages.length > 0 ? (
              <div>
                <h4 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wider flex items-center gap-2">
                  <PackageIcon size={18} className="text-emerald-600" />
                  Packages Inclus/Optionnels
                </h4>
                <ul className="space-y-3">
                  {service.packages.map((pkg) => (
                    <li
                      key={pkg.id}
                      className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 hover:border-indigo-300 transition-colors"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-indigo-700 flex items-center gap-2">
                          <PackageIcon size={16} className="text-emerald-500" />
                          {pkg.name}
                        </span>
                        <span className="font-bold text-slate-700">{pkg.price} €</span>
                      </div>
                      <p className="text-slate-600 text-xs leading-relaxed mb-2">
                        {pkg.description}
                      </p>
                      <button
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded transition flex items-center justify-center gap-2"
                        onClick={() => handleRequest(service.id, pkg.id)}
                      >
                        <PackageIcon size={16} /> Demander ce package
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-slate-500 text-sm italic text-center py-4">
                Aucun package spécifique pour ce service.
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
