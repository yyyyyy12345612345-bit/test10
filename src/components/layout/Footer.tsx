import Link from "next/link";
import Image from "next/image";
import { Instagram, Twitter, Youtube, MessageCircle } from "lucide-react";

const FOOTER_LINKS = {
  Shop: [
    { label: "All Products", href: "/shop" },
    { label: "Outerwear", href: "/shop?category=outerwear" },
    { label: "Tops", href: "/shop?category=tops" },
    { label: "Bottoms", href: "/shop?category=bottoms" },
    { label: "New Arrivals", href: "/shop?sort=newest" },
    { label: "Best Sellers", href: "/shop?sort=bestselling" },
  ],
  Collections: [
    { label: "Shadow Season", href: "/collections/shadow-season" },
    { label: "Essentials", href: "/collections/essentials" },
    { label: "Eclipse — Limited", href: "/collections/eclipse" },
    { label: "Lookbook", href: "/lookbook" },
  ],
  Support: [
    { label: "FAQ", href: "/faq" },
    { label: "Shipping & Returns", href: "/shipping" },
    { label: "Size Guide", href: "/size-guide" },
    { label: "Contact Us", href: "/contact" },
    { label: "Track Order", href: "/account/orders" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const SOCIALS = [
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/noirlabel" },
  { icon: Twitter, label: "Twitter / X", href: "https://x.com/noirlabel" },
  { icon: Youtube, label: "YouTube", href: "https://youtube.com/@noirlabel" },
  { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/1234567890" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-smoke border-t border-fog/20 pt-16 pb-8">
      <div className="container-site">
        {/* Top: Brand + Links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/home/logo.png"
                alt="NOIR LABEL"
                width={100}
                height={34}
                className="h-8 w-auto invert brightness-200"
              />
            </Link>
            <p className="text-silver text-sm leading-relaxed mb-6 max-w-[180px]">
              Premium urban streetwear. Built for those who understand silence.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center border border-fog text-silver hover:border-gold hover:text-gold transition-all duration-300"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="label-xs text-snow mb-4">{category.toUpperCase()}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-silver hover:text-gold transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="divider mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-fog">
            © {year} NOIR LABEL. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-fog">Payments accepted:</span>
            {["Visa", "Mastercard", "PayPal", "Apple Pay"].map((p) => (
              <span key={p} className="text-xs text-silver border border-fog/40 px-2 py-1">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* WhatsApp floating button */}
      <a
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[50] w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 md:bottom-8 md:right-8"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 text-white fill-white" />
      </a>
    </footer>
  );
}
