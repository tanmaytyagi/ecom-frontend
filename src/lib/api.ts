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
  productId: string;
  productName: string;
  productDescription: string;
  productImageUrl: string;
  productPrice: number;
  productCategory: string;
}

// ============================================================================
// CATEGORY API CONTRACTS
// ============================================================================

// External API response format
interface CategoryResponse {
  categoryName: string;
  totalProducts: number;
}

export interface Category {
  name: string;
  image: string;
  totalProducts: number;
}

// Category image mapping - hardcoded images based on category name
const categoryImageMap: Record<string, string> = {
  "Electronics": "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop",
  "Clothing": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop",
  "Books": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=200&fit=crop",
  "Sports": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop"
};

// Default image for categories not in the mapping
const DEFAULT_CATEGORY_IMAGE = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop";

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
  totalItems: number;
}

// ============================================================================
// MOCK DATA STORAGE (Simulates Database)
// ============================================================================

// Mock products database
const mockProducts: Product[] = [
  {
    productId: "aabdbb5b",
    productName: "Wireless Headphones",
    productDescription: "High-quality wireless headphones with noise cancellation",
    productImageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
    productPrice: 99.99,
    productCategory: "Electronics"
  },
  {
    productId: "smartwatch123",
    productName: "Smart Watch",
    productDescription: "Feature-rich smartwatch with health tracking",
    productImageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
    productPrice: 199.99,
    productCategory: "Electronics"
  },
  {
    productId: "laptopstand456",
    productName: "Laptop Stand",
    productDescription: "Ergonomic laptop stand for better posture",
    productImageUrl: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=300&fit=crop",
    productPrice: 49.99,
    productCategory: "Electronics"
  },
  {
    productId: "wirelessmouse789",
    productName: "Wireless Mouse",
    productDescription: "Precision wireless mouse for productivity",
    productImageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop",
    productPrice: 29.99,
    productCategory: "Electronics"
  },
  {
    productId: "tshirt101",
    productName: "T Shirt",
    productDescription: "Comfortable cotton t-shirt in various colors",
    productImageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
    productPrice: 24.99,
    productCategory: "Clothing"
  },
  {
    productId: "denimjeans202",
    productName: "Denim Jeans",
    productDescription: "Classic denim jeans with perfect fit",
    productImageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop",
    productPrice: 79.99,
    productCategory: "Clothing"
  },
  {
    productId: "programmingbook303",
    productName: "Programming Book",
    productDescription: "Comprehensive guide to modern programming",
    productImageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=300&fit=crop",
    productPrice: 49.99,
    productCategory: "Books"
  },
  {
    productId: "yogamat404",
    productName: "Yoga Mat",
    productDescription: "Non-slip yoga mat for home workouts",
    productImageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop",
    productPrice: 29.99,
    productCategory: "Sports"
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
  },
  totalItems: 0
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
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  mockCart = {
    cartItems: items,
    orderSummary,
    totalItems
  };
  return mockCart;
};

export const api = {
  // ===== HOMEPAGE ENDPOINTS =====
  
  // GET /home/featured
  async getFeaturedProducts(): Promise<ApiResponse<Product[]>> {
    await simulateApiDelay(400);
    try {
      const response = await fetch("http://localhost:8080/home/featuredproducts");
      const data = await response.json();
      return {
        status: "success",
        data: data,
        message: "featured products retrieved successfully",
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error("Failed to fetch featured products", error);
      return {
        status: "success",
        data: mockProducts.slice(0, 4),
        message: "featured products retrieved successfully",
        timestamp: new Date().toISOString()
      };
    }
  },

  // GET /home/categories
  async getCategories(): Promise<ApiResponse<Category[]>> {
    await simulateApiDelay(300);
    try {
      const response = await fetch("http://localhost:8080/home/categories");
      const data: CategoryResponse[] = await response.json();
      
      // Map external API response to internal Category format with hardcoded images
      const categories: Category[] = data.map((item) => ({
        name: item.categoryName,
        image: categoryImageMap[item.categoryName] || DEFAULT_CATEGORY_IMAGE,
        totalProducts: item.totalProducts
      }));
      
      return {
        status: "success",
        data: categories,
        message: "categories retrieved successfully",
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error("Failed to fetch categories", error);
      return {
        status: "success",
        data: mockCategories,
        message: "categories retrieved successfully",
        timestamp: new Date().toISOString()
      };
    }
  },

  // ===== PRODUCT ENDPOINTS =====
  
  // GET /products
  async getProducts(): Promise<ApiResponse<Product[]>> {
    try {
      const response = await fetch("http://localhost:8080/user-service/product/getAllProducts");
      
      if (!response.ok) {
        throw new Error(`API returned ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      return {
        status: "success",
        data: data,
        message: "products retrieved successfully",
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error("Failed to fetch products", error);
      return {
        status: "success",
        data: mockProducts,
        message: "products retrieved successfully",
        timestamp: new Date().toISOString()
      };
    }
  },

  // GET /products/:category
  async getProductsByCategory(category: string): Promise<ApiResponse<Product[]>> {
    await simulateApiDelay(300);
    const filteredProducts = mockProducts.filter(product => product.productCategory === category);
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
    
    // For static demo - always return the same cart data
    const staticCart: Cart = {
      cartItems: [
        {
          productId: "laptopstand456",
          name: "Laptop Stand",
          category: "Electronics",
          price: 49.99,
          total: 649.87,
          quantity: 13
        },
        {
          productId: "wirelessmouse789",
          name: "Wireless Mouse",
          category: "Electronics",
          price: 29.99,
          total: 29.99,
          quantity: 1
        }
      ],
      orderSummary: {
        subtotal: 679.86,
        taxPercentage: 18,
        taxAmount: 122.37,
        total: 802.23
      },
      totalItems: 14
    };
    
    return {
      status: "success",
      data: staticCart,
      message: "cart items retrieved successfully",
      timestamp: new Date().toISOString()
    };
  },

  // POST /cart
  async updateCart(productId: string, action: "add" | "subtract"): Promise<ApiResponse<Cart>> {
    await simulateApiDelay(300);
    
    // For static demo - always return the same cart data
    // In real backend, this would update the cart and return updated data
    const staticCart: Cart = {
      cartItems: [
        {
          productId: "laptopstand456",
          name: "Laptop Stand",
          category: "Electronics",
          price: 49.99,
          total: 649.87,
          quantity: 13
        },
        {
          productId: "wirelessmouse789",
          name: "Wireless Mouse",
          category: "Electronics",
          price: 29.99,
          total: 29.99,
          quantity: 1
        }
      ],
      orderSummary: {
        subtotal: 679.86,
        taxPercentage: 18,
        taxAmount: 122.37,
        total: 802.23
      },
      totalItems: 14
    };
    
    return {
      status: "success",
      data: staticCart,
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
      },
      totalItems: 0
    };
    
    return {
      status: "success",
      data: [],
      message: "cart cleared successfully",
      timestamp: new Date().toISOString()
    };
  }
};
