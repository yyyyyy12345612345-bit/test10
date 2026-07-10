import type { MetadataRoute } from "next";
import { PRODUCTS, COLLECTIONS } from "@/lib/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://noirlabel.com";

  const productUrls = PRODUCTS.map((p) => ({
    url: `${base}/shop/${p.slug}`,
    lastModified: new Date(p.createdAt ?? new Date()),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const collectionUrls = COLLECTIONS.map((c) => ({
    url: `${base}/collections/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${base}/shop`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/lookbook`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    ...productUrls,
    ...collectionUrls,
  ];
}
