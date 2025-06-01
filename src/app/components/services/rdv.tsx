"use client";

import React from 'react';
import Link from 'next/link';

const CTABlock = () => {
  return (
    <section className="relative w-full bg-[#EFF6FF] py-20 overflow-hidden"> {/* P2---C6 */}
      {/* Éléments décoratifs */}
      <div className="absolute left-6 top-16 w-16 h-16 opacity-25 -rotate-30">
        <div className="w-20 h-20">
          <div className="w-20 h-20 bg-[#2563EB]" /> {/* P1---C2 */}
        </div>
      </div>

      <div className="absolute right-6 top-64 w-16 h-16 opacity-25 rotate-24">
        <div className="w-24 h-24">
          <div className="w-20 h-20 bg-[#2563EB]" />
        </div>
      </div>

      <div className="absolute right-[calc(25%+1rem)] top-5 w-12 h-12 opacity-25 -rotate-19">
        <div className="w-16 h-16">
          <div className="w-12 h-12 bg-[#2563EB]" />
        </div>
      </div>

      <div className="absolute -left-16 top-[60%] w-28 h-28 bg-blue-400 rounded-full" />
      <div className="absolute -right-16 top-5 w-28 h-28 rounded-full border-2 border-blue-400" />

      <div className="absolute left-[14%] top-[70%] w-16 h-16 opacity-25 rotate-28">
        <div className="w-20 h-20">
          <div className="w-14 h-16 bg-[#2563EB]" />
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <h2 className="text-[#2563EB] text-2xl md:text-3xl font-bold font-montserrat mb-8 leading-tight">
            Avez-vous un projet en préparation ?<br /><br />
            Contactez-nous pour un accompagnement personnalisé !
          </h2>

          <Link href="/prendre-rendez-vous" className="group">
            <div className="w-44 h-16 px-4 py-5 bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl flex items-center justify-center gap-3 transition-colors duration-200">
              <div className="w-6 h-6 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 bg-[#EFF6FF]" viewBox="0 0 24 24" fill="none">
                  <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="#EFF6FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-[#EFF6FF] text-base font-bold font-montserrat">
                Prendre RDV
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTABlock;