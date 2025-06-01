"use client";
import { useEffect, useState, Fragment } from "react";
import Image from 'next/image';

type Service = {
  id: string;
  name: string;
  shortDesc: string;
  icon: string;
  color: string;
};

export default function NosServices() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => {
        // Correction : certains backends renvoient {services: [...]}, d'autres un tableau direct
        if (Array.isArray(data)) {
          setServices(data);
        } else if (data && Array.isArray(data.services)) {
          setServices(data.services);
        } else if (data && Array.isArray(data.result)) {
          setServices(data.result);
        } else if (data && data.data && Array.isArray(data.data)) {
          setServices(data.data);
        } else {
          setServices([]);
        }
      })
      .catch(() => setServices([]));
  }, []);

  return (
    <div className="w-full px-4 py-12 flex flex-col items-center gap-12" id="services">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-700 font-montserrat">Nos Services</h2>
        <p className="text-base text-violet-950 font-montserrat">
          Votre partenaire pour un succès durable
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 w-full max-w-7xl">
        {services.length === 0 ? (
          <div className="col-span-full text-center text-slate-400 py-12">
            Aucun service disponible pour le moment.
          </div>
        ) : (
          services.map((service) => (
            <a
              key={service.id}
              href={`/service/${service.id}`}
              className="relative bg-white rounded-2xl flex flex-col items-center justify-between min-h-[220px] shadow-[0px_0px_25px_0px_rgba(0,0,0,0.05)] transition hover:shadow-lg hover:-translate-y-1"
              style={{ textDecoration: "none" }}
            >
              {/* Icône avec effet de flou */}
              <div
                className="absolute -top-6 size-16 rounded-2xl shadow-[0px_4px_12.7px_0px_rgba(98,98,98,0.25)] flex items-center justify-center"
                style={{
                  background: service.color || "#6863BF",
                }}
              >
                <div className="opacity-50 blur-sm absolute inset-0">
                  {service.icon && (
                    (/^https?:\/\//.test(service.icon) || service.icon.startsWith("/")) ? (
                      <Image
                        src={service.icon}
                        alt={service.name}
                        width={40}
                        height={40}
                        className="size-10"
                      />
                    ) : (
                      <span className="size-10 flex items-center justify-center text-2xl">{service.icon}</span>
                    )
                  )}
                </div>
                {service.icon && (
                  (/^https?:\/\//.test(service.icon) || service.icon.startsWith("/")) ? (
                    <Image
                      src={service.icon}
                      alt={service.name}
                      width={40}
                      height={40}
                      className="size-10 relative"
                      style={{ color: service.color || "#6863BF" }}
                    />
                  ) : (
                    <span
                      className="size-10 flex items-center justify-center text-2xl relative"
                      style={{ color: service.color || "#6863BF" }}
                    >
                      {service.icon}
                    </span>
                  )
                )}
              </div>

              {/* Contenu */}
              <div className="mt-10 text-center px-4">
                <h3 className="text-xl font-bold text-gray-700 font-montserrat mb-2">
                  {service.name}
                </h3>
                <div className="text-xs text-gray-700 font-montserrat text-center flex flex-wrap gap-x-2 gap-y-1 justify-center">
                  {service.shortDesc
                    .split('\n')
                    .filter(line => line.trim() !== "")
                    .map((line, index) => (
                      <span
                        key={index}
                        className="inline-block bg-gray-100 rounded px-2 py-1 mb-1"
                      >
                        {line}
                      </span>
                    ))}
                </div>
              </div>

              {/* Bandeau bas */}
              <div className="w-full mt-4 h-6 bg-cyan-100 rounded-b-2xl shadow-[0px_0px_25px_0px_rgba(0,0,0,0.05)] flex justify-center items-center">
                <Image 
                  src="/assets/icon/flesh.svg" 
                  width={20} 
                  height={20}  
                  alt="En savoir plus"
                  className="h-4 w-auto"
                />
              </div>
            </a>
          ))
        )}
      </div>
    </div>
  );
};