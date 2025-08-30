# API Contracts - Backend Integration Guide

This document defines the exact API contracts that the frontend expects from your backend. All business logic lives on the server, and the frontend is a thin view layer that just displays what the backend returns.

## 📋 API Response Format

All API endpoints return a standardized response:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message: string;
}
```

## 🔌 API Endpoints

### 1. Products

#### GET /api/products
**Response:** `ApiResponse<Product[]>`

```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  inStock: boolean;
  stockQuantity: number;
}
```

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "Wireless Headphones",
      "description": "High-quality wireless headphones with noise cancellation",
      "price": 99.99,
      "category": "Electronics",
      "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      "inStock": true,
      "stockQuantity": 50
    }
  ],
  "message": "Products retrieved successfully"
}
```

#### GET /api/products/featured
**Response:** `ApiResponse<Product[]>`

Returns first 4 products from the products list.

### 2. Categories

#### GET /api/categories
**Response:** `ApiResponse<Category[]>`

```typescript
interface Category {
  id: string;
  name: string;
  image: string;
  productCount: number;
}
```

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "Electronics",
      "image": "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop",
      "productCount": 4
    }
  ],
  "message": "Categories retrieved successfully"
}
```

### 3. Homepage

#### GET /api/homepage
**Response:** `ApiResponse<HomePageData>`

```typescript
interface HomePageData {
  featuredProducts: Product[];
  categories: Category[];
  heroBanner: {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
  };
}
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "featuredProducts": [...],
    "categories": [...],
    "heroBanner": {
      "title": "Discover Amazing Tech Products",
      "subtitle": "Find the latest gadgets and electronics at unbeatable prices",
      "ctaText": "Shop Now",
      "ctaLink": "/products"
    }
  },
  "message": "Homepage data retrieved successfully"
}
```

### 4. Cart

#### GET /api/cart
**Response:** `ApiResponse<Cart>`

```typescript
interface Cart {
  id: string;
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  tax: number;
  total: number;
  createdAt: string;
  updatedAt: string;
}

interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  addedAt: string;
}
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "id": "cart-1",
    "items": [
      {
        "id": "cart-item-123",
        "productId": "1",
        "product": {
          "id": "1",
          "name": "Wireless Headphones",
          "price": 99.99,
          "image": "...",
          "inStock": true,
          "stockQuantity": 50
        },
        "quantity": 2,
        "addedAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "totalItems": 2,
    "subtotal": 199.98,
    "tax": 16.00,
    "total": 215.98,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "Cart retrieved successfully"
}
```

#### POST /api/cart/add
**Request Body:**
```typescript
{
  productId: string;
  quantity?: number; // defaults to 1
}
```

**Response:** `ApiResponse<Cart>`

**Backend Logic:**
- Validate product exists and is in stock
- Check if quantity doesn't exceed stock
- Add to cart or update existing item quantity
- Recalculate cart totals (subtotal, tax, total)
- Return updated cart

**Error Responses:**
```json
{
  "success": false,
  "error": "Product not found",
  "message": "Product not found"
}
```

```json
{
  "success": false,
  "error": "Product is out of stock",
  "message": "Product is out of stock"
}
```

```json
{
  "success": false,
  "error": "Only 5 items available in stock",
  "message": "Only 5 items available in stock"
}
```

#### PUT /api/cart/update
**Request Body:**
```typescript
{
  itemId: string;
  quantity: number;
}
```

**Response:** `ApiResponse<Cart>`

**Backend Logic:**
- Validate cart item exists
- If quantity <= 0, remove item from cart
- If quantity > 0, validate against stock limits
- Update item quantity
- Recalculate cart totals
- Return updated cart

#### DELETE /api/cart/remove
**Request Body:**
```typescript
{
  itemId: string;
}
```

**Response:** `ApiResponse<Cart>`

**Backend Logic:**
- Validate cart item exists
- Remove item from cart
- Recalculate cart totals
- Return updated cart

#### DELETE /api/cart/clear
**Response:** `ApiResponse<Cart>`

**Backend Logic:**
- Clear all items from cart
- Reset totals to 0
- Return empty cart

## 🛒 Cart Business Logic (Backend Implementation)

### Tax Calculation
- **Tax Rate:** 8%
- **Formula:** `tax = subtotal * 0.08`

### Cart Totals
- **Subtotal:** Sum of (product.price * quantity) for all items
- **Tax:** 8% of subtotal
- **Total:** subtotal + tax
- **Total Items:** Sum of quantities for all items

### Validation Rules
1. **Stock Validation:** Cannot add more items than available stock
2. **Product Validation:** Product must exist and be in stock
3. **Cart Item Validation:** Cart item must exist for updates/removal

## 📊 Mock Data Structure

### Products Database
```typescript
const products = [
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
  // ... 8 total products
];
```

### Categories Database
```typescript
const categories = [
  {
    id: "1",
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop",
    productCount: 4
  },
  // ... 4 total categories
];
```

### Cart Storage
```typescript
let cart = {
  id: "cart-1",
  items: [],
  totalItems: 0,
  subtotal: 0,
  tax: 0,
  total: 0,
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z"
};
```

## 🔄 Frontend-Backend Flow

### Add to Cart Flow
1. User clicks "Add to Cart" button
2. Frontend calls `POST /api/cart/add` with `{ productId: "1", quantity: 1 }`
3. Backend validates stock, updates cart, calculates totals
4. Backend returns updated cart
5. Frontend displays updated cart state

### Update Quantity Flow
1. User clicks +/- button
2. Frontend calls `PUT /api/cart/update` with `{ itemId: "cart-item-123", quantity: 3 }`
3. Backend validates stock, updates quantity, recalculates totals
4. Backend returns updated cart
5. Frontend displays updated cart state

### Remove Item Flow
1. User clicks remove button
2. Frontend calls `DELETE /api/cart/remove` with `{ itemId: "cart-item-123" }`
3. Backend removes item, recalculates totals
4. Backend returns updated cart
5. Frontend displays updated cart state

### Clear Cart Flow
1. User clicks "Clear Cart" button
2. Frontend calls `DELETE /api/cart/clear`
3. Backend clears all items, resets totals
4. Backend returns empty cart
5. Frontend displays empty cart state

## 🚀 Implementation Notes

### Frontend Behavior
- **No Client-Side Logic:** Frontend never calculates totals or validates data
- **Immediate API Calls:** Every UI action immediately calls the backend
- **Display Only:** Frontend just displays what the backend returns
- **Error Handling:** Shows backend error messages to users

### Backend Requirements
- **Single Source of Truth:** All cart state and calculations on server
- **Validation:** All business rules enforced on server
- **Consistent Response:** Always return `ApiResponse<T>` format
- **Error Handling:** Return meaningful error messages

### Database Schema (Suggested)
```sql
-- Products table
CREATE TABLE products (
  id VARCHAR PRIMARY KEY,
  name VARCHAR NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category VARCHAR NOT NULL,
  image VARCHAR NOT NULL,
  in_stock BOOLEAN DEFAULT true,
  stock_quantity INTEGER DEFAULT 0
);

-- Cart table
CREATE TABLE carts (
  id VARCHAR PRIMARY KEY,
  user_id VARCHAR,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Cart items table
CREATE TABLE cart_items (
  id VARCHAR PRIMARY KEY,
  cart_id VARCHAR REFERENCES carts(id),
  product_id VARCHAR REFERENCES products(id),
  quantity INTEGER NOT NULL,
  added_at TIMESTAMP DEFAULT NOW()
);
```

## ✅ Ready for Backend Integration

Your frontend is now completely backend-driven and ready for integration. Simply:

1. **Replace mock API calls** in `src/lib/api.ts` with real HTTP requests
2. **Implement the API contracts** on your backend
3. **Use the mock data structure** as a reference for your database schema
4. **Maintain the same response format** for seamless integration

The frontend will work exactly the same way with your real backend!
