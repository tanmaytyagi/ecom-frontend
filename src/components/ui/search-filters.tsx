import { Search, Filter, X } from "lucide-react";
import { Button } from "./button";
import { categories } from "@/lib/data";

interface SearchFiltersProps {
  searchQuery: string;
  selectedCategory: string;
  selectedRating: number;
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onRatingChange: (rating: number) => void;
  onClearFilters: () => void;
}

export function SearchFilters({
  searchQuery,
  selectedCategory,
  selectedRating,
  onSearchChange,
  onCategoryChange,
  onRatingChange,
  onClearFilters,
}: SearchFiltersProps) {
  const hasActiveFilters = searchQuery || selectedCategory || selectedRating > 0;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Filters:</span>
        </div>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Rating Filter */}
        <select
          value={selectedRating}
          onChange={(e) => onRatingChange(Number(e.target.value))}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        >
          <option value={0}>All Ratings</option>
          <option value={4.5}>4.5+ Stars</option>
          <option value={4.0}>4.0+ Stars</option>
          <option value={3.5}>3.5+ Stars</option>
          <option value={3.0}>3.0+ Stars</option>
        </select>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Clear Filters
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              Search: "{searchQuery}"
              <button
                onClick={() => onSearchChange("")}
                className="ml-1 hover:text-blue-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedCategory && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              Category: {selectedCategory}
              <button
                onClick={() => onCategoryChange("")}
                className="ml-1 hover:text-green-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedRating > 0 && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
              Rating: {selectedRating}+ stars
              <button
                onClick={() => onRatingChange(0)}
                className="ml-1 hover:text-yellow-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
