"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, Heart, Menu, X, ChevronDown } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";

const NAV_LINKS = [
  {
    label: "Shop",
    href: "/shop",
    mega: [
      { label: "All Products", href: "/shop" },
      { label: "Outerwear", href: "/shop?category=outerwear" },
      { label: "Tops", href: "/shop?category=tops" },
      { label: "Bottoms", href: "/shop?category=bottoms" },
      { label: "Accessories", href: "/shop?category=accessories" },
    ],
  },
  {
    label: "Collections",
    href: "/collections",
    mega: [
      { label: "Shadow Season", href: "/collections/shadow-season" },
      { label: "Essentials", href: "/collections/essentials" },
      { label: "Eclipse — Limited Edition", href: "/collections/eclipse" },
    ],
  },
  { label: "Lookbook", href: "/lookbook" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { openCart, getItemCount } = useCartStore();
  const { count: wishlistCount } = useWishlistStore();
  const cartCount = getItemCount();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [searchOpen]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`navbar z-[100] ${scrolled ? "scrolled" : ""}`}
        style={{ top: scrolled ? "0" : "var(--bar-height)" }}
      >
        <div className="container-site w-full flex items-center justify-between h-full">
          {/* LEFT: Nav links (desktop) */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.mega && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1 label-sm text-pearl hover:text-gold transition-colors duration-300"
                >
                  {link.label}
                  {link.mega && <ChevronDown className="w-3 h-3" />}
                </Link>

                {/* Dropdown */}
                {link.mega && (
                  <div
                    className={`absolute top-full left-0 pt-4 transition-all duration-300 ${
                      activeDropdown === link.label
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
                  >
                    <div className="glass-dark rounded-sm p-4 min-w-[200px] flex flex-col gap-2">
                      {link.mega.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="text-sm text-silver hover:text-gold transition-colors duration-200 py-1"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CENTER: Logo */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 flex items-center"
            aria-label="NOIR LABEL — Home"
          >
            <Image
              src="/home/logo.png"
              alt="NOIR LABEL"
              width={120}
              height={40}
              className="h-8 w-auto object-contain invert brightness-200"
              priority
            />
          </Link>

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-4 ml-auto">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-pearl hover:text-gold transition-colors duration-300"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist (desktop) */}
            <Link
              href="/account/wishlist"
              className="hidden md:flex p-2 text-pearl hover:text-gold transition-colors duration-300 relative"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount() > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold text-noir text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount()}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={openCart}
              className="p-2 text-pearl hover:text-gold transition-colors duration-300 relative"
              aria-label={`Cart — ${cartCount} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold text-noir text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-pearl hover:text-gold transition-colors duration-300"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-[90] lg:hidden transition-all duration-600 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(8,8,8,0.98)", backdropFilter: "blur(20px)" }}
      >
        <div
          className="flex flex-col justify-center items-center h-full gap-8"
          style={{
            transform: mobileOpen ? "translateY(0)" : "translateY(-20px)",
            transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.label}
              href={link.href}
              className="heading-xl text-snow hover:text-gold transition-colors duration-300"
              onClick={() => setMobileOpen(false)}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {link.label}
            </Link>
          ))}
          <div className="divider w-16 mt-4" />
          <div className="flex items-center gap-6">
            <Link href="/account" className="label-sm text-silver hover:text-gold transition-colors" onClick={() => setMobileOpen(false)}>Account</Link>
            <Link href="/account/wishlist" className="label-sm text-silver hover:text-gold transition-colors" onClick={() => setMobileOpen(false)}>Wishlist</Link>
          </div>
        </div>
      </div>

      {/* SEARCH OVERLAY */}
      {searchOpen && (
        <div className="fixed inset-0 z-[110] bg-noir/95 backdrop-blur-2xl flex flex-col">
          <div className="container-site pt-8 flex justify-end">
            <button
              onClick={() => setSearchOpen(false)}
              className="p-2 text-silver hover:text-gold transition-colors"
              aria-label="Close search"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 container-site flex flex-col justify-center">
            <p className="label-sm text-silver mb-4">SEARCH</p>
            <div className="flex items-end gap-4 border-b border-fog pb-4">
              <Search className="w-6 h-6 text-silver flex-shrink-0 mb-1" />
              <input
                ref={searchInputRef}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, collections..."
                className="flex-1 bg-transparent text-snow text-3xl md:text-5xl font-heading font-light outline-none placeholder:text-fog"
                onKeyDown={(e) => {
                  if (e.key === "Escape") setSearchOpen(false);
                  if (e.key === "Enter" && searchQuery) {
                    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
                  }
                }}
              />
            </div>
            <div className="mt-8">
              <p className="label-xs text-silver mb-4">TRENDING SEARCHES</p>
              <div className="flex flex-wrap gap-3">
                {["Leather Bomber", "Hoodie", "Cargo Pants", "Eclipse Coat", "Limited Edition"].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setSearchQuery(term);
                      window.location.href = `/search?q=${encodeURIComponent(term)}`;
                    }}
                    className="px-4 py-2 border border-fog text-silver hover:border-gold hover:text-gold transition-all duration-300 label-xs"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
