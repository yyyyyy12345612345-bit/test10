"use client";

import { useRef } from "react";

const MESSAGES = [
  "FREE WORLDWIDE SHIPPING ON ORDERS OVER $150",
  "NEW DROP — SHADOW SEASON COLLECTION",
  "LIMITED EDITION ECLIPSE COAT — ONLY 10 MADE",
  "USE CODE NOIR10 FOR 10% OFF YOUR FIRST ORDER",
  "FREE RETURNS WITHIN 30 DAYS",
];

export function AnnouncementBar() {
  const track1 = [...MESSAGES, ...MESSAGES];

  return (
    <div
      className="announcement-bar overflow-hidden"
      style={{ height: "var(--bar-height)" }}
      aria-label="Announcements"
    >
      <div className="flex" style={{ animation: "marquee 35s linear infinite" }}>
        {track1.map((msg, i) => (
          <span
            key={i}
            className="flex items-center gap-6 px-6 whitespace-nowrap label-sm text-noir"
          >
            {msg}
            <span className="text-noir/40">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
