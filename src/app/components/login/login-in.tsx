"use client";

import React, { useState, FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const LoginForm = () => {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const response = await fetch('/api/auth/user-auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setFeedback(data.error || "Une erreur s'est produite lors de la connexion");
        return;
      }

      // Stocker le token et les informations utilisateur dans le localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      
      setFeedback("Connexion réussie. Redirection...");
      
      // Redirection vers le dashboard
      setTimeout(() => {
        router.push("/dashboard");
        router.refresh();
      }, 1000);
    } catch (error: any) {
      console.error("Erreur de connexion:", error);
      setFeedback(
        error.message || 
        "Une erreur s'est produite lors de la connexion. Veuillez réessayer plus tard."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col lg:flex-row">
      {/* Fil d'Ariane */}
      <div className="absolute top-4 left-4 lg:left-8 text-stone-500 text-xs">
        Accueil / Connecter
      </div>

      {/* Partie gauche - Formulaire */}
      <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <div className="mb-12">
            <h1 className="text-gray-700 text-3xl md:text-4xl font-bold mb-3">
              Connexion
            </h1>
            <p className="text-zinc-700 text-xl md:text-2xl font-medium">
              Bienvenue ! S'il vous plaît connectez-vous à votre compte.
            </p>
          </div>

          {/* Messages de feedback */}
          {feedback && (
            <div className={`p-4 rounded-lg mb-4 ${
              feedback.includes("réussie") 
                ? "bg-green-50 border border-green-200 text-green-700" 
                : "bg-red-50 border border-red-200 text-red-700"
            }`}>
              <div className="flex items-center">
                {feedback.includes("réussie") ? (
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                <p className="font-medium">{feedback}</p>
              </div>
            </div>
          )}

          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* Champ Email */}
            <div className="space-y-1">
              <label className="text-stone-300 text-base font-semibold block">
                E-mail
              </label>
              <div className="h-12 px-4 py-3 rounded-xl border border-indigo-500 flex items-center gap-2">
                <div className="w-6 h-6 bg-zinc-700 rounded-full flex items-center justify-center text-white text-xs">
                  M
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="foulanbenfoulan@gmail.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="text-zinc-700 text-base font-light flex-grow outline-none bg-transparent"
                />
              </div>
            </div>

            {/* Champ Mot de passe */}
            <div className="space-y-1">
              <label className="text-stone-300 text-base font-semibold block">
                Mot de passe
              </label>
              <div className="h-12 px-4 py-3 rounded-xl border border-indigo-500 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-zinc-700 rounded-full flex items-center justify-center text-white text-xs">
                    P
                  </div>
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="text-zinc-700 text-base font-light outline-none bg-transparent"
                  />
                </div>
                <button type="button" className="text-zinc-400">
                  <EyeIcon />
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-6 h-6 rounded-md border border-indigo-500 checked:bg-sky-400 appearance-none checked:flex checked:items-center checked:justify-center"
                />
                <span className="text-zinc-700 text-xs font-medium">
                  Se souvenir de moi
                </span>
              </label>
              <a
                href="#"
                className="text-zinc-400 text-xs font-medium hover:text-indigo-500"
              >
                Mot de passe oublié ?
              </a>
            </div>

            {/* Boutons */}
            <div className="space-y-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-16 bg-indigo-500 rounded-xl text-white text-base font-bold hover:bg-indigo-600 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Connexion en cours..." : "Connecter"}
              </button>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => signIn("google")}
                  className="h-16 rounded-xl border border-indigo-500 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                >
                  <Image
                    src="/assets/icon/gmail.png"
                    width={44}
                    height={44}
                    alt="Google"
                    className="w-11 h-11"
                  />
                </button>
                <button
                  type="button"
                  onClick={() => signIn("facebook")}
                  className="h-16 rounded-xl border border-indigo-500 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                >
                  <Image
                    src="/assets/icon/google.png"
                    width={44}
                    height={44}
                    alt="Facebook"
                    className="w-11 h-11"
                  />
                </button>
              </div>
            </div>
          </form>

          <p className="text-center mt-8 text-zinc-700 text-base font-medium">
            Vous n'avez pas de compte ?{" "}
            <a
              href="/inscription"
              className="text-blue-600 font-semibold hover:underline"
            >
              Inscrivez-vous
            </a>
          </p>
        </div>
      </div>

      {/* Partie droite - Image */}
      <div className="w-full lg:w-1/2 relative hidden lg:block">
        <div className="absolute inset-0 bg-purple-500 rounded-l-[40px] overflow-hidden">
          <Image
            src="/assets/log/img-login.png"
            alt="Graceful girl with wavy brown hair"
            layout="fill"
            objectFit="cover"
          />
        </div>

        {/* Avatars */}
        <div className="absolute top-4 left-4 flex items-center">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="w-8 h-8 rounded-full border-2 border-white -ml-2 first:ml-0 overflow-hidden"
            >
              <Image
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
  );
};

// Composant pour l'icône de l'œil
const EyeIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 5C5.63636 5 2 12 2 12C2 12 5.63636 19 12 19C18.3636 19 22 12 22 12C22 12 18.3636 5 12 5Z"
      stroke="#A1A1AA"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
      stroke="#A1A1AA"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default LoginForm;

