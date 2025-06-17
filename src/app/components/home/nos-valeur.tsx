// src/components/ValuesSection.tsx

import Image from "next/image";
import { Montserrat, Poppins } from "next/font/google";

// --- 1. OPTIMISATION DES POLICES AVEC NEXT.JS ---
// Next.js gère le chargement optimisé de ces polices pour de meilleures performances.
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"], // Nous n'avons besoin que de la graisse 700 pour les titres des cartes.
  variable: "--font-poppins",
});

// --- 2. APPROCHE PILOTÉE PAR LES DONNÉES ---
// Toutes les données des cartes sont centralisées ici.
// C'est facile à maintenir : ajoutez ou modifiez un objet pour mettre à jour la section.
const valuesData = [
  {
    title: "Innovation",
    imageSrc: "/assets/nos-valeur/innovation.png",
    overlayColor: "bg-[#6366F1]",
    labelBgColor: "bg-indigo-50",
    labelTextColor: "text-P1-C1",
  },
  {
    title: "Collaboration",
    imageSrc: "/assets/nos-valeur/colloboration.png",
    overlayColor: "bg-[#3B82F6]",
    labelBgColor: "bg-slate-50",
    labelTextColor: "text-P1-C2",
  },
  {
    title: "Qualité",
    imageSrc: "/assets/nos-valeur/qualite.png",
    overlayColor: "bg-[#F97316]",
    labelBgColor: "bg-stone-50",
    labelTextColor: "text-P1-C3",
  },
  {
    title: "Transparence",
    imageSrc: "/assets/nos-valeur/transparence.png",
    overlayColor: "bg-[#A855F7]",
    labelBgColor: "bg-stone-50",
    labelTextColor: "text-P2-C5",
  },
  {
    title: "Responsabilité",
    imageSrc: "/assets/nos-valeur/responsabilite.png",
    overlayColor: "bg-[#8B5CF6]",
    labelBgColor: "bg-pink-50",
    labelTextColor: "text-P3-C3",
  },
  {
    title: "Agilité",
    imageSrc: "/assets/nos-valeur/agile.png",
    overlayColor: "bg-[#78716C]",
    labelBgColor: "bg-white",
    labelTextColor: "text-P3-C4",
  },
  {
    title: "Respect",
    imageSrc: "/assets/nos-valeur/respect.png",
    overlayColor: "bg-[#EC4899]",
    labelBgColor: "bg-purple-100",
    labelTextColor: "text-P2-C1",
  },
  {
    title: "Durabilité",
    imageSrc: "/assets/nos-valeur/durabilite.png",
    overlayColor: "bg-[#84CC16]",
    labelBgColor: "bg-neutral-50",
    labelTextColor: "text-P3-C5",
  },
];

// --- 3. TYPESCRIPT POUR LA SÉCURITÉ ---
// Crée automatiquement un type basé sur la structure de nos données.
type ValueCardProps = (typeof valuesData)[0];

// --- 4. COMPOSANT ENFANT RÉUTILISABLE (`ValueCard`) ---
// Ce composant représente une seule carte de valeur.
const ValueCard = ({
  title,
  imageSrc,
  overlayColor,
  labelBgColor,
  labelTextColor,
}: ValueCardProps) => (
  <div className="relative aspect-square w-full max-w-sm mx-auto overflow-hidden rounded-3xl group shadow-lg">
    {/* Image optimisée par Next.js */}
    <Image
      src={imageSrc}
      alt={title}
      fill
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      className="object-cover transition-transform duration-500 group-hover:scale-110"
    />
    {/* Superposition de couleur avec effet de fusion */}
    <div
      className={`absolute inset-0 ${overlayColor} opacity-50 mix-blend-multiply`}
    />
    {/* Contenu textuel centré */}
    <div className="absolute inset-0 flex items-center justify-center p-4">
      <div
        className={`${labelBgColor} rounded-lg px-4 py-2 shadow-md sm:px-6`}
      >
        <h3
          className={`${labelTextColor} ${poppins.variable} font-poppins text-xl font-bold leading-tight text-center sm:text-2xl sm:leading-7`}
        >
          {title}
        </h3>
      </div>
    </div>
  </div>
);

// --- 5. COMPOSANT PRINCIPAL EXPORTÉ ---
const ValuesSection = () => {
  return (
    <section
      className={`${montserrat.variable} ${poppins.variable} w-full bg-white py-16 sm:py-24`}
    >
      <div className="container mx-auto px-4">
        {/* En-tête de la section */}
        <div className="mb-12 text-center md:mb-16">
          <h2 className="font-montserrat text-3xl font-bold text-gray-800 sm:text-4xl">
            Nos valeurs
          </h2>
          <p className="font-montserrat mt-2 text-base text-violet-950">
            Nos convictions, votre succès
          </p>
        </div>

        {/* Grille responsive qui contient les cartes */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
          {valuesData.map((value) => (
            <ValueCard key={value.title} {...value} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;