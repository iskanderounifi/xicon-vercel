'use client';

import Image from 'next/image';

const NosValeursSection = () => {
  return (
    <div 
      data-layer="Nos valeurs section" 
      className="NosValeursSection w-[1273px] inline-flex flex-col justify-start items-center gap-12"
    >
      <div data-layer="Frame 159" className="Frame159 w-60 flex flex-col justify-start items-center">
        <h2 className="NosValeurs self-stretch justify-start text-gray-700 text-4xl font-bold font-['Montserrat']">
          Nos valeurs
        </h2>
        <p className="NosConvictionsVotreSuccS self-stretch text-center justify-start text-violet-950 text-base font-normal font-['Montserrat']">
          Nos convictions, votre succès
        </p>
      </div>

      <div data-layer="Frame 177" className="Frame177 self-stretch flex flex-col justify-start items-start gap-16">
        {/* First Row */}
        <div data-layer="Frame 175" className="Frame175 self-stretch relative inline-flex justify-start items-center gap-16">
          {/* Innovation Card */}
          <div className="Frame161 size-64 px-12 py-28 inline-flex flex-col justify-start items-start gap-2.5">
            <Image
              src="/assets/valeur/1.png"
              alt="Innovation"
              width={265}
              height={265}
              className="DiegoPhFiq0tet6llwUnsplash size-64 rounded-3xl"
            />
            <div className="Rectangle294 size-64 opacity-50 bg-P1---C1 rounded-3xl" />
            <div className="Frame160 w-40 h-12 px-3.5 py-2 bg-indigo-50 rounded-lg inline-flex justify-center items-center gap-2.5">
              <span className="Innovation text-P1---C1 text-2xl font-bold font-['Poppins'] leading-7">
                Innovation
              </span>
            </div>
          </div>

          {/* Collaboration Card */}
          <div className="Frame163 size-64 px-8 py-28 inline-flex flex-col justify-start items-start gap-2.5">
            <Image
              src="/assets/unsplash/agilite.png"
              alt="Collaboration"
              width={265}
              height={265}
              className="Krakenimages376knIspleUnsplash size-64 rounded-3xl"
            />
            <div className="Rectangle295 size-64 opacity-50 bg-P1---C2 rounded-3xl" />
            <div className="Frame162 w-48 h-12 px-3.5 py-2 bg-slate-50 rounded-lg inline-flex justify-center items-center gap-2.5">
              <span className="Collaboration text-P1---C2 text-2xl font-bold font-['Poppins'] leading-7">
                Collaboration
              </span>
            </div>
          </div>

          {/* Qualité Card (Absolute positioned) */}
          <div className="Frame164 w-40 h-12 px-9 py-2 left-[725px] top-[109px] absolute bg-stone-50 rounded-lg flex justify-center items-center gap-2.5">
            <span className="Qualit text-P1---C3 text-2xl font-bold font-['Poppins'] leading-7">
              Qualité
            </span>
          </div>

          {/* Transparence Card */}
          <div className="Frame166 size-64 px-8 py-28 inline-flex flex-col justify-start items-start gap-2.5">
            <Image
              src="/assets/unsplash/agilite.png"
              alt="Transparence"
              width={265}
              height={265}
              className="JamesHaworthPr7rxf99t9qUnsplash size-64 rounded-3xl"
            />
            <div className="Rectangle297 size-64 opacity-50 bg-P2---C5 rounded-3xl" />
            <div className="Frame165 w-52 h-12 px-3.5 py-2 bg-stone-50 rounded-lg inline-flex justify-center items-center gap-2.5">
              <span className="Transparence text-P2---C5 text-2xl font-bold font-['Poppins'] leading-7">
                Transparence
              </span>
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div data-layer="Frame 176" className="Frame176 self-stretch inline-flex justify-start items-center gap-16">
          {/* Responsabilité Card */}
          <div className="Frame168 size-64 px-7 py-28 inline-flex flex-col justify-start items-start gap-2.5">
            <Image
              src="/assets/unsplash/agilite.png"
              alt="Responsabilité"
              width={265}
              height={265}
              className="HuntersRaceMybhn8kaaecUnsplash size-64 rounded-3xl"
            />
            <div className="Rectangle298 size-64 opacity-50 bg-P3--C3 rounded-3xl" />
            <div className="Frame167 w-52 h-12 px-3.5 py-2 bg-pink-50 rounded-lg inline-flex justify-center items-center gap-2.5">
              <span className="Responsabilit text-P3--C3 text-2xl font-bold font-['Poppins'] leading-7">
                Responsabilité
              </span>
            </div>
          </div>

          {/* Agilité Card */}
          <div className="Frame170 size-64 px-12 py-28 inline-flex flex-col justify-start items-start gap-2.5">
            <Image
              src="/assets/unsplash/agilite.png"
              alt="Agilité"
              width={265}
              height={265}
              className="SaffuE4kkgi4ogauUnsplash size-64 rounded-3xl"
            />
            <div className="Rectangle299 size-64 opacity-50 bg-P3---C4 rounded-3xl" />
            <div className="Frame169 w-40 h-12 px-10 py-2 bg-white rounded-lg inline-flex justify-center items-center gap-2.5">
              <span className="Agilit text-P3---C4 text-2xl font-bold font-['Poppins'] leading-7">
                Agilité
              </span>
            </div>
          </div>

          {/* Respect Card */}
          <div className="Frame172 size-64 px-12 py-28 inline-flex flex-col justify-start items-start gap-2.5">
            <Image
              src="/assets/unsplash/respect.png"
              alt="Respect"
              width={265}
              height={265}
              className="TiagoFelipeFerreiraSajkxozxpskUnsplash size-64 rounded-3xl"
            />
            <div className="Rectangle300 size-64 opacity-50 bg-P2---C2 rounded-3xl" />
            <div className="Frame171 w-40 h-12 px-8 py-2 bg-purple-100 rounded-lg inline-flex justify-center items-center gap-2.5">
              <span className="Respect text-P2---C1 text-2xl font-bold font-['Poppins'] leading-7">
                Respect
              </span>
            </div>
          </div>

          {/* Durabilité Card */}
          <div className="Frame174 size-64 px-12 py-28 inline-flex flex-col justify-start items-start gap-2.5">
            <Image
              src="/assets/unsplash/durabilite.png"
              alt="Durabilité"
              width={265}
              height={265}
              className="VentiViewsXpclvenuytyUnsplash size-64 rounded-3xl"
            />
            <div className="Rectangle301 size-64 opacity-50 bg-P3---C5 rounded-3xl" />
            <div className="Frame173 w-40 h-12 px-5 py-2 bg-neutral-50 rounded-lg inline-flex justify-center items-center gap-2.5">
              <span className="Durabilit text-P3---C5 text-2xl font-bold font-['Poppins'] leading-7">
                Durabilité
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NosValeursSection;