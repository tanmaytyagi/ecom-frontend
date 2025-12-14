"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import Link from "next/link";

export function Navigation() {
  const { cartCount } = useCart();

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-gray-900">
            TechStore
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/products/all" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Products
            </Link>
          </div>

          <Link href="/cart">
            <div className="relative cursor-pointer">
              <ShoppingCart className="h-6 w-6 text-gray-600 hover:text-gray-900 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
