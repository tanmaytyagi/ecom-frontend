import { Product, Category, Cart, CartItem, HomePageData } from '@/types';

// Mock data - in real app, this would come from database
const products: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 99.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
    inStock: true
  },
  {
    id: "2",
    name: "Smart Watch",
    description: "Feature-rich smartwatch with health tracking",
    price: 199.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
    inStock: true
  },
  {
    id: "3",
    name: "Laptop Stand",
    description: "Ergonomic laptop stand for better posture",
    price: 49.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=300&fit=crop",
    inStock: true
  },
  {
    id: "4",
    name: "Wireless Mouse",
    description: "Precision wireless mouse for productivity",
    price: 29.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop",
    inStock: true
  },
  {
    id: "5",
    name: "Cotton T-Shirt",
    description: "Comfortable cotton t-shirt in various colors",
    price: 24.99,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
    inStock: true
  },
  {
    id: "6",
    name: "Denim Jeans",
    description: "Classic denim jeans with perfect fit",
    price: 79.99,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop",
    inStock: true
  },
  {
    id: "7",
    name: "Programming Book",
    description: "Comprehensive guide to modern programming",
    price: 49.99,
    category: "Books",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=300&fit=crop",
    inStock: true
  },
  {
    id: "8",
    name: "Yoga Mat",
    description: "Non-slip yoga mat for home workouts",
    price: 29.99,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop",
    inStock: true
  }
];

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

// Mock cart storage (in real app, this would be in database)
let mockCart: Cart = {
  items: [],
  totalItems: 0,
  subtotal: 0,
  total: 0
};

// API functions that simulate backend calls
export const api = {
  // Get all products
  async getProducts(): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay
    return products;
  },

  // Get featured products (first 4 products)
  async getFeaturedProducts(): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return products.slice(0, 4);
  },

  // Get all categories
  async getCategories(): Promise<Category[]> {
    await new Promise(resolve => setTimeout(resolve, 150));
    return categories;
  },

  // Get homepage data
  async getHomePageData(): Promise<HomePageData> {
    await new Promise(resolve => setTimeout(resolve, 400));
    return {
      featuredProducts: products.slice(0, 4),
      categories: categories,
      heroBanner: {
        title: "Discover Amazing Tech Products",
        subtitle: "Find the latest gadgets and electronics at unbeatable prices",
        ctaText: "Shop Now",
        ctaLink: "/products"
      }
    };
  },

  // Cart API functions
  async getCart(): Promise<Cart> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockCart;
  },

  async addToCart(productId: string, quantity: number = 1): Promise<Cart> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const product = products.find(p => p.id === productId);
    if (!product) throw new Error('Product not found');

    const existingItem = mockCart.items.find(item => item.productId === productId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const newItem: CartItem = {
        id: `cart-item-${Date.now()}`,
        productId,
        product,
        quantity
      };
      mockCart.items.push(newItem);
    }

    // Recalculate cart totals
    this.updateCartTotals();
    return mockCart;
  },

  async updateCartItemQuantity(itemId: string, quantity: number): Promise<Cart> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const item = mockCart.items.find(item => item.id === itemId);
    if (!item) throw new Error('Cart item not found');

    if (quantity <= 0) {
      mockCart.items = mockCart.items.filter(item => item.id !== itemId);
    } else {
      item.quantity = quantity;
    }

    this.updateCartTotals();
    return mockCart;
  },

  async removeFromCart(itemId: string): Promise<Cart> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    mockCart.items = mockCart.items.filter(item => item.id !== itemId);
    this.updateCartTotals();
    return mockCart;
  },

  async clearCart(): Promise<Cart> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    mockCart.items = [];
    this.updateCartTotals();
    return mockCart;
  },

  // Helper function to update cart totals
  updateCartTotals() {
    const subtotal = mockCart.items.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);

    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;

    mockCart.subtotal = Math.round(subtotal * 100) / 100;
    mockCart.total = Math.round(total * 100) / 100;
    mockCart.totalItems = mockCart.items.reduce((sum, item) => sum + item.quantity, 0);
  }
};
