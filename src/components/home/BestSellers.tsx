"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getBestSellers } from "@/lib/data/products";
import { ProductCard } from "@/components/shop/ProductCard";

export function BestSellers() {
  const products = getBestSellers();

  return (
    <section className="py-24 container-site">
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="label-xs text-gold mb-3">MOST WANTED</p>
          <h2 className="heading-xl text-snow">
            Best <span className="italic text-stroke-gold">Sellers</span>
          </h2>
        </div>
        <Link href="/shop?sort=bestselling" className="btn-ghost hidden md:flex">
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {products.map((product, i) => (
          <div
            key={product.id}
            style={{
              opacity: 0,
              animation: `fadeInUp 0.6s ease forwards ${i * 0.12}s`,
            }}
          >
            <ProductCard product={product} showRank rank={i + 1} />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
