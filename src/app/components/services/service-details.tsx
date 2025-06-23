import React from "react";
import Image from "next/image";

interface ServiceDetailsProps {
  service: {
    id: string;
    name: string;
    shortDesc: string;
    detailedDesc: string;
    coverImage: string | null;
    icon: string;
    price: number;
  };
}

const ServiceDetails: React.FC<ServiceDetailsProps> = ({ service }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Section */}
        <div className="relative h-[400px] lg:h-[600px] rounded-2xl overflow-hidden">
          {service.coverImage ? (
            <Image
              src={service.coverImage}
              alt={service.name}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center">
              <span className="text-white text-2xl font-semibold">Aucune image disponible</span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-4xl">{service.icon}</span>
            <h1 className="text-4xl font-bold text-gray-900">{service.name}</h1>
          </div>

          <p className="text-xl text-gray-600 mb-8">{service.shortDesc}</p>

          <div className="prose prose-lg max-w-none mb-8">
            <div dangerouslySetInnerHTML={{ __html: service.detailedDesc }} />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors">
              Commencer Maintenant
            </button>
            <button className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
              Prendre RDV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails; 