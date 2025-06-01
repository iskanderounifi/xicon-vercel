import Image from "next/image";
import Link from "next/link";
export default function StatsSection() {
    return (
      <div className="w-full bg-white shadow-[0px_0px_50px_rgba(97.75,97.75,97.75,0.08)] py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          
          {/* Bloc 1 - Nos Projets */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-[84px] h-[84px] bg-[#EFFBFF] rounded-[12px] flex items-center justify-center">
              {/* Icon */}
             <Image src="/assets/icon/p.svg" alt="Flèche bas" width={40} height={40} />
            </div>
            <div className="text-[20px] font-bold text-[#1D1D1D]">Nos Projets</div>
            <div className="text-[40px] font-bold text-[#51B3D8]">+200</div>
          </div>
  
          {/* Bloc 2 - Satisfaction */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-[84px] h-[84px] bg-[#FFEDED] rounded-[12px] flex items-center justify-center">
              <Image src="/assets/icon/s.svg" alt="Flèche bas" width={40} height={40} />
            </div>
            <div className="text-[20px] font-bold text-[#1D1D1D]">Satisfaction</div>
            <div className="text-[40px] font-bold text-[#F26D6E]">94%</div>
          </div>
  
          {/* Bloc 3 - Experts */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-[84px] h-[84px] bg-[#FFEEEA] rounded-[12px] flex items-center justify-center">
             <Image src="/assets/icon/e.svg" alt="Flèche bas" width={40} height={40} />
            </div>
            <div className="text-[20px] font-bold text-[#1D1D1D]">Experts</div>
            <div className="text-[40px] font-bold text-[#F1836A]">15</div>
          </div>
  
          {/* Bloc 4 - Collaborateurs */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-[84px] h-[84px] bg-[#E9F6EF] rounded-[12px] flex items-center justify-center">
              <Image src="/assets/icon/c.svg" alt="Flèche bas" width={40} height={40} />
            </div>
            <div className="text-[20px] font-bold text-[#1D1D1D]">Collaborateurs</div>
            <div className="text-[40px] font-bold text-[#64BC91]">+30</div>
          </div>
  
        </div>
      </div>
    );
  }
  