import React from "react";

const MethodologySection = () => {
  const steps = [
    {
      icon: (
        <div className="w-11 h-11 bg-blue-400 rounded-md relative">
          <div className="absolute w-3 h-3.5 bg-blue-400 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      ),
      title: "Écoute attentive",
      bgColor: "bg-sky-50",
      iconColor: "bg-blue-400"
    },
    {
      icon: (
        <div className="w-11 h-11 bg-red-400 rounded-md"></div>
      ),
      title: "Analyse approfondie",
      bgColor: "bg-rose-50",
      iconColor: "bg-red-400"
    },
    {
      icon: (
        <div className="w-11 h-8 bg-red-400 rounded-md mt-1.5"></div>
      ),
      title: "Conseil personnalisé",
      bgColor: "bg-rose-50",
      iconColor: "bg-red-400"
    },
    {
      icon: (
        <div className="w-11 h-11 bg-indigo-500 rounded-md"></div>
      ),
      title: "Mise en œuvre efficace",
      bgColor: "bg-violet-100",
      iconColor: "bg-indigo-500"
    }
  ];

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center mb-12 lg:mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-2">
          Notre Méthodologie
        </h2>
        <p className="text-black text-base md:text-lg">
          Des étapes claires pour garantir votre succès
        </p>
      </div>

      <div className="w-full bg-white shadow-lg rounded-lg px-6 py-8 sm:px-12 sm:py-11">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-16">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center gap-4">
              <div className={`w-20 h-20 p-5 ${step.bgColor} rounded-xl flex items-center justify-center`}>
                {step.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-700 text-center">
                {step.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;