"use client";
import React, { useState, FormEvent } from "react";
import Header from "../components/header_main";
import Footer from "../components/home/footer";

export default function RdvForm() {
  const [form, setForm] = useState({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    message: "",
    date: "",
    heure: "",
    typeMeet: "en ligne",
  });
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);
    try {
      const res = await fetch("/api/rdv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur serveur");
      setFeedback("Votre RDV a bien été enregistré !");
      setForm({
        prenom: "",
        nom: "",
        email: "",
        telephone: "",
        message: "",
        date: "",
        heure: "",
        typeMeet: "en ligne",
      });
    } catch (error: any) {
      setFeedback(error.message || "Erreur lors de l'envoi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto mt-10 bg-white rounded-2xl shadow-lg border border-blue-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Colonne gauche : formulaire */}
          <form
            onSubmit={handleSubmit}
            className="p-8 flex flex-col gap-6"
          >
            <h2 className="text-3xl font-bold text-blue-900 mb-2 text-center font-montserrat">
              Prendre un rendez-vous
            </h2>
            {feedback && (
              <div
                className={`mb-2 text-center rounded-lg px-4 py-2 ${
                  feedback.includes("enregistré")
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {feedback}
              </div>
            )}

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-base font-semibold text-blue-900 mb-1 font-montserrat">
                  Prénom <span className="text-rose-600">*</span>
                </label>
                <input
                  name="prenom"
                  placeholder="Prénom"
                  value={form.prenom}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-blue-200 px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none font-montserrat"
                />
              </div>
              <div className="flex-1">
                <label className="block text-base font-semibold text-blue-900 mb-1 font-montserrat">
                  Nom <span className="text-rose-600">*</span>
                </label>
                <input
                  name="nom"
                  placeholder="Nom"
                  value={form.nom}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-blue-200 px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none font-montserrat"
                />
              </div>
            </div>

            <div>
              <label className="block text-base font-semibold text-blue-900 mb-1 font-montserrat">
                Email <span className="text-rose-600">*</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-blue-200 px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none font-montserrat"
              />
            </div>

            <div>
              <label className="block text-base font-semibold text-blue-900 mb-1 font-montserrat">
                Téléphone
              </label>
              <input
                name="telephone"
                placeholder="Téléphone"
                value={form.telephone}
                onChange={handleChange}
                className="w-full rounded-xl border border-blue-200 px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none font-montserrat"
              />
            </div>

            <div>
              <label className="block text-base font-semibold text-blue-900 mb-1 font-montserrat">
                Message
              </label>
              <textarea
                name="message"
                placeholder="Message"
                value={form.message}
                onChange={handleChange}
                className="w-full rounded-xl border border-blue-200 px-4 py-3 min-h-[80px] focus:ring-2 focus:ring-blue-400 outline-none font-montserrat"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-base font-semibold text-blue-900 mb-1 font-montserrat">
                  Date <span className="text-rose-600">*</span>
                </label>
                <input
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-blue-200 px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none font-montserrat"
                />
              </div>
              <div className="flex-1">
                <label className="block text-base font-semibold text-blue-900 mb-1 font-montserrat">
                  Heure <span className="text-rose-600">*</span>
                </label>
                <input
                  name="heure"
                  type="time"
                  value={form.heure}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-blue-200 px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none font-montserrat"
                />
              </div>
            </div>

            <div>
              <label className="block text-base font-semibold text-blue-900 mb-1 font-montserrat">
                Type de rendez-vous <span className="text-rose-600">*</span>
              </label>
              <select
                name="typeMeet"
                value={form.typeMeet}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-blue-200 px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none font-montserrat"
              >
                <option value="en ligne">En ligne</option>
                <option value="physique">Physique</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-lg transition-colors duration-200 disabled:bg-gray-400 font-montserrat"
            >
              {isSubmitting ? "Envoi..." : "Prendre RDV"}
            </button>
          </form>
          {/* Colonne droite : illustration ou informations */}
          <div className="hidden md:flex flex-col justify-center items-center bg-blue-50 rounded-r-2xl p-8">
            <h3 className="text-2xl font-bold text-blue-800 mb-4 font-montserrat">Pourquoi prendre RDV ?</h3>
            <ul className="text-blue-900 space-y-3 text-base font-montserrat">
              <li>✔️ Conseil personnalisé</li>
              <li>✔️ Échange rapide avec un expert</li>
              <li>✔️ Suivi de votre demande</li>
            </ul>
            {/* Ajoute ici une image illustrative si tu veux */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
