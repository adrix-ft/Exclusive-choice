import React from 'react';

const BRANDS = [
  'ROLEX',
  'RADO',
  'FOSSIL',
  'TISSOT',
  'G-SHOCK',
  'OMEGA',
  'TAG HEUER',
  'CARTIER',
  'HUBLOT',
  'SEIKO',
  'ARMANI EXCHANGE',
  'OAKLEY',
  'PATEK PHILIPPE',
  'AUDEMARS PIGUET'
];

export const BrandMarquee: React.FC = () => {
  return (
    <div className="bg-black text-white py-3.5 overflow-hidden border-y border-neutral-800 select-none">
      <div className="flex whitespace-nowrap overflow-hidden">
        <div className="animate-marquee flex items-center gap-8 text-[12px] sm:text-[13px] font-bold tracking-[0.25em] text-neutral-300 uppercase">
          {BRANDS.concat(BRANDS).map((brand, idx) => (
            <React.Fragment key={idx}>
              <span className="hover:text-amber-400 transition-colors cursor-default">
                {brand}
              </span>
              <span className="text-neutral-600 text-xs">•</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
