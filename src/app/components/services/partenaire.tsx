import React, { useEffect, useState } from "react";
import Image from "next/image";

const PartnersSection = () => {
  const [partners, setPartners] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/partners")
      .then((res) => res.json())
      .then(setPartners);
  }, []);

  return (
    <section className="w-full py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto text-center mb-12 md:mb-20">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-2">
          Nos partenaires
        </h2>
        <p className="text-gray-700 text-base md:text-lg mb-6">
          Un réseau solide pour soutenir vos projets
        </p>
        <p className="text-gray-700 text-xl md:text-2xl font-bold max-w-4xl mx-auto">
          Notre agence utilise les outils les plus avancés et collabore avec des partenaires d'exception
          <br className="hidden md:block" />
          pour garantir à votre société des réalisations remarquables.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 lg:gap-14">
          {partners.length === 0 ? (
            <div className="text-slate-400 text-center py-12 w-full">
              Aucun partenaire pour le moment.
            </div>
          ) : (
            partners.map((partner, index) => (
              <div key={partner.id || index} className="flex items-center justify-center p-2">
                <Image
                  src={
                    partner.logo && (partner.logo.startsWith("/") || partner.logo.startsWith("http"))
                      ? partner.logo
                      : "/images/avatar1.png"
                  }
                  alt={partner.name || "Partenaire"}
                  width={180}
                  height={60}
                  className="w-40 md:w-52 h-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 bg-white rounded"
                />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;