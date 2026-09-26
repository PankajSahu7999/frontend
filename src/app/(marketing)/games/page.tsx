import React from "react";
import type { Metadata } from "next";
import { generateSEO } from "@/lib/seo";
import { buildApiUrl } from "@/config/api.config";
import GamesHubClient from "./GamesHubClient";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return generateSEO({
    title: "Casino Games - Online Slots, Roulette, Blackjack & Poker",
    description:
      "Explore the finest online casino games, live dealer tables, blackjack, roulette, and baccarat from leading software providers with top payouts.",
    path: "games",
    keywords: [
      "casino games",
      "best casino games",
      "online roulette",
      "online poker",
      "online blackjack",
      "online craps",
      "top game providers",
    ],
  });
}

async function getRecommendedGames() {
  try {
    const res = await fetch(buildApiUrl("/games/recommended"), {
      cache: "no-store",
    });
    if (!res.ok) {
      return { poker: [], roulette: [], blackjack: [], craps: [], sponsored: [], all: [] };
    }
    return await res.json();
  } catch (err) {
    console.error("Error fetching recommended games:", err);
    return { poker: [], roulette: [], blackjack: [], craps: [], sponsored: [], all: [] };
  }
}

async function getRealCasinos() {
  try {
    const res = await fetch(buildApiUrl("/casinos?limit=8"), {
      cache: "no-store",
    });
    if (!res.ok) {
      return [];
    }
    return await res.json();
  } catch (err) {
    console.error("Error fetching real casinos for games hub:", err);
    return [];
  }
}

export default async function GamesPage() {
  const [recommended, topCasinos] = await Promise.all([
    getRecommendedGames(),
    getRealCasinos(),
  ]);

  return <GamesHubClient recommended={recommended} topCasinos={topCasinos} />;
}
