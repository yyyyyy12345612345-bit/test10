import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/account/", "/checkout/", "/cart/", "/_next/"],
      },
    ],
    sitemap: "https://noirlabel.com/sitemap.xml",
  };
}
