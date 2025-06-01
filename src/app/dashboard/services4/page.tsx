"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Service = {
  id: string;
  name: string;
  shortDesc: string;
  icon: string;
  detailedDesc: string;
  price: number;
  coverImage: string;
};

type Pack = {
  id: string;
  name: string;
  description: string;
  price: number;
};

type ServiceWithPacks = Service & { packages?: Pack[] };

export default function ServicesDashboardPage() {
  const [services, setServices] = useState<ServiceWithPacks[]>([]);
  const [openServiceId, setOpenServiceId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then(setServices);
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: "2rem auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <h1>Services</h1>
        <Link href="/dashboard/admin/AddServiceAndPackages">
          <button
            style={{
              padding: "8px 16px",
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            + Add Service
          </button>
        </Link>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 24,
        }}
      >
        {services.map((service) => {
          // Ensure the image src is valid for next/image
          let imgSrc = "/placeholder.png";
          if (
            service.coverImage &&
            (service.coverImage.startsWith("/") ||
              service.coverImage.startsWith("http://") ||
              service.coverImage.startsWith("https://"))
          ) {
            imgSrc = service.coverImage;
          }
          return (
            <div
              key={service.id}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: 8,
                padding: 20,
                width: 270,
                boxShadow: "0 2px 8px #0001",
                background: "#fff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Image
                src={imgSrc}
                alt={service.name}
                width={80}
                height={80}
                style={{
                  objectFit: "cover",
                  borderRadius: 8,
                  marginBottom: 12,
                }}
              />
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 18,
                  marginBottom: 6,
                }}
              >
                {service.name}
              </div>
              <div
                style={{
                  color: "#555",
                  marginBottom: 8,
                }}
              >
                {service.shortDesc}
              </div>
              <div
                style={{
                  color: "#2563eb",
                  fontWeight: 500,
                  marginBottom: 8,
                }}
              >
                ${service.price}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "#888",
                  marginBottom: 8,
                }}
              >
                {service.detailedDesc.slice(0, 60)}...
              </div>
              {/* Button to show/hide packs */}
              <button
                style={{
                  marginTop: 8,
                  background: "#2563eb",
                  color: "#fff",
                  border: "none",
                  borderRadius: 4,
                  padding: "6px 12px",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
                onClick={() =>
                  setOpenServiceId(openServiceId === service.id ? null : service.id)
                }
              >
                {openServiceId === service.id ? "Hide Packs" : "Show Packs"}
              </button>
              {/* Packs list, shown when openServiceId matches */}
              {openServiceId === service.id && (
                <div style={{ marginTop: 12, width: "100%" }}>
                  <h4 style={{ fontWeight: 600, fontSize: 15, marginBottom: 6 }}>
                    Packs
                  </h4>
                  {Array.isArray(service.packages) && service.packages.length > 0 ? (
                    <ul style={{ paddingLeft: 16 }}>
                      {service.packages.map((pack) => (
                        <li key={pack.id} style={{ marginBottom: 6 }}>
                          <span style={{ fontWeight: 500 }}>{pack.name}</span>
                          {": "}
                          <span style={{ color: "#555" }}>{pack.description}</span>
                          {" - "}
                          <span style={{ color: "#2563eb", fontWeight: 600 }}>${pack.price}</span>
                          {/* Edit link for pack */}
                          <Link
                            href={`/dashboard/admin/services/${service.id}/edit-pack/${pack.id}`}
                            style={{
                              marginLeft: 8,
                              color: "#2563eb",
                              textDecoration: "underline",
                              fontSize: 13,
                              fontWeight: 500,
                            }}
                          >
                            Edit
                          </Link>
                          {/* Delete link for pack */}
                          <Link
                            href={`/dashboard/admin/services/${service.id}/delete-pack/${pack.id}`}
                            style={{
                              marginLeft: 8,
                              color: "#dc2626",
                              textDecoration: "underline",
                              fontSize: 13,
                              fontWeight: 500,
                            }}
                          >
                            Delete
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div style={{ color: "#888" }}>No packs for this service.</div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}