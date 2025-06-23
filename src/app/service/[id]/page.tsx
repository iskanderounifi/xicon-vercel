"use client";
import React, { useEffect, useState } from 'react';
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
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
import { Contact } from 'lucide-react';
import ServiceDetails from '../../components/services/service-details';

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

type PageProps = {
  params: {
    id: string;
  };
};

export default async function ServiceDetailPage({ params }: PageProps) {
  const service = await prisma.service.findUnique({
    where: { id: params.id },
    include: {
      packages: true,
    },
  });

  if (!service) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Header />
      <HeroSectionServices
        id={service.id}
        name={service.name}
        price={service.price}
        description={service.shortDesc}
        shortDesc={service.shortDesc}
        icon={service.icon}
        coverImage={service.coverImage}
      />
      <PricingSection packs={service.packages} />
      <MethodologySection />
      <CTABlock />
      <PartnersSection />
      <ContactSection />
      <Footer />
    </div>
  );
}




