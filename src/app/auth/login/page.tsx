"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { LogIn } from "lucide-react";

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Identifiants incorrects. Veuillez réessayer.");
        return;
      }

      toast.success("Connexion réussie !");
      router.push("/admin/dashboard");
      router.refresh();
    } catch (error) {
      toast.error("Une erreur inattendue est survenue.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Conteneur principal avec un fond gris clair
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      
      {/* Carte de connexion blanche avec une ombre douce */}
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-lg border border-gray-200/80">
        
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Se connecter
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Ravi de vous revoir !
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                {...register("password", { required: "Le mot de passe est requis" })}
                type="password"
                id="password"
                autoComplete="current-password"
                className="block w-full rounded-md border-gray-300 shadow-sm placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900 sm:text-sm py-2.5 px-3"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-end text-sm">
            <Link href="/auth/forgot-password" className="font-medium text-gray-700 hover:text-gray-900 hover:underline">
                Mot de passe oublié ?
            </Link>
          </div>

          {/* Bouton de Connexion */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center gap-2 items-center rounded-lg bg-gray-900 py-2.5 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LogIn className="h-5 w-5" />
              <span>{isLoading ? "Connexion..." : "Se connecter"}</span>
            </button>
          </div>
        </form>

        {/* Lien d'inscription */}
        <p className="text-center text-sm text-gray-600">
          Pas encore membre ?{" "}
          <Link
            href="/auth/register"
            className="font-semibold text-gray-800 hover:text-gray-900 hover:underline"
          >
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
}