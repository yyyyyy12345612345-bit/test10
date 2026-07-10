import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { COLLECTIONS, getProductsByCollection } from "@/lib/data/products";
import { ProductCard } from "@/components/shop/ProductCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const col = COLLECTIONS.find((c) => c.slug === slug);
  if (!col) return { title: "Not Found" };
  return {
    title: `${col.name} Collection — NOIR LABEL`,
    description: col.description,
  };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const collection = COLLECTIONS.find((c) => c.slug === slug);
  if (!collection) notFound();

  const products = getProductsByCollection(slug);

  return (
    <div
      className="min-h-screen bg-noir"
      style={{ paddingTop: "calc(var(--nav-height) + var(--bar-height))" }}
    >
      {/* Hero */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <Image
          src={collection.image}
          alt={collection.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container-site pb-10">
          {collection.slug === "eclipse" && (
            <span className="badge-limited mb-3 inline-block">Limited Edition</span>
          )}
          <h1 className="heading-xl text-snow">{collection.name}</h1>
          <p className="text-pearl/60 text-sm mt-2 max-w-md">{collection.description}</p>
        </div>
      </div>

      {/* Products */}
      <div className="container-site py-12">
        <p className="label-xs text-silver mb-8">{products.length} pieces</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
