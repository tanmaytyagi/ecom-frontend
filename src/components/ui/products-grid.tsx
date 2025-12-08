import { Product } from "@/lib/api";
import { ProductCard } from "./product-card";

interface ProductsGridProps {
  products: Product[];
  emptyMessage?: string;
  showEmptyState?: boolean;
}

export function ProductsGrid({ 
  products, 
  emptyMessage = "No products found",
  showEmptyState = true
}: ProductsGridProps) {
  return (
    <>
      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </div>

      {/* Empty State */}
      {showEmptyState && products.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-600 text-lg">
            {emptyMessage}
          </p>
        </div>
      )}
    </>
  );
}
