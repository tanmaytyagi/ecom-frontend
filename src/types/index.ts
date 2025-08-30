// Core product interface - only essential fields
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  inStock: boolean;
}

// Cart item interface
export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
}

// Cart interface
export interface Cart {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  total: number;
}

// Category interface
export interface Category {
  id: string;
  name: string;
  image: string;
  productCount: number;
}

// Homepage data interface
export interface HomePageData {
  featuredProducts: Product[];
  categories: Category[];
  heroBanner: {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
  };
}
