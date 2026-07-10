"use client";

import { useState } from "react";
import { Mail, ArrowRight, Check } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    // Mock API call
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("success");
  };

  return (
    <section className="py-24 bg-noir relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="container-site relative z-10">
        <div className="glass rounded-sm p-10 md:p-16 text-center max-w-2xl mx-auto">
          <div className="w-12 h-12 mx-auto mb-6 flex items-center justify-center border border-gold/30 rounded-full">
            <Mail className="w-5 h-5 text-gold" />
          </div>

          <p className="label-xs text-gold mb-4">JOIN THE INNER CIRCLE</p>
          <h2 className="heading-lg text-snow mb-4">
            Early Access.<br />
            <span className="italic">No Noise.</span>
          </h2>
          <p className="text-pearl/60 text-sm mb-8 leading-relaxed">
            Be first to know about new drops, exclusive collections, and
            member-only access. Plus 10% off your first order.
          </p>

          {status === "success" ? (
            <div className="flex items-center justify-center gap-3 text-gold py-4">
              <Check className="w-5 h-5" />
              <p className="font-medium">Welcome to the inner circle. Check your inbox.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="input flex-1"
                required
                disabled={status === "loading"}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-primary whitespace-nowrap disabled:opacity-60"
              >
                {status === "loading" ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span>Subscribing...</span>
                  </span>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <ArrowRight className="w-4 h-4 relative z-10" />
                  </>
                )}
              </button>
            </form>
          )}

          <p className="text-fog text-xs mt-4">
            No spam. Unsubscribe any time. Read our{" "}
            <a href="/privacy" className="text-silver hover:text-gold transition-colors">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
