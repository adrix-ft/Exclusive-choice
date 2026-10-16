import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Search, User, ShoppingBag, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeaderProps {
  onCategorySelect?: (category: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onCategorySelect }) => {
  const { totalItems, setIsCartOpen, setIsCodModalOpen, setIsSearchModalOpen, isAuthModalOpen, setIsAuthModalOpen, user } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const [imgError, setImgError] = useState(false);

  const announcements = [
    'Confirm Your COD Order by Paying ₹99',
    'LIMITED TIME: Buy 2 Watches & Get 1 Sunglasses FREE',
    'Free Shipping on All Orders Across India',
  ];

  const handlePrevAnnouncement = () => {
    setAnnouncementIndex(prev => (prev === 0 ? announcements.length - 1 : prev - 1));
  };

  const handleNextAnnouncement = () => {
    setAnnouncementIndex(prev => (prev === announcements.length - 1 ? 0 : prev + 1));
  };

  const scrollTo = (id: string, category?: string) => {
    setMobileMenuOpen(false);
    if (category && onCategorySelect) {
      onCategorySelect(category);
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-neutral-100 shadow-2xs">
      {/* 1. Top Announcement Bar (Exact layout from image.png) */}
      <div className="bg-black text-white text-[12px] sm:text-[13px] font-medium py-2 px-3 sm:px-6 select-none">
        <div className="w-full flex items-center justify-between">
          <button 
            onClick={handlePrevAnnouncement}
            className="p-1 hover:text-neutral-300 transition-colors cursor-pointer text-white"
            aria-label="Previous announcement"
          >
            <ChevronLeft size={16} />
          </button>
          
          <button 
            onClick={() => setIsCodModalOpen(true)}
            className="flex items-center justify-center gap-1.5 font-bold tracking-tight hover:underline cursor-pointer text-center text-white"
          >
            {/* Shopping Cart / Card Icon prefix matching image.png */}
            <span className="text-sm">🛒</span>
            <span>{announcements[announcementIndex]}</span>
          </button>

          <button 
            onClick={handleNextAnnouncement}
            className="p-1 hover:text-neutral-300 transition-colors cursor-pointer text-white"
            aria-label="Next announcement"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-14">
        <div className="flex items-center justify-between h-22 sm:h-26">
          
          {/* Mobile Menu Hamburger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-800 hover:text-black focus:outline-hidden cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Left Brand Logo - Noticeably Bigger and Prominent */}
          <div className="flex-1 lg:flex-initial flex items-center justify-center lg:justify-start">
            <a href="#" className="flex flex-col items-center justify-center group cursor-pointer py-1">
              {!imgError ? (
                <img 
                  src="https://expensivechoice.in/cdn/shop/files/logo_expensiver-removebg-preview_1.png?height=200&v=1788266674" 
                  alt="EXPENSIVE CHOICE" 
                  className="h-16 sm:h-20 lg:h-22 w-auto max-w-[220px] sm:max-w-[260px] object-contain transition-transform group-hover:scale-105"
                  onError={() => setImgError(true)}
                />
              ) : (
                /* High-fidelity Vector Fallback matching the circular watch face logo */
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 border-black flex items-center justify-center relative mb-1">
                    {/* Top lug */}
                    <div className="absolute -top-1.5 w-3.5 h-1 bg-black rounded-xs"></div>
                    {/* Watch hands at 10:10 */}
                    <div className="w-3.5 h-0.5 bg-black origin-right -rotate-45 translate-x-[-1px]"></div>
                    <div className="w-4 h-0.5 bg-black origin-left rotate-45 translate-x-[1px]"></div>
                    {/* Center pin */}
                    <div className="absolute w-1.5 h-1.5 bg-black rounded-full"></div>
                    {/* Bottom lug */}
                    <div className="absolute -bottom-1.5 w-3.5 h-1 bg-black rounded-xs"></div>
                  </div>
                  <span className="font-extrabold text-[13px] sm:text-[14px] tracking-[0.2em] text-black uppercase font-sans">
                    EXPENSIVE CHOICE
                  </span>
                </div>
              )}
            </a>
          </div>

          {/* Center Navigation Links (Exact 7 items from image.png) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[13.5px] font-normal text-neutral-800">
            <button 
              onClick={() => scrollTo('hot-selling')} 
              className="hover:text-black transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <span>🔥</span>
              <span>Hot Selling</span>
            </button>

            <button 
              onClick={() => scrollTo('collections', 'mens')} 
              className="hover:text-black transition-colors cursor-pointer whitespace-nowrap"
            >
              Men's Watches
            </button>

            <button 
              onClick={() => scrollTo('collections', 'womens')} 
              className="hover:text-black transition-colors cursor-pointer whitespace-nowrap"
            >
              Women's Watches
            </button>

            <button 
              onClick={() => scrollTo('hot-selling')} 
              className="hover:text-black transition-colors cursor-pointer whitespace-nowrap"
            >
              Couple's Watches
            </button>

            <button 
              onClick={() => scrollTo('showcase')} 
              className="hover:text-black transition-colors cursor-pointer whitespace-nowrap"
            >
              Premium Watches
            </button>

            <button 
              onClick={() => scrollTo('sunglasses')} 
              className="hover:text-black transition-colors cursor-pointer whitespace-nowrap"
            >
              Sunglasses
            </button>

            <button 
              onClick={() => scrollTo('footer')} 
              className="hover:text-black transition-colors cursor-pointer whitespace-nowrap"
            >
              Contact Us
            </button>
          </nav>

          {/* Right Action Icons (Exact 3 icons from image.png: Search, Account, Bag) */}
          <div className="flex items-center gap-4 sm:gap-6 text-neutral-900">
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="p-1.5 hover:text-neutral-600 transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search size={21} strokeWidth={1.6} />
            </button>

            {/* Account Icon */}
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="p-1.5 hover:text-neutral-600 transition-colors cursor-pointer relative"
              aria-label={user ? `Signed in as ${user.name}` : 'Sign In / Account'}
              title={user ? `Signed in as ${user.name}` : 'Sign In / Account'}
            >
              <User size={21} strokeWidth={1.6} />
              {user && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full border border-white"></span>
              )}
            </button>

            {/* Shopping Bag Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-1.5 hover:text-neutral-600 transition-colors relative cursor-pointer"
              aria-label="Shopping bag"
            >
              <ShoppingBag size={21} strokeWidth={1.6} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-100 bg-white px-6 py-6 space-y-4 text-sm font-medium shadow-xl animate-fade-in">
          <div className="flex flex-col space-y-3.5">
            <button
              onClick={() => scrollTo('hot-selling')}
              className="flex items-center gap-2 py-2 text-left text-neutral-800 hover:text-black border-b border-neutral-100 cursor-pointer"
            >
              <span>🔥</span> Hot Selling
            </button>
            <button
              onClick={() => scrollTo('collections', 'mens')}
              className="py-2 text-left text-neutral-800 hover:text-black border-b border-neutral-100 cursor-pointer"
            >
              Men's Watches
            </button>
            <button
              onClick={() => scrollTo('collections', 'womens')}
              className="py-2 text-left text-neutral-800 hover:text-black border-b border-neutral-100 cursor-pointer"
            >
              Women's Watches
            </button>
            <button
              onClick={() => scrollTo('hot-selling')}
              className="py-2 text-left text-neutral-800 hover:text-black border-b border-neutral-100 cursor-pointer"
            >
              Couple's Watches
            </button>
            <button
              onClick={() => scrollTo('showcase')}
              className="py-2 text-left text-neutral-800 hover:text-black border-b border-neutral-100 cursor-pointer"
            >
              Premium Watches
            </button>
            <button
              onClick={() => scrollTo('sunglasses')}
              className="py-2 text-left text-neutral-800 hover:text-black border-b border-neutral-100 cursor-pointer"
            >
              Sunglasses
            </button>
            <button
              onClick={() => scrollTo('footer')}
              className="py-2 text-left text-neutral-800 hover:text-black cursor-pointer"
            >
              Contact Us
            </button>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsCodModalOpen(true);
              }}
              className="w-full bg-black text-white text-center py-3 rounded-lg font-semibold text-xs uppercase tracking-wider hover:bg-neutral-800 cursor-pointer"
            >
              Confirm COD Order (₹99 Advance)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
