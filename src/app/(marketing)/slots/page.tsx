import React from "react";
import type { Metadata } from "next";
import HubPageClient, { HubSectionData } from "@/components/sections/HubPageClient";
import { generateSEO } from "@/lib/seo";
import { buildApiUrl } from "@/config/api.config";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return generateSEO({
    title: "Best Online Slots 2025 - High RTP, Megaways & Jackpots",
    description:
      "Play the best online slots with high RTP, exciting Megaways mechanics, bonus buys, and record progressive jackpots at trusted slot sites.",
    path: "slots",
    keywords: [
      "online slots",
      "best slot sites",
      "megaways slots",
      "progressive jackpot slots",
      "high rtp slots",
      "free spins slots",
    ],
  });
}

async function getSlotSectionsData(): Promise<HubSectionData[]> {
  try {
    const res = await fetch(buildApiUrl("/bonus-sections?section_type=slot"), {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      return [];
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Error fetching slot sections for page:", err);
    return [];
  }
}

export default async function SlotsHubPage() {
  const sections = await getSlotSectionsData();

  return (
    <HubPageClient
      pageTitle="Best Online Slots & Jackpots"
      pageSubtitle="Discover the highest-paying slot games, thrilling Megaways reels, and giant progressive jackpots from world-renowned software creators."
      bannerBadge="FEATURED SLOTS HUB"
      bannerImage="/images/hero/slots-hero.jpg"
      breadcrumbName="Slots"
      initialSections={sections}
      emptyStateMessage="No slot sections currently available."
    />
  );
}
