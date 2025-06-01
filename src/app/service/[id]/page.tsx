"use client";
import React, { useEffect, useState } from 'react';

import Footer from '../../components/home/footer'; 
import HeroSectionServices from '../../components/services/header-service';
import MethodologySection from '../../components/services/methologie';
import PricingSection from '../../components/services/price';
import ContactSection from '../../components/home/contact';
import PartnersSection from '../../components/services/partenaire';
import CTABlock from '../../components/services/rdv';

import Newsletter from '../../components/home/newletter';
import NosValeursSection from '@/app/components/home/nos-valeur';
import Header from '@/app/components/header_main';
import { useParams } from "next/navigation";

// Types stricts selon votre schéma Prisma
type Service = {
  id: string;
  name: string;
  shortDesc: string;
  icon: string;
  detailedDesc: string;
  price: number;
  coverImage: string;
  createdAt: string;
  updatedAt: string;
};

type Package = {
  id: string;
  name: string;
  description: string;
  price: number;
  serviceId: string;
  createdAt: string;
  updatedAt: string;
};

const ServiceDetailPage = () => {
  const params = useParams();
  const serviceId = typeof params?.id === "string" ? params.id : Array.isArray(params?.id) ? params.id[0] : "";

  const [service, setService] = useState<Service | null>(null);
  const [packs, setPacks] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!serviceId) {
      setLoading(false);
      setService(null);
      return;
    }
    fetch(`/api/services/${serviceId}`)
      .then(res => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then(data => {
        // data peut être { id, ... } ou { service, packages }
        if (data && data.id) {
          setService(data);
          setPacks(Array.isArray(data.packages) ? data.packages : []);
        } else if (data && data.service) {
          setService(data.service);
          setPacks(Array.isArray(data.packages) ? data.packages : []);
        } else {
          setService(null);
          setPacks([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setService(null);
        setPacks([]);
        setLoading(false);
      });
  }, [serviceId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-lg text-gray-500">
        <span>Chargement...</span>
      </div>
    );
  }
  if (!service) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-lg text-red-500">
        Service introuvable
      </div>
    );
  }

  return (
   
    <div className="">
       <Header/>
      <HeroSectionServices
        id={service.id}
        name={service.name}
        price={service.price}
        description={service.detailedDesc}
        shortDesc={service.shortDesc}
        coverImage={service.coverImage}
      />
      <MethodologySection/>
      <PricingSection packs={packs} />
      <ContactSection/>
      <PartnersSection/>
      <CTABlock/>
      <NosValeursSection/>
      <Newsletter/>
      <Footer/>
    </div>
  );
};

export default ServiceDetailPage;




