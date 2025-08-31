"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/ui/product-card";
import { api } from "@/lib/api";
import { Product } from "@/lib/api";
import { AlertCircle } from "lucide-react";

export function ProductsClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  useEffect(() => {
    async function loadProducts() {
      try {
        setError(null);
        // Call backend API based on category filter
        let response;
        if (category) {
          response = await api.getProductsByCategory(category);
        } else {
          response = await api.getProducts();
        }
        
        if (response.status === "success") {
          setProducts(response.data);
        } else {
          setError('Failed to load products');
        }
      } catch (error) {
        console.error('Failed to load products:', error);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [category]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

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

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {category ? `${category} Products` : 'All Products'}
          </h1>
          <p className="text-gray-600">
            {category 
              ? `Discover our ${category.toLowerCase()} collection`
              : 'Discover our complete collection of amazing products'
            }
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">
              {category 
                ? `No ${category.toLowerCase()} products found`
                : 'No products found'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
