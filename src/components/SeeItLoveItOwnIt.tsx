import React, { useState, useRef, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { SHOWCASE_ITEMS, PRODUCTS } from '../data/storeData';
import { Play, Volume2, VolumeX, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useSwipeScroll } from '../hooks/useSwipeScroll';

export const SeeItLoveItOwnIt: React.FC = () => {
  const { setSelectedProductForModal, setCheckoutProduct, setIsCodModalOpen } = useCart();

  const {
    containerRef,
    activeIndex,
    wasSwiping,
    scrollPrev,
    scrollNext,
    scrollToIndex,
    swipeProps,
  } = useSwipeScroll({
    itemWidth: 260, // 240px card + 20px gap
    totalItems: SHOWCASE_ITEMS.length,
    snapOnRelease: true,
  });

  const [mutedStates, setMutedStates] = useState<{ [key: string]: boolean }>({
    'showcase-1': true,
    'showcase-2': true,
    'showcase-3': true,
    'showcase-4': true,
  });

  const [playingStates, setPlayingStates] = useState<{ [key: string]: boolean }>({
    'showcase-1': false,
    'showcase-2': false,
    'showcase-3': false,
    'showcase-4': false,
  });

  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  // Preload and prime videos on mount for zero-latency instant playback
  useEffect(() => {
    Object.keys(videoRefs.current).forEach((key) => {
      const vid = videoRefs.current[key];
      if (vid) {
        vid.preload = 'auto';
        vid.load();
      }
    });
  }, []);

  const handleCardClick = (productId: string) => {
    if (wasSwiping()) return;
    const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];
    setSelectedProductForModal(product);
  };

  const handleBuyNow = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    if (wasSwiping()) return;
    const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];
    setCheckoutProduct(product);
    setIsCodModalOpen(true);
  };

  const toggleSound = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (wasSwiping()) return;
    const video = videoRefs.current[id];
    if (video) {
      const nextMuted = !video.muted;
      video.muted = nextMuted;
      setMutedStates((prev) => ({ ...prev, [id]: nextMuted }));
    }
  };

  // Instant play on cursor hover (desktop)
  const handleMouseEnter = (id: string) => {
    const video = videoRefs.current[id];
    if (video) {
      video.play().then(() => {
        setPlayingStates((prev) => ({ ...prev, [id]: true }));
      }).catch((err) => {
        console.log('Video autoplay on hover prevented:', err);
      });
    }
  };

  // Instant pause when cursor moves out (desktop)
  const handleMouseLeave = (id: string) => {
    const video = videoRefs.current[id];
    if (video) {
      video.pause();
      setPlayingStates((prev) => ({ ...prev, [id]: false }));
    }
  };

  // Mobile tap-to-toggle playback (only fires when NOT swiping)
  const handleVideoTap = (id: string) => {
    if (wasSwiping()) return;
    const video = videoRefs.current[id];
    if (video) {
      if (video.paused) {
        video.play().then(() => {
          setPlayingStates((prev) => ({ ...prev, [id]: true }));
        }).catch(() => {});
      } else {
        video.pause();
        setPlayingStates((prev) => ({ ...prev, [id]: false }));
      }
    }
  };

  return (
    <section id="showcase" className="py-12 sm:py-16 md:py-20 bg-white border-t border-neutral-100 select-none">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-14">
        
        {/* Centered Heading */}
        <div className="text-center mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-[11px] font-semibold uppercase tracking-wider mb-2">
            <Sparkles size={12} className="text-amber-500" />
            <span>Real In-Hand Unboxing & Dials</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight font-serif-luxury">
            See It • Love It • Own It
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-neutral-500 tracking-wide font-normal">
            <span className="hidden md:inline">Hover over any showcase to play live video with sound</span>
            <span className="md:hidden">Swipe with your hand to browse live videos</span>
          </p>

          {/* Mobile Hand Swipe Indicator & Dot Navigation */}
          <div className="flex md:hidden items-center justify-center gap-3 mt-3">
            <button
              onClick={scrollPrev}
              className="p-1.5 rounded-full bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors cursor-pointer"
              aria-label="Previous video"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Interactive Swipe Dots */}
            <div className="flex items-center gap-1.5 px-2">
              {SHOWCASE_ITEMS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToIndex(i)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    activeIndex === i
                      ? 'w-6 h-1.5 bg-black'
                      : 'w-1.5 h-1.5 bg-neutral-300 hover:bg-neutral-400'
                  }`}
                  aria-label={`Go to video ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={scrollNext}
              className="p-1.5 rounded-full bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors cursor-pointer"
              aria-label="Next video"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Video Showcase: Horizontal Hand Swipe on Mobile (< md), Responsive Grid on Desktop (>= md) */}
        <div
          {...swipeProps}
          ref={containerRef}
          className="touch-swipe-container flex md:grid md:grid-cols-2 overflow-x-auto md:overflow-visible gap-4 sm:gap-6 md:gap-8 lg:gap-10 pb-4 md:pb-0 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 w-full"
        >
          {SHOWCASE_ITEMS.map((item) => {
            const isMuted = mutedStates[item.id] !== false;
            const isPlaying = playingStates[item.id] === true;

            return (
              <div
                key={item.id}
                className="w-[240px] sm:w-[280px] md:w-auto shrink-0 md:shrink flex flex-col select-none"
              >
                {/* Media Container with Compact Proportions on Mobile */}
                <div
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={() => handleMouseLeave(item.id)}
                  onClick={() => handleVideoTap(item.id)}
                  className="relative h-[340px] sm:h-[390px] md:h-auto md:aspect-4/5 w-full overflow-hidden rounded-2xl bg-neutral-950 border border-neutral-200 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  {/* HTML5 Preloaded Video (pointer-events-none ensures touch dragging triggers smooth swipe container) */}
                  <video
                    ref={(el) => {
                      videoRefs.current[item.id] = el;
                    }}
                    src={item.videoUrl}
                    loop
                    muted={isMuted}
                    playsInline
                    preload="auto"
                    poster={item.image}
                    className="pointer-events-none w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500 ease-out"
                  />

                  {/* Top Badges: Status Indicator & Sound Toggle */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10 pointer-events-none">
                    <div className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1.5 border border-white/10 shadow-xs">
                      <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-emerald-400 animate-ping' : 'bg-neutral-400'}`}></span>
                      <span>{isPlaying ? 'PLAYING' : 'TAP TO PLAY'}</span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => toggleSound(e, item.id)}
                      className="pointer-events-auto p-1.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-md"
                      aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
                      title={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} className="text-emerald-400" />}
                    </button>
                  </div>

                  {/* Centered Play Indicator (Hides when video is actively playing) */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${
                      isPlaying ? 'opacity-0' : 'opacity-100 bg-black/25'
                    }`}
                  >
                    <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play size={18} fill="white" className="ml-0.5" />
                    </div>
                  </div>

                  {/* Gradient bottom overlay with Watch/Eyewear Title & Price */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent p-3.5 sm:p-5 text-white pointer-events-none">
                    <div className="flex items-end justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs sm:text-base font-bold tracking-wide leading-tight truncate">
                          {item.title}
                        </h4>
                        <p className="text-[10.5px] sm:text-xs text-neutral-300 mt-0.5 truncate">
                          {item.subtitle}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs sm:text-sm font-extrabold text-amber-400">
                          {item.price}
                        </div>
                        <div className="text-[9.5px] sm:text-[11px] text-neutral-400 line-through">
                          {item.originalPrice}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Buttons: View Details & Buy Now */}
                <div className="mt-2.5 sm:mt-3 flex items-center gap-2">
                  <button
                    onClick={() => handleCardClick(item.productId)}
                    className="flex-1 py-1.5 sm:py-2 px-2.5 sm:px-3 text-[11px] sm:text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors text-center cursor-pointer"
                  >
                    View Details
                  </button>
                  <button
                    onClick={(e) => handleBuyNow(e, item.productId)}
                    className="flex-1 py-1.5 sm:py-2 px-2.5 sm:px-3 text-[11px] sm:text-xs font-semibold text-white bg-black hover:bg-neutral-800 rounded-lg transition-colors text-center cursor-pointer shadow-xs"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Assurance */}
        <div className="mt-6 sm:mt-8 pt-4 border-t border-neutral-100 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-neutral-600 text-[11px] sm:text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>100% Exact Live Video Of Delivered Product</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>All Chronograph Working • Master Quality</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Free Express Shipping Across India</span>
          </div>
        </div>

      </div>
    </section>
  );
};
