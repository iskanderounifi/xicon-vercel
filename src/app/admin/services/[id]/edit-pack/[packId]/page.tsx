// Make sure this file contains only valid React component code as shown below.
// If your project is not running, double-check that:
// 1. This file does not contain any .env or config content.
// 2. The folder name is consistent with your other dynamic routes (use [serviceId] instead of [id] if needed).

"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditPackPage() {
  const router = useRouter();
  const params = useParams();
  const packId = params?.packId as string;

  const [form, setForm] = useState({ name: "", description: "", price: "" });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    // Fetch pack data
    fetch(`/api/packs?id=${packId}`)
      .then(res => res.json())
      .then(data => {
        setForm({
          name: data.name || "",
          description: data.description || "",
          price: data.price?.toString() || "",
        });
        setLoading(false);
      });
  }, [packId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    const res = await fetch("/api/packs", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: packId,
        ...form,
        price: Number(form.price),
      }),
    });
    if (res.ok) {
      setMessage("Pack updated!");
    } else {
      setMessage("Failed to update pack.");
    }
  };

  const handleDelete = async () => {
    setMessage(null);
    const res = await fetch("/api/packs", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: packId }),
    });
    if (res.ok) {
      setMessage("Pack deleted!");
      setTimeout(() => {
        router.push("/dashboard/admin");
      }, 1000);
    } else {
      setMessage("Failed to delete pack.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: 500, margin: "2rem auto" }}>
      <h2 className="text-xl font-bold mb-4">Edit Pack</h2>
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
          Update Pack
        </button>
        <button
          type="button"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 ml-2"
          onClick={handleDelete}
        >
          Delete Pack
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