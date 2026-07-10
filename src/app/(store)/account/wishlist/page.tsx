"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, ChevronRight, Trash2 } from "lucide-react";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/data/products";

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();
  const { addItem } = useCartStore();

  const handleMoveToCart = (product: (typeof items)[0]) => {
    const variant = product.variants.find((v) => v.stock > 0);
    if (variant) {
      addItem(product, variant);
      removeItem(product.id);
    }
  };

  return (
    <div
      className="min-h-screen bg-noir"
      style={{ paddingTop: "calc(var(--nav-height) + var(--bar-height))" }}
    >
      <div className="bg-smoke border-b border-fog/20 py-10">
        <div className="container-site">
          <div className="flex items-center gap-2 text-xs text-silver mb-4">
            <Link href="/account" className="hover:text-gold transition-colors">Account</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-pearl">Wishlist</span>
          </div>
          <p className="label-xs text-gold mb-2">SAVED PIECES</p>
          <h1 className="heading-xl text-snow">
            Wishlist
            {items.length > 0 && (
              <span className="text-fog text-3xl ml-3">({items.length})</span>
            )}
          </h1>
        </div>
      </div>

      <div className="container-site py-10">
        {items.length === 0 ? (
          <div className="text-center py-24">
            <Heart className="w-12 h-12 text-fog mx-auto mb-4" />
            <h2 className="font-heading text-2xl text-pearl mb-2">Your wishlist is empty</h2>
            <p className="text-silver text-sm mb-6">Save pieces you love and come back to them.</p>
            <Link href="/shop" className="btn-primary">
              <span>Browse Collection</span>
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
              {items.map((product) => (
                <div key={product.id} className="group relative">
                  <Link href={`/shop/${product.slug}`} className="block">
                    <div className="relative overflow-hidden bg-ash aspect-[3/4] mb-3">
                      <Image
                        src={product.images[0].url}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, 25vw"
                      />
                    </div>
                    <h3 className="text-sm text-snow group-hover:text-gold transition-colors">{product.name}</h3>
                    <p className="text-gold font-semibold mt-1">{formatPrice(product.price)}</p>
                  </Link>

                  {/* Actions */}
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleMoveToCart(product)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 bg-gold/10 border border-gold/30 text-gold text-xs hover:bg-gold/20 transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => removeItem(product.id)}
                      className="w-9 h-9 flex items-center justify-center border border-fog/40 text-silver hover:border-danger hover:text-danger transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Move all to cart */}
            <div className="flex justify-center">
              <button
                onClick={() => items.forEach((p) => handleMoveToCart(p))}
                className="btn-outline"
              >
                <ShoppingBag className="w-4 h-4" />
                Move All to Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
