"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PRODUCTS, getNewArrivals } from "@/lib/data/products";
import { ProductCard } from "@/components/shop/ProductCard";

export function NewArrivals() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const newProducts = getNewArrivals();

  return (
    <section className="py-24 bg-smoke">
      <div className="container-site">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="label-xs text-gold mb-3">JUST DROPPED</p>
            <h2 className="heading-xl text-snow">
              New <span className="italic text-stroke-gold">Arrivals</span>
            </h2>
          </div>
          <Link href="/shop?sort=newest" className="btn-ghost hidden md:flex">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Horizontal scroll container */}
      <div className="overflow-x-auto scrollbar-hide pl-4 md:pl-8 xl:pl-12 2xl:pl-[max(3rem,calc((100vw-1440px)/2+3rem))]">
        <div
          ref={scrollRef}
          className="flex gap-4 pb-4"
          style={{ width: "max-content" }}
        >
          {newProducts.map((product, i) => (
            <div
              key={product.id}
              className="w-[280px] md:w-[320px] flex-shrink-0"
              style={{
                opacity: 0,
                animation: `fadeInUp 0.6s ease forwards ${i * 0.1}s`,
              }}
            >
              <ProductCard product={product} />
            </div>
          ))}
          {/* End spacer */}
          <div className="w-8 flex-shrink-0" />
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
