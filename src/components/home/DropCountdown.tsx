"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";

function getNextFriday(): Date {
  const now = new Date();
  const day = now.getDay(); // 0=Sun, 5=Fri
  const daysUntilFriday = (5 - day + 7) % 7 || 7;
  const next = new Date(now);
  next.setDate(now.getDate() + daysUntilFriday);
  next.setHours(12, 0, 0, 0); // Drop at noon
  return next;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function DropCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const target = getNextFriday();

    const update = () => {
      const now = Date.now();
      const diff = target.getTime() - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins: Math.floor((diff % 3600000) / 60000),
        secs: Math.floor((diff % 60000) / 1000),
      });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  const units = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINS", value: timeLeft.mins },
    { label: "SECS", value: timeLeft.secs },
  ];

  return (
    <section className="py-24 bg-smoke border-y border-fog/20">
      <div className="container-site text-center">
        <p className="label-xs text-gold mb-4">NEXT DROP</p>
        <h2 className="heading-xl text-snow mb-4">
          Shadow Season<br />
          <span className="italic">Vol. II</span>
        </h2>
        <p className="text-pearl/60 text-sm mb-12 max-w-sm mx-auto">
          Friday. Noon. Limited quantities. No restocks.
        </p>

        {/* Countdown */}
        <div className="flex items-center justify-center gap-4 md:gap-8 mb-12">
          {units.map((unit, i) => (
            <div key={unit.label} className="flex items-start">
              <div className="text-center">
                <div className="glass border border-fog/30 px-4 md:px-8 py-4 md:py-6 min-w-[72px] md:min-w-[100px]">
                  <span className="font-heading text-4xl md:text-6xl text-gold tabular-nums">
                    {pad(unit.value)}
                  </span>
                </div>
                <p className="label-xs text-silver mt-2">{unit.label}</p>
              </div>
              {i < units.length - 1 && (
                <span className="font-heading text-4xl md:text-6xl text-fog/40 mx-1 md:mx-2 mt-4 md:mt-6">:</span>
              )}
            </div>
          ))}
        </div>

        {/* Waitlist form */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="flex-1 relative">
              <Bell className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-silver" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email for early access"
                className="input pl-10"
                required
              />
            </div>
            <button type="submit" className="btn-primary whitespace-nowrap">
              <span>Notify Me</span>
            </button>
          </form>
        ) : (
          <div className="glass-gold rounded-sm px-8 py-4 inline-flex items-center gap-3 max-w-md mx-auto">
            <span className="text-gold">✓</span>
            <p className="text-gold font-medium">You&apos;re on the list! We&apos;ll email you before the drop.</p>
          </div>
        )}
      </div>
    </section>
  );
}
