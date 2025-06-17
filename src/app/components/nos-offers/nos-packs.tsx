import React from 'react';

const CheckIcon = () => (
  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21.1919 5.96515C21.3794 6.15268 21.4847 6.40699 21.4847 6.67215C21.4847 6.93731 21.3794 7.19162 21.1919 7.37915L9.94995 18.6221C9.8478 18.7243 9.72651 18.8054 9.59302 18.8607C9.45953 18.916 9.31645 18.9445 9.17195 18.9445C9.02745 18.9445 8.88437 18.916 8.75088 18.8607C8.61739 18.8054 8.4961 18.7243 8.39395 18.6221L2.80795 13.0361C2.71504 12.9432 2.64134 12.8329 2.59106 12.7115C2.54077 12.5902 2.51489 12.46 2.51489 12.3286C2.51489 12.1973 2.54077 12.0671 2.59106 11.9458C2.64134 11.8244 2.71504 11.7141 2.80795 11.6212C2.90086 11.5282 3.01116 11.4545 3.13255 11.4043C3.25395 11.354 3.38405 11.3281 3.51545 11.3281C3.64684 11.3281 3.77695 11.354 3.89834 11.4043C4.01974 11.4545 4.13004 11.5282 4.22295 11.6212L9.17295 16.5711L19.7769 5.96515C19.9645 5.77768 20.2188 5.67236 20.4839 5.67236C20.7491 5.67236 21.0044 5.77768 21.1919 5.96515Z"
      fill="#09244B"
    />
  </svg>
);

const PricingCard = ({
  title,
  price,
  features,
  buttonText = "Commencer Maintenant"
}) => (
  <div className="relative w-full max-w-5xl mx-auto min-h-[18rem]">
    {/* Background bar */}
    <div className="absolute right-0 top-0 h-full w-2/5 bg-gradient-to-br from-indigo-700 to-indigo-950 rounded-tr-[40px] rounded-br-[40px] shadow-md border-2 border-indigo-900" />

    {/* Price tag */}
    <div className="absolute right-8 top-1/4 w-28 md:w-32 flex flex-col items-center">
      <div className="text-violet-50 text-5xl md:text-6xl font-bold font-montserrat">{price}</div>
      <div className="text-violet-50 text-xl md:text-2xl font-normal font-montserrat">HT / mois</div>
    </div>

    {/* Main card */}
    <div className="absolute left-0 top-0 h-full w-[80%] bg-gray-100 rounded-[40px] shadow-md border-2 border-indigo-500" />

    {/* Content */}
    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 px-8 py-12">
      <div className="flex flex-col items-center md:items-start gap-8 max-w-sm w-full">
        <h3 className="text-gray-700 text-2xl md:text-3xl font-bold font-montserrat text-center md:text-left">
          {title}
        </h3>
        <button className="w-full h-12 px-4 py-2 bg-indigo-900 rounded-xl flex justify-center items-center">
          <span className="text-white text-base font-bold font-montserrat">
            {buttonText}
          </span>
        </button>
      </div>

      <div className="flex-1">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-2 mb-3">
            <CheckIcon />
            <span className="text-gray-700 text-lg md:text-xl font-medium font-montserrat">
              {feature}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const OnDMarrePlusPetitSection = () => {
  const pricingPlans = [
    {
      title: "CRM, devis & suivi commercial",
      price: "25€",
      features: [
        "Identifiez vos prospects",
        "Générez vos devis",
        "Générez votre équipe commercial",
        "Automatisez vos tâches",
        "Collaborez simplement"
      ]
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
      ]
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
      ]
    }
  ];

  return (
    <section className="max-w-7xl mx-auto flex flex-col items-center gap-16 py-12 px-4">
      <div className="max-w-xl text-center">
        <h2 className="text-gray-700 text-3xl md:text-4xl font-bold font-montserrat mb-2">
          On démarre plus petit ?
        </h2>
        <h3 className="text-gray-700 text-2xl md:text-3xl font-bold font-montserrat">
          C’est possible
        </h3>
      </div>

      <div className="flex flex-col gap-12 w-full">
        {pricingPlans.map((plan, index) => (
          <PricingCard
            key={index}
            title={plan.title}
            price={plan.price}
            features={plan.features}
          />
        ))}
      </div>
    </section>
  );
};

export default OnDMarrePlusPetitSection;
