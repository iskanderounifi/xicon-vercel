"use client";
import React, { useEffect, useState } from "react";
import { News } from "../../models/news";
import Link from "next/link";

const API_URL = "/api/news";

export default function DashboardNewsPage() {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [form, setForm] = useState<Partial<News>>({});
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(setNewsList);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await fetch(API_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: editingId }),
      });
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    setForm({});
    setEditingId(null);
    fetch(API_URL).then(res => res.json()).then(setNewsList);
  };

  const handleEdit = (news: News) => {
    setForm(news);
    setEditingId(news.id);
  };

  const handleDelete = async (id: string) => {
    await fetch(API_URL, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetch(API_URL).then(res => res.json()).then(setNewsList);
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ marginBottom: 0 }}>Gestion des News</h1>
        <Link href="/dashboard">
          <button style={{ padding: "6px 16px", background: "#eee", border: "none", borderRadius: 4, cursor: "pointer" }}>
            Retour Dashboard
          </button>
        </Link>
      </div>
      <form onSubmit={handleSubmit} style={{ background: "#fafafa", padding: 16, borderRadius: 8, margin: "24px 0" }}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <input
            name="titre"
            placeholder="Titre"
            value={form.titre || ""}
            onChange={handleChange}
            required
            style={{ flex: 1, minWidth: 180, padding: 8 }}
          />
          <input
            name="imageCover"
            placeholder="Image Cover URL"
            value={form.imageCover || ""}
            onChange={handleChange}
            required
            style={{ flex: 1, minWidth: 180, padding: 8 }}
          />
          <input
            name="imageCart"
            placeholder="Image Cart URL"
            value={form.imageCart || ""}
            onChange={handleChange}
            required
            style={{ flex: 1, minWidth: 180, padding: 8 }}
          />
        </div>
        <textarea
          name="description"
          placeholder="Description"
          value={form.description || ""}
          onChange={handleChange}
          required
          style={{ width: "100%", marginTop: 12, padding: 8, minHeight: 60 }}
        />
        <div style={{ marginTop: 12 }}>
          <button type="submit" style={{ padding: "8px 20px", background: "#0070f3", color: "#fff", border: "none", borderRadius: 4 }}>
            {editingId ? "Modifier" : "Ajouter"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => { setForm({}); setEditingId(null); }}
              style={{ marginLeft: 8, padding: "8px 20px", background: "#aaa", color: "#fff", border: "none", borderRadius: 4 }}
            >
              Annuler
            </button>
          )}
        </div>
      </form>
      <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff" }}>
        <thead>
          <tr style={{ background: "#f0f0f0" }}>
            <th style={{ padding: 8, border: "1px solid #eee" }}>Titre</th>
            <th style={{ padding: 8, border: "1px solid #eee" }}>Image Cover</th>
            <th style={{ padding: 8, border: "1px solid #eee" }}>Image Cart</th>
            <th style={{ padding: 8, border: "1px solid #eee" }}>Description</th>
            <th style={{ padding: 8, border: "1px solid #eee" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {newsList.map(news => (
            <tr key={news.id}>
              <td style={{ padding: 8, border: "1px solid #eee" }}>{news.titre}</td>
              <td style={{ padding: 8, border: "1px solid #eee" }}>
                <img src={news.imageCover} alt="" style={{ width: 60, height: 40, objectFit: "cover" }} />
              </td>
              <td style={{ padding: 8, border: "1px solid #eee" }}>
                <img src={news.imageCart} alt="" style={{ width: 60, height: 40, objectFit: "cover" }} />
              </td>
              <td style={{ padding: 8, border: "1px solid #eee", maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {news.description}
              </td>
              <td style={{ padding: 8, border: "1px solid #eee" }}>
                <button onClick={() => handleEdit(news)} style={{ marginRight: 8, padding: "4px 12px" }}>Modifier</button>
                <button onClick={() => handleDelete(news.id)} style={{ padding: "4px 12px", background: "#e00", color: "#fff", border: "none", borderRadius: 4 }}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
