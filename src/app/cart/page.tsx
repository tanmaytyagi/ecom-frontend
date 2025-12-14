"use client";

import { useState, useEffect } from "react";
import { ShoppingBag, CheckCircle } from "lucide-react";
import { api } from "@/lib/api";
import { Cart } from "@/lib/api";
import { useCart } from "@/contexts/cart-context";
import { CartCard } from "@/components/ui/cart-card";
import { OrderSummary } from "@/components/ui/order-summary";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorState } from "@/components/ui/error-state";
import Link from "next/link";

export default function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { refreshCart } = useCart();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await api.getCart();
      
      if (response.status === "success") {
        setCart(response.data);
      } else {
        setError('Failed to load cart');
      }
    } catch (err) {
      console.error('Error loading cart:', err);
      setError('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId: string) => {
    try {
      await api.updateCart(productId, "add");
      await Promise.all([loadCart(), refreshCart()]);
    } catch (err) {
      console.error('Error adding to cart:', err);
      setError('Failed to add item to cart');
    }
  };

  const handleSubtractFromCart = async (productId: string) => {
    try {
      await api.updateCart(productId, "subtract");
      await Promise.all([loadCart(), refreshCart()]);
    } catch (err) {
      console.error('Error removing from cart:', err);
      setError('Failed to remove item from cart');
    }
  };

  const handlePlaceOrder = async () => {
    try {
      await api.createOrder();
      const response = await api.clearCart();
      
      if (response.status === "success") {
        await refreshCart();
        setOrderPlaced(true);
        setTimeout(() => {
          setOrderPlaced(false);
          loadCart();
        }, 2000);
      } else {
        setError('Failed to place order');
      }
    } catch (err) {
      console.error('Error placing order:', err);
      setError('Failed to place order');
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading cart..." />;
  }

  if (orderPlaced) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="text-center">
          <CheckCircle className="mx-auto h-24 w-24 text-green-500 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Placed!</h1>
          <p className="text-gray-600">Thank you for your order</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  if (!cart || cart.cartItems.length === 0) {
    return (
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-gray-400 mb-6">
              <ShoppingBag className="mx-auto h-24 w-24" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link href="/products/all">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">
            {cart.totalItems} {cart.totalItems === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Cart Items</h2>
              
              <div className="space-y-4">
                {cart.cartItems.map((item) => (
                  <CartCard 
                    key={item.productId} 
                    item={item} 
                    onAdd={() => handleAddToCart(item.productId)}
                    onSubtract={() => handleSubtractFromCart(item.productId)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <OrderSummary cart={cart} onPlaceOrder={handlePlaceOrder} />
          </div>
        </div>
      </div>
    </div>
  );
}
