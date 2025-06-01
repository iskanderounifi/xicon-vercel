"use client";
import React, { useState } from "react";

type Service = {
  id: string;
  name: string;
  shortDesc: string;
};

export default function ServiceRequestForm({
  services,
  userId,
}: {
  services: Service[];
  userId: string;
}) {
  const [selected, setSelected] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleDemande = async () => {
    setIsSubmitting(true);
    setFeedback(null);
    try {
      const res = await fetch("/api/demande", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, services: selected }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur serveur");
      setFeedback("Votre demande a bien été envoyée !");
      setSelected([]);
    } catch (error: any) {
      setFeedback(error.message || "Erreur lors de l'envoi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {feedback && <div className="mb-4 text-center">{feedback}</div>}
      <ul className="space-y-4">
        {services.map((service) => (
          <li key={service.id} className="flex items-center gap-4 border-b pb-2">
            <input
              type="checkbox"
              checked={selected.includes(service.id)}
              onChange={() => handleSelect(service.id)}
              className="accent-blue-700"
            />
            <div>
              <div className="font-semibold">{service.name}</div>
              <div className="text-sm text-gray-500">{service.shortDesc}</div>
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={handleDemande}
        disabled={selected.length === 0 || isSubmitting}
        className="mt-6 w-full bg-blue-700 text-white rounded p-2 disabled:bg-gray-400"
      >
        {isSubmitting ? "Envoi..." : "Envoyer ma demande"}
      </button>
    </div>
  );
}
