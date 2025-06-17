"use client";
import { PlusCircle, ArrowLeft } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function NewsCreatePage() {
  const [imageUrl, setImageUrl] = useState("");
  const [imageCart, setImageCart] = useState("");

  // Nouvelle fonction de soumission côté client
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const titre = formData.get("titre");
    const description = formData.get("description");
    const imageCover = formData.get("imageCover");
    const imageCartValue = formData.get("imageCart");
    await fetch("/api/news", {
      method: "POST",
      body: JSON.stringify({ titre, description, imageCover, imageCart: imageCartValue }),
      headers: { "Content-Type": "application/json" },
    });
    // Optionnel: reset form or redirect
    setImageUrl("");
    setImageCart("");
    e.currentTarget.reset();
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <PlusCircle className="text-indigo-600" /> Ajouter une actualité
        </h1>
        <Link
          href="/admin/dashboard"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition-colors"
        >
          <ArrowLeft size={18} />
          Retour au dashboard
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Titre</label>
            <input 
              name="titre" 
              className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea 
              name="description" 
              className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
              rows={4} 
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Image de couverture (URL Cloudinary)</label>
            <input
              name="imageCover"
              className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
              placeholder="https://res.cloudinary.com/..."
            />
            {imageUrl && (
              <div className="mt-2">
                <img
                  src={imageUrl}
                  alt="Aperçu"
                  className="max-h-40 rounded-lg border border-slate-200"
                  style={{ maxWidth: "100%" }}
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Image Cart (URL Cloudinary)</label>
            <input
              name="imageCart"
              className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              value={imageCart}
              onChange={e => setImageCart(e.target.value)}
              placeholder="https://res.cloudinary.com/..."
            />
            {imageCart && (
              <div className="mt-2">
                <img
                  src={imageCart}
                  alt="Aperçu Cart"
                  className="max-h-40 rounded-lg border border-slate-200"
                  style={{ maxWidth: "100%" }}
                />
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button 
              type="submit" 
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              <PlusCircle size={18} />
              Ajouter l'actualité
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
