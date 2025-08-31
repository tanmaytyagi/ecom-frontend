"use client";

import { Category } from "@/lib/api";
import Link from "next/link";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/products/category?category=${encodeURIComponent(category.name)}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer">
        {/* Category Image */}
        <div className="aspect-video overflow-hidden">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
          />
        </div>
        
        {/* Category Info */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2">
            {category.name}
          </h3>
          <p className="text-sm text-gray-600">
            {category.totalProducts} products
          </p>
        </div>
      </div>
    </Link>
  );
}
