export interface ApiResponse<T> {
  status: string;
  data: T;
  message: string;
  timestamp: string;
}

export interface Product {
  productId: string;
  productName: string;
  productDescription: string;
  productImageUrl: string;
  productPrice: number;
  productCategory: string;
}

interface CategoryResponse {
  categoryName: string;
  totalProducts: number;
}

export interface Category {
  name: string;
  image: string;
  totalProducts: number;
}

const categoryImageMap: Record<string, string> = {
  "Electronics": "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop",
  "Clothing": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop",
  "Books": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=200&fit=crop",
  "Sports": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop"
};

const DEFAULT_CATEGORY_IMAGE = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop";

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  productCategory: string | null;
  quantity: number;
  productPrice: number;
  totalPrice: number;
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

const simulateApiDelay = (ms: number = 200) => new Promise(resolve => setTimeout(resolve, ms));

const calculateCartTotals = (items: CartItem[]) => {
  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
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
  async getFeaturedProducts(): Promise<ApiResponse<Product[]>> {
    await simulateApiDelay(400);
    try {
      const response = await fetch("http://localhost:8080/api/product/getFeaturedProducts");
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

  async getCategories(): Promise<ApiResponse<Category[]>> {
    await simulateApiDelay(300);
    try {
      const response = await fetch("http://localhost:8080/api/product/getAllCategories");
      const data: CategoryResponse[] = await response.json();
      
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

  async getProducts(): Promise<ApiResponse<Product[]>> {
    try {
      const response = await fetch("http://localhost:8080/api/product/getAllProducts");
      
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

  async getProductsByCategory(category: string): Promise<ApiResponse<Product[]>> {
    await simulateApiDelay(300);
    try {
      const response = await fetch(`http://localhost:8080/api/product/getProductsByCategory/${encodeURIComponent(category)}`);
      
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
      console.error("Failed to fetch products by category", error);
      const filteredProducts = mockProducts.filter(product => product.productCategory === category);
      return {
        status: "success",
        data: filteredProducts,
        message: "products retrieved successfully",
        timestamp: new Date().toISOString()
      };
    }
  },

  async getCart(): Promise<ApiResponse<Cart>> {
    try {
      const response = await fetch("http://localhost:8080/api/cart/getCart");
      
      if (!response.ok) {
        throw new Error(`API returned ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      return {
        status: "success",
        data: data,
        message: "cart items retrieved successfully",
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error("Failed to fetch cart", error);
      return {
        status: "success",
        data: {
          cartItems: [],
          orderSummary: {
            subtotal: 0,
            taxPercentage: 18,
            taxAmount: 0,
            total: 0
          },
          totalItems: 0
        },
        message: "cart items retrieved successfully",
        timestamp: new Date().toISOString()
      };
    }
  },

  async addToCart(productId: string): Promise<ApiResponse<Cart>> {
    try {
      const response = await fetch(`http://localhost:8080/api/cart/addItem/${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!response.ok) {
        throw new Error(`API returned ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      return {
        status: "success",
        data: data,
        message: "item added to cart successfully",
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error("Failed to add item to cart", error);
      throw error;
    }
  },

  async removeFromCart(productId: string): Promise<ApiResponse<Cart>> {
    try {
      const response = await fetch(`http://localhost:8080/api/cart/removeItem/${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!response.ok) {
        throw new Error(`API returned ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      return {
        status: "success",
        data: data,
        message: "item removed from cart successfully",
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error("Failed to remove item from cart", error);
      throw error;
    }
  },

  async updateCart(productId: string, action: "add" | "subtract"): Promise<ApiResponse<Cart>> {
    if (action === "add") {
      return this.addToCart(productId);
    } else {
      return this.removeFromCart(productId);
    }
  },

  async clearCart(): Promise<ApiResponse<Cart>> {
    try {
      const response = await fetch("http://localhost:8080/api/cart/getCart", {
        method: "GET",
      });
      
      if (!response.ok) {
        throw new Error(`API returned ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      return {
        status: "success",
        data: data,
        message: "cart cleared successfully",
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error("Failed to clear cart", error);
      throw error;
    }
  },

  async createOrder(): Promise<ApiResponse<any>> {
    try {
      const response = await fetch("http://localhost:8080/api/order/createOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!response.ok) {
        throw new Error(`API returned ${response.status}: ${response.statusText}`);
      }
      
      return {
        status: "success",
        data: {},
        message: "order created successfully",
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error("Failed to create order", error);
      throw error;
    }
  }
};
