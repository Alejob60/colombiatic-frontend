// src/components/commercial-landing/ShoppingCart.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ServiceItem } from '@/types/colombiatic';
import { useServices } from '@/hooks/useServices';
import { Button } from '@/components/ui/Button';
import { 
  ShoppingBag, 
  X, 
  Plus, 
  Minus,
  Trash2,
  CreditCard
} from 'lucide-react';

interface CartItem {
  service: ServiceItem;
  quantity: number;
}

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: (items: CartItem[]) => void;
}

export default function ShoppingCart({ isOpen, onClose, onCheckout }: ShoppingCartProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { formatPrice, calculateTotal } = useServices();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('colombiatic-cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart data', e);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('colombiatic-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (service: ServiceItem) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.service.id === service.id);
      if (existingItem) {
        return prev.map(item => 
          item.service.id === service.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { service, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (serviceId: string) => {
    setCartItems(prev => prev.filter(item => item.service.id !== serviceId));
  };

  const updateQuantity = (serviceId: string, quantity: number) => {
    if (quantity < 1) return;
    
    setCartItems(prev => 
      prev.map(item => 
        item.service.id === serviceId 
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + calculateTotal(item.service, item.quantity);
    }, 0);
  };

  const handleCheckout = () => {
    onCheckout(cartItems);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
          className="absolute right-0 top-0 h-full w-full max-w-md bg-background border-l border-gray-800 flex flex-col"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <h2 className="text-xl font-bold flex items-center">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Carrito de Compras
            </h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">Tu carrito está vacío</p>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {cartItems.map(({ service, quantity }) => (
                    <div key={service.id} className="flex items-center gap-4 p-4 bg-surface/50 rounded-lg border border-gray-800">
                      <div className="flex-1">
                        <h3 className="font-medium">{service.name}</h3>
                        <p className="text-sm text-gray-400">
                          {formatPrice(calculateTotal(service, quantity))}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(service.id, quantity - 1)}
                          className="p-1 hover:bg-gray-700 rounded"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        
                        <span className="w-8 text-center">{quantity}</span>
                        
                        <button
                          onClick={() => updateQuantity(service.id, quantity + 1)}
                          className="p-1 hover:bg-gray-700 rounded"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => removeFromCart(service.id)}
                        className="p-2 hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-800">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="text-lg font-bold">{formatPrice(getTotalPrice())}</span>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={clearCart} className="flex-1">
                      Limpiar
                    </Button>
                    <Button onClick={handleCheckout} className="flex-1">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Pagar
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}