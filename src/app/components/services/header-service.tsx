import React from "react";
import Image from "next/image";

interface HeroSectionServicesProps {
  id: string; // This prop is not directly used in the new UI, but kept for interface consistency
  name: string;
  price: number;
  description: string; // This prop is not directly used in the new UI's list, but kept for interface consistency
  shortDesc: string;
  coverImage: string;
}

const HeroSectionServices: React.FC<HeroSectionServicesProps> = ({
  id, name, price, description, shortDesc, coverImage
}) => {
  // Correction: gestion Cloudinary ou URL externe pour Image Next.js
  let imageSrc = "/images/placeholder-service.png";
  if (coverImage) {
    if (coverImage.startsWith("http") || coverImage.startsWith("/")) {
      imageSrc = coverImage;
    } else {
      imageSrc = "/" + coverImage;
    }
  }

  const serviceListItems = [ // This list is from your new UI, can be made dynamic if needed
    "Gestion de comptes sociaux",
    "Community management",
    "Modération",
    "Analyse des performances et rapports"
  ];

  return (
    <div className="font-montserrat w-[1440px] h-[634px] relative mx-auto">
      {/* Background Image */}
      <Image
        src={imageSrc}
        alt={`${name} service background`}
        fill
        className="absolute inset-0 object-cover"
        priority
        unoptimized={imageSrc.startsWith("http")}
      />
      {/* Overlay */}
      <div className="absolute inset-0 opacity-90 mix-blend-screen bg-gray-100" />

      {/* Social Media Icons Bar */}
      <div className="w-14 h-72 px-4 py-6 left-[1383px] top-[124px] absolute bg-gray-800 rounded-tl-xl rounded-bl-xl inline-flex justify-center items-start">
        <div className="inline-flex flex-col justify-start items-center gap-7">
          <a href="#" aria-label="Facebook" className="text-white hover:opacity-75">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_1_2264_services_fb)"><path d="M13.5 21.888C18.311 21.164 22 17.013 22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12C2 17.013 5.689 21.165 10.5 21.888V15H9C8.60218 15 8.22064 14.842 7.93934 14.5607C7.65804 14.2794 7.5 13.8978 7.5 13.5C7.5 13.1022 7.65804 12.7206 7.93934 12.4393C8.22064 12.158 8.60218 12 9 12H10.5V10C10.5 9.07174 10.8687 8.1815 11.5251 7.52513C12.1815 6.86875 13.0717 6.5 14 6.5H14.5C14.8978 6.5 15.2794 6.65804 15.5607 6.93934C15.842 7.22064 16 7.60218 16 8C16 8.39782 15.842 8.77936 15.5607 9.06066C15.2794 9.34196 14.8978 9.5 14.5 9.5H14C13.8674 9.5 13.7402 9.55268 13.6464 9.64645C13.5527 9.74021 13.5 9.86739 13.5 10V12H15C15.3978 12 15.7794 12.158 16.0607 12.4393C16.342 12.7206 16.5 13.1022 16.5 13.5C16.5 13.8978 16.342 14.2794 16.0607 14.5607C15.7794 14.842 15.3978 15 15 15H13.5V21.888Z" fill="currentColor"/></g>
              <defs><clipPath id="clip0_1_2264_services_fb"><rect width="24" height="24" fill="white"/></clipPath></defs>
            </svg>
          </a>
          <a href="#" aria-label="Instagram" className="text-white hover:opacity-75">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_1_2268_services_ig)"><path d="M16 3C17.3261 3 18.5979 3.52678 19.5355 4.46447C20.4732 5.40215 21 6.67392 21 8V16C21 17.3261 20.4732 18.5979 19.5355 19.5355C18.5979 20.4732 17.3261 21 16 21H8C6.67392 21 5.40215 20.4732 4.46447 19.5355C3.52678 18.5979 3 17.3261 3 16V8C3 6.67392 3.52678 5.40215 4.46447 4.46447C5.40215 3.52678 6.67392 3 8 3H16ZM12 8C10.9391 8 9.92172 8.42143 9.17157 9.17157C8.42143 9.92172 8 10.9391 8 12C8 13.0609 8.42143 14.0783 9.17157 14.8284C9.92172 15.5786 10.9391 16 12 16C13.0609 16 14.0783 15.5786 14.8284 14.8284C15.5786 14.0783 16 13.0609 16 12C16 10.9391 15.5786 9.92172 14.8284 9.17157C14.0783 8.42143 13.0609 8 12 8ZM12 10C12.5304 10 13.0391 10.2107 13.4142 10.5858C13.7893 10.9609 14 11.4696 14 12C14 12.5304 13.7893 13.0391 13.4142 13.4142C13.0391 13.7893 12.5304 14 12 14C11.4696 14 10.9609 13.7893 10.5858 13.4142C10.2107 13.0391 10 12.5304 10 12C10 11.4696 10.2107 10.9609 10.5858 10.5858C10.9609 10.2107 11.4696 10 12 10ZM16.5 6.5C16.2348 6.5 15.9804 6.60536 15.7929 6.79289C15.6054 6.98043 15.5 7.23478 15.5 7.5C15.5 7.76522 15.6054 8.01957 15.7929 8.20711C15.9804 8.39464 16.2348 8.5 16.5 8.5C16.7652 8.5 17.0196 8.39464 17.2071 8.20711C17.3946 8.01957 17.5 7.76522 17.5 7.5C17.5 7.23478 17.3946 6.98043 17.2071 6.79289C17.0196 6.60536 16.7652 6.5 16.5 6.5Z" fill="currentColor"/></g>
              <defs><clipPath id="clip0_1_2268_services_ig"><rect width="24" height="24" fill="white"/></clipPath></defs>
            </svg>
          </a>
          <a href="#" aria-label="LinkedIn" className="text-white hover:opacity-75">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_1_2272_services_li)"><path fillRule="evenodd" clipRule="evenodd" d="M18 3C18.7956 3 19.5587 3.31607 20.1213 3.87868C20.6839 4.44129 21 5.20435 21 6V18C21 18.7956 20.6839 19.5587 20.1213 20.1213C19.5587 20.6839 18.7956 21 18 21H6C5.20435 21 4.44129 20.6839 3.87868 20.1213C3.31607 19.5587 3 18.7956 3 18V6C3 5.20435 3.31607 4.44129 3.87868 3.87868C4.44129 3.31607 5.20435 3 6 3H18ZM8 10C7.73478 10 7.48043 10.1054 7.29289 10.2929C7.10536 10.4804 7 10.7348 7 11V16C7 16.2652 7.10536 16.5196 7.29289 16.7071C7.48043 16.8946 7.73478 17 8 17C8.26522 17 8.51957 16.8946 8.70711 16.7071C8.89464 16.5196 9 16.2652 9 16V11C9 10.7348 8.89464 10.4804 8.70711 10.2929C8.51957 10.1054 8.26522 10 8 10ZM11 9C10.7348 9 10.4804 9.10536 10.2929 9.29289C10.1054 9.48043 10 9.73478 10 10V16C10 16.2652 10.1054 16.5196 10.2929 16.7071C10.4804 16.8946 10.7348 17 11 17C11.2652 17 11.5196 16.8946 11.7071 16.7071C11.8946 16.5196 12 16.2652 12 16V12.34C12.305 11.996 12.82 11.592 13.393 11.347C13.726 11.205 14.227 11.147 14.575 11.257C14.6904 11.2863 14.7933 11.3523 14.868 11.445C14.92 11.515 15 11.671 15 12V16C15 16.2652 15.1054 16.5196 15.2929 16.7071C15.4804 16.8946 15.7348 17 16 17C16.2652 17 16.5196 16.8946 16.7071 16.7071C16.8946 16.5196 17 16.2652 17 16V12C17 11.33 16.83 10.734 16.476 10.256C16.1503 9.82256 15.6944 9.50472 15.175 9.349C14.273 9.066 13.274 9.223 12.607 9.509C12.3933 9.60046 12.1852 9.70465 11.984 9.821C11.9421 9.59059 11.8206 9.3822 11.6408 9.23216C11.461 9.08213 11.2342 8.99996 11 9ZM8 7C7.73478 7 7.48043 7.10536 7.29289 7.29289C7.10536 7.48043 7 7.73478 7 8C7 8.26522 7.10536 8.51957 7.29289 8.70711C7.48043 8.89464 7.73478 9 8 9C8.26522 9 8.51957 8.89464 8.70711 8.70711C8.89464 8.51957 9 8.26522 9 8C9 7.73478 8.89464 7.48043 8.70711 7.29289C8.51957 7.10536 8.26522 7 8 7Z" fill="currentColor"/></g>
              <defs><clipPath id="clip0_1_2272_services_li"><rect width="24" height="24" fill="white"/></clipPath></defs>
            </svg>
          </a>
           <a href="#" aria-label="Twitter" className="text-white hover:opacity-75">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_1_2276_services_tw)"><path d="M19.753 4.659C19.8395 4.56011 19.9056 4.44516 19.9477 4.32071C19.9897 4.19626 20.0069 4.06475 19.9981 3.93368C19.9893 3.80261 19.9548 3.67455 19.8965 3.55682C19.8383 3.43908 19.7574 3.33398 19.6585 3.2475C19.5596 3.16102 19.4447 3.09487 19.3202 3.05282C19.1958 3.01077 19.0642 2.99364 18.9332 3.00242C18.8021 3.01119 18.6741 3.0457 18.5563 3.10396C18.4386 3.16223 18.3335 3.24311 18.247 3.342L13.137 9.182L8.8 3.4C8.70685 3.2758 8.58607 3.175 8.44721 3.10557C8.30836 3.03614 8.15525 3 8 3H4C3.81429 3 3.63225 3.05171 3.47427 3.14935C3.31629 3.24698 3.18863 3.38668 3.10557 3.55279C3.02252 3.71889 2.98736 3.90484 3.00404 4.08981C3.02072 4.27477 3.08857 4.45143 3.2 4.6L9.637 13.182L4.247 19.342C4.16053 19.4409 4.09437 19.5558 4.05232 19.6803C4.01027 19.8047 3.99314 19.9363 4.00192 20.0673C4.01069 20.1984 4.0452 20.3264 4.10347 20.4442C4.16173 20.5619 4.24261 20.667 4.3415 20.7535C4.44039 20.84 4.55534 20.9061 4.67979 20.9482C4.80424 20.9902 4.93575 21.0074 5.06682 20.9986C5.19789 20.9898 5.32595 20.9553 5.44368 20.897C5.56142 20.8388 5.66652 20.7579 5.753 20.659L10.863 14.818L15.2 20.6C15.2931 20.7242 15.4139 20.825 15.5528 20.8944C15.6916 20.9639 15.8448 21 16 21H20C20.1857 21 20.3678 20.9483 20.5257 20.8507C20.6837 20.753 20.8114 20.6133 20.8944 20.4472C20.9775 20.2811 21.0126 20.0952 20.996 19.9102C20.9793 19.7252 20.9114 19.5486 20.8 19.4L14.363 10.818L19.753 4.659Z" fill="currentColor"/></g>
              <defs><clipPath id="clip0_1_2276_services_tw"><rect width="24" height="24" fill="white"/></clipPath></defs>
            </svg>
          </a>
          <a href="#" aria-label="YouTube" className="text-white hover:opacity-75">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_1_2280_services_yt)"><path fillRule="evenodd" clipRule="evenodd" d="M12 4C12.855 4 13.732 4.022 14.582 4.058L15.586 4.106L16.547 4.163L17.447 4.224L18.269 4.288C19.161 4.35628 20.0004 4.73695 20.6395 5.36304C21.2786 5.98913 21.6764 6.82054 21.763 7.711L21.803 8.136L21.878 9.046C21.948 9.989 22 11.017 22 12C22 12.983 21.948 14.011 21.878 14.954L21.803 15.864C21.79 16.01 21.777 16.151 21.763 16.289C21.6764 17.1796 21.2784 18.0112 20.6391 18.6373C19.9999 19.2634 19.1602 19.6439 18.268 19.712L17.448 19.775L16.548 19.837L15.586 19.894L14.582 19.942C13.7218 19.9794 12.861 19.9987 12 20C11.139 19.9987 10.2782 19.9794 9.418 19.942L8.414 19.894L7.453 19.837L6.553 19.775L5.731 19.712C4.83895 19.6437 3.99955 19.2631 3.36047 18.637C2.72139 18.0109 2.32357 17.1795 2.237 16.289L2.197 15.864L2.122 14.954C2.04554 13.9711 2.00484 12.9858 2 12C2 11.017 2.052 9.989 2.122 9.046L2.197 8.136C2.21 7.99 2.223 7.849 2.237 7.711C2.32354 6.8207 2.72122 5.98942 3.36009 5.36334C3.99897 4.73727 4.83813 4.3565 5.73 4.288L6.551 4.224L7.451 4.163L8.413 4.106L9.417 4.058C10.2775 4.02063 11.1387 4.0013 12 4ZM10 9.575V14.425C10 14.887 10.5 15.175 10.9 14.945L15.1 12.52C15.1914 12.4674 15.2673 12.3916 15.3201 12.3003C15.3729 12.209 15.4007 12.1055 15.4007 12C15.4007 11.8945 15.3729 11.791 15.3201 11.6997C15.2673 11.6084 15.1914 11.5326 15.1 11.48L10.9 9.056C10.8088 9.00332 10.7053 8.9756 10.5999 8.97562C10.4945 8.97563 10.3911 9.00339 10.2998 9.0561C10.2086 9.1088 10.1329 9.1846 10.0802 9.27587C10.0276 9.36713 9.99993 9.47065 10 9.576V9.575Z" className="fill-current"/></g>
                <defs><clipPath id="clip0_1_2280_services_yt"><rect width="24" height="24" fill="white"/></clipPath></defs>
            </svg>
          </a>
        </div>
      </div>

      {/* Pricing and Rating Card */}
      <div className="w-64 left-[1021px] top-[168px] absolute inline-flex flex-col justify-start items-center gap-3">
        <div className="w-64 h-60 bg-white rounded-3xl shadow-pricing-card flex flex-col justify-center items-center p-4 gap-3.5">
          <div className="self-stretch text-center text-black text-3xl font-bold">A partir de</div>
          <div className="self-stretch text-center text-red-600 text-8xl font-bold">
            {price}
            <sup className="align-super text-4xl -top-8">€</sup>
          </div>
          <div className="self-stretch text-center text-black text-3xl font-bold">HT / mois</div>
        </div>
        <div className="w-64 h-12 bg-white rounded-xl shadow-rating-bar flex justify-center items-center px-3 py-2 gap-2">
            <span className="text-gray-700 text-base font-bold">4.91</span>
            <span className="text-gray-700 text-[10px] font-bold -translate-y-px">/5</span>
            <div className="flex">
              <svg width="47" height="10" viewBox="0 0 47 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.5 0L6.73483 3.45492H10.7308L7.49799 5.59017L8.73282 9.04508L5.5 6.90983L2.26718 9.04508L3.50201 5.59017L0.269189 3.45492H4.26517L5.5 0Z" className="fill-star-yellow"/>
                <path d="M17.5 0L18.7348 3.45492H22.7308L19.498 5.59017L20.7328 9.04508L17.5 6.90983L14.2672 9.04508L15.502 5.59017L12.2692 3.45492H16.2652L17.5 0Z" className="fill-star-yellow"/>
                <path d="M29.5 0L30.7348 3.45492H34.7308L31.498 5.59017L32.7328 9.04508L29.5 6.90983L26.2672 9.04508L27.502 5.59017L24.2692 3.45492H28.2652L29.5 0Z" className="fill-star-yellow"/>
                <path d="M41.5 0L42.7348 3.45492H46.7308L43.498 5.59017L44.7328 9.04508L41.5 6.90983L38.2672 9.04508L39.502 5.59017L36.2692 3.45492H40.2652L41.5 0Z" className="fill-star-yellow"/>
              </svg>
            </div>
            <span className="text-blue-600 text-xs font-medium">(13) avis clients !</span>
        </div>
      </div>

      {/* Main Text Content Area */}
      <div className="w-[631px] left-[83px] top-[27px] absolute inline-flex flex-col justify-start items-start gap-3.5 z-10">
        <div className="self-stretch text-neutral-400 text-[10px] font-normal leading-7">
          Accueil  /  Services  /  {name}
        </div>
        <div className="self-stretch flex flex-col justify-start items-start gap-16">
          <div className="self-stretch flex flex-col justify-start items-start gap-2">
            <h1 className="self-stretch text-gray-700 text-6xl font-bold">{name}</h1>
            <p className="self-stretch text-start text-gray-700 text-base font-medium">
              Votre partenaire stratégique 360° pour une transformation digitale complète.
            </p>
          </div>
          
          <div className="flex flex-col gap-8">
            {serviceListItems.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath={`url(#clip0_1_2310_services_play${index})`}>
                            <path fillRule="evenodd" clipRule="evenodd" d="M5.66895 4.76C5.69576 4.53284 5.77524 4.31509 5.90106 4.12407C6.02689 3.93306 6.19558 3.77407 6.3937 3.65976C6.59182 3.54545 6.81389 3.47899 7.04223 3.46566C7.27058 3.45233 7.49888 3.49251 7.70895 3.583C8.77095 4.037 11.1509 5.116 14.1709 6.859C17.1919 8.603 19.3169 10.126 20.2399 10.817C21.0279 11.408 21.0299 12.58 20.2409 13.173C19.3269 13.86 17.2279 15.363 14.1709 17.129C11.1109 18.895 8.75895 19.961 7.70695 20.409C6.80095 20.796 5.78695 20.209 5.66895 19.232C5.53095 18.09 5.27295 15.497 5.27295 11.995C5.27295 8.495 5.52995 5.903 5.66895 4.76Z" className="fill-brand-p1-c1"/>
                        </g>
                        <defs><clipPath id={`clip0_1_2310_services_play${index}`}><rect width="24" height="24" fill="white"/></clipPath></defs>
                    </svg>
                    <span className="text-gray-700 text-xl font-semibold">{item}</span>
                </div>
            ))}
          </div>

          <div className="inline-flex justify-start items-center gap-7">
            <button className="w-80 h-16 px-6 py-5 bg-brand-p1-c2 rounded-xl inline-flex justify-start items-center gap-3 text-brand-p2-c6 hover:opacity-90 transition-opacity">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1_2329_services_cta1)"><path fillRule="evenodd" clipRule="evenodd" d="M13.2321 1.36C13.8641 0.601999 15.0951 1.12 14.9951 2.102L14.2891 9H20.0001C20.1901 9.00007 20.3762 9.05428 20.5365 9.15627C20.6968 9.25826 20.8248 9.40382 20.9054 9.5759C20.9859 9.74798 21.0158 9.93946 20.9915 10.1279C20.9672 10.3164 20.8897 10.494 20.7681 10.64L10.7681 22.64C10.1361 23.398 8.90511 22.88 9.00511 21.898L9.71111 15H4.00011C3.8101 14.9999 3.62404 14.9457 3.46372 14.8437C3.3034 14.7417 3.17545 14.5962 3.09487 14.4241C3.01429 14.252 2.9844 14.0605 3.0087 13.8721C3.03301 13.6836 3.11051 13.506 3.23211 13.36L13.2321 1.36Z" className="fill-current"/></g>
                <defs><clipPath id="clip0_1_2329_services_cta1"><rect width="24" height="24" fill="white"/></clipPath></defs>
              </svg>
              <span className="text-xl font-bold">Commencer Maintenant</span>
            </button>
            <button className="w-44 h-16 px-4 py-5 bg-brand-p2-c6 rounded-xl inline-flex justify-start items-center gap-3 text-brand-p1-c2 hover:opacity-90 transition-opacity">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1_2336_services_cta2)"><path fillRule="evenodd" clipRule="evenodd" d="M16 3C16.2652 3 16.5196 3.10536 16.7071 3.29289C16.8946 3.48043 17 3.73478 17 4V5H19C19.5304 5 20.0391 5.21071 20.4142 5.58579C20.7893 5.96086 21 6.46957 21 7V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V7C3 6.46957 3.21071 5.96086 3.58579 5.58579C3.96086 5.21071 4.46957 5 5 5H7V4C7 3.73478 7.10536 3.48043 7.29289 3.29289C7.48043 3.10536 7.73478 3 8 3C8.26522 3 8.51957 3.10536 8.70711 3.29289C8.89464 3.48043 9 3.73478 9 4V5H15V4C15 3.73478 15.1054 3.48043 15.2929 3.29289C15.4804 3.10536 15.7348 3 16 3ZM8.01 16H8C7.74512 16.0003 7.49997 16.0979 7.31463 16.2728C7.1293 16.4478 7.01777 16.687 7.00283 16.9414C6.98789 17.1958 7.07067 17.4464 7.23426 17.6418C7.39786 17.8373 7.6299 17.9629 7.883 17.993L8.01 18C8.27522 18 8.52957 17.8946 8.71711 17.7071C8.90464 17.5196 9.01 17.2652 9.01 17C9.01 16.7348 8.90464 16.4804 8.71711 16.2929C8.52957 16.1054 8.27522 16 8.01 16ZM12.01 16H12C11.7451 16.0003 11.5 16.0979 11.3146 16.2728C11.1293 16.4478 11.0178 16.687 11.0028 16.9414C10.9879 17.1958 11.0707 17.4464 11.2343 17.6418C11.3979 17.8373 11.6299 17.9629 11.883 17.993L12.01 18C12.2752 18 12.5296 17.8946 12.7171 17.7071C12.9046 17.5196 13.01 17.2652 13.01 17C13.01 16.7348 12.9046 16.4804 12.7171 16.2929C12.5296 16.1054 12.2752 16 12.01 16ZM16.01 16H16C15.7451 16.0003 15.5 16.0979 15.3146 16.2728C15.1293 16.4478 15.0178 16.687 15.0028 16.9414C14.9879 17.1958 15.0707 17.4464 15.2343 17.6418C15.3979 17.8373 15.6299 17.9629 15.883 17.993L16.01 18C16.2752 18 16.5296 17.8946 16.7171 17.7071C16.9046 17.5196 17.01 17.2652 17.01 17C17.01 16.7348 16.9046 16.4804 16.7171 16.2929C16.5296 16.1054 16.2752 16 16.01 16ZM8.01 12H8C7.74512 12.0003 7.49997 12.0979 7.31463 12.2728C7.1293 12.4478 7.01777 12.687 7.00283 12.9414C6.98789 13.1958 7.07067 13.4464 7.23426 13.6418C7.39786 13.8373 7.6299 13.9629 7.883 13.993L8.01 14C8.27522 14 8.52957 13.8946 8.71711 13.7071C8.90464 13.5196 9.01 13.2652 9.01 13C9.01 12.7348 8.90464 12.4804 8.71711 12.2929C8.52957 12.1054 8.27522 12 8.01 12ZM12.01 12H12C11.7451 12.0003 11.5 12.0979 11.3146 12.2728C11.1293 12.4478 11.0178 12.687 11.0028 12.9414C10.9879 13.1958 11.0707 13.4464 11.2343 13.6418C11.3979 13.8373 11.6299 13.9629 11.883 13.993L12.01 14C12.2752 14 12.5296 13.8946 12.7171 13.7071C12.9046 13.5196 13.01 13.2652 13.01 13C13.01 12.7348 12.9046 12.4804 12.7171 12.2929C12.5296 12.1054 12.2752 12 12.01 12ZM16.01 12H16C15.7451 12.0003 15.5 12.0979 15.3146 12.2728C15.1293 12.4478 15.0178 12.687 15.0028 12.9414C14.9879 13.1958 15.0707 13.4464 15.2343 13.6418C15.3979 13.8373 15.6299 13.9629 15.883 13.993L16.01 14C16.2752 14 16.5296 13.8946 16.7171 13.7071C16.9046 13.5196 17.01 13.2652 17.01 13C17.01 12.7348 16.9046 12.4804 16.7171 12.2929C16.5296 12.1054 16.2752 12 16.01 12ZM19 7H5V9H19V7Z" className="fill-current"/></g>
                <defs><clipPath id="clip0_1_2336_services_cta2"><rect width="24" height="24" fill="white"/></clipPath></defs>
              </svg>
              <span className="text-base font-bold">Prendre RDV</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSectionServices;