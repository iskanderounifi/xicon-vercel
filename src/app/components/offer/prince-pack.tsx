"use client";

import React from 'react';

const PricingPackSection = () => {
  const plans = [
    {
      name: "Essentiel",
      price: "50€",
      description: "HT / mois",
      features: [
        { 
          text: "Gestion de comptes sociaux", 
          highlight: "Moins de 10 000 followers" 
        },
        "Community management",
        "Modération",
        "Analyse des performances et rapports"
      ],
      bgColor: "bg-gray-100",
      borderColor: "border-indigo-500",
      textColor: "text-zinc-800",
      priceColor: "text-indigo-900",
      buttonBg: "bg-indigo-900",
      buttonText: "text-white"
    },
    {
      name: "Essentiel",
      price: "120€",
      description: "HT / mois",
      features: [
        { 
          text: "Gestion de comptes sociaux", 
          highlight: "Entre 10 000 et 25 000 followers" 
        },
        "Community management",
        "Modération",
        "Analyse des performances et rapports"
      ],
      bgColor: "bg-gray-100",
      borderColor: "border-indigo-500",
      textColor: "text-zinc-800",
      priceColor: "text-indigo-900",
      buttonBg: "bg-indigo-900",
      buttonText: "text-white"
    },
    {
      name: "Personnalisé",
      price: "Contactez un expert",
      description: "",
      features: [
        "Pour un service entièrement personnalisé, contactez notre agence pour discuter de vos besoins spécifiques et créer un pack sur mesure adapté à votre entreprise."
      ],
      bgColor: "bg-gradient-to-br from-indigo-500 to-indigo-900",
      borderColor: "border-indigo-950",
      textColor: "text-gray-100",
      priceColor: "text-violet-100",
      buttonBg: "bg-gray-100",
      buttonText: "text-indigo-900",
      isCustom: true
    }
  ];

  return (
    <div className="w-[1273px] mx-auto flex flex-col items-center gap-16">
      <div className="w-[705px] flex flex-col items-center gap-9">
        <div className="w-96 flex flex-col items-center">
          <h2 className="w-full text-center text-gray-700 text-4xl font-bold font-montserrat">Nos Packs</h2>
          <p className="w-full text-gray-700 text-base font-normal font-montserrat">
            Des plans tarifaires flexibles pour chaque besoin
          </p>
        </div>
        <p className="w-full text-center text-gray-700 text-2xl font-bold font-montserrat">
          choisissez le plan qui correspond le mieux à vos besoins<br/>
          et commencez dès aujourd'hui à optimiser votre temps
        </p>
      </div>

      <div className="w-full flex justify-center gap-6">
        {plans.map((plan, index) => (
          <div key={index} className={`w-96 h-[605px] relative rounded-3xl shadow-lg border-2 ${plan.borderColor} ${plan.bgColor}`}>
            <div className="w-80 mx-auto mt-[28px] flex flex-col items-center gap-10">
              <div className="w-full flex flex-col items-start gap-11">
                <div className="flex flex-col items-start gap-2">
                  <div className="flex flex-col items-start gap-3">
                    <div className="w-8 h-8 p-1 bg-white rounded-md flex items-center justify-center">
                      <CheckIcon color="indigo-500" />
                    </div>
                    <h3 className={`text-4xl font-bold font-montserrat ${plan.textColor}`}>
                      {plan.name}
                    </h3>
                  </div>
                  <p className={`text-5xl font-medium font-montserrat ${plan.priceColor}`}>
                    {plan.price}
                  </p>
                  {plan.description && (
                    <p className={`text-base font-normal font-montserrat ${plan.textColor}`}>
                      {plan.description}
                    </p>
                  )}
                </div>

                <ul className="w-full space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      {!plan.isCustom && <CheckIcon color={plan.textColor === "text-gray-100" ? "gray-100" : "indigo-900"} />}
                      <span className={`text-xl font-medium font-montserrat ${plan.textColor}`}>
                        {typeof feature === 'object' ? (
                          <>
                            {feature.text} <span className="text-blue-700 font-bold">{feature.highlight}</span>
                          </>
                        ) : (
                          feature
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className={`w-full h-12 px-16 py-4 ${plan.buttonBg} rounded-xl flex justify-center items-center gap-2.5`}>
                <span className={`text-base font-bold font-montserrat ${plan.buttonText}`}>
                  Commencer Maintenant
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CheckIcon = ({ color = "indigo-900" }) => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" fill="white"/>
    <path 
      d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" 
      className={`fill-${color}`}
    />
  </svg>
);

export default PricingPackSection;