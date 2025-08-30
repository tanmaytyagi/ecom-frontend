"use client";

import { useState } from "react";
import { Product } from "@/lib/api";
import { useCart } from "@/contexts/cart-context";
import { AlertCircle } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    if (!product.inStock) return;
    
    setIsAdding(true);
    setError(null);
    
    try {
      // Call backend API - backend handles all validation and logic
      await addToCart(product.id, 1);
    } catch (error) {
      console.error('Failed to add to cart:', error);
      setError(error instanceof Error ? error.message : 'Failed to add to cart');
    } finally {
      setIsAdding(false);
    }
  };

  const isLowStock = product.stockQuantity < 10 && product.stockQuantity > 0;
  const isOutOfStock = !product.inStock || product.stockQuantity === 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      {/* Product Image */}
      <div className="aspect-square overflow-hidden relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
        />
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">Out of Stock</span>
          </div>
        )}
        {isLowStock && !isOutOfStock && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
            Low Stock
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>
        
        {/* Stock Information */}
        {isLowStock && !isOutOfStock && (
          <p className="text-sm text-orange-600 mb-2">
            Only {product.stockQuantity} left in stock
          </p>
        )}
        
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
          
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock || isAdding}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              isAdding
                ? 'bg-green-100 text-green-800'
                : isOutOfStock
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isAdding ? 'Added!' : isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
