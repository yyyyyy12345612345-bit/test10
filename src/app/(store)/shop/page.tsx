import type { Metadata } from "next";
import { ShopClient } from "./ShopClient";

export const metadata: Metadata = {
  title: "Shop — Premium Streetwear",
  description: "Browse the full NOIR LABEL collection. Premium leather bombers, heavyweight hoodies, technical cargo pants, and tailored essentials.",
};

export default function ShopPage() {
  return <ShopClient />;
}
