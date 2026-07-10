"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { ProductCard } from "@/components/shop/ProductCard";
import type { Product } from "@/types/product";

export function SearchClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setResults([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results || []);
      } catch (err) {
        console.error("Failed to search", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [query]);

  return (
    <div
      className="min-h-screen bg-noir"
      style={{ paddingTop: "calc(var(--nav-height) + var(--bar-height))" }}
    >
      <div className="bg-smoke border-b border-fog/20 py-12">
        <div className="container-site">
          <p className="label-xs text-gold mb-2">SEARCH RESULTS</p>
          <h1 className="heading-xl text-snow">
            Showing results for &ldquo;{query}&rdquo;
          </h1>
          <p className="text-silver text-sm mt-2">
            {loading ? "Searching..." : `${results.length} products found`}
          </p>
        </div>
      </div>

      <div className="container-site py-16">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <svg className="animate-spin w-8 h-8 text-gold" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 max-w-md mx-auto">
            <Search className="w-12 h-12 text-fog mx-auto mb-4" />
            <h2 className="font-heading text-2xl text-pearl mb-2">No results found</h2>
            <p className="text-silver text-sm mb-8">
              We couldn&apos;t find anything matching &ldquo;{query}&rdquo;. Check your spelling or try another keyword.
            </p>
            <Link href="/shop" className="btn-primary">
              <span>View All Products</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
