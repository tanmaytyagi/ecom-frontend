# TechStore - Backend-Driven E-commerce Frontend

A modern, backend-driven e-commerce frontend built with Next.js 15, TypeScript, and Tailwind CSS. The application is designed with a clean separation between frontend and backend logic, making it easy to plug in real backend APIs.

## 🚀 Features

- **Backend-Driven Architecture**: All business logic lives on the server
- **Real-time Cart Management**: Immediate backend calls for all cart operations
- **Stock Management**: Real-time stock validation and limits
- **Error Handling**: Comprehensive error handling with user feedback
- **Responsive Design**: Mobile-first responsive design
- **Type Safety**: Full TypeScript support with strict typing

## 🏗️ Architecture

### Frontend (Thin View Layer)
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **React Context** for state management
- **Lucide React** for icons

### Backend (Mock API Layer)
- **Structured API responses** with success/error handling
- **Business logic validation** (stock limits, cart limits, pricing)
- **Mock data storage** simulating database
- **API endpoints** ready for real backend replacement

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── cart/              # Cart page
│   ├── products/          # Products listing page
│   └── page.tsx           # Homepage
├── components/            # Reusable UI components
│   ├── layout/           # Layout components
│   └── ui/               # UI components
├── contexts/             # React contexts
│   └── cart-context.tsx  # Cart state management
├── lib/                  # API and utilities
│   └── api.ts           # Backend API layer
└── types/               # TypeScript type definitions
    └── index.ts         # All type definitions
```

## 🔌 API Structure

### Response Format
All API endpoints return a standardized response:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message: string;
}
```

### Available Endpoints

#### Products
- `GET /api/products` - Get all products
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get single product

#### Cart
- `GET /api/cart` - Get current cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item quantity
- `DELETE /api/cart/remove` - Remove item from cart
- `DELETE /api/cart/clear` - Clear entire cart

#### Categories
- `GET /api/categories` - Get all categories

#### Homepage
- `GET /api/homepage` - Get homepage data

## 🛒 Cart Business Logic

### Server-Side Validation
- **Stock Validation**: Prevents adding more items than available
- **Cart Limits**: Maximum 20 items total, 10 per product
- **Real-time Pricing**: Tax calculation (8%) and totals
- **Inventory Management**: Low stock warnings

### Cart Operations
Every cart action immediately calls the backend:
- ✅ Add to cart → Backend validates stock and cart limits
- ✅ Update quantity → Backend recalculates totals
- ✅ Remove item → Backend updates cart state
- ✅ Clear cart → Backend resets cart

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd minimal-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

## 🔄 Replacing Mock Backend

### Step 1: Update API Base URL
In `src/lib/api.ts`, replace the mock API calls with real HTTP requests:

```typescript
// Replace this:
const response = await api.getCart();

// With this:
const response = await fetch('/api/cart', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
}).then(res => res.json());
```

### Step 2: Update API Endpoints
Replace the mock API object with real endpoint calls:

```typescript
export const api = {
  async getCart(): Promise<ApiResponse<Cart>> {
    const response = await fetch('/api/cart');
    return response.json();
  },
  
  async addToCart(productId: string, quantity: number): Promise<ApiResponse<Cart>> {
    const response = await fetch('/api/cart/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity }),
    });
    return response.json();
  },
  // ... other endpoints
};
```

### Step 3: Environment Configuration
Create `.env.local` for API configuration:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
NEXT_PUBLIC_API_TIMEOUT=5000
```

## 🧪 Testing the Application

### Cart Functionality
1. **Add Items**: Go to `/products` and click "Add to Cart"
2. **View Cart**: Navigate to `/cart` to see items
3. **Update Quantities**: Use +/- buttons to change quantities
4. **Remove Items**: Click trash icon to remove items
5. **Clear Cart**: Click "Clear Cart" to empty cart
6. **Stock Limits**: Try adding more than available stock

### Business Logic Testing
- ✅ **Stock Validation**: Try adding more items than available
- ✅ **Cart Limits**: Try adding more than 20 items total
- ✅ **Quantity Limits**: Try adding more than 10 of one product
- ✅ **Real-time Updates**: All changes immediately reflect in UI
- ✅ **Error Handling**: Invalid operations show error messages

## 📊 Mock Data

### Products
- 8 sample products across 4 categories
- Realistic pricing and stock quantities
- High-quality product images from Unsplash

### Categories
- Electronics, Clothing, Books, Sports
- Category images and product counts

### Cart
- Persistent mock cart storage
- Real-time total calculations
- Tax and subtotal breakdown

## 🎨 UI Components

### Reusable Components
- `ProductCard` - Product display with stock info
- `CategoryCard` - Category browsing
- `CartItemCard` - Cart item management
- `Navigation` - Site navigation with cart count
- `Footer` - Site footer

### Design System
- **Colors**: Blue primary, gray neutrals, red for errors
- **Typography**: Inter font family
- **Spacing**: Consistent 4px grid system
- **Responsive**: Mobile-first design approach

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript check
```

### Code Quality
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **Tailwind**: Utility-first CSS framework

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms
- **Netlify**: Static site deployment
- **AWS Amplify**: Full-stack deployment
- **Docker**: Containerized deployment

## 📝 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

**Ready to replace the mock backend?** The API structure is designed to be easily replaceable with real backend endpoints while maintaining the same frontend functionality.
