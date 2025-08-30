"use client";

import { useState } from "react";
import { Product } from "@/lib/api";
import { useCart } from "@/contexts/cart-context";
import { AlertCircle, Plus, Minus } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { cart, addToCart, removeFromCart } = useCart();

  const handleAddToCart = async () => {
    setIsAdding(true);
    setError(null);
    
    try {
      // Call backend API - backend handles all logic
      await addToCart(product.id);
    } catch (error) {
      console.error('Failed to add to cart:', error);
      setError(error instanceof Error ? error.message : 'Failed to add to cart');
    } finally {
      setIsAdding(false);
    }
  };

  const handleRemoveFromCart = async () => {
    setIsRemoving(true);
    setError(null);
    
    try {
      // Call backend API - backend handles all logic
      await removeFromCart(product.id);
    } catch (error) {
      console.error('Failed to remove from cart:', error);
      setError(error instanceof Error ? error.message : 'Failed to remove from cart');
    } finally {
      setIsRemoving(false);
    }
  };

  // Get current quantity from cart (backend state)
  const currentQuantity = cart?.items.find(item => item.id === product.id)?.quantity || 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      {/* Product Image */}
      <div className="aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
        />
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>
        
        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-2 text-red-600 text-sm mb-2">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          
          {/* Cart Controls */}
          <div className="flex items-center gap-2">
            {currentQuantity > 0 && (
              <>
                <button
                  onClick={handleRemoveFromCart}
                  disabled={isRemoving || isAdding}
                  className="p-1 rounded border hover:bg-gray-50 disabled:opacity-50"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center font-medium">{currentQuantity}</span>
              </>
            )}
            
            <button
              onClick={handleAddToCart}
              disabled={isAdding || isRemoving}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                isAdding
                  ? 'bg-green-100 text-green-800'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isAdding ? 'Adding...' : currentQuantity > 0 ? '+' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
