import Link from "next/link";
import {
  TrendingUp,
  Star,
  ShieldCheck,
  Zap,
  ArrowRight,
  ExternalLink,
  Award,
} from "lucide-react";

interface TrendingCasinoItem {
  name: string;
  slug: string;
  rating: string;
  badge: string;
  license: string;
  bonusText: string;
  withdrawalTime: string;
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
  },
  {
    name: "1Red Casino",
    slug: "1red-casino",
    rating: "5.0",
    badge: "Fast Cashouts",
    license: "Curacao Gaming Board",
    bonusText: "Up to €6,000 + 100 Free Spins",
    withdrawalTime: "Instant Crypto / 24h",
  },
  {
    name: "Party Spinz Casino",
    slug: "party-spinz-casino",
    rating: "5.0",
    badge: "Top Mobile Play",
    license: "Curacao eGaming",
    bonusText: "Exclusive Welcome Spins & Reloads",
    withdrawalTime: "Instant / E-Wallets",
  },
  {
    name: "Moolzy Casino",
    slug: "moolzy-casino",
    rating: "4.5",
    badge: "UK & International",
    license: "UKGC & International Regulators",
    bonusText: "Exclusive Verified Welcome Pack",
    withdrawalTime: "24-48 Hours",
  },
  {
    name: "LuckyBull Casino",
    slug: "luckybull-casino",
    rating: "4.5",
    badge: "High Roller Choice",
    license: "Malta Gaming Authority (MGA)",
    bonusText: "100% up to €888 + Loyalty Points",
    withdrawalTime: "1-2 Business Days",
  },
  {
    name: "Casiny Casino",
    slug: "casiny-casino",
    rating: "5.0",
    badge: "Low Wagering",
    license: "Curacao Gaming Control Board",
    bonusText: "Triple Match Package + Cashback",
    withdrawalTime: "Under 24 Hours",
  },
  {
    name: "Loki Casino",
    slug: "lokicasino",
    rating: "4.8",
    badge: "Player Favorite",
    license: "Curacao Gaming Control Board",
    bonusText: "100% Match Bonus + 100 Free Spins",
    withdrawalTime: "Instant / Crypto",
  },
  {
    name: "BitStarz Casino",
    slug: "bitstarz-casino",
    rating: "4.9",
    badge: "Multi-Award Winner",
    license: "Curacao Gaming Control Board",
    bonusText: "5 BTC or $500 + 180 Free Spins",
    withdrawalTime: "Avg. 10 Minutes",
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

      {/* Grid of 8 High-Impact Casino Review Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {TRENDING_CASINOS.map((item) => (
          <div
            key={item.slug}
            className="group relative bg-white border border-[#E4E7EC] hover:border-[#2E68FB80] rounded-[18px] p-4.5 transition-all duration-200 hover:shadow-md flex flex-col justify-between"
          >
            <div>
              {/* Badge & Rating */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#E6EDFF] text-[#2E68FB] border border-[#2E68FB30]">
                  <Zap className="w-3 h-3 text-[#2E68FB]" />
                  {item.badge}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#F59E0B] bg-[#FFFBEB] px-2 py-0.5 rounded-md border border-[#FDE68A]">
                  <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                  {item.rating}
                </span>
              </div>

              {/* Casino Title as Direct Internal Link */}
              <h3 className="font-poppins text-[16px] font-bold text-[#16171D] group-hover:text-[#2E68FB] transition-colors mb-1.5 leading-snug">
                <Link href={`/casino/${item.slug}`} className="hover:underline">
                  {item.name}
                </Link>
              </h3>

              {/* Licensing Trust Signal */}
              <div className="flex items-center gap-1.5 text-[11px] text-[#475467] mb-2.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                <span className="truncate">{item.license}</span>
              </div>

              {/* Bonus Offer */}
              <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] mb-3">
                <div className="text-[10px] uppercase font-bold text-[#64748B] mb-0.5">
                  Welcome Package
                </div>
                <div className="text-xs font-bold text-[#0F172A] line-clamp-1">
                  {item.bonusText}
                </div>
              </div>

              {/* Withdrawal Speed */}
              <div className="text-[11px] text-[#64748B] flex items-center justify-between mb-4">
                <span>Payout Speed:</span>
                <span className="font-semibold text-[#0F172A]">{item.withdrawalTime}</span>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              href={`/casino/${item.slug}`}
              className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-3 rounded-xl text-xs font-bold text-[#2E68FB] bg-[#F0F5FF] hover:bg-[#2E68FB] hover:text-white transition-colors border border-[#2E68FB30]"
            >
              <span>Read {item.name} Review</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}
      </div>

      {/* SEO Strategic Pillar Hub Links */}
      <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-[#F0F5FF] to-[#FAF5FF] border border-[#2E68FB20] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-[#1E293B] font-semibold">
          <Award className="w-4 h-4 text-[#2E68FB]" />
          <span>Explore Key Casino Categories:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/bonuses/exclusive-bonuses"
            className="px-3 py-1.5 rounded-lg bg-white border border-[#CBD5E1] hover:border-[#2E68FB] text-[#1E293B] hover:text-[#2E68FB] font-medium transition"
          >
            Exclusive Bonuses (2026)
          </Link>
          <Link
            href="/guides/crypto-gambling-101"
            className="px-3 py-1.5 rounded-lg bg-white border border-[#CBD5E1] hover:border-[#2E68FB] text-[#1E293B] hover:text-[#2E68FB] font-medium transition"
          >
            Crypto Gambling Guide
          </Link>
          <Link
            href="/compare-casinos"
            className="px-3 py-1.5 rounded-lg bg-white border border-[#CBD5E1] hover:border-[#2E68FB] text-[#1E293B] hover:text-[#2E68FB] font-medium transition"
          >
            Side-by-Side Casino Comparison
          </Link>
          <Link
            href="/awards"
            className="px-3 py-1.5 rounded-lg bg-white border border-[#CBD5E1] hover:border-[#2E68FB] text-[#1E293B] hover:text-[#2E68FB] font-medium transition"
          >
            Annual Casino Awards
          </Link>
        </div>
      </div>
    </section>
  );
}
