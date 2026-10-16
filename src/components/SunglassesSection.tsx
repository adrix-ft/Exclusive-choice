import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS, Product } from '../data/storeData';
import { ShoppingBag, Eye, Zap, Check } from 'lucide-react';

export const SunglassesSection: React.FC = () => {
  const { addToCart, setSelectedProductForModal, setCheckoutProduct, setIsCodModalOpen } = useCart();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [addedId, setAddedId] = useState<string | null>(null);

  const sunglasses = PRODUCTS.filter(p => p.category === 'sunglasses');

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  const handleInstantBuy = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    setCheckoutProduct(product);
    setIsCodModalOpen(true);
  };

  const formatPrice = (price: number) => {
    return `Rs. ${price.toLocaleString('en-IN')}.00`;
  };

  return (
    <section id="sunglasses" className="py-12 sm:py-16 bg-white border-t border-neutral-100">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-14">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-neutral-100">
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight uppercase">
            SUNGLASSES
          </h2>

          <span className="text-xs sm:text-sm font-medium text-neutral-600 hover:text-black underline underline-offset-4 cursor-pointer">
            View all
          </span>
        </div>

        {/* 4-column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {sunglasses.map((item) => {
            const isHovered = hoveredId === item.id;
            const isJustAdded = addedId === item.id;
            const primaryImage = item.images[0];
            const secondaryImage = item.images[1] || primaryImage;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedProductForModal(item)}
                className="group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-neutral-50 border border-neutral-200/90 shadow-2xs group-hover:shadow-md transition-all duration-300">
                    
                    {/* Sale Badge */}
                    {item.isSale && (
                      <span className="absolute top-2.5 right-2.5 z-10 bg-white/95 text-neutral-800 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-neutral-200 shadow-xs">
                        Sale
                      </span>
                    )}

                    <img
                      src={isHovered ? secondaryImage : primaryImage}
                      alt={item.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Quick Action Overlay */}
                    <div className="absolute inset-x-2 bottom-2 hidden sm:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                      <button
                        onClick={(e) => handleAddToCart(e, item)}
                        className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg shadow-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                          isJustAdded ? 'bg-emerald-600 text-white' : 'bg-white text-black hover:bg-neutral-100'
                        }`}
                        title="Add to Cart"
                      >
                        {isJustAdded ? (
                          <>
                            <Check size={14} /> Added!
                          </>
                        ) : (
                          <>
                            <ShoppingBag size={14} /> Add
                          </>
                        )}
                      </button>

                      <button
                        onClick={(e) => handleInstantBuy(e, item)}
                        className="py-2 px-3 bg-black text-white hover:bg-neutral-800 text-xs font-semibold rounded-lg shadow-md flex items-center justify-center gap-1 transition-colors cursor-pointer"
                        title="Confirm COD for ₹99"
                      >
                        <Zap size={14} className="text-amber-400 fill-amber-400" />
                        <span>Buy ₹99</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProductForModal(item);
                        }}
                        className="p-2 bg-neutral-900/80 hover:bg-black text-white rounded-lg shadow-md transition-colors cursor-pointer"
                        title="Quick View"
                      >
                        <Eye size={14} />
                      </button>
                    </div>

                  </div>

                  <h3 className="mt-3 text-[12px] sm:text-[13px] font-semibold text-neutral-800 leading-snug line-clamp-2 uppercase tracking-wide group-hover:text-black">
                    {item.name}
                  </h3>
                </div>

                <div className="mt-2 flex flex-wrap items-baseline gap-2 text-[12px] sm:text-[13px]">
                  <span className="font-bold text-neutral-900">
                    {formatPrice(item.price)}
                  </span>
                  <span className="text-neutral-400 line-through text-[11px] sm:text-[12px]">
                    {formatPrice(item.originalPrice)}
                  </span>
                </div>

                {/* Mobile Quick Add */}
                <div className="mt-2.5 sm:hidden flex items-center gap-1.5">
                  <button
                    onClick={(e) => handleAddToCart(e, item)}
                    className="flex-1 py-1.5 bg-neutral-100 text-black text-xs font-semibold rounded-md border border-neutral-300"
                  >
                    {isJustAdded ? 'Added ✓' : '+ Add'}
                  </button>
                  <button
                    onClick={(e) => handleInstantBuy(e, item)}
                    className="py-1.5 px-3 bg-black text-white text-xs font-semibold rounded-md"
                  >
                    COD ₹99
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
