"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function BrandStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current) return;

      // Pinned horizontal reveal
      gsap.fromTo(
        ".story-line",
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          stagger: 0.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        }
      );

      // Counter animation
      const counters = sectionRef.current.querySelectorAll(".counter-num");
      counters.forEach((counter) => {
        const target = parseFloat(counter.getAttribute("data-target") || "0");
        gsap.fromTo(
          counter,
          { textContent: "0" },
          {
            textContent: target,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: target % 1 === 0 ? 1 : 0.1 },
            scrollTrigger: {
              trigger: counter,
              start: "top 80%",
              once: true,
            },
            onUpdate() {
              const el = counter as HTMLElement;
              const val = parseFloat(el.textContent || "0");
              if (target >= 1000) {
                el.textContent = Math.round(val).toLocaleString();
              } else {
                el.textContent = val.toFixed(target % 1 !== 0 ? 1 : 0);
              }
            },
          }
        );
      });
    };
    initGSAP();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-noir overflow-hidden">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Image */}
          <div className="relative group">
            <div className="relative overflow-hidden aspect-[3/4] max-w-md">
              <Image
                src="/home/WhatsApp Image 2026-03-31 at 16.44.39(1).jpeg"
                alt="NOIR LABEL Brand Story"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir/40 to-transparent" />
            </div>
            {/* Floating stat card */}
            <div className="absolute -right-6 bottom-12 glass-dark p-6 rounded-sm">
              <p className="font-heading text-4xl text-gold">
                <span className="counter-num" data-target="4.9">0</span>
                <span className="text-2xl">★</span>
              </p>
              <p className="label-xs text-silver mt-1">Average Rating</p>
              <p className="text-xs text-fog mt-0.5">From 500+ reviews</p>
            </div>
          </div>

          {/* Right: Story */}
          <div>
            <p className="story-line label-xs text-gold mb-6">OUR STORY</p>

            <h2 className="story-line heading-xl text-snow mb-8">
              Built in<br />
              <span className="italic text-stroke-gold">Darkness</span>,<br />
              Made for Light
            </h2>

            <div className="space-y-4 mb-10">
              <p className="story-line text-pearl/70 leading-relaxed">
                NOIR LABEL was born in 2022 from a simple conviction: that
                streetwear could be both uncompromising and refined. That clothing
                could carry weight without explanation.
              </p>
              <p className="story-line text-pearl/70 leading-relaxed">
                Every piece is designed with intention. We source premium
                materials, work with skilled craftspeople, and produce in limited
                quantities — because quality has no shortcut.
              </p>
            </div>

            {/* Stats grid */}
            <div className="story-line grid grid-cols-3 gap-6 mb-10 pt-8 border-t border-fog/30">
              {[
                { value: 2022, label: "Founded", suffix: "" },
                { value: 30000, label: "Customers", suffix: "+" },
                { value: 8, label: "Collections", suffix: "" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-heading text-3xl md:text-4xl text-gold">
                    <span className="counter-num" data-target={stat.value}>0</span>
                    {stat.suffix}
                  </p>
                  <p className="label-xs text-silver mt-2">{stat.label}</p>
                </div>
              ))}
            </div>

            <Link href="/about" className="story-line btn-outline">
              Read Our Story <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
