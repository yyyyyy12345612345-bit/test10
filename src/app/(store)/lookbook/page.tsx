import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Lookbook — NOIR LABEL",
  description: "The NOIR LABEL SS26 Lookbook. Shadow Season — where darkness meets craft.",
};

const LOOKS = [
  {
    id: 1,
    title: "Look 01 — The Arrival",
    description: "Obsidian Bomber + Phantom Cargo + NOIR Tee",
    image: "/home/WhatsApp Image 2026-03-31 at 16.44.39(1).jpeg",
    products: ["obsidian-leather-bomber", "phantom-cargo-pants", "noir-graphic-tee"],
  },
  {
    id: 2,
    title: "Look 02 — The Architect",
    description: "Eclipse Coat + Void Hoodie + Abyss Trousers",
    image: "/pr/4.avif",
    products: ["eclipse-longline-coat", "void-oversized-hoodie", "abyss-wide-leg-trousers"],
  },
  {
    id: 3,
    title: "Look 03 — The Essential",
    description: "Shadow Crewneck + Phantom Cargo",
    image: "/pr/5.avif",
    products: ["shadow-crewneck", "phantom-cargo-pants"],
  },
  {
    id: 4,
    title: "Look 04 — The Track",
    description: "Void Track Jacket + NOIR Tee + Abyss Trousers",
    image: "/pr/6.avif",
    products: ["void-track-jacket", "noir-graphic-tee", "abyss-wide-leg-trousers"],
  },
];

export default function LookbookPage() {
  return (
    <div
      className="min-h-screen bg-noir"
      style={{ paddingTop: "calc(var(--nav-height) + var(--bar-height))" }}
    >
      {/* Header */}
      <div className="py-20 container-site text-center">
        <p className="label-xs text-gold mb-4">EDITORIAL</p>
        <h1 className="heading-display text-snow mb-6">
          SS26<br />
          <span className="italic text-stroke-gold">Lookbook</span>
        </h1>
        <p className="text-pearl/50 text-sm max-w-sm mx-auto">
          Shadow Season — four looks, one vision. The darkness between the seasons.
        </p>
      </div>

      {/* Looks */}
      <div className="space-y-0">
        {LOOKS.map((look, i) => (
          <div
            key={look.id}
            className={`grid grid-cols-1 md:grid-cols-2 min-h-screen ${
              i % 2 === 1 ? "md:grid-flow-col-dense" : ""
            }`}
          >
            {/* Image */}
            <div className={`relative overflow-hidden ${i % 2 === 1 ? "md:col-start-2" : ""}`}>
              <Image
                src={look.image}
                alt={look.title}
                fill
                className="object-cover"
                sizes="50vw"
              />
              <div className="absolute inset-0 bg-noir/20" />
            </div>

            {/* Content */}
            <div
              className={`flex flex-col justify-center p-12 md:p-20 bg-smoke ${
                i % 2 === 1 ? "md:col-start-1 md:row-start-1" : ""
              }`}
            >
              <p className="label-xs text-gold mb-4">
                LOOK {String(look.id).padStart(2, "0")}
              </p>
              <h2 className="heading-lg text-snow mb-4">{look.title}</h2>
              <p className="text-silver text-sm mb-8">{look.description}</p>

              <div className="space-y-3">
                <p className="label-xs text-silver">WORN IN THIS LOOK:</p>
                {look.products.map((slug) => {
                  const product = PRODUCTS.find((p) => p.slug === slug);
                  if (!product) return null;
                  return (
                    <Link
                      key={slug}
                      href={`/shop/${slug}`}
                      className="flex items-center justify-between py-3 border-b border-fog/30 group"
                    >
                      <span className="text-sm text-pearl group-hover:text-gold transition-colors">
                        {product.name}
                      </span>
                      <span className="text-sm text-gold">${product.price}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
