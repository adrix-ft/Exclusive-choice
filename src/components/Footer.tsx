import React, { useState } from 'react';
import { ArrowRight, Instagram, Check, Shield, Clock, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Footer: React.FC = () => {
  const { setIsSearchModalOpen, setIsCodModalOpen, setIsVideoModalOpen } = useCart();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 3000);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-[#0b0d10] text-neutral-300 border-t border-neutral-800 pt-14 pb-8">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-14">
        
        {/* Main 3-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 pb-12 border-b border-neutral-800">
          
          {/* Col 1: Explore Collection */}
          <div>
            <h4 className="text-white text-sm font-bold tracking-wider uppercase mb-5">
              Explore Collection
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <button onClick={() => scrollTo('hot-selling')} className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer">
                  <span>🔥</span> Hot Selling
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('collections')} className="hover:text-white transition-colors cursor-pointer">
                  Men's Watches
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('collections')} className="hover:text-white transition-colors cursor-pointer">
                  Women's Watches
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('hot-selling')} className="hover:text-white transition-colors cursor-pointer">
                  Couple's Watches
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('showcase')} className="hover:text-white transition-colors cursor-pointer">
                  Premium Watches
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('sunglasses')} className="hover:text-white transition-colors cursor-pointer">
                  Sunglasses
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Customer Care */}
          <div>
            <h4 className="text-white text-sm font-bold tracking-wider uppercase mb-5">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <button onClick={() => setIsSearchModalOpen(true)} className="hover:text-white transition-colors cursor-pointer">
                  Search
                </button>
              </li>
              <li>
                <button onClick={() => setIsVideoModalOpen(true)} className="hover:text-white transition-colors cursor-pointer">
                  Live Video Call
                </button>
              </li>
              <li>
                <button onClick={() => setIsCodModalOpen(true)} className="hover:text-white transition-colors cursor-pointer">
                  COD Order Policy (₹99 Advance)
                </button>
              </li>
              <li>
                <a
                  href="https://api.whatsapp.com/send?phone=917906568743&text=Hi%20Expensive%20Choice%20Support"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 text-emerald-500 font-medium"
                >
                  <span>WhatsApp: +91 7906568743</span>
                </a>
              </li>
              <li>
                <a href="#footer" className="hover:text-white transition-colors">
                  Shipping & Delivery (3-5 Days)
                </a>
              </li>
              <li>
                <a href="#footer" className="hover:text-white transition-colors">
                  7-Day Replacement Policy
                </a>
              </li>
              <li>
                <a href="#footer" className="hover:text-white transition-colors">
                  Terms of Service & Privacy
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Join our email list */}
          <div>
            <h4 className="text-white text-sm font-bold tracking-wider uppercase mb-2">
              Join our email list
            </h4>
            <p className="text-xs text-neutral-400 mb-4 font-light">
              Be the first to know about new luxury drops, limited time flash sales, and VIP discounts.
            </p>

            <form onSubmit={handleSubscribe} className="relative max-w-sm">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 text-xs rounded-full py-3 pl-4 pr-12 focus:outline-hidden focus:border-white transition-colors"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white text-black hover:bg-neutral-200 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ArrowRight size={14} />
              </button>
            </form>

            {subscribed && (
              <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
                <Check size={12} /> Thank you for subscribing!
              </p>
            )}

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

        </div>

        {/* Value Badges Row */}
        <div className="py-6 border-b border-neutral-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <Truck size={16} className="text-amber-400 shrink-0" />
            <span>All India Express Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-emerald-400 shrink-0" />
            <span>1 Year Movement Warranty</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-blue-400 shrink-0" />
            <span>Live Video Call Support</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-400 shrink-0">₹99</span>
            <span>Advance COD Confirmation</span>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 gap-4">
          <p>© 2026, Expensive Choice. All rights reserved.</p>
          <p className="tracking-widest uppercase">Luxury Watches & Eyewear Store</p>
        </div>

      </div>
    </footer>
  );
};
