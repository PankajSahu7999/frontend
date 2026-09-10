import React from "react";
import CasinoBonusesClient from "../casino-bonuses/CasinoBonusesClient";
import { generateSEO } from "@/lib/seo";
import { buildApiUrl } from "@/config/api.config";
import {
  breadcrumbSchema,
  buildSchemaGraph,
  faqSchema,
  webpageSchema,
} from "@/lib/seo/schemas";

export const dynamic = "force-dynamic";

export const metadata = generateSEO({
  title: "Best Casino Bonuses & Free Spins - Verified Offers",
  description:
    "Explore exclusive casino welcome bonuses, no deposit free spins,crypto bonuses, crypto deposit matches, and cashback offers. cashback deals with clear wagering terms.",
  path: "/bonuses",
  keywords: [
    "casino bonuses",
    "best casino bonuses",
    "welcome bonus",
    "no deposit free spins",
    "crypto casino bonus",
    "casino promo codes",
    "casino cashback",
  ],
});

async function getBonusSectionsData() {
  try {
    const res = await fetch(buildApiUrl("/bonus-sections"), {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      return [];
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Error fetching bonus sections for page:", err);
    return [];
  }
}

export default async function BonusesHubPage() {
  const sections = await getBonusSectionsData();

  const graph = buildSchemaGraph({
    webpage: webpageSchema({
      url: "https://casinoreviewsbook.com/bonuses",
      title: "Best Casino Bonuses & Free Spins - Verified Offers",
      description:
        "Explore exclusive casino welcome bonuses, no deposit free spins,crypto bonuses, crypto deposit matches, and cashback offers. cashback deals with clear wagering terms.",
    }),
    breadcrumb: breadcrumbSchema({
      pageUrl: "https://casinoreviewsbook.com/bonuses",
      items: [
        {
          name: "Home",
          url: "https://casinoreviewsbook.com",
        },
        {
          name: "Bonuses",
          url: "https://casinoreviewsbook.com/bonuses",
        },
      ],
    }),

    faq: faqSchema({
      pageUrl: "https://casinoreviewsbook.com/bonuses/#faq",
      faqs: [
        {
          question: "What is a casino bonus?",
          answer:
            "A casino bonus is a free gift or reward given to players when they join a casino. It can include cash, free spins, or other incentives.",
        },
        {
          question: "How do I claim a casino bonus?",
          answer:
            "To claim a casino bonus, you typically need to sign up at the casino and follow the specific instructions provided for the bonus offer.",
        }
      ],
    }),
  });

  return <CasinoBonusesClient initialSections={sections} />;
}
