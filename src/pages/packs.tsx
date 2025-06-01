import { useEffect, useState } from "react";

type Pack = {
  id: number;
  name: string;
  description?: string;
  price: number;
};

export default function PacksPage() {
  const [packs, setPacks] = useState<Pack[]>([]);
  const [form, setForm] = useState({ name: "", description: "", price: "" });
  const [editingId, setEditingId] = useState<number | null>(null);

  // Fetch packs
  useEffect(() => {
    fetch("/api/packs")
      .then(res => res.json())
      .then(setPacks);
  }, []);

  // Handle form input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create or update pack
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await fetch("/api/packs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingId, ...form, price: Number(form.price) }),
      });
      setEditingId(null);
    } else {
      await fetch("/api/packs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, price: Number(form.price) }),
      });
    }
    setForm({ name: "", description: "", price: "" });
    fetch("/api/packs").then(res => res.json()).then(setPacks);
  };

  // Delete pack
  const handleDelete = async (id: number) => {
    await fetch("/api/packs", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetch("/api/packs").then(res => res.json()).then(setPacks);
  };

  // Edit pack
  const handleEdit = (pack: Pack) => {
    setForm({ name: pack.name, description: pack.description || "", price: String(pack.price) });
    setEditingId(pack.id);
  };

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h1>Packs</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          name="price"
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={handleChange}
          required
        />
        <button type="submit">{editingId ? "Update" : "Create"}</button>
        {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ name: "", description: "", price: "" }); }}>Cancel</button>}
      </form>
      <ul>
        {packs.map(pack => (
          <li key={pack.id} style={{ marginBottom: 12 }}>
            <b>{pack.name}</b> - {pack.description} - ${pack.price}
            <button onClick={() => handleEdit(pack)} style={{ marginLeft: 8 }}>Edit</button>
            <button onClick={() => handleDelete(pack.id)} style={{ marginLeft: 8 }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
