import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ExploreCollectionsProps {
  onSelectCategory?: (category: string) => void;
}

export const ExploreCollections: React.FC<ExploreCollectionsProps> = ({ onSelectCategory }) => {
  const collections = [
    {
      title: "2 Men's Watches",
      categoryKey: 'mens',
      image: 'https://expensivechoice.in/cdn/shop/collections/download.jpg?v=1787230220&width=1200',
      subtitle: 'Chronographs, automatic movements, and luxury stainless steel'
    },
    {
      title: "Women's Watches",
      categoryKey: 'womens',
      image: 'https://expensivechoice.in/cdn/shop/collections/Elegant_Wrist.jpg?v=1787231068&width=1200',
      subtitle: 'Graceful dials, diamond bezels, and rose gold finishes'
    }
  ];

  const handleCardClick = (cat: string) => {
    if (onSelectCategory) {
      onSelectCategory(cat);
    }
    const target = document.getElementById('hot-selling');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="collections" className="py-12 sm:py-16 bg-white">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-14">
        
        {/* Section Heading */}
        <div className="mb-6 sm:mb-8">
          <h3 className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-neutral-500 uppercase">
            EXPLORE OUR COLLECTIONS
          </h3>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {collections.map((col, idx) => (
            <div
              key={idx}
              onClick={() => handleCardClick(col.categoryKey)}
              className="group cursor-pointer flex flex-col"
            >
              <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-neutral-100 border border-neutral-200/80 shadow-xs group-hover:shadow-lg transition-all duration-300">
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                
                {/* Floating pill tag */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-xs p-2 rounded-full text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                  <ArrowUpRight size={18} />
                </div>
              </div>

              {/* Title under card */}
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <h4 className="text-base sm:text-lg font-medium text-neutral-900 group-hover:text-black transition-colors">
                    {col.title}
                  </h4>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {col.subtitle}
                  </p>
                </div>
                <span className="text-xs text-neutral-400 group-hover:text-neutral-900 font-medium group-hover:underline flex items-center gap-1">
                  Shop Now
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
