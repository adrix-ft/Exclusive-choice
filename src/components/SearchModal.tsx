import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS, Product } from '../data/storeData';
import { X, Search, ArrowRight } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { isSearchModalOpen, setIsSearchModalOpen, setSelectedProductForModal } = useCart();
  const [query, setQuery] = useState('');

  if (!isSearchModalOpen) return null;

  const filtered = query.trim()
    ? PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSelectProduct = (product: Product) => {
    setIsSearchModalOpen(false);
    setSelectedProductForModal(product);
  };

  const quickTags = ['Rolex', 'Tissot', 'Seiko', 'Hublot', 'Rayban', 'Gucci', 'Green Dial', 'Rose Gold'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={() => setIsSearchModalOpen(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
      />

      <div className="min-h-full flex items-start justify-center p-4 pt-16 sm:pt-24 text-center">
        <div className="relative bg-white rounded-3xl max-w-2xl w-full text-left overflow-hidden shadow-2xl border border-neutral-100 my-4">
          
          {/* Search Input Bar */}
          <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center gap-3">
            <Search size={22} className="text-neutral-400 shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Rolex, Tissot, Seiko, Sunglasses..."
              className="w-full text-sm sm:text-base text-neutral-900 placeholder-neutral-400 focus:outline-hidden"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-xs text-neutral-400 hover:text-black p-1"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsSearchModalOpen(false)}
              className="p-1.5 text-neutral-400 hover:text-black rounded-full hover:bg-neutral-100 cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-5 max-h-[60vh] overflow-y-auto">
            {/* Quick search tags */}
            {!query.trim() && (
              <div>
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2.5">
                  Popular Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {quickTags.map((tag, idx) => (
                    <button
                      key={idx}
                      onClick={() => setQuery(tag)}
                      className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs rounded-full transition-colors cursor-pointer"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search Results */}
            {query.trim() && (
              <div>
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
                  Found {filtered.length} Results
                </p>

                {filtered.length === 0 ? (
                  <p className="text-xs text-neutral-500 py-6 text-center">
                    No matching watches or eyewear found for "{query}".
                  </p>
                ) : (
                  <div className="space-y-2">
                    {filtered.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleSelectProduct(item)}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer border border-transparent hover:border-neutral-200"
                      >
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-14 h-14 rounded-lg object-cover bg-white border border-neutral-200 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-neutral-900 uppercase truncate">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-neutral-500 mt-0.5">
                            {item.brand} • {item.category === 'watch' ? 'Watch' : 'Eyewear'}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-bold text-neutral-900">
                              Rs. {item.price.toLocaleString('en-IN')}.00
                            </span>
                            <span className="text-[10px] text-neutral-400 line-through">
                              Rs. {item.originalPrice.toLocaleString('en-IN')}.00
                            </span>
                          </div>
                        </div>
                        <ArrowRight size={16} className="text-neutral-400 shrink-0 mr-2" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
