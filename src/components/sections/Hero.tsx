"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import Image from "next/image";

interface HeroProps {
  title?: string;
  subtitle?: string;
  badgeText?: string;
  bannerImage?: string;
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
    (title.toLowerCase().includes("slot")
      ? "PREMIER SLOTS"
      : title.toLowerCase().includes("bet")
      ? "SPORTSBOOK & ODDS"
      : title.toLowerCase().includes("game")
      ? "CASINO TABLE GAMES"
      : title.toLowerCase().includes("bonus")
      ? "EXCLUSIVE BONUSES"
      : "BEST ONLINE CASINOS");

  return (
    <section className="relative -mx-4 sm:mx-0">
      <div className="relative w-full h-[360px] sm:h-[420px] lg:h-[494px] overflow-hidden rounded-2xl shadow-lg bg-slate-950">
        {/* Background Image with LCP priority */}
        <Image
          src={activeBanner}
          alt={`${title} - Casino Reviews Book Banner`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1280px"
          className="object-cover object-right lg:object-center"
        />

        {/* High-Contrast Directional Overlay: Dark on text side, transparent on art side */}
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

        {/* Hero Content with Maximum Visual Contrast */}
        <div
          className="
            relative z-10
            h-full
            flex
            items-center
            px-6
            sm:px-10
            lg:pl-[90px]
          "
        >
          <div
            className="
              w-full
              max-w-[520px]
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
                mb-4
              "
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-white">
                {derivedBadge}
              </span>
            </div>

            {/* Dynamic Title with Guaranteed Contrast */}
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

            {/* Subtitle with Guaranteed Contrast */}
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
          </div>
        </div>
      </div>
    </section>
  );
}