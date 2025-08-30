// ============================================================================
// API CONTRACTS - Exact backend contracts as specified
// ============================================================================

// Generic API Response
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message: string;
}

// ============================================================================
// PRODUCT API CONTRACTS
// ============================================================================

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

// ============================================================================
// CART API CONTRACTS
// ============================================================================

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
  description: string;
}

export interface Cart {
  cartId: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
}

// ============================================================================
// HOMEPAGE API CONTRACTS
// ============================================================================

export interface Category {
  id: string;
  name: string;
  image: string;
  productCount: number;
}

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

// ============================================================================
// MOCK DATA STORAGE (Simulates Database)
// ============================================================================

// Mock products database
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 99.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop"
  },
  {
    id: "2",
    name: "Smart Watch",
    description: "Feature-rich smartwatch with health tracking",
    price: 199.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop"
  },
  {
    id: "3",
    name: "Laptop Stand",
    description: "Ergonomic laptop stand for better posture",
    price: 49.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=300&fit=crop"
  },
  {
    id: "4",
    name: "Wireless Mouse",
    description: "Precision wireless mouse for productivity",
    price: 29.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop"
  },
  {
    id: "5",
    name: "Cotton T-Shirt",
    description: "Comfortable cotton t-shirt in various colors",
    price: 24.99,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop"
  },
  {
    id: "6",
    name: "Denim Jeans",
    description: "Classic denim jeans with perfect fit",
    price: 79.99,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop"
  },
  {
    id: "7",
    name: "Programming Book",
    description: "Comprehensive guide to modern programming",
    price: 49.99,
    category: "Books",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=300&fit=crop"
  },
  {
    id: "8",
    name: "Yoga Mat",
    description: "Non-slip yoga mat for home workouts",
    price: 29.99,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop"
  }
];

// Mock categories database
const mockCategories: Category[] = [
  {
    id: "1",
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop",
    productCount: 4
  },
  {
    id: "2",
    name: "Clothing",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop",
    productCount: 2
  },
  {
    id: "3",
    name: "Books",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=200&fit=crop",
    productCount: 1
  },
  {
    id: "4",
    name: "Sports",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop",
    productCount: 1
  }
];

// Mock cart storage (simulates user session/database)
let mockCart: Cart = {
  cartId: "cart-1",
  items: [],
  subtotal: 0,
  tax: 0,
  total: 0
};

// ============================================================================
// BACKEND API SIMULATION (Replace with real HTTP calls)
// ============================================================================

// Helper function to simulate API delay
const simulateApiDelay = (ms: number = 200) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to calculate cart totals (Backend logic)
const calculateCartTotals = (items: CartItem[]) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    tax: Math.round(tax * 100) / 100,
    total: Math.round(total * 100) / 100
  };
};

// Helper function to update cart (Backend logic)
const updateCart = (items: CartItem[]) => {
  const totals = calculateCartTotals(items);
  mockCart = {
    ...mockCart,
    items,
    ...totals
  };
  return mockCart;
};

export const api = {
  // ===== HOMEPAGE ENDPOINTS =====
  
  // GET /api/homepage
  async getHomePageData(): Promise<ApiResponse<HomePageData>> {
    await simulateApiDelay(400);
    return {
      success: true,
      data: {
        featuredProducts: mockProducts.slice(0, 4),
        categories: mockCategories,
        heroBanner: {
          title: "Discover Amazing Tech Products",
          subtitle: "Find the latest gadgets and electronics at unbeatable prices",
          ctaText: "Shop Now",
          ctaLink: "/products"
        }
      },
      message: "Homepage data retrieved successfully"
    };
  },

  // ===== PRODUCT ENDPOINTS =====
  
  // GET /api/products
  async getProducts(): Promise<ApiResponse<Product[]>> {
    await simulateApiDelay(300);
    return {
      success: true,
      data: mockProducts,
      message: "Products retrieved successfully"
    };
  },

  // ===== CART ENDPOINTS =====
  
  // GET /api/cart
  async getCart(): Promise<ApiResponse<Cart>> {
    await simulateApiDelay(200);
    return {
      success: true,
      data: mockCart,
      message: "Cart retrieved successfully"
    };
  },

  // POST /api/cart (Add to cart)
  async addToCart(cartId: string, productId: string): Promise<ApiResponse<Cart>> {
    await simulateApiDelay(300);
    
    // Backend logic: Find product and add to cart
    const product = mockProducts.find(p => p.id === productId);
    if (!product) {
      return {
        success: false,
        error: "Product not found",
        message: "Product not found"
      };
    }
    
    // Check if item already exists in cart
    const existingItem = mockCart.items.find(item => item.id === productId);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      const newItem: CartItem = {
        id: productId,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        category: product.category,
        description: product.description
      };
      mockCart.items.push(newItem);
    }

    // Backend updates cart totals
    const updatedCart = updateCart(mockCart.items);
    
    return {
      success: true,
      data: updatedCart,
      message: "Cart updated successfully"
    };
  },

  // GET /api/addtocart/:productId
  async addToCartByProductId(productId: string): Promise<ApiResponse<{ message: string }>> {
    await simulateApiDelay(300);
    
    // Backend logic: Find product and add to cart
    const product = mockProducts.find(p => p.id === productId);
    if (!product) {
      return {
        success: false,
        error: "Product not found",
        message: "Product not found"
      };
    }
    
    // Check if item already exists in cart
    const existingItem = mockCart.items.find(item => item.id === productId);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      const newItem: CartItem = {
        id: productId,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        category: product.category,
        description: product.description
      };
      mockCart.items.push(newItem);
    }

    // Backend updates cart totals
    updateCart(mockCart.items);
    
    return {
      success: true,
      message: "Cart updated successfully"
    };
  },

  // GET /api/removefromcart/:productId
  async removeFromCartByProductId(productId: string): Promise<ApiResponse<{ message: string }>> {
    await simulateApiDelay(200);
    
    // Backend logic: Remove item from cart
    const existingItem = mockCart.items.find(item => item.id === productId);
    
    if (!existingItem) {
      return {
        success: false,
        error: "Item not found in cart",
        message: "Item not found in cart"
      };
    }
    
    if (existingItem.quantity > 1) {
      existingItem.quantity -= 1;
    } else {
      mockCart.items = mockCart.items.filter(item => item.id !== productId);
    }

    // Backend updates cart totals
    updateCart(mockCart.items);
    
    return {
      success: true,
      message: "Cart updated successfully"
    };
  },

  // GET /api/clearcart
  async clearCart(): Promise<ApiResponse<{ cartId: string }>> {
    await simulateApiDelay(200);
    
    // Backend clears cart
    mockCart.items = [];
    updateCart(mockCart.items);
    
    return {
      success: true,
      data: {
        cartId: mockCart.cartId
      },
      message: "Cart cleared successfully"
    };
  }
};
