"use client";

import { useState } from "react";

type Package = {
  id: string;
  name: string;
  description: string;
  price: number;
  serviceId: string;
};

export default function AddServiceAndPackages() {
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

  // Add Service
  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...serviceForm, price: Number(serviceForm.price) }),
    });
    const data = await res.json();
    setServiceId(data.id);
  };

  // Add Package
  const handlePackageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    const data = await res.json();
    setPackages((prev) => [...prev, data]);
    setPackageForm({ name: "", description: "", price: "" });
  };

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h2>Add Service</h2>
      <form onSubmit={handleServiceSubmit} style={{ marginBottom: 24 }}>
        <input name="name" placeholder="Name" value={serviceForm.name} onChange={e => setServiceForm(f => ({ ...f, name: e.target.value }))} required />
        <input name="shortDesc" placeholder="Short Desc" value={serviceForm.shortDesc} onChange={e => setServiceForm(f => ({ ...f, shortDesc: e.target.value }))} required />
        <input name="icon" placeholder="Icon" value={serviceForm.icon} onChange={e => setServiceForm(f => ({ ...f, icon: e.target.value }))} required />
        <textarea name="detailedDesc" placeholder="Detailed Desc" value={serviceForm.detailedDesc} onChange={e => setServiceForm(f => ({ ...f, detailedDesc: e.target.value }))} required />
        <input name="price" placeholder="Price" type="number" value={serviceForm.price} onChange={e => setServiceForm(f => ({ ...f, price: e.target.value }))} required />
        <input name="coverImage" placeholder="Cover Image" value={serviceForm.coverImage} onChange={e => setServiceForm(f => ({ ...f, coverImage: e.target.value }))} required />
        <button type="submit" disabled={!!serviceId}>Add Service</button>
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
