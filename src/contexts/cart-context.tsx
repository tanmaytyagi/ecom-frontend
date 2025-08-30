"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Cart } from "@/lib/api";
import { api } from "@/lib/api";

interface CartContextType {
  cart: Cart | null;
  cartCount: number;
  loading: boolean;
  error: string | null;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load cart from backend on mount
  useEffect(() => {
    refreshCart();
  }, []);

  const refreshCart = async () => {
    try {
      setError(null);
      const response = await api.getCart();
      
      if (response.success && response.data) {
        setCart(response.data);
      } else {
        setError(response.error || 'Failed to load cart');
      }
    } catch (err) {
      console.error('Error loading cart:', err);
      setError('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: string, quantity: number = 1) => {
    try {
      setError(null);
      const response = await api.addToCart(productId, quantity);
      
      if (response.success && response.data) {
        setCart(response.data); // Backend returns updated cart
      } else {
        setError(response.error || 'Failed to add item to cart');
        throw new Error(response.error || 'Failed to add item to cart');
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
      setError(err instanceof Error ? err.message : 'Failed to add item to cart');
      throw err;
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      setError(null);
      const response = await api.updateCartItemQuantity(itemId, quantity);
      
      if (response.success && response.data) {
        setCart(response.data); // Backend returns updated cart
      } else {
        setError(response.error || 'Failed to update quantity');
        throw new Error(response.error || 'Failed to update quantity');
      }
    } catch (err) {
      console.error('Error updating quantity:', err);
      setError(err instanceof Error ? err.message : 'Failed to update quantity');
      throw err;
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      setError(null);
      const response = await api.removeFromCart(itemId);
      
      if (response.success && response.data) {
        setCart(response.data); // Backend returns updated cart
      } else {
        setError(response.error || 'Failed to remove item');
        throw new Error(response.error || 'Failed to remove item');
      }
    } catch (err) {
      console.error('Error removing from cart:', err);
      setError(err instanceof Error ? err.message : 'Failed to remove item');
      throw err;
    }
  };

  const clearCart = async () => {
    try {
      setError(null);
      const response = await api.clearCart();
      
      if (response.success && response.data) {
        setCart(response.data); // Backend returns updated cart
      } else {
        setError(response.error || 'Failed to clear cart');
        throw new Error(response.error || 'Failed to clear cart');
      }
    } catch (err) {
      console.error('Error clearing cart:', err);
      setError(err instanceof Error ? err.message : 'Failed to clear cart');
      throw err;
    }
  };

  const cartCount = cart?.totalItems || 0;

  const value: CartContextType = {
    cart,
    cartCount,
    loading,
    error,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    refreshCart,
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
