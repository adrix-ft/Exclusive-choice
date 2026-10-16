import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Send, Video, ShieldCheck, MessageCircle } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  const { setIsCodModalOpen, setIsVideoModalOpen } = useCart();
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    const encoded = encodeURIComponent(message);
    window.open(`https://api.whatsapp.com/send?phone=917906568743&text=${encoded}`, '_blank');
    setMessage('');
  };

  const handleQuickPrompt = (text: string) => {
    if (text.includes('COD')) {
      setIsCodModalOpen(true);
      setChatOpen(false);
    } else if (text.includes('Video')) {
      setIsVideoModalOpen(true);
      setChatOpen(false);
    } else {
      const encoded = encodeURIComponent(text);
      window.open(`https://api.whatsapp.com/send?phone=917906568743&text=${encoded}`, '_blank');
    }
  };

  return (
    <div className="fixed bottom-6 right-5 z-40">
      
      {/* Floating Green WhatsApp Button */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 cursor-pointer relative group"
          aria-label="Chat on WhatsApp"
        >
          {/* Real WhatsApp SVG icon */}
          <svg
            className="w-7 h-7 sm:w-8 sm:h-8 fill-current"
            viewBox="0 0 90 90"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M90 43.841c0 24.213-19.779 43.841-44.182 43.841a44.256 44.256 0 0 1-21.357-5.455L0 90l7.975-23.522a43.38 43.38 0 0 1-6.34-22.637C1.635 19.628 21.416 0 45.818 0 70.223 0 90 19.628 90 43.841zM45.818 6.982c-20.484 0-37.146 16.535-37.146 36.859 0 8.065 2.629 15.534 7.076 21.61L11.107 79.14l14.275-4.537A37.122 37.122 0 0 0 45.819 80.7c20.481 0 37.146-16.533 37.146-36.857S66.301 6.982 45.818 6.982zm22.311 46.956c-.273-.447-.994-.717-2.076-1.254-1.084-.537-6.41-3.138-7.4-3.495-.993-.358-1.717-.538-2.438.537-.721 1.076-2.797 3.495-3.43 4.212-.632.719-1.263.809-2.347.271-1.082-.537-4.571-1.673-8.708-5.333-3.219-2.848-5.393-6.364-6.025-7.441-.631-1.075-.066-1.656.475-2.191.488-.482 1.084-1.255 1.625-1.882.543-.628.723-1.075 1.082-1.793.363-.717.182-1.344-.09-1.883-.27-.537-2.438-5.825-3.34-7.977-.902-2.15-1.803-1.792-2.436-1.792-.631 0-1.354-.09-2.076-.09s-1.896.269-2.889 1.344c-.992 1.076-3.789 3.676-3.789 8.963 0 5.288 3.879 10.397 4.422 11.113.541.716 7.49 11.92 18.5 16.223C58.2 65.771 58.2 64.336 60.186 64.156c1.984-.179 6.406-2.599 7.312-5.107.9-2.512.9-4.663.631-5.111z" />
          </svg>

          {/* Green Pulse Ring */}
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
          </span>
        </button>
      )}

      {/* WhatsApp Chat Pop-up Window */}
      {chatOpen && (
        <div className="w-[320px] sm:w-[360px] bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden animate-fade-in flex flex-col">
          
          {/* Chat Header */}
          <div className="bg-[#075E54] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="https://expensivechoice.in/cdn/shop/files/logo_expensiver-removebg-preview_1.png?height=100&v=1788266674"
                  alt="Expensive Choice Support"
                  className="w-10 h-10 rounded-full bg-white object-contain p-1"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#075E54] rounded-full"></span>
              </div>
              <div>
                <h4 className="text-sm font-bold leading-tight flex items-center gap-1">
                  Expensive Choice
                  <span className="text-[10px] bg-emerald-600 text-white px-1.5 py-0.2 rounded-full">Verified</span>
                </h4>
                <p className="text-[11px] text-emerald-200">+91 7906568743 • Online</p>
              </div>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              className="text-emerald-200 hover:text-white p-1 rounded-full cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-[#EFEAE2] flex-1 space-y-3 min-h-[220px]">
            {/* Timestamp */}
            <div className="text-center">
              <span className="text-[10px] bg-white/80 px-2 py-0.5 rounded-full text-neutral-500">
                Today
              </span>
            </div>

            {/* Support Message Bubble */}
            <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-xs text-xs text-neutral-800 space-y-1.5 max-w-[90%]">
              <p className="font-semibold text-neutral-900">
                Namaste! Welcome to Expensive Choice.
              </p>
              <p className="text-[11px] leading-relaxed text-neutral-600">
                How can we assist you today? We offer COD with ₹99 advance and live video call watch inspection.
              </p>
              <span className="text-[9px] text-neutral-400 block text-right">Just now ✓✓</span>
            </div>

            {/* Quick Action Chips */}
            <div className="space-y-1.5 pt-1">
              <button
                onClick={() => handleQuickPrompt('Confirm COD Order with ₹99')}
                className="w-full text-left bg-white/90 hover:bg-white text-xs font-semibold text-neutral-800 p-2 rounded-xl shadow-xs border border-neutral-200/80 flex items-center justify-between transition-colors"
              >
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-amber-600" />
                  Confirm COD Order (₹99 Advance)
                </span>
                <span className="text-neutral-400 text-xs">→</span>
              </button>

              <button
                onClick={() => handleQuickPrompt('Schedule Live Video Call')}
                className="w-full text-left bg-white/90 hover:bg-white text-xs font-semibold text-neutral-800 p-2 rounded-xl shadow-xs border border-neutral-200/80 flex items-center justify-between transition-colors"
              >
                <span className="flex items-center gap-1.5">
                  <Video size={14} className="text-emerald-600" />
                  Live Video Call Watch Inspection
                </span>
                <span className="text-neutral-400 text-xs">→</span>
              </button>
            </div>
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSend} className="p-2.5 bg-neutral-100 flex items-center gap-2 border-t border-neutral-200">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-white text-xs px-3 py-2 rounded-full border border-neutral-300 focus:outline-hidden focus:border-[#25D366]"
            />
            <button
              type="submit"
              className="w-9 h-9 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shrink-0 cursor-pointer shadow-xs"
            >
              <Send size={15} />
            </button>
          </form>

        </div>
      )}

    </div>
  );
};
