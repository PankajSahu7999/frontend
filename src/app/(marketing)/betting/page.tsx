import React from "react";
import type { Metadata } from "next";
import HubPageClient, { HubSectionData } from "@/components/sections/HubPageClient";
import { generateSEO } from "@/lib/seo";
import { buildApiUrl } from "@/config/api.config";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return generateSEO({
    title: "Best Sports Betting Sites 2025 - Top Sportsbooks & Live Odds",
    description:
      "Find the best online sports betting sites with competitive odds, live in-play wagering, esports coverage, and exclusive sports free bet bonuses.",
    path: "betting",
    keywords: [
      "sports betting",
      "best sportsbooks",
      "online betting sites",
      "live in play betting",
      "esports betting",
      "free sports bets",
    ],
  });
}

async function getBettingSectionsData(): Promise<HubSectionData[]> {
  try {
    const res = await fetch(buildApiUrl("/bonus-sections?section_type=betting"), {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      return [];
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Error fetching betting sections for page:", err);
    return [];
  }
}

export default async function BettingHubPage() {
  const sections = await getBettingSectionsData();

  return (
    <HubPageClient
      pageTitle="Top Sports Betting Sites & Bookmakers"
      pageSubtitle="Bet on premier sports leagues, live in-play matches, and esports with market-leading odds, instant deposits, and fast cashout options."
      bannerBadge="SPORTSBOOK DIRECTORY"
      bannerImage="/images/hero/betting-hero.jpg"
      breadcrumbName="Betting"
      initialSections={sections}
      emptyStateMessage="No sports betting sections currently available."
    />
  );
}
