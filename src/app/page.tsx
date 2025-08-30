"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/components/ui/product-card";
import { CategoryCard } from "@/components/ui/category-card";
import { api } from "@/lib/api";
import { HomePageData } from "@/types";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const [data, setData] = useState<HomePageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadHomePageData() {
      try {
        setError(null);
        const response = await api.getHomePageData();
        
        if (response.success && response.data) {
          setData(response.data);
        } else {
          setError(response.error || 'Failed to load homepage data');
        }
      } catch (error) {
        console.error('Failed to load homepage data:', error);
        setError('Failed to load homepage data');
      } finally {
        setLoading(false);
      }
    }

    loadHomePageData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-red-500 mb-6">
              <AlertCircle className="mx-auto h-24 w-24" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-8">
              {error || 'Failed to load homepage data'}
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
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {data.heroBanner.title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            {data.heroBanner.subtitle}
          </p>
          <Link href={data.heroBanner.ctaLink}>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              {data.heroBanner.ctaText}
            </button>
          </Link>
        </div>
      </div>

      {/* Featured Products */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-gray-600">Discover our most popular items</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {data.featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center">
            <Link href="/products">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                View All Products
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-gray-600">Browse products by category</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
