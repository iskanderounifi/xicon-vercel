import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface TestimonialCardProps {
  name: string;
  position: string;
  quote: string;
  imageSrc: string;
  overlayColor: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  position,
  quote,
  imageSrc,
  overlayColor,
}) => {
  return (
    <div className="relative w-full sm:w-72 h-96">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden">
        <Image
          src={imageSrc}
          alt={`Portrait of ${name}`}
          fill
          className="object-cover w-full h-full"
          unoptimized={imageSrc?.startsWith?.("http")}
        />
        <div className={`absolute inset-0 ${overlayColor} rounded-3xl`} />
        {/* Ajout d'une icône Cloudinary si image Cloudinary */}
        {imageSrc?.includes("cloudinary.com") && (
          <div className="absolute top-2 right-2 bg-white/80 rounded-full p-1 shadow">
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
              <path d="M16 6a10 10 0 0 1 9.95 9.06A7 7 0 1 1 23 28H9a7 7 0 0 1-1-13.94A10 10 0 0 1 16 6Zm0-2C9.373 4 4 9.373 4 16a7.002 7.002 0 0 0 7 7h14a5 5 0 1 0 0-10c0-6.627-5.373-12-12-12Z" fill="#51B3D8"/>
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="absolute left-4 sm:left-7 top-[180px] sm:top-[196px] w-[85%] sm:w-60 flex flex-col justify-between h-[180px] sm:h-[200px]">
        <div className="flex flex-col gap-4 sm:gap-6">
          <div>
            <h3 className="text-white text-xl sm:text-2xl font-bold font-montserrat">{name}</h3>
            <p className="text-white text-[10px] font-normal font-montserrat mt-1">
              {position}
            </p>
          </div>
          <p className="text-white text-xs font-normal font-montserrat text-justify line-clamp-2">
            {quote}
          </p>
        </div>

        {/* Read More Button */}
        <button
          aria-label={`Savoir plus sur ${name}`}
          className="w-32 sm:w-36 h-9 px-6 sm:px-8 py-2.5 bg-white rounded-lg flex items-center justify-center gap-1 hover:bg-gray-100 transition-colors"
        >
          <span className="text-stone-900 text-[10px] font-bold font-montserrat">
            Savoir plus
          </span>
          <svg
            width="6"
            height="4"
            viewBox="0 0 6 4"
            fill="none"
            className="rotate-90"
          >
            <path
              d="M1 1L3 3L5 1"
              stroke="#1C1B1B"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/temoignages')
      .then((res) => res.json())
      .then(setTestimonials);
  }, []);

  return (
    <section className="w-full max-w-[1274px] mx-auto flex flex-col items-center gap-12 py-12 px-4">
      <h2 className="w-full text-center text-gray-700 text-3xl sm:text-4xl font-bold font-montserrat">
        Nos témoignages
      </h2>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
        {testimonials.length === 0 ? (
          <div className="col-span-full text-center text-slate-400 py-12">
            Aucun témoignage pour le moment.
          </div>
        ) : (
          testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id || index}
              name={testimonial.nom}
              position=""
              quote={testimonial.message}
              imageSrc={testimonial.photo || "/images/testimonials/default.jpg"}
              overlayColor="bg-indigo-700/30"
            />
          ))
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
