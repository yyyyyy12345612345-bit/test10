"use client";

import { useState, useMemo } from "react";
import { SlidersHorizontal, Grid2X2, LayoutList, X } from "lucide-react";
import { PRODUCTS } from "@/lib/data/products";
import { ProductCard } from "@/components/shop/ProductCard";
import type { ProductCategory } from "@/types/product";

const CATEGORIES: { value: ProductCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "outerwear", label: "Outerwear" },
  { value: "tops", label: "Tops" },
  { value: "bottoms", label: "Bottoms" },
  { value: "accessories", label: "Accessories" },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "bestselling", label: "Best Selling" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "rating", label: "Top Rated" },
];

export function ShopClient() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [sort, setSort] = useState("newest");
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(3);
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  const filtered = useMemo(() => {
    let results = [...PRODUCTS];

    // Category filter
    if (activeCategory !== "all") {
      results = results.filter((p) => p.category === activeCategory);
    }

    // Price filter
    results = results.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sort
    switch (sort) {
      case "price-asc":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        results.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        results.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      case "bestselling":
        results.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
      case "newest":
      default:
        results.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return results;
  }, [activeCategory, sort, priceRange]);

  const gridClass = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  }[gridCols];

  return (
    <div
      className="min-h-screen"
      style={{ paddingTop: "calc(var(--nav-height) + var(--bar-height))" }}
    >
      {/* Page Header */}
      <div className="bg-smoke border-b border-fog/20 py-12">
        <div className="container-site">
          <p className="label-xs text-gold mb-2">THE COLLECTION</p>
          <h1 className="heading-xl text-snow">Shop</h1>
          <p className="text-silver text-sm mt-2">{filtered.length} products</p>
        </div>
      </div>

      <div className="container-site py-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
          {/* Category pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 label-xs transition-all duration-300 border ${
                  activeCategory === cat.value
                    ? "bg-gold text-noir border-gold"
                    : "border-fog text-silver hover:border-gold/50 hover:text-pearl"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-ash border border-fog text-silver text-sm px-3 py-2 outline-none hover:border-gold/40 transition-colors cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            {/* Grid toggle */}
            <div className="hidden md:flex items-center border border-fog">
              {([2, 3, 4] as const).map((cols) => (
                <button
                  key={cols}
                  onClick={() => setGridCols(cols)}
                  className={`px-3 py-2 transition-colors ${
                    gridCols === cols ? "bg-gold/20 text-gold" : "text-silver hover:text-pearl"
                  }`}
                  aria-label={`${cols} column grid`}
                >
                  <Grid2X2 className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filtered.length > 0 ? (
          <div className={`grid ${gridClass} gap-4 md:gap-6`}>
            {filtered.map((product, i) => (
              <div
                key={product.id}
                style={{
                  opacity: 0,
                  animation: `fadeIn 0.5s ease forwards ${Math.min(i * 0.06, 0.6)}s`,
                }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32">
            <p className="font-heading text-3xl text-pearl mb-3">No products found</p>
            <p className="text-silver text-sm mb-6">Try adjusting your filters.</p>
            <button
              onClick={() => { setActiveCategory("all"); setPriceRange([0, 1000]); }}
              className="btn-outline"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
