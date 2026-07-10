import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About — NOIR LABEL",
  description: "The story behind NOIR LABEL. Premium urban streetwear born from a belief that craft and darkness are not opposites.",
};

export default function AboutPage() {
  return (
    <div
      className="min-h-screen bg-noir"
      style={{ paddingTop: "calc(var(--nav-height) + var(--bar-height))" }}
    >
      {/* Hero */}
      <div className="relative h-[60vh] overflow-hidden">
        <Image
          src="/home/WhatsApp Image 2026-03-31 at 16.44.39(1).jpeg"
          alt="NOIR LABEL"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-noir/40 to-noir" />
        <div className="absolute bottom-0 left-0 right-0 container-site pb-16">
          <p className="label-xs text-gold mb-3">OUR STORY</p>
          <h1 className="heading-display text-snow">
            Born in<br />
            <span className="italic">Darkness</span>
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="container-site py-20 max-w-3xl">
        <div className="space-y-8 text-pearl/70 leading-relaxed">
          <p className="text-lg font-light">
            NOIR LABEL was founded in 2022 with a single conviction: that fashion could be
            uncompromising without being inaccessible. That a garment could carry real weight
            — the weight of craft, of intention, of permanence.
          </p>
          <p>
            We build every piece to last. Not because we believe in slow fashion as a trend,
            but because we believe in objects worth keeping. Our leather bombers are designed
            to age beautifully. Our heavyweight hoodies are engineered to outlive fashion cycles.
          </p>
          <p>
            We produce in limited quantities — not as a marketing strategy, but because quality
            has no shortcut. When a drop sells out, it stays sold out. We do not restock what
            should not be diluted.
          </p>
          <p>
            NOIR LABEL is for those who understand silence. Who choose restraint over noise.
            Who dress for themselves, not for the feed.
          </p>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row gap-4">
          <Link href="/shop" className="btn-primary">
            <span>Shop Now</span>
            <ArrowRight className="w-4 h-4 relative z-10" />
          </Link>
          <Link href="/lookbook" className="btn-outline">
            View Lookbook
          </Link>
        </div>
      </div>
    </div>
  );
}
