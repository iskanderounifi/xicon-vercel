"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-gray-100">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-32 items-center justify-between">
          {/* Logo et navigation */}
          <div className="flex items-center gap-4 md:gap-28">
            <Link href="/" className="text-teal-600 flex items-center">
              <span className="sr-only">Home</span>
              <Image 
                src="/assets/icon/logo.svg"
                width={60}
                height={60}
                alt="xicom"
                className="w-10 h-10 md:w-16 md:h-16"
                priority
              />
            </Link>

            {/* Navigation Desktop */}
            <nav className="hidden md:block">
              <ul className="flex items-center gap-6 lg:gap-12 text-sm md:text-base font-montserrat">
                <li>
                  <Link href="/" className="text-gray-700 font-bold hover:text-indigo-500 transition-colors">Accueil</Link>
                </li>
                <li>
                  <Link href="/#services" className="text-gray-700 font-medium hover:text-indigo-500 transition-colors">Services</Link>
                </li>
                <li>
                  <Link href="/#offers" className="text-gray-700 font-medium hover:text-indigo-500 transition-colors">Offers</Link>
                </li>
                <li>
                  <Link href="/#contact" className="text-gray-700 font-medium hover:text-indigo-500 transition-colors">Contact</Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Boutons et menu mobile */}
          <div className="flex items-center gap-2 md:gap-7">
            {/* Boutons Desktop */}
            <div className="hidden sm:flex items-center gap-4 md:gap-7">
              <Link
                href="/connection"
                className="w-28 md:w-40 h-10 md:h-14 px-4 md:px-9 py-2 md:py-4 bg-white rounded-lg md:rounded-xl outline outline-1 outline-indigo-500 flex items-center justify-center text-indigo-500 font-semibold font-montserrat hover:bg-indigo-50 transition-colors text-sm md:text-base"
              >
                Connecter
              </Link>
              <Link
                href="/inscrit-vous"
                className="w-28 md:w-40 h-10 md:h-14 px-4 md:px-7 py-2 md:py-4 bg-indigo-500 rounded-lg md:rounded-xl flex items-center justify-center text-white font-semibold font-montserrat hover:bg-indigo-600 transition-colors text-sm md:text-base"
              >
                Commencer
              </Link>
            </div>

            {/* Menu Mobile */}
            <div className="md:hidden">
              <button
                className="p-2 text-gray-600 hover:text-indigo-500 transition-colors"
                aria-label="Ouvrir le menu"
                onClick={() => setOpen(!open)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {open && (
        <div className="md:hidden bg-white shadow-lg z-50 absolute w-full left-0">
          <nav className="px-4 py-2">
            <ul className="flex flex-col gap-4 font-montserrat">
              <li>
                <Link href="/" className="block py-2 text-gray-700 font-bold hover:text-indigo-500" onClick={() => setOpen(false)}>Accueil</Link>
              </li>
              <li>
                <Link href="/#services" className="block py-2 text-gray-700 hover:text-indigo-500" onClick={() => setOpen(false)}>Services</Link>
              </li>
              <li>
                <Link href="/#offers" className="block py-2 text-gray-700 hover:text-indigo-500" onClick={() => setOpen(false)}>Offers</Link>
              </li>
              <li>
                <Link href="/#contact" className="block py-2 text-gray-700 hover:text-indigo-500" onClick={() => setOpen(false)}>Contact</Link>
              </li>
              <li>
                <Link
                  href="/connection"
                  className="block py-2 text-indigo-500 font-semibold hover:text-indigo-700"
                  onClick={() => setOpen(false)}
                >
                  Connecter
                </Link>
              </li>
              <li>
                <Link
                  href="/inscrit-vous"
                  className="block py-2 bg-indigo-500 text-white rounded-lg text-center font-semibold hover:bg-indigo-600"
                  onClick={() => setOpen(false)}
                >
                  Commencer
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}