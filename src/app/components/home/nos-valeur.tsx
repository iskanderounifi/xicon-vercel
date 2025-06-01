'use client';

import Image from 'next/image';

const NosValeursSection = () => {
  // Correction: Ajout du tableau values manquant
  const values = [
    { 
      title: "Innovation",
      color: "bg-P1---C1",
      labelBg: "bg-indigo-50",
      image: "https://placehold.co/265x265"
    },
    {
      title: "Collaboration",
      color: "bg-P1---C2", 
      labelBg: "bg-slate-50",
      image: "https://placehold.co/265x265"
    },
    // Ajoutez d'autres valeurs ici si besoin
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-700 mb-4">Nos valeurs</h2>
        <p className="text-violet-950 text-base">Nos convictions, votre succès</p>
      </div>

      {/* Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {values.map((value, index) => (
          <ValueCard
            key={index}
            title={value.title}
            image={value.image}
            overlayColor={value.color}
            labelBg={value.labelBg}
          />
        ))}
      </div>
    </section>
  );
};

// Reusable Value Card Component
const ValueCard = ({ title, image, overlayColor, labelBg }) => (
  <div className="group relative aspect-square rounded-3xl overflow-hidden">
    {/* Image */}
    <img 
      src={image}
      alt={title}
      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
    />
    
    {/* Color Overlay */}
    <div className={`absolute inset-0 ${overlayColor} opacity-50 rounded-3xl`} />
    
    {/* Label */}
    <div className={`absolute bottom-4 left-4 right-4 ${labelBg} rounded-lg p-2 text-center`}>
      <h3 className="text-2xl font-bold font-poppins">{title}</h3>
    </div>
  </div>
);

export default NosValeursSection;
