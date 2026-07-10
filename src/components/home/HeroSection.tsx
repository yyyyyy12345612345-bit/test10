"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

export function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP animations — loaded dynamically for performance
    let ctx: any;
    const initGSAP = async () => {
      const { gsap } = await import("gsap");

      ctx = gsap.context(() => {
        // Initial state
        gsap.set(".hero-char", { yPercent: 110, opacity: 0 });
        gsap.set(".hero-content-fade", { opacity: 0, y: 30 });
        gsap.set(imageRef.current, { scale: 1.08 });

        // Timeline
        const tl = gsap.timeline({ delay: 0.3 });

        tl.to(imageRef.current, {
          scale: 1,
          duration: 1.8,
          ease: "expo.out",
        })
          .to(
            ".hero-char",
            {
              yPercent: 0,
              opacity: 1,
              duration: 1.0,
              stagger: 0.04,
              ease: "expo.out",
            },
            "-=1.2"
          )
          .to(
            ".hero-content-fade",
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: "power3.out",
            },
            "-=0.5"
          );
      });
    };

    initGSAP();
    return () => ctx?.revert();
  }, []);

  const headline = "THE NEW DEFINITION OF DARK".split(" ");

  return (
    <section
      className="relative h-screen min-h-[600px] flex items-center overflow-hidden"
      style={{ paddingTop: "calc(var(--nav-height) + var(--bar-height))" }}
    >
      {/* Background Image */}
      <div ref={imageRef} className="absolute inset-0 gpu">
        <Image
          src="/home/WhatsApp Image 2026-03-31 at 16.44.39(1).jpeg"
          alt="NOIR LABEL — Shadow Season Campaign"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
          unoptimized
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-noir/90 via-noir/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-transparent to-transparent" />
      </div>

      {/* Scroll progress indicator */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-3 z-10">
        <div className="w-px h-16 bg-fog relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full bg-gold"
            style={{ height: "40%", animation: "float 3s ease-in-out infinite" }}
          />
        </div>
        <span className="label-xs text-silver -rotate-90 whitespace-nowrap mt-4">SCROLL</span>
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 container-site">
        <div className="max-w-4xl">
          {/* Label */}
          <div className="hero-content-fade flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-gold" />
            <span className="label-xs text-gold">SS26 COLLECTION</span>
          </div>

          {/* Headline — split chars */}
          <h1 ref={headlineRef} className="heading-display text-snow mb-8 overflow-visible">
            {headline.map((word, wi) => (
              <span key={wi} className="inline-block mr-[0.15em] overflow-hidden">
                {word.split("").map((char, ci) => (
                  <span key={ci} className="hero-char inline-block">
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          {/* Sub */}
          <p className="hero-content-fade text-lg text-pearl/80 max-w-md mb-10 leading-relaxed font-light">
            Precision-crafted outerwear and essentials for those who refuse compromise. Limited quantities. Permanent impact.
          </p>

          {/* CTAs */}
          <div className="hero-content-fade flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link href="/shop" className="btn-primary">
              <span>Shop Collection</span>
              <ArrowRight className="w-4 h-4 relative z-10" />
            </Link>
            <Link href="/lookbook" className="btn-ghost">
              <Play className="w-4 h-4" />
              Watch Lookbook
            </Link>
          </div>

          {/* Stats */}
          <div className="hero-content-fade flex items-center gap-8 mt-12 pt-8 border-t border-fog/30">
            {[
              { value: "8", label: "Collections" },
              { value: "500+", label: "Products" },
              { value: "30K+", label: "Customers" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-heading text-3xl text-gold">{stat.value}</p>
                <p className="label-xs text-silver mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient blend */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-noir to-transparent pointer-events-none" />
    </section>
  );
}
