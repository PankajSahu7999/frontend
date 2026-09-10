"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Gift,
  Sparkles,
  Flame,
  Coins,
  Percent,
  Trophy,
  Search,
  Star,
  ShieldCheck,
  Zap,
} from "lucide-react";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import CasinoCardDisclaimer from "@/components/CasinoCardDisclaimer";
import { getImageUrl } from "@/lib/utils/getImageUrl";
import { formatPayoutTime } from "@/lib/utils";
import StarRating from "@/components/ui/StarRating";

const ICON_MAP: Record<string, any> = {
  Gift,
  Sparkles,
  Flame,
  Coins,
  Percent,
  Trophy,
};

interface BonusOfferItem {
  id: string;
  casino_id: string;
  custom_title?: string;
  bonus_code?: string;
  wagering_requirement?: string;
  min_deposit?: string;
  exclusive?: boolean;
  highlight_badge?: string;
  claim_url?: string;
  sort_order?: number;
  casino: {
    id: string;
    name: string;
    slug: string;
    logo?: string;
    logo_url?: string;
    featured_image?: string;
    short_description?: string;
    description?: string;
    rating?: string | number;
    website_url?: string;
    default_affiliate_url?: string;
    disclaimer_text?: string;
    minimum_deposit?: string | number;
    withdrawal_time?: string;
    games_count?: string | number;
    established_year?: string | number;
    payment_methods?: { id: string; method_name: string }[];
    features?: { id: string; feature: string }[];
    bonuses?: { id?: string; amount?: string; title?: string }[];
  };
}

interface BonusSectionData {
  id: string;
  title: string;
  slug: string;
  badge_text?: string;
  description?: string;
  icon_name?: string;
  sort_order?: number;
  status?: string;
  items: BonusOfferItem[];
}

interface CasinoBonusesClientProps {
  initialSections: BonusSectionData[];
}

export default function CasinoBonusesClient({
  initialSections = [],
}: CasinoBonusesClientProps) {
  const [sections] = useState<BonusSectionData[]>(initialSections);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSectionSlug, setSelectedSectionSlug] = useState<string>("all");

  // Filter sections and offers based on search and selected section pill
  const filteredSections = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return sections
      .filter((sec) => {
        if (selectedSectionSlug !== "all" && sec.slug !== selectedSectionSlug) {
          return false;
        }
        return true;
      })
      .map((sec) => {
        if (!q) return sec;

        const filteredItems = sec.items.filter((item) => {
          const cName = (item.casino?.name || "").toLowerCase();
          const title = (item.custom_title || "").toLowerCase();
          const code = (item.bonus_code || "").toLowerCase();
          const badge = (item.highlight_badge || "").toLowerCase();
          return (
            cName.includes(q) ||
            title.includes(q) ||
            code.includes(q) ||
            badge.includes(q)
          );
        });

        return {
          ...sec,
          items: filteredItems,
        };
      })
      .filter((sec) => sec.items.length > 0 || !q);
  }, [sections, searchQuery, selectedSectionSlug]);

  const totalOffersCount = useMemo(() => {
    return sections.reduce((acc, sec) => acc + (sec.items?.length || 0), 0);
  }, [sections]);

  return (
    <div className="w-full pb-16 overflow-x-hidden">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[{ name: "Home", url: "/" }, { name: "Casino Bonuses" }]}
        className="mb-3"
      />

      {/* Hero Blue Banner (Theme Matched) */}
      <div className="relative w-full h-[220px] sm:h-[260px] lg:h-[300px] rounded-2xl overflow-hidden mb-6 shadow-sm">
        <Image
          src="/videos/hero/main-banner1.webp"
          alt="Best Online Casino Bonuses & Promotions"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Subtle Blue Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/70 via-blue-900/50 to-transparent flex flex-col justify-center px-6 sm:px-10 lg:px-12 text-white">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-white text-[11px] font-bold bg-[#FF9C2C] w-fit mb-2 shadow-xs">
            <Gift size={13} />
            <span>EXCLUSIVE CASINO OFFERS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-2">
            Best Online Casino Bonuses
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl font-medium leading-relaxed">
            Discover verified welcome packages, zero-deposit free spins, crypto
            deposit boosts, and weekly cashback deals with honest wagering
            terms.
          </p>
        </div>
      </div>

      {/* Quick Jump Category Pills & Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-8">
        {/* Section Jump Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setSelectedSectionSlug("all")}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-150 ${
              selectedSectionSlug === "all"
                ? "bg-[#2E68FB] text-white shadow-sm"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            All Bonuses ({totalOffersCount})
          </button>

          {sections.map((sec) => {
            const IconComp = ICON_MAP[sec.icon_name || "Gift"] || Gift;
            const count = sec.items?.length || 0;

            return (
              <button
                key={sec.id || sec.slug}
                onClick={() => setSelectedSectionSlug(sec.slug)}
                className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all duration-150 flex items-center gap-1.5 ${
                  selectedSectionSlug === sec.slug
                    ? "bg-[#2E68FB] text-white shadow-sm"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                <IconComp size={13} />
                <span>{sec.title}</span>
                {count > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                      selectedSectionSlug === sec.slug
                        ? "bg-white/20 text-white"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Real-Time Search Bar */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            size={15}
          />
          <input
            type="text"
            placeholder="Search casino or bonus code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-full text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs font-medium"
          />
        </div>
      </div>

      {/* Bonus Sections */}
      {filteredSections.length === 0 ? (
        <div className="py-16 text-center bg-white border border-gray-200 rounded-2xl p-8 shadow-xs">
          <Gift className="mx-auto text-gray-300 mb-3" size={40} />
          <h3 className="text-base font-bold text-gray-900 mb-1">
            No Bonus Offers Found
          </h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            No promotions matching &quot;{searchQuery}&quot;. Try choosing a
            different category or resetting search.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedSectionSlug("all");
            }}
            className="mt-4 px-4 py-2 bg-[#2E68FB] text-white font-bold rounded-xl text-xs shadow-xs hover:brightness-105 transition-all"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-12">
          {filteredSections.map((section) => {
            const IconComp = ICON_MAP[section.icon_name || "Gift"] || Gift;

            return (
              <section
                key={section.id || section.slug}
                id={section.slug}
                className="scroll-mt-24"
              >
                {/* Section Header (Matches website headings) */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Star size={20} fill="#B8C5FF" color="#B8C5FF" />
                    <div className="flex items-center gap-2">
                      <h2 className="text-[22px] sm:text-[28px] font-bold text-[#111827]">
                        {section.title}
                      </h2>
                      {section.badge_text && (
                        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-[#FF9C2C]/15 text-[#B45B1B] border border-[#FF9C2C]/30">
                          {section.badge_text}
                        </span>
                      )}
                    </div>
                  </div>

                  <span className="hidden sm:inline-flex text-xs font-semibold text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-100 shadow-2xs">
                    {section.items.length}{" "}
                    {section.items.length === 1
                      ? "Casino Deal"
                      : "Casino Deals"}
                  </span>
                </div>

                {section.description && (
                  <p className="text-xs sm:text-[14px] text-[#5F6368] -mt-2 mb-6 max-w-2xl leading-relaxed">
                    {section.description}
                  </p>
                )}

                {/* Popular Casino Style Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.items.map((item, idx) => {
                    const casino = item.casino || {};
                    const imageUrl = getImageUrl(
                      casino.logo ||
                        casino.logo_url ||
                        casino.featured_image ||
                        "/images/888.png",
                    );
                    const welcomeBonus =
                      item.custom_title ||
                      casino.bonuses?.[0]?.amount ||
                      "$2,500 + 10% Cashback";
                    const claimUrl =
                      item.claim_url ||
                      casino.website_url ||
                      casino.default_affiliate_url ||
                      `/casino/${casino.slug || ""}`;

                    return (
                      <div
                        key={item.id || idx}
                        className="card-animated-border rounded-[24px] p-[2px] w-full cursor-pointer"
                      >
                        <div
                          className="flex flex-col p-4 rounded-[22px] justify-between h-full"
                          style={{
                            minHeight: "410px",
                            background:
                              "linear-gradient(231.79deg, #D5EDFF 32.55%, #EEECFF 43.54%, #F9F3FF 53.23%, #F5FCFF 66.16%, #E9F5FF 79.08%)",
                          }}
                        >
                          {/* 1. Header (Logo + Title) */}
                          <div className="flex gap-3 items-center">
                            <div className="relative w-20 h-20 bg-white rounded-xl overflow-hidden shadow-xs flex-shrink-0 border border-gray-100 p-1">
                              <Image
                                src={imageUrl}
                                alt={casino.name || "Casino"}
                                fill
                                className="object-contain p-1"
                                unoptimized
                              />
                            </div>
                            <div className="min-w-0">
                              <h3 className="text-[20px] font-bold text-[#151515] leading-tight truncate">
                                {casino.name || "Premium Casino"}
                              </h3>
                              <p className="text-[11px] text-[#666] mt-0.5 line-clamp-2">
                                {casino.short_description ||
                                  casino.description ||
                                  "Verified Online Casino"}
                              </p>
                            </div>
                          </div>

                          {/* 2. Rating & Badges Row */}
                          <div className="flex items-center justify-between mt-3">
                            <StarRating rating={casino.rating || 5} size={13} />

                            <div className="flex gap-1">
                              {item.highlight_badge && (
                                <span className="text-[9px] font-bold text-white px-2 py-0.5 rounded-md bg-gradient-to-r from-[#FFB000] to-[#FF8A00]">
                                  {item.highlight_badge}
                                </span>
                              )}
                              <span className="text-[9px] font-bold text-white px-2 py-0.5 rounded-md bg-[#00B67A]">
                                Verified
                              </span>
                            </div>
                          </div>

                          {/* 3. Main Welcome Bonus Box */}
                          <div className="mt-3 p-3 rounded-xl bg-[#2E68FB] text-white flex flex-col justify-center shadow-xs">
                            <span className="text-[9px] font-semibold tracking-wider uppercase text-blue-100 flex items-center justify-between">
                              <span>
                                {item.exclusive
                                  ? "★ Exclusive Deal"
                                  : "Welcome Bonus"}
                              </span>
                              {item.bonus_code && (
                                <span className="font-mono bg-white/20 px-1.5 py-0.2 rounded text-[10px] text-white">
                                  CODE: {item.bonus_code}
                                </span>
                              )}
                            </span>
                            <span className="text-[13px] font-bold mt-0.5 leading-snug">
                              {welcomeBonus}
                            </span>
                          </div>

                          {/* 4. Details 2x2 Info Grid */}
                          <div className="grid grid-cols-2 gap-2 mt-3">
                            {/* Min Deposit */}
                            <div className="p-2 bg-white/60 border border-[#2E68FB20] rounded-lg">
                              <span className="block text-[9px] font-semibold text-[#2E68FB] uppercase">
                                Min Deposit
                              </span>
                              <span className="text-[12px] font-bold text-[#363636]">
                                {item.min_deposit ||
                                  (casino.minimum_deposit
                                    ? `$${casino.minimum_deposit}`
                                    : "$20")}
                              </span>
                            </div>

                            {/* Wagering */}
                            <div className="p-2 bg-white/60 border border-[#2E68FB20] rounded-lg">
                              <span className="block text-[9px] font-semibold text-[#2E68FB] uppercase">
                                Wagering
                              </span>
                              <span className="text-[12px] font-bold text-[#363636]">
                                {item.wagering_requirement || "30x"}
                              </span>
                            </div>

                            {/* Games */}
                            <div className="p-2 bg-white/60 border border-[#2E68FB20] rounded-lg min-h-[52px] flex flex-col justify-center">
                              <span className="block text-[9px] font-semibold text-[#00B67A] uppercase">
                                Games
                              </span>
                              <span className="text-[12px] font-bold text-[#00B67A] truncate">
                                {casino.games_count ? `${casino.games_count}+ Games` : "2500+ Games"}
                              </span>
                            </div>

                            {/* Payout */}
                            <div
                              className="p-2 bg-white/60 border border-[#2E68FB20] rounded-lg min-h-[52px] flex flex-col justify-center"
                              title={casino.withdrawal_time || 'Instant / 24h'}
                            >
                              <span className="block text-[9px] font-semibold text-[#2E68FB] uppercase">
                                Payout
                              </span>
                              <span className="text-[12px] font-bold text-[#363636] line-clamp-2 leading-tight">
                                {formatPayoutTime(casino.withdrawal_time)}
                              </span>
                            </div>
                          </div>

                          {/* 5. Bottom Buttons Row */}
                          <div className="flex gap-2 mt-3.5">
                            <a
                              href={claimUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                height: "36px",
                                borderRadius: "12px",
                                boxShadow: "0px 2px 0px 0px #2E68FB",
                                background:
                                  "linear-gradient(180deg, #CDDCFB 0%, #588CF3 100%)",
                              }}
                              className="btn-play-now flex-1 text-white text-[12px] font-bold flex items-center justify-center gap-1"
                            >
                              Visit Casino ↗
                            </a>

                            <Link
                              href={`/casino/${casino.slug || ""}`}
                              style={{
                                width: "90px",
                                height: "36px",
                                borderRadius: "12px",
                                background:
                                  "linear-gradient(180deg, #FFE11F 0%, #FF8533 100%)",
                              }}
                              className="btn-review inline-flex items-center justify-center text-[#1F1F1F] text-[12px] font-bold shrink-0"
                            >
                              Reviews
                            </Link>
                          </div>

                          {/* 6. Disclaimer Modal Link */}
                          <CasinoCardDisclaimer
                            casinoName={casino.name || "Casino"}
                            customText={casino.disclaimer_text}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
