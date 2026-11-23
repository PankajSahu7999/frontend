import Image from "next/image";
import Link from "next/link";
import CasinoCardDisclaimer from "@/components/CasinoCardDisclaimer";
import {
  TrendingUp,
  Star,
  ShieldCheck,
  Zap,
  ArrowRight,
  Award,
  Sparkles,
} from "lucide-react";

interface TrendingCasinoItem {
  name: string;
  slug: string;
  rating: string;
  badge: string;
  license: string;
  bonusText: string;
  withdrawalTime: string;
  logo: string;
}

const TRENDING_CASINOS: TrendingCasinoItem[] = [
  {
    name: "Spinit Casino",
    slug: "spinit-casino",
    rating: "5.0",
    badge: "Trending in Search",
    license: "Malta Gaming Authority (MGA)",
    bonusText: "100% Match + 200 Free Spins",
    withdrawalTime: "Under 24 Hours",
    logo: "https://res.cloudinary.com/dywankupt/image/upload/v1771732713/casino-website/wdwozzk3svuvpnw1fjou.png",
  },
  {
    name: "1Red Casino",
    slug: "1red-casino",
    rating: "5.0",
    badge: "Fast Cashouts",
    license: "Curacao Gaming Board",
    bonusText: "Up to €6,000 + 100 Free Spins",
    withdrawalTime: "Instant Crypto / 24h",
    logo: "https://res.cloudinary.com/dywankupt/image/upload/v1784608410/casino-website/ij3thioz1tgt0jqwrnjx.png",
  },
  {
    name: "Party Spinz Casino",
    slug: "party-spinz-casino",
    rating: "5.0",
    badge: "Top Mobile Play",
    license: "Curacao eGaming",
    bonusText: "Exclusive Welcome Spins & Reloads",
    withdrawalTime: "Instant / E-Wallets",
    logo: "https://res.cloudinary.com/dywankupt/image/upload/v1784665035/casino-website/kodwcbltqn84thov8p00.png",
  },
  {
    name: "Moolzy Casino",
    slug: "moolzy-casino",
    rating: "4.5",
    badge: "UK & International",
    license: "UKGC & International Regulators",
    bonusText: "Exclusive Verified Welcome Pack",
    withdrawalTime: "24-48 Hours",
    logo: "https://api.casinoreviewsbook.com/uploads/casinos/logos/np0pwzytafdo711t8urj_1793013798319_g97vld3jqmi.png",
  },
  {
    name: "LuckyBull Casino",
    slug: "luckybull-casino",
    rating: "4.5",
    badge: "High Roller Choice",
    license: "Malta Gaming Authority (MGA)",
    bonusText: "100% up to €888 + Loyalty Points",
    withdrawalTime: "1-2 Business Days",
    logo: "https://res.cloudinary.com/dywankupt/image/upload/v1759398121/casino-website/bbvofqvukqme5wzy2tys.png",
  },
  {
    name: "Casiny Casino",
    slug: "casiny-casino",
    rating: "5.0",
    badge: "Low Wagering",
    license: "Curacao Gaming Control Board",
    bonusText: "Triple Match Package + Cashback",
    withdrawalTime: "Under 24 Hours",
    logo: "https://res.cloudinary.com/dywankupt/image/upload/v1766631564/casino-website/fhhcw4k3yztgbwfkagqj.png",
  },
  {
    name: "Loki Casino",
    slug: "lokicasino",
    rating: "4.8",
    badge: "Player Favorite",
    license: "Curacao Gaming Control Board",
    bonusText: "100% Match Bonus + 100 Free Spins",
    withdrawalTime: "Instant / Crypto",
    logo: "https://res.cloudinary.com/dywankupt/image/upload/v1784641771/casino-website/ftid61so2d0msv62ncts.png",
  },
  {
    name: "BitStarz Casino",
    slug: "bitstarz-casino",
    rating: "4.9",
    badge: "Multi-Award Winner",
    license: "Curacao Gaming Control Board",
    bonusText: "5 BTC or $500 + 180 Free Spins",
    withdrawalTime: "Avg. 10 Minutes",
    logo: "https://res.cloudinary.com/dywankupt/image/upload/v1750723821/casino-website/mk5sajvb1hryffgbee6e.webp",
  },
];

export default function TrendingReviewsSection() {
  return (
    <section className="w-full py-10 my-4">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex rounded-full bg-[radial-gradient(circle_at_center,#B8CEFF_0%,#2E68FB_100%)] p-[1px]">
            <div className="flex items-center gap-1.5 rounded-full bg-[#E6EDFF] px-4 py-1">
              <TrendingUp className="w-3.5 h-3.5 text-[#2E68FB]" />
              <span className="font-poppins text-[10px] font-bold uppercase text-[#2E68FB]">
                Verified Player Trends &bull; Top Rated 2026
              </span>
            </div>
          </div>
          <h2 className="font-poppins text-[24px] sm:text-[32px] font-bold leading-tight text-[#16171D] mt-3 mb-2">
            Trending &amp; Most Popular Casino Reviews
          </h2>
          <p className="text-xs sm:text-sm text-[#475467] max-w-2xl leading-relaxed">
            In-depth expert audits of top-performing casinos. We verify licensing validity, payout speed, bonus wagering terms, and player protection before ranking.
          </p>
        </div>

        <Link
          href="/casinos"
          className="inline-flex items-center gap-2 h-11 px-5 rounded-xl font-bold text-xs text-white shadow-xs shrink-0 transition active:scale-95 hover:opacity-95"
          style={{
            background: "linear-gradient(180deg, #CDDCFB 0%, #588CF3 100%)",
            boxShadow: "0px 2px 0px 0px #2E68FB",
          }}
        >
          <span>View All 130+ Casino Reviews</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Grid of 8 High-Impact Casino Review Cards with Logos & Clear UI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5">
        {TRENDING_CASINOS.map((item) => (
          <div
            key={item.slug}
            className="group relative bg-white border-2 border-[#E9ECEF] hover:border-[#2E68FB] rounded-[20px] p-5 transition-all duration-200 hover:shadow-xl flex flex-col justify-between"
          >
            <div>
              {/* Top Row: Pill Badge + Star Rating */}
              <div className="flex items-center justify-between gap-2 mb-3.5">
                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-[#EEF4FF] text-[#1D4ED8] border border-[#BFDBFE]">
                  <Zap className="w-3 h-3 text-[#2E68FB]" />
                  {item.badge}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-black text-[#B45309] bg-[#FEF3C7] px-2.5 py-1 rounded-lg border border-[#FDE68A] shadow-xs">
                  <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                  {item.rating}
                </span>
              </div>

              {/* Logo + Casino Name Identity Header */}
              <div className="flex items-center gap-3.5 mb-3.5">
                <div className="relative w-14 h-14 rounded-xl bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-center p-1.5 shrink-0 group-hover:scale-105 transition-transform">
                  <Image
                    src={item.logo}
                    alt={`${item.name} logo`}
                    fill
                    className="object-contain p-1 rounded-lg"
                    unoptimized
                    loading="lazy"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-poppins text-[17px] font-bold text-[#0F172A] group-hover:text-[#2E68FB] transition-colors leading-tight truncate">
                    <Link href={`/casino/${item.slug}`} className="hover:underline">
                      {item.name}
                    </Link>
                  </h3>
                  <div className="flex items-center gap-1 text-[11px] font-medium text-[#059669] mt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#059669] shrink-0" />
                    <span className="truncate">{item.license}</span>
                  </div>
                </div>
              </div>

              {/* High-Clarity Welcome Bonus Box */}
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#F8FAFC] to-[#EEF4FF] border border-[#DBEAFE] mb-3">
                <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-[#2E68FB] mb-1">
                  <Sparkles className="w-3 h-3 text-[#2E68FB]" />
                  <span>Welcome Package</span>
                </div>
                <div className="text-[13px] font-extrabold text-[#0F172A] leading-snug line-clamp-2">
                  {item.bonusText}
                </div>
              </div>

              {/* Payout Speed Row */}
              <div className="flex items-center justify-between text-[11.5px] py-1.5 px-0.5 text-[#475467] mb-4 border-t border-[#F1F5F9]">
                <span className="font-medium text-[#64748B]">Payout Speed:</span>
                <span className="font-bold text-[#0F172A]">{item.withdrawalTime}</span>
              </div>
            </div>

            {/* High-Visibility Primary Call-to-Action Button */}
            <Link
              href={`/casino/${item.slug}`}
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#2E68FB] hover:bg-[#1D4ED8] active:scale-[0.98] shadow-sm hover:shadow-md transition-all duration-150"
            >
              <span>Read {item.name} Review</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            {/* Click-Only T&C Disclaimer */}
            <CasinoCardDisclaimer casinoName={item.name} />
          </div>
        ))}
      </div>

      {/* Strategic Category & Guide Hub Links */}
      <div className="mt-7 p-4.5 rounded-2xl bg-gradient-to-r from-[#F0F5FF] via-[#FAF5FF] to-[#F0FDF4] border border-[#2E68FB25] flex flex-wrap items-center justify-between gap-3 text-xs shadow-xs">
        <div className="flex items-center gap-2 text-[#0F172A] font-bold">
          <Award className="w-4 h-4 text-[#2E68FB]" />
          <span>Explore Key Casino Categories:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/bonuses/exclusive-bonuses"
            className="px-3.5 py-2 rounded-xl bg-white border border-[#CBD5E1] hover:border-[#2E68FB] text-[#0F172A] hover:text-[#2E68FB] font-bold transition shadow-2xs"
          >
            Exclusive Bonuses (2026)
          </Link>
          <Link
            href="/guides/crypto-gambling-101"
            className="px-3.5 py-2 rounded-xl bg-white border border-[#CBD5E1] hover:border-[#2E68FB] text-[#0F172A] hover:text-[#2E68FB] font-bold transition shadow-2xs"
          >
            Crypto Gambling Guide
          </Link>
          <Link
            href="/compare-casinos"
            className="px-3.5 py-2 rounded-xl bg-white border border-[#CBD5E1] hover:border-[#2E68FB] text-[#0F172A] hover:text-[#2E68FB] font-bold transition shadow-2xs"
          >
            Side-by-Side Casino Comparison
          </Link>
          <Link
            href="/awards"
            className="px-3.5 py-2 rounded-xl bg-white border border-[#CBD5E1] hover:border-[#2E68FB] text-[#0F172A] hover:text-[#2E68FB] font-bold transition shadow-2xs"
          >
            Annual Casino Awards
          </Link>
        </div>
      </div>
    </section>
  );
}
