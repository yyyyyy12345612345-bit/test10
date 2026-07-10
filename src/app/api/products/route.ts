import { NextResponse } from "next/server";
import { PRODUCTS, getProductBySlug } from "@/lib/data/products";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const sort = searchParams.get("sort");
  const collection = searchParams.get("collection");
  const limit = parseInt(searchParams.get("limit") || "20");

  let products = [...PRODUCTS];

  if (category && category !== "all") {
    products = products.filter((p) => p.category === category);
  }
  if (collection) {
    products = products.filter((p) => p.collection === collection);
  }

  switch (sort) {
    case "price-asc": products.sort((a, b) => a.price - b.price); break;
    case "price-desc": products.sort((a, b) => b.price - a.price); break;
    case "newest": products.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
    case "bestselling": products.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0)); break;
    case "rating": products.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)); break;
  }

  return NextResponse.json({ products: products.slice(0, limit), total: products.length });
}
