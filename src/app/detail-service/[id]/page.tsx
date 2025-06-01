"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Footer from '../../components/home/footer';
import PricingSection from '../../components/services/price';

type Pack = {
  id: string;
  name: string;
  price: number;
  description: string;
  serviceId: string; // plus de undefined ici
  // ...autres champs si besoin...
};

type Package = Pack; // Pour compatibilité avec PricingSection

type Service = {
  id: string;
  name: string;
  price: number;
  detailedDesc: string;
};

const DetailServicePage = () => {
  const params = useParams();
  const serviceId = params?.id as string;

  const [service, setService] = useState<Service | null>(null);
  const [packs, setPacks] = useState<Pack[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/services`)
      .then(res => res.json())
      .then(data => {
        const allServices: Service[] = data.services || [];
        const allPacks: Pack[] = data.packs || [];
        const foundService = allServices.find(s => String(s.id).trim() === String(serviceId).trim()) || null;
        const relatedPacks = allPacks
          .filter((p: Pack) => String(p.serviceId).trim().toLowerCase() === String(serviceId).trim().toLowerCase());

        setService(foundService);
        setPacks(relatedPacks as Package[]);
        setLoading(false);
      });
  }, [serviceId]);

  if (loading) return <div>Chargement...</div>;
  if (!service) return <div>Service introuvable</div>;

  return (
    <div>
      <section className="max-w-3xl mx-auto my-8 p-6 bg-white rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">Détail du service</h2>
        <ul className="text-lg text-gray-700 space-y-2">
          <li><strong>ID :</strong> {service.id}</li>
          <li><strong>Nom :</strong> {service.name}</li>
          <li><strong>Prix :</strong> {service.price} €</li>
          <li><strong>Description :</strong> {service.detailedDesc}</li>
        </ul>
      </section>
      <PricingSection packs={packs} />
      <Footer />
    </div>
  );
};

export default DetailServicePage;
