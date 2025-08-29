// Types for all data that would come from backend APIs
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  image: string;
  inStock: boolean;
  featured?: boolean;
  featuredOrder?: number;
  discount?: number;
  tags?: string[];
  specifications?: Record<string, string>;
  reviews?: Review[];
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  slug: string;
}

export interface FeaturedProduct extends Product {
  featured: true;
  featuredOrder: number;
}

export interface HomePageData {
  featuredProducts: FeaturedProduct[];
  categories: Category[];
  heroBanner: {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    backgroundImage: string;
  };
  stats: {
    totalProducts: number;
    totalCategories: number;
    totalCustomers: number;
    totalOrders: number;
  };
}

// Mock API functions that simulate backend calls
export const api = {
  // Get all products (with optional filters)
  async getProducts(filters?: {
    search?: string;
    category?: string;
    rating?: number;
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
    page?: number;
    limit?: number;
  }): Promise<{
    products: Product[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let filteredProducts = [...products];
    
    if (filters?.search) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(filters.search!.toLowerCase())
      );
    }
    
    if (filters?.category) {
      filteredProducts = filteredProducts.filter(product =>
        product.category === filters.category
      );
    }
    
    if (filters?.rating) {
      filteredProducts = filteredProducts.filter(product =>
        product.rating >= filters.rating!
      );
    }
    
    if (filters?.minPrice) {
      filteredProducts = filteredProducts.filter(product =>
        product.price >= filters.minPrice!
      );
    }
    
    if (filters?.maxPrice) {
      filteredProducts = filteredProducts.filter(product =>
        product.price <= filters.maxPrice!
      );
    }
    
    if (filters?.inStock !== undefined) {
      filteredProducts = filteredProducts.filter(product =>
        product.inStock === filters.inStock
      );
    }
    
    const total = filteredProducts.length;
    const page = filters?.page || 1;
    const limit = filters?.limit || 8;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    
    return {
      products: paginatedProducts,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  },

  // Get featured products for homepage
  async getFeaturedProducts(): Promise<FeaturedProduct[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return products.filter(product => product.featured) as FeaturedProduct[];
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
      featuredProducts: products.filter(product => product.featured) as FeaturedProduct[],
      categories: categories,
      heroBanner: {
        title: "Discover Amazing Tech Products",
        subtitle: "Find the latest gadgets and electronics at unbeatable prices",
        ctaText: "Shop Now",
        ctaLink: "/products",
        backgroundImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop"
      },
      stats: {
        totalProducts: products.length,
        totalCategories: categories.length,
        totalCustomers: 15420,
        totalOrders: 89234
      }
    };
  },

  // Get single product by ID
  async getProduct(id: string): Promise<Product | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return products.find(product => product.id === id) || null;
  },

  // Get products by category
  async getProductsByCategory(categorySlug: string): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const category = categories.find(cat => cat.slug === categorySlug);
    if (!category) return [];
    return products.filter(product => product.category === category.name);
  }
};

// Static data arrays (these would come from database)
export const categories: Category[] = [
  {
    id: "1",
    name: "Electronics",
    description: "Latest gadgets and electronic devices",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop",
    productCount: 4,
    slug: "electronics"
  },
  {
    id: "2",
    name: "Clothing",
    description: "Fashion and apparel for all seasons",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop",
    productCount: 3,
    slug: "clothing"
  },
  {
    id: "3",
    name: "Books",
    description: "Educational and entertainment books",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=200&fit=crop",
    productCount: 3,
    slug: "books"
  },
  {
    id: "4",
    name: "Home & Garden",
    description: "Everything for your home and garden",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop",
    productCount: 2,
    slug: "home-garden"
  },
  {
    id: "5",
    name: "Sports",
    description: "Sports equipment and fitness gear",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop",
    productCount: 2,
    slug: "sports"
  },
  {
    id: "6",
    name: "Beauty",
    description: "Beauty and personal care products",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=200&fit=crop",
    productCount: 2,
    slug: "beauty"
  },
  {
    id: "7",
    name: "Toys",
    description: "Fun toys and games for all ages",
    image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=300&h=200&fit=crop",
    productCount: 2,
    slug: "toys"
  },
  {
    id: "8",
    name: "Automotive",
    description: "Car accessories and automotive products",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=300&h=200&fit=crop",
    productCount: 2,
    slug: "automotive"
  }
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
    inStock: true,
    featured: true,
    featuredOrder: 1,
    discount: 15,
    tags: ["wireless", "bluetooth", "noise-cancellation"],
    specifications: {
      "Battery Life": "20 hours",
      "Connectivity": "Bluetooth 5.0",
      "Weight": "250g"
    },
    reviews: [
      {
        id: "r1",
        userId: "u1",
        userName: "John D.",
        rating: 5,
        comment: "Excellent sound quality and battery life!",
        createdAt: "2024-01-15T10:30:00Z"
      }
    ],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "2",
    name: "Smart Watch",
    description: "Feature-rich smartwatch with health tracking",
    price: 199.99,
    category: "Electronics",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
    inStock: true,
    featured: true,
    featuredOrder: 2,
    tags: ["smartwatch", "health-tracking", "fitness"],
    specifications: {
      "Display": "1.4 inch AMOLED",
      "Battery Life": "7 days",
      "Water Resistance": "5ATM"
    },
    reviews: [],
    createdAt: "2024-01-02T00:00:00Z",
    updatedAt: "2024-01-02T00:00:00Z"
  },
  {
    id: "3",
    name: "Laptop Stand",
    description: "Ergonomic laptop stand for better posture",
    price: 49.99,
    category: "Electronics",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=300&fit=crop",
    inStock: true,
    featured: true,
    featuredOrder: 3,
    tags: ["ergonomic", "laptop", "posture"],
    specifications: {
      "Material": "Aluminum",
      "Weight Capacity": "4kg",
      "Adjustable Height": "Yes"
    },
    reviews: [],
    createdAt: "2024-01-03T00:00:00Z",
    updatedAt: "2024-01-03T00:00:00Z"
  },
  {
    id: "4",
    name: "Wireless Mouse",
    description: "Precision wireless mouse for productivity",
    price: 29.99,
    category: "Electronics",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop",
    inStock: true,
    featured: true,
    featuredOrder: 4,
    tags: ["wireless", "mouse", "productivity"],
    specifications: {
      "DPI": "1200",
      "Battery Life": "6 months",
      "Connectivity": "2.4GHz"
    },
    reviews: [],
    createdAt: "2024-01-04T00:00:00Z",
    updatedAt: "2024-01-04T00:00:00Z"
  },
  {
    id: "5",
    name: "Smartphone Case",
    description: "Durable protective case for smartphones",
    price: 19.99,
    category: "Electronics",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=300&h=300&fit=crop",
    inStock: true,
    tags: ["protective", "smartphone", "case"],
    specifications: {
      "Material": "Silicone",
      "Drop Protection": "6ft",
      "Compatibility": "Universal"
    },
    reviews: [],
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-05T00:00:00Z"
  },
  {
    id: "6",
    name: "Cotton T-Shirt",
    description: "Comfortable cotton t-shirt in various colors",
    price: 24.99,
    category: "Clothing",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
    inStock: true,
    tags: ["cotton", "comfortable", "casual"],
    specifications: {
      "Material": "100% Cotton",
      "Sizes": "XS-XXL",
      "Care": "Machine washable"
    },
    reviews: [],
    createdAt: "2024-01-06T00:00:00Z",
    updatedAt: "2024-01-06T00:00:00Z"
  },
  {
    id: "7",
    name: "Denim Jeans",
    description: "Classic denim jeans with perfect fit",
    price: 79.99,
    category: "Clothing",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop",
    inStock: true,
    tags: ["denim", "jeans", "classic"],
    specifications: {
      "Material": "Denim",
      "Fit": "Slim",
      "Sizes": "28-36"
    },
    reviews: [],
    createdAt: "2024-01-07T00:00:00Z",
    updatedAt: "2024-01-07T00:00:00Z"
  },
  {
    id: "8",
    name: "Winter Jacket",
    description: "Warm winter jacket for cold weather",
    price: 149.99,
    category: "Clothing",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop",
    inStock: true,
    tags: ["winter", "warm", "jacket"],
    specifications: {
      "Material": "Polyester",
      "Insulation": "Down",
      "Water Resistance": "Yes"
    },
    reviews: [],
    createdAt: "2024-01-08T00:00:00Z",
    updatedAt: "2024-01-08T00:00:00Z"
  },
  {
    id: "9",
    name: "Programming Book",
    description: "Comprehensive guide to modern programming",
    price: 49.99,
    category: "Books",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=300&fit=crop",
    inStock: true,
    tags: ["programming", "education", "guide"],
    specifications: {
      "Pages": "450",
      "Language": "English",
      "Format": "Paperback"
    },
    reviews: [],
    createdAt: "2024-01-09T00:00:00Z",
    updatedAt: "2024-01-09T00:00:00Z"
  },
  {
    id: "10",
    name: "Cookbook",
    description: "Collection of delicious recipes from around the world",
    price: 29.99,
    category: "Books",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=300&fit=crop",
    inStock: true,
    tags: ["cooking", "recipes", "food"],
    specifications: {
      "Pages": "320",
      "Language": "English",
      "Format": "Hardcover"
    },
    reviews: [],
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-10T00:00:00Z"
  },
  {
    id: "11",
    name: "Fiction Novel",
    description: "Bestselling fiction novel by acclaimed author",
    price: 19.99,
    category: "Books",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=300&fit=crop",
    inStock: true,
    tags: ["fiction", "novel", "bestseller"],
    specifications: {
      "Pages": "380",
      "Language": "English",
      "Format": "Paperback"
    },
    reviews: [],
    createdAt: "2024-01-11T00:00:00Z",
    updatedAt: "2024-01-11T00:00:00Z"
  },
  {
    id: "12",
    name: "Garden Plant Pot",
    description: "Beautiful ceramic plant pot for indoor plants",
    price: 34.99,
    category: "Home & Garden",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop",
    inStock: true,
    tags: ["garden", "plant", "ceramic"],
    specifications: {
      "Material": "Ceramic",
      "Size": "6 inch",
      "Drainage": "Yes"
    },
    reviews: [],
    createdAt: "2024-01-12T00:00:00Z",
    updatedAt: "2024-01-12T00:00:00Z"
  },
  {
    id: "13",
    name: "Coffee Maker",
    description: "Automatic coffee maker for perfect brew every time",
    price: 89.99,
    category: "Home & Garden",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop",
    inStock: true,
    tags: ["coffee", "automatic", "brew"],
    specifications: {
      "Capacity": "12 cups",
      "Timer": "Yes",
      "Auto-shutoff": "Yes"
    },
    reviews: [],
    createdAt: "2024-01-13T00:00:00Z",
    updatedAt: "2024-01-13T00:00:00Z"
  },
  {
    id: "14",
    name: "Yoga Mat",
    description: "Non-slip yoga mat for home workouts",
    price: 29.99,
    category: "Sports",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop",
    inStock: true,
    tags: ["yoga", "fitness", "non-slip"],
    specifications: {
      "Material": "PVC",
      "Thickness": "6mm",
      "Size": "72x24 inches"
    },
    reviews: [],
    createdAt: "2024-01-14T00:00:00Z",
    updatedAt: "2024-01-14T00:00:00Z"
  },
  {
    id: "15",
    name: "Running Shoes",
    description: "Comfortable running shoes for daily workouts",
    price: 119.99,
    category: "Sports",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
    inStock: true,
    tags: ["running", "shoes", "comfortable"],
    specifications: {
      "Material": "Mesh",
      "Sole": "Rubber",
      "Sizes": "7-12"
    },
    reviews: [],
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z"
  },
  {
    id: "16",
    name: "Facial Moisturizer",
    description: "Hydrating facial moisturizer for all skin types",
    price: 39.99,
    category: "Beauty",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop",
    inStock: true,
    tags: ["facial", "moisturizer", "hydrating"],
    specifications: {
      "Volume": "50ml",
      "Skin Type": "All",
      "SPF": "30"
    },
    reviews: [],
    createdAt: "2024-01-16T00:00:00Z",
    updatedAt: "2024-01-16T00:00:00Z"
  },
  {
    id: "17",
    name: "Lipstick Set",
    description: "Professional lipstick set in various shades",
    price: 54.99,
    category: "Beauty",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&h=300&fit=crop",
    inStock: true,
    tags: ["lipstick", "professional", "shades"],
    specifications: {
      "Set Size": "6 pieces",
      "Finish": "Matte",
      "Long-lasting": "Yes"
    },
    reviews: [],
    createdAt: "2024-01-17T00:00:00Z",
    updatedAt: "2024-01-17T00:00:00Z"
  },
  {
    id: "18",
    name: "Board Game",
    description: "Fun family board game for all ages",
    price: 44.99,
    category: "Toys",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=300&h=300&fit=crop",
    inStock: true,
    tags: ["board-game", "family", "fun"],
    specifications: {
      "Players": "2-6",
      "Age": "8+",
      "Duration": "45-60 min"
    },
    reviews: [],
    createdAt: "2024-01-18T00:00:00Z",
    updatedAt: "2024-01-18T00:00:00Z"
  },
  {
    id: "19",
    name: "Puzzle Set",
    description: "1000-piece puzzle for hours of entertainment",
    price: 24.99,
    category: "Toys",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=300&fit=crop",
    inStock: true,
    tags: ["puzzle", "1000-piece", "entertainment"],
    specifications: {
      "Pieces": "1000",
      "Size": "27x20 inches",
      "Age": "12+"
    },
    reviews: [],
    createdAt: "2024-01-19T00:00:00Z",
    updatedAt: "2024-01-19T00:00:00Z"
  },
  {
    id: "20",
    name: "Car Phone Mount",
    description: "Universal car phone mount for safe driving",
    price: 14.99,
    category: "Automotive",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=300&h=300&fit=crop",
    inStock: true,
    tags: ["car", "phone-mount", "universal"],
    specifications: {
      "Mount Type": "Dashboard",
      "Phone Size": "4-7 inches",
      "Adjustable": "Yes"
    },
    reviews: [],
    createdAt: "2024-01-20T00:00:00Z",
    updatedAt: "2024-01-20T00:00:00Z"
  },
  {
    id: "21",
    name: "Car Air Freshener",
    description: "Long-lasting car air freshener in various scents",
    price: 9.99,
    category: "Automotive",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
    inStock: true,
    tags: ["car", "air-freshener", "scents"],
    specifications: {
      "Duration": "30 days",
      "Scents": "5 varieties",
      "Size": "Standard"
    },
    reviews: [],
    createdAt: "2024-01-21T00:00:00Z",
    updatedAt: "2024-01-21T00:00:00Z"
  }
];
