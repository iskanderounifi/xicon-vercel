import { useEffect, useState } from "react"

type Service = {
  id: string
  name: string
  shortDesc: string
  icon: string
  detailedDesc: string
  price: number
  coverImage: string
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [form, setForm] = useState<Partial<Service>>({})
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/services").then(res => res.json()).then(setServices)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      await fetch("/api/services", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingId, ...form, price: Number(form.price) }),
      })
      setEditingId(null)
    } else {
      await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, price: Number(form.price) }),
      })
    }
    setForm({})
    fetch("/api/services").then(res => res.json()).then(setServices)
  }

  const handleDelete = async (id: string) => {
    await fetch("/api/services", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
    fetch("/api/services").then(res => res.json()).then(setServices)
  }

  const handleEdit = (service: Service) => {
    setForm(service)
    setEditingId(service.id)
  }

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h1>Services</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
        <input name="name" placeholder="Name" value={form.name || ""} onChange={handleChange} required />
        <input name="shortDesc" placeholder="Short Desc" value={form.shortDesc || ""} onChange={handleChange} required />
        <input name="icon" placeholder="Icon" value={form.icon || ""} onChange={handleChange} required />
        <textarea name="detailedDesc" placeholder="Detailed Desc" value={form.detailedDesc || ""} onChange={handleChange} required />
        <input name="price" placeholder="Price" type="number" value={form.price || ""} onChange={handleChange} required />
        <input name="coverImage" placeholder="Cover Image" value={form.coverImage || ""} onChange={handleChange} required />
        <button type="submit">{editingId ? "Update" : "Create"}</button>
        {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({}) }}>Cancel</button>}
      </form>
      <ul>
        {services.map(service => (
          <li key={service.id} style={{ marginBottom: 12 }}>
            <b>{service.name}</b> - {service.shortDesc} - ${service.price}
            <button onClick={() => handleEdit(service)} style={{ marginLeft: 8 }}>Edit</button>
            <button onClick={() => handleDelete(service.id)} style={{ marginLeft: 8 }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
