import { useState } from "react";
import { Product } from "@/lib/data";
import { Card, CardContent, CardHeader } from "./card";
import { Button } from "./button";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/contexts/cart-context";

interface ProductCardProps {
  product: Product;
  showAddToCart?: boolean;
  onCartUpdate?: () => void;
}

export function ProductCard({ product, showAddToCart = true, onCartUpdate }: ProductCardProps) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    if (!showAddToCart) return;
    
    setIsAddingToCart(true);
    try {
      await addToCart(product.id, 1);
      onCartUpdate?.();
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const displayPrice = product.discount 
    ? product.price * (1 - product.discount / 100)
    : product.price;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200 group">
      <div className="aspect-square overflow-hidden relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
        
        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
            -{product.discount}%
          </div>
        )}
        
        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleWishlist}
          className="absolute top-2 right-2 bg-white/80 hover:bg-white transition-colors"
        >
          <Heart 
            className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
          />
        </Button>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
            {product.category}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
        </div>
        <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {product.discount ? (
              <>
                <span className="text-xl font-bold text-green-600">
                  ${displayPrice.toFixed(2)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-xl font-bold text-green-600">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          <span className={`text-sm px-2 py-1 rounded-full ${
            product.inStock 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        {showAddToCart && (
          <Button 
            onClick={handleAddToCart}
            disabled={!product.inStock || isAddingToCart}
            className="w-full flex items-center gap-2"
          >
            {isAddingToCart ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Adding...
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
