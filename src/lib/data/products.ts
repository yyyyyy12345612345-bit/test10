import type { Product, Collection } from "@/types/product";

// ================================================================
// NOIR LABEL — Product Data
// 8 Products using real brand images from /pr/ directory
// Image naming: 1.avif (primary) + 11.avif (secondary/detail)
// ================================================================

export const PRODUCTS: Product[] = [
  {
    id: "prod-001",
    slug: "obsidian-leather-bomber",
    name: "Obsidian Leather Bomber",
    shortDescription: "Premium faux-leather bomber with satin lining",
    description:
      "The cornerstone of the NOIR LABEL collection. Crafted from premium vegan leather with a satin-smooth interior, this bomber redefines after-dark dressing. Oversized silhouette, ribbed cuffs, and a clean zip closure.",
    price: 420,
    compareAtPrice: 520,
    images: [
      { id: "img-001-1", url: "/pr/1.avif", alt: "Obsidian Leather Bomber - Front", isPrimary: true },
      { id: "img-001-2", url: "/pr/11.avif", alt: "Obsidian Leather Bomber - Detail", isPrimary: false },
    ],
    variants: [
      { id: "v-001-xs", size: "XS", sku: "OLB-XS", stock: 3 },
      { id: "v-001-s", size: "S", sku: "OLB-S", stock: 8 },
      { id: "v-001-m", size: "M", sku: "OLB-M", stock: 12 },
      { id: "v-001-l", size: "L", sku: "OLB-L", stock: 6 },
      { id: "v-001-xl", size: "XL", sku: "OLB-XL", stock: 2 },
      { id: "v-001-xxl", size: "XXL", sku: "OLB-XXL", stock: 0 },
    ],
    category: "outerwear",
    collection: "shadow-season",
    tags: ["bomber", "leather", "outerwear", "hero", "bestseller"],
    material: "92% Vegan Leather, 8% Polyester — Satin Lining",
    careInstructions: ["Wipe clean with damp cloth", "Do not machine wash", "Store on padded hanger", "Avoid prolonged sunlight"],
    isNew: false,
    isBestSeller: true,
    isLimitedEdition: false,
    stockCount: 31,
    rating: 4.9,
    reviewCount: 127,
    weight: "680g",
    origin: "Manufactured in Turkey",
    sku: "OLB-2026",
    createdAt: "2026-01-10",
  },
  {
    id: "prod-002",
    slug: "void-oversized-hoodie",
    name: "Void Oversized Hoodie",
    shortDescription: "500gsm heavyweight cotton — built to last decades",
    description:
      "The Void Hoodie is engineered for permanence. 500gsm premium cotton fleece, double-lined hood, kangaroo pocket with a hidden zip compartment. Washed, garment-dyed, and pre-shrunk for zero-compromise fit.",
    price: 180,
    images: [
      { id: "img-002-1", url: "/pr/2.avif", alt: "Void Oversized Hoodie - Front", isPrimary: true },
      { id: "img-002-2", url: "/pr/22.avif", alt: "Void Oversized Hoodie - Detail", isPrimary: false },
    ],
    variants: [
      { id: "v-002-xs", size: "XS", sku: "VOH-XS", stock: 5 },
      { id: "v-002-s", size: "S", sku: "VOH-S", stock: 14 },
      { id: "v-002-m", size: "M", sku: "VOH-M", stock: 20 },
      { id: "v-002-l", size: "L", sku: "VOH-L", stock: 18 },
      { id: "v-002-xl", size: "XL", sku: "VOH-XL", stock: 10 },
      { id: "v-002-xxl", size: "XXL", sku: "VOH-XXL", stock: 4 },
    ],
    category: "tops",
    collection: "essentials",
    tags: ["hoodie", "essentials", "heavyweight", "bestseller"],
    material: "500gsm 100% Ringspun Cotton",
    careInstructions: ["Machine wash cold", "Tumble dry low", "Do not bleach", "Iron inside out on low heat"],
    isNew: true,
    isBestSeller: true,
    stockCount: 71,
    rating: 4.8,
    reviewCount: 89,
    weight: "890g",
    origin: "Manufactured in Portugal",
    sku: "VOH-2026",
    createdAt: "2026-02-15",
  },
  {
    id: "prod-003",
    slug: "phantom-cargo-pants",
    name: "Phantom Cargo Pants",
    shortDescription: "Technical ripstop with articulated knee panels",
    description:
      "Technical streetwear meets utilitarian precision. Ripstop nylon with articulated knee panels, six cargo pockets, and adjustable ankle cuffs. Designed for the city that never stops.",
    price: 220,
    images: [
      { id: "img-003-1", url: "/pr/3.avif", alt: "Phantom Cargo Pants - Front", isPrimary: true },
      { id: "img-003-2", url: "/pr/33.avif", alt: "Phantom Cargo Pants - Detail", isPrimary: false },
    ],
    variants: [
      { id: "v-003-28", size: "28", sku: "PCP-28", stock: 4 },
      { id: "v-003-30", size: "30", sku: "PCP-30", stock: 9 },
      { id: "v-003-32", size: "32", sku: "PCP-32", stock: 11 },
      { id: "v-003-34", size: "34", sku: "PCP-34", stock: 7 },
      { id: "v-003-36", size: "36", sku: "PCP-36", stock: 2 },
    ],
    category: "bottoms",
    collection: "shadow-season",
    tags: ["cargo", "technical", "pants", "utility"],
    material: "100% Ripstop Nylon — DWR Coated",
    careInstructions: ["Machine wash cold, gentle", "Hang dry", "Do not dry clean", "Do not iron"],
    isNew: true,
    stockCount: 33,
    rating: 4.7,
    reviewCount: 54,
    weight: "420g",
    origin: "Manufactured in China",
    sku: "PCP-2026",
    createdAt: "2026-03-01",
  },
  {
    id: "prod-004",
    slug: "eclipse-longline-coat",
    name: "Eclipse Longline Coat",
    shortDescription: "Floor-length tailored wool blend — the statement piece",
    description:
      "The Eclipse coat commands any room. Floor-length silhouette in a heavyweight wool-cashmere blend, with concealed button closure, deep side slits, and a dramatic draped collar. The ultimate expression of NOIR LABEL.",
    price: 680,
    compareAtPrice: 850,
    images: [
      { id: "img-004-1", url: "/pr/4.avif", alt: "Eclipse Longline Coat - Front", isPrimary: true },
      { id: "img-004-2", url: "/pr/44.avif", alt: "Eclipse Longline Coat - Detail", isPrimary: false },
    ],
    variants: [
      { id: "v-004-xs", size: "XS", sku: "ELC-XS", stock: 1 },
      { id: "v-004-s", size: "S", sku: "ELC-S", stock: 3 },
      { id: "v-004-m", size: "M", sku: "ELC-M", stock: 4 },
      { id: "v-004-l", size: "L", sku: "ELC-L", stock: 2 },
      { id: "v-004-xl", size: "XL", sku: "ELC-XL", stock: 0 },
    ],
    category: "outerwear",
    collection: "eclipse",
    tags: ["coat", "longline", "wool", "luxury", "limited"],
    material: "70% Wool, 20% Cashmere, 10% Polyamide",
    careInstructions: ["Dry clean only", "Store in dust bag", "Steam, do not iron", "Keep away from moisture"],
    isLimitedEdition: true,
    stockCount: 10,
    rating: 5.0,
    reviewCount: 31,
    weight: "1.2kg",
    origin: "Made in Italy",
    sku: "ELC-2026",
    createdAt: "2026-01-01",
  },
  {
    id: "prod-005",
    slug: "shadow-crewneck",
    name: "Shadow Crewneck",
    shortDescription: "Garment-dyed 400gsm fleece with tonal embroidery",
    description:
      "The Shadow Crewneck is a study in restraint. 400gsm fleece, garment-dyed to achieve a lived-in depth of colour. Tonal NOIR LABEL embroidery at the left chest. No noise. All substance.",
    price: 145,
    images: [
      { id: "img-005-1", url: "/pr/5.avif", alt: "Shadow Crewneck - Front", isPrimary: true },
      { id: "img-005-2", url: "/pr/55.avif", alt: "Shadow Crewneck - Detail", isPrimary: false },
    ],
    variants: [
      { id: "v-005-xs", size: "XS", sku: "SCR-XS", stock: 8 },
      { id: "v-005-s", size: "S", sku: "SCR-S", stock: 16 },
      { id: "v-005-m", size: "M", sku: "SCR-M", stock: 22 },
      { id: "v-005-l", size: "L", sku: "SCR-L", stock: 19 },
      { id: "v-005-xl", size: "XL", sku: "SCR-XL", stock: 11 },
      { id: "v-005-xxl", size: "XXL", sku: "SCR-XXL", stock: 5 },
    ],
    category: "tops",
    collection: "essentials",
    tags: ["crewneck", "essentials", "fleece", "tonal"],
    material: "400gsm 100% Garment-Dyed Cotton",
    careInstructions: ["Machine wash cold", "Tumble dry low", "Turn inside out to wash"],
    isNew: false,
    isBestSeller: false,
    stockCount: 81,
    rating: 4.6,
    reviewCount: 72,
    sku: "SCR-2026",
    createdAt: "2026-01-15",
  },
  {
    id: "prod-006",
    slug: "void-track-jacket",
    name: "Void Track Jacket",
    shortDescription: "Slim-cut nylon track jacket with tonal paneling",
    description:
      "Street-to-studio in one motion. The Void Track Jacket blends athletic lineage with NOIR LABEL's signature minimal aesthetic. Slim cut, tonal paneling, and a hidden chest zip pocket.",
    price: 195,
    images: [
      { id: "img-006-1", url: "/pr/6.avif", alt: "Void Track Jacket - Front", isPrimary: true },
      { id: "img-006-2", url: "/pr/66.avif", alt: "Void Track Jacket - Detail", isPrimary: false },
    ],
    variants: [
      { id: "v-006-xs", size: "XS", sku: "VTJ-XS", stock: 6 },
      { id: "v-006-s", size: "S", sku: "VTJ-S", stock: 10 },
      { id: "v-006-m", size: "M", sku: "VTJ-M", stock: 15 },
      { id: "v-006-l", size: "L", sku: "VTJ-L", stock: 8 },
      { id: "v-006-xl", size: "XL", sku: "VTJ-XL", stock: 3 },
    ],
    category: "outerwear",
    collection: "shadow-season",
    tags: ["track jacket", "athletic", "nylon", "slim"],
    material: "100% Recycled Nylon",
    careInstructions: ["Machine wash cold", "Hang dry", "Do not tumble dry"],
    isNew: true,
    stockCount: 42,
    rating: 4.5,
    reviewCount: 38,
    sku: "VTJ-2026",
    createdAt: "2026-03-10",
  },
  {
    id: "prod-007",
    slug: "noir-graphic-tee",
    name: "NOIR Heavyweight Tee",
    shortDescription: "280gsm cotton with screen-printed editorial artwork",
    description:
      "The foundation. 280gsm ringspun cotton, boxy fit, with a custom screen-printed editorial graphic designed exclusively for the SS26 collection. Washed for a premium hand feel.",
    price: 85,
    images: [
      { id: "img-007-1", url: "/pr/7.avif", alt: "NOIR Heavyweight Tee - Front", isPrimary: true },
      { id: "img-007-2", url: "/pr/77.avif", alt: "NOIR Heavyweight Tee - Back", isPrimary: false },
    ],
    variants: [
      { id: "v-007-xs", size: "XS", sku: "NHT-XS", stock: 20 },
      { id: "v-007-s", size: "S", sku: "NHT-S", stock: 30 },
      { id: "v-007-m", size: "M", sku: "NHT-M", stock: 35 },
      { id: "v-007-l", size: "L", sku: "NHT-L", stock: 28 },
      { id: "v-007-xl", size: "XL", sku: "NHT-XL", stock: 15 },
      { id: "v-007-xxl", size: "XXL", sku: "NHT-XXL", stock: 8 },
    ],
    category: "tops",
    collection: "essentials",
    tags: ["t-shirt", "graphic", "essentials", "heavyweight"],
    material: "280gsm 100% Ringspun Cotton",
    careInstructions: ["Machine wash cold", "Tumble dry low", "Do not bleach"],
    isNew: true,
    isBestSeller: false,
    stockCount: 136,
    rating: 4.7,
    reviewCount: 201,
    sku: "NHT-2026",
    createdAt: "2026-02-01",
  },
  {
    id: "prod-008",
    slug: "abyss-wide-leg-trousers",
    name: "Abyss Wide-Leg Trousers",
    shortDescription: "Tailored wool-blend wide-leg for elevated streetwear",
    description:
      "The Abyss trousers bridge the gap between tailoring and streetwear. Wool-blend fabric with a high-rise, wide-leg silhouette. Pressed crease, side and back welt pockets.",
    price: 265,
    images: [
      { id: "img-008-1", url: "/pr/8.avif", alt: "Abyss Wide-Leg Trousers - Front", isPrimary: true },
      { id: "img-008-2", url: "/pr/88.avif", alt: "Abyss Wide-Leg Trousers - Detail", isPrimary: false },
    ],
    variants: [
      { id: "v-008-28", size: "28", sku: "AWT-28", stock: 5 },
      { id: "v-008-30", size: "30", sku: "AWT-30", stock: 8 },
      { id: "v-008-32", size: "32", sku: "AWT-32", stock: 10 },
      { id: "v-008-34", size: "34", sku: "AWT-34", stock: 6 },
      { id: "v-008-36", size: "36", sku: "AWT-36", stock: 2 },
    ],
    category: "bottoms",
    collection: "eclipse",
    tags: ["trousers", "wide-leg", "tailored", "wool"],
    material: "65% Wool, 35% Polyester",
    careInstructions: ["Dry clean preferred", "Hand wash cold if necessary", "Do not tumble dry", "Steam press only"],
    isNew: false,
    stockCount: 31,
    rating: 4.8,
    reviewCount: 44,
    weight: "480g",
    sku: "AWT-2026",
    createdAt: "2026-01-20",
  },
];

export const COLLECTIONS: Collection[] = [
  {
    id: "col-001",
    slug: "shadow-season",
    name: "Shadow Season",
    description: "The darkness between the seasons. Technical outerwear and utility pieces for the unlit hours.",
    image: "/pr/1.avif",
    productCount: 3,
  },
  {
    id: "col-002",
    slug: "essentials",
    name: "Essentials",
    description: "The wardrobe backbone. Heavyweight basics built to outlast every trend.",
    image: "/pr/2.avif",
    productCount: 3,
  },
  {
    id: "col-003",
    slug: "eclipse",
    name: "Eclipse",
    description: "Limited Edition. Luxury fabrications for the few who understand silence.",
    image: "/pr/4.avif",
    productCount: 2,
  },
];

// Get products by collection
export const getProductsByCollection = (slug: string): Product[] =>
  PRODUCTS.filter((p) => p.collection === slug);

// Get product by slug
export const getProductBySlug = (slug: string): Product | undefined =>
  PRODUCTS.find((p) => p.slug === slug);

// Get new arrivals
export const getNewArrivals = (): Product[] =>
  PRODUCTS.filter((p) => p.isNew).slice(0, 6);

// Get best sellers
export const getBestSellers = (): Product[] =>
  PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);

// Get related products (same category, different product)
export const getRelatedProducts = (productId: string, category: string): Product[] =>
  PRODUCTS.filter((p) => p.id !== productId && p.category === category).slice(0, 4);

// Format price
export const formatPrice = (price: number, currency: string = "USD"): string =>
  new Intl.NumberFormat("en-US", { style: "currency", currency }).format(price);
