import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div
      className="min-h-screen bg-noir flex flex-col items-center justify-center text-center px-4"
      style={{ paddingTop: "calc(var(--nav-height) + var(--bar-height))" }}
    >
      <p className="label-xs text-gold mb-4">404 — NOT FOUND</p>
      <h1 className="heading-display text-snow mb-6">
        Into the<br />
        <span className="italic text-stroke-gold">Void</span>
      </h1>
      <p className="text-pearl/50 text-sm mb-10 max-w-sm">
        This page doesn&apos;t exist — but our collection does.
      </p>
      <Link href="/" className="btn-primary">
        <span>Back to Home</span>
        <ArrowRight className="w-4 h-4 relative z-10" />
      </Link>
    </div>
  );
}
