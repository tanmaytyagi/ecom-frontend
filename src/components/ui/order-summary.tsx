import { Cart } from "@/lib/api";

interface OrderSummaryProps {
  cart: Cart;
  onPlaceOrder: () => void;
}

export function OrderSummary({ cart, onPlaceOrder }: OrderSummaryProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${cart.orderSummary.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax ({cart.orderSummary.taxPercentage}%)</span>
          <span className="font-medium">${cart.orderSummary.taxAmount.toFixed(2)}</span>
        </div>
        <div className="border-t pt-4">
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>${cart.orderSummary.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <button 
        onClick={onPlaceOrder}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mt-6"
      >
        Place Order
      </button>
    </div>
  );
}
