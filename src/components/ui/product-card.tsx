"use client";

import { useState } from "react";
import { Product } from "@/lib/api";
import { api } from "@/lib/api";
import { useCart } from "@/contexts/cart-context";
import { AlertCircle } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { refreshCart } = useCart();

  const handleAddToCart = async () => {
    setIsAdding(true);
    setError(null);
    
    try {
      const response = await api.updateCart(product.productId, "add");
      
      if (response.status === "success") {
        await refreshCart();
        await new Promise(resolve => setTimeout(resolve, 700));
      } else {
        setError('Failed to add to cart');
      }
    } catch (error) {
      console.error('Failed to add to cart:', error);
      setError('Failed to add to cart');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="aspect-square overflow-hidden">
        <img
          src={product.productImageUrl}
          alt={product.productName}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
        />
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.productName}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.productDescription}
        </p>
        
        {error && (
          <div className="flex items-center gap-2 text-red-600 text-sm mb-2">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            ${product.productPrice.toFixed(2)}
          </span>
          
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              isAdding
                ? 'bg-green-100 text-green-800'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isAdding ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
