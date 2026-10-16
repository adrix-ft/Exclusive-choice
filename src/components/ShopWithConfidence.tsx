import React from 'react';
import { useCart } from '../context/CartContext';
import { ShieldCheck, Video, CreditCard, ArrowRight, Check } from 'lucide-react';

export const ShopWithConfidence: React.FC = () => {
  const { setIsCodModalOpen, setIsVideoModalOpen } = useCart();

  const handleShopNow = () => {
    const target = document.getElementById('hot-selling');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-neutral-100">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-14">
        <div className="relative overflow-hidden rounded-3xl bg-[#090b0e] border border-neutral-800 text-white p-8 sm:p-12 lg:p-14 shadow-2xl">
          
          {/* Subtle gold radiance in center */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-amber-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-900 border border-neutral-700/80 text-[11px] font-semibold tracking-widest text-emerald-400 uppercase mb-4">
              <span className="text-amber-400">★</span>
              <span>TRUSTED SHOPPING EXPERIENCE</span>
            </div>

            {/* Main Headline with Confidence in gold */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              <span>Shop With </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffd84a] via-[#f7cb38] to-[#e6b325]">
                Confidence
              </span>
            </h2>

            <p className="mt-3 text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto font-light">
              Premium watches & eyewear with a shopping experience you can trust.
            </p>

            {/* 3 Value Proposition Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-10 text-left">
              
              {/* Feature 1 */}
              <div 
                onClick={() => setIsCodModalOpen(true)}
                className="bg-neutral-900/90 hover:bg-neutral-800/90 border border-neutral-800 hover:border-neutral-700 rounded-2xl p-5 transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-amber-400 mb-3 group-hover:scale-105 transition-transform">
                  <CreditCard size={20} />
                </div>
                <h4 className="text-sm font-bold text-white">
                  ₹99 Advance for COD
                </h4>
                <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                  Confirm your Cash on Delivery order with just ₹99 advance.
                </p>
              </div>

              {/* Feature 2 */}
              <div 
                onClick={() => setIsVideoModalOpen(true)}
                className="bg-neutral-900/90 hover:bg-neutral-800/90 border border-neutral-800 hover:border-neutral-700 rounded-2xl p-5 transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-105 transition-transform">
                  <Video size={20} />
                </div>
                <h4 className="text-sm font-bold text-white">
                  Live Video Call Available
                </h4>
                <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                  Want to see the product before ordering? Connect with us live.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-5">
                <div className="w-10 h-10 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-amber-400 mb-3">
                  <ShieldCheck size={20} />
                </div>
                <h4 className="text-sm font-bold text-white">
                  Secure & Trusted
                </h4>
                <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                  Shop confidently with a simple and transparent buying experience.
                </p>
              </div>

            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleShopNow}
                className="w-full sm:w-auto bg-[#f0df8d] hover:bg-[#ffe677] text-neutral-950 font-bold text-xs sm:text-sm px-8 py-3.5 rounded-full flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <span>Shop Now</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="w-full sm:w-auto bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-semibold text-xs sm:text-sm px-7 py-3.5 rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Video size={16} className="text-red-400" />
                <span>Live Video Call</span>
              </button>
            </div>

            {/* Footer Trust Indicators */}
            <div className="mt-8 pt-6 border-t border-neutral-800/80 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-[11px] sm:text-xs text-neutral-400 font-medium">
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-emerald-400" /> COD Available
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-emerald-400" /> ₹99 Order Confirmation
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-emerald-400" /> Live Assistance
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
