import { NextResponse } from "next/server";
import { PRODUCTS } from "@/lib/data/products";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.toLowerCase().trim();
    const category = searchParams.get("category");
    const sort = searchParams.get("sort") || "relevance";
    const minPrice = parseFloat(searchParams.get("minPrice") || "0");
    const maxPrice = parseFloat(searchParams.get("maxPrice") || "99999");
    const limit = parseInt(searchParams.get("limit") || "20");
    const page = parseInt(searchParams.get("page") || "1");

    if (!q) {
      return NextResponse.json({ results: [], total: 0, query: "" });
    }

    // Search across products (in production, use Postgres full-text search / Algolia)
    let results = PRODUCTS.filter((product) => {
      const searchFields = [
        product.name,
        product.description,
        product.shortDescription,
        product.material,
        ...product.tags,
        product.category,
      ]
        .join(" ")
        .toLowerCase();

      return searchFields.includes(q);
    });

    // Category filter
    if (category && category !== "all") {
      results = results.filter((p) => p.category === category);
    }

    // Price filter
    results = results.filter((p) => p.price >= minPrice && p.price <= maxPrice);

    // Sort
    switch (sort) {
      case "price-asc":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        results.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        results.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      case "newest":
        results.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      // relevance: keep natural order
    }

    const total = results.length;
    const offset = (page - 1) * limit;
    const paginated = results.slice(offset, offset + limit);

    return NextResponse.json({
      results: paginated,
      total,
      page,
      pages: Math.ceil(total / limit),
      query: q,
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
