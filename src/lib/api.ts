// ============================================================================
// API CONTRACTS - Exact backend contracts as specified
// ============================================================================

// Generic API Response
export interface ApiResponse<T> {
  status: string;
  data: T;
  message: string;
  timestamp: string;
}

// ============================================================================
// PRODUCT API CONTRACTS
// ============================================================================

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
}

// ============================================================================
// CATEGORY API CONTRACTS
// ============================================================================

export interface Category {
  name: string;
  image: string;
  totalProducts: number;
}

// ============================================================================
// CART API CONTRACTS
// ============================================================================

export interface CartItem {
  productId: string;
  name: string;
  category: string;
  price: number;
  total: number;
  quantity: number;
}

export interface OrderSummary {
  subtotal: number;
  taxPercentage: number;
  taxAmount: number;
  total: number;
}

export interface Cart {
  cartItems: CartItem[];
  orderSummary: OrderSummary;
}

// ============================================================================
// MOCK DATA STORAGE (Simulates Database)
// ============================================================================

// Mock products database
const mockProducts: Product[] = [
  {
    id: "aabdbb5b",
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
    price: 99.99,
    category: "Electronics"
  },
  {
    id: "smartwatch123",
    name: "Smart Watch",
    description: "Feature-rich smartwatch with health tracking",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
    price: 199.99,
    category: "Electronics"
  },
  {
    id: "laptopstand456",
    name: "Laptop Stand",
    description: "Ergonomic laptop stand for better posture",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=300&fit=crop",
    price: 49.99,
    category: "Electronics"
  },
  {
    id: "wirelessmouse789",
    name: "Wireless Mouse",
    description: "Precision wireless mouse for productivity",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop",
    price: 29.99,
    category: "Electronics"
  },
  {
    id: "tshirt101",
    name: "T Shirt",
    description: "Comfortable cotton t-shirt in various colors",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
    price: 24.99,
    category: "Clothing"
  },
  {
    id: "denimjeans202",
    name: "Denim Jeans",
    description: "Classic denim jeans with perfect fit",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop",
    price: 79.99,
    category: "Clothing"
  },
  {
    id: "programmingbook303",
    name: "Programming Book",
    description: "Comprehensive guide to modern programming",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=300&fit=crop",
    price: 49.99,
    category: "Books"
  },
  {
    id: "yogamat404",
    name: "Yoga Mat",
    description: "Non-slip yoga mat for home workouts",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop",
    price: 29.99,
    category: "Sports"
  }
];

// Mock categories database
const mockCategories: Category[] = [
  {
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop",
    totalProducts: 13
  },
  {
    name: "Clothing",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop",
    totalProducts: 15
  },
  {
    name: "Books",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=200&fit=crop",
    totalProducts: 7
  },
  {
    name: "Sports",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop",
    totalProducts: 10
  }
];

// Mock cart storage (simulates user session/database)
let mockCart: Cart = {
  cartItems: [],
  orderSummary: {
    subtotal: 0,
    taxPercentage: 18,
    taxAmount: 0,
    total: 0
  }
};

// ============================================================================
// BACKEND API SIMULATION (Replace with real HTTP calls)
// ============================================================================

// Helper function to simulate API delay
const simulateApiDelay = (ms: number = 200) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to calculate cart totals (Backend logic)
const calculateCartTotals = (items: CartItem[]) => {
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const taxPercentage = 18;
  const taxAmount = subtotal * (taxPercentage / 100);
  const total = subtotal + taxAmount;

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    taxPercentage,
    taxAmount: Math.round(taxAmount * 100) / 100,
    total: Math.round(total * 100) / 100
  };
};

// Helper function to update cart (Backend logic)
const updateCart = (items: CartItem[]) => {
  const orderSummary = calculateCartTotals(items);
  mockCart = {
    cartItems: items,
    orderSummary
  };
  return mockCart;
};

export const api = {
  // ===== HOMEPAGE ENDPOINTS =====
  
  // GET /home/featured
  async getFeaturedProducts(): Promise<ApiResponse<Product[]>> {
    await simulateApiDelay(400);
    return {
      status: "success",
      data: mockProducts.slice(0, 4),
      message: "featured products retrieved successfully",
      timestamp: new Date().toISOString()
    };
  },

  // GET /home/categories
  async getCategories(): Promise<ApiResponse<Category[]>> {
    await simulateApiDelay(300);
    return {
      status: "success",
      data: mockCategories,
      message: "categories retrieved successfully",
      timestamp: new Date().toISOString()
    };
  },

  // ===== PRODUCT ENDPOINTS =====
  
  // GET /products
  async getProducts(): Promise<ApiResponse<Product[]>> {
    await simulateApiDelay(300);
    return {
      status: "success",
      data: mockProducts,
      message: "products retrieved successfully",
      timestamp: new Date().toISOString()
    };
  },

  // GET /products/:category
  async getProductsByCategory(category: string): Promise<ApiResponse<Product[]>> {
    await simulateApiDelay(300);
    const filteredProducts = mockProducts.filter(product => product.category === category);
    return {
      status: "success",
      data: filteredProducts,
      message: "products retrieved successfully",
      timestamp: new Date().toISOString()
    };
  },

  // ===== CART ENDPOINTS =====
  
  // GET /cart
  async getCart(): Promise<ApiResponse<Cart>> {
    await simulateApiDelay(200);
    return {
      status: "success",
      data: mockCart,
      message: "cart items retrieved successfully",
      timestamp: new Date().toISOString()
    };
  },

  // POST /cart
  async updateCart(productId: string, action: "add" | "subtract"): Promise<ApiResponse<Cart>> {
    await simulateApiDelay(300);
    
    // Backend logic: Find product
    const product = mockProducts.find(p => p.id === productId);
    if (!product) {
      throw new Error("Product not found");
    }
    
    // Find existing cart item
    const existingItem = mockCart.cartItems.find(item => item.productId === productId);
    
    if (action === "add") {
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.total = existingItem.price * existingItem.quantity;
      } else {
        const newItem: CartItem = {
          productId,
          name: product.name,
          category: product.category,
          price: product.price,
          total: product.price,
          quantity: 1
        };
        mockCart.cartItems.push(newItem);
      }
    } else if (action === "subtract") {
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          existingItem.total = existingItem.price * existingItem.quantity;
        } else {
          // Remove item if quantity becomes 0
          mockCart.cartItems = mockCart.cartItems.filter(item => item.productId !== productId);
        }
      }
    }

    // Backend updates cart totals
    const updatedCart = updateCart(mockCart.cartItems);
    
    return {
      status: "success",
      data: updatedCart,
      message: "cart items retrieved successfully",
      timestamp: new Date().toISOString()
    };
  },

  // GET /cart/clearcart
  async clearCart(): Promise<ApiResponse<any>> {
    await simulateApiDelay(200);
    
    // Backend clears cart
    mockCart = {
      cartItems: [],
      orderSummary: {
        subtotal: 0,
        taxPercentage: 18,
        taxAmount: 0,
        total: 0
      }
    };
    
    return {
      status: "success",
      data: [],
      message: "cart cleared successfully",
      timestamp: new Date().toISOString()
    };
  }
};
