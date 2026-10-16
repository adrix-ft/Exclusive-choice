import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, ShoppingBag, ShieldCheck, Truck, RefreshCw, Zap, Check, Star, Video } from 'lucide-react';

export const ProductModal: React.FC = () => {
  const {
    selectedProductForModal,
    setSelectedProductForModal,
    addToCart,
    setCheckoutProduct,
    setIsCodModalOpen,
    setIsVideoModalOpen
  } = useCart();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [justAdded, setJustAdded] = useState(false);

  if (!selectedProductForModal) return null;

  const product = selectedProductForModal;

  const handleAddToCart = () => {
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  const handleBuyNow = () => {
    setCheckoutProduct(product);
    setSelectedProductForModal(null);
    setIsCodModalOpen(true);
  };

  const handleInspectLive = () => {
    setSelectedProductForModal(null);
    setIsVideoModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setSelectedProductForModal(null)}
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
      />

      <div className="min-h-full flex items-center justify-center p-4 sm:p-6 text-center">
        <div className="relative bg-white rounded-3xl max-w-4xl w-full text-left overflow-hidden shadow-2xl border border-neutral-100 my-8">
          
          {/* Close button */}
          <button
            onClick={() => setSelectedProductForModal(null)}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close product view"
          >
            <X size={20} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Left: Gallery Column */}
            <div className="p-6 bg-neutral-50 flex flex-col justify-between border-b md:border-b-0 md:border-r border-neutral-200">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white border border-neutral-200/90 shadow-xs">
                {product.isSale && (
                  <span className="absolute top-3 left-3 z-10 bg-black text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Special Sale
                  </span>
                )}
                <img
                  src={product.images[activeImageIdx] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                        activeImageIdx === idx ? 'border-black scale-95 shadow-xs' : 'border-neutral-200 hover:border-neutral-400'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Live Video Call Option Banner */}
              <div 
                onClick={handleInspectLive}
                className="mt-4 p-3 bg-white rounded-xl border border-emerald-200 text-xs flex items-center justify-between cursor-pointer hover:bg-emerald-50/50 transition-colors"
              >
                <div className="flex items-center gap-2 text-emerald-800">
                  <Video size={16} className="text-emerald-600" />
                  <span className="font-semibold">See this live on Video Call?</span>
                </div>
                <span className="text-emerald-700 font-bold underline">Connect Live</span>
              </div>
            </div>

            {/* Right: Info & Actions Column */}
            <div className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                {/* Brand & Stars */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-widest text-neutral-400 uppercase">
                    {product.brand}
                  </span>
                  <div className="flex items-center gap-1 text-emerald-600 text-xs font-semibold">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
                      ))}
                    </div>
                    <span className="text-neutral-700 ml-1">5.0 (37 Reviews)</span>
                  </div>
                </div>

                {/* Name */}
                <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 uppercase mt-2 tracking-tight leading-snug">
                  {product.name}
                </h2>

                {/* Pricing */}
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
                    Rs. {product.price.toLocaleString('en-IN')}.00
                  </span>
                  <span className="text-neutral-400 line-through text-sm sm:text-base font-normal">
                    Rs. {product.originalPrice.toLocaleString('en-IN')}.00
                  </span>
                  <span className="bg-red-50 text-red-600 text-xs font-bold px-2 py-0.5 rounded-md">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                </div>

                {/* COD ₹99 Highlight Alert */}
                <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-200/90 text-xs text-amber-900">
                  <p className="font-bold flex items-center gap-1.5">
                    <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                    Cash on Delivery (COD) Available!
                  </p>
                  <p className="text-[11px] text-amber-800 mt-1">
                    Book order with only <strong>₹99 advance</strong> to confirm your address. Pay the remaining <strong>Rs. {(product.price - 99).toLocaleString('en-IN')}</strong> upon delivery.
                  </p>
                </div>

                {/* Description */}
                <p className="mt-4 text-xs sm:text-[13px] text-neutral-600 leading-relaxed font-normal">
                  {product.description}
                </p>

                {/* Specs Table */}
                <div className="mt-5 border-t border-b border-neutral-100 py-3 space-y-1.5 text-xs">
                  {product.specs.movement && (
                    <div className="flex justify-between py-1">
                      <span className="text-neutral-500">Movement:</span>
                      <span className="font-semibold text-neutral-800">{product.specs.movement}</span>
                    </div>
                  )}
                  {product.specs.caseMaterial && (
                    <div className="flex justify-between py-1 border-t border-neutral-100">
                      <span className="text-neutral-500">Case Material:</span>
                      <span className="font-semibold text-neutral-800">{product.specs.caseMaterial}</span>
                    </div>
                  )}
                  {product.specs.strapMaterial && (
                    <div className="flex justify-between py-1 border-t border-neutral-100">
                      <span className="text-neutral-500">Strap / Bracelet:</span>
                      <span className="font-semibold text-neutral-800">{product.specs.strapMaterial}</span>
                    </div>
                  )}
                  {product.specs.glass && (
                    <div className="flex justify-between py-1 border-t border-neutral-100">
                      <span className="text-neutral-500">Glass Crystal:</span>
                      <span className="font-semibold text-neutral-800">{product.specs.glass}</span>
                    </div>
                  )}
                  {product.specs.warranty && (
                    <div className="flex justify-between py-1 border-t border-neutral-100">
                      <span className="text-neutral-500">Warranty:</span>
                      <span className="font-semibold text-neutral-800">{product.specs.warranty}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-2.5">
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-black hover:bg-neutral-800 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 text-sm uppercase tracking-wider transition-all shadow-md cursor-pointer"
                >
                  <Zap size={16} className="text-amber-400 fill-amber-400" />
                  <span>Buy Now • Instant Checkout / COD</span>
                </button>

                <button
                  onClick={handleAddToCart}
                  className={`w-full py-3 px-6 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all border cursor-pointer ${
                    justAdded
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white text-neutral-900 border-neutral-300 hover:bg-neutral-50'
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check size={16} /> Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={16} /> Add to Cart
                    </>
                  )}
                </button>
              </div>

              {/* Badges footer */}
              <div className="mt-6 pt-4 border-t border-neutral-100 grid grid-cols-3 gap-2 text-center text-[10px] text-neutral-500">
                <div className="flex flex-col items-center">
                  <Truck size={14} className="text-neutral-700 mb-1" />
                  <span>3-5 Days Delivery</span>
                </div>
                <div className="flex flex-col items-center">
                  <ShieldCheck size={14} className="text-neutral-700 mb-1" />
                  <span>100% Quality Checked</span>
                </div>
                <div className="flex flex-col items-center">
                  <RefreshCw size={14} className="text-neutral-700 mb-1" />
                  <span>Easy Replacement</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
