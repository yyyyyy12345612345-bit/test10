import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { InfiniteMarquee } from "@/components/home/InfiniteMarquee";
import { CollectionsGrid } from "@/components/home/CollectionsGrid";
import { NewArrivals } from "@/components/home/NewArrivals";
import { BrandStory } from "@/components/home/BrandStory";
import { BestSellers } from "@/components/home/BestSellers";
import { DropCountdown } from "@/components/home/DropCountdown";
import { Newsletter } from "@/components/home/Newsletter";

export const metadata: Metadata = {
  title: "NOIR LABEL — Premium Urban Streetwear",
  description:
    "NOIR LABEL — Where darkness meets craft. Discover premium leather bombers, heavyweight hoodies, and tailored streetwear built to last.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <InfiniteMarquee />
      <CollectionsGrid />
      <NewArrivals />
      <BrandStory />
      <BestSellers />
      <DropCountdown />
      <Newsletter />
    </>
  );
}
