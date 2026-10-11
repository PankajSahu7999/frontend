"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Sparkles, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface HeroProps {
  title?: string;
  subtitle?: string;
  badgeText?: string;
  bannerImage?: string;
  isHomepage?: boolean;
}

export interface HeroSlideContent {
  id: string;
  eyebrow: string;
  h1: string;
  h1Highlight: string;
  supportingCopy: string;
  primaryCtaText: string;
  primaryCtaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
  trustLine: string;
  bannerImage: string;
}

// Three Hero Concepts from Documentation (Page 5-6)
export const HOMEPAGE_HERO_SLIDES: HeroSlideContent[] = [
  // Option 1 — Verification-first
  {
    id: "verification-first",
    eyebrow: "INDEPENDENT CASINO RESEARCH & REVIEWS",
    h1: "Independent Online Casino Reviews",
    h1Highlight: "For Players Who Want the Facts Before They Deposit",
    supportingCopy:
      "We check licensing, KYC, bonus terms, payment methods, mobile experience and withdrawals, then turn the findings into clear casino reviews and comparisons. Availability always depends on your country and local rules.",
    primaryCtaText: "Compare Casino Reviews",
    primaryCtaHref: "/compare-casinos",
    secondaryCtaText: "How We Review",
    secondaryCtaHref: "#methodology",
    trustLine:
      "Real-money testing • Licence checks • Bonus-term audits • Payout research • Affiliate disclosure",
    bannerImage: "/images/hero/casinos-hero.webp",
  },
  // Option 2 — Problem-first
  {
    id: "problem-first",
    eyebrow: "COUNTRY-SPECIFIC CASINO INFORMATION",
    h1: "Explore Online Casino",
    h1Highlight: "Information by Country, Game Type and Bonus",
    supportingCopy:
      "Learn how licensing rules, legal restrictions, payment availability and casino access vary by jurisdiction. Explore country-specific guides to understand the local context before visiting an operator.",
    primaryCtaText: "Explore Casino Reviews",
    primaryCtaHref: "/casinos",
    secondaryCtaText: "Read Casino Guides",
    secondaryCtaHref: "/guides",
    trustLine:
      "Clear criteria • Visible review dates • Transparent commercial disclosure",
    bannerImage: "/images/hero/bonuses-hero.webp",
  },
  // Option 3 — Comparison-first
  {
    id: "comparison-first",
    eyebrow: "COMPARE FEATURES BEFORE YOU CHOOSE",
    h1: "Compare Casino Bonuses",
    h1Highlight: "By Safety, Terms, Payments and Withdrawals",
    supportingCopy:
      "Compare available casino information in one place, from bonus wagering requirements and payment methods to withdrawal limits and processing policies. Review the terms and restrictions that may affect your choices.",
    primaryCtaText: "Compare Casinos",
    primaryCtaHref: "/compare-casinos",
    secondaryCtaText: "Browse by Country",
    secondaryCtaHref: "/casinos/casinos-by-country",
    trustLine:
      "Research-led reviews • Country-aware information • Research-Based Information",
    bannerImage: "/images/hero/betting-hero.webp",
  },
];

const THEME_SLIDES_MAP: Record<string, string[]> = {
  casinos: ["/images/hero/casinos-hero.webp", "/images/hero/bonuses-hero.webp"],
  bonuses: ["/images/hero/bonuses-hero.webp", "/images/hero/casinos-hero.webp"],
  slots: ["/images/hero/slots-hero.webp", "/images/hero/bonuses-hero.webp"],
  games: ["/images/hero/games-hero.webp", "/images/hero/casinos-hero.webp"],
  betting: ["/images/hero/betting-hero.webp", "/images/hero/casinos-hero.webp"],
};

function resolveHeroSlides(title: string, bannerImage?: string): string[] {
  if (bannerImage) return [bannerImage];
  const lower = title.toLowerCase();
  if (
    lower.includes("slot") ||
    lower.includes("spin") ||
    lower.includes("jackpot")
  ) {
    return THEME_SLIDES_MAP.slots;
  }
  if (
    lower.includes("bet") ||
    lower.includes("sport") ||
    lower.includes("odds")
  ) {
    return THEME_SLIDES_MAP.betting;
  }
  if (
    lower.includes("game") ||
    lower.includes("table") ||
    lower.includes("roulette") ||
    lower.includes("blackjack") ||
    lower.includes("poker") ||
    lower.includes("baccarat")
  ) {
    return THEME_SLIDES_MAP.games;
  }
  if (
    lower.includes("bonus") ||
    lower.includes("promo") ||
    lower.includes("reward")
  ) {
    return THEME_SLIDES_MAP.bonuses;
  }
  return THEME_SLIDES_MAP.casinos;
}

export function Hero({
  title = "Online Casinos",
  subtitle = "Find the best online casinos",
  badgeText,
  bannerImage,
  isHomepage = false,
}: HeroProps) {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const slides = isHomepage
    ? HOMEPAGE_HERO_SLIDES.map((s) => s.bannerImage)
    : resolveHeroSlides(title, bannerImage);

  // Auto-advance homepage slides every 8 seconds
  useEffect(() => {
    if (!isHomepage || slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isHomepage, slides.length]);

  const activeSlideData = isHomepage
    ? HOMEPAGE_HERO_SLIDES[currentSlide % HOMEPAGE_HERO_SLIDES.length]
    : null;

  const activeBanner = isHomepage
    ? activeSlideData?.bannerImage || "/images/hero/casinos-hero.jpg"
    : slides[currentSlide % slides.length];

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/casinos?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const derivedBadge =
    badgeText ||
    (isHomepage
      ? activeSlideData?.eyebrow || "INDEPENDENT CASINO RESEARCH & REVIEWS"
      : title.toLowerCase().includes("slot")
        ? "PREMIER SLOTS"
        : title.toLowerCase().includes("bet")
          ? "SPORTSBOOK & ODDS"
          : title.toLowerCase().includes("game")
            ? "CASINO TABLE GAMES"
            : title.toLowerCase().includes("bonus")
              ? "EXCLUSIVE BONUSES"
              : "BEST ONLINE CASINOS");

  return (
    <section className="relative w-full overflow-hidden rounded-2xl border border-slate-800/80 bg-[#0B1120] shadow-lg">
      {/* Responsive background image */}
      <div className="absolute inset-0">
        <Image
          src={activeBanner}
          alt={
            isHomepage
              ? activeSlideData?.h1 || "Casino Reviews Book"
              : `${title} - Casino Reviews Book Banner`
          }
          fill
          priority
          sizes="(max-width: 639px) 100vw, (max-width: 1279px) 100vw, 1280px"
          className="object-cover object-center transition-opacity duration-500"
        />

        {/* Responsive image overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/75 to-black/30 sm:bg-gradient-to-r sm:from-[#0B1120]/95 sm:via-[#0B1120]/80 sm:to-[#0B1120]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120]/50 via-transparent to-transparent" />
      </div>

      {/* Carousel controls */}
      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="absolute left-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white shadow-md backdrop-blur-sm transition hover:bg-black/85 active:scale-95 sm:left-4 sm:h-10 sm:w-10"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute right-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white shadow-md backdrop-blur-sm transition hover:bg-black/85 active:scale-95 sm:right-4 sm:h-10 sm:w-10"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-3 py-2 backdrop-blur-md sm:bottom-4 sm:gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={
                  i === currentSlide % slides.length ? "true" : undefined
                }
                className={`h-1.5 rounded-full transition-all duration-300 sm:h-2 ${
                  i === currentSlide % slides.length
                    ? "w-5 bg-amber-400 sm:w-6"
                    : "w-1.5 bg-white/50 hover:bg-white/80 sm:w-2"
                }`}
              />
            ))}
          </div>
        </>
      )}

      {/* Single responsive content layout */}
      <div className="relative z-10 flex min-h-[430px] flex-col items-center justify-end px-5 pb-12 pt-52 text-center sm:min-h-[450px] sm:items-start sm:justify-center sm:px-12 sm:pb-16 sm:pt-12 sm:text-left lg:min-h-[520px] lg:px-16 xl:px-[90px]">
        <div className="flex w-full max-w-[650px] flex-col items-center sm:items-start">
          {/* Badge */}
          <div className="mb-3 inline-flex max-w-full items-center gap-1.5 rounded-full border border-amber-400/40 bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1.5 shadow-md sm:mb-4 sm:px-4">
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-white" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-white sm:text-[11px]">
              {derivedBadge}
            </span>
          </div>

          {/* Homepage content */}
          {isHomepage && activeSlideData ? (
            <>
              <div className="w-full">
                <h1 className="font-['Poppins'] text-[20px] font-black leading-tight tracking-tight text-white drop-shadow-lg sm:text-[32px] sm:leading-[1.18] lg:text-[36px] xl:text-[40px]">
                  {activeSlideData.h1}
                </h1>

                <p className="mt-2 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-[13px] font-bold leading-snug text-transparent sm:text-[20px] lg:text-[22px]">
                  {activeSlideData.h1Highlight}
                </p>
              </div>

              <p className="mt-3 max-w-[540px] text-xs font-medium leading-relaxed text-slate-200 sm:mt-4 sm:text-sm">
                {activeSlideData.supportingCopy}
              </p>

              {/* Responsive CTA buttons */}
              <div className="mt-5 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
                <Link
                  href={activeSlideData.primaryCtaHref}
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-amber-200/50 bg-[linear-gradient(90deg,#FF990A_0%,#FFC23E_25%,#FFE45E_50%,#FFC23E_75%,#FF990A_100%)] px-6 py-3 text-center text-xs font-black uppercase tracking-wider text-[#16171D] shadow-[inset_0px_-3px_0px_0px_#B45B1B,0px_2px_8px_rgba(0,0,0,0.3)] transition hover:brightness-105 active:scale-95 sm:w-auto sm:min-w-[180px] sm:text-sm"
                >
                  {activeSlideData.primaryCtaText}
                </Link>

                <Link
                  href={activeSlideData.secondaryCtaHref}
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-center text-xs font-bold text-white shadow-sm backdrop-blur-md transition hover:bg-white/20 active:scale-95 sm:w-auto sm:min-w-[150px] sm:text-sm"
                >
                  {activeSlideData.secondaryCtaText}
                </Link>
              </div>

              {/* Trust text */}
              <p className="mt-4 max-w-[540px] text-[10px] font-medium leading-relaxed text-slate-300 sm:text-[11px]">
                {activeSlideData.trustLine}
              </p>
            </>
          ) : (
            /* Category page content */
            <>
              <h1 className="font-['Poppins'] text-[22px] font-black leading-tight tracking-tight text-white drop-shadow-lg sm:text-[38px] lg:text-[46px]">
                Find The Best
                <span className="mt-1 block bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
                  {title}
                </span>
              </h1>

              <p className="mt-4 max-w-[500px] text-xs font-medium leading-relaxed text-slate-200 sm:text-sm lg:text-base">
                {subtitle ||
                  "Explore honest online casino reviews, exclusive deposit bonuses, and verified crypto gambling sites tested for safety."}
              </p>

              <Link
                href="/"
                className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-full border border-amber-200/50 bg-[linear-gradient(90deg,#FF990A_0%,#FFC23E_25%,#FFE45E_50%,#FFC23E_75%,#FF990A_100%)] px-8 py-3 text-center text-xs font-black uppercase tracking-wider text-[#16171D] shadow-[inset_0px_-3px_0px_0px_#B45B1B,0px_2px_8px_rgba(0,0,0,0.3)] transition hover:brightness-105 active:scale-95 sm:w-auto sm:min-w-[180px] sm:text-sm"
              >
                PLAY NOW
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
