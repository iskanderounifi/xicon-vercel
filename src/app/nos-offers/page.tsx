"use client";
import React from 'react';
import Header from '../components/header_main';
import HeroSection from '../components/nos-offers/hero';
import OnDemarrePlusPetitSection from '../components/nos-offers/nos-packs';
import PackSection from '../components/nos-offers/offers-packs';
import Footer from '../components/home/footer';

const NosOffresPage = () => {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <PackSection />
      <OnDemarrePlusPetitSection />
      <Footer />
    </main>
  );
};

export default NosOffresPage;
