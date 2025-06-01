"use client";
import React from "react";
import Image from "next/image";
const Footer = () => (
  <footer className="bg-gray-100 w-full py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col space-y-16">
        {/* Main Content */}
        <div className="flex flex-col md:flex-row justify-between space-y-16 md:space-y-0">
          {/* Brand Section */}
          <div className="flex flex-col space-y-8 w-full md:w-1/4">
             <Image 
                            src="/assets/icon/logo.svg"
                            width={60}
                            height={60}
                            alt="xicom"
                            className="w-10 h-10 md:w-16 md:h-16"
                            priority
                          />
            <p className="text-indigo-950 text-sm font-normal leading-snug">
              Agence de communication
              <br />
              (présentation de l'agence)
            </p>
            <SocialIcons />
          </div>

          {/* Navigation Sections */}
          <div className="flex flex-col md:flex-row justify-between w-full md:w-3/4 space-y-16 md:space-y-0 md:space-x-8">
            <NavigationSection 
              title="Agence"
              links={['Accueil', 'Services', 'Offers', 'Contact', 'Blog']}
            />
            
            <NavigationSection
              title="Aide"
              links={['Emplois', 'Politique de confidentialité', 'Mentions légales']}
            />

            {/* Contact Section */}
            <div className="flex flex-col space-y-8">
              <ContactInfo
                icon={
                  <Image
                    src="/assets/icon/WT.svg"
                    alt="Phone"
                    width={24}
                    height={24}
                  />
                }
                text="+216 56 656 656"
              />
              <ContactInfo
                 icon={
                  <Image
                    src="/assets/icon/MAIL.svg"
                    alt="Phone"
                    width={24}
                    height={24}
                  />
                }
                text="contact@xicom.fr"
              />
              <ContactInfo
                 icon={
                  <Image
                    src="/assets/icon/AD.svg"
                    alt="Phone"
                    width={24}
                    height={24}
                  />
                }
                text="Adresse"
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-t border-neutral-400" />

        {/* Copyright */}
        <div className="text-center text-zinc-700 text-sm">
          © Copyright 2025, Tous droits réservés par
          <br />
          XI COM
        </div>
      </div>
    </div>
  </footer>
);

// Reusable components
const Logo = () => (
  <div className="w-20 h-14">
    {/* Replace with your actual logo SVG */}
    <svg viewBox="0 0 52 55" fill="#1D1D1D">
      {/* Logo paths */}
    </svg>
  </div>
);

const SocialIcons = () => (
  <div className="flex space-x-6">
    <Image
      src="/assets/icon/fb.svg"
      alt="Whatsapp"
      width={24}
      height={24}
    />
    <Image
      src="/assets/icon/ins.svg"
      alt="Mail"
      width={24}
      height={24}
    />
    <Image
      src="/assets/icon/LINK.svg"
      alt="Adresse"
      width={24}
      height={24}
    />
     <Image
      src="/assets/icon/x.svg"
      alt="Adresse"
      width={24}
      height={24}
    />
     <Image
      src="/assets/icon/YU.svg"
      alt="Adresse"
      width={24}
      height={24}
    />
  </div>
);

const NavigationSection = ({ title, links }) => (
  <div className="flex flex-col space-y-6">
    <h3 className="text-blue-600 text-base font-bold">{title}</h3>
    <div className="flex flex-col space-y-4">
      {links.map((link, index) => (
        <a key={index} href="#" className="text-indigo-950 hover:text-blue-600 transition">
          {link}
        </a>
      ))}
    </div>
  </div>
);

const ContactInfo = ({ icon, text }) => (
  <div className="flex items-center space-x-4">
    <span className="text-blue-600">{icon}</span>
    <span className="text-indigo-950 text-xl">{text}</span>
  </div>
);

// SVG Icons
const FacebookIcon = () => (
  <svg>
  
</svg>
);

const InstagramIcon = () => (
  <svg>
  
</svg>
);

const LinkedinIcon = () => (
  <svg>
  
</svg>
);

const TwitterIcon = () => (
  <svg>
  
</svg>
);

const PhoneIcon = () => (
 <svg>
</svg>
);

const EmailIcon = () => (
<svg>
  
</svg>
);

const LocationIcon = () => (
 <svg>
  
</svg>
);

const YoutubeIcon = () => (
  <svg>
    
  </svg>
);

export default Footer;
