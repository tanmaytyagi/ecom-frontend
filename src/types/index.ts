// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message: string;
}

// ============================================================================
// PRODUCT TYPES
// ============================================================================

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  inStock: boolean;
  stockQuantity: number;
}

// ============================================================================
// CART TYPES
// ============================================================================

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  addedAt: string;
}

export interface Cart {
  id: string;
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  tax: number;
  total: number;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// CATEGORY TYPES
// ============================================================================

export interface Category {
  id: string;
  name: string;
  image: string;
  productCount: number;
}

// ============================================================================
// HOMEPAGE TYPES
// ============================================================================

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
