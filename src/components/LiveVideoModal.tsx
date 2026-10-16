import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Video, Calendar, Clock, Check, Phone } from 'lucide-react';

export const LiveVideoModal: React.FC = () => {
  const { isVideoModalOpen, setIsVideoModalOpen } = useCart();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [watchInterest, setWatchInterest] = useState('Rolex Day-Date 36 Olive Green');
  const [booked, setBooked] = useState(false);

  if (!isVideoModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setBooked(true);
    setTimeout(() => {
      setBooked(false);
      setIsVideoModalOpen(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={() => setIsVideoModalOpen(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
      />

      <div className="min-h-full flex items-center justify-center p-4 text-center">
        <div className="relative bg-white rounded-3xl max-w-md w-full text-left overflow-hidden shadow-2xl border border-neutral-100 my-6">
          
          <div className="bg-[#0b0d10] text-white p-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Video size={18} />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base leading-tight">
                  Book Live Video Call Inspection
                </h3>
                <p className="text-[11px] text-neutral-400">
                  Inspect your watch live before dispatching
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="text-neutral-400 hover:text-white p-1 rounded-full cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6">
            {booked ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Check size={32} />
                </div>
                <h4 className="text-base font-bold text-neutral-900">
                  Video Call Scheduled!
                </h4>
                <p className="text-xs text-neutral-600 max-w-xs mx-auto">
                  Our specialist will connect with you on WhatsApp from <strong>+91 7906568743</strong> within 15 minutes.
                </p>
                <div className="pt-2">
                  <a
                    href="https://api.whatsapp.com/send?phone=917906568743&text=Hi%20Expensive%20Choice%2C%20I%20want%20to%20see%20a%20live%20video%20call%20demonstration"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#25D366] text-white text-xs font-bold rounded-lg shadow-sm hover:bg-[#20bd5a]"
                  >
                    Open WhatsApp Chat (+91 7906568743)
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Want to verify weight, sweeping hand movement, serial engraving, and dial shade before paying? We provide free 1-on-1 video call demonstration.
                </p>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-xs focus:ring-1 focus:ring-black focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-xs focus:ring-1 focus:ring-black focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Select Watch / Eyewear to Inspect *
                  </label>
                  <select
                    value={watchInterest}
                    onChange={(e) => setWatchInterest(e.target.value)}
                    className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-xs focus:ring-1 focus:ring-black focus:outline-hidden bg-white"
                  >
                    <option value="Rolex Day-Date 36 Olive Green">Rolex Day-Date 36 Olive Green</option>
                    <option value="Rolex Oyster Perpetual Tiger Gold">Rolex Oyster Perpetual Tiger Gold</option>
                    <option value="Tissot T-Classic Chronograph">Tissot T-Classic Chronograph</option>
                    <option value="Hublot Skeleton Automatic">Hublot Skeleton Automatic</option>
                    <option value="Seiko Premium Swift Movement">Seiko Premium Swift Movement</option>
                    <option value="Rayban Aviator / Luxury Sunglasses">Rayban Aviator / Luxury Sunglasses</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-md"
                  >
                    <Phone size={14} />
                    <span>Schedule Free Video Call</span>
                  </button>
                </div>

                <p className="text-[10px] text-center text-neutral-400">
                  Available Mon - Sun: 10:00 AM - 10:00 PM IST
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
