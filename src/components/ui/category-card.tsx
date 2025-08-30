"use client";

import { Category } from "@/lib/api";
import Link from "next/link";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/products?category=${category.name.toLowerCase()}`}>
      <div className="bg-gray-100 rounded-lg p-6 hover:bg-gray-200 transition-colors cursor-pointer">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-32 object-cover rounded-lg mb-4"
        />
        <h3 className="font-semibold text-gray-900 mb-2 text-center">{category.name}</h3>
        <p className="text-sm text-gray-600 text-center">{category.productCount} products</p>
      </div>
    </Link>
  );
}
