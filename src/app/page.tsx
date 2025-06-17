"use client";

// Remove Swiper import if you don't have it installed
// import "swiper/css"; // oi d'avoir installé Swiper
import HeroSection from "./components/home/hero-section";
import StatsSection from "./components/home/Stats-Section";
import NosServices from "./components/home/nos-services";
import CreationProcess from "./components/home/process";
import NewsletterSection from "./components/home/newletter";
import  ValuesSection from "./components/home/nos-valeur";
import TestimonialsSection from "./components/home/Testimonial";
import ContactSection from "./components/home/contact";
import Footer from "./components/home/footer";
import Header from "./components/header_main";
import CtaBlock from "./components/home/rdv";
import NewsSection from "./components/home/news";
export default function Home() {
  return (
    <>
      {/*Banner*/}
      <Header/>
      <HeroSection/>
      <StatsSection/>
      <NosServices/>
      <CreationProcess/>
      <NewsletterSection/>
      <ValuesSection/>
      <TestimonialsSection/>
      <CtaBlock/>
      <NewsSection/>
<ContactSection/>

<Footer/>
      {/*Banner*/}
    </>
  );
}
