"use client";

import { useState, useMemo } from "react";
import { ProductCard } from "./ProductCard";
import { Button } from "@/components/ui/Button";

interface Product {
  id: string;
  name: string;
  price: number;
  old_price?: number | null;
  badge?: string | null;
  images: string[];
  condition: string;
  storage: string[];
  colors: string[];
  model: string;
  created_at: string;
}

interface ProductGridProps {
  initialProducts: Product[];
  initialFilter?: string;
  initialModel?: string;
}

export function ProductGrid({ initialProducts, initialFilter, initialModel }: ProductGridProps) {
  const [activeFilter, setActiveFilter] = useState<string>(initialFilter || "All");
  const [activeSort, setActiveSort] = useState<string>("Newest");

  const filters = ["All", "New", "Refurbished", "Used", "iPhone 15 Series", "iPhone 14 Series", "iPhone 13 Series"];
  const sorts = ["Newest", "Price: Low to High", "Price: High to Low"];

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...initialProducts];

    // Filter
    if (activeFilter !== "All") {
      if (["New", "Refurbished", "Used"].includes(activeFilter)) {
        result = result.filter(p => p.condition === activeFilter);
      } else {
        result = result.filter(p => p.model === activeFilter);
      }
    }

    // Sort
    switch (activeSort) {
      case "Price: Low to High":
        result.sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        result.sort((a, b) => b.price - a.price);
        break;
      case "Newest":
      default:
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
    }

    return result;
  }, [initialProducts, activeFilter, activeSort]);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 shrink-0 space-y-8">
        <div>
          <h3 className="text-white font-medium mb-4 uppercase tracking-wider text-sm">Categories</h3>
          <div className="flex flex-wrap gap-2 md:flex-col md:gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`text-left text-sm transition-colors px-3 py-1.5 rounded-full md:px-0 md:py-0 md:rounded-none md:border-none border ${
                  activeFilter === filter 
                    ? "bg-[var(--color-accent)] text-black border-[var(--color-accent)] md:bg-transparent md:text-[var(--color-accent)] font-medium" 
                    : "text-[var(--color-muted)] hover:text-white border-[rgba(255,255,255,0.1)]"
                }`}
              >
                {filter === "Used" ? "Pre-owned" : filter}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-white font-medium mb-4 uppercase tracking-wider text-sm">Sort By</h3>
          <div className="flex flex-wrap gap-2 md:flex-col md:gap-3">
            {sorts.map((sort) => (
              <button
                key={sort}
                onClick={() => setActiveSort(sort)}
                className={`text-left text-sm transition-colors px-3 py-1.5 rounded-full md:px-0 md:py-0 md:rounded-none md:border-none border ${
                  activeSort === sort 
                    ? "bg-white text-black border-white md:bg-transparent md:text-white font-medium" 
                    : "text-[var(--color-muted)] hover:text-white border-[rgba(255,255,255,0.1)]"
                }`}
              >
                {sort}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Product Grid */}
      <div className="flex-1">
        <div className="mb-6 flex justify-between items-center text-sm text-[var(--color-muted)]">
          <span>Showing {filteredAndSortedProducts.length} result{filteredAndSortedProducts.length !== 1 && 's'}</span>
        </div>
        
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center border border-[rgba(255,255,255,0.05)] rounded-2xl bg-[#111111]">
            <h3 className="text-xl text-white mb-2">No products found</h3>
            <p className="text-[var(--color-muted)] mb-6">Try adjusting your filters to see more results.</p>
            <Button onClick={() => setActiveFilter("All")} variant="outline">
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
