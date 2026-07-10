import type { Metadata } from "next";
import Link from "next/link";
import { Package, ChevronRight, Truck, CheckCircle, Clock, XCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "My Orders — NOIR LABEL",
  robots: { index: false, follow: false },
};

const MOCK_ORDERS = [
  {
    id: "NL-K3X9A-2B4F",
    date: "Jul 5, 2026",
    status: "Shipped",
    total: 420,
    items: [
      { name: "Obsidian Leather Bomber", size: "M", qty: 1, price: 420, image: "/pr/1.avif" },
    ],
    tracking: "1Z999AA10123456784",
  },
  {
    id: "NL-M2P7B-5G1K",
    date: "Jun 18, 2026",
    status: "Delivered",
    total: 445,
    items: [
      { name: "Void Oversized Hoodie", size: "L", qty: 1, price: 180, image: "/pr/2.avif" },
      { name: "Phantom Cargo Pants", size: "32", qty: 1, price: 265, image: "/pr/3.avif" },
    ],
    tracking: "1Z999BB10123456785",
  },
  {
    id: "NL-H9Q4C-8L3M",
    date: "May 30, 2026",
    status: "Delivered",
    total: 180,
    items: [
      { name: "Void Oversized Hoodie", size: "M", qty: 1, price: 180, image: "/pr/2.avif" },
    ],
    tracking: "1Z999CC10123456786",
  },
];

const STATUS_CONFIG: Record<string, { icon: typeof Package; color: string; label: string }> = {
  Pending: { icon: Clock, color: "text-yellow-400", label: "Pending" },
  Shipped: { icon: Truck, color: "text-gold", label: "Shipped" },
  Delivered: { icon: CheckCircle, color: "text-success", label: "Delivered" },
  Cancelled: { icon: XCircle, color: "text-danger", label: "Cancelled" },
};

export default function OrdersPage() {
  return (
    <div
      className="min-h-screen bg-noir"
      style={{ paddingTop: "calc(var(--nav-height) + var(--bar-height))" }}
    >
      <div className="bg-smoke border-b border-fog/20 py-10">
        <div className="container-site">
          <div className="flex items-center gap-2 text-xs text-silver mb-4">
            <Link href="/account" className="hover:text-gold transition-colors">Account</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-pearl">Orders</span>
          </div>
          <p className="label-xs text-gold mb-2">MY ORDERS</p>
          <h1 className="heading-xl text-snow">Order History</h1>
        </div>
      </div>

      <div className="container-site py-10 max-w-3xl">
        {MOCK_ORDERS.length === 0 ? (
          <div className="text-center py-24">
            <Package className="w-12 h-12 text-fog mx-auto mb-4" />
            <h2 className="font-heading text-2xl text-pearl mb-2">No orders yet</h2>
            <p className="text-silver text-sm mb-6">When you place an order, it will appear here.</p>
            <Link href="/shop" className="btn-primary">
              <span>Start Shopping</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {MOCK_ORDERS.map((order) => {
              const status = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.Pending;
              const StatusIcon = status.icon;
              return (
                <div key={order.id} className="bg-smoke border border-fog/20 rounded-sm overflow-hidden">
                  {/* Order header */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-fog/10">
                    <div className="flex items-center gap-3">
                      <StatusIcon className={`w-4 h-4 ${status.color}`} />
                      <div>
                        <p className="text-sm text-snow font-medium">{order.id}</p>
                        <p className="text-xs text-silver">{order.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`label-xs ${status.color}`}>{status.label}</span>
                      <span className="text-sm font-semibold text-gold">${order.total}</span>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="px-6 py-4 space-y-3">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-14 h-18 bg-ash overflow-hidden flex-shrink-0 rounded-sm">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-snow">{item.name}</p>
                          <p className="text-xs text-silver">Size: {item.size} · Qty: {item.qty}</p>
                        </div>
                        <span className="text-sm text-gold">${item.price}</span>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between px-6 py-3 bg-ash/30 border-t border-fog/10">
                    {order.tracking && (
                      <p className="text-xs text-silver">
                        Tracking: <span className="text-pearl font-mono">{order.tracking}</span>
                      </p>
                    )}
                    <div className="flex gap-3 ml-auto">
                      {order.status === "Delivered" && (
                        <button className="text-xs text-silver hover:text-gold transition-colors border border-fog/40 px-3 py-1.5">
                          Return / Exchange
                        </button>
                      )}
                      <button className="text-xs text-silver hover:text-gold transition-colors border border-fog/40 px-3 py-1.5">
                        View Invoice
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
