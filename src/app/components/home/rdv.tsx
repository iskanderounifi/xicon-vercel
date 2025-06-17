import React from 'react';
import Link from "next/link";

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

          <h2 className="text-2xl md:text-3xl font-bold text-[#51B3D8] mb-8 leading-tight">
            Avez-vous un projet en préparation ?
            <br />
            <br />
            Contactez-nous pour un accompagnement personnalisé !
          </h2>
          <Link
      href="/rdv"
      className="flex items-center gap-2 w-[181px] h-[62px] px-[18px] py-[19px] rounded-[12px] bg-[#51B3D8] text-white"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_1_256)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16 3C16.2652 3 16.5196 3.10536 16.7071 3.29289C16.8946 3.48043 17 3.73478 17 4V5H19C19.5304 5 20.0391 5.21071 20.4142 5.58579C20.7893 5.96086 21 6.46957 21 7V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V7C3 6.46957 3.21071 5.96086 3.58579 5.58579C3.96086 5.21071 4.46957 5 5 5H7V4C7 3.73478 7.10536 3.48043 7.29289 3.29289C7.48043 3.10536 7.73478 3 8 3C8.26522 3 8.51957 3.10536 8.70711 3.29289C8.89464 3.48043 9 3.73478 9 4V5H15V4C15 3.73478 15.1054 3.48043 15.2929 3.29289C15.4804 3.10536 15.7348 3 16 3ZM8 12C7.45 12 7 12.45 7 13C7 13.55 7.45 14 8 14C8.55 14 9 13.55 9 13C9 12.45 8.55 12 8 12ZM12 12C11.45 12 11 12.45 11 13C11 13.55 11.45 14 12 14C12.55 14 13 13.55 13 13C13 12.45 12.55 12 12 12ZM16 12C15.45 12 15 12.45 15 13C15 13.55 15.45 14 16 14C16.55 14 17 13.55 17 13C17 12.45 16.55 12 16 12ZM8 16C7.45 16 7 16.45 7 17C7 17.55 7.45 18 8 18C8.55 18 9 17.55 9 17C9 16.45 8.55 16 8 16ZM12 16C11.45 16 11 16.45 11 17C11 17.55 11.45 18 12 18C12.55 18 13 17.55 13 17C13 16.45 12.55 16 12 16ZM16 16C15.45 16 15 16.45 15 17C15 17.55 15.45 18 16 18C16.55 18 17 17.55 17 17C17 16.45 16.55 16 16 16ZM19 7H5V9H19V7Z"
            fill="#F5FFFF"
          />
        </g>
        <defs>
          <clipPath id="clip0_1_256">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <span className="text-base font-medium">Prendre RDV</span>
    </Link>

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
