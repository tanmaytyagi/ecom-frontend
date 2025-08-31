# API Contracts - Backend Integration Guide

This document defines the exact API contracts that the frontend expects from your backend. The UI does zero calculations and just displays whatever the backend returns.

## 📋 API Response Format

All API endpoints return a standardized response:

```typescript
interface ApiResponse<T> {
  status: string;
  data: T;
  message: string;
  timestamp: string;
}
```

## 🔌 API Endpoints

### 1. Homepage Data

#### GET /home/featured
**Response:** `ApiResponse<Product[]>`

```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
}
```

**Example Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "aabdbb5b",
      "name": "Wireless Headphones",
      "description": "High-quality wireless headphones with noise cancellation",
      "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      "price": 99.99,
      "category": "Electronics"
    }
  ],
  "message": "featured products retrieved successfully",
  "timestamp": "2025-05-15T14:12:00Z"
}
```

#### GET /home/categories
**Response:** `ApiResponse<Category[]>`

```typescript
interface Category {
  name: string;
  image: string;
  totalProducts: number;
}
```

**Example Response:**
```json
{
  "status": "success",
  "data": [
    {
      "name": "Electronics",
      "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      "totalProducts": 13
    }
  ],
  "message": "categories retrieved successfully",
  "timestamp": "2025-05-15T14:12:00Z"
}
```

### 2. Products

#### GET /products
**Response:** `ApiResponse<Product[]>`

**Example Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "aabdbb5b",
      "name": "Wireless Headphones",
      "description": "High-quality wireless headphones with noise cancellation",
      "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      "price": 99.99,
      "category": "Electronics"
    }
  ],
  "message": "products retrieved successfully",
  "timestamp": "2025-05-15T14:12:00Z"
}
```

#### GET /products/:category
**Response:** `ApiResponse<Product[]>`

**Example Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "aabdbb5b",
      "name": "Wireless Headphones",
      "description": "High-quality wireless headphones with noise cancellation",
      "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      "price": 99.99,
      "category": "Electronics"
    }
  ],
  "message": "products retrieved successfully",
  "timestamp": "2025-05-15T14:12:00Z"
}
```

### 3. Cart

#### GET /cart
**Response:** `ApiResponse<Cart>`

```typescript
interface Cart {
  cartItems: CartItem[];
  orderSummary: OrderSummary;
}

interface CartItem {
  productId: string;
  name: string;
  category: string;
  price: number;
  total: number;
  quantity: number;
}

interface OrderSummary {
  subtotal: number;
  taxPercentage: number;
  total: number;
}
```

**Example Response:**
```json
{
  "status": "success",
  "data": {
    "cartItems": [
      {
        "productId": "acw23eae",
        "name": "Smart Watch",
        "category": "Electronics",
        "price": 99.00,
        "total": 198.00,
        "quantity": 2
      }
    ],
    "orderSummary": {
      "subtotal": 218.00,
      "taxPercentage": 18,
      "total": 257.24
    }
  },
  "message": "cart items retrieved successfully",
  "timestamp": "2025-05-15T14:12:00Z"
}
```

#### POST /cart
**Request Body:**
```typescript
{
  productId: string;
  action: "add" | "subtract";
}
```

**Response:** `ApiResponse<Cart>`

**Example Request:**
```json
{
  "productId": "bres4efd",
  "action": "add"
}
```

**Example Response:**
```json
{
  "status": "success",
  "data": {
    "cartItems": [
      {
        "productId": "acw23eae",
        "name": "Smart Watch",
        "category": "Electronics",
        "price": 99.00,
        "total": 198.00,
        "quantity": 2
      },
      {
        "productId": "bres4efd",
        "name": "T Shirt",
        "category": "Clothing",
        "price": 20.00,
        "total": 40.00,
        "quantity": 2
      }
    ],
    "orderSummary": {
      "subtotal": 238.00,
      "taxPercentage": 18,
      "total": 280.84
    }
  },
  "message": "cart items retrieved successfully",
  "timestamp": "2025-05-15T14:12:00Z"
}
```

#### GET /cart/clearcart
**Response:** `ApiResponse<any>`

**Example Response:**
```json
{
  "status": "success",
  "data": [],
  "message": "cart cleared successfully",
  "timestamp": "2025-05-15T14:12:00Z"
}
```

## 🛒 Cart Business Logic (Backend Implementation)

### Tax Calculation
- **Tax Rate:** 18%
- **Formula:** `total = subtotal + (subtotal * (taxPercentage / 100))`

### Cart Totals
- **Subtotal:** Sum of item.total for all items
- **Tax:** 18% of subtotal
- **Total:** subtotal + tax

### Cart Operations
1. **Add to Cart:** Increment quantity if item exists, add new item if not
2. **Subtract from Cart:** Decrement quantity, remove item if quantity becomes 0
3. **Clear Cart:** Remove all items and reset totals to 0

## 🔄 Frontend-Backend Flow

### Homepage Flow
1. User visits homepage
2. Frontend calls `GET /home/featured` and `GET /home/categories`
3. Backend returns featured products and categories
4. Frontend displays exactly what backend returns

### Products Page Flow
1. User visits products page
2. Frontend calls `GET /products` or `GET /products/:category`
3. Backend returns products (all or filtered by category)
4. Frontend displays product cards with "Add to Cart" buttons

### Add to Cart Flow
1. User clicks "Add to Cart" button on product card
2. Frontend calls `POST /cart` with `{"productId": "id", "action": "add"}`
3. Backend internally updates cart and returns updated cart
4. Frontend displays updated cart state

### Cart Page Flow
1. User visits cart page
2. Frontend calls `GET /cart`
3. Backend returns current cart with calculated totals
4. Frontend displays cart items and totals exactly as returned

### Place Order Flow
1. User clicks "Place Order" button
2. Frontend shows "Order Placed!" animation
3. Frontend calls `GET /cart/clearcart`
4. Frontend refreshes cart state and shows empty cart

## 🚀 Implementation Notes

### Frontend Behavior
- **No Client-Side Logic:** Frontend never calculates totals or validates data
- **Display Only:** Frontend just displays what the backend returns
- **Simple API Calls:** Every action calls a simple GET/POST endpoint
- **Backend-Driven State:** Cart state is always fetched from backend

### Backend Requirements
- **Single Source of Truth:** All cart state and calculations on server
- **Simple Endpoints:** GET/POST endpoints for operations
- **Consistent Response:** Always return `ApiResponse<T>` format
- **Internal Updates:** Cart modifications happen internally, return updated cart

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
