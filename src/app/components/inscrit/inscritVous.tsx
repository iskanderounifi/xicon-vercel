"use client";

import React, { useState, FormEvent, ChangeEvent } from 'react';
import Link from 'next/link';
import { signIn } from "next-auth/react"; // Pour la connexion via fournisseurs sociaux
import { useRouter } from 'next/navigation'; // Pour la redirection après inscription

const RegisterForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    // Vérification côté client des champs obligatoires
    if (
      !formData.nom ||
      !formData.prenom ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Champs obligatoires manquants.");
      setIsLoading(false);
      return;
    }

    if (!formData.termsAccepted) {
      setError("Vous devez accepter les conditions d'utilisation.");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      setIsLoading(false);
      return;
    }

    // Ajoutez d'autres validations côté client si nécessaire (longueur, format email)

    try {
      // Vérifie que l'API attend bien les bons champs (nom, prenom, email, password)
      const response = await fetch('/api/auth/register-client', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.nom,         // Prisma attend probablement "name"
          prenom: formData.prenom,    // Ajoute ce champ si tu l'as dans le modèle
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Une erreur s'est produite.");
      }

      setSuccessMessage(data.message || "Inscription réussie ! Vous pouvez maintenant vous connecter.");
      // Optionnel: rediriger vers la page de connexion après un court délai
      // ou connecter automatiquement l'utilisateur
      // Pour l'instant, on affiche un message et l'utilisateur doit se connecter manuellement.
      // router.push('/login');

      // Connecter automatiquement l'utilisateur après l'inscription
      const signInResponse = await signIn('credentials', {
        redirect: false, // Ne pas rediriger par NextAuth, on le gère nous-mêmes
        email: formData.email,
        password: formData.password, // Le mot de passe non hashé
      });

      if (signInResponse?.error) {
        setError(signInResponse.error === "CredentialsSignin" ? "Email ou mot de passe incorrect après inscription." : signInResponse.error);
      } else if (signInResponse?.ok) {
        router.push('/'); // Ou une autre page après connexion réussie
        router.refresh(); // Pour s'assurer que la session est bien mise à jour
      }


    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  // Noms de classe communs
  const labelClass = "block text-stone-500 text-base font-semibold font-montserrat mb-2"; // Couleur label modifiée
  const inputBaseClass = "w-full h-12 px-4 rounded-xl border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 font-montserrat";
  const inputWithIconClass = `${inputBaseClass} pl-10`;
  const iconWrapperClass = "absolute left-3 top-3 text-gray-700";


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Formulaire d'inscription */}
        <div className="lg:w-1/2">
          <div className="text-stone-500 text-xs font-normal font-montserrat mb-8">
            Accueil / Connecter / Inscrivez-vous {/* Correction typo "Inscriver-vous" */}
          </div>

          <div className="space-y-8">
            <h1 className="text-gray-700 text-3xl md:text-4xl font-bold font-montserrat">
              Créer un compte {/* Titre plus approprié */}
            </h1>

            {/* Messages d'erreur/succès */}
            {error && <div className="p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}
            {successMessage && <div className="p-3 bg-green-100 text-green-700 rounded-md">{successMessage}</div>}


            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nom et Prénom */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nom" className={labelClass}> {/* htmlFor ajouté */}
                    Nom <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="nom" name="nom" // id et name ajoutés
                      value={formData.nom} onChange={handleChange}
                      className={inputWithIconClass}
                      placeholder="Foulan"
                      required
                    />
                    <div className={iconWrapperClass}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="prenom" className={labelClass}> {/* htmlFor ajouté */}
                    Prénom <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="prenom" name="prenom" // id et name ajoutés
                      value={formData.prenom} onChange={handleChange}
                      className={inputWithIconClass}
                      placeholder="Ben foulan"
                      required
                    />
                    <div className={iconWrapperClass}>
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className={labelClass}> {/* htmlFor ajouté */}
                  E-mail <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email" name="email" // id et name ajoutés
                    value={formData.email} onChange={handleChange}
                    className={inputWithIconClass}
                    placeholder="foulanbenfoulan@gmail.com"
                    required
                  />
                  <div className={iconWrapperClass}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Mot de passe */}
              <div>
                <label htmlFor="password" className={labelClass}> {/* htmlFor ajouté */}
                  Mot de passe <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password" name="password" // id et name ajoutés
                    value={formData.password} onChange={handleChange}
                    className={inputWithIconClass}
                    placeholder="************"
                    required
                  />
                  <div className={iconWrapperClass}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-zinc-400 hover:text-zinc-600"
                    aria-label={showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
                  >
                    {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.242M9.879 9.879l4.242 4.242M9.88 9.88l-1.293-1.293a3 3 0 00-4.243 4.243c.31.31.648.584 1.005.82l1.293 1.293M3.06 3.06l18.019 18.02" /></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Confirmation mot de passe */}
              <div>
                <label htmlFor="confirmPassword" className={labelClass}> {/* htmlFor ajouté */}
                  Confirmer le mot de passe <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword" name="confirmPassword" // id et name ajoutés
                    value={formData.confirmPassword} onChange={handleChange}
                    className={inputWithIconClass}
                    placeholder="************"
                    required
                  />
                  <div className={iconWrapperClass}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                   <button 
                    type="button" 
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-zinc-400 hover:text-zinc-600"
                    aria-label={showConfirmPassword ? "Cacher la confirmation du mot de passe" : "Afficher la confirmation du mot de passe"}
                  >
                    {showConfirmPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.242M9.879 9.879l4.242 4.242M9.88 9.88l-1.293-1.293a3 3 0 00-4.243 4.243c.31.31.648.584 1.005.82l1.293 1.293M3.06 3.06l18.019 18.02" /></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Checkbox conditions */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="termsAccepted" name="termsAccepted" // id et name ajoutés
                  checked={formData.termsAccepted} onChange={handleChange}
                  className="mt-1 w-6 h-6 rounded-md border-indigo-500 text-indigo-600 focus:ring-indigo-500" // Amélioration style checkbox
                  required
                />
                <label htmlFor="termsAccepted" className="text-gray-700 text-xs font-medium font-montserrat">
                  J'ai lu et accepté les <Link href="/terms" className="text-indigo-600 hover:underline">conditions d'utilisation</Link> et notre <Link href="/privacy" className="text-indigo-600 hover:underline">politique de confidentialité</Link>. <span className="text-red-500">*</span>
                </label>
              </div>

              {/* Bouton d'inscription */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-16 bg-indigo-500 hover:bg-indigo-600 text-white text-base font-bold font-montserrat rounded-xl transition duration-200 disabled:bg-gray-400"
              >
                {isLoading ? 'Inscription en cours...' : 'Inscrivez-vous'}
              </button>

              {/* Séparateur OU */}
              <div className="flex items-center my-4">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="px-2 text-gray-500 text-sm">OU</span>
                <hr className="flex-grow border-t border-gray-300" />
              </div>

              {/* Boutons de connexion sociale */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => signIn('google', { callbackUrl: '/' })} // Rediriger vers l'accueil après connexion Google
                  className="h-16 rounded-xl border border-indigo-500 flex items-center justify-center gap-2 hover:bg-gray-50 transition duration-200 text-gray-700 font-medium"
                >
                  <img src="/assets/icon/google.png" alt="Google" className="w-6 h-6" /> {/* Utilisez un SVG local ou une meilleure icône */}
                  Continuer avec Google
                </button>
                <button
                  type="button"
                  onClick={() => signIn('facebook', { callbackUrl: '/' })} // Rediriger vers l'accueil après connexion Facebook
                  className="h-16 rounded-xl border border-indigo-500 flex items-center justify-center gap-2 hover:bg-gray-50 transition duration-200 text-gray-700 font-medium"
                >
                  <img src="/assets/icon/gmail.png" alt="Facebook" className="w-6 h-6" /> {/* Utilisez un SVG local ou une meilleure icône */}
                  Continuer avec Facebook
                </button>
              </div>
            </form>

            <div className="text-center font-montserrat">
              <span className="text-gray-700 text-base font-medium">Vous avez déjà un compte? </span>
              <Link href="/login" className="text-indigo-600 text-base font-semibold hover:underline">
                Se connecter
              </Link>
            </div>
          </div>
        </div>

        {/* Image de droite (inchangée) */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <img
            src="/assets/log/ins.png" // Image plus pertinente
            alt="Apprentissage en ligne"
            className="w-full h-full object-cover rounded-[40px]"
          />
           <div className="absolute top-4 left-4 flex items-center">
                    {[1, 2, 3, 4].map((item) => (
                      <div
                        key={item}
                        className="w-8 h-8 rounded-full border-2 border-white -ml-2 first:ml-0 overflow-hidden"
                      >
                        {/* Utilisez <img> au lieu de <Image> pour éviter les erreurs côté serveur */}
                        <img
                          src="/assets/icon/1.svg"
                          width={34}
                          height={34}
                          alt={`User ${item}`}
                        />
                      </div>
                    ))}
                    <div className="w-4 h-4 bg-white rounded-lg flex items-center justify-center text-red-400 text-[10px] font-semibold ml-1">
                      +9
                    </div>
                  </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;