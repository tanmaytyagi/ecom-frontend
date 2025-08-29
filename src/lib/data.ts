export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  image: string;
  inStock: boolean;
}

export const categories = [
  "Electronics",
  "Clothing",
  "Books",
  "Home & Garden",
  "Sports",
  "Beauty",
  "Toys",
  "Automotive"
];

export const products: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 99.99,
    category: "Electronics",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
    inStock: true
  },
  {
    id: "2",
    name: "Smartphone Case",
    description: "Durable protective case for smartphones",
    price: 19.99,
    category: "Electronics",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=300&h=300&fit=crop",
    inStock: true
  },
  {
    id: "3",
    name: "Cotton T-Shirt",
    description: "Comfortable cotton t-shirt in various colors",
    price: 24.99,
    category: "Clothing",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
    inStock: true
  },
  {
    id: "4",
    name: "Programming Book",
    description: "Comprehensive guide to modern programming",
    price: 49.99,
    category: "Books",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=300&fit=crop",
    inStock: true
  },
  {
    id: "5",
    name: "Garden Plant Pot",
    description: "Beautiful ceramic plant pot for indoor plants",
    price: 34.99,
    category: "Home & Garden",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop",
    inStock: true
  },
  {
    id: "6",
    name: "Yoga Mat",
    description: "Non-slip yoga mat for home workouts",
    price: 29.99,
    category: "Sports",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop",
    inStock: true
  },
  {
    id: "7",
    name: "Facial Moisturizer",
    description: "Hydrating facial moisturizer for all skin types",
    price: 39.99,
    category: "Beauty",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop",
    inStock: true
  },
  {
    id: "8",
    name: "Board Game",
    description: "Fun family board game for all ages",
    price: 44.99,
    category: "Toys",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=300&h=300&fit=crop",
    inStock: true
  },
  {
    id: "9",
    name: "Car Phone Mount",
    description: "Universal car phone mount for safe driving",
    price: 14.99,
    category: "Automotive",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=300&h=300&fit=crop",
    inStock: true
  },
  {
    id: "10",
    name: "Laptop Stand",
    description: "Adjustable laptop stand for better ergonomics",
    price: 59.99,
    category: "Electronics",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=300&h=300&fit=crop",
    inStock: true
  },
  {
    id: "11",
    name: "Denim Jeans",
    description: "Classic denim jeans with perfect fit",
    price: 79.99,
    category: "Clothing",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop",
    inStock: true
  },
  {
    id: "12",
    name: "Cookbook",
    description: "Collection of delicious recipes from around the world",
    price: 29.99,
    category: "Books",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=300&fit=crop",
    inStock: true
  },
  {
    id: "13",
    name: "Coffee Maker",
    description: "Automatic coffee maker for perfect brew every time",
    price: 89.99,
    category: "Home & Garden",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop",
    inStock: true
  },
  {
    id: "14",
    name: "Running Shoes",
    description: "Comfortable running shoes for daily workouts",
    price: 119.99,
    category: "Sports",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
    inStock: true
  },
  {
    id: "15",
    name: "Lipstick Set",
    description: "Professional lipstick set in various shades",
    price: 54.99,
    category: "Beauty",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&h=300&fit=crop",
    inStock: true
  },
  {
    id: "16",
    name: "Puzzle Set",
    description: "1000-piece puzzle for hours of entertainment",
    price: 24.99,
    category: "Toys",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=300&fit=crop",
    inStock: true
  },
  {
    id: "17",
    name: "Car Air Freshener",
    description: "Long-lasting car air freshener in various scents",
    price: 9.99,
    category: "Automotive",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
    inStock: true
  },
  {
    id: "18",
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse for comfortable use",
    price: 39.99,
    category: "Electronics",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop",
    inStock: true
  },
  {
    id: "19",
    name: "Winter Jacket",
    description: "Warm winter jacket for cold weather",
    price: 149.99,
    category: "Clothing",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop",
    inStock: true
  },
  {
    id: "20",
    name: "Fiction Novel",
    description: "Bestselling fiction novel by acclaimed author",
    price: 19.99,
    category: "Books",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=300&fit=crop",
    inStock: true
  }
];
