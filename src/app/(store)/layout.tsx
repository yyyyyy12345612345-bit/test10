import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { CustomCursor } from "@/components/layout/CustomCursor";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CustomCursor />
      <div className="noise-overlay" aria-hidden="true" />
      <AnnouncementBar />
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
