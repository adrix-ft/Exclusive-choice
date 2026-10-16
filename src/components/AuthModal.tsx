import React, { useState } from 'react';
import { useCart, UserProfile } from '../context/CartContext';
import { X, User, Lock, Mail, Phone, CheckCircle, Package, LogOut, ArrowRight, Sparkles } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, user, login, logout, orders } = useCart();
  const [tab, setTab] = useState<'login' | 'register'>('login');
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const handleDemoLogin = () => {
    const demoUser: UserProfile = {
      name: 'Kajal Yadav',
      email: 'yadavkajal3279@gmail.com',
      phone: '7906568743',
      joinedDate: 'October 2026',
    };
    login(demoUser);
    setSuccessMsg('Logged in successfully as VIP Customer!');
    setTimeout(() => {
      setSuccessMsg('');
      setIsAuthModalOpen(false);
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const loggedUser: UserProfile = {
      name: name || email.split('@')[0],
      email: email,
      phone: phone || '7906568743',
      joinedDate: 'October 2026',
    };

    login(loggedUser);
    setSuccessMsg(tab === 'login' ? 'Signed in successfully!' : 'Account registered successfully!');
    setTimeout(() => {
      setSuccessMsg('');
      setIsAuthModalOpen(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setIsAuthModalOpen(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
      />

      <div className="min-h-full flex items-center justify-center p-4 text-center">
        <div className="relative bg-white rounded-3xl max-w-md w-full text-left overflow-hidden shadow-2xl border border-neutral-100 my-6">
          
          {/* Modal Header */}
          <div className="bg-black text-white p-5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <User size={18} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base leading-tight">
                  {user ? 'My VIP Account' : 'Welcome to Expensive Choice'}
                </h3>
                <p className="text-[11px] text-neutral-400">
                  {user ? 'Member Dashboard & Orders' : 'Sign in to track orders & instant checkout'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="text-neutral-400 hover:text-white p-1 rounded-full cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6">
            {successMsg && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                <CheckCircle size={16} className="text-emerald-600 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {user ? (
              /* Profile & Order History View */
              <div className="space-y-5">
                <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-black text-white font-bold flex items-center justify-center text-lg">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-neutral-900">{user.name}</h4>
                      <p className="text-xs text-neutral-500">{user.email}</p>
                      <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">📞 +91 {user.phone}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-1 rounded-md uppercase">
                    VIP Member
                  </span>
                </div>

                {/* Orders History Tab */}
                <div>
                  <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Package size={14} />
                    <span>My Recent Orders ({orders.length})</span>
                  </h4>

                  {orders.length === 0 ? (
                    <div className="p-4 text-center border border-dashed border-neutral-200 rounded-xl text-neutral-500 text-xs">
                      No orders yet. Place your first order with Online Payment or Cash on Delivery!
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {orders.map((ord) => (
                        <div key={ord.id} className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs space-y-1">
                          <div className="flex justify-between font-bold text-neutral-900">
                            <span>{ord.id}</span>
                            <span className="text-emerald-700">Rs. {ord.total.toLocaleString('en-IN')}</span>
                          </div>
                          <div className="flex justify-between text-[11px] text-neutral-500">
                            <span>Paid via {ord.paymentMethod.toUpperCase()}</span>
                            <span className="text-emerald-600 font-medium">{ord.status}</span>
                          </div>
                          {ord.paymentId && (
                            <p className="text-[10px] text-neutral-400 font-mono">Ref: {ord.paymentId}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    onClick={logout}
                    className="flex-1 py-2.5 px-4 border border-neutral-300 rounded-xl text-xs font-semibold text-neutral-700 hover:bg-neutral-50 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <LogOut size={14} />
                    <span>Sign Out</span>
                  </button>
                  <button
                    onClick={() => setIsAuthModalOpen(false)}
                    className="flex-1 py-2.5 px-4 bg-black text-white rounded-xl text-xs font-semibold hover:bg-neutral-800 cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            ) : (
              /* Login / Register Form */
              <div>
                {/* 1-Click Demo Login Pill */}
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  className="w-full mb-4 py-2.5 px-4 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-xl text-xs font-bold text-amber-900 flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-2xs"
                >
                  <Sparkles size={14} className="text-amber-600" />
                  <span>1-Click Showcase Demo Login (Kajal Yadav)</span>
                </button>

                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-neutral-200"></div>
                  <span className="shrink mx-3 text-[11px] text-neutral-400 uppercase tracking-wider">or continue with email</span>
                  <div className="flex-grow border-t border-neutral-200"></div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-neutral-200 mb-4">
                  <button
                    type="button"
                    onClick={() => setTab('login')}
                    className={`flex-1 py-2 text-xs font-bold transition-colors cursor-pointer ${
                      tab === 'login'
                        ? 'text-black border-b-2 border-black'
                        : 'text-neutral-400 hover:text-black'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => setTab('register')}
                    className={`flex-1 py-2 text-xs font-bold transition-colors cursor-pointer ${
                      tab === 'register'
                        ? 'text-black border-b-2 border-black'
                        : 'text-neutral-400 hover:text-black'
                    }`}
                  >
                    Create Account
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  {tab === 'register' && (
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your full name"
                          className="w-full pl-9 pr-3 py-2 border border-neutral-300 rounded-lg text-xs focus:ring-1 focus:ring-black focus:outline-hidden"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full pl-9 pr-3 py-2 border border-neutral-300 rounded-lg text-xs focus:ring-1 focus:ring-black focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Phone Number (WhatsApp)
                    </label>
                    <div className="relative">
                      <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="7906568743"
                        className="w-full pl-9 pr-3 py-2 border border-neutral-300 rounded-lg text-xs focus:ring-1 focus:ring-black focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-9 pr-3 py-2 border border-neutral-300 rounded-lg text-xs focus:ring-1 focus:ring-black focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-black hover:bg-neutral-800 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
                    >
                      <span>{tab === 'login' ? 'Sign In' : 'Create Account'}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </form>

                <p className="text-[11px] text-center text-neutral-400 mt-3">
                  Showcase Account • No password verification required in demo mode
                </p>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};
