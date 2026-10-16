import React, { useRef, useState } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/storeData';
import { ArrowRight, Volume2, VolumeX, Play, Pause } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setSelectedProductForModal } = useCart();
  const dayDateWatch = PRODUCTS.find(p => p.id === 'rolex-day-date-green-rose-gold') || PRODUCTS[0];
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleShopNow = () => {
    const target = document.getElementById('hot-selling');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWatchDetails = () => {
    setSelectedProductForModal(dayDateWatch);
  };

  return (
    <section className="relative overflow-hidden bg-black text-white w-full">
      {/* Video Hero Presentation */}
      <div className="relative w-full aspect-16/11 sm:aspect-16/9 md:aspect-21/9 min-h-[480px] sm:min-h-[580px] lg:min-h-[660px] flex items-center justify-center">
        
        {/* HTML5 Autoplaying Video */}
        <video
          ref={videoRef}
          src="https://cdn.shopify.com/videos/c/o/v/ea6b9db9ef834699823e9a30f301186f.mp4"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="auto"
          poster="https://expensivechoice.in/cdn/shop/files/rn-image_picker_lib_temp_b25b9540-9045-4193-a26e-b92a397a614e.jpg?v=1787242348&width=1200"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Gradient Scrim for luxury readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />

        {/* Foreground Action Overlay */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center mt-auto pb-10 sm:pb-14">
          <p className="text-xs sm:text-sm text-white/90 max-w-lg font-medium tracking-wider drop-shadow-md bg-black/30 backdrop-blur-xs px-4 py-1.5 rounded-full mb-2">
            The pinnacle of horological distinction • Olive green sunburst dial
          </p>

          {/* Action CTAs */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <button
              onClick={handleWatchDetails}
              className="w-full sm:w-auto bg-white hover:bg-neutral-100 text-black font-bold text-xs sm:text-sm uppercase tracking-wider px-7 py-3.5 rounded-full flex items-center justify-center gap-2 transition-all shadow-lg hover:scale-105 cursor-pointer"
            >
              <span>Explore Day-Date • Rs. 1,899</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={handleShopNow}
              className="w-full sm:w-auto bg-black/60 hover:bg-black/80 backdrop-blur-md text-white border border-white/30 font-semibold text-xs sm:text-sm uppercase tracking-wider px-7 py-3.5 rounded-full transition-all cursor-pointer"
            >
              Shop All Watches
            </button>
          </div>

        </div>

        {/* Floating Video Control Buttons (Play/Pause & Mute/Unmute) */}
        <div className="absolute bottom-5 right-5 z-20 flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-md"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
          </button>

          <button
            onClick={toggleMute}
            className="w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-md"
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
        </div>

      </div>
    </section>
  );
};
