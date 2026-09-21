import React from "react";
import type { Metadata } from "next";
import HubPageClient, { HubSectionData } from "@/components/sections/HubPageClient";
import { generateSEO } from "@/lib/seo";
import { buildApiUrl } from "@/config/api.config";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return generateSEO({
    title: "Best Online Casinos 2025 - Verified Ratings & Reviews",
    description:
      "Explore our directory of trusted, top-rated online casinos. Filter by ratings, payment methods, game variety, and exclusive welcome packages.",
    path: "casinos",
    keywords: [
      "online casinos",
      "best online casinos",
      "top rated casinos",
      "trusted casino reviews",
      "crypto casinos",
      "safe online gambling",
    ],
  });
}

async function getCasinoSectionsData(): Promise<HubSectionData[]> {
  try {
    const res = await fetch(buildApiUrl("/bonus-sections?section_type=casino"), {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      return [];
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Error fetching casino sections for page:", err);
    return [];
  }
}

export default async function CasinosHubPage() {
  const sections = await getCasinoSectionsData();

  return (
    <HubPageClient
      pageTitle="Best Online Casinos 2025"
      pageSubtitle="Browse verified, top-tier online casinos evaluated for player safety, fast cashouts, game variety, and high-value welcome bonuses."
      bannerBadge="VERIFIED CASINOS DIRECTORY"
      bannerImage="/images/hero/casinos-hero.jpg"
      breadcrumbName="Casinos"
      initialSections={sections}
      emptyStateMessage="No casino sections currently available. Check back soon or browse our categories."
    />
  );
}
