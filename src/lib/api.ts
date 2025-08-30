// ============================================================================
// API CONTRACTS - Request/Response interfaces for backend communication
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
  inStock: boolean;
  stockQuantity: number;
}

// Request: GET /api/products
// Response: ApiResponse<Product[]>

// Request: GET /api/products/featured
// Response: ApiResponse<Product[]>

// ============================================================================
// CART API CONTRACTS
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

// Request: GET /api/cart
// Response: ApiResponse<Cart>

// Request: POST /api/cart/add
// Body: { productId: string; quantity?: number }
// Response: ApiResponse<Cart>

// Request: PUT /api/cart/update
// Body: { itemId: string; quantity: number }
// Response: ApiResponse<Cart>

// Request: DELETE /api/cart/remove
// Body: { itemId: string }
// Response: ApiResponse<Cart>

// Request: DELETE /api/cart/clear
// Response: ApiResponse<Cart>

// ============================================================================
// CATEGORY API CONTRACTS
// ============================================================================

export interface Category {
  id: string;
  name: string;
  image: string;
  productCount: number;
}

// Request: GET /api/categories
// Response: ApiResponse<Category[]>

// ============================================================================
// HOMEPAGE API CONTRACTS
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

// Request: GET /api/homepage
// Response: ApiResponse<HomePageData>

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
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
    inStock: true,
    stockQuantity: 50
  },
  {
    id: "2",
    name: "Smart Watch",
    description: "Feature-rich smartwatch with health tracking",
    price: 199.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
    inStock: true,
    stockQuantity: 25
  },
  {
    id: "3",
    name: "Laptop Stand",
    description: "Ergonomic laptop stand for better posture",
    price: 49.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=300&fit=crop",
    inStock: true,
    stockQuantity: 100
  },
  {
    id: "4",
    name: "Wireless Mouse",
    description: "Precision wireless mouse for productivity",
    price: 29.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop",
    inStock: true,
    stockQuantity: 75
  },
  {
    id: "5",
    name: "Cotton T-Shirt",
    description: "Comfortable cotton t-shirt in various colors",
    price: 24.99,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
    inStock: true,
    stockQuantity: 200
  },
  {
    id: "6",
    name: "Denim Jeans",
    description: "Classic denim jeans with perfect fit",
    price: 79.99,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop",
    inStock: true,
    stockQuantity: 60
  },
  {
    id: "7",
    name: "Programming Book",
    description: "Comprehensive guide to modern programming",
    price: 49.99,
    category: "Books",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=300&fit=crop",
    inStock: true,
    stockQuantity: 30
  },
  {
    id: "8",
    name: "Yoga Mat",
    description: "Non-slip yoga mat for home workouts",
    price: 29.99,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop",
    inStock: true,
    stockQuantity: 80
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
  id: "cart-1",
  items: [],
  totalItems: 0,
  subtotal: 0,
  tax: 0,
  total: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// ============================================================================
// BACKEND API SIMULATION (Replace with real HTTP calls)
// ============================================================================

// Helper function to simulate API delay
const simulateApiDelay = (ms: number = 200) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to calculate cart totals (Backend logic)
const calculateCartTotals = (items: CartItem[]) => {
  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    tax: Math.round(tax * 100) / 100,
    total: Math.round(total * 100) / 100,
    totalItems
  };
};

// Helper function to update cart (Backend logic)
const updateCart = (items: CartItem[]) => {
  const totals = calculateCartTotals(items);
  mockCart = {
    ...mockCart,
    items,
    ...totals,
    updatedAt: new Date().toISOString()
  };
  return mockCart;
};

export const api = {
  // ===== PRODUCT ENDPOINTS =====
  
  // GET /api/products
  async getProducts(): Promise<ApiResponse<Product[]>> {
    await simulateApiDelay(300);
    return {
      success: true,
      data: mockProducts,
      message: 'Products retrieved successfully'
    };
  },

  // GET /api/products/featured
  async getFeaturedProducts(): Promise<ApiResponse<Product[]>> {
    await simulateApiDelay(200);
    return {
      success: true,
      data: mockProducts.slice(0, 4),
      message: 'Featured products retrieved successfully'
    };
  },

  // ===== CATEGORY ENDPOINTS =====
  
  // GET /api/categories
  async getCategories(): Promise<ApiResponse<Category[]>> {
    await simulateApiDelay(150);
    return {
      success: true,
      data: mockCategories,
      message: 'Categories retrieved successfully'
    };
  },

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
      message: 'Homepage data retrieved successfully'
    };
  },

  // ===== CART ENDPOINTS =====
  
  // GET /api/cart
  async getCart(): Promise<ApiResponse<Cart>> {
    await simulateApiDelay(200);
    return {
      success: true,
      data: mockCart,
      message: 'Cart retrieved successfully'
    };
  },

  // POST /api/cart/add
  // Body: { productId: string; quantity?: number }
  async addToCart(productId: string, quantity: number = 1): Promise<ApiResponse<Cart>> {
    await simulateApiDelay(300);
    
    // Backend validation logic
    const product = mockProducts.find(p => p.id === productId);
    if (!product) {
      return {
        success: false,
        error: 'Product not found',
        message: 'Product not found'
      };
    }
    
    if (!product.inStock || product.stockQuantity === 0) {
      return {
        success: false,
        error: 'Product is out of stock',
        message: 'Product is out of stock'
      };
    }
    
    if (quantity > product.stockQuantity) {
      return {
        success: false,
        error: `Only ${product.stockQuantity} items available in stock`,
        message: `Only ${product.stockQuantity} items available in stock`
      };
    }
    
    // Backend cart logic
    const existingItem = mockCart.items.find(item => item.productId === productId);
    
    if (existingItem) {
      const newTotalQuantity = existingItem.quantity + quantity;
      if (newTotalQuantity > product.stockQuantity) {
        return {
          success: false,
          error: `Cannot add ${quantity} more items. Only ${product.stockQuantity - existingItem.quantity} available`,
          message: `Cannot add ${quantity} more items. Only ${product.stockQuantity - existingItem.quantity} available`
        };
      }
      existingItem.quantity = newTotalQuantity;
    } else {
      const newItem: CartItem = {
        id: `cart-item-${Date.now()}`,
        productId,
        product,
        quantity,
        addedAt: new Date().toISOString()
      };
      mockCart.items.push(newItem);
    }

    // Backend updates cart totals
    const updatedCart = updateCart(mockCart.items);
    
    return {
      success: true,
      data: updatedCart,
      message: 'Item added to cart successfully'
    };
  },

  // PUT /api/cart/update
  // Body: { itemId: string; quantity: number }
  async updateCartItemQuantity(itemId: string, quantity: number): Promise<ApiResponse<Cart>> {
    await simulateApiDelay(200);
    
    // Backend validation logic
    const item = mockCart.items.find(item => item.id === itemId);
    if (!item) {
      return {
        success: false,
        error: 'Cart item not found',
        message: 'Cart item not found'
      };
    }

    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      const updatedItems = mockCart.items.filter(item => item.id !== itemId);
      const updatedCart = updateCart(updatedItems);
      
      return {
        success: true,
        data: updatedCart,
        message: 'Item removed from cart'
      };
    }
    
    // Backend validation for new quantity
    if (quantity > item.product.stockQuantity) {
      return {
        success: false,
        error: `Only ${item.product.stockQuantity} items available in stock`,
        message: `Only ${item.product.stockQuantity} items available in stock`
      };
    }
    
    // Backend updates item quantity
    item.quantity = quantity;
    const updatedCart = updateCart(mockCart.items);
    
    return {
      success: true,
      data: updatedCart,
      message: 'Cart item quantity updated successfully'
    };
  },

  // DELETE /api/cart/remove
  // Body: { itemId: string }
  async removeFromCart(itemId: string): Promise<ApiResponse<Cart>> {
    await simulateApiDelay(200);
    
    // Backend validation logic
    const itemExists = mockCart.items.some(item => item.id === itemId);
    if (!itemExists) {
      return {
        success: false,
        error: 'Cart item not found',
        message: 'Cart item not found'
      };
    }
    
    // Backend removes item
    const updatedItems = mockCart.items.filter(item => item.id !== itemId);
    const updatedCart = updateCart(updatedItems);
    
    return {
      success: true,
      data: updatedCart,
      message: 'Item removed from cart successfully'
    };
  },

  // DELETE /api/cart/clear
  async clearCart(): Promise<ApiResponse<Cart>> {
    await simulateApiDelay(200);
    
    // Backend clears cart
    const updatedCart = updateCart([]);
    
    return {
      success: true,
      data: updatedCart,
      message: 'Cart cleared successfully'
    };
  }
};
