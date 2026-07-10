"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart, Share2, Star, Truck, RotateCcw, ShieldCheck,
  ChevronDown, ChevronRight, Minus, Plus, ZoomIn
} from "lucide-react";
import type { Product } from "@/types/product";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { formatPrice } from "@/lib/data/products";
import { ProductCard } from "@/components/shop/ProductCard";

interface Props {
  product: Product;
  related: Product[];
}

export function ProductPageClient({ product, related }: Props) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [addedState, setAddedState] = useState(false);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "care" | "shipping">("details");
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);

  const selectedVariant = selectedSize
    ? product.variants.find((v) => v.size === selectedSize)
    : null;

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2000);
      return;
    }
    if (!selectedVariant || selectedVariant.stock === 0) return;

    addItem(product, selectedVariant, quantity);
    setAddedState(true);
    setTimeout(() => setAddedState(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: product.name,
        text: product.shortDescription,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const stockCount = selectedVariant?.stock ?? product.stockCount;
  const isLowStock = stockCount !== undefined && stockCount <= 5 && stockCount > 0;

  return (
    <div
      className="min-h-screen bg-noir"
      style={{ paddingTop: "calc(var(--nav-height) + var(--bar-height))" }}
    >
      {/* Breadcrumb */}
      <div className="border-b border-fog/20 bg-smoke/50">
        <div className="container-site py-4">
          <nav className="flex items-center gap-2 text-xs text-silver">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/shop" className="hover:text-gold transition-colors">Shop</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-pearl">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container-site py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">

          {/* LEFT: Gallery */}
          <div className="space-y-4">
            {/* Main image */}
            <div
              className="relative overflow-hidden bg-ash cursor-zoom-in group"
              style={{ aspectRatio: "3/4" }}
              onClick={() => setZoomOpen(true)}
            >
              <Image
                src={product.images[selectedImage]?.url ?? product.images[0].url}
                alt={product.images[selectedImage]?.alt ?? product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                unoptimized
              />
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && <span className="badge-new">New Arrival</span>}
                {product.isLimitedEdition && <span className="badge-limited">Limited Edition</span>}
              </div>
              <div className="absolute bottom-4 right-4 glass rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4 text-silver" />
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(i)}
                    className={`relative flex-1 overflow-hidden transition-all duration-300 ${
                      selectedImage === i
                        ? "ring-1 ring-gold ring-offset-2 ring-offset-noir"
                        : "ring-1 ring-fog/30 hover:ring-fog"
                    }`}
                    style={{ aspectRatio: "3/4" }}
                    aria-label={img.alt}
                  >
                    <Image src={img.url} alt={img.alt} fill className="object-cover" sizes="80px" unoptimized />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Product Info */}
          <div className="lg:sticky lg:top-24 space-y-6">
            {/* Header */}
            <div>
              {product.collection && (
                <p className="label-xs text-gold mb-3">
                  {product.collection.replace(/-/g, " ").toUpperCase()} COLLECTION
                </p>
              )}
              <h1 className="heading-lg text-snow mb-3">{product.name}</h1>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-0.5">
                    {[1,2,3,4,5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${
                          s <= Math.round(product.rating!) ? "fill-gold text-gold" : "text-fog"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-silver">{product.rating}</span>
                  <span className="text-sm text-fog">({product.reviewCount} reviews)</span>
                </div>
              )}

              {/* Price */}
              <div className="flex items-center gap-3">
                <span className="font-heading text-3xl text-gold">{formatPrice(product.price)}</span>
                {product.compareAtPrice && (
                  <span className="text-silver line-through">{formatPrice(product.compareAtPrice)}</span>
                )}
                {product.compareAtPrice && (
                  <span className="badge-sale">
                    -{Math.round((1 - product.price / product.compareAtPrice) * 100)}% OFF
                  </span>
                )}
              </div>
            </div>

            <div className="divider" />

            {/* Description */}
            <p className="text-pearl/70 leading-relaxed text-sm">{product.description}</p>

            {/* Size selector */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="label-sm text-snow">
                  Size
                  {selectedSize && <span className="text-gold ml-2">{selectedSize}</span>}
                </label>
                <button
                  onClick={() => setSizeGuideOpen(true)}
                  className="label-xs text-silver hover:text-gold transition-colors underline underline-offset-2"
                >
                  Size Guide
                </button>
              </div>

              <div className="flex gap-2 flex-wrap">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => {
                      setSelectedSize(v.size);
                      setSizeError(false);
                    }}
                    disabled={v.stock === 0}
                    className={`px-4 py-2.5 min-w-[52px] label-xs border transition-all duration-200 ${
                      selectedSize === v.size
                        ? "border-gold bg-gold/10 text-gold"
                        : v.stock === 0
                        ? "border-fog/20 text-fog line-through cursor-not-allowed"
                        : "border-fog text-silver hover:border-pearl hover:text-pearl"
                    } ${sizeError ? "border-danger animate-pulse" : ""}`}
                  >
                    {v.size}
                  </button>
                ))}
              </div>
              {sizeError && (
                <p className="text-danger text-xs mt-2">Please select a size</p>
              )}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <label className="label-sm text-snow">Qty</label>
              <div className="flex items-center border border-fog">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-silver hover:text-gold transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center text-snow">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-silver hover:text-gold transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              {isLowStock && (
                <p className="text-danger text-xs">Only {stockCount} left!</p>
              )}
            </div>

            {/* CTAs */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className={`btn-primary flex-1 justify-center ${
                  addedState ? "!bg-success" : ""
                }`}
              >
                <span>{addedState ? "✓ Added to Cart!" : "Add to Cart"}</span>
              </button>
              <button
                onClick={() => toggleItem(product)}
                className={`w-12 h-12 flex items-center justify-center border transition-all duration-300 ${
                  inWishlist
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-fog text-silver hover:border-gold hover:text-gold"
                }`}
                aria-label={inWishlist ? "Remove from wishlist" : "Save to wishlist"}
              >
                <Heart className="w-5 h-5" fill={inWishlist ? "currentColor" : "none"} />
              </button>
              <button
                onClick={handleShare}
                className="w-12 h-12 flex items-center justify-center border border-fog text-silver hover:border-gold hover:text-gold transition-all duration-300"
                aria-label="Share product"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { icon: Truck, label: "Free Shipping", sub: "Orders over $150" },
                { icon: RotateCcw, label: "30-Day Returns", sub: "Free & easy" },
                { icon: ShieldCheck, label: "Secure Payment", sub: "Encrypted checkout" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="glass rounded-sm p-3 text-center">
                  <Icon className="w-4 h-4 text-gold mx-auto mb-1" />
                  <p className="text-xs text-pearl font-medium">{label}</p>
                  <p className="text-xs text-silver mt-0.5">{sub}</p>
                </div>
              ))}
            </div>

            {/* SKU */}
            {product.sku && (
              <p className="text-xs text-fog">SKU: {product.sku}</p>
            )}

            {/* Tabs */}
            <div className="border-t border-fog/30 pt-6">
              <div className="flex gap-6 mb-4 border-b border-fog/20">
                {(["details", "care", "shipping"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 label-xs transition-colors ${
                      activeTab === tab
                        ? "text-gold border-b border-gold -mb-px"
                        : "text-silver hover:text-pearl"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {activeTab === "details" && (
                <div className="space-y-2 text-sm text-silver">
                  <div className="flex gap-2">
                    <span className="text-pearl/60 min-w-[100px]">Material</span>
                    <span>{product.material}</span>
                  </div>
                  {product.weight && (
                    <div className="flex gap-2">
                      <span className="text-pearl/60 min-w-[100px]">Weight</span>
                      <span>{product.weight}</span>
                    </div>
                  )}
                  {product.origin && (
                    <div className="flex gap-2">
                      <span className="text-pearl/60 min-w-[100px]">Origin</span>
                      <span>{product.origin}</span>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "care" && (
                <ul className="space-y-2">
                  {product.careInstructions.map((instr, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-silver">
                      <span className="text-gold mt-1">·</span>
                      {instr}
                    </li>
                  ))}
                </ul>
              )}

              {activeTab === "shipping" && (
                <div className="space-y-2 text-sm text-silver">
                  <p>· Standard shipping: 3–5 business days (Free over $150)</p>
                  <p>· Express shipping: 1–2 business days ($15)</p>
                  <p>· Free returns within 30 days of delivery</p>
                  <p>· All orders tracked with real-time updates</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-24">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="label-xs text-gold mb-2">YOU MAY ALSO LIKE</p>
                <h2 className="heading-md text-snow">Related Products</h2>
              </div>
              <Link href="/shop" className="btn-ghost hidden md:flex">
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {zoomOpen && (
        <div
          className="fixed inset-0 z-[300] bg-noir/98 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setZoomOpen(false)}
        >
          <div className="relative max-w-2xl w-full" style={{ aspectRatio: "3/4" }}>
            <Image
              src={product.images[selectedImage]?.url ?? product.images[0].url}
              alt={product.name}
              fill
              className="object-contain"
              sizes="90vw"
              quality={100}
            />
          </div>
          <button className="absolute top-4 right-4 text-silver hover:text-gold p-2">✕</button>
        </div>
      )}

      {/* Sticky Add to Cart (mobile) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-smoke/95 backdrop-blur-md border-t border-fog/30 p-4">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="text-xs text-silver">{product.name}</p>
            <p className="text-gold font-semibold">{formatPrice(product.price)}</p>
          </div>
          <button onClick={handleAddToCart} className="btn-primary">
            <span>{addedState ? "✓ Added!" : "Add to Cart"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
