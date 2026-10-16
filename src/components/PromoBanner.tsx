import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export const PromoBanner: React.FC = () => {
  const handleShopNow = () => {
    const target = document.getElementById('sunglasses');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-6 sm:py-8 bg-neutral-100">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-14">
        <div className="relative overflow-hidden rounded-2xl bg-[#0c0d0e] border border-neutral-800 shadow-xl px-6 py-6 sm:py-8 text-white">
          
          {/* Subtle glow effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-24 bg-amber-500/10 blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            
            {/* Left Watch Thumbnail Group */}
            <div className="hidden sm:flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl bg-neutral-900 border border-neutral-700/80 p-1 flex items-center justify-center shadow-md">
                <img
                  src="https://expensivechoice.in/cdn/shop/files/rn-image_picker_lib_temp_898bdf3c-cbc1-4382-bde7-989d8c4cdf8f.jpg?v=1787242348&width=352"
                  alt="Gold watch"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <span className="text-xl text-neutral-500 font-light">+</span>
              <div className="w-14 h-14 rounded-xl bg-neutral-900 border border-neutral-700/80 p-1 flex items-center justify-center shadow-md">
                <img
                  src="https://expensivechoice.in/cdn/shop/files/rn-image_picker_lib_temp_2f1bfabf-a6a9-479b-b496-3b3e80a172f8.jpg?v=1787818137&width=352"
                  alt="Silver watch"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Center Messaging */}
            <div className="text-center md:text-left flex flex-col items-center md:items-start">
              <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-[0.25em] text-neutral-400 uppercase">
                <Sparkles size={13} className="text-amber-400" />
                <span>LIMITED TIME OFFER</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-wider uppercase text-white mt-0.5">
                BUY 2 WATCHES
              </h3>
              <p className="text-xs sm:text-sm font-bold tracking-widest text-amber-400 uppercase mt-0.5">
                GET 1 SUNGLASSES FREE
              </p>
            </div>

            {/* Right Sunglasses + Shop Now CTA */}
            <div className="flex items-center gap-4">
              <div className="hidden lg:block w-16 h-12 rounded-lg bg-neutral-900 border border-neutral-700/70 p-1">
                <img
                  src="https://expensivechoice.in/cdn/shop/files/77AFEBC0-CDBB-4790-B956-4A3926C97954.jpg?v=1787792506&width=352"
                  alt="Free sunglasses gift"
                  className="w-full h-full object-cover rounded"
                />
              </div>

              <button
                onClick={handleShopNow}
                className="bg-[#f0df8d] hover:bg-[#ffe677] text-neutral-950 font-bold text-xs sm:text-sm px-6 py-3 rounded-full flex items-center gap-2 transition-all shadow-md hover:shadow-amber-400/20 cursor-pointer whitespace-nowrap"
              >
                <span>Shop Now</span>
                <ArrowRight size={16} />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
