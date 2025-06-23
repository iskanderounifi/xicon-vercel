// app/dashboard/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import React from "react";
import { Layers, LayoutDashboard, LogOut, Building, UserCircle, Info, AlertTriangle, FileText, Menu, X, ChevronRight, Bookmark, Bell, HelpCircle } from "lucide-react";
import Link from "next/link";
import EntrepriseForm from "./EntrepriseForm";
import ServiceList from "./ServiceList";
import DemandeList from "./DemandeList";

export const metadata = {
  title: "Tableau de Bord Client",
};

interface SessionUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user as SessionUser;

  let userId = user?.id;
  if (!userId && user?.email) {
    const dbUser = await prisma.user.findUnique({
      where: { email: user.email },
      select: { id: true },
    });
    userId = dbUser?.id;
  }

  if (!user || !user.email ) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="text-center p-8 sm:p-10 bg-white shadow-md rounded-xl max-w-md w-full border border-gray-200">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-5">
            <AlertTriangle size={32} className="text-gray-700" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
            Accès Non Autorisé
          </h1>
          <p className="text-gray-600 mb-8 text-sm sm:text-base">
            Vos informations utilisateur n'ont pas pu être récupérées. Veuillez vous reconnecter ou contacter notre support si le problème persiste.
          </p>
          <Link
            href="/api/auth/signin"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-800 text-base font-medium rounded-lg text-gray-800 hover:bg-gray-800 hover:text-white transition-colors"
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

  const demandes = await prisma.serviceRequest.findMany({
    where: { userId: userId },
    orderBy: { createdAt: "desc" },
    include: { service: true },
  });

  const formattedDemandes = demandes.map(demande => ({
    ...demande,
    createdAt: demande.createdAt.toISOString(),
    updatedAt: demande.updatedAt.toISOString(),
    service: {
      ...demande.service,
      createdAt: demande.service.createdAt.toISOString(),
      updatedAt: demande.service.updatedAt.toISOString(),
    }
  }));

  const userName = user.name || user.email?.split('@')[0] || "Client";

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Mobile Menu Overlay */}
      <div className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm hidden" id="mobile-menu-overlay"></div>

      {/* Sidebar - Monochrome Design */}
      <aside 
        id="sidebar"
        className="w-full md:w-64 bg-white border-r border-gray-200 fixed md:static inset-y-0 left-0 z-30 h-full -translate-x-full md:translate-x-0 transition-transform duration-300 ease-in-out shadow-sm">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
            <Link href="/dashboard" className="flex items-center gap-3">
              <LayoutDashboard size={24} className="text-gray-800" />
              <span className="text-lg font-semibold text-gray-800">Tableau de bord</span>
            </Link>
            <button 
              id="close-menu"
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg text-gray-600">
              <X size={20} />
            </button>
          </div>

          {/* User Profile */}
          <div className="px-6 py-5 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="border-2 border-gray-300 rounded-full p-1">
                  <UserCircle size={40} className="text-gray-500" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-gray-700 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <p className="font-semibold text-gray-800">{user.name || "Utilisateur"}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-6 space-y-1">
            {[
              { id: 'user-info-section', icon: Building, label: 'Entreprise' },
              { id: 'demandes-section', icon: FileText, label: 'Demandes', badge: demandes.length },
              { id: 'services-section', icon: Layers, label: 'Services' },
              { id: 'settings-section', icon: UserCircle, label: 'Paramètres' },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="flex items-center justify-between gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
              >
                <div className="flex items-center gap-3">
                  <item.icon size={18} className="text-gray-600" />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="bg-gray-800 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </a>
            ))}
            
            {/* Additional Navigation */}
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-all">
              <Bookmark size={18} className="text-gray-600" />
              <span className="font-medium">Favoris</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-all">
              <Bell size={18} className="text-gray-600" />
              <span className="font-medium">Notifications</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-all">
              <HelpCircle size={18} className="text-gray-600" />
              <span className="font-medium">Aide</span>
            </a>
          </nav>

          {/* Footer */}
          <div className="mt-auto p-6 border-t border-gray-200">
            <form action="/api/auth/signout" method="POST">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 border border-gray-800 text-gray-800 font-medium px-4 py-3 rounded-lg hover:bg-gray-800 hover:text-white transition-colors"
              >
                <LogOut size={18} />
                Déconnexion
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        {/* Mobile Header */}
        <header className="md:hidden fixed top-0 left-0 right-0 bg-white shadow-sm z-30 border-b border-gray-200">
          <div className="flex items-center justify-between px-4 h-16">
            <button 
              id="open-menu"
              className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
              <Menu size={24} />
            </button>
            <div className="flex items-center gap-2">
              <UserCircle size={28} className="text-gray-500" />
              <span className="font-medium text-gray-800">{userName}</span>
            </div>
          </div>
        </header>

        {/* Content Container */}
        <div className="pt-16 md:pt-0 p-6 md:p-8 space-y-6">
          <div className="max-w-6xl mx-auto">
            {/* Welcome Banner */}
            <div className="bg-gray-900 rounded-xl p-6 text-white">
              <h1 className="text-2xl font-bold mb-2">Bonjour, {userName}</h1>
              <p className="text-gray-300">
                Gérez vos services et suivez vos demandes en temps réel
              </p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Services</p>
                    <p className="text-xl font-bold text-gray-800 mt-1">{services.length}</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <Layers size={20} className="text-gray-700" />
                  </div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Demandes</p>
                    <p className="text-xl font-bold text-gray-800 mt-1">{demandes.length}</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <FileText size={20} className="text-gray-700" />
                  </div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Profil</p>
                    <p className="text-xl font-bold text-gray-800 mt-1">
                      {entreprise ? "Complet" : "Incomplet"}
                    </p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <Building size={20} className="text-gray-700" />
                  </div>
                </div>
              </div>
            </div>

            {/* Demandes Section */}
            <section id="demandes-section" className="mt-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <FileText size={20} className="text-gray-800" />
                    <h2 className="text-lg font-semibold text-gray-800">Historique des Demandes</h2>
                  </div>
                  <Link href="#" className="text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center gap-1">
                    Voir tout <ChevronRight size={16} />
                  </Link>
                </div>
                <DemandeList demandes={formattedDemandes} userId={userId} />
              </div>
            </section>

            {/* Entreprise Section */}
            <section id="user-info-section" className="mt-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Building size={20} className="text-gray-800" />
                    <h2 className="text-lg font-semibold text-gray-800">Profil d'Entreprise</h2>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${entreprise ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}`}>
                    {entreprise ? 'Completé' : 'À compléter'}
                  </div>
                </div>
                <EntrepriseForm userId={userId} />
              </div>
            </section>

            {/* Services Section */}
            <section id="services-section" className="mt-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Layers size={20} className="text-gray-800" />
                    <h2 className="text-lg font-semibold text-gray-800">Nos Services</h2>
                  </div>
                  <div className="text-sm text-gray-600">
                    {services.length} services
                  </div>
                </div>
                <ServiceList
                  services={services}
                  user={{ 
                    id: userId, 
                    name: user.name || undefined, 
                    email: user.email || undefined 
                  }}
                  entreprise={entreprise}
                />
              </div>
            </section>

            {/* Settings Section */}
            <section id="settings-section" className="mt-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <UserCircle size={20} className="text-gray-800" />
                    <h2 className="text-lg font-semibold text-gray-800">Paramètres du Compte</h2>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Profile Information */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Informations Personnelles</h3>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nom complet
                          </label>
                          <input
                            type="text"
                            defaultValue={user.name || ""}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            defaultValue={user.email || ""}
                            disabled
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-100"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                        >
                          Mettre à jour
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Change Password */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Changer le Mot de Passe</h3>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Mot de passe actuel
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nouveau mot de passe
                          </label>
                          <input
                            type="password"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Confirmer le mot de passe
                          </label>
                          <input
                            type="password"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                        >
                          Changer le mot de passe
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Notification Settings */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Préférences de Notification</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-800">Notifications par email</h4>
                          <p className="text-sm text-gray-500">Recevoir des notifications par email</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-600"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-800">Notifications de demande</h4>
                          <p className="text-sm text-gray-500">Être notifié des mises à jour de vos demandes</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div className="bg-gray-100 rounded-xl p-6 border border-gray-300">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Zone Dangereuse</h3>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-700">
                        La suppression de votre compte est irréversible. Toutes vos données seront définitivement supprimées.
                      </p>
                      <button
                        type="button"
                        className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        Supprimer mon compte
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}