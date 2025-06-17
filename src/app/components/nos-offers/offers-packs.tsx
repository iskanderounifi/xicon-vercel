import React from 'react';

// A reusable checkmark icon component for the feature list
const CheckmarkIcon = ({ fill = "#241E89" }) => (
  <div className="flex-shrink-0">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.1919 5.46515C21.3794 5.65268 21.4847 5.90699 21.4847 6.17215C21.4847 6.43731 21.3794 6.69162 21.1919 6.87915L9.94995 18.1221C9.8478 18.2243 9.72651 18.3054 9.59302 18.3607C9.45953 18.416 9.31645 18.4445 9.17195 18.4445C9.02745 18.4445 8.88437 18.416 8.75088 18.3607C8.61739 18.3054 8.4961 18.2243 8.39395 18.1221L2.80795 12.5361C2.71504 12.4432 2.64134 12.3329 2.59106 12.2115C2.54077 12.0902 2.51489 11.96 2.51489 11.8286C2.51489 11.6973 2.54077 11.5671 2.59106 11.4458C2.64134 11.3244 2.71504 11.2141 2.80795 11.1212C2.90086 11.0282 3.01116 10.9545 3.13255 10.9043C3.25395 10.854 3.38405 10.8281 3.51545 10.8281C3.64684 10.8281 3.77695 10.854 3.89834 10.9043C4.01974 10.9545 4.13004 11.0282 4.22295 11.1212L9.17295 16.0711L19.7769 5.46515C19.9645 5.27768 20.2188 5.17236 20.4839 5.17236C20.7491 5.17236 21.0044 5.27768 21.1919 5.46515Z"
        fill={fill}
      />
    </svg>
  </div>
);

// A reusable icon for the pricing card titles
const CardIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M9 13C9.53043 13 10.0391 13.2107 10.4142 13.5858C10.7893 13.9609 11 14.4696 11 15V19C11 19.5304 10.7893 20.0391 10.4142 20.4142C10.0391 20.7893 9.53043 21 9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15C3 14.4696 3.21071 13.9609 3.58579 13.5858C3.96086 13.2107 4.46957 13 5 13H9ZM9 3C9.53043 3 10.0391 3.21071 10.4142 3.58579C10.7893 3.96086 11 4.46957 11 5V9C11 9.53043 10.7893 10.0391 10.4142 10.4142C10.0391 10.7893 9.53043 11 9 11H5C4.46957 11 3.96086 10.7893 3.58579 10.4142C3.21071 10.0391 3 9.53043 3 9V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9ZM19 3C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V9C21 9.53043 20.7893 10.0391 20.4142 10.4142C20.0391 10.7893 19.5304 11 19 11H15C14.4696 11 13.9609 10.7893 13.5858 10.4142C13.2107 10.0391 13 9.53043 13 9V5C13 4.46957 13.2107 3.96086 13.5858 3.58579C13.9609 3.21071 14.4696 3 15 3H19Z" fill="#6863BF" />
  </svg>
);

/**
 * A section displaying pricing packages.
 *
 * NOTE:
 * 1. This component uses the 'Montserrat' font. Ensure it's loaded in your project.
 * 2. The custom class `text-P2---C6` is used. This requires defining the color 'P2---C6'
 *    in your `tailwind.config.js` file.
 *    Example:
 *    theme: { extend: { colors: { 'P2---C6': '#your_color_here' } } }
 * 3. The third card uses `bg-radial`. This is a non-standard Tailwind class and needs to be
 *    defined as a custom background image in `tailwind.config.js`. The original HTML
 *    also has an invalid `from 25%` class, which I have removed. The radial gradient
 *    will simply be between `from-indigo-500` and `to-indigo-900`.
 */
const NosPacksSection = () => {
  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Nos Packs
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Des plans tarifaires flexibles pour chaque besoin
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
            choisissez le plan qui correspond le mieux à vos besoins
            <br className="hidden sm:block" />
            et commencez dès aujourd'hui à optimiser votre temps
          </h3>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1: Essentiel */}
          <div className="bg-white rounded-3xl shadow-lg border-2 border-indigo-500 p-8 flex flex-col">
            <div className="mb-8">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
                <CardIcon />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Essentiel</h3>
              <div className="text-4xl font-medium text-indigo-900">50€</div>
              <div className="text-gray-600">HT / mois</div>
            </div>

            <div className="space-y-4 mb-8 flex-grow">
              <div className="flex items-start gap-3">
                <CheckmarkIcon />
                <p className="text-gray-700">
                  Gestion de comptes sociaux <span className="text-blue-700 font-bold">Moins de 10 000 followers</span>
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckmarkIcon />
                <p className="text-gray-700">Community management</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckmarkIcon />
                <p className="text-gray-700">Modération</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckmarkIcon />
                <p className="text-gray-700">Analyse des performances et rapports</p>
              </div>
            </div>

            <button className="w-full bg-indigo-900 text-white font-bold py-4 px-8 rounded-xl hover:bg-indigo-800 transition-colors">
              Commencer Maintenant
            </button>
          </div>

          {/* Card 2: Avancé */}
          <div className="bg-white rounded-3xl shadow-lg border-2 border-indigo-500 p-8 flex flex-col">
            <div className="mb-8">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
                <CardIcon />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Avancé</h3>
              <div className="text-4xl font-medium text-indigo-900">120€</div>
              <div className="text-gray-600">HT / mois</div>
            </div>

            <div className="space-y-4 mb-8 flex-grow">
              <div className="flex items-start gap-3">
                <CheckmarkIcon />
                <p className="text-gray-700">
                  Gestion de comptes sociaux <span className="text-blue-700 font-bold">Entre 10 000 et 25 000 followers</span>
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckmarkIcon />
                <p className="text-gray-700">Community management</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckmarkIcon />
                <p className="text-gray-700">Modération</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckmarkIcon />
                <p className="text-gray-700">Analyse des performances et rapports</p>
              </div>
            </div>

            <button className="w-full bg-indigo-900 text-white font-bold py-4 px-8 rounded-xl hover:bg-indigo-800 transition-colors">
              Commencer Maintenant
            </button>
          </div>

          {/* Card 3: Sur Mesure */}
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-900 rounded-3xl shadow-lg border-2 border-indigo-950 p-8 flex flex-col">
            <div className="mb-8">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
                <CardIcon />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">Sur Mesure</h3>
              <div className="text-3xl font-black text-violet-100">Contactez un expert</div>
            </div>

            <div className="mb-8 flex-grow">
              <div className="flex items-start gap-3">
                <CheckmarkIcon fill="#EFF0F4" />
                <p className="text-white">
                  Pour un service entièrement personnalisé, contactez notre agence pour discuter de vos besoins spécifiques et créer un pack sur mesure adapté à votre entreprise.
                </p>
              </div>
            </div>

            <button className="w-full bg-white text-indigo-900 font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-colors">
              Commencer Maintenant
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NosPacksSection;