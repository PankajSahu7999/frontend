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
import CasinoCardBadge from "@/components/casino/CasinoCardBadge";

const ICON_MAP: Record<string, any> = {
  Gift,
  Sparkles,
  Flame,
  Coins,
  Percent,
  Trophy,
};

export interface SectionItemData {
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
    card_badge?: string;
    hot_casino?: boolean;
    features?: { id: string; feature: string }[];
    bonuses?: { id?: string; amount?: string; title?: string }[];
  };
}

export interface HubSectionData {
  id: string;
  title: string;
  slug: string;
  badge_text?: string;
  description?: string;
  icon_name?: string;
  section_type?: string;
  sort_order?: number;
  status?: string;
  items: SectionItemData[];
}

export interface HubPageClientProps {
  pageTitle: string;
  pageSubtitle: string;
  bannerBadge?: string;
  bannerImage: string;
  breadcrumbName: string;
  initialSections: HubSectionData[];
  emptyStateMessage?: string;
}

export default function HubPageClient({
  pageTitle,
  pageSubtitle,
  bannerBadge = "EXCLUSIVE DIRECTORY",
  bannerImage,
  breadcrumbName,
  initialSections = [],
  emptyStateMessage = "No sections currently available in this category.",
}: HubPageClientProps) {
  const [sections] = useState<HubSectionData[]>(initialSections);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSectionSlug, setSelectedSectionSlug] = useState<string>("all");

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

        const filteredItems = (sec.items || []).filter((item) => {
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

  const totalItemsCount = useMemo(() => {
    return sections.reduce((acc, sec) => acc + (sec.items?.length || 0), 0);
  }, [sections]);

  return (
    <div className="w-full pb-16 overflow-x-hidden">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[{ name: "Home", url: "/" }, { name: breadcrumbName }]}
        className="mb-3"
      />

      {/* Hero Themed Banner */}
      <div className="relative w-full h-[220px] sm:h-[260px] lg:h-[300px] rounded-2xl overflow-hidden mb-6 shadow-lg bg-slate-950">
        <Image
          src={bannerImage}
          alt={pageTitle}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1280px"
          className="object-cover object-right lg:object-center"
        />
        {/* High-Contrast Directional Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-950/40 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/20 z-[1]" />

        <div className="relative z-10 h-full flex items-center justify-between px-6 sm:px-10 lg:px-12 text-white">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-white text-[11px] font-extrabold bg-gradient-to-r from-amber-500 to-orange-500 w-fit mb-2.5 shadow-md border border-amber-400/30">
              <Trophy size={13} />
              <span>{bannerBadge}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              {pageTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl font-medium leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
              {pageSubtitle}
            </p>
          </div>

          {/* Desktop Trust Highlights */}
          <div className="hidden md:flex flex-col gap-2.5 items-end shrink-0 ml-4">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-md">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>100% Verified & Tested</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-md">
              <Zap size={14} className="text-amber-400" />
              <span>Instant Cashouts & Crypto</span>
            </div>
          </div>
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
                ? "bg-[#2E68FB] text-white shadow-md shadow-blue-500/25"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            All Sections ({totalItemsCount})
          </button>

          {sections.map((sec) => (
            <button
              key={sec.id || sec.slug}
              onClick={() => setSelectedSectionSlug(sec.slug)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-150 ${
                selectedSectionSlug === sec.slug
                  ? "bg-[#2E68FB] text-white shadow-md shadow-blue-500/25"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {sec.title} ({sec.items?.length || 0})
            </button>
          ))}
        </div>

        {/* Real-Time Search Bar */}
        <div className="relative w-full md:w-80 flex-shrink-0">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search casinos, offers, or codes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#2E68FB] focus:ring-1 focus:ring-[#2E68FB] shadow-2xs"
          />
        </div>
      </div>

      {/* Sections & Cards */}
      {filteredSections.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
          <Sparkles className="mx-auto text-gray-300 mb-3" size={48} />
          <h3 className="text-lg font-bold text-gray-700">No Casinos Found</h3>
          <p className="text-sm text-gray-400 mt-1 max-w-md mx-auto">
            {searchQuery
              ? `No casino offers match "${searchQuery}". Try a different search term or clear the filter.`
              : emptyStateMessage}
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-bold bg-[#2E68FB] text-white hover:bg-blue-700"
            >
              Clear Search Filter
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-12">
          {filteredSections.map((section) => {
            return (
              <section
                key={section.id || section.slug}
                id={section.slug}
                className="scroll-mt-24"
              >
                {/* Section Header */}
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
                    {section.items.length === 1 ? "Casino" : "Casinos"}
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
                        className="card-animated-border rounded-[24px] p-[2px] w-full cursor-pointer relative group"
                      >
                        {/* Top-Right Corner Tag / Badge */}
                        <div className="absolute top-2 right-3 z-20">
                          <CasinoCardBadge
                            badge={casino.card_badge || item.highlight_badge}
                            isHot={casino.hot_casino}
                          />
                        </div>

                        <div
                          className="flex flex-col p-4 rounded-[22px] justify-between h-full relative"
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
                            <div className="min-w-0 flex-1 pr-14">
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
                                  : "Featured Offer"}
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
                                {casino.games_count
                                  ? `${casino.games_count}+ Games`
                                  : "2500+ Games"}
                              </span>
                            </div>

                            {/* Payout */}
                            <div
                              className="p-2 bg-white/60 border border-[#2E68FB20] rounded-lg min-h-[52px] flex flex-col justify-center"
                              title={casino.withdrawal_time || "Instant / 24h"}
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
                              Play Now ↗
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
