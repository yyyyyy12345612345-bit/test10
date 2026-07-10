"use client";

import Link from "next/link";
import {
  Package, Heart, MapPin, CreditCard, Star,
  Gift, BarChart2, LogOut, ChevronRight, Crown
} from "lucide-react";

const MOCK_USER = {
  name: "Ahmed Hassan",
  email: "ahmed@example.com",
  tier: "GOLD",
  points: 2480,
  totalOrders: 7,
  totalSpend: 1840,
};

const TIER_COLORS: Record<string, string> = {
  BRONZE: "text-amber-700",
  SILVER: "text-gray-400",
  GOLD: "text-gold",
  PLATINUM: "text-blue-300",
};

const QUICK_LINKS = [
  { icon: Package, label: "My Orders", href: "/account/orders", count: "7" },
  { icon: Heart, label: "Wishlist", href: "/account/wishlist", count: "4" },
  { icon: MapPin, label: "Addresses", href: "/account/addresses" },
  { icon: CreditCard, label: "Payment Methods", href: "/account/payment" },
  { icon: Star, label: "Reviews", href: "/account/reviews" },
  { icon: Gift, label: "Referrals", href: "/account/referrals" },
];

const RECENT_ORDERS = [
  { id: "NL-K3X9A-2B4F", date: "Jul 5, 2026", status: "Shipped", total: 420, items: 1 },
  { id: "NL-M2P7B-5G1K", date: "Jun 18, 2026", status: "Delivered", total: 265, items: 2 },
  { id: "NL-H9Q4C-8L3M", date: "May 30, 2026", status: "Delivered", total: 180, items: 1 },
];

const STATUS_STYLES: Record<string, string> = {
  Pending: "text-yellow-400 bg-yellow-400/10",
  Confirmed: "text-blue-400 bg-blue-400/10",
  Processing: "text-blue-400 bg-blue-400/10",
  Shipped: "text-gold bg-gold/10",
  Delivered: "text-success bg-success/10",
  Cancelled: "text-danger bg-danger/10",
  Returned: "text-silver bg-silver/10",
};

export default function AccountPage() {
  const tierProgress = (MOCK_USER.points / 5000) * 100;
  const nextTierPoints = MOCK_USER.tier === "GOLD" ? 5000 - MOCK_USER.points : 0;

  return (
    <div
      className="min-h-screen bg-noir"
      style={{ paddingTop: "calc(var(--nav-height) + var(--bar-height))" }}
    >
      {/* Header */}
      <div className="bg-smoke border-b border-fog/20 py-10">
        <div className="container-site">
          <div className="flex items-center justify-between">
            <div>
              <p className="label-xs text-gold mb-2">MY ACCOUNT</p>
              <h1 className="heading-xl text-snow">
                Welcome, {MOCK_USER.name.split(" ")[0]}
              </h1>
            </div>
            <div className="hidden md:flex items-center gap-3 glass border border-fog/30 px-5 py-3 rounded-sm">
              <Crown className={`w-5 h-5 ${TIER_COLORS[MOCK_USER.tier]}`} />
              <div>
                <p className={`label-xs ${TIER_COLORS[MOCK_USER.tier]}`}>
                  {MOCK_USER.tier} MEMBER
                </p>
                <p className="text-xs text-silver">{MOCK_USER.points.toLocaleString()} pts</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-site py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Orders", value: MOCK_USER.totalOrders },
            { label: "Total Spend", value: `$${MOCK_USER.totalSpend.toLocaleString()}` },
            { label: "Loyalty Points", value: MOCK_USER.points.toLocaleString() },
            { label: "Member Tier", value: MOCK_USER.tier },
          ].map((stat) => (
            <div key={stat.label} className="glass border border-fog/20 p-5 rounded-sm">
              <p className="text-2xl md:text-3xl font-heading text-gold mb-1">{stat.value}</p>
              <p className="label-xs text-silver">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Loyalty bar */}
        <div className="glass border border-fog/20 p-6 rounded-sm mb-10">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="label-xs text-gold mb-1">LOYALTY PROGRESS</p>
              <p className="text-silver text-sm">
                {nextTierPoints > 0
                  ? `${nextTierPoints} points to Platinum`
                  : "You've reached Platinum! 🎉"}
              </p>
            </div>
            <span className={`label-xs ${TIER_COLORS[MOCK_USER.tier]}`}>
              {MOCK_USER.tier}
            </span>
          </div>
          <div className="h-1.5 bg-fog/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-gold to-gold-light rounded-full transition-all duration-1000"
              style={{ width: `${Math.min(tierProgress, 100)}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-fog">
            <span>Bronze</span><span>Silver</span><span>Gold</span><span>Platinum</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick links */}
          <div className="lg:col-span-1">
            <h2 className="label-sm text-snow mb-4">ACCOUNT MENU</h2>
            <div className="space-y-2">
              {QUICK_LINKS.map(({ icon: Icon, label, href, count }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center justify-between p-4 bg-smoke border border-fog/20 hover:border-gold/30 transition-all duration-300 group rounded-sm"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-silver group-hover:text-gold transition-colors" />
                    <span className="text-sm text-pearl group-hover:text-snow transition-colors">{label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {count && (
                      <span className="text-xs text-silver border border-fog/40 px-2 py-0.5 rounded-full">
                        {count}
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-fog group-hover:text-gold transition-colors" />
                  </div>
                </Link>
              ))}
              <button className="flex items-center gap-3 p-4 w-full text-left bg-smoke border border-fog/20 hover:border-danger/30 transition-all duration-300 group rounded-sm">
                <LogOut className="w-4 h-4 text-silver group-hover:text-danger transition-colors" />
                <span className="text-sm text-pearl group-hover:text-danger transition-colors">Sign Out</span>
              </button>
            </div>
          </div>

          {/* Recent orders */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="label-sm text-snow">RECENT ORDERS</h2>
              <Link href="/account/orders" className="text-xs text-silver hover:text-gold transition-colors">
                View all →
              </Link>
            </div>
            <div className="space-y-3">
              {RECENT_ORDERS.map((order) => (
                <Link
                  key={order.id}
                  href={`/account/orders/${order.id}`}
                  className="flex items-center justify-between p-5 bg-smoke border border-fog/20 hover:border-gold/30 transition-all duration-300 rounded-sm group"
                >
                  <div>
                    <p className="text-sm text-snow font-medium mb-1">{order.id}</p>
                    <p className="text-xs text-silver">{order.date} · {order.items} item{order.items > 1 ? "s" : ""}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_STYLES[order.status] ?? "text-silver bg-fog/20"}`}
                    >
                      {order.status}
                    </span>
                    <span className="text-sm font-semibold text-gold">${order.total}</span>
                    <ChevronRight className="w-4 h-4 text-fog group-hover:text-gold transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
