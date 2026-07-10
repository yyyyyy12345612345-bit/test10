"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Eye, Star } from "lucide-react";
import type { Product } from "@/types/product";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { formatPrice } from "@/lib/data/products";

interface ProductCardProps {
  product: Product;
  showRank?: boolean;
  rank?: number;
}

export function ProductCard({ product, showRank, rank }: ProductCardProps) {
  const [hovering, setHovering] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [addedFeedback, setAddedFeedback] = useState(false);

  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();

  const primaryImage = product.images.find((i) => i.isPrimary) ?? product.images[0];
  const secondaryImage = product.images.find((i) => !i.isPrimary) ?? product.images[0];
  const inWishlist = isInWishlist(product.id);

  const availableSizes = product.variants.filter((v) => v.stock > 0);
  const isAllSoldOut = availableSizes.length === 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAllSoldOut) return;
    const sizeToAdd = selectedSize
      ? product.variants.find((v) => v.size === selectedSize)
      : availableSizes[0];
    if (sizeToAdd) {
      addItem(product, sizeToAdd, 1);
      setAddedFeedback(true);
      setTimeout(() => setAddedFeedback(false), 1500);
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleItem(product);
  };

  return (
    <article
      className="product-card group"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <Link href={`/shop/${product.slug}`} className="block">
        {/* Image container */}
        <div className="card-image relative">
          {/* Primary image */}
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt}
            fill
            className="primary object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            unoptimized
          />
          {/* Secondary image (hover reveal) */}
          <Image
            src={secondaryImage.url}
            alt={secondaryImage.alt}
            fill
            className="secondary object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            unoptimized
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.isNew && <span className="badge-new">New</span>}
            {product.isLimitedEdition && <span className="badge-limited">Limited</span>}
            {product.compareAtPrice && (
              <span className="badge-sale">
                -{Math.round((1 - product.price / product.compareAtPrice) * 100)}%
              </span>
            )}
            {isAllSoldOut && <span className="badge-sold-out">Sold Out</span>}
          </div>

          {/* Rank badge */}
          {showRank && rank && (
            <div className="absolute top-3 right-3 z-10 w-7 h-7 bg-gold text-noir rounded-full flex items-center justify-center">
              <span className="text-xs font-bold">{rank}</span>
            </div>
          )}

          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            className={`absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center transition-all duration-300 ${
              showRank ? "top-12 mt-1" : ""
            } ${
              inWishlist
                ? "text-gold"
                : "text-white/0 group-hover:text-white/70 hover:!text-gold"
            }`}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              className="w-4 h-4"
              fill={inWishlist ? "currentColor" : "none"}
            />
          </button>

          {/* Quick View icon */}
          <Link
            href={`/shop/${product.slug}`}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 w-8 h-8 glass rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
            aria-label="Quick view"
          >
            <Eye className="w-4 h-4" />
          </Link>

          {/* Size quick-select (hover) */}
          {!isAllSoldOut && hovering && (
            <div className="absolute bottom-0 left-0 right-0 z-10 bg-noir/80 backdrop-blur-sm p-2">
              <div className="flex gap-1 justify-center flex-wrap">
                {product.variants.slice(0, 5).map((v) => (
                  <button
                    key={v.id}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedSize(selectedSize === v.size ? null : v.size);
                    }}
                    disabled={v.stock === 0}
                    className={`px-2 py-0.5 text-xs border transition-all duration-200 ${
                      selectedSize === v.size
                        ? "border-gold text-gold bg-gold/10"
                        : v.stock === 0
                        ? "border-fog/30 text-fog line-through cursor-not-allowed"
                        : "border-fog/50 text-silver hover:border-gold/50"
                    }`}
                  >
                    {v.size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick add overlay */}
          <div
            className={`absolute bottom-0 left-0 right-0 z-20 transition-all duration-300 ${
              hovering && !isAllSoldOut ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
            }`}
            style={{ top: hovering && !isAllSoldOut ? "auto" : undefined }}
          />
        </div>

        {/* Card info */}
        <div className="p-4">
          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1 mb-2">
              <Star className="w-3 h-3 fill-gold text-gold" />
              <span className="text-xs text-silver">{product.rating}</span>
              <span className="text-xs text-fog">({product.reviewCount})</span>
            </div>
          )}

          <h3 className="text-snow text-sm font-medium mb-1 leading-tight">{product.name}</h3>
          <p className="text-silver text-xs mb-3 line-clamp-1">{product.shortDescription}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-gold font-semibold">{formatPrice(product.price)}</span>
              {product.compareAtPrice && (
                <span className="text-fog text-xs line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>

            {/* Quick Add */}
            {!isAllSoldOut && (
              <button
                onClick={handleQuickAdd}
                className={`w-8 h-8 flex items-center justify-center border transition-all duration-300 ${
                  addedFeedback
                    ? "border-gold bg-gold text-noir"
                    : "border-fog text-silver hover:border-gold hover:text-gold"
                }`}
                aria-label={addedFeedback ? "Added!" : "Quick add to cart"}
              >
                {addedFeedback ? (
                  <span className="text-xs font-bold">✓</span>
                ) : (
                  <ShoppingBag className="w-3.5 h-3.5" />
                )}
              </button>
            )}
          </div>

          {/* Low stock warning */}
          {product.stockCount && product.stockCount < 5 && !isAllSoldOut && (
            <p className="text-danger text-xs mt-2">Only {product.stockCount} left</p>
          )}
        </div>
      </Link>
    </article>
  );
}
