# Clean Project Structure

## Overview
The project has been refactored to follow a simple, intuitive structure that's easy to understand and maintain.

## File Structure

```
src/
├── app/
│   ├── page.tsx                    # Home page
│   ├── cart/
│   │   └── page.tsx               # Cart page
│   └── products/
│       ├── all/
│       │   └── page.tsx           # All products page
│       └── category/
│           └── page.tsx           # Category products page
├── components/
│   ├── layout/
│   │   ├── footer.tsx             # Footer component
│   │   └── navigation.tsx         # Navigation component
│   └── ui/
│       ├── button.tsx             # Reusable button component
│       ├── cart-card.tsx          # Cart item card
│       ├── category-card.tsx      # Category card
│       ├── error-state.tsx        # Error display component
│       ├── loading-spinner.tsx    # Loading spinner component
│       ├── order-summary.tsx      # Order summary component
│       ├── page-header.tsx        # Page header component
│       ├── product-card.tsx       # Product card component
│       └── products-grid.tsx      # Products grid component
├── contexts/
│   └── cart-context.tsx           # Cart context for global state
├── lib/
│   ├── api.ts                     # Mock API and business logic
│   └── utils.ts                   # Utility functions
└── types/
    └── index.ts                   # TypeScript type definitions
```

## Key Principles

### 1. Simple Page Structure
- **No separate client components** - Each page uses `"use client"` directly
- **Clear routing** - `/products/all` and `/products/category?category=Electronics`
- **Single responsibility** - Each page has one clear purpose

### 2. Reusable Components
- **UI components** in `/components/ui/` for common patterns
- **Layout components** in `/components/layout/` for structure
- **Consistent styling** and behavior across the app

### 3. Backend-Driven Architecture
- **All business logic** in `/lib/api.ts` (mocked for now)
- **No frontend calculations** - UI only displays backend data
- **Consistent API contracts** for easy backend integration

## Page Routes

| Route | Purpose | API Call |
|-------|---------|----------|
| `/` | Home page | `GET /home/featured`, `GET /home/categories` |
| `/products/all` | All products | `GET /products` |
| `/products/category?category=Electronics` | Category products | `GET /products/:category` |
| `/cart` | Shopping cart | `GET /cart`, `POST /cart`, `GET /cart/clearcart` |

## Component Usage

### UI Components
- **`Button`** - Reusable button with variants (primary, secondary, outline)
- **`LoadingSpinner`** - Loading state with customizable message
- **`ErrorState`** - Error display with optional custom actions
- **`PageHeader`** - Page headers with optional back buttons
- **`ProductsGrid`** - Product grid with empty state handling
- **`CartCard`** - Individual cart item with +/- controls
- **`OrderSummary`** - Cart totals and place order button

### Layout Components
- **`Navigation`** - Global navigation with cart count
- **`Footer`** - Simple footer component

## Benefits

1. **Easy to Understand** - Clear file structure and naming
2. **Maintainable** - Reusable components reduce duplication
3. **Scalable** - Easy to add new pages and features
4. **Type Safe** - Full TypeScript support
5. **Backend Ready** - Structured for easy backend integration

## Navigation Flow

```
Home Page (/)
├── "Shop Now" → /products/all
└── Category cards → /products/category?category=Electronics

Products Pages
├── /products/all (All Products)
└── /products/category (Category Products)
    └── Back button → /products/all

Cart Page (/cart)
└── "Continue Shopping" → /products/all
```
