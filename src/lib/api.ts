import { Product, Category, Cart, CartItem, HomePageData, ApiResponse } from '@/types';

// ============================================================================
// MOCK DATA STORAGE (Simulates Database)
// ============================================================================

// Mock products database
const products: Product[] = [
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
const categories: Category[] = [
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
// BUSINESS LOGIC (Server-side validation and calculations)
// ============================================================================

class CartService {
  private static TAX_RATE = 0.08; // 8% tax
  private static MAX_QUANTITY_PER_ITEM = 10;
  private static MAX_ITEMS_IN_CART = 20;

  // Validate product exists and is in stock
  static validateProduct(productId: string, quantity: number): { valid: boolean; error?: string; product?: Product } {
    const product = products.find(p => p.id === productId);
    
    if (!product) {
      return { valid: false, error: 'Product not found' };
    }
    
    if (!product.inStock) {
      return { valid: false, error: 'Product is out of stock' };
    }
    
    if (quantity > product.stockQuantity) {
      return { valid: false, error: `Only ${product.stockQuantity} items available in stock` };
    }
    
    if (quantity > this.MAX_QUANTITY_PER_ITEM) {
      return { valid: false, error: `Maximum ${this.MAX_QUANTITY_PER_ITEM} items per product allowed` };
    }
    
    return { valid: true, product };
  }

  // Validate cart limits
  static validateCartLimits(currentItems: CartItem[], newQuantity: number): { valid: boolean; error?: string } {
    const totalItems = currentItems.reduce((sum, item) => sum + item.quantity, 0) + newQuantity;
    
    if (totalItems > this.MAX_ITEMS_IN_CART) {
      return { valid: false, error: `Maximum ${this.MAX_ITEMS_IN_CART} items allowed in cart` };
    }
    
    return { valid: true };
  }

  // Calculate cart totals with business rules
  static calculateCartTotals(items: CartItem[]): { subtotal: number; tax: number; total: number; totalItems: number } {
    const subtotal = items.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);

    const tax = subtotal * this.TAX_RATE;
    const total = subtotal + tax;
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return {
      subtotal: Math.round(subtotal * 100) / 100,
      tax: Math.round(tax * 100) / 100,
      total: Math.round(total * 100) / 100,
      totalItems
    };
  }

  // Update cart with new totals and timestamps
  static updateCart(cart: Cart, items: CartItem[]): Cart {
    const totals = this.calculateCartTotals(items);
    
    return {
      ...cart,
      items,
      ...totals,
      updatedAt: new Date().toISOString()
    };
  }
}

// ============================================================================
// API ENDPOINTS (Simulates REST API)
// ============================================================================

export const api = {
  // ===== PRODUCT ENDPOINTS =====
  
  async getProducts(): Promise<ApiResponse<Product[]>> {
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay
    
    return {
      success: true,
      data: products,
      message: 'Products retrieved successfully'
    };
  },

  async getFeaturedProducts(): Promise<ApiResponse<Product[]>> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return {
      success: true,
      data: products.slice(0, 4),
      message: 'Featured products retrieved successfully'
    };
  },

  async getProduct(productId: string): Promise<ApiResponse<Product>> {
    await new Promise(resolve => setTimeout(resolve, 150));
    
    const product = products.find(p => p.id === productId);
    
    if (!product) {
      return {
        success: false,
        error: 'Product not found',
        message: 'The requested product could not be found'
      };
    }
    
    return {
      success: true,
      data: product,
      message: 'Product retrieved successfully'
    };
  },

  // ===== CATEGORY ENDPOINTS =====
  
  async getCategories(): Promise<ApiResponse<Category[]>> {
    await new Promise(resolve => setTimeout(resolve, 150));
    
    return {
      success: true,
      data: categories,
      message: 'Categories retrieved successfully'
    };
  },

  // ===== HOMEPAGE ENDPOINTS =====
  
  async getHomePageData(): Promise<ApiResponse<HomePageData>> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return {
      success: true,
      data: {
        featuredProducts: products.slice(0, 4),
        categories: categories,
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
  
  async getCart(): Promise<ApiResponse<Cart>> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return {
      success: true,
      data: mockCart,
      message: 'Cart retrieved successfully'
    };
  },

  async addToCart(productId: string, quantity: number = 1): Promise<ApiResponse<Cart>> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Validate product and quantity
    const productValidation = CartService.validateProduct(productId, quantity);
    if (!productValidation.valid) {
      return {
        success: false,
        error: productValidation.error || 'Product validation failed',
        message: productValidation.error || 'Product validation failed'
      };
    }
    
    // Validate cart limits
    const cartValidation = CartService.validateCartLimits(mockCart.items, quantity);
    if (!cartValidation.valid) {
      return {
        success: false,
        error: cartValidation.error || 'Cart validation failed',
        message: cartValidation.error || 'Cart validation failed'
      };
    }
    
    // Add to cart logic
    const existingItem = mockCart.items.find(item => item.productId === productId);
    
    if (existingItem) {
      // Check if new total quantity exceeds stock
      const newTotalQuantity = existingItem.quantity + quantity;
      const stockValidation = CartService.validateProduct(productId, newTotalQuantity);
      if (!stockValidation.valid) {
        return {
          success: false,
          error: stockValidation.error || 'Stock validation failed',
          message: stockValidation.error || 'Stock validation failed'
        };
      }
      
      existingItem.quantity = newTotalQuantity;
    } else {
      const newItem: CartItem = {
        id: `cart-item-${Date.now()}`,
        productId,
        product: productValidation.product!,
        quantity,
        addedAt: new Date().toISOString()
      };
      mockCart.items.push(newItem);
    }

    // Update cart with new totals
    mockCart = CartService.updateCart(mockCart, mockCart.items);
    
    return {
      success: true,
      data: mockCart,
      message: 'Item added to cart successfully'
    };
  },

  async updateCartItemQuantity(itemId: string, quantity: number): Promise<ApiResponse<Cart>> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const item = mockCart.items.find(item => item.id === itemId);
    if (!item) {
      return {
        success: false,
        error: 'Cart item not found',
        message: 'The requested cart item could not be found'
      };
    }

    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      mockCart.items = mockCart.items.filter(item => item.id !== itemId);
    } else {
      // Validate new quantity
      const productValidation = CartService.validateProduct(item.productId, quantity);
      if (!productValidation.valid) {
        return {
          success: false,
          error: productValidation.error || 'Product validation failed',
          message: productValidation.error || 'Product validation failed'
        };
      }
      
      item.quantity = quantity;
    }

    // Update cart with new totals
    mockCart = CartService.updateCart(mockCart, mockCart.items);
    
    return {
      success: true,
      data: mockCart,
      message: quantity <= 0 ? 'Item removed from cart' : 'Cart item quantity updated successfully'
    };
  },

  async removeFromCart(itemId: string): Promise<ApiResponse<Cart>> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const itemExists = mockCart.items.some(item => item.id === itemId);
    if (!itemExists) {
      return {
        success: false,
        error: 'Cart item not found',
        message: 'The requested cart item could not be found'
      };
    }
    
    mockCart.items = mockCart.items.filter(item => item.id !== itemId);
    mockCart = CartService.updateCart(mockCart, mockCart.items);
    
    return {
      success: true,
      data: mockCart,
      message: 'Item removed from cart successfully'
    };
  },

  async clearCart(): Promise<ApiResponse<Cart>> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    mockCart.items = [];
    mockCart = CartService.updateCart(mockCart, mockCart.items);
    
    return {
      success: true,
      data: mockCart,
      message: 'Cart cleared successfully'
    };
  }
};
