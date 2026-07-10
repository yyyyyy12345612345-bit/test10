import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { COLLECTIONS } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Collections — NOIR LABEL",
  description: "Explore NOIR LABEL collections: Shadow Season, Essentials, and Eclipse Limited Edition.",
};

export default function CollectionsPage() {
  return (
    <div
      className="min-h-screen bg-noir"
      style={{ paddingTop: "calc(var(--nav-height) + var(--bar-height))" }}
    >
      <div className="bg-smoke border-b border-fog/20 py-12">
        <div className="container-site">
          <p className="label-xs text-gold mb-2">ALL COLLECTIONS</p>
          <h1 className="heading-xl text-snow">Collections</h1>
        </div>
      </div>

      <div className="container-site py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COLLECTIONS.map((col) => (
            <Link
              key={col.id}
              href={`/collections/${col.slug}`}
              className="group relative overflow-hidden block"
              style={{ aspectRatio: "3/4" }}
            >
              <Image
                src={col.image}
                alt={col.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir/90 via-noir/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                {col.slug === "eclipse" && (
                  <span className="badge-limited mb-2 inline-block">Limited Edition</span>
                )}
                <h2 className="heading-md text-snow mb-2">{col.name}</h2>
                <p className="text-sm text-pearl/60 mb-4 leading-relaxed">{col.description}</p>
                <div className="flex items-center gap-2 text-gold label-xs">
                  <span>Explore</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
