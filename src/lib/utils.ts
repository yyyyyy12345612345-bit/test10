import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  amount: number,
  currency: string = "USD",
  locale: string = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  }).format(new Date(date));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + "…";
}

export function generateOrderNumber(): string {
  const prefix = "NL";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

export function calculateLoyaltyPoints(orderTotal: number): number {
  // 1 point per $1 spent
  return Math.floor(orderTotal);
}

export function getTierFromPoints(totalPoints: number): "BRONZE" | "SILVER" | "GOLD" | "PLATINUM" {
  if (totalPoints >= 5000) return "PLATINUM";
  if (totalPoints >= 2000) return "GOLD";
  if (totalPoints >= 500) return "SILVER";
  return "BRONZE";
}

export function getTierBenefits(tier: string) {
  const benefits = {
    BRONZE: { discount: 0, freeShipping: false, earlyAccess: false },
    SILVER: { discount: 5, freeShipping: false, earlyAccess: false },
    GOLD: { discount: 10, freeShipping: true, earlyAccess: false },
    PLATINUM: { discount: 15, freeShipping: true, earlyAccess: true },
  };
  return benefits[tier as keyof typeof benefits] ?? benefits.BRONZE;
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function getEstimatedDelivery(shippingMethod: string): string {
  const today = new Date();
  const days = shippingMethod === "express" ? 2 : shippingMethod === "overnight" ? 1 : 5;
  const delivery = new Date(today.setDate(today.getDate() + days));
  return delivery.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
}
