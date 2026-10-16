import React from 'react';

interface BrandPartnersProps {
  onBrandClick?: (brand: string) => void;
}

export const BrandPartners: React.FC<BrandPartnersProps> = ({ onBrandClick }) => {
  const partners = [
    {
      name: 'ROLEX',
      sub: '',
      logo: (
        <div className="flex flex-col items-center">
          <svg className="w-8 h-8 text-amber-500 mb-1" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l2.5 5.5L20 4l-2 8H6L4 4l5.5 3.5L12 2zm-7 14h14v2H5v-2zm2 3h10v2H7v-2z" />
          </svg>
          <span className="font-serif-luxury font-bold tracking-[0.25em] text-lg text-neutral-800">
            ROLEX
          </span>
        </div>
      )
    },
    {
      name: 'RADO',
      sub: 'SWITZERLAND',
      logo: (
        <div className="flex flex-col items-center">
          <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-white mb-1 shadow-xs">
            <span className="text-[10px] font-black">⚓</span>
          </div>
          <span className="font-extrabold tracking-[0.2em] text-lg text-neutral-900 font-sans">
            RADO
          </span>
          <span className="text-[9px] tracking-[0.3em] text-neutral-400 font-semibold uppercase">
            SWITZERLAND
          </span>
        </div>
      )
    },
    {
      name: 'FOSSIL',
      sub: '',
      logo: (
        <div className="flex flex-col items-center">
          <span className="font-black tracking-[0.18em] text-xl text-neutral-900 font-sans">
            FOSSIL
          </span>
        </div>
      )
    },
    {
      name: 'TISSOT',
      sub: '',
      logo: (
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold text-red-600 mb-0.5 tracking-widest">T+</span>
          <span className="font-black tracking-[0.22em] text-xl text-neutral-900 font-sans">
            TISSOT
          </span>
        </div>
      )
    },
    {
      name: 'G-SHOCK',
      sub: '',
      logo: (
        <div className="flex flex-col items-center">
          <span className="font-black tracking-[0.2em] text-xl text-neutral-900 uppercase">
            G-SHOCK
          </span>
        </div>
      )
    },
    {
      name: 'OMEGA',
      sub: '',
      logo: (
        <div className="flex flex-col items-center">
          <span className="text-2xl font-serif text-red-600 leading-none mb-1">Ω</span>
          <span className="font-bold tracking-[0.25em] text-lg text-neutral-900 font-serif-luxury">
            OMEGA
          </span>
        </div>
      )
    }
  ];

  const handleClick = (brandName: string) => {
    if (onBrandClick) {
      onBrandClick(brandName);
    }
    const target = document.getElementById('hot-selling');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-white border-t border-neutral-100">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-14">
        
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-base sm:text-lg font-bold tracking-[0.15em] text-neutral-900 uppercase">
            <span>OUR PARTNERS</span>
            <span className="text-amber-500">......</span>
          </h2>
          <p className="text-xs text-neutral-500 mt-1">
            Trusted brands. Timeless style.
          </p>
        </div>

        {/* 6-box 3x2 Grid (matches screenshot) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {partners.map((partner, idx) => (
            <div
              key={idx}
              onClick={() => handleClick(partner.name)}
              className="bg-neutral-50/70 hover:bg-neutral-100/90 border border-neutral-200/90 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center min-h-[120px] sm:min-h-[140px] cursor-pointer transition-all duration-300 hover:shadow-md group"
            >
              <div className="group-hover:scale-105 transition-transform duration-300">
                {partner.logo}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
