import { Plus, Minus } from "lucide-react";
import { CartItem } from "@/lib/api";

interface CartCardProps {
  item: CartItem;
  onAdd: () => void;
  onSubtract: () => void;
}

export function CartCard({ item, onAdd, onSubtract }: CartCardProps) {
  return (
    <div className="flex gap-4 p-4 border rounded-lg">
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">{item.productName}</h3>
            <p className="text-sm text-gray-600">{item.productCategory || "Uncategorized"}</p>
            <div className="mt-1">
              <span className="font-medium text-gray-900">${item.productPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <button
              onClick={onSubtract}
              className="p-1 rounded border hover:bg-gray-50"
            >
              <Minus className="h-4 w-4" />
            </button>
            
            <span className="w-8 text-center font-medium">{item.quantity}</span>
            
            <button
              onClick={onAdd}
              className="p-1 rounded border hover:bg-gray-50"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <div className="text-right">
            <div className="font-semibold text-gray-900">${item.totalPrice.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
