import Link from "next/link";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import {
  LayoutDashboard,
  Users,
  Mail,
  Briefcase,
  PlusCircle,
  ClipboardList,
  ArrowLeft,
  LogOut,
  Package,
  Settings,
  Newspaper,
  Handshake,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default async function AdminDashboardPage() {
  // Récupérer les données nécessaires
  const [serviceRequests, newsletters, rdvs, services, allUsers] = await Promise.all([
    prisma.serviceRequest.findMany({
      include: { user: true, service: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.newsletter.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.rdv.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.service.findMany({
      include: { packages: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.findMany({ orderBy: { createdAt: "desc" } }), // Fetch all users once
  ]);

  // Fonction d'ajout de service (server action)
  async function addService(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const shortDesc = formData.get("shortDesc") as string;
    const icon = formData.get("icon") as string; // You might want to handle icon selection/upload differently
    const detailedDesc = formData.get("detailedDesc") as string;
    const price = parseFloat(formData.get("price") as string);
    const coverImage = formData.get("coverImage") as string; // You might want to handle image upload
    await prisma.service.create({
      data: { name, shortDesc, icon, detailedDesc, price, coverImage },
    });
    revalidatePath("/admin/dashboard");
  }

  // Fonction d'ajout de package lié à un service (server action)
  async function addPackage(formData: FormData) {
    "use server";
    const name = formData.get("packageName") as string;
    const description = formData.get("packageDescription") as string;
    const price = parseFloat(formData.get("packagePrice") as string);
    const serviceId = formData.get("serviceId") as string;
    await prisma.package.create({
      data: { name, description, price, serviceId },
    });
    revalidatePath("/admin/dashboard");
  }

  // Fonction de suppression service
  async function deleteService(formData: FormData) {
    "use server";
    const id = formData.get("serviceId") as string;
    await prisma.service.delete({ where: { id } });
    revalidatePath("/admin/dashboard");
  }

  // Fonction de suppression package
  async function deletePackage(formData: FormData) {
    "use server";
    const id = formData.get("packageId") as string;
    await prisma.package.delete({ where: { id } });
    revalidatePath("/admin/dashboard");
  }

  // Fonction de modification service (exemple simple, à adapter)
  async function editService(formData: FormData) {
    "use server";
    const id = formData.get("serviceId") as string;
    const name = formData.get("name") as string;
    const shortDesc = formData.get("shortDesc") as string;
    const icon = formData.get("icon") as string;
    const color = formData.get("color") as string;
    const detailedDesc = formData.get("detailedDesc") as string;
    const price = parseFloat(formData.get("price") as string);
    const coverImage = formData.get("coverImage") as string;
    await prisma.service.update({
      where: { id },
      data: { name, shortDesc, icon, color, detailedDesc, price, coverImage },
    });
    revalidatePath("/admin/dashboard");
  }

  // Fonction de modification package (exemple simple, à adapter)
  async function editPackage(formData: FormData) {
    "use server";
    const id = formData.get("packageId") as string;
    const name = formData.get("packageName") as string;
    const description = formData.get("packageDescription") as string;
    const price = parseFloat(formData.get("packagePrice") as string);
    await prisma.package.update({
      where: { id },
      data: { name, description, price },
    });
    revalidatePath("/admin/dashboard");
  }

  // Comptes pour dashboard home
  const nbDemandes = serviceRequests.length; // Use length of already fetched data
  const nbNewsletters = newsletters.length; // Use length of already fetched data
  const nbClients = allUsers.length;      // Use length of already fetched data

  // Ajout récupération partenaires, news, témoignages
  const [partners, news, temoignages] = await Promise.all([
    prisma.partner ? prisma.partner.findMany({ orderBy: { createdAt: "desc" } }) : [],
    prisma.news ? prisma.news.findMany({ orderBy: { createdAt: "desc" } }) : [],
    prisma.temoignage ? prisma.temoignage.findMany({ orderBy: { createdAt: "desc" } }) : [],
  ]);

  // CRUD server actions pour témoignages
  async function addTemoignage(formData: FormData) {
    "use server";
    await prisma.temoignage.create({
      data: {
        nom: formData.get("nom") as string,
        message: formData.get("message") as string,
        photo: formData.get("photo") as string,
      },
    });
    revalidatePath("/admin/dashboard");
  }
  async function editTemoignage(formData: FormData) {
    "use server";
    await prisma.temoignage.update({
      where: { id: formData.get("id") as string },
      data: {
        nom: formData.get("nom") as string,
        message: formData.get("message") as string,
        photo: formData.get("photo") as string,
      },
    });
    revalidatePath("/admin/dashboard");
  }
  async function deleteTemoignage(formData: FormData) {
    "use server";
    await prisma.temoignage.delete({
      where: { id: formData.get("id") as string },
    });
    revalidatePath("/admin/dashboard");
  }

  // CRUD server actions pour news
  async function addNews(formData: FormData) {
    "use server";
    await prisma.news.create({
      data: {
        titre: formData.get("titre") as string,
        description: formData.get("description") as string,
        imageCover: formData.get("imageCover") as string,
        imageCart: formData.get("imageCart") as string,
      },
    });
    revalidatePath("/admin/dashboard");
  }
  async function editNews(formData: FormData) {
    "use server";
    await prisma.news.update({
      where: { id: formData.get("id") as string },
      data: {
        titre: formData.get("titre") as string,
        description: formData.get("description") as string,
        imageCover: formData.get("imageCover") as string,
        imageCart: formData.get("imageCart") as string,
      },
    });
    revalidatePath("/admin/dashboard");
  }
  async function deleteNews(formData: FormData) {
    "use server";
    await prisma.news.delete({
      where: { id: formData.get("id") as string },
    });
    revalidatePath("/admin/dashboard");
  }

  // CRUD server actions pour partenaires
  async function editPartner(formData: FormData) {
    "use server";
    await prisma.partner.update({
      where: { id: formData.get("id") as string },
      data: {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        logo: formData.get("logo") as string,
      },
    });
    revalidatePath("/admin/dashboard");
  }
  async function deletePartner(formData: FormData) {
    "use server";
    await prisma.partner.delete({
      where: { id: formData.get("id") as string },
    });
    revalidatePath("/admin/dashboard");
  }

  // Ajout récupération contacts home et footer
  const [contactsHome, contactsFooter] = await Promise.all([
    prisma.contactHome ? prisma.contactHome.findMany({ orderBy: { createdAt: "desc" } }) : [],
    prisma.contactFooter ? prisma.contactFooter.findMany({ orderBy: { createdAt: "desc" } }) : [],
  ]);

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar - Responsive */}
      <aside className="fixed top-0 left-0 h-full z-20 w-72 bg-white shadow-xl flex flex-col py-8 px-6 transform -translate-x-full md:translate-x-0 transition-transform duration-300 ease-in-out">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-10 text-center flex items-center justify-center gap-2">
          <Settings size={24} className="text-indigo-600" />
          <span className="hidden md:inline">Admin Panel</span>
        </h2>
        <nav className="flex-1">
          <ul className="space-y-1">
            { [
              { href: "#dashboard", icon: LayoutDashboard, label: "Tableau de bord" },
              { href: "#newsletters", icon: Mail, label: "Newsletters" },
              { href: "#rdvs", icon: ClipboardList, label: "Rendez-vous" },
              { href: "#services", icon: Briefcase, label: "Services & Packages" },
              { href: "#add-service", icon: PlusCircle, label: "Ajouter un service" },
              { href: "#clients", icon: Users, label: "Clients" },
              { href: "#contacts-home", icon: Mail, label: "Contacts Hero (Home)" },
              { href: "#contacts-footer", icon: Mail, label: "Contacts Footer" },
              { href: "#cta", icon: ClipboardList, label: "Bloc CTA" },
            ].map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="flex items-center gap-3 py-2.5 px-3 rounded-lg text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 font-medium transition-colors duration-150 text-sm md:text-base"
                >
                  <item.icon size={18} className="flex-shrink-0" />
                  <span className="hidden md:inline">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto pt-6 border-t border-slate-200">
          <Link
            href="/"
            className="mb-3 flex items-center justify-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 hover:underline transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="hidden md:inline">Retour au site</span>
          </Link>
          <Link
            href="/api/auth/signout"
            className="w-full flex items-center justify-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 px-4 py-2 rounded-md hover:bg-red-50 transition-colors duration-150"
          >
            <LogOut size={16} />
            <span className="hidden md:inline">Déconnexion</span>
          </Link>
        </div>
      </aside>

      {/* Main content - Responsive */}
      <main className="flex-1 p-4 md:p-6 lg:p-10 md:ml-72">
        {/* Dashboard Home Cards - Responsive */}
        <section id="dashboard" className="mb-8 md:mb-12">
           <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Tableau de bord</h1>
           <p className="text-sm md:text-base text-slate-600 mb-6 md:mb-8">Aperçu général de votre activité.</p>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              { title: "Demandes de service", count: nbDemandes, icon: ClipboardList, color: "indigo", href: "#rdvs", linkText: "Voir les demandes" },
              { title: "Inscrits Newsletter", count: nbNewsletters, icon: Mail, color: "emerald", href: "#newsletters", linkText: "Voir les inscrits" },
              { title: "Clients Enregistrés", count: nbClients, icon: Users, color: "sky", href: "#clients", linkText: "Voir les clients" },
            ].map((item) => (
              <div key={item.title} className={`bg-white rounded-xl shadow-lg p-4 md:p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-t-4 border-${item.color}-500`}>
                <div className="flex items-start justify-between">
                    <div>
                        <p className={`text-xs md:text-sm font-medium text-${item.color}-600`}>{item.title}</p>
                        <span className={`text-2xl md:text-3xl font-bold text-slate-800 mt-1 block`}>{item.count}</span>
                    </div>
                    <div className={`p-2 md:p-3 rounded-lg bg-${item.color}-100 text-${item.color}-600`}>
                        <item.icon size={20} className="md:w-6 md:h-6" />
                    </div>
                </div>
                <Link href={item.href} className={`mt-3 md:mt-4 text-xs text-${item.color}-600 hover:text-${item.color}-800 font-medium self-start`}>
                  {item.linkText} →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Tables - Responsive */}
        <div className="overflow-x-auto -mx-4 md:mx-0">
          <div className="inline-block min-w-full align-middle">
            {/* Newsletters Table */}
            <section id="newsletters" className="mb-8 md:mb-12">
              <h2 className="text-xl md:text-2xl font-semibold text-slate-700 mb-1">Newsletters</h2>
              <div className="border-b border-slate-200 mb-4 md:mb-5"></div>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                      <tr>
                        <th scope="col" className="py-3 px-3 md:px-5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Nom</th>
                        <th scope="col" className="py-3 px-3 md:px-5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
                        <th scope="col" className="py-3 px-3 md:px-5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date d'inscription</th>
                        <th scope="col" className="py-3 px-3 md:px-5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      {newsletters.map((n) => (
                        <tr key={n.id} className="hover:bg-slate-50 transition-colors duration-150">
                          <td className="py-3 px-3 md:px-5 text-sm text-slate-700 whitespace-nowrap">{n.name || '-'}</td>
                          <td className="py-3 px-3 md:px-5 text-sm text-slate-700 whitespace-nowrap">{n.email}</td>
                          <td className="py-3 px-3 md:px-5 text-sm text-slate-500 whitespace-nowrap">
                            {new Date(n.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-3 md:px-5">
                            <a
                              href={`mailto:${n.email}`}
                              className="inline-flex items-center px-2.5 py-1.5 text-xs bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 font-medium"
                            >
                              Contacter
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Rendez-vous Table */}
            <section id="rdvs" className="mb-8 md:mb-12">
              <h2 className="text-xl md:text-2xl font-semibold text-slate-700 mb-1">Rendez-vous & Demandes</h2>
              <div className="border-b border-slate-200 mb-4 md:mb-5"></div>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                      <tr>
                        <th scope="col" className="py-3 px-3 md:px-5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Client</th>
                        <th scope="col" className="py-3 px-3 md:px-5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
                        <th scope="col" className="py-3 px-3 md:px-5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Service</th>
                        <th scope="col" className="py-3 px-3 md:px-5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date RDV</th>
                        <th scope="col" className="py-3 px-3 md:px-5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Heure</th>
                        <th scope="col" className="py-3 px-3 md:px-5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                        <th scope="col" className="py-3 px-3 md:px-5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Message</th>
                        <th scope="col" className="py-3 px-3 md:px-5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      {rdvs.map((r) => (
                        <tr key={`rdv-${r.id}`} className="hover:bg-slate-50 transition-colors duration-150">
                          <td className="py-3 px-3 md:px-5 text-sm text-slate-700 whitespace-nowrap">{r.prenom} {r.nom}</td>
                          <td className="py-3 px-3 md:px-5 text-sm text-slate-700 whitespace-nowrap">{r.email}</td>
                          <td className="py-3 px-3 md:px-5 text-sm text-slate-500 whitespace-nowrap">-</td>
                          <td className="py-3 px-3 md:px-5 text-sm text-slate-500 whitespace-nowrap">{new Date(r.date).toLocaleDateString()}</td>
                          <td className="py-3 px-3 md:px-5 text-sm text-slate-500 whitespace-nowrap">{r.heure}</td>
                          <td className="py-3 px-3 md:px-5 text-sm text-slate-700 whitespace-nowrap">{r.typeMeet}</td>
                          <td className="py-3 px-3 md:px-5 text-sm text-slate-600 whitespace-normal max-w-xs truncate" title={r.message || ''}>{r.message || ''}</td>
                          <td className="py-3 px-3 md:px-5">
                            <a
                              href={`mailto:${r.email}`}
                              className="inline-flex items-center px-2.5 py-1.5 text-xs bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 font-medium"
                            >
                              Contacter
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Services Grid - Responsive */}
        <section id="services" className="mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-semibold text-slate-700 mb-1">Services & Packages</h2>
          <div className="border-b border-slate-200 mb-4 md:mb-5"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white p-4 md:p-6 rounded-xl shadow-lg flex flex-col h-full"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {service.color && (
                      <span
                        className="inline-block w-5 h-5 md:w-6 md:h-6 rounded-full border border-gray-200"
                        style={{ backgroundColor: service.color }}
                        title={service.color}
                      />
                    )}
                    <h3 className="text-lg md:text-xl font-semibold text-slate-800">{service.name}</h3>
                  </div>
                  <p className="text-xs md:text-sm text-slate-600 mb-1">{service.shortDesc}</p>
                  <p className="text-xs md:text-sm text-slate-500 mb-3">Prix: {service.price} €</p>
                  
                  {service.packages.length > 0 && (
                    <div className="mb-4">
                      <span className="font-medium text-slate-700 mb-1 text-xs md:text-sm block">Packages Inclus:</span>
                      <ul className="space-y-1">
                        {service.packages.map((pkg) => (
                          <li key={pkg.id} className="text-xs md:text-sm text-slate-600 flex items-start">
                            <Package size={14} className="mr-2 mt-0.5 text-emerald-500 flex-shrink-0" />
                            <div>
                                <span className="font-medium">{pkg.name}</span> ({pkg.price} €)
                                <span className="block text-xs text-slate-500">{pkg.description}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="mt-auto pt-4 border-t border-slate-200">
                  <h4 className="text-xs md:text-sm font-medium text-slate-600 mb-2">Ajouter un package</h4>
                  <form action={addPackage} className="space-y-2 md:space-y-3">
                    <input type="hidden" name="serviceId" value={service.id} />
                    <div>
                      <input
                        name="packageName"
                        placeholder="Nom du package"
                        className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-xs md:text-sm py-2 px-3 placeholder-slate-400"
                        required
                      />
                    </div>
                    <div>
                      <input
                        name="packageDescription"
                        placeholder="Description"
                        className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-xs md:text-sm py-2 px-3 placeholder-slate-400"
                        required
                      />
                    </div>
                    <div>
                      <input
                        name="packagePrice"
                        type="number"
                        step="0.01"
                        placeholder="Prix (€)"
                        className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-xs md:text-sm py-2 px-3 placeholder-slate-400"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center px-3 py-2 border border-transparent text-xs md:text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
                    >
                      <PlusCircle size={16} className="mr-2"/> Ajouter Package
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Formulaire d'ajout de service */}
        <section id="add-service" className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-700 mb-1">Ajouter un nouveau service</h2>
          <div className="border-b border-slate-200 mb-5"></div>
          <form
            action={addService}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 bg-white p-6 rounded-xl shadow-lg"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Nom du service</label>
              <input id="name" name="name" placeholder="Ex: Consultation SEO" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3.5 placeholder-slate-400" required />
            </div>
            <div>
              <label htmlFor="shortDesc" className="block text-sm font-medium text-slate-700 mb-1">Description courte</label>
              <input id="shortDesc" name="shortDesc" placeholder="Un résumé accrocheur" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3.5 placeholder-slate-400" required />
            </div>
            <div>
              <label htmlFor="icon" className="block text-sm font-medium text-slate-700 mb-1">Icône (nom Lucide)</label>
              <input id="icon" name="icon" placeholder="Ex: BarChartBig" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3.5 placeholder-slate-400" />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-slate-700 mb-1">Prix (€)</label>
              <input id="price" name="price" type="number" step="0.01" placeholder="Ex: 99.90" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3.5 placeholder-slate-400" required />
            </div>
            <div>
              <label htmlFor="color" className="block text-sm font-medium text-slate-700 mb-1">Couleur (hex ou nom Tailwind)</label>
              <input
                id="color"
                name="color"
                placeholder="#6863BF ou bg-brand-p1-c1"
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3.5 placeholder-slate-400"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="detailedDesc" className="block text-sm font-medium text-slate-700 mb-1">Description détaillée</label>
              <textarea id="detailedDesc" name="detailedDesc" rows={4} placeholder="Décrivez le service en détail..." className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3.5 placeholder-slate-400" required />
            </div>
             <div>
              <label htmlFor="coverImage" className="block text-sm font-medium text-slate-700 mb-1">URL Image de couverture</label>
              <input id="coverImage" name="coverImage" placeholder="https://example.com/image.jpg" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3.5 placeholder-slate-400" />
            </div>

            <div className="md:col-span-2 flex justify-end mt-4">
              <button
                type="submit"
                className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Ajouter le Service
              </button>
            </div>
          </form>
        </section>

        {/* Section clients */}
        <section id="clients" className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-700 mb-1">Clients</h2>
          <div className="border-b border-slate-200 mb-5"></div>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="py-3 px-5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Nom</th>
                    <th className="py-3 px-5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
                    <th className="py-3 px-5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date d'inscription</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {allUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50 transition-colors duration-150">
                      <td className="py-4 px-5 text-sm text-slate-700 whitespace-nowrap">{u.name || 'N/A'}</td>
                      <td className="py-4 px-5 text-sm text-slate-700 whitespace-nowrap">{u.email}</td>
                      <td className="py-4 px-5 text-sm text-slate-500 whitespace-nowrap">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                      <td>
                        <a
                          href={`mailto:${u.email}`}
                          className="inline-flex items-center px-3 py-1 text-xs bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 font-medium"
                        >
                          Contacter
                        </a>
                      </td>
                    </tr>
                  ))}
                  {allUsers.length === 0 && (
                    <tr><td colSpan={4} className="py-4 px-5 text-sm text-slate-500 text-center">Aucun client enregistré.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section Témoignages */}
        <section id="temoignages" className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-700 mb-1 flex items-center gap-2">
            <span>🗣️</span> Témoignages
          </h2>
          <div className="border-b border-slate-200 mb-5"></div>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-4">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="py-3 px-5 text-left text-xs font-medium text-slate-500 uppercase">Photo</th>
                    <th className="py-3 px-5 text-left text-xs font-medium text-slate-500 uppercase">Nom</th>
                    <th className="py-3 px-5 text-left text-xs font-medium text-slate-500 uppercase">Message</th>
                    <th className="py-3 px-5 text-left text-xs font-medium text-slate-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {temoignages.length > 0 ? temoignages.map((t) => (
                    <tr key={t.id}>
                      <td className="py-4 px-5">
                        {t.photo ? (
                          <div className="relative w-12 h-12">
                            <Image
                              src={t.photo}
                              alt={t.nom}
                              fill
                              className="rounded-full object-cover"
                              unoptimized={t.photo.startsWith('http')}
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">-</div>
                        )}
                      </td>
                      <td className="py-4 px-5">{t.nom}</td>
                      <td className="py-4 px-5">{t.message}</td>
                      <td className="py-4 px-5">
                        <details>
                          <summary className="cursor-pointer text-xs text-indigo-600 hover:underline">Modifier</summary>
                          <form action={editTemoignage} className="flex flex-col gap-1 mt-1">
                            <input type="hidden" name="id" value={t.id} />
                            <input name="nom" defaultValue={t.nom} className="border px-2 py-1 rounded w-full" />
                            <input name="photo" defaultValue={t.photo || ""} className="border px-2 py-1 rounded w-full" />
                            <textarea name="message" defaultValue={t.message} className="border px-2 py-1 rounded w-full" />
                            <button type="submit" className="bg-indigo-600 text-white px-2 py-1 rounded text-xs">Enregistrer</button>
                          </form>
                        </details>
                        <form action={deleteTemoignage} method="post" className="inline">
                          <input type="hidden" name="id" value={t.id} />
                          <button type="submit" className="text-xs text-red-600 hover:underline ml-2">Supprimer</button>
                        </form>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={4} className="py-4 px-5 text-sm text-slate-500 text-center">
                        Aucun témoignage enregistré.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <form action={addTemoignage} className="flex flex-col md:flex-row gap-3 items-end">
            <input name="nom" placeholder="Nom" className="rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 placeholder-slate-400" required />
            <input name="photo" placeholder="URL photo" className="rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 placeholder-slate-400" />
            <input name="message" placeholder="Message" className="rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 placeholder-slate-400" required />
            <button type="submit" className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
              <PlusCircle size={18} /> Ajouter témoignage
            </button>
          </form>
        </section>

        {/* Section Nos partenaires */}
        <section id="partners" className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-700 mb-1 flex items-center gap-2">
            <Handshake size={22} className="text-indigo-500" />
            Nos partenaires
          </h2>
          <div className="border-b border-slate-200 mb-5"></div>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-4">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="py-3 px-5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Logo</th>
                    <th className="py-3 px-5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Nom</th>
                    <th className="py-3 px-5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
                    <th className="py-3 px-5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date d'ajout</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {partners && partners.length > 0 ? partners.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50 transition-colors duration-150">
                      <td className="py-4 px-5 text-sm text-slate-700 whitespace-nowrap">
                        {p.logo ? (
                          <Image
                            src={p.logo.startsWith("http") ? p.logo : (p.logo.startsWith("/") ? p.logo : `/uploads/${p.logo}`)}
                            alt={p.name || "Logo"}
                            width={48}
                            height={48}
                            className="rounded-md bg-slate-100 object-contain"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-md bg-slate-100 flex items-center justify-center text-slate-400">
                            <span className="text-xs">Aucun</span>
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-5 text-sm text-slate-700 whitespace-nowrap">{p.name || '-'}</td>
                      <td className="py-4 px-5 text-sm text-slate-700 whitespace-nowrap">{p.email || '-'}</td>
                      <td className="py-4 px-5 text-sm text-slate-500 whitespace-nowrap">
                        {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : '-'}
                      </td>
                      <td className="py-4 px-5">
                        <details>
                          <summary className="cursor-pointer text-xs text-indigo-600 hover:underline">Modifier</summary>
                          <form action={editPartner} className="flex flex-col gap-1 mt-1">
                            <input type="hidden" name="id" value={p.id} />
                            <input name="name" defaultValue={p.name} className="border px-2 py-1 rounded w-full" />
                            <input name="email" defaultValue={p.email || ""} className="border px-2 py-1 rounded w-full" />
                            <input name="logo" defaultValue={p.logo || ""} className="border px-2 py-1 rounded w-full" />
                            <button type="submit" className="bg-indigo-600 text-white px-2 py-1 rounded text-xs">Enregistrer</button>
                          </form>
                        </details>
                        <form action={deletePartner} method="post" className="inline">
                          <input type="hidden" name="id" value={p.id} />
                          <button type="submit" className="text-xs text-red-600 hover:underline ml-2">Supprimer</button>
                        </form>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={4} className="py-4 px-5 text-sm text-slate-500 text-center">
                        Aucun partenaire enregistré.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <form
            action={async (formData: FormData) => {
              "use server";
              await prisma.partner.create({
                data: {
                  name: formData.get("name") as string,
                  email: formData.get("email") as string,
                  logo: formData.get("logo") as string,
                },
              });
              revalidatePath("/admin/dashboard");
            }}
            className="flex flex-col md:flex-row gap-3 items-end"
          >
            <input
              name="name"
              placeholder="Nom du partenaire"
              className="rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 placeholder-slate-400"
              required
            />
            <input
              name="email"
              placeholder="Email du partenaire"
              className="rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 placeholder-slate-400"
              type="email"
            />
            <input
              name="logo"
              placeholder="URL du logo (ex: /assets/partenaire/logo.png ou https://...)"
              className="rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 placeholder-slate-400"
              type="text"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              <PlusCircle size={18} /> Ajouter partenaire
            </button>
          </form>
        </section>

        {/* Section Actualités */}
        <section id="news" className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-700 mb-1 flex items-center gap-2">
            <Newspaper size={22} className="text-indigo-500" />
            Actualités
          </h2>
          <div className="border-b border-slate-200 mb-5"></div>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-4">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="py-3 px-5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Titre</th>
                    <th className="py-3 px-5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                    <th className="py-3 px-5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {news && news.length > 0 ? news.map((n) => (
                    <tr key={n.id} className="hover:bg-slate-50 transition-colors duration-150">
                      <td className="py-4 px-5 text-sm text-slate-700 whitespace-nowrap">{n.titre || '-'}</td>
                      <td className="py-4 px-5 text-sm text-slate-500 whitespace-nowrap">
                        {n.createdAt ? new Date(n.createdAt).toLocaleDateString() : '-'}
                      </td>
                      <td className="py-4 px-5">
                        <details>
                          <summary className="cursor-pointer text-xs text-indigo-600 hover:underline">Modifier</summary>
                          <form action={editNews} className="flex flex-col gap-1 mt-1">
                            <input type="hidden" name="id" value={n.id} />
                            <input name="titre" defaultValue={n.titre} className="border px-2 py-1 rounded w-full" />
                            <input name="imageCover" defaultValue={n.imageCover || ""} className="border px-2 py-1 rounded w-full" />
                            <input name="imageCart" defaultValue={n.imageCart || ""} className="border px-2 py-1 rounded w-full" />
                            <textarea name="description" defaultValue={n.description} className="border px-2 py-1 rounded w-full" />
                            <button type="submit" className="bg-indigo-600 text-white px-2 py-1 rounded text-xs">Enregistrer</button>
                          </form>
                        </details>
                        <form action={deleteNews} method="post" className="inline">
                          <input type="hidden" name="id" value={n.id} />
                          <button type="submit" className="text-xs text-red-600 hover:underline ml-2">Supprimer</button>
                        </form>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={3} className="py-4 px-5 text-sm text-slate-500 text-center">
                        Aucune actualité enregistrée.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-end">
            <Link
              href="http://localhost:3000/admin/news/create"
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              <PlusCircle size={18} /> Ajouter une actualité
            </Link>
          </div>
        </section>

        {/* Section Contacts Home */}
        <section id="contacts-home" className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-700 mb-1">Contacts Hero (Home)</h2>
          <div className="border-b border-slate-200 mb-5"></div>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-4">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="py-3 px-5 text-left text-xs font-medium text-slate-500 uppercase">Nom</th>
                    <th className="py-3 px-5 text-left text-xs font-medium text-slate-500 uppercase">Prénom</th>
                    <th className="py-3 px-5 text-left text-xs font-medium text-slate-500 uppercase">Email</th>
                    <th className="py-3 px-5 text-left text-xs font-medium text-slate-500 uppercase">Téléphone</th>
                    <th className="py-3 px-5 text-left text-xs font-medium text-slate-500 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {contactsHome.length > 0 ? contactsHome.map((c) => (
                    <tr key={c.id}>
                      <td className="py-4 px-5">{c.nom}</td>
                      <td className="py-4 px-5">{c.prenom}</td>
                      <td className="py-4 px-5">{c.email}</td>
                      <td className="py-4 px-5">{c.telephone}</td>
                      <td className="py-4 px-5">{c.createdAt ? new Date(c.createdAt).toLocaleString() : '-'}</td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={5} className="py-4 px-5 text-sm text-slate-500 text-center">
                        Aucun contact enregistré.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section Contacts Footer */}
        <section id="contacts-footer" className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-700 mb-1">Contacts Footer</h2>
          <div className="border-b border-slate-200 mb-5"></div>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-4">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="py-3 px-5 text-left text-xs font-medium text-slate-500 uppercase">Nom</th>
                    <th className="py-3 px-5 text-left text-xs font-medium text-slate-500 uppercase">Prénom</th>
                    <th className="py-3 px-5 text-left text-xs font-medium text-slate-500 uppercase">Email</th>
                    <th className="py-3 px-5 text-left text-xs font-medium text-slate-500 uppercase">Téléphone</th>
                    <th className="py-3 px-5 text-left text-xs font-medium text-slate-500 uppercase">Message</th>
                    <th className="py-3 px-5 text-left text-xs font-medium text-slate-500 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {contactsFooter.length > 0 ? contactsFooter.map((c) => (
                    <tr key={c.id}>
                      <td className="py-4 px-5">{c.nom}</td>
                      <td className="py-4 px-5">{c.prenom}</td>
                      <td className="py-4 px-5">{c.email}</td>
                      <td className="py-4 px-5">{c.phone}</td>
                      <td className="py-4 px-5">{c.message}</td>
                      <td className="py-4 px-5">{c.createdAt ? new Date(c.createdAt).toLocaleString() : '-'}</td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={6} className="py-4 px-5 text-sm text-slate-500 text-center">
                        Aucun contact enregistré.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section CTA */}
        <section id="cta" className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-700 mb-1">Bloc CTA</h2>
          <div className="border-b border-slate-200 mb-5"></div>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-4">
            <div className="p-8 flex justify-center">
              <div className="w-full max-w-2xl">
                <span className="text-slate-500">Bloc CTA à intégrer ici (voir composant BlocCta).</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}