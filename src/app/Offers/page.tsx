import React from 'react';
 import OffersHeroSection from '../components/offer/hero-section-service';
 import PricingSection from '../components/offer/pricing';
 import PricingPackSection from '../components/offer/prince-pack';
 import Footer from '../components/home/footer';
 import ContactSection from '../components/home/contact';
import { Contact } from 'lucide-react';
const SommePage = () => {
  return (
    <div className="">
 <OffersHeroSection/>
 <PricingPackSection/>
  <PricingSection/>
  <ContactSection/>
      <Footer/>
    </div>
  );
};

export default SommePage;



 
