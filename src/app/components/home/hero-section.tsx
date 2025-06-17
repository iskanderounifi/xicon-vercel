// components/HeroSection.jsx

import Link from "next/link";
import { connection } from "next/server";

const HeroSection = () => {
  // Définir les URLs des liens
  const connectionUrl = "/connection";
  const rdvUrl = "/rdv";

  return (
    <div className="font-montserrat w-full min-h-[603px] relative mx-auto bg-white px-4 md:px-6 lg:px-8" id="contact">
      {/* Decorative Ellipses */}
      <div className="hidden lg:block w-96 h-96 right-0 top-[173px] absolute bg-amber-200 rounded-full" />
      <div className="hidden lg:block w-56 h-56 left-0 top-[381px] absolute bg-rose-50 rounded-full" />
      <div className="hidden lg:block w-32 h-32 left-[842px] top-0 absolute mix-blend-multiply bg-cyan-300 rounded-full" />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto pt-12 lg:pt-[55px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20">
          {/* Left Column - Hero Text */}
          <div className="flex flex-col justify-start items-start gap-8 lg:gap-20">
            <div className="flex flex-col justify-start items-start gap-6 lg:gap-9">
              <div className="text-3xl lg:text-4xl font-bold">
                <span className="text-gray-700">Transformez votre présence<br/>en ligne avec</span>
                <span className="text-stone-900"> </span>
                <span className="text-brand-p1-c3">XICOM</span>
                <span className="text-stone-900"> </span>
                <span className="text-gray-700">!</span>
              </div>
              <div className="text-xl lg:text-2xl text-justify">
                <span className="text-gray-700 font-normal">Nous offrons des solutions digitales sur mesure pour </span>
                <span className="text-gray-700 font-bold">TPE</span>
                <span className="text-gray-700 font-normal"> et </span>
                <span className="text-gray-700 font-bold">PME</span>
                <span className="text-gray-700 font-normal">, alliant créativité et stratégie.</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-start items-center gap-4 lg:gap-7 w-full">
              <Link href={connectionUrl}>
                <button className="w-full sm:w-auto h-14 lg:h-16 px-6 py-4 lg:py-5 bg-[#51B3D8] rounded-xl inline-flex justify-center items-center gap-3 text-white hover:opacity-90 transition-opacity">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_1_967_hero_cta1)">
                      <path fillRule="evenodd" clipRule="evenodd" d="M13.232 1.36C13.864 0.601999 15.095 1.12 14.995 2.102L14.289 9H20C20.19 9.00007 20.3761 9.05428 20.5364 9.15627C20.6967 9.25826 20.8247 9.40382 20.9052 9.5759C20.9858 9.74798 21.0157 9.93946 20.9914 10.1279C20.9671 10.3164 20.8896 10.494 20.768 10.64L10.768 22.64C10.136 23.398 8.905 22.88 9.005 21.898L9.711 15H4C3.80999 14.9999 3.62392 14.9457 3.4636 14.8437C3.30328 14.7417 3.17534 14.5962 3.09476 14.4241C3.01417 14.252 2.98428 14.0605 3.00859 13.8721C3.0329 13.6836 3.11039 13.506 3.232 13.36L13.232 1.36Z" className="fill-current"/>
                    </g>
                    <defs><clipPath id="clip0_1_967_hero_cta1"><rect width="24" height="24" fill="white"/></clipPath></defs>
                  </svg>
                  <span className="text-lg lg:text-xl font-bold">Commencer Maintenant</span>
                </button>
              </Link>
              <Link href={rdvUrl}>
                <button className="w-full sm:w-auto h-14 lg:h-16 px-4 py-4 lg:py-5 rounded-xl inline-flex justify-center items-center gap-3 text-[#51B3D8] hover:opacity-90 transition-opacity">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_1_974_hero_cta2)">
                      <path fillRule="evenodd" clipRule="evenodd" d="M16 3C16.2652 3 16.5196 3.10536 16.7071 3.29289C16.8946 3.48043 17 3.73478 17 4V5H19C19.5304 5 20.0391 5.21071 20.4142 5.58579C20.7893 5.96086 21 6.46957 21 7V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V7C3 6.46957 3.21071 5.96086 3.58579 5.58579C3.96086 5.21071 4.46957 5 5 5H7V4C7 3.73478 7.10536 3.48043 7.29289 3.29289C7.48043 3.10536 7.73478 3 8 3C8.26522 3 8.51957 3.10536 8.70711 3.29289C8.89464 3.48043 9 3.73478 9 4V5H15V4C15 3.73478 15.1054 3.48043 15.2929 3.29289C15.4804 3.10536 15.7348 3 16 3ZM8.01 16H8C7.74512 16.0003 7.49997 16.0979 7.31463 16.2728C7.1293 16.4478 7.01777 16.687 7.00283 16.9414C6.98789 17.1958 7.07067 17.4464 7.23426 17.6418C7.39786 17.8373 7.6299 17.9629 7.883 17.993L8.01 18C8.27522 18 8.52957 17.8946 8.71711 17.7071C8.90464 17.5196 9.01 17.2652 9.01 17C9.01 16.7348 8.90464 16.4804 8.71711 16.2929C8.52957 16.1054 8.27522 16 8.01 16ZM12.01 16H12C11.7451 16.0003 11.5 16.0979 11.3146 16.2728C11.1293 16.4478 11.0178 16.687 11.0028 16.9414C10.9879 17.1958 11.0707 17.4464 11.2343 17.6418C11.3979 17.8373 11.6299 17.9629 11.883 17.993L12.01 18C12.2752 18 12.5296 17.8946 12.7171 17.7071C12.9046 17.5196 13.01 17.2652 13.01 17C13.01 16.7348 12.9046 16.4804 12.7171 16.2929C12.5296 16.1054 12.2752 16 12.01 16ZM16.01 16H16C15.7451 16.0003 15.5 16.0979 15.3146 16.2728C15.1293 16.4478 15.0178 16.687 15.0028 16.9414C14.9879 17.1958 15.0707 17.4464 15.2343 17.6418C15.3979 17.8373 15.6299 17.9629 15.883 17.993L16.01 18C16.2752 18 16.5296 17.8946 16.7171 17.7071C16.9046 17.5196 17.01 17.2652 17.01 17C17.01 16.7348 16.9046 16.4804 16.7171 16.2929C16.5296 16.1054 16.2752 16 16.01 16ZM8.01 12H8C7.74512 12.0003 7.49997 12.0979 7.31463 12.2728C7.1293 12.4478 7.01777 12.687 7.00283 12.9414C6.98789 13.1958 7.07067 13.4464 7.23426 13.6418C7.39786 13.8373 7.6299 13.9629 7.883 13.993L8.01 14C8.27522 14 8.52957 13.8946 8.71711 13.7071C8.90464 13.5196 9.01 13.2652 9.01 13C9.01 12.7348 8.90464 12.4804 8.71711 12.2929C8.52957 12.1054 8.27522 12 8.01 12ZM12.01 12H12C11.7451 12.0003 11.5 12.0979 11.3146 12.2728C11.1293 12.4478 11.0178 12.687 11.0028 12.9414C10.9879 13.1958 11.0707 13.4464 11.2343 13.6418C11.3979 13.8373 11.6299 13.9629 11.883 13.993L12.01 14C12.2752 14 12.5296 13.8946 12.7171 13.7071C12.9046 13.5196 13.01 13.2652 13.01 13C13.01 12.7348 12.9046 12.4804 12.7171 12.2929C12.5296 12.1054 12.2752 12 12.01 12ZM16.01 12H16C15.7451 12.0003 15.5 12.0979 15.3146 12.2728C15.1293 12.4478 15.0178 12.687 15.0028 12.9414C14.9879 13.1958 15.0707 13.4464 15.2343 13.6418C15.3979 13.8373 15.6299 13.9629 15.883 13.993L16.01 14C16.2752 14 16.5296 13.8946 16.7171 13.7071C16.9046 13.5196 17.01 13.2652 17.01 13C17.01 12.7348 16.9046 12.4804 16.7171 12.2929C16.5296 12.1054 16.2752 12 16.01 12ZM19 7H5V9H19V7Z" className="fill-current"/>
                    </g>
                    <defs><clipPath id="clip0_1_974_hero_cta2"><rect width="24" height="24" fill="white"/></clipPath></defs>
                  </svg>
                  <span className="text-base lg:text-lg font-bold">Prendre RDV</span>
                </button>
              </Link>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="w-full lg:w-[520px] h-auto lg:h-[580px] bg-white rounded-[20px] shadow-lg p-6 lg:p-[26px] z-[1000]">
            <div className="flex flex-col justify-start items-start gap-8 lg:gap-14 h-full">
              <div className="self-stretch flex flex-col justify-start items-start gap-8 lg:gap-12">
                <div className="self-stretch text-gray-700 text-base font-bold">Contacter-nous</div>
                {/* Form Inputs */}
                <div className="self-stretch flex flex-col justify-start items-start gap-8 lg:gap-12">
                  <form
                    className="self-stretch flex flex-col justify-start items-start gap-8 lg:gap-12 w-full"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const form = e.currentTarget;
                      const nom = (form.elements.namedItem("nom") as HTMLInputElement)?.value;
                      const prenom = (form.elements.namedItem("prenom") as HTMLInputElement)?.value;
                      const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;
                      const telephone = (form.elements.namedItem("telephone") as HTMLInputElement)?.value;
                      await fetch("/api/contacthome", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ nom, prenom, email, telephone }),
                      });
                      form.reset();
                      alert("Votre demande a bien été envoyée !");
                    }}
                  >
                    {/* Nom */}
                    <div className="self-stretch flex flex-col justify-start items-start gap-[3px]">
                      <label htmlFor="hero-nom" className="self-stretch text-xs font-normal">
                        <span className="text-black/30">Nom</span><span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="hero-nom"
                        name="nom"
                        required
                        className="w-full bg-transparent border-b border-zinc-600/70 focus:border-brand-p1-c1 outline-none py-1 text-sm"
                      />
                    </div>
                    {/* Prénom */}
                    <div className="self-stretch flex flex-col justify-start items-start gap-[3px]">
                      <label htmlFor="hero-prenom" className="self-stretch text-xs font-normal">
                        <span className="text-black/30">Prénom</span><span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="hero-prenom"
                        name="prenom"
                        required
                        className="w-full bg-transparent border-b border-zinc-600/70 focus:border-brand-p1-c1 outline-none py-1 text-sm"
                      />
                    </div>
                    {/* E-mail */}
                    <div className="self-stretch flex flex-col justify-start items-start gap-[3px]">
                      <label htmlFor="hero-email" className="self-stretch text-xs font-normal">
                        <span className="text-black/30">E-mail</span><span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="email"
                        id="hero-email"
                        name="email"
                        required
                        className="w-full bg-transparent border-b border-zinc-600/70 focus:border-brand-p1-c1 outline-none py-1 text-sm"
                      />
                    </div>
                    {/* Numéro de téléphone */}
                    <div className="self-stretch flex flex-col justify-start items-start gap-[3px]">
                      <div className="inline-flex justify-start items-center gap-3">
                        <div className="flex justify-start items-center gap-1">
                          <span className="text-black text-xs font-medium">Fr</span>
                          <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_1_1008_hero_form_arrow)">
                              <path fillRule="evenodd" clipRule="evenodd" d="M6.53001 8.53001C6.38939 8.67046 6.19876 8.74935 6.00001 8.74935C5.80126 8.74935 5.61064 8.67046 5.47001 8.53001L2.64101 5.70201C2.50038 5.56131 2.4214 5.37051 2.42145 5.17158C2.42149 4.97265 2.50056 4.78189 2.64126 4.64126C2.78196 4.50062 2.97276 4.42165 3.17169 4.42169C3.37062 4.42174 3.56138 4.50081 3.70201 4.64151L6.00001 6.93951L8.29801 4.64151C8.4394 4.50482 8.62882 4.42913 8.82546 4.43075C9.02211 4.43236 9.21026 4.51115 9.34938 4.65014C9.48851 4.78913 9.56747 4.97721 9.56927 5.17385C9.57107 5.3705 9.49556 5.55999 9.35901 5.70151L6.53051 8.53051L6.53001 8.53001Z" className="fill-custom-dark-navy"/>
                            </g>
                            <defs><clipPath id="clip0_1_1008_hero_form_arrow"><rect width="12" height="12" fill="white" transform="translate(0 0.5)"/></clipPath></defs>
                          </svg>
                        </div>
                        <label htmlFor="hero-phone" className="text-xs font-normal">
                          <span className="text-black/30">Numéro de téléphone</span><span className="text-rose-600">*</span>
                        </label>
                      </div>
                      <input
                        type="tel"
                        id="hero-phone"
                        name="telephone"
                        required
                        className="w-full bg-transparent border-b border-zinc-600/70 focus:border-brand-p1-c1 outline-none py-1 text-sm"
                      />
                    </div>
                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="self-stretch h-14 px-6 lg:px-44 py-4 rounded-xl inline-flex justify-center items-center gap-2.5 text-white text-base font-bold bg-[#6863BF] hover:opacity-90 transition-opacity"
                    >
                      Prendre RDV
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Icons Bar */}
      <div className="fixed right-0 top-1/3 z-40 w-12 lg:w-14 h-48 lg:h-72 px-3 lg:px-4 py-4 lg:py-6 bg-gray-800 rounded-tl-xl rounded-bl-xl flex flex-col justify-center items-center gap-5 lg:gap-7">
        <a href="#" aria-label="Facebook" className="text-white hover:opacity-75">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1_1018_hero_social_fb)"><path d="M13.5 21.888C18.311 21.164 22 17.013 22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12C2 17.013 5.689 21.165 10.5 21.888V15H9C8.60218 15 8.22064 14.842 7.93934 14.5607C7.65804 14.2794 7.5 13.8978 7.5 13.5C7.5 13.1022 7.65804 12.7206 7.93934 12.4393C8.22064 12.158 8.60218 12 9 12H10.5V10C10.5 9.07174 10.8687 8.1815 11.5251 7.52513C12.1815 6.86875 13.0717 6.5 14 6.5H14.5C14.8978 6.5 15.2794 6.65804 15.5607 6.93934C15.842 7.22064 16 7.60218 16 8C16 8.39782 15.842 8.77936 15.5607 9.06066C15.2794 9.34196 14.8978 9.5 14.5 9.5H14C13.8674 9.5 13.7402 9.55268 13.6464 9.64645C13.5527 9.74021 13.5 9.86739 13.5 10V12H15C15.3978 12 15.7794 12.158 16.0607 12.4393C16.342 12.7206 16.5 13.1022 16.5 13.5C16.5 13.8978 16.342 14.2794 16.0607 14.5607C15.7794 14.842 15.3978 15 15 15H13.5V21.888Z" fill="currentColor"/></g>
            <defs><clipPath id="clip0_1_1018_hero_social_fb"><rect width="24" height="24" fill="white"/></clipPath></defs>
          </svg>
        </a>
        <a href="#" aria-label="Instagram" className="text-white hover:opacity-75">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1_1022_hero_social_ig)"><path d="M16 3C17.3261 3 18.5979 3.52678 19.5355 4.46447C20.4732 5.40215 21 6.67392 21 8V16C21 17.3261 20.4732 18.5979 19.5355 19.5355C18.5979 20.4732 17.3261 21 16 21H8C6.67392 21 5.40215 20.4732 4.46447 19.5355C3.52678 18.5979 3 17.3261 3 16V8C3 6.67392 3.52678 5.40215 4.46447 4.46447C5.40215 3.52678 6.67392 3 8 3H16ZM12 8C10.9391 8 9.92172 8.42143 9.17157 9.17157C8.42143 9.92172 8 10.9391 8 12C8 13.0609 8.42143 14.0783 9.17157 14.8284C9.92172 15.5786 10.9391 16 12 16C13.0609 16 14.0783 15.5786 14.8284 14.8284C15.5786 14.0783 16 13.0609 16 12C16 10.9391 15.5786 9.92172 14.8284 9.17157C14.0783 8.42143 13.0609 8 12 8ZM12 10C12.5304 10 13.0391 10.2107 13.4142 10.5858C13.7893 10.9609 14 11.4696 14 12C14 12.5304 13.7893 13.0391 13.4142 13.4142C13.0391 13.7893 12.5304 14 12 14C11.4696 14 10.9609 13.7893 10.5858 13.4142C10.2107 13.0391 10 12.5304 10 12C10 11.4696 10.2107 10.9609 10.5858 10.5858C10.9609 10.2107 11.4696 10 12 10ZM16.5 6.5C16.2348 6.5 15.9804 6.60536 15.7929 6.79289C15.6054 6.98043 15.5 7.23478 15.5 7.5C15.5 7.76522 15.6054 8.01957 15.7929 8.20711C15.9804 8.39464 16.2348 8.5 16.5 8.5C16.7652 8.5 17.0196 8.39464 17.2071 8.20711C17.3946 8.01957 17.5 7.76522 17.5 7.5C17.5 7.23478 17.3946 6.98043 17.2071 6.79289C17.0196 6.60536 16.7652 6.5 16.5 6.5Z" fill="currentColor"/></g>
            <defs><clipPath id="clip0_1_1022_hero_social_ig"><rect width="24" height="24" fill="white"/></clipPath></defs>
          </svg>
        </a>
        <a href="#" aria-label="LinkedIn" className="text-white hover:opacity-75">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1_1026_hero_social_li)"><path fillRule="evenodd" clipRule="evenodd" d="M18 3C18.7956 3 19.5587 3.31607 20.1213 3.87868C20.6839 4.44129 21 5.20435 21 6V18C21 18.7956 20.6839 19.5587 20.1213 20.1213C19.5587 20.6839 18.7956 21 18 21H6C5.20435 21 4.44129 20.6839 3.87868 20.1213C3.31607 19.5587 3 18.7956 3 18V6C3 5.20435 3.31607 4.44129 3.87868 3.87868C4.44129 3.31607 5.20435 3 6 3H18ZM8 10C7.73478 10 7.48043 10.1054 7.29289 10.2929C7.10536 10.4804 7 10.7348 7 11V16C7 16.2652 7.10536 16.5196 7.29289 16.7071C7.48043 16.8946 7.73478 17 8 17C8.26522 17 8.51957 16.8946 8.70711 16.7071C8.89464 16.5196 9 16.2652 9 16V11C9 10.7348 8.89464 10.4804 8.70711 10.2929C8.51957 10.1054 8.26522 10 8 10ZM11 9C10.7348 9 10.4804 9.10536 10.29289 9.29289C10.1054 9.48043 10 9.73478 10 10V16C10 16.2652 10.1054 16.5196 10.2929 16.7071C10.4804 16.8946 10.7348 17 11 17C11.2652 17 11.5196 16.8946 11.7071 16.7071C11.8946 16.5196 12 16.2652 12 16V12.34C12.305 11.996 12.82 11.592 13.393 11.347C13.726 11.205 14.227 11.147 14.575 11.257C14.6904 11.2863 14.7933 11.3523 14.868 11.445C14.92 11.515 15 11.671 15 12V16C15 16.2652 15.1054 16.5196 15.2929 16.7071C15.4804 16.8946 15.7348 17 16 17C16.2652 17 16.5196 16.8946 16.7071 16.7071C16.8946 16.5196 17 16.2652 17 16V12C17 11.33 16.83 10.734 16.476 10.256C16.1503 9.82256 15.6944 9.50472 15.175 9.349C14.273 9.066 13.274 9.223 12.607 9.509C12.3933 9.60046 12.1852 9.70465 11.984 9.821C11.9421 9.59059 11.8206 9.3822 11.6408 9.23216C11.461 9.08213 11.2342 8.99996 11 9ZM8 7C7.73478 7 7.48043 7.10536 7.29289 7.29289C7.10536 7.48043 7 7.73478 7 8C7 8.26522 7.10536 8.51957 7.29289 8.70711C7.48043 8.89464 7.73478 9 8 9C8.26522 9 8.51957 8.89464 8.70711 8.70711C8.89464 8.51957 9 8.26522 9 8C9 7.73478 8.89464 7.48043 8.70711 7.29289C8.51957 7.10536 8.26522 7 8 7Z" fill="currentColor"/></g>
            <defs><clipPath id="clip0_1_1026_hero_social_li"><rect width="24" height="24" fill="white"/></clipPath></defs>
          </svg>
        </a>
        <a href="#" aria-label="Twitter" className="text-white hover:opacity-75">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1_1030_hero_social_tw)"><path d="M19.753 4.659C19.8395 4.56011 19.9056 4.44516 19.9477 4.32071C19.9897 4.19626 20.0069 4.06475 19.9981 3.93368C19.9893 3.80261 19.9548 3.67455 19.8965 3.55682C19.8383 3.43908 19.7574 3.33398 19.6585 3.2475C19.5596 3.16102 19.4447 3.09487 19.3202 3.05282C19.1958 3.01077 19.0642 2.99364 18.9332 3.00242C18.8021 3.01119 18.6741 3.0457 18.5563 3.10396C18.4386 3.16223 18.3335 3.24311 18.247 3.342L13.137 9.182L8.8 3.4C8.70685 3.2758 8.58607 3.175 8.44721 3.10557C8.30836 3.03614 8.15525 3 8 3H4C3.81429 3 3.63225 3.05171 3.47427 3.14935C3.31629 3.24698 3.18863 3.38668 3.10557 3.55279C3.02252 3.71889 2.98736 3.90484 3.00404 4.08981C3.02072 4.27477 3.08857 4.45143 3.2 4.6L9.637 13.182L4.247 19.342C4.16053 19.4409 4.09437 19.5558 4.05232 19.6803C4.01027 19.8047 3.99314 19.9363 4.00192 20.0673C4.01069 20.1984 4.0452 20.3264 4.10347 20.4442C4.16173 20.5619 4.24261 20.667 4.3415 20.7535C4.44039 20.84 4.55534 20.9061 4.67979 20.9482C4.80424 20.9902 4.93575 21.0074 5.06682 20.9986C5.19789 20.9898 5.32595 20.9553 5.44368 20.897C5.56142 20.8388 5.66652 20.7579 5.753 20.659L10.863 14.818L15.2 20.6C15.2931 20.7242 15.4139 20.825 15.5528 20.8944C15.6916 20.9639 15.8448 21 16 21H20C20.1857 21 20.3678 20.9483 20.5257 20.8507C20.6837 20.753 20.8114 20.6133 20.8944 20.4472C20.9775 20.2811 21.0126 20.0952 20.996 19.9102C20.9793 19.7252 20.9114 19.5486 20.8 19.4L14.363 10.818L19.753 4.659Z" fill="currentColor"/></g>
            <defs><clipPath id="clip0_1_1030_hero_social_tw"><rect width="24" height="24" fill="white"/></clipPath></defs>
          </svg>
        </a>
        <a href="#" aria-label="YouTube" className="text-white hover:opacity-75">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1_1034_hero_social_yt)"><path fillRule="evenodd" clipRule="evenodd" d="M12 4C12.855 4 13.732 4.022 14.582 4.058L15.586 4.106L16.547 4.163L17.447 4.224L18.269 4.288C19.161 4.35628 20.0004 4.73695 20.6395 5.36304C21.2786 5.98913 21.6764 6.82054 21.763 7.711L21.803 8.136L21.878 9.046C21.948 9.989 22 11.017 22 12C22 12.983 21.948 14.011 21.878 14.954L21.803 15.864C21.79 16.01 21.777 16.151 21.763 16.289C21.6764 17.1796 21.2784 18.0112 20.6391 18.6373C19.9999 19.2634 19.1602 19.6439 18.268 19.712L17.448 19.775L16.548 19.837L15.586 19.894L14.582 19.942C13.7218 19.9794 12.861 19.9987 12 20C11.139 19.9987 10.2782 19.9794 9.418 19.942L8.414 19.894L7.453 19.837L6.553 19.775L5.731 19.712C4.83895 19.6437 3.99955 19.2631 3.36047 18.637C2.72139 18.0109 2.32357 17.1795 2.237 16.289L2.197 15.864L2.122 14.954C2.04554 13.9711 2.00484 12.9858 2 12C2 11.017 2.052 9.989 2.122 9.046L2.197 8.136C2.21 7.99 2.223 7.849 2.237 7.711C2.32354 6.8207 2.72122 5.98942 3.36009 5.36334C3.99897 4.73727 4.83813 4.3565 5.73 4.288L6.551 4.224L7.451 4.163L8.413 4.106L9.417 4.058C10.2775 4.02063 11.1387 4.0013 12 4ZM10 9.575V14.425C10 14.887 10.5 15.175 10.9 14.945L15.1 12.52C15.1914 12.4674 15.2673 12.3916 15.3201 12.3003C15.3729 12.209 15.4007 12.1055 15.4007 12C15.4007 11.8945 15.3729 11.791 15.3201 11.6997C15.2673 11.6084 15.1914 11.5326 15.1 11.48L10.9 9.056C10.8088 9.00332 10.7053 8.9756 10.5999 8.97562C10.4945 8.97563 10.3911 8.97563 10.2998 8.97563C10.2086 8.97563 10.1329 8.97563 10.0802 8.97563C10.0276 8.97563 9.99993 8.97563 10 9.576V9.575Z" fill="currentColor"/></g>
            <defs><clipPath id="clip0_1_1034_hero_social_yt"><rect width="24" height="24" fill="white"/></clipPath></defs>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default HeroSection;