import type { Metadata } from "next";
import { SearchClient } from "./SearchClient";

export const metadata: Metadata = {
  title: "Search Results — NOIR LABEL",
  robots: { index: false, follow: false },
};

export default function SearchPage() {
  return <SearchClient />;
}
