 "use client";

import React from 'react';

const PricingSection = () => {
  const plans = [
    {
      title: "CRM, devis & suivi commercial",
      price: "25€",
      features: [
        "Identifiez vos prospects",
        "Générez vos devis",
        "Générez votre équipe commercial",
        "Automatisez vos tâches",
        "Collaborez simplement"
      ],
      bgColor: "from-indigo-700 to-indigo-950",
      rightPosition: "right-[1094px]"
    },
    {
      title: "Facturation, achat & trésorerie",
      price: "20€",
      features: [
        "Identifiez vos prospects",
        "Générez vos devis",
        "Générez votre équipe commercial",
        "Automatisez vos tâches",
        "Collaborez simplement"
      ],
      bgColor: "from-indigo-700 to-indigo-950",
      rightPosition: "right-[1091px]"
    },
    {
      title: "Gestion de projet & équipe",
      price: "27€",
      features: [
        "Identifiez vos prospects",
        "Générez vos devis",
        "Générez votre équipe commercial",
        "Automatisez vos tâches",
        "Collaborez simplement"
      ],
      bgColor: "from-indigo-700 to-indigo-950",
      rightPosition: "right-[1094px]"
    }
  ];

  return (
    <div className="w-[1272px] mx-auto flex flex-col items-center gap-16">
      <div className="w-[498px] flex flex-col items-center gap-4">
        <h2 className="w-full text-gray-700 text-4xl font-bold font-montserrat">On démarre plus petit ?</h2>
        <h3 className="w-full text-center text-gray-700 text-3xl font-bold font-montserrat">C'est possible</h3>
      </div>

      <div className="w-full flex flex-col gap-6">
        {plans.map((plan, index) => (
          <div key={index} className="relative h-72 w-full">
            {/* Main card background */}
            <div className="absolute left-0 top-0 w-[1043px] h-full bg-gray-100 rounded-[40px] shadow-lg border-2 border-indigo-500" />
            
            {/* Price tag background */}
            <div className={`absolute right-0 top-0 w-64 h-full bg-gradient-to-r ${plan.bgColor} rounded-tr-[40px] rounded-br-[40px] shadow-lg border-2 border-indigo-900`} />
            
            {/* Price display */}
            <div className={`absolute ${plan.rightPosition} top-[96px] w-32 flex flex-col items-center`}>
              <div className="w-full text-violet-50 text-6xl font-bold font-montserrat">{plan.price}</div>
              <div className="w-full text-center text-violet-50 text-2xl font-normal font-montserrat">HT / mois</div>
            </div>
            
            {/* Card content */}
            <div className="absolute left-[36px] top-[45px] flex items-center gap-36">
              <div className="w-80 flex flex-col items-center gap-20">
                <h3 className="text-center text-gray-700 text-3xl font-bold font-montserrat">
                  {plan.title.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </h3>
                <button className="w-full h-12 px-16 py-4 bg-indigo-900 rounded-xl flex justify-center items-center gap-2.5">
                  <span className="text-white text-base font-bold font-montserrat">Commencer Maintenant</span>
                </button>
              </div>
              
              <div className="w-96 h-36 relative">
                <ul className="text-gray-700 text-2xl font-medium font-montserrat space-y-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckIcon />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CheckIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" fill="white"/>
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#1E3A8A"/>
  </svg>
);

export default PricingSection;