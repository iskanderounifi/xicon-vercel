"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Package = {
  id: string;
  name: string;
  description: string;
  price: number;
  serviceId: string;
};

export default function AddServiceAndPackages() {
  const router = useRouter();
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [serviceForm, setServiceForm] = useState({
    name: "",
    shortDesc: "",
    icon: "",
    detailedDesc: "",
    price: "",
    coverImage: "",
  });
  const [packageForm, setPackageForm] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [packages, setPackages] = useState<Package[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  // Add Service
  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    const res = await fetch("/api/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...serviceForm, price: Number(serviceForm.price) }),
    });
    if (res.ok) {
      const data = await res.json();
      setServiceId(data.id);
      setMessage("Service added! Now add packages.");
    } else {
      setMessage("Failed to add service.");
    }
  };

  // Add Package
  const handlePackageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    if (!serviceId) return;
    const res = await fetch("/api/packs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...packageForm,
        price: Number(packageForm.price),
        serviceId,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      setPackages((prev) => [...prev, data]);
      setPackageForm({ name: "", description: "", price: "" });
      setMessage("Package added!");
    } else {
      setMessage("Failed to add package.");
    }
  };

  const handleReset = () => {
    setServiceId(null);
    setServiceForm({
      name: "",
      shortDesc: "",
      icon: "",
      detailedDesc: "",
      price: "",
      coverImage: "",
    });
    setPackages([]);
    setMessage(null);
  };

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Add Service</h2>
        <button
          style={{
            padding: "6px 12px",
            background: "#e5e7eb",
            color: "#222",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
            fontWeight: 500,
          }}
          onClick={() => router.push("/dashboard/services")}
        >
          ← Back to Services
        </button>
      </div>
      {message && (
        <div style={{ margin: "12px 0", color: "#2563eb", fontWeight: 500 }}>{message}</div>
      )}
      <form onSubmit={handleServiceSubmit} style={{ marginBottom: 24 }}>
        <input name="name" placeholder="Name" value={serviceForm.name} onChange={e => setServiceForm(f => ({ ...f, name: e.target.value }))} required />
        <input name="shortDesc" placeholder="Short Desc" value={serviceForm.shortDesc} onChange={e => setServiceForm(f => ({ ...f, shortDesc: e.target.value }))} required />
        <input name="icon" placeholder="Icon" value={serviceForm.icon} onChange={e => setServiceForm(f => ({ ...f, icon: e.target.value }))} required />
        <textarea name="detailedDesc" placeholder="Detailed Desc" value={serviceForm.detailedDesc} onChange={e => setServiceForm(f => ({ ...f, detailedDesc: e.target.value }))} required />
        <input name="price" placeholder="Price" type="number" value={serviceForm.price} onChange={e => setServiceForm(f => ({ ...f, price: e.target.value }))} required />
        <input name="coverImage" placeholder="Cover Image" value={serviceForm.coverImage} onChange={e => setServiceForm(f => ({ ...f, coverImage: e.target.value }))} required />
        <button type="submit" disabled={!!serviceId}>Add Service</button>
        <button type="button" onClick={handleReset} style={{ marginLeft: 8 }}>Reset</button>
      </form>

      {serviceId && (
        <>
          <h2>Add Packages for Service</h2>
          <form onSubmit={handlePackageSubmit} style={{ marginBottom: 24 }}>
            <input name="name" placeholder="Package Name" value={packageForm.name} onChange={e => setPackageForm(f => ({ ...f, name: e.target.value }))} required />
            <textarea name="description" placeholder="Description" value={packageForm.description} onChange={e => setPackageForm(f => ({ ...f, description: e.target.value }))} required />
            <input name="price" placeholder="Price" type="number" value={packageForm.price} onChange={e => setPackageForm(f => ({ ...f, price: e.target.value }))} required />
            <button type="submit">Add Package</button>
          </form>
          <ul>
            {packages.map((pkg) => (
              <li key={pkg.id}>
                <b>{pkg.name}</b> - {pkg.description} - ${pkg.price}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
