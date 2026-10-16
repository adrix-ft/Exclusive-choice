import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Gift, Check, Shield } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    watchesCount,
    hasFreeSunglasses,
    isCartOpen,
    setIsCartOpen,
    setIsCodModalOpen,
  } = useCart();

  if (!isCartOpen) return null;

  const handleCheckoutCOD = () => {
    setIsCartOpen(false);
    setIsCodModalOpen(true);
  };

  const neededForFreeSunglasses = Math.max(0, 2 - watchesCount);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Drawer Header */}
          <div className="p-4 sm:p-6 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-black" />
              <h2 className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight">
                Your Shopping Bag ({totalItems})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-neutral-400 hover:text-black rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Special Offer Progress Banner */}
          <div className="bg-amber-50 border-b border-amber-200/70 p-3.5 text-xs">
            <div className="flex items-center gap-2 font-semibold text-amber-900">
              <Gift size={15} className="text-amber-600 shrink-0" />
              {hasFreeSunglasses ? (
                <span className="flex items-center gap-1 text-emerald-800">
                  <Check size={14} className="text-emerald-600 font-bold" />
                  Unlocked: 1 Designer Sunglasses FREE with your order!
                </span>
              ) : (
                <span>
                  Add {neededForFreeSunglasses} more watch{neededForFreeSunglasses > 1 ? 'es' : ''} to unlock FREE Sunglasses!
                </span>
              )}
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-amber-200/80 rounded-full h-1.5 mt-2 overflow-hidden">
              <div
                className="bg-amber-600 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (watchesCount / 2) * 100)}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-neutral-500 py-12">
                <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mb-4">
                  <ShoppingBag size={28} />
                </div>
                <p className="text-base font-semibold text-neutral-800">Your bag is empty</p>
                <p className="text-xs text-neutral-500 mt-1 max-w-xs">
                  Browse our hot selling watches and designer eyewear collections.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 bg-black text-white text-xs font-semibold px-6 py-2.5 rounded-full hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3 bg-neutral-50/80 rounded-xl border border-neutral-200/70 relative"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-20 h-20 rounded-lg object-cover bg-white border border-neutral-200 shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs font-bold text-neutral-900 uppercase line-clamp-2 leading-snug">
                          {product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="text-neutral-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <p className="text-[11px] text-neutral-500 mt-0.5">
                        Brand: {product.brand}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity stepper */}
                      <div className="flex items-center border border-neutral-300 rounded-lg bg-white">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="p-1 hover:bg-neutral-100 text-neutral-600 rounded-l-lg cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-2.5 text-xs font-semibold text-neutral-800">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="p-1 hover:bg-neutral-100 text-neutral-600 rounded-r-lg cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Line Item Total */}
                      <div className="text-right">
                        <p className="text-xs font-bold text-neutral-900">
                          Rs. {(product.price * quantity).toLocaleString('en-IN')}.00
                        </p>
                        <p className="text-[10px] text-neutral-400 line-through">
                          Rs. {(product.originalPrice * quantity).toLocaleString('en-IN')}.00
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* If eligible for free sunglasses bonus banner */}
            {hasFreeSunglasses && (
              <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900">
                <Gift size={20} className="text-emerald-600 shrink-0" />
                <div className="text-xs">
                  <p className="font-bold">Complimentary Sunglasses Included</p>
                  <p className="text-[11px] text-emerald-700">Will be dispatched free with your 2 watches order!</p>
                </div>
              </div>
            )}
          </div>

          {/* Drawer Footer / Checkout CTA */}
          {items.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-neutral-200 bg-neutral-50/80 space-y-3">
              <div className="flex justify-between text-xs text-neutral-500">
                <span>Subtotal</span>
                <span className="font-bold text-neutral-900 text-sm">
                  Rs. {subtotal.toLocaleString('en-IN')}.00
                </span>
              </div>
              <div className="flex justify-between text-xs text-neutral-500">
                <span>Shipping</span>
                <span className="text-emerald-600 font-semibold">FREE (All India)</span>
              </div>
              
              <div className="pt-2 border-t border-neutral-200 space-y-2">
                {/* Pay Online Button */}
                <button
                  onClick={handleCheckoutCOD}
                  className="w-full bg-black hover:bg-neutral-800 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-between text-xs sm:text-sm tracking-wide transition-all shadow-md cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Pay Online (UPI / Cards) • Rs. {subtotal.toLocaleString('en-IN')}</span>
                  </span>
                  <ArrowRight size={16} />
                </button>

                {/* COD ₹99 Advance Button */}
                <button
                  onClick={handleCheckoutCOD}
                  className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border border-neutral-300 font-semibold py-2.5 px-4 rounded-xl flex items-center justify-between text-xs tracking-wide transition-all cursor-pointer"
                >
                  <span>Cash on Delivery (Pay ₹99 Advance)</span>
                  <span className="text-neutral-500 text-[11px]">COD →</span>
                </button>

                <p className="text-[10.5px] text-center text-neutral-500 mt-1 flex items-center justify-center gap-1">
                  <Shield size={12} className="text-emerald-600" />
                  100% Encrypted & Safe • Cards, UPI, NetBanking or COD ₹99
                </p>
              </div>

              <button
                onClick={clearCart}
                className="w-full text-center text-[11px] text-neutral-400 hover:text-neutral-700 underline pt-1 cursor-pointer"
              >
                Clear Bag
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
