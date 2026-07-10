import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {/* Background image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/home/WhatsApp Image 2026-03-31 at 16.44.39(1).jpeg"
          alt=""
          fill
          className="object-cover opacity-10"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-noir/90" />
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
