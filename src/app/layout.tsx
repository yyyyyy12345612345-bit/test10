import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import { Providers } from "./providers";

// ===============================================================
// FONTS
// ===============================================================
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: false,
});

// ===============================================================
// METADATA
// ===============================================================
export const metadata: Metadata = {
  metadataBase: new URL("https://noirlabel.com"),
  title: {
    default: "NOIR LABEL — Premium Urban Streetwear",
    template: "%s | NOIR LABEL",
  },
  description:
    "NOIR LABEL is a premium urban streetwear brand. Discover leather bombers, heavyweight hoodies, and tailored essentials — designed for the bold.",
  keywords: [
    "streetwear",
    "luxury fashion",
    "leather bomber",
    "premium hoodies",
    "urban fashion",
    "dark aesthetic",
    "noir label",
    "limited edition clothing",
  ],
  authors: [{ name: "NOIR LABEL" }],
  creator: "NOIR LABEL",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://noirlabel.com",
    title: "NOIR LABEL — Premium Urban Streetwear",
    description: "Premium urban streetwear. Leather bombers, heavyweight basics, tailored essentials.",
    siteName: "NOIR LABEL",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NOIR LABEL",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NOIR LABEL — Premium Urban Streetwear",
    description: "Premium urban streetwear. Leather bombers, heavyweight basics, tailored essentials.",
    images: ["/og-image.jpg"],
    creator: "@noirlabel",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// ===============================================================
// JSON-LD ORGANIZATION SCHEMA
// ===============================================================
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "NOIR LABEL",
  url: "https://noirlabel.com",
  logo: "https://noirlabel.com/home/logo.png",
  sameAs: [
    "https://instagram.com/noirlabel",
    "https://tiktok.com/@noirlabel",
    "https://twitter.com/noirlabel",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    email: "hello@noirlabel.com",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "NOIR LABEL",
  url: "https://noirlabel.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://noirlabel.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

// ===============================================================
// ROOT LAYOUT
// ===============================================================
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-noir text-snow font-body antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
