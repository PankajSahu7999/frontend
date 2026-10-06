"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface HeroProps {
  title?: string;
  subtitle?: string;
  badgeText?: string;
  bannerImage?: string;
  isHomepage?: boolean;
}

const THEME_SLIDES_MAP: Record<string, string[]> = {
  casinos: [
    "/images/hero/casinos-hero.jpg",
    "/videos/hero/main-banner1.webp",
  ],
  bonuses: [
    "/images/hero/bonuses-hero.jpg",
    "/images/hero/casinos-hero.jpg",
  ],
  slots: [
    "/images/hero/slots-hero.jpg",
    "/images/hero/bonuses-hero.jpg",
  ],
  games: [
    "/images/hero/games-hero.jpg",
    "/images/hero/casinos-hero.jpg",
  ],
  betting: [
    "/images/hero/betting-hero.jpg",
    "/images/hero/casinos-hero.jpg",
  ],
};

function resolveHeroSlides(title: string, bannerImage?: string): string[] {
  if (bannerImage) return [bannerImage];
  const lower = title.toLowerCase();
  if (lower.includes("slot") || lower.includes("spin") || lower.includes("jackpot")) {
    return THEME_SLIDES_MAP.slots;
  }
  if (lower.includes("bet") || lower.includes("sport") || lower.includes("odds")) {
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
  if (lower.includes("bonus") || lower.includes("promo") || lower.includes("reward")) {
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = resolveHeroSlides(title, bannerImage);
  const activeBanner = slides[currentSlide % slides.length];

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const derivedBadge =
    badgeText ||
    (isHomepage
      ? "INDEPENDENT CASINO RESEARCH & REVIEWS"
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
    <section className="relative">
      {/* ============================================================ */}
      {/* MOBILE LAYOUT (sm:hidden) - STACKED: Image Top, Text Below  */}
      {/* No text/image overlap, clear visuals and comfortable reading */}
      {/* ============================================================ */}
      <div className="sm:hidden w-full overflow-hidden rounded-2xl shadow-md border border-slate-800/80 bg-[#0B1120]">
        {/* 1. Mobile Visual Banner (Image Only with carousel controls) */}
        <div className="relative w-full h-[180px] bg-slate-950 overflow-hidden">
          <Image
            src={activeBanner}
            alt={`${title} - Casino Reviews Book Banner`}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-black/30" />

          {/* Carousel Arrows on Image */}
          {slides.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                aria-label="Previous slide"
                className="
                  absolute left-2.5 top-1/2 -translate-y-1/2
                  z-10 w-8 h-8 rounded-full
                  bg-black/60 hover:bg-black/85 text-white
                  border border-white/20 backdrop-blur-xs
                  flex items-center justify-center transition
                  active:scale-95 shadow-md
                "
              >
                <ChevronLeft className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next slide"
                className="
                  absolute right-2.5 top-1/2 -translate-y-1/2
                  z-10 w-8 h-8 rounded-full
                  bg-black/60 hover:bg-black/85 text-white
                  border border-white/20 backdrop-blur-xs
                  flex items-center justify-center transition
                  active:scale-95 shadow-md
                "
              >
                <ChevronRight className="w-4 h-4 text-white" />
              </button>

              {/* Slide Dots Indicator */}
              <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/10">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      i === currentSlide % slides.length
                        ? "w-4 bg-amber-400"
                        : "w-1.5 bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* 2. Mobile Content Area (Zero overlap with the banner image) */}
        <div className="p-4 sm:p-5 flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 border border-amber-400/40 shadow-xs mb-3">
            <Sparkles className="w-3 h-3 text-white" />
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-white">
              {derivedBadge}
            </span>
          </div>

          {isHomepage ? (
            <>
              {/* Homepage H1 & Subtitle */}
              <h1 className="font-['Poppins'] font-black text-[20px] text-white leading-snug mb-1.5 tracking-tight">
                Independent Online Casino Reviews
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 block text-[13px] font-bold mt-1">
                  For Players Who Want Facts Before They Deposit
                </span>
              </h1>

              <p className="text-xs text-slate-300 mb-4 leading-relaxed font-normal max-w-sm">
                We check licensing, KYC, bonus terms, payment gateways, and withdrawal speeds to provide objective casino reviews. Availability depends on your country and local rules.
              </p>

              {/* Mobile CTAs */}
              <div className="flex flex-col gap-2.5 w-full">
                <Link
                  href="/compare-casinos"
                  className="w-full h-11 flex items-center justify-center transition active:scale-95"
                >
                  <div className="w-full h-full rounded-[100px] border border-amber-200/50 bg-[linear-gradient(90deg,#FF990A_0%,#FFC23E_25%,#FFE45E_50%,#FFC23E_75%,#FF990A_100%)] shadow-[inset_0px_-3px_0px_0px_#B45B1B,0px_2px_8px_rgba(0,0,0,0.3)] flex items-center justify-center px-4 text-[13px] font-black text-[#16171D] tracking-wider uppercase">
                    Compare Casino Reviews
                  </div>
                </Link>

                <a
                  href="#methodology"
                  className="w-full h-11 rounded-[100px] border border-white/20 bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-[12px] font-bold text-white transition active:scale-95"
                >
                  See How We Test
                </a>
              </div>
            </>
          ) : (
            <>
              {/* Category Page Title */}
              <h1 className="font-['Poppins'] font-black text-[22px] text-white leading-tight mb-2 tracking-tight">
                Find The Best{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">
                  {title}
                </span>
              </h1>

              <p className="text-xs text-slate-300 mb-4 leading-relaxed max-w-sm">
                {subtitle ||
                  "Explore honest online casino reviews, exclusive deposit bonuses, and verified crypto gambling sites tested for safety."}
              </p>

              <button className="w-full h-11 rounded-[100px] border border-amber-200/50 bg-[linear-gradient(90deg,#FF990A_0%,#FFC23E_25%,#FFE45E_50%,#FFC23E_75%,#FF990A_100%)] shadow-[inset_0px_-3px_0px_0px_#B45B1B,0px_2px_8px_rgba(0,0,0,0.3)] flex items-center justify-center px-4 text-[13px] font-black text-[#16171D] tracking-wider uppercase transition active:scale-95">
                PLAY NOW
              </button>
            </>
          )}
        </div>
      </div>

      {/* ============================================================ */}
      {/* DESKTOP / TABLET LAYOUT (hidden sm:block)                    */}
      {/* Full-width visual banner with side overlay text              */}
      {/* ============================================================ */}
      <div className="hidden sm:block relative w-full h-[440px] lg:h-[510px] overflow-hidden rounded-2xl shadow-lg bg-slate-950">
        {/* Background Image with LCP priority */}
        <Image
          src={activeBanner}
          alt={`${title} - Casino Reviews Book Banner`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1280px"
          className="object-cover object-right lg:object-center"
        />

        {/* High-Contrast Directional Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-950/40 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/25 z-[1]" />

        {/* Left Arrow (only visible if multiple slides) */}
        {slides.length > 1 && (
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="
              absolute left-4 top-1/2 -translate-y-1/2
              z-20 w-10 h-10 rounded-full
              bg-slate-900/60 hover:bg-slate-900/90 text-white
              border border-white/20 backdrop-blur-sm
              flex items-center justify-center transition-colors shadow-md
            "
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
        )}

        {/* Right Arrow (only visible if multiple slides) */}
        {slides.length > 1 && (
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="
              absolute right-4 top-1/2 -translate-y-1/2
              z-20 w-10 h-10 rounded-full
              bg-slate-900/60 hover:bg-slate-900/90 text-white
              border border-white/20 backdrop-blur-sm
              flex items-center justify-center transition-colors shadow-md
            "
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        )}

        {/* Hero Content */}
        <div
          className="
            relative z-10
            h-full
            flex
            items-center
            px-6
            sm:px-10
            lg:pl-[80px]
          "
        >
          <div
            className="
              w-full
              max-w-[580px]
              flex flex-col
              items-center sm:items-start
              text-center sm:text-left
            "
          >
            {/* High-Contrast Badge */}
            <div
              className="
                inline-flex items-center gap-1.5
                px-4 py-1.5
                rounded-full
                bg-gradient-to-r from-amber-500 to-orange-500
                border border-amber-400/40
                shadow-md
                mb-3.5
              "
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-white">
                {derivedBadge}
              </span>
            </div>

            {isHomepage ? (
              <>
                {/* H1 - Verification First */}
                <h1
                  className="
                    font-['Poppins']
                    font-black
                    text-[28px] sm:text-[34px] lg:text-[40px]
                    text-white
                    leading-[1.18]
                    mb-3
                    tracking-tight
                    drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]
                  "
                >
                  Independent Online Casino Reviews
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 block text-[18px] sm:text-[22px] lg:text-[26px] font-bold mt-1">
                    For Players Who Want Facts Before They Deposit
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-xs sm:text-sm text-slate-200 max-w-[500px] mb-5 leading-relaxed font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                  We check licensing, KYC, bonus terms, payment gateways, and withdrawal speeds to provide objective casino reviews. Availability depends on your country and local rules.
                </p>

                {/* Dual CTAs */}
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto mb-4">
                  <Link
                    href="/compare-casinos"
                    className="
                      w-full sm:w-auto
                      h-[50px] lg:h-[54px]
                      flex items-center justify-center
                      transition-all duration-200
                      hover:scale-105 active:scale-95
                    "
                  >
                    <div
                      className="
                        w-full h-full
                        rounded-[100px]
                        border border-amber-200/50
                        bg-[linear-gradient(90deg,#FF990A_0%,#FFC23E_25%,#FFE45E_50%,#FFC23E_75%,#FF990A_100%)]
                        shadow-[inset_0px_-3px_0px_0px_#B45B1B,0px_2px_8px_rgba(0,0,0,0.3)]
                        flex items-center justify-center
                        gap-2
                        px-6
                        text-[13px] lg:text-[14px]
                        font-black
                        text-[#16171D]
                        tracking-wider
                        uppercase
                      "
                    >
                      Compare Casino Reviews
                    </div>
                  </Link>

                  <a
                    href="#methodology"
                    className="
                      w-full sm:w-auto
                      h-[50px] lg:h-[54px]
                      px-6
                      rounded-[100px]
                      border border-white/40
                      bg-white/15 hover:bg-white/25
                      backdrop-blur-md
                      flex items-center justify-center
                      text-[13px] lg:text-[14px]
                      font-bold text-white
                      transition-all duration-200
                      hover:scale-105 active:scale-95
                      cursor-pointer
                      shadow-sm
                    "
                  >
                    See How We Test
                  </a>
                </div>
              </>
            ) : (
              <>
                {/* Standard Category / Topic Title */}
                <h1
                  className="
                    font-['Poppins']
                    font-black
                    text-[28px] sm:text-[38px] lg:text-[46px]
                    text-white
                    leading-[1.18]
                    mb-3
                    tracking-tight
                    drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]
                  "
                >
                  Find The Best
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">
                    {title}
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-xs sm:text-sm text-slate-200 max-w-[460px] mb-6 leading-relaxed font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                  {subtitle ||
                    "Explore honest online casino reviews, exclusive deposit bonuses, and verified crypto gambling sites tested for safety."}
                </p>

                {/* Play Now CTA Button */}
                <button
                  className="
                    w-[180px] lg:w-[210px]
                    h-[56px] lg:h-[64px]
                    rounded-[100px]
                    border-2 border-white/80
                    p-1.5
                    bg-white/10
                    backdrop-blur-md
                    shadow-[0px_4px_25px_0px_rgba(255,153,10,0.45)]
                    flex items-center justify-center
                    transition-all duration-200
                    hover:scale-105 active:scale-95
                  "
                >
                  <div
                    className="
                      w-full h-full
                      rounded-[100px]
                      border border-amber-200/50
                      bg-[linear-gradient(90deg,#FF990A_0%,#FFC23E_25%,#FFE45E_50%,#FFC23E_75%,#FF990A_100%)]
                      shadow-[inset_0px_-3px_0px_0px_#B45B1B,0px_2px_8px_rgba(0,0,0,0.3)]
                      flex items-center justify-center
                      gap-2
                      px-6
                      text-[15px] lg:text-[16px]
                      font-black
                      text-[#16171D]
                      tracking-wider
                      uppercase
                    "
                  >
                    PLAY NOW
                  </div>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}