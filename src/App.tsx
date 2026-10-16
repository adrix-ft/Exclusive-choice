import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BrandMarquee } from './components/BrandMarquee';
import { ExploreCollections } from './components/ExploreCollections';
import { HotSelling } from './components/HotSelling';
import { PromoBanner } from './components/PromoBanner';
import { SunglassesSection } from './components/SunglassesSection';
import { SeeItLoveItOwnIt } from './components/SeeItLoveItOwnIt';
import { CustomerReviews } from './components/CustomerReviews';
import { ShopWithConfidence } from './components/ShopWithConfidence';
import { BrandPartners } from './components/BrandPartners';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductModal } from './components/ProductModal';
import { CodModal } from './components/CodModal';
import { LiveVideoModal } from './components/LiveVideoModal';
import { SearchModal } from './components/SearchModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { AuthModal } from './components/AuthModal';

const StoreContent: React.FC = () => {
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string | null>(null);

  const handleSelectCategory = (category: string) => {
    setSelectedCategoryFilter(category);
  };

  const handleClearFilter = () => {
    setSelectedCategoryFilter(null);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col font-sans selection:bg-neutral-900 selection:text-white">
      {/* 1. Header with announcement bar */}
      <Header onCategorySelect={handleSelectCategory} />

      <main className="flex-1">
        {/* 2. Hero Section: Oyster Perpetual Day-Date 36 */}
        <Hero />

        {/* 3. Infinite Luxury Brand Ribbon Marquee */}
        <BrandMarquee />

        {/* 4. Explore Our Collections: 2 Men's Watches & Women's Watches */}
        <ExploreCollections onSelectCategory={handleSelectCategory} />

        {/* 5. 1 Hot Selling 🔥 Watches */}
        <HotSelling
          selectedCategoryFilter={selectedCategoryFilter}
          onClearFilter={handleClearFilter}
        />

        {/* 6. Promotional Special Offer Banner: Buy 2 Watches Get 1 Sunglasses Free */}
        <PromoBanner />

        {/* 7. Sunglasses Collection */}
        <SunglassesSection />

        {/* 8. See It • Love It • Own It Showcase */}
        <SeeItLoveItOwnIt />

        {/* 9. Judgeme Customer Reviews Carousel */}
        <CustomerReviews />

        {/* 10. Shop With Confidence Value Props & ₹99 COD banner */}
        <ShopWithConfidence />

        {/* 11. Our Partners Brand Showcase */}
        <BrandPartners onBrandClick={(brand) => setSelectedCategoryFilter(brand.toLowerCase())} />
      </main>

      {/* 12. Footer with customer care and newsletter */}
      <Footer />

      {/* Interactive Global Modals & Drawers */}
      <CartDrawer />
      <ProductModal />
      <CodModal />
      <LiveVideoModal />
      <SearchModal />
      <WhatsAppFloatingButton />
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <StoreContent />
    </CartProvider>
  );
}
