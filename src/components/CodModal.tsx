import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { X, Check, ShieldCheck, CreditCard, QrCode, Phone, MapPin, Truck, Zap, AlertCircle } from 'lucide-react';

export const CodModal: React.FC = () => {
  const {
    isCodModalOpen,
    setIsCodModalOpen,
    checkoutProduct,
    setCheckoutProduct,
    items,
    subtotal,
    clearCart,
    user,
    addOrder,
    initiateRazorpayPayment
  } = useCart();

  const [fullName, setFullName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '7906568743');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [paymentChoice, setPaymentChoice] = useState<'razorpay' | 'cod99'>('razorpay');
  const [step, setStep] = useState<'checkout' | 'upi_qr' | 'confirmed'>('checkout');
  const [orderId, setOrderId] = useState('');
  const [paymentId, setPaymentId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (user) {
      if (!fullName) setFullName(user.name);
      if (!phone) setPhone(user.phone);
    }
  }, [user]);

  if (!isCodModalOpen) return null;

  const targetProduct = checkoutProduct;
  const totalAmount = targetProduct ? targetProduct.price : (subtotal > 0 ? subtotal : 1899);
  const remainingCod = Math.max(0, totalAmount - 99);

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !address || !pincode) {
      alert('Please fill all required delivery details.');
      return;
    }

    if (paymentChoice === 'razorpay') {
      // 100% Online Payment via Razorpay
      setIsProcessing(true);
      await initiateRazorpayPayment({
        amount: totalAmount,
        description: `Expensive Choice Order - ${targetProduct ? targetProduct.name : `${items.length} Items`}`,
        customer: {
          name: fullName,
          email: user?.email || 'customer@expensivechoice.in',
          contact: phone,
        },
        onSuccess: (rzpPaymentId: string) => {
          setIsProcessing(false);
          const genOrderId = `EC-ONLINE-${Math.floor(100000 + Math.random() * 900000)}`;
          setOrderId(genOrderId);
          setPaymentId(rzpPaymentId);
          setStep('confirmed');

          // Save to order history
          addOrder({
            id: genOrderId,
            items: targetProduct ? [{ product: targetProduct, quantity: 1 }] : [...items],
            total: totalAmount,
            paymentMethod: 'razorpay',
            paymentId: rzpPaymentId,
            date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
            status: 'Confirmed',
            customerName: fullName,
            customerPhone: phone,
            shippingAddress: `${address}, ${city} - ${pincode}`,
          });

          clearCart();
          setCheckoutProduct(null);
        },
        onFailure: (err) => {
          setIsProcessing(false);
          console.warn('Payment not completed', err);
        },
      });
    } else {
      // COD Advance ₹99 option
      // Can pay ₹99 via Razorpay or direct UPI QR
      setIsProcessing(true);
      await initiateRazorpayPayment({
        amount: 99,
        description: 'COD Order Confirmation (₹99 Advance)',
        customer: {
          name: fullName,
          email: user?.email || 'customer@expensivechoice.in',
          contact: phone,
        },
        onSuccess: (rzpPaymentId: string) => {
          setIsProcessing(false);
          const genOrderId = `EC-COD-${Math.floor(100000 + Math.random() * 900000)}`;
          setOrderId(genOrderId);
          setPaymentId(rzpPaymentId);
          setStep('confirmed');

          addOrder({
            id: genOrderId,
            items: targetProduct ? [{ product: targetProduct, quantity: 1 }] : [...items],
            total: totalAmount,
            paymentMethod: 'cod',
            paymentId: rzpPaymentId,
            date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
            status: 'Confirmed',
            customerName: fullName,
            customerPhone: phone,
            shippingAddress: `${address}, ${city} - ${pincode}`,
          });

          clearCart();
          setCheckoutProduct(null);
        },
        onFailure: () => {
          setIsProcessing(false);
          // Fallback to UPI QR manual simulation if window was closed
          setStep('upi_qr');
        },
      });
    }
  };

  const handleSimulateQrPayment = () => {
    const genOrderId = `EC-COD-${Math.floor(100000 + Math.random() * 900000)}`;
    const mockPaymentId = `upi_txn_${Date.now()}`;
    setOrderId(genOrderId);
    setPaymentId(mockPaymentId);
    setStep('confirmed');

    addOrder({
      id: genOrderId,
      items: targetProduct ? [{ product: targetProduct, quantity: 1 }] : [...items],
      total: totalAmount,
      paymentMethod: 'cod',
      paymentId: mockPaymentId,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'Confirmed',
      customerName: fullName,
      customerPhone: phone,
      shippingAddress: `${address}, ${city} - ${pincode}`,
    });

    clearCart();
    setCheckoutProduct(null);
  };

  const handleClose = () => {
    setIsCodModalOpen(false);
    setStep('checkout');
    setIsProcessing(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
      />

      <div className="min-h-full flex items-center justify-center p-4 text-center">
        <div className="relative bg-white rounded-3xl max-w-lg w-full text-left overflow-hidden shadow-2xl border border-neutral-100 my-6">
          
          {/* Header */}
          <div className="bg-black text-white p-5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="text-amber-400" size={22} />
              <div>
                <h3 className="font-bold text-sm sm:text-base leading-tight">
                  Secure Checkout
                </h3>
                <p className="text-[11px] text-neutral-400">
                  Prepaid Online & Cash on Delivery Available
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-neutral-400 hover:text-white p-1 rounded-full cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6">
            
            {/* Step 1: Customer Details & Payment Mode Selection */}
            {step === 'checkout' && (
              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                
                {/* Order Summary Box */}
                <div className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200 text-xs">
                  <div className="flex justify-between items-center pb-2 border-b border-neutral-200">
                    <span className="text-neutral-600 font-medium">Order Total:</span>
                    <span className="font-extrabold text-neutral-900 text-sm">
                      Rs. {totalAmount.toLocaleString('en-IN')}.00
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 text-[11px] text-neutral-500">
                    <span>Shipping:</span>
                    <span className="text-emerald-700 font-bold">FREE Express Delivery</span>
                  </div>
                  {targetProduct && (
                    <div className="text-[11px] text-neutral-500 pt-1 truncate">
                      Item: <strong>{targetProduct.name}</strong>
                    </div>
                  )}
                </div>

                {/* Choose Payment Method */}
                <div>
                  <label className="block text-xs font-bold text-neutral-900 mb-2 uppercase tracking-wide">
                    Select Payment Method:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    
                    {/* 100% Online Payment */}
                    <div
                      onClick={() => setPaymentChoice('razorpay')}
                      className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        paymentChoice === 'razorpay'
                          ? 'border-black bg-neutral-50 shadow-xs'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                          <CreditCard size={15} className="text-blue-600" />
                          <span>Pay Online (Prepaid)</span>
                        </span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                          Instant
                        </span>
                      </div>
                      <p className="text-[10.5px] text-neutral-500 mt-1 leading-snug">
                        Cards, UPI, NetBanking, Wallets. 100% Secure.
                      </p>
                    </div>

                    {/* COD ₹99 Advance */}
                    <div
                      onClick={() => setPaymentChoice('cod99')}
                      className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        paymentChoice === 'cod99'
                          ? 'border-black bg-neutral-50 shadow-xs'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                          <Truck size={15} className="text-amber-600" />
                          <span>COD (₹99 Advance)</span>
                        </span>
                        <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">
                          Pay ₹99
                        </span>
                      </div>
                      <p className="text-[10.5px] text-neutral-500 mt-1 leading-snug">
                        Pay ₹99 advance. Rest Rs. {remainingCod.toLocaleString('en-IN')} on delivery.
                      </p>
                    </div>

                  </div>
                </div>

                {/* Delivery Information */}
                <div className="space-y-3 pt-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Kajal Yadav"
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs focus:ring-1 focus:ring-black focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="7906568743"
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs focus:ring-1 focus:ring-black focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Complete Shipping Address *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="House/Flat number, building, street, landmark"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs focus:ring-1 focus:ring-black focus:outline-hidden"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        required
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="e.g. 110001"
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs focus:ring-1 focus:ring-black focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Delhi / Mumbai"
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs focus:ring-1 focus:ring-black focus:outline-hidden"
                      />
                    </div>
                  </div>
                </div>

                {/* Primary Action Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-black hover:bg-neutral-800 disabled:bg-neutral-400 text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-colors cursor-pointer mt-4 shadow-md flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <span>Connecting to Secure Payment...</span>
                  ) : paymentChoice === 'razorpay' ? (
                    <>
                      <Zap size={15} className="text-amber-400 fill-amber-400" />
                      <span>Pay Online • Rs. {totalAmount.toLocaleString('en-IN')}</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={16} className="text-amber-400" />
                      <span>Confirm COD (Pay ₹99 Advance)</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-[10.5px] text-neutral-500 pt-1">
                  <span>🔒 100% Encrypted & Bank-Grade Secure Payment</span>
                </div>
              </form>
            )}

            {/* Step 2: UPI QR Fallback if user prefers direct scan */}
            {step === 'upi_qr' && (
              <div className="space-y-4 text-center">
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200">
                  <p className="text-xs font-bold text-amber-800 uppercase tracking-wide">
                    Pay ₹99 Advance via UPI QR Code
                  </p>
                  <p className="text-2xl font-extrabold text-amber-700 mt-1">₹99.00</p>
                  <p className="text-[11px] text-amber-800 mt-0.5">
                    Remaining Rs. {remainingCod.toLocaleString('en-IN')} payable on doorstep delivery.
                  </p>
                </div>

                <div className="w-44 h-44 mx-auto bg-white border-2 border-neutral-800 rounded-2xl p-3 flex flex-col items-center justify-center shadow-md">
                  <QrCode size={110} className="text-black" />
                  <span className="text-[10px] font-bold text-neutral-600 mt-1.5">
                    UPI: expensivechoice@upi
                  </span>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-neutral-600">
                  <span className="bg-neutral-100 px-2 py-0.5 rounded text-[11px]">GPay</span>
                  <span className="bg-neutral-100 px-2 py-0.5 rounded text-[11px]">PhonePe</span>
                  <span className="bg-neutral-100 px-2 py-0.5 rounded text-[11px]">Paytm</span>
                  <span className="bg-neutral-100 px-2 py-0.5 rounded text-[11px]">UPI</span>
                </div>

                <button
                  onClick={handleSimulateQrPayment}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md cursor-pointer mt-2"
                >
                  I Have Completed ₹99 Payment
                </button>

                <button
                  onClick={() => setStep('checkout')}
                  className="text-xs text-neutral-500 hover:underline cursor-pointer"
                >
                  ← Back to Payment Options
                </button>
              </div>
            )}

            {/* Step 3: Confirmed Screen */}
            {step === 'confirmed' && (
              <div className="text-center py-4 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                  <Check size={36} strokeWidth={2.5} />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-neutral-900">
                    Payment Successful & Order Confirmed!
                  </h3>
                  <p className="text-xs text-neutral-600 mt-1">
                    {paymentChoice === 'razorpay'
                      ? 'Your full payment has been received and verified.'
                      : 'Your ₹99 COD confirmation advance was received.'}
                  </p>
                </div>

                <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 text-xs text-left space-y-2">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Order ID:</span>
                    <span className="font-mono font-bold text-neutral-900">{orderId}</span>
                  </div>
                  {paymentId && (
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Transaction Ref:</span>
                      <span className="font-mono text-neutral-700 text-[11px] truncate max-w-[200px]">
                        {paymentId}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Customer:</span>
                    <span className="font-semibold text-neutral-800">{fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Phone:</span>
                    <span className="font-semibold text-neutral-800">+91 {phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Address:</span>
                    <span className="font-semibold text-neutral-800 text-[11px] truncate max-w-[200px]">
                      {address}, {city}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-neutral-200 font-bold">
                    <span>
                      {paymentChoice === 'razorpay' ? 'Total Paid Online:' : 'Balance Payable on Delivery:'}
                    </span>
                    <span className="text-emerald-700">
                      {paymentChoice === 'razorpay'
                        ? `Rs. ${totalAmount.toLocaleString('en-IN')}.00`
                        : `Rs. ${remainingCod.toLocaleString('en-IN')}.00`}
                    </span>
                  </div>
                </div>

                <div className="pt-2 space-y-2">
                  <a
                    href={`https://api.whatsapp.com/send?phone=917906568743&text=${encodeURIComponent(
                      `Hi Expensive Choice, I placed order ${orderId} for Rs ${totalAmount}. Payment Ref: ${paymentId}. Customer: ${fullName}.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 rounded-xl text-xs uppercase flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span>Send Order to WhatsApp (+91 7906568743)</span>
                  </a>

                  <button
                    onClick={handleClose}
                    className="w-full bg-black hover:bg-neutral-800 text-white font-semibold py-3 rounded-xl text-xs uppercase cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};
