import Link from "next/link";
import {
  ShieldCheck,
  Award,
  Zap,
  CheckCircle2,
  Scale,
  Sparkles,
  HelpCircle,
  Lock,
} from "lucide-react";

export function HomeSEOSection() {
  return (
    <section className="w-full py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 lg:p-12 shadow-sm">
        
        {/* Header Badge & Title */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#2E68FB] text-xs font-bold uppercase tracking-wider mb-3 border border-blue-100">
            <ShieldCheck className="w-4 h-4" />
            Independent iGaming Research & Advocacy
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0F172A] tracking-tight leading-tight">
            Trusted Online Casino Reviews & Expert Gambling Guides
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Welcome to <strong>Casino Reviews Book</strong>, your premier independent portal for vetted online casino ratings, exclusive welcome bonuses, and safe gaming insights. Our dedicated team of industry analysts tests every operator with real money deposits, rigorous payout audits, and strict licensing verification.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          
          <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/80">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#2E68FB] flex items-center justify-center font-bold mb-3">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#0F172A] mb-2">
              Unbiased Hands-On Reviews
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We never accept paid placements to inflate ratings. Explore our audited directory of{" "}
              <Link href="/casinos/online-casino" className="text-[#2E68FB] font-semibold underline hover:text-blue-700">
                online casinos
              </Link>{" "}
              and use our side-by-side{" "}
              <Link href="/compare-casinos" className="text-[#2E68FB] font-semibold underline hover:text-blue-700">
                casino comparison tool
              </Link>{" "}
              to evaluate payout speeds, game providers, and withdrawal limits.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/80">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold mb-3">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#0F172A] mb-2">
              Verified Casino Bonuses
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Find transparent promotions with fair wagering terms. From generous{" "}
              <Link href="/bonuses/welcome-bonuses" className="text-[#2E68FB] font-semibold underline hover:text-blue-700">
                welcome bonuses
              </Link>{" "}
              and risk-free{" "}
              <Link href="/bonuses/no-deposit-bonuses" className="text-[#2E68FB] font-semibold underline hover:text-blue-700">
                no deposit offers
              </Link>{" "}
              to weekly{" "}
              <Link href="/bonuses/free-spins-bonuses" className="text-[#2E68FB] font-semibold underline hover:text-blue-700">
                free spins
              </Link>
              , our fine-print scans protect players from predatory rollover requirements.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/80">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-3">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#0F172A] mb-2">
              Crypto & Provably Fair
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Step into modern Web3 iGaming with top-tier{" "}
              <Link href="/casinos/crypto-casinos" className="text-[#2E68FB] font-semibold underline hover:text-blue-700">
                crypto casinos
              </Link>
              . Learn how to verify game outcomes in real-time with our complete{" "}
              <Link href="/provably-fair" className="text-[#2E68FB] font-semibold underline hover:text-blue-700">
                Provably Fair guide
              </Link>
              , or celebrate industry leaders in our annual{" "}
              <Link href="/awards" className="text-[#2E68FB] font-semibold underline hover:text-blue-700">
                iGaming Awards
              </Link>
              .
            </p>
          </div>

        </div>

        {/* Informative Copy & Responsible Gaming Directive */}
        <div className="pt-6 border-t border-slate-100 grid grid-cols-1 lg:grid-cols-2 gap-8 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <div>
            <h4 className="font-bold text-sm text-[#0F172A] mb-2">
              How We Evaluate Online Casinos
            </h4>
            <p className="mb-2">
              Every casino brand featured on Casino Reviews Book undergoes an extensive 6-step testing pipeline. We confirm active licenses with authorities such as the Malta Gaming Authority (MGA) and UK Gambling Commission (UKGC), mystery-shop withdrawal processing times, test mobile UI responsiveness, and evaluate responsive 24/7 customer support.
            </p>
            <p>
              Check out our in-depth{" "}
              <Link href="/guides" className="text-[#2E68FB] font-semibold underline hover:text-blue-700">
                casino strategy guides
              </Link>{" "}
              to master blackjack, roulette, and slot mechanics before you wager real funds.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-sm text-[#0F172A] mb-2">
              Safe Gaming & Player Advocacy
            </h4>
            <p className="mb-2">
              We take responsible gambling seriously. Online gambling is a form of entertainment—never an investment or debt-relief solution. Set strict deposit limits, never chase losses, and take regular breaks.
            </p>
            <p>
              If gambling is causing you stress, explore our{" "}
              <Link href="/responsible-gambling" className="text-[#2E68FB] font-semibold underline hover:text-blue-700">
                Responsible Gambling tools
              </Link>{" "}
              or contact confidential support services like GambleAware and GamCare.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
