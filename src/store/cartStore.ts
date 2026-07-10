"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartItem, Cart, CartTotals } from "@/types/cart";
import type { Product, ProductVariant } from "@/types/product";
import { FREE_SHIPPING_THRESHOLD } from "@/types/cart";

interface CartStore extends Cart {
  isOpen: boolean;
  isLoading: boolean;

  // Actions
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  addItem: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;

  applyCoupon: (code: string) => Promise<boolean>;
  removeCoupon: () => void;

  setNotes: (notes: string) => void;

  getTotals: () => CartTotals;
  getItemCount: () => number;
  isInCart: (productId: string, variantId: string) => boolean;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: undefined,
      couponDiscount: undefined,
      notes: undefined,
      isOpen: false,
      isLoading: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (product, variant, quantity = 1) => {
        const { items } = get();
        const existingIndex = items.findIndex(
          (item) => item.product.id === product.id && item.variant.id === variant.id
        );

        if (existingIndex >= 0) {
          const newItems = [...items];
          newItems[existingIndex] = {
            ...newItems[existingIndex],
            quantity: newItems[existingIndex].quantity + quantity,
          };
          set({ items: newItems });
        } else {
          const newItem: CartItem = {
            id: `${product.id}-${variant.id}-${Date.now()}`,
            product,
            variant,
            quantity,
            addedAt: new Date().toISOString(),
          };
          set({ items: [...items, newItem] });
        }
        set({ isOpen: true }); // Auto-open cart on add
      },

      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        }));
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity < 1) {
          get().removeItem(itemId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => set({ items: [], couponCode: undefined, couponDiscount: undefined }),

      applyCoupon: async (code) => {
        set({ isLoading: true });
        // Mock coupon validation
        await new Promise((r) => setTimeout(r, 800));
        const validCoupons: Record<string, number> = {
          NOIR10: 0.1,
          NOIR20: 0.2,
          SHADOW15: 0.15,
        };
        const discount = validCoupons[code.toUpperCase()];
        if (discount) {
          set({ couponCode: code.toUpperCase(), couponDiscount: discount, isLoading: false });
          return true;
        }
        set({ isLoading: false });
        return false;
      },

      removeCoupon: () => set({ couponCode: undefined, couponDiscount: undefined }),

      setNotes: (notes) => set({ notes }),

      getTotals: (): CartTotals => {
        const { items, couponDiscount } = get();
        const subtotal = items.reduce(
          (sum, item) => sum + (item.variant.price ?? item.product.price) * item.quantity,
          0
        );
        const discount = couponDiscount ? subtotal * couponDiscount : 0;
        const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 8;
        const taxableAmount = subtotal - discount;
        const tax = taxableAmount * 0; // Tax handled at checkout
        const total = subtotal - discount + shipping + tax;
        const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

        return { subtotal, discount, shipping, tax, total, itemCount };
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      isInCart: (productId, variantId) => {
        return get().items.some(
          (item) => item.product.id === productId && item.variant.id === variantId
        );
      },
    }),
    {
      name: "noir-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        couponCode: state.couponCode,
        couponDiscount: state.couponDiscount,
        notes: state.notes,
      }),
    }
  )
);
