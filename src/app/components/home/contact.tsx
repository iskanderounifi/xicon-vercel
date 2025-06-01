import React from "react";

const ContactSection = () => (
  <section className="relative min-h-screen bg-slate-50">
    {/* Background Image with Overlay */}
    <div className="absolute inset-0 z-0">
      <div 
        className="h-full w-full lg:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: 'url(./assets/contact/1.jpg)' }}
      />
      <div className="absolute inset-0 lg:w-1/2 bg-slate-50 opacity-80" />
    </div>

    {/* Content Container */}
    <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 lg:px-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-16">
        {/* Contact Information */}
        <div className="mb-16 lg:mb-0">
          <h2 className="text-4xl font-bold text-gray-700 mb-4">
            Contactez nous
          </h2>
          <p className="text-gray-700 text-sm mb-16">
            Prenez contact pour un accompagnement personnalisé.
          </p>

          <div className="space-y-10">
            <ContactInfoItem
              icon={<PhoneIcon />}
              title="+216 56 656 656"
            />
            <ContactInfoItem
              icon={<EmailIcon />}
              title="contact@xicom.fr"
            />
            <ContactInfoItem
              icon={<LocationIcon />}
              title="Adresse"
            />
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-700 mb-8">
            Nous sommes à votre écoute
          </h3>

          <form
            className="space-y-8"
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const prenom = (form.elements.namedItem("prenom") as HTMLInputElement)?.value;
              const nom = (form.elements.namedItem("nom") as HTMLInputElement)?.value;
              const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;
              const phone = (form.elements.namedItem("phone") as HTMLInputElement)?.value;
              const message = (form.elements.namedItem("message") as HTMLTextAreaElement)?.value;
              await fetch("/api/contactfooter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prenom, nom, email, phone, message }),
              });
              form.reset();
              alert("Votre message a bien été envoyé !");
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label htmlFor="prenom" className="text-sm text-gray-600">Prénom *</label>
                <input
                  type="text"
                  id="prenom"
                  name="prenom"
                  required
                  className="w-full border-b border-gray-400/70 focus:outline-none focus:border-blue-600 py-2"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="nom" className="text-sm text-gray-600">Nom *</label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  required
                  className="w-full border-b border-gray-400/70 focus:outline-none focus:border-blue-600 py-2"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm text-gray-600">E-mail *</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full border-b border-gray-400/70 focus:outline-none focus:border-blue-600 py-2"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm text-gray-600">Téléphone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full border-b border-gray-400/70 focus:outline-none focus:border-blue-600 py-2"
              />
            </div>

            <div className="space-y-4">
              <label htmlFor="message" className="text-xs text-gray-400">Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full border-b border-gray-400/70 focus:outline-none focus:border-blue-600 py-2"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-5 rounded-xl font-bold hover:bg-blue-700 transition-colors"
            >
              Envoyer un message
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

// Reusable Components
const FormInput = ({ label, required }) => (
  <div className="space-y-1">
    <label className="text-xs text-gray-400">
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    <div className="border-b border-gray-400/70" />
  </div>
);

const PhoneInput = () => (
  <div className="space-y-1">
    <div className="flex items-center justify-between text-xs text-gray-400">
      <div className="flex items-center gap-2">
        <span className="font-medium">Fr</span>
        <ChevronDownIcon className="w-4 h-4" />
        <span>Numéro de téléphone</span>
      </div>
      <span className="text-red-500">*</span>
    </div>
    <div className="border-b border-gray-400/70" />
  </div>
);

const ContactInfoItem = ({ icon, title }) => (
  <div className="flex items-center gap-6">
    <span className="text-gray-700">{icon}</span>
    <span className="text-2xl font-medium text-">{title}</span>
  </div>
);

// SVG Icons
const PhoneIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
    <path d="M2.5 3.5A2 2 0 0 1 4.5 1.5h2A2 2 0 0 1 8.5 3.5v1A2 2 0 0 1 6.5 6.5h-.5a11 11 0 0 0 7.5 7.5v-.5a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2A16 16 0 0 1 2.5 3.5z" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
    <rect x="2.5" y="4.5" width="15" height="11" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M3 5l7 6 7-6" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const LocationIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
    <path d="M10 18s6-5.686 6-10A6 6 0 1 0 4 8c0 4.314 6 10 6 10z" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="10" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export default ContactSection;