"use client";

import { useEffect, useState } from "react";
import { Product } from "@/lib/api";
import { api } from "@/lib/api";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorState } from "@/components/ui/error-state";
import { PageHeader } from "@/components/ui/page-header";
import { ProductsGrid } from "@/components/ui/products-grid";

export default function AllProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setError(null);
        const response = await api.getProducts();
        
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
  }, []);

  if (loading) {
    return <LoadingSpinner message="Loading products..." />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <PageHeader
          title="All Products"
          subtitle="Discover our complete collection of amazing products"
        />
        <ProductsGrid products={products} />
      </div>
    </div>
  );
}
