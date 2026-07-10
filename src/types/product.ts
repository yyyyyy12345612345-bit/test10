// Product Types

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
}

export interface ProductVariant {
  id: string;
  size: string;
  color?: string;
  sku: string;
  stock: number;
  price?: number; // Override base price if different
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number; // For sale items
  images: ProductImage[];
  variants: ProductVariant[];
  category: ProductCategory;
  tags: string[];
  collection?: string;
  material: string;
  careInstructions: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  isLimitedEdition?: boolean;
  isSoldOut?: boolean;
  stockCount?: number;
  rating?: number;
  reviewCount?: number;
  weight?: string;
  origin?: string;
  sku?: string;
  createdAt?: string;
  publishedAt?: string;
}

export type ProductCategory =
  | "outerwear"
  | "tops"
  | "bottoms"
  | "accessories"
  | "footwear"
  | "essentials";

export interface Collection {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  productCount?: number;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  body: string;
  images?: string[];
  verified: boolean;
  helpful?: number;
  createdAt: string;
}

export interface ProductQuestion {
  id: string;
  productId: string;
  question: string;
  answer?: string;
  askedBy: string;
  answeredBy?: string;
  createdAt: string;
  answeredAt?: string;
}
