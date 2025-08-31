"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Product } from "@/lib/api";
import { api } from "@/lib/api";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorState } from "@/components/ui/error-state";
import { PageHeader } from "@/components/ui/page-header";
import { ProductsGrid } from "@/components/ui/products-grid";
import Link from "next/link";

export function CategoryProductsClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  useEffect(() => {
    async function loadProductsByCategory() {
      if (!category) {
        setError('No category specified');
        setLoading(false);
        return;
      }

      try {
        setError(null);
        const response = await api.getProductsByCategory(category);
        
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

    loadProductsByCategory();
  }, [category]);

  if (loading) {
    return <LoadingSpinner message="Loading products..." />;
  }

  if (error) {
    return (
      <ErrorState 
        error={error} 
        actions={
          <div className="space-x-4">
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
            <Link 
              href="/products/all"
              className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              View All Products
            </Link>
          </div>
        }
      />
    );
  }

  if (!category) {
    return (
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Category Not Found</h1>
            <p className="text-gray-600 mb-8">
              Please select a valid category to view products.
            </p>
            <Link 
              href="/products/all"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <PageHeader
          title={`${category} Products`}
          subtitle={`Discover our ${category.toLowerCase()} collection`}
          showBackButton={true}
          backHref="/products/all"
        />
        <ProductsGrid 
          products={products} 
          emptyMessage={`No ${category.toLowerCase()} products found`}
        />
      </div>
    </div>
  );
}
