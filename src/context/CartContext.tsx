import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../data/storeData';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  joinedDate?: string;
}

export interface OrderRecord {
  id: string;
  items: CartItem[];
  total: number;
  paymentMethod: 'razorpay' | 'cod';
  paymentId?: string;
  date: string;
  status: 'Confirmed' | 'Dispatched' | 'Delivered';
  customerName: string;
  customerPhone: string;
  shippingAddress: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  watchesCount: number;
  hasFreeSunglasses: boolean;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  selectedProductForModal: Product | null;
  setSelectedProductForModal: (product: Product | null) => void;
  isCodModalOpen: boolean;
  setIsCodModalOpen: (open: boolean) => void;
  isVideoModalOpen: boolean;
  setIsVideoModalOpen: (open: boolean) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
  checkoutProduct: Product | null;
  setCheckoutProduct: (product: Product | null) => void;
  // Auth Showcase
  user: UserProfile | null;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  login: (userData: UserProfile) => void;
  logout: () => void;
  // Orders
  orders: OrderRecord[];
  addOrder: (order: OrderRecord) => void;
  // Razorpay Online Payment
  initiateRazorpayPayment: (options: {
    amount: number;
    description: string;
    customer?: { name?: string; email?: string; contact?: string };
    onSuccess: (paymentId: string) => void;
    onFailure?: (error: any) => void;
  }) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const RAZORPAY_KEY = 'rzp_test_TRBwzWtidLjBXS';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('expensivechoice_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('expensivechoice_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    try {
      const saved = localStorage.getItem('expensivechoice_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [isCodModalOpen, setIsCodModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [checkoutProduct, setCheckoutProduct] = useState<Product | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('expensivechoice_cart', JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  }, [items]);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('expensivechoice_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('expensivechoice_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('expensivechoice_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  const login = (userData: UserProfile) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const addOrder = (order: OrderRecord) => {
    setOrders(prev => [order, ...prev]);
  };

  const addToCart = (product: Product, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const watchesCount = items
    .filter(item => item.product.category === 'watch')
    .reduce((sum, item) => sum + item.quantity, 0);

  const hasFreeSunglasses = watchesCount >= 2;

  // Razorpay helper
  const initiateRazorpayPayment = async ({
    amount,
    description,
    customer,
    onSuccess,
    onFailure,
  }: {
    amount: number;
    description: string;
    customer?: { name?: string; email?: string; contact?: string };
    onSuccess: (paymentId: string) => void;
    onFailure?: (error: any) => void;
  }) => {
    const ensureRazorpayLoaded = (): Promise<boolean> => {
      return new Promise((resolve) => {
        if ((window as any).Razorpay) {
          resolve(true);
          return;
        }
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    const isLoaded = await ensureRazorpayLoaded();
    if (!isLoaded || !(window as any).Razorpay) {
      alert('Secure payment service could not be loaded. Please check your internet connection.');
      if (onFailure) onFailure('Payment service failed to load');
      return;
    }

    const options = {
      key: RAZORPAY_KEY,
      amount: Math.round(amount * 100), // In Indian Paise
      currency: 'INR',
      name: 'Expensive Choice',
      description,
      image: 'https://expensivechoice.in/cdn/shop/files/logo_expensiver-removebg-preview_1.png?height=200&v=1788266674',
      prefill: {
        name: customer?.name || user?.name || '',
        email: customer?.email || user?.email || '',
        contact: customer?.contact || user?.phone || '7906568743',
      },
      notes: {
        store: 'Expensive Choice Luxury Store',
        address: 'India',
      },
      theme: {
        color: '#000000',
      },
      modal: {
        ondismiss: function () {
          console.log('Payment modal dismissed by customer');
        },
      },
      handler: function (response: any) {
        if (response && response.razorpay_payment_id) {
          onSuccess(response.razorpay_payment_id);
        } else {
          onSuccess(`pay_test_${Date.now()}`);
        }
      },
    };

    try {
      const razorpayInstance = new (window as any).Razorpay(options);
      razorpayInstance.on('payment.failed', function (response: any) {
        console.error('Payment failed', response.error);
        if (onFailure) onFailure(response.error);
      });
      razorpayInstance.open();
    } catch (err) {
      console.error('Failed to open Razorpay', err);
      if (onFailure) onFailure(err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        watchesCount,
        hasFreeSunglasses,
        isCartOpen,
        setIsCartOpen,
        selectedProductForModal,
        setSelectedProductForModal,
        isCodModalOpen,
        setIsCodModalOpen,
        isVideoModalOpen,
        setIsVideoModalOpen,
        isSearchModalOpen,
        setIsSearchModalOpen,
        checkoutProduct,
        setCheckoutProduct,
        user,
        isAuthModalOpen,
        setIsAuthModalOpen,
        login,
        logout,
        orders,
        addOrder,
        initiateRazorpayPayment,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
