import { useEffect, useState } from "react"

type Package = {
  id: string
  name: string
  description: string
  price: number
  serviceId: string
}

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([])
  const [form, setForm] = useState<Partial<Package>>({})
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/packages").then(res => res.json()).then(setPackages)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      await fetch("/api/packages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingId, ...form, price: Number(form.price) }),
      })
      setEditingId(null)
    } else {
      await fetch("/api/packages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, price: Number(form.price) }),
      })
    }
    setForm({})
    fetch("/api/packages").then(res => res.json()).then(setPackages)
  }

  const handleDelete = async (id: string) => {
    await fetch("/api/packages", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
    fetch("/api/packages").then(res => res.json()).then(setPackages)
  }

  const handleEdit = (pack: Package) => {
    setForm(pack)
    setEditingId(pack.id)
  }

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h1>Packages</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
        <input name="name" placeholder="Name" value={form.name || ""} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={form.description || ""} onChange={handleChange} required />
        <input name="price" placeholder="Price" type="number" value={form.price || ""} onChange={handleChange} required />
        <input name="serviceId" placeholder="Service ID" value={form.serviceId || ""} onChange={handleChange} required />
        <button type="submit">{editingId ? "Update" : "Create"}</button>
        {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({}) }}>Cancel</button>}
      </form>
      <ul>
        {packages.map(pack => (
          <li key={pack.id} style={{ marginBottom: 12 }}>
            <b>{pack.name}</b> - {pack.description} - ${pack.price} (Service: {pack.serviceId})
            <button onClick={() => handleEdit(pack)} style={{ marginLeft: 8 }}>Edit</button>
            <button onClick={() => handleDelete(pack.id)} style={{ marginLeft: 8 }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
