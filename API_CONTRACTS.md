# API Contracts - Backend Integration Guide

This document defines the exact API contracts that the frontend expects from your backend. The UI does zero calculations and just displays whatever the backend returns.

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

### 1. Homepage

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

### 2. Products

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
      "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop"
    }
  ],
  "message": "Products retrieved successfully"
}
```

### 3. Cart

#### GET /api/cart
**Response:** `ApiResponse<Cart>`

```typescript
interface Cart {
  cartId: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
  description: string;
}
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "cartId": "cart-1",
    "items": [
      {
        "id": "1",
        "name": "Wireless Headphones",
        "price": 99.99,
        "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
        "quantity": 2,
        "category": "Electronics",
        "description": "High-quality wireless headphones with noise cancellation"
      }
    ],
    "subtotal": 199.98,
    "tax": 16.00,
    "total": 215.98
  },
  "message": "Cart retrieved successfully"
}
```

#### POST /api/cart (Add to cart)
**Request Body:**
```typescript
{
  cartId: string;
  productId: string;
}
```

**Response:** `ApiResponse<Cart>`

**Example Response:**
```json
{
  "success": true,
  "data": {
    "cartId": "cart-1",
    "items": [...],
    "subtotal": 199.98,
    "tax": 16.00,
    "total": 215.98
  },
  "message": "Cart updated successfully"
}
```

#### GET /api/addtocart/:productId
**Response:** `ApiResponse<{ message: string }>`

**Example Response:**
```json
{
  "success": true,
  "message": "Cart updated successfully"
}
```

#### GET /api/removefromcart/:productId
**Response:** `ApiResponse<{ message: string }>`

**Example Response:**
```json
{
  "success": true,
  "message": "Cart updated successfully"
}
```

#### GET /api/clearcart
**Response:** `ApiResponse<{ cartId: string }>`

**Example Response:**
```json
{
  "success": true,
  "data": {
    "cartId": "cart-1"
  },
  "message": "Cart cleared successfully"
}
```

## 🛒 Cart Business Logic (Backend Implementation)

### Tax Calculation
- **Tax Rate:** 8%
- **Formula:** `tax = subtotal * 0.08`

### Cart Totals
- **Subtotal:** Sum of (item.price * item.quantity) for all items
- **Tax:** 8% of subtotal
- **Total:** subtotal + tax

### Cart Operations
1. **Add to Cart:** Increment quantity if item exists, add new item if not
2. **Remove from Cart:** Decrement quantity, remove item if quantity becomes 0
3. **Clear Cart:** Remove all items and reset totals to 0

## 🔄 Frontend-Backend Flow

### Homepage Flow
1. User visits homepage
2. Frontend calls `GET /api/homepage`
3. Backend returns hero banner, featured products, categories
4. Frontend displays exactly what backend returns

### Products Page Flow
1. User visits products page
2. Frontend calls `GET /api/products`
3. Backend returns all products
4. Frontend displays product cards with +/- buttons

### Add to Cart Flow
1. User clicks "+" button on product card
2. Frontend calls `GET /api/addtocart/:productId`
3. Backend internally updates cart and returns success message
4. Frontend refreshes cart state by calling `GET /api/cart`

### Remove from Cart Flow
1. User clicks "-" button on product card
2. Frontend calls `GET /api/removefromcart/:productId`
3. Backend internally updates cart and returns success message
4. Frontend refreshes cart state by calling `GET /api/cart`

### Cart Page Flow
1. User visits cart page
2. Frontend calls `GET /api/cart`
3. Backend returns current cart with calculated totals
4. Frontend displays cart items and totals exactly as returned

### Clear Cart Flow
1. User clicks "Clear Cart" button
2. Frontend calls `GET /api/clearcart`
3. Backend clears cart and returns cartId
4. Frontend refreshes cart state by calling `GET /api/cart`

## 🚀 Implementation Notes

### Frontend Behavior
- **No Client-Side Logic:** Frontend never calculates totals or validates data
- **Display Only:** Frontend just displays what the backend returns
- **Simple API Calls:** Every action calls a simple GET/POST endpoint
- **Refresh Pattern:** After cart modifications, frontend refreshes cart state

### Backend Requirements
- **Single Source of Truth:** All cart state and calculations on server
- **Simple Endpoints:** GET endpoints for most operations
- **Consistent Response:** Always return `ApiResponse<T>` format
- **Internal Updates:** Cart modifications happen internally, return success message

### Database Schema (Suggested)
```sql
-- Products table
CREATE TABLE products (
  id VARCHAR PRIMARY KEY,
  name VARCHAR NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category VARCHAR NOT NULL,
  image VARCHAR NOT NULL
);

-- Cart table
CREATE TABLE carts (
  cart_id VARCHAR PRIMARY KEY,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Cart items table
CREATE TABLE cart_items (
  id VARCHAR PRIMARY KEY,
  cart_id VARCHAR REFERENCES carts(cart_id),
  product_id VARCHAR REFERENCES products(id),
  quantity INTEGER NOT NULL DEFAULT 1
);
```

## ✅ Ready for Backend Integration

Your frontend is now completely backend-driven with simple API contracts. Simply:

1. **Implement the exact API endpoints** as specified above
2. **Use the same response format** (`ApiResponse<T>`)
3. **Handle cart operations internally** on the backend
4. **Return calculated totals** from the backend

The frontend will work exactly the same way with your real backend - no client-side logic, just display what the server returns!
