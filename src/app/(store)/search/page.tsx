import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchClient } from "./SearchClient";

export const metadata: Metadata = {
  title: "Search Results — NOIR LABEL",
  robots: { index: false, follow: false },
};

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-noir flex justify-center items-center">
        <svg className="animate-spin w-8 h-8 text-gold" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    }>
      <SearchClient />
    </Suspense>
  );
}
