import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Create Account — NOIR LABEL",
  robots: { index: false, follow: false },
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-noir flex items-center justify-center px-4">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-10 w-full max-w-md">
        <Link href="/" className="flex justify-center mb-10">
          <Image src="/home/logo.png" alt="NOIR LABEL" width={110} height={36} className="h-9 w-auto invert brightness-200" />
        </Link>

        <div className="glass border border-fog/30 p-8 rounded-sm">
          <div className="text-center mb-8">
            <p className="label-xs text-gold mb-2">JOIN THE INNER CIRCLE</p>
            <h1 className="heading-md text-snow">Create Account</h1>
          </div>

          <div className="space-y-3 mb-6">
            {["Google", "Apple"].map((provider) => (
              <button
                key={provider}
                className="w-full py-3 border border-fog hover:border-pearl transition-colors text-sm text-silver"
              >
                Continue with {provider}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-fog/40" />
            <span className="label-xs text-fog">OR</span>
            <div className="flex-1 h-px bg-fog/40" />
          </div>

          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <input type="text" placeholder="First name" className="input" autoComplete="given-name" />
              <input type="text" placeholder="Last name" className="input" autoComplete="family-name" />
            </div>
            <input type="email" placeholder="Email address" className="input" autoComplete="email" />
            <input type="password" placeholder="Password (min 8 characters)" className="input" minLength={8} />
            <label className="flex items-start gap-3 cursor-pointer text-xs text-silver">
              <input type="checkbox" className="w-4 h-4 accent-gold mt-0.5" required />
              <span>
                I agree to the{" "}
                <Link href="/terms" className="text-gold hover:underline">Terms of Service</Link>
                {" "}and{" "}
                <Link href="/privacy" className="text-gold hover:underline">Privacy Policy</Link>.
                I&apos;d love to receive exclusive drops and offers by email.
              </span>
            </label>

            <button type="submit" className="btn-primary w-full justify-center">
              <span>Create Account</span>
              <ArrowRight className="w-4 h-4 relative z-10" />
            </button>
          </form>

          <p className="text-center text-sm text-silver mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-gold hover:text-gold-light transition-colors">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
