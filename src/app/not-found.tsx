import Link from "next/link";
import { Home, Dices, Gift, ArrowRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Casino Review Book",
  description: "The requested casino page, bonus, or review could not be found. Explore our top rated casino reviews and latest bonuses.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full text-center space-y-8">
        
        {/* Gradient Badge */}
        <div className="inline-flex rounded-full bg-[radial-gradient(circle_at_center,#FFE6B8_0%,#F1A214_100%)] p-[1px]">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF8E6] px-4 py-1.5">
            <span className="font-poppins text-xs font-bold uppercase tracking-wider text-[#D97706]">
              Error 404
            </span>
          </div>
        </div>

        {/* Big 404 & Heading */}
        <div className="space-y-3">
          <h1 className="text-6xl sm:text-7xl font-extrabold text-slate-900 tracking-tight">
            404
          </h1>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Page Not Found
          </h2>
          <p className="text-slate-500 max-w-md mx-auto text-base leading-relaxed">
            The page you are looking for might have been removed, renamed, or is temporarily unavailable.
          </p>
        </div>

        {/* Quick Action Navigation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-lg mx-auto pt-2">
          <Link
            href="/"
            className="flex items-center gap-3 p-4 rounded-2xl border border-slate-200 bg-white/80 hover:border-blue-500 hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Home className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Home</p>
              <p className="text-xs text-slate-500">Go to homepage</p>
            </div>
          </Link>

          <Link
            href="/casinos/online-casino"
            className="flex items-center gap-3 p-4 rounded-2xl border border-slate-200 bg-white/80 hover:border-blue-500 hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Dices className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Casinos</p>
              <p className="text-xs text-slate-500">Top rated brands</p>
            </div>
          </Link>

          <Link
            href="/bonuses/welcome-bonuses"
            className="flex items-center gap-3 p-4 rounded-2xl border border-slate-200 bg-white/80 hover:border-blue-500 hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Bonuses</p>
              <p className="text-xs text-slate-500">Latest promos</p>
            </div>
          </Link>
        </div>

        {/* Primary CTA */}
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/25 hover:brightness-105 active:scale-95 transition-all"
          >
            <span>Return to Homepage</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </main>
  );
}
