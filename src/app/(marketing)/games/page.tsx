import React from "react";
import type { Metadata } from "next";
import HubPageClient, { HubSectionData } from "@/components/sections/HubPageClient";
import { generateSEO } from "@/lib/seo";
import { buildApiUrl } from "@/config/api.config";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return generateSEO({
    title: "Best Online Casino Games 2025 - Live Dealer, Blackjack, Roulette",
    description:
      "Explore the finest online casino games, live dealer tables, blackjack, roulette, and baccarat from leading software providers with top payouts.",
    path: "games",
    keywords: [
      "casino games",
      "best casino games",
      "live dealer games",
      "online blackjack",
      "online roulette",
      "live baccarat",
      "top game providers",
    ],
  });
}

async function getGameSectionsData(): Promise<HubSectionData[]> {
  try {
    const res = await fetch(buildApiUrl("/bonus-sections?section_type=game"), {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      return [];
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Error fetching game sections for page:", err);
    return [];
  }
}

export default async function GamesHubPage() {
  const sections = await getGameSectionsData();

  return (
    <HubPageClient
      pageTitle="Top Online Casino Games & Live Tables"
      pageSubtitle="Experience premier table games, immersive live casino dealers, European & American roulette, and blackjack with competitive RTPs."
      bannerBadge="POPULAR CASINO GAMES"
      bannerImage="/images/hero/games-hero.jpg"
      breadcrumbName="Games"
      initialSections={sections}
      emptyStateMessage="No casino game sections currently available."
    />
  );
}
