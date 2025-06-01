// app/dashboard/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import React from "react";
import { Layers, LayoutDashboard, LogOut, Building, UserCircle, Info, AlertTriangle, FileText, Menu, X } from "lucide-react";
import Link from "next/link";
import EntrepriseForm from "./EntrepriseForm";
import ServiceList from "./ServiceList"; // Nouveau composant client pour lister les services
import DemandeList from "./DemandeList"; // Ajoutez ceci

export const metadata = {
  title: "Dashboard Client",
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  let userId = user?.id;
  if (!userId && user?.email) {
    const dbUser = await prisma.user.findUnique({
      where: { email: user.email },
      select: { id: true },
    });
    userId = dbUser?.id;
  }

  if (!user || !user.email || !userId || typeof userId !== "string" || userId.trim() === "") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 p-4">
        <div className="text-center p-8 sm:p-10 bg-white shadow-xl rounded-xl max-w-md w-full">
          <AlertTriangle size={56} className="mx-auto text-red-500 mb-5" />
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-800 mb-3">
            Accès Non Autorisé
          </h1>
          <p className="text-slate-600 mb-8 text-sm sm:text-base">
            Vos informations utilisateur n'ont pas pu être récupérées. Veuillez vous reconnecter ou contacter notre support si le problème persiste.
          </p>
          <Link
            href="/api/auth/signin" // Adapt if your sign-in page is different
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            Se Connecter
          </Link>
        </div>
      </div>
    );
  }

  const services = await prisma.service.findMany({
    include: { packages: true },
  });

  const entreprise = await prisma.entreprise.findFirst({
    where: { userId: userId },
  });

  // Remplacez 'demande' par le vrai nom du modèle Prisma (ex: serviceRequest)
  const demandes = await prisma.serviceRequest.findMany({
    where: { userId: userId },
    orderBy: { createdAt: "desc" },
    include: { service: true }, // Ajout de la relation service
  });

  const userName = user.name || user.email?.split('@')[0] || "Client";

  return (
       <div className="flex flex-col md:flex-row min-h-screen bg-slate-50">
      {/* Mobile Menu Overlay */}
      <div className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm hidden" id="mobile-menu-overlay"></div>

      {/* Sidebar */}
      <aside 
        id="sidebar"
        className="w-full md:w-72 bg-white backdrop-blur-md fixed md:static inset-y-0 left-0 z-30 h-full -translate-x-full md:translate-x-0 transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <LayoutDashboard size={24} className="text-indigo-600" />
              </div>
              <span className="text-xl font-bold text-slate-800">Espace {user.name || "Utilisateur"}</span>
            </Link>
            <button 
              id="close-menu"
              className="md:hidden p-2 hover:bg-slate-100 rounded-lg text-slate-600">
              <X size={20} />
            </button>
          </div>

          {/* User Profile */}
          <div className="px-6 py-5 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div className="relative">
                <UserCircle size={44} className="text-slate-400" />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <p className="font-semibold text-slate-800">{user.name || "Utilisateur"}</p>
                <p className="text-sm text-slate-500">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-6 space-y-1">
            {[
              { id: 'user-info-section', icon: Building, label: 'Entreprise' },
              { id: 'demandes-section', icon: FileText, label: 'Demandes' },
              { id: 'services-section', icon: Layers, label: 'Services' },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-indigo-50 rounded-xl transition-colors group"
                data-section={item.id}
              >
                <item.icon size={20} className="text-indigo-500 group-hover:text-indigo-600" />
                <span className="font-medium">{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Footer */}
          <div className="mt-auto p-6 border-t border-slate-100">
            <form action="/api/auth/signout" method="POST">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-4 py-3 rounded-xl transition-colors"
              >
                <LogOut size={18} />
                Déconnexion
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen md:ml-5">
        {/* Mobile Header */}
        <header className="md:hidden fixed top-0 left-0 right-0 bg-white shadow-sm z-30">
          <div className="flex items-center justify-between px-4 h-16">
            <button 
              id="open-menu"
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-600">
              <Menu size={24} />
            </button>
            <div className="flex items-center gap-2">
              <UserCircle size={32} className="text-slate-400" />
              <span className="font-medium text-slate-700">{userName}</span>
            </div>
          </div>
        </header>

        {/* Content Container */}
        <div className="pt-16 md:pt-0 p-6 md:p-8 lg:p-12 space-y-8">
          <section className="max-w-5xl mx-auto">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-2xl p-6 md:p-8 text-white">
              <h1 className="text-2xl md:text-4xl font-bold mb-2">Bonjour, {userName} 👋</h1>
              <p className="text-sm md:text-base opacity-90">
                Gérez vos services et suivez vos demandes en temps réel
              </p>
            </div>
  {/* Demandes Section */}
            <section id="demandes-section" className="mt-8">
              <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-slate-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <FileText size={24} className="text-indigo-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-slate-800">Historique des Demandes</h2>
                </div>
                <DemandeList demandes={demandes} userId={userId} />
              </div>
            </section>
            {/* Entreprise Section */}
            <section id="user-info-section" className="mt-8">
              <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-slate-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <Building size={24} className="text-indigo-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-slate-800">Profil d'Entreprise</h2>
                </div>
                <EntrepriseForm userId={userId} />
              </div>
            </section>

          

            {/* Services Section */}
            <section id="services-section" className="mt-8">
              <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-slate-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <Layers size={24} className="text-indigo-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-slate-800">Nos Services</h2>
                </div>
                <ServiceList
                  services={services}
                  user={{ id: userId, name: user.name, email: user.email }}
                  entreprise={entreprise}
                />
              </div>
            </section>
          </section>
        </div>
      </main>
    </div>
  );
}

// Add this to your global CSS if you want a custom scrollbar for the description:
/*
.custom-scrollbar::-webkit-scrollbar {
  width: 8px; // Slightly wider for easier grab
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent; // Or bg-slate-100 if you prefer
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #a3a3a3; // neutral-400
  border-radius: 10px;
  border: 2px solid transparent; // Creates padding around thumb
  background-clip: content-box;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #737373; // neutral-500
}
*/