"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { COLLECTIONS } from "@/lib/data/products";

export function CollectionsGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const cards = sectionRef.current?.querySelectorAll(".collection-card");
      cards?.forEach((card, i) => {
        gsap.fromTo(
          card,
          { clipPath: "inset(100% 0 0 0)", opacity: 0 },
          {
            clipPath: "inset(0% 0 0 0)",
            opacity: 1,
            duration: 1.2,
            delay: i * 0.15,
            ease: "expo.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    };
    initGSAP();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 container-site">
      {/* Header */}
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="label-xs text-gold mb-3">COLLECTIONS</p>
          <h2 className="heading-xl text-snow">
            Shop by<br />
            <span className="text-stroke-gold italic">Collection</span>
          </h2>
        </div>
        <Link href="/collections" className="btn-ghost hidden md:flex">
          View All <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {COLLECTIONS.map((col, i) => (
          <Link
            key={col.id}
            href={`/collections/${col.slug}`}
            className={`collection-card group relative overflow-hidden ${
              i === 0 ? "md:col-span-2 md:row-span-2" : ""
            }`}
            style={{ aspectRatio: i === 0 ? "16/10" : "4/3" }}
          >
            <Image
              src={col.image}
              alt={col.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes={i === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-noir/90 via-noir/20 to-transparent" />
            <div className="absolute inset-0 bg-noir/0 group-hover:bg-noir/20 transition-colors duration-500" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              {col.slug === "eclipse" && (
                <span className="badge-limited mb-2 inline-block">Limited Edition</span>
              )}
              <h3 className="heading-md text-snow mb-1">{col.name}</h3>
              <p className="text-sm text-pearl/70 mb-4 max-w-xs leading-relaxed hidden md:block">
                {col.description}
              </p>
              <div className="flex items-center gap-2 text-gold label-xs group-hover:gap-4 transition-all duration-300">
                <span>Explore</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Corner accent */}
            <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-gold/0 group-hover:border-gold/60 transition-all duration-500" />
          </Link>
        ))}
      </div>
    </section>
  );
}
