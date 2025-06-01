"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function EntrepriseForm({ userId }: { userId?: string }) {
  const [form, setForm] = useState({
    nom: "",
    emailPro: "",
    telephone: "",
    mf: "",
    adresse: "",
    siteweb: "",
    service: "",
    description: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Correction : vérifie que userId est bien une string non vide
    if (!userId || typeof userId !== "string" || userId.trim() === "") {
      setError("Impossible de récupérer l'utilisateur connecté.");
      return;
    }

    try {
      const res = await fetch("/api/entreprise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, userId }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erreur lors de l'enregistrement.");
        return;
      }
      setSuccess(true);
      setTimeout(() => {
        router.push("/services");
      }, 1200);
    } catch (err) {
      setError("Erreur réseau ou serveur.");
    }
  }

  return (
    <form
      className="bg-white rounded-xl shadow p-6 mb-8 max-w-2xl mx-auto"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-bold mb-4 text-blue-700">
        Informations sur votre entreprise
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Nom entreprise
          </label>
          <input
            className="w-full border rounded px-3 py-2"
            value={form.nom}
            onChange={(e) => setForm((f) => ({ ...f, nom: e.target.value }))}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Email professionnel
          </label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2"
            value={form.emailPro}
            onChange={(e) =>
              setForm((f) => ({ ...f, emailPro: e.target.value }))
            }
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Téléphone WhatsApp
          </label>
          <input
            className="w-full border rounded px-3 py-2"
            value={form.telephone}
            onChange={(e) =>
              setForm((f) => ({ ...f, telephone: e.target.value }))
            }
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Matricule Fiscale (MF)
          </label>
          <input
            className="w-full border rounded px-3 py-2"
            value={form.mf}
            onChange={(e) => setForm((f) => ({ ...f, mf: e.target.value }))}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Adresse</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={form.adresse}
            onChange={(e) =>
              setForm((f) => ({ ...f, adresse: e.target.value }))
            }
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Site web</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={form.siteweb}
            onChange={(e) =>
              setForm((f) => ({ ...f, siteweb: e.target.value }))
            }
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Service</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={form.service}
            onChange={(e) =>
              setForm((f) => ({ ...f, service: e.target.value }))
            }
            required
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            value={form.description}
            onChange={(e) =>
              setForm((f) => ({ ...f, description: e.target.value }))
            }
            rows={3}
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Enregistrer
      </button>
      {success && (
        <div className="mt-3 text-green-600 font-medium">
          Informations enregistrées avec succès ! Redirection...
        </div>
      )}
      {error && (
        <div className="mt-3 text-red-600 font-medium">{error}</div>
      )}
    </form>
  );
}
