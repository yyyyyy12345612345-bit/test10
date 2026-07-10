"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { FREE_SHIPPING_THRESHOLD } from "@/types/cart";
import { formatPrice } from "@/lib/data/products";

export function CartDrawer() {
  const {
    isOpen,
    closeCart,
    items,
    removeItem,
    updateQuantity,
    getTotals,
    couponCode,
    applyCoupon,
    removeCoupon,
  } = useCartStore();

  const totals = getTotals();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        closeCart();
      }
    };
    if (isOpen) {
      setTimeout(() => document.addEventListener("mousedown", handleClick), 100);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, closeCart]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const shippingProgress = Math.min((totals.subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const amountToFreeShipping = FREE_SHIPPING_THRESHOLD - totals.subtotal;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[200] bg-noir/60 backdrop-blur-sm transition-opacity duration-400 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 bottom-0 z-[201] w-full max-w-[440px] bg-smoke border-l border-fog/30 flex flex-col transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-fog/30">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-gold" />
            <h2 className="font-body font-semibold text-snow tracking-wider uppercase text-sm">
              Your Cart
              {items.length > 0 && (
                <span className="ml-2 text-silver font-normal">({items.length})</span>
              )}
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 text-silver hover:text-gold transition-colors duration-300"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress */}
        {totals.subtotal < FREE_SHIPPING_THRESHOLD && (
          <div className="px-6 py-4 border-b border-fog/20 bg-ash/40">
            <p className="text-xs text-silver mb-2">
              Add{" "}
              <span className="text-gold font-semibold">
                {formatPrice(amountToFreeShipping)}
              </span>{" "}
              for free worldwide shipping
            </p>
            <div className="h-0.5 bg-fog rounded-full overflow-hidden">
              <div
                className="h-full bg-gold transition-all duration-700 ease-out"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>
        )}
        {totals.subtotal >= FREE_SHIPPING_THRESHOLD && (
          <div className="px-6 py-3 border-b border-fog/20 bg-gold/10 text-gold text-xs text-center font-semibold tracking-wider uppercase">
            ✓ You qualify for free shipping!
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto py-4 scrollbar-hide">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-6 px-8 text-center">
              <ShoppingBag className="w-12 h-12 text-fog" />
              <div>
                <p className="font-heading text-2xl text-pearl mb-2">Your cart is empty</p>
                <p className="text-sm text-silver">Add some pieces to get started.</p>
              </div>
              <Link
                href="/shop"
                className="btn-primary"
                onClick={closeCart}
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-fog/20">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-6">
                  {/* Image */}
                  <div className="relative w-20 h-28 flex-shrink-0 bg-ash overflow-hidden">
                    <Image
                      src={item.product.images[0].url}
                      alt={item.product.images[0].alt}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <Link
                        href={`/shop/${item.product.slug}`}
                        className="text-snow text-sm font-medium hover:text-gold transition-colors line-clamp-2"
                        onClick={closeCart}
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-silver mt-1">
                        Size: <span className="text-pearl">{item.variant.size}</span>
                        {item.variant.color && (
                          <> · Color: <span className="text-pearl">{item.variant.color}</span></>
                        )}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity */}
                      <div className="flex items-center gap-2 border border-fog/50">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-silver hover:text-gold transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-sm text-snow">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-silver hover:text-gold transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-snow">
                          {formatPrice((item.variant.price ?? item.product.price) * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-fog hover:text-danger transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-fog/30 p-6 space-y-4">
            {/* Totals */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-silver">
                <span>Subtotal</span>
                <span>{formatPrice(totals.subtotal)}</span>
              </div>
              {totals.discount > 0 && (
                <div className="flex justify-between text-sm text-success">
                  <span>Discount ({couponCode})</span>
                  <span>−{formatPrice(totals.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm text-silver">
                <span>Shipping</span>
                <span>{totals.shipping === 0 ? "FREE" : formatPrice(totals.shipping)}</span>
              </div>
              <div className="divider" />
              <div className="flex justify-between text-base font-semibold text-snow">
                <span>Total</span>
                <span className="text-gold">{formatPrice(totals.total)}</span>
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/checkout"
              onClick={closeCart}
              className="btn-primary w-full justify-center"
            >
              <span>Checkout</span>
              <ArrowRight className="w-4 h-4 relative z-10" />
            </Link>

            <Link
              href="/shop"
              onClick={closeCart}
              className="block text-center text-xs text-silver hover:text-pearl transition-colors tracking-wider uppercase"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
