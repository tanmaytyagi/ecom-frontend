import { Suspense } from "react";
import { CategoryProductsClient } from "./category-products-client";

export default function CategoryProductsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-32">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    }>
      <CategoryProductsClient />
    </Suspense>
  );
}
