import React from 'react';

// Reusable Button
const Button = ({ icon, text }) => (
  <button className="flex items-center gap-3 bg-white text-blue-500 px-6 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors">
    {icon}
    <span>{text}</span>
  </button>
);

// SVG Icons
const ProjectIcon = (props) => (
  <svg {...props} viewBox="0 0 88 88" fill="currentColor">
    {/* SVG paths from original */}
  </svg>
);

const CalendarIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    {/* SVG paths from original */}
  </svg>
);

const CornerIcon = (props) => (
  <svg {...props} viewBox="0 0 88 88" fill="currentColor">
    {/* SVG paths from original */}
  </svg>
);

// Main component
const BlocCta = () => {
  return (
    <section
      className="relative bg-white py-24 overflow-hidden"
      style={{ backgroundImage: "url('/assets/contact/1.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 flex justify-between items-center opacity-25">
        <div className="w-28 h-28 bg-blue-300 rounded-full -translate-x-1/2" />
        <div className="w-28 h-28 border-2 border-blue-300 rounded-full translate-x-1/2" />
      </div>

      {/* Main content container */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <ProjectIcon className="w-24 h-24 text-blue-300 mb-8 opacity-25" />

          <h2 className="text-2xl md:text-3xl font-bold text-[#51b3d8] mb-8 leading-tight">
            Avez-vous un projet en préparation ?
            <br />
            <br />
            Contactez-nous pour un accompagnement personnalisé !
          </h2>

          <Button icon={<CalendarIcon className="w-6 h-6" />} text="Prendre RDV" />
        </div>
      </div>

      {/* Decorative corner icons */}
      <div className="absolute top-0 left-0 opacity-25">
        <CornerIcon className="w-24 h-24 text-blue-300" />
      </div>
      <div className="absolute bottom-0 right-0 opacity-25">
        <CornerIcon className="w-24 h-24 text-blue-300 transform rotate-180" />
      </div>
    </section>
  );
};

export default BlocCta;
