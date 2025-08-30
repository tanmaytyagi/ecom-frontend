"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Cart, api } from "@/lib/api";

interface CartContextType {
  cart: Cart | null;
  cartCount: number;
  loading: boolean;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);

  // Load cart on mount
  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const cartData = await api.getCart();
      setCart(cartData);
    } catch (err) {
      console.error('Error loading cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: string, quantity: number = 1) => {
    try {
      const updatedCart = await api.addToCart(productId, quantity);
      setCart(updatedCart);
    } catch (err) {
      console.error('Error adding to cart:', err);
      throw err;
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      const updatedCart = await api.updateCartItemQuantity(itemId, quantity);
      setCart(updatedCart);
    } catch (err) {
      console.error('Error updating quantity:', err);
      throw err;
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      const updatedCart = await api.removeFromCart(itemId);
      setCart(updatedCart);
    } catch (err) {
      console.error('Error removing from cart:', err);
      throw err;
    }
  };

  const clearCart = async () => {
    try {
      const updatedCart = await api.clearCart();
      setCart(updatedCart);
    } catch (err) {
      console.error('Error clearing cart:', err);
      throw err;
    }
  };

  const cartCount = cart?.totalItems || 0;

  const value: CartContextType = {
    cart,
    cartCount,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
