"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { UserPlus } from "lucide-react"; // Icône appropriée pour l'inscription

type RegisterForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>();

  // La logique d'envoi du formulaire est conservée
  const onSubmit = async (data: RegisterForm) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        // Affiche le message d'erreur de l'API (par ex. "Email already exists")
        throw new Error(result.message || "La création du compte a échoué.");
      }

      toast.success("Compte créé avec succès ! Vous pouvez maintenant vous connecter.");
      router.push("/auth/login");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Une erreur est survenue.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Conteneur principal avec un fond gris clair
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      
      {/* Carte d'inscription blanche avec une ombre douce */}
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-lg border border-gray-200/80">
        
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Créer un compte
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Rejoignez-nous en quelques secondes.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Champ Nom complet */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nom complet
            </label>
            <div className="mt-1">
              <input
                {...register("name", { required: "Le nom est requis" })}
                type="text"
                id="name"
                autoComplete="name"
                className="block w-full rounded-md border-gray-300 shadow-sm placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900 sm:text-sm py-2.5 px-3"
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>
          </div>

          {/* Champ Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Adresse e-mail
            </label>
            <div className="mt-1">
              <input
                {...register("email", {
                  required: "L'email est requis",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Adresse email invalide",
                  },
                })}
                type="email"
                id="email"
                autoComplete="email"
                className="block w-full rounded-md border-gray-300 shadow-sm placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900 sm:text-sm py-2.5 px-3"
                placeholder="vous@exemple.com"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Champ Mot de passe */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <div className="mt-1">
              <input
                {...register("password", {
                  required: "Le mot de passe est requis",
                  minLength: {
                    value: 6,
                    message: "Le mot de passe doit faire au moins 6 caractères",
                  },
                })}
                type="password"
                id="password"
                autoComplete="new-password"
                className="block w-full rounded-md border-gray-300 shadow-sm placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900 sm:text-sm py-2.5 px-3"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>
          </div>

          {/* Champ Confirmer le mot de passe */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirmer le mot de passe
            </label>
            <div className="mt-1">
              <input
                {...register("confirmPassword", {
                  required: "Veuillez confirmer votre mot de passe",
                  validate: (value) =>
                    value === watch("password") || "Les mots de passe ne correspondent pas",
                })}
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                className="block w-full rounded-md border-gray-300 shadow-sm placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900 sm:text-sm py-2.5 px-3"
                placeholder="••••••••"
              />
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          {/* Bouton d'inscription */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center gap-2 items-center rounded-lg bg-gray-900 py-2.5 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <UserPlus className="h-5 w-5" />
              <span>{isLoading ? "Création en cours..." : "Créer le compte"}</span>
            </button>
          </div>
        </form>

        {/* Lien vers la connexion */}
        <p className="text-center text-sm text-gray-600">
          Déjà un compte ?{" "}
          <Link
            href="/auth/login"
            className="font-semibold text-gray-800 hover:text-gray-900 hover:underline"
          >
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}