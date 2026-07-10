// Cart Types

import type { ProductVariant, Product } from "./product";

export interface CartItem {
  id: string;
  product: Product;
  variant: ProductVariant;
  quantity: number;
  addedAt: string;
}

export interface Cart {
  items: CartItem[];
  couponCode?: string;
  couponDiscount?: number;
  giftCardCode?: string;
  giftCardAmount?: number;
  notes?: string;
}

export interface CartTotals {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  itemCount: number;
}

export type ShippingMethod = {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
};

export const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: "standard",
    name: "Standard Shipping",
    description: "3–5 business days",
    price: 0, // Free above threshold
    estimatedDays: "3–5 days",
  },
  {
    id: "express",
    name: "Express Shipping",
    description: "1–2 business days",
    price: 15,
    estimatedDays: "1–2 days",
  },
  {
    id: "overnight",
    name: "Overnight Delivery",
    description: "Next business day",
    price: 35,
    estimatedDays: "Next day",
  },
];

export const FREE_SHIPPING_THRESHOLD = 150; // USD
