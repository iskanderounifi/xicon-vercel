"use client";

import React, { useState, FormEvent, ChangeEvent } from 'react';

const Newsletter = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    if (!email) {
      setMessage("L'adresse email est requise.");
      setIsSubmitting(false);
      return;
    }
    // Validation simple de l'email côté client (la validation serveur est la plus importante)
    if (!/\S+@\S+\.\S+/.test(email)) {
        setMessage("Format d'email invalide.");
        setIsSubmitting(false);
        return;
    }

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Erreur ${response.status}`);
      }

      setMessage(data.message || 'Inscription réussie !');
      setName('');
      setEmail('');
    } catch (error) {
      // Ajoute ce log pour diagnostiquer l'erreur 500
      console.error("Erreur lors de l'inscription à la newsletter :", error);
      setMessage((error as Error).message || "Une erreur s'est produite.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative w-full bg-cyan-200 py-16 overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="hidden md:block absolute -left-14 top-5 w-28 h-28 bg-blue-700 rounded-full"></div>
      <div className="hidden md:block absolute -right-14 bottom-14 w-28 h-28 rounded-full border-2 border-blue-700"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-14">
          <h2 className="text-blue-950 text-2xl md:text-3xl font-bold font-poppins text-center">
            Inscrivez-vous à la newsletter
          </h2>

          <form onSubmit={handleSubmit} className="w-full">
            {message && (
              <div
                className={`mb-4 p-3 rounded-md text-center ${
                  message === 'Inscription réussie !'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {message}
              </div>
            )}
            <div className="flex flex-col md:flex-row gap-4 md:gap-7 items-center justify-center">
              <div className="w-full md:w-96">
                <input
                  type="text"
                  placeholder="Nom (optionnel)"
                  value={name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                  className="w-full h-14 px-4 rounded-xl border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 font-poppins"
                />
              </div>
              
              <div className="w-full md:w-96">
                <input
                  type="email"
                  placeholder="Adresse email *"
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  required // Ajout de la validation HTML5 de base
                  className="w-full h-14 px-4 rounded-xl border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 font-poppins"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-72 h-14 bg-blue-700 hover:bg-blue-800 text-white font-semibold font-poppins rounded-xl transition-colors duration-200 flex items-center justify-center disabled:bg-gray-400"
              >
                {isSubmitting ? 'Inscription...' : 'Abonnez-vous'}
              </button>
            </div>
          </form>

          {/* ... Reste du composant avec les réseaux sociaux ... */}
          <div className="flex flex-col items-center gap-3">
            <h3 className="text-blue-950 text-base font-bold font-poppins">
              Abonnez-vous aux réseaux sociaux
            </h3>
            <div className="flex gap-7">
              {/* Facebook */}
              <a href="#" aria-label="Facebook" className="text-blue-700 hover:text-blue-800 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                </svg>
              </a>
              
              {/* Twitter */}
              <a href="#" aria-label="Twitter" className="text-blue-700 hover:text-blue-800 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              
              {/* Instagram */}
              <a href="#" aria-label="Instagram" className="text-blue-700 hover:text-blue-800 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              
              {/* LinkedIn */}
              <a href="#" aria-label="LinkedIn" className="text-blue-700 hover:text-blue-800 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              
              {/* YouTube */}
              <a href="#" aria-label="YouTube" className="text-blue-700 hover:text-blue-800 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;