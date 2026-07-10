"use client";

const ITEMS = [
  "SHADOW SEASON",
  "NEW DROP FRIDAY",
  "LIMITED EDITION",
  "FREE WORLDWIDE SHIPPING",
  "PREMIUM STREETWEAR",
  "SS26 COLLECTION",
];

export function InfiniteMarquee() {
  const track = [...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div className="py-6 border-y border-fog/30 overflow-hidden bg-ash/30">
      {/* Row 1 — left to right */}
      <div className="flex mb-3 overflow-hidden">
        <div className="marquee-track">
          {track.map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-6 px-6 label-sm text-silver whitespace-nowrap"
            >
              {item}
              <span className="text-gold text-lg">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Row 2 — right to left */}
      <div className="flex overflow-hidden">
        <div className="marquee-track marquee-track-reverse">
          {track.map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-6 px-6 label-sm text-fog whitespace-nowrap"
            >
              <span className="text-gold/30 text-lg">✦</span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
