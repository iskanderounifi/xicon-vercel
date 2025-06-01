"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function AddPacksPage() {
  const router = useRouter();
  const params = useParams();
  const serviceId = params?.id as string;
  const [form, setForm] = useState({ name: "", description: "", price: "" });
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    const res = await fetch("/api/packs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        serviceId,
      }),
    });
    if (res.ok) {
      setMessage("Pack added!");
      setForm({ name: "", description: "", price: "" });
    } else {
      setMessage("Failed to add pack.");
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "2rem auto" }}>
      <h2 className="text-xl font-bold mb-4">Add Pack for Service</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Pack Name"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          required
          className="w-full border rounded px-2 py-1"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
          required
          className="w-full border rounded px-2 py-1"
        />
        <input
          name="price"
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
          required
          className="w-full border rounded px-2 py-1"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Pack
        </button>
        {message && <div className="mt-2 text-blue-700">{message}</div>}
      </form>
      <button
        className="mt-4 underline text-blue-600"
        onClick={() => router.push("/dashboard/admin")}
      >
        ← Back to Admin Dashboard
      </button>
    </div>
  );
}
