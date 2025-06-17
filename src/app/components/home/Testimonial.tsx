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
    <div className="relative w-full sm:w-72 h-105 group transition-transform duration-300 hover:scale-[1.02]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-lg">
        <Image
          src={imageSrc}
          alt={`Portrait of ${name}`}
          fill
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          unoptimized={imageSrc?.startsWith?.("http")}
        />
        <div className={`absolute inset-0 ${overlayColor} rounded-3xl transition-opacity duration-300 group-hover:opacity-40`} />
        {/* Ajout d'une icône Cloudinary si image Cloudinary */}
        {imageSrc?.includes("cloudinary.com") && (
          <div className="absolute top-2 right-2 bg-white/90 rounded-full p-1.5 shadow-md">
            <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
              <path d="M16 6a10 10 0 0 1 9.95 9.06A7 7 0 1 1 23 28H9a7 7 0 0 1-1-13.94A10 10 0 0 1 16 6Zm0-2C9.373 4 4 9.373 4 16a7.002 7.002 0 0 0 7 7h14a5 5 0 1 0 0-10c0-6.627-5.373-12-12-12Z" fill="#51B3D8"/>
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="absolute left-4 sm:left-7 top-[180px] sm:top-[196px] w-[85%] sm:w-60 flex flex-col justify-between h-[180px] sm:h-[200px]">
        <div className="flex flex-col gap-4 sm:gap-6">
          <div>
            <h3 className="text-white text-xl sm:text-2xl font-bold font-montserrat tracking-tight">{name}</h3>
            <p className="text-white/90 text-[11px] font-medium font-montserrat mt-1">
              {position}
            </p>
          </div>
          <p className="text-white/95 text-xs font-normal font-montserrat text-justify line-clamp-3 leading-relaxed">
            {quote}
          </p>
        </div>

        {/* Read More Button */}
        <div className="mt-auto pt-4">
          <button
            aria-label={`Savoir plus sur ${name}`}
            className="w-36 h-9 px-8 py-2.5 bg-white rounded-lg flex items-center justify-center gap-1.5 mx-auto hover:bg-gray-100 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <span className="text-stone-900 text-xs font-semibold font-montserrat">
              Savoir plus
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none" aria-hidden="true">
                <g clipPath="url(#clip0_1_300)"><path fillRule="evenodd" clipRule="evenodd" d="M8.97131 6.3095C8.84629 6.18451 8.67675 6.1143 8.49997 6.1143C8.3232 6.1143 8.15366 6.18451 8.02864 6.3095L6.14264 8.1955C6.04939 8.28877 5.98591 8.40761 5.96022 8.53697C5.93453 8.66634 5.94779 8.80041 5.99832 8.92224C6.04884 9.04407 6.13437 9.14817 6.24408 9.22137C6.35379 9.29458 6.48275 9.3336 6.61464 9.3335H10.3853C10.5172 9.3336 10.6462 9.29458 10.7559 9.22137C10.8656 9.14817 10.9511 9.04407 11.0016 8.92224C11.0522 8.80041 11.0654 8.66634 11.0397 8.53697C11.014 8.40761 10.9506 8.28877 10.8573 8.1955L8.97131 6.3095Z" fill="#1D1D1D"/></g>
                <defs><clipPath id="clip0_1_300"><rect width="16" height="16" fill="white" transform="matrix(0 -1 1 0 0.5 16)"/></clipPath></defs>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch('/api/temoignages')
      .then((res) => res.json())
      .then((data) => {
        setTestimonials(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <section className="w-full max-w-[1274px] mx-auto flex flex-col items-center gap-12 py-16 px-4">
      <h2 className="w-full text-center text-gray-800 text-3xl sm:text-4xl font-bold font-montserrat tracking-tight">
        Nos témoignages
      </h2>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {isLoading ? (
          // Loading skeleton
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="relative w-full sm:w-72 h-96 rounded-3xl bg-gray-200 animate-pulse" />
          ))
        ) : testimonials.length === 0 ? (
          <div className="col-span-full text-center text-slate-500 py-16 bg-slate-50 rounded-2xl">
            <p className="text-lg font-medium">Aucun témoignage pour le moment.</p>
            <p className="text-sm mt-2 text-slate-400">Revenez bientôt pour découvrir les témoignages de nos clients.</p>
          </div>
        ) : (
          testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id || index}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <TestimonialCard
                name={testimonial.nom}
                position=""
                quote={testimonial.message}
                imageSrc={testimonial.photo || "/images/testimonials/default.jpg"}
                overlayColor="bg-indigo-700/40"
              />
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
