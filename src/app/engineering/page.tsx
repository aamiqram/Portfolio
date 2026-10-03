import type { Metadata } from "next";
import ArticleIndex from "@/components/engineering/ArticleIndex";

export const metadata: Metadata = {
  title: "Engineering notes",
  description:
    "Technical write-ups on data modelling, API validation, client-side caching, rendering trade-offs and real-time architecture.",
  alternates: { canonical: "/engineering" },
  openGraph: {
    title: "Engineering notes · AAMIQRAM",
    description:
      "Technical write-ups on data modelling, API validation, client-side caching and rendering trade-offs.",
    url: "/engineering",
  },
};

export default function EngineeringPage() {
  return <ArticleIndex />;
}