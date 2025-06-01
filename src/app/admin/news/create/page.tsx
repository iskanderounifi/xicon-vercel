"use client";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

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
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <PlusCircle /> Ajouter une actualité
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Titre</label>
          <input name="titre" className="w-full border rounded px-3 py-2" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Description</label>
          <textarea name="description" className="w-full border rounded px-3 py-2" rows={4} required />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Image (URL Cloudinary)</label>
          <input
            name="imageCover"
            className="w-full border rounded px-3 py-2"
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
            placeholder="https://res.cloudinary.com/..."
          />
          {imageUrl && (
            <div className="mt-2">
              <img
                src={imageUrl}
                alt="Aperçu"
                className="max-h-40 rounded border"
                style={{ maxWidth: "100%" }}
              />
            </div>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Image Cart (URL Cloudinary)</label>
          <input
            name="imageCart"
            className="w-full border rounded px-3 py-2"
            value={imageCart}
            onChange={e => setImageCart(e.target.value)}
            placeholder="https://res.cloudinary.com/..."
          />
          {imageCart && (
            <div className="mt-2">
              <img
                src={imageCart}
                alt="Aperçu Cart"
                className="max-h-40 rounded border"
                style={{ maxWidth: "100%" }}
              />
            </div>
          )}
        </div>
        <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700">
          Ajouter
        </button>
      </form>
    </div>
  );
}
