import React from "react";

type Package = {
  id: string;
  name: string;
  description: string;
  price: number;
  serviceId: string;
  createdAt?: string;
  updatedAt?: string;
};

interface PricingSectionProps {
  packs: Package[];
}

const PricingSection: React.FC<PricingSectionProps> = ({ packs }) => {
  // Ajoutez ce log pour vérifier les packs reçus
  console.log("PACKS PASSED TO PRICING SECTION:", packs);

  // Récupérer la couleur du service depuis le premier pack si présente
  const serviceColor =
    packs.length > 0 && (packs[0] as any).service?.color
      ? (packs[0] as any).service.color
      : "#6366f1"; // fallback indigo-500

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center mb-12 lg:mb-20">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-2">
          Nos Packs
        </h2>
        <p className="text-gray-700 text-base md:text-lg mb-6">
          Des plans tarifaires flexibles pour chaque besoin
        </p>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {packs.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 text-lg">
              Aucun pack lié à ce service.
            </div>
          ) : (
            packs.map((pack, idx) => (
              <div
                key={pack.id}
                className={`rounded-3xl shadow-lg p-6 flex flex-col h-full ${
                  idx === 2
                    ? ""
                    : "bg-gray-100"
                }`}
                style={{
                  border: `2px solid ${((pack as any).service?.color) || serviceColor}`,
                  background: idx === 2
                    ? ((pack as any).service?.color) || serviceColor
                    : undefined,
                }}
              >
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className={`text-3xl md:text-4xl font-bold ${
                      idx === 2 ? "text-white" : "text-zinc-800"
                    }`}>
                      {pack.name}
                    </h3>
                  </div>
                  <p className={`text-4xl md:text-5xl font-medium mb-1 ${
                    idx === 2 ? "text-white" : "text-indigo-900"
                  }`}>
                    {typeof pack.price === "number" ? `${pack.price}€` : ""}
                  </p>
                  <div className="my-6 space-y-4">
                    <div className="flex items-start gap-2">
                      <div>
                        <ul className={`list-disc pl-5 space-y-1 ${
                          idx === 2 ? "text-white" : ""
                        }`}>
                          {pack.description
                            .split('\n')
                            .filter((line) => line.trim() !== "")
                            .map((line, i) => (
                              <li key={i} className={`text-lg md:text-xl font-medium ${
                                idx === 2 ? "text-white" : "text-zinc-800"
                              }`}>
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: line.replace(
                                      /<b>(.*?)<\/b>/g,
                                      `<b class="font-bold ${idx === 2 ? "text-indigo-100 underline" : "text-indigo-700"}">$1</b>`
                                    ),
                                  }}
                                />
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  className={`w-full h-12 rounded-xl font-bold text-base hover:opacity-90 transition-opacity ${
                    idx === 2 ? "bg-white" : ""
                  }`}
                  style={{
                    background:
                      idx === 2
                        ? "#fff"
                        : ((pack as any).service?.color) || serviceColor,
                    color:
                      idx === 2
                        ? ((pack as any).service?.color) || serviceColor
                        : "#fff",
                  }}
                  onClick={() => window.location.href = "/inscrit-vous"}
                >
                  Inscrivez-vous
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;