"use client";

import { useState } from "react";
import { ShoppingBag, AlertCircle, CheckCircle } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { CartItem } from "@/lib/api";
import Link from "next/link";

export default function CartPage() {
  const { cart, loading, error, clearCart } = useCart();
  const [clearingCart, setClearingCart] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = async () => {
    setClearingCart(true);
    try {
      // Call backend API - backend handles all logic
      await clearCart();
      setOrderPlaced(true);
      // Show order placed animation for 2 seconds
      setTimeout(() => {
        setOrderPlaced(false);
      }, 2000);
    } catch (err) {
      console.error('Error placing order:', err);
    } finally {
      setClearingCart(false);
    }
  };

  if (loading || clearingCart) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {clearingCart ? 'Placing order...' : 'Loading cart...'}
          </p>
        </div>
      </div>
    );
  }

  // Show order placed animation
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

  // Show error message if there's an error
  if (error) {
    return (
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-red-500 mb-6">
              <AlertCircle className="mx-auto h-24 w-24" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-8">
              {error}
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show empty cart if no cart or no items
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
            <Link href="/products">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const totalItems = cart.cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">
            {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Cart Items</h2>
              
              <div className="space-y-4">
                {cart.cartItems.map((item) => (
                  <CartItemCard key={item.productId} item={item} />
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${cart.orderSummary.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax ({cart.orderSummary.taxPercentage}%)</span>
                  <span className="font-medium">${(cart.orderSummary.subtotal * (cart.orderSummary.taxPercentage / 100)).toFixed(2)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${cart.orderSummary.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={handlePlaceOrder}
                disabled={clearingCart}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {clearingCart ? 'Placing Order...' : 'Place Order'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface CartItemCardProps {
  item: CartItem;
}

function CartItemCard({ item }: CartItemCardProps) {
  return (
    <div className="flex gap-4 p-4 border rounded-lg">
      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
            <p className="text-sm text-gray-600">{item.category}</p>
            <div className="mt-1">
              <span className="font-medium text-gray-900">${item.price.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Quantity and Total */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Quantity:</span>
            <span className="font-medium">{item.quantity}</span>
          </div>

          <div className="text-right">
            <div className="font-semibold text-gray-900">${item.total.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
