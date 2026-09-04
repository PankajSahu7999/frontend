"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Search,
  TrendingUp,
  Award,
  Globe,
  Sparkles,
  Scale,
  HeartHandshake,
  BookOpen,
  HelpCircle,
  AlertTriangle,
  Ban,
  UserCheck,
  Zap,
  ExternalLink,
  Building2,
  ChevronRight,
  FileCheck2,
  Lock,
} from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen ">
      <section className="relative overflow-hidden ">
        <div className=" mx-auto  relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Main Value Proposition */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-bold tracking-wider uppercase text-[#2E68FB]">
                <ShieldCheck className="w-4 h-4 text-[#00B67A]" />
                Independent iGaming Directory & Auditing
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0F172A] tracking-tight leading-[1.12]">
                Setting the Standard for <br className="hidden sm:inline" />
                <span className="text-[#2E68FB]">Casino Transparency</span>
              </h1>

              <p className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
                Casino Reviews Book is an independent iGaming directory and
                research portal. We conduct hands-on testing, audit payouts, and
                analyze bonus terms to protect players in regulated gaming
                markets globally.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/"
                  className="w-full sm:w-auto h-12 px-8 rounded-xl bg-[#2E68FB] hover:bg-[#2556D6] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/20 active:scale-95"
                >
                  Browse Audited Casinos
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#methodology"
                  className="w-full sm:w-auto h-12 px-8 rounded-xl bg-white hover:bg-gray-50 border border-gray-300 text-[#0F172A] font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  Our Audit Process
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-blue-200/60 flex flex-wrap justify-center lg:justify-start gap-6 text-xs font-semibold text-[#475569]">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00B67A]" /> Zero Paid
                  Placement
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00B67A]" /> Real Money
                  Testing
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00B67A]" /> Daily Term
                  Audits
                </span>
              </div>
            </div>

            {/* Right Column: Hero Card Component */}
            <div className="lg:col-span-5">
              {/* Gradient Border Wrapper */}
              <div
                className="rounded-[18px] p-[2px]"
                style={{
                  background:
                    "linear-gradient(158.37deg, #FF9C2C 2.3%, #FFF1CC 15.9%, #B45B1B 24.24%, #FFC170 62.4%, #FEE5B3 75.76%, #9F5E26 90.07%)",
                }}
              >
                <div className="bg-white/90 backdrop-blur-md rounded-[16px] p-6 sm:p-8 shadow-xl shadow-blue-900/5 relative">
                  {/* Header */}
                  <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#2E68FB]/10 flex items-center justify-center text-[#2E68FB]">
                        <Scale className="w-5 h-5" />
                      </div>

                      <div>
                        <h3 className="text-[#0F172A] font-bold text-sm">
                          Editorial Guarantee
                        </h3>

                        <p className="text-xs text-[#64748B]">
                          Independent Rating Engine
                        </p>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 rounded-md bg-[#00B67A]/10 text-[#00B67A] text-[11px] font-bold uppercase tracking-wider">
                      Verified
                    </span>
                  </div>

                  {/* Audit Points */}
                  <div className="py-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-50 text-[#2E68FB] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold border border-blue-100">
                        1
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-[#0F172A]">
                          KYC & License Verification
                        </h4>

                        <p className="text-xs text-[#64748B] mt-0.5">
                          Cross-referencing operator numbers with MGA, UKGC,
                          Curacao eGaming, and state registries.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-50 text-[#2E68FB] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold border border-blue-100">
                        2
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-[#0F172A]">
                          Withdrawal Speed Audits
                        </h4>

                        <p className="text-xs text-[#64748B] mt-0.5">
                          Mystery shopping payout procedures via Crypto, Bank
                          Transfer, and e-Wallets.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-50 text-[#2E68FB] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold border border-blue-100">
                        3
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-[#0F172A]">
                          Terms Fine-Print Scan
                        </h4>

                        <p className="text-xs text-[#64748B] mt-0.5">
                          Identifying predatory max-win caps, wagering traps,
                          and restricted game terms.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-[#64748B]">
                    <span>Last Audit Cycle:</span>

                    <span className="text-[#0F172A] font-semibold">
                      Updated Weekly
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. LIVE METRICS & STATS BAR ================= */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto  sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            <div className="pt-4 sm:pt-0">
              <div className="text-3xl lg:text-4xl font-extrabold text-[#0F172A]">
                350+
              </div>
              <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider mt-1">
                Casinos Audited
              </div>
            </div>
            <div className="pt-4 sm:pt-0">
              <div className="text-3xl lg:text-4xl font-extrabold text-[#2E68FB]">
                $1.2M+
              </div>
              <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider mt-1">
                Tracked Payouts
              </div>
            </div>
            <div className="pt-4 sm:pt-0">
              <div className="text-3xl lg:text-4xl font-extrabold text-[#0F172A]">
                45+
              </div>
              <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider mt-1">
                Blacklisted Sites
              </div>
            </div>
            <div className="pt-4 sm:pt-0">
              <div className="text-3xl lg:text-4xl font-extrabold text-[#0F172A]">
                100%
              </div>
              <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider mt-1">
                Independent Ratings
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. WHO WE ARE & MISSION ================= */}
      <section className="py-10 max-w-7xl mx-auto  sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2E68FB]">
              <Building2 className="w-4 h-4" />
              Corporate Identity & Objective
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] leading-tight">
              Solving the Information Asymmetry in Online Gambling
            </h2>

            <p className="text-[#475569] text-base leading-relaxed">
              Founded to bridge the trust gap between online casino operators
              and players, <strong>Casino Reviews Book</strong> operates as a
              dedicated review framework and consumer advocacy portal.
            </p>

            <p className="text-[#475569] text-base leading-relaxed">
              The online gambling ecosystem is flooded with aggressive
              promotional marketing, misleading bonus headlines, and hidden
              terms. Our mission is simple:{" "}
              <strong>
                provide data-backed, verified research so players can make
                informed choices before depositing a single dollar.
              </strong>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white border border-gray-200/80 shadow-sm">
                <div className="font-bold text-[#0F172A] text-sm flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-[#2E68FB]" /> Expert
                  Testers
                </div>
                <p className="text-xs text-[#64748B] mt-1">
                  Every review is authored by experienced industry analysts.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-gray-200/80 shadow-sm">
                <div className="font-bold text-[#0F172A] text-sm flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#D97706]" /> Real-Time Updates
                </div>
                <p className="text-xs text-[#64748B] mt-1">
                  Expired bonuses and modified T&Cs are flagged immediately.
                </p>
              </div>
            </div>
          </div>

          {/* Light-Themed Directives Card */}
          <div className="relative">
            <div className="bg-gradient-to-br from-white to-[#F1F5F9] border border-blue-100 rounded-3xl p-8 shadow-xl shadow-blue-900/5 space-y-6">
              <h3 className="text-xl font-bold text-[#0F172A] border-b border-gray-200 pb-4 flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-[#2E68FB]" />
                Our Core Directives
              </h3>

              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#2E68FB] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-[#0F172A]">
                      Consumer Protection
                    </h4>
                    <p className="text-xs text-[#64748B] mt-1">
                      We explicitly call out non-licensed operations and
                      unreasonable bonus restrictions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#2E68FB] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-[#0F172A]">
                      Data Accuracy
                    </h4>
                    <p className="text-xs text-[#64748B] mt-1">
                      All RTP claims, payment processing limits, and game
                      software suites are manually checked.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#2E68FB] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-[#0F172A]">
                      Regulatory Compliance
                    </h4>
                    <p className="text-xs text-[#64748B] mt-1">
                      We respect territorial legal frameworks and promote only
                      legal, permitted options per jurisdiction.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. HOW WE AUDIT (METHODOLOGY PIPELINE) ================= */}
      <section id="methodology" className=" py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2E68FB] mb-3 block">
              Auditing Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A]">
              Our 6-Step Casino Evaluation Framework
            </h2>
            <p className="mt-4 text-[#475569] text-base">
              We don't rely on promotional media kits. Every casino brand passes
              through our hands-on testing pipeline before receiving a rank.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Step Cards */}
            {[
              {
                step: "01",
                title: "Licensing & Ownership Check",
                desc: "We confirm valid corporate entity registration and cross-check license numbers with regulatory bodies including MGA, UKGC, and Curacao eGaming.",
              },
              {
                step: "02",
                title: "Account Setup & KYC Testing",
                desc: "We register real accounts to measure identity verification requirements, geo-restriction blocks, and overall platform usability.",
              },
              {
                step: "03",
                title: "Deposit & Bonus Claim",
                desc: "We deposit real funds using various payment methods to verify if welcome offers, free spins, and match bonuses credit accurately.",
              },
              {
                step: "04",
                title: "Software & Game Testing",
                desc: "We play slots, table games, and live dealer games to verify RNG certification, developer authenticity, and mobile performance.",
              },
              {
                step: "05",
                title: "Real Money Withdrawal Audit",
                desc: "We request withdrawals to test processing timelines, hidden fees, pending periods, and document submission requests.",
              },
              {
                step: "06",
                title: "Support Escalation Test",
                desc: "We submit technical and payment inquiries via Live Chat and Email at off-peak hours to score response times and agent knowledge.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#F8FAFC] border border-gray-200/90 hover:border-[#2E68FB] hover:bg-white hover:shadow-lg hover:shadow-blue-900/5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-[#2E68FB] text-white font-bold flex items-center justify-center text-sm mb-4 shadow-sm">
                  {item.step}
                </div>
                <h3 className="font-bold text-lg text-[#0F172A]">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-[#64748B] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 5. AFFILIATE DISCLOSURE & STANDARDS ================= */}
      <section className="py-10 ">
        <div className="bg-white border border-gray-200/90 rounded-3xl p-8 sm:p-12 shadow-sm">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2E68FB] mb-2 block">
              Commercial Disclosure & Standards
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
              How We Maintain Monetization Without Compromising Integrity
            </h2>
            <p className="mt-4 text-[#475569] text-sm sm:text-base leading-relaxed">
              Operating an international research platform requires funding.
              Casino Reviews Book participates in affiliate marketing programs.
              This means we may earn a referral commission when you click on
              outbound casino links and register an account.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-gray-100">
            <div className="space-y-3">
              <h3 className="font-bold text-[#0F172A] text-base flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#00B67A]" /> What Our
                Affiliate Policy Guarantees
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-[#475569]">
                <li>
                  • No operator can pay to alter rating algorithms or suppress
                  bad reviews.
                </li>
                <li>
                  • Commissions never increase player costs or alter promotional
                  terms.
                </li>
                <li>
                  • Higher compensation does not guarantee a higher placement on
                  comparison tables.
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-[#0F172A] text-base flex items-center gap-2">
                <Ban className="w-5 h-5 text-red-500" /> Reasons We Instantly
                Blacklist a Casino
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-[#475569]">
                <li>
                  • Confirmed non-payment or unreasonable delay of legitimate
                  player winnings.
                </li>
                <li>
                  • Operating without a verifiable gambling license in
                  advertised jurisdictions.
                </li>
                <li>
                  • Utilizing predatory terms (e.g., retroactively modifying
                  bonus requirements).
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 6. EDITORIAL LEADERSHIP ================= */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2E68FB] mb-3 block">
              Industry Knowledge
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A]">
              Led by Experienced iGaming Analysts
            </h2>
            <p className="mt-4 text-[#475569] text-base">
              Our team consists of former casino compliance officers,
              professional odds analysts, and veteran tech journalists.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-gray-200/90 text-center">
              <div className="w-20 h-20 rounded-full bg-blue-100 text-[#2E68FB] font-bold flex items-center justify-center text-xl mx-auto mb-4 border border-blue-200">
                EA
              </div>
              <h3 className="font-bold text-lg text-[#0F172A]">
                Editorial & Auditing
              </h3>
              <p className="text-xs font-bold text-[#2E68FB] mt-0.5">
                Compliance & Operations
              </p>
              <p className="text-xs text-[#64748B] mt-3 leading-relaxed">
                Specializing in European and North American gambling
                regulations, licensing audits, and fair play standards.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-gray-200/90 text-center">
              <div className="w-20 h-20 rounded-full bg-blue-100 text-[#2E68FB] font-bold flex items-center justify-center text-xl mx-auto mb-4 border border-blue-200">
                TA
              </div>
              <h3 className="font-bold text-lg text-[#0F172A]">
                Technical Research
              </h3>
              <p className="text-xs font-bold text-[#2E68FB] mt-0.5">
                Software & Security
              </p>
              <p className="text-xs text-[#64748B] mt-3 leading-relaxed">
                Focusing on RNG verification, cryptographic security protocols
                in crypto casinos, and mobile engine efficiency.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-gray-200/90 text-center">
              <div className="w-20 h-20 rounded-full bg-blue-100 text-[#2E68FB] font-bold flex items-center justify-center text-xl mx-auto mb-4 border border-blue-200">
                BA
              </div>
              <h3 className="font-bold text-lg text-[#0F172A]">
                Bonus & Market Analysis
              </h3>
              <p className="text-xs font-bold text-[#2E68FB] mt-0.5">
                Promotional Audits
              </p>
              <p className="text-xs text-[#64748B] mt-3 leading-relaxed">
                Dedicated to parsing complex rollover terms, max bet rules, and
                promotional playthrough conditions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 7. RESPONSIBLE GAMBLING DIRECTIVE ================= */}
      <section className="py-10">
        {/* Gradient Border Wrapper */}
        <div
          className="rounded-[24px] p-[2px]"
          style={{
            background:
              "linear-gradient(158.37deg, #FF9C2C 2.3%, #FFF1CC 15.9%, #B45B1B 24.24%, #FFC170 62.4%, #FEE5B3 75.76%, #9F5E26 90.07%)",
          }}
        >
          {/* White Content Area */}
          <div className="p-8 sm:p-12 rounded-[22px] bg-white text-[#0F172A] relative overflow-hidden shadow-sm">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-200/60 text-amber-900 text-xs font-bold uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 text-amber-700" />
                  Responsible Gaming Policy
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
                  Gambling Involves Risk. Play Responsibly.
                </h2>

                <p className="text-[#475569] text-sm leading-relaxed">
                  Online gambling should always be treated as a form of
                  entertainment, not an income strategy. Set deposit limits,
                  never chase losses, and stay within your financial means.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
                <a
                  href="https://www.begambleaware.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 px-6 rounded-xl bg-white border border-gray-300 hover:bg-gray-50 text-[#0F172A] text-xs font-bold flex items-center justify-center gap-2 transition shadow-sm"
                >
                  BeGambleAware.org
                  <ExternalLink className="w-3.5 h-3.5 text-[#64748B]" />
                </a>

                <a
                  href="https://www.gamblingtherapy.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition shadow-sm"
                >
                  Gambling Therapy
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 8. COMPREHENSIVE FAQ ================= */}
      <section className=" py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2E68FB] mb-3 block">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A]">
              Everything You Need to Know
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-gray-200/80">
              <h3 className="font-bold text-base text-[#0F172A] flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#2E68FB]" />
                How often are casino reviews updated?
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Our database is audited continuously. High-volume review pages
                are re-checked weekly for bonus code changes, license updates,
                or payment processing updates.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-gray-200/80">
              <h3 className="font-bold text-base text-[#0F172A] flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#2E68FB]" />
                Do you guarantee casino payouts?
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#64748B] leading-relaxed">
                No. While we audit payout behavior, we do not operate the
                casinos. We only recommend platforms holding valid regulatory
                licenses with track records of honoring player payouts.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-gray-200/80">
              <h3 className="font-bold text-base text-[#0F172A] flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#2E68FB]" />
                What should I do if I have a dispute with a listed casino?
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Contact our support channel. While we cannot legally act as
                arbitrators, we can reach out directly to affiliate account
                managers to request review of unresolved legitimate complaints.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-gray-200/80">
              <h3 className="font-bold text-base text-[#0F172A] flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#2E68FB]" />
                Are online casino bonuses worth claiming?
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#64748B] leading-relaxed">
                It depends on the wagering requirement. Bonuses with 30x–40x
                playthrough on bonus-only money offer good value; offers
                requiring 60x+ or high wagering on deposit+bonus should be
                carefully evaluated.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 9. LIGHT CALL-TO-ACTION ================= */}
      <section className="py-10 ">
        {/* Gradient Border Wrapper */}
        <div
          className="rounded-[24px] p-[2px]"
          style={{
            background:
              "linear-gradient(158.37deg, #FF9C2C 2.3%, #FFF1CC 15.9%, #B45B1B 24.24%, #FFC170 62.4%, #FEE5B3 75.76%, #9F5E26 90.07%)",
          }}
        >
          {/* Original Background */}
          <div
            className="rounded-[22px] p-10 sm:p-16 text-center relative overflow-hidden shadow-xl shadow-blue-900/5"
            style={{
              background:
                "linear-gradient(135deg, #FFFFFF 0%, #EFF6FF 50%, #F5F3FF 100%)",
            }}
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] relative z-10">
              Explore Verified & Audited Casinos
            </h2>

            <p className="mt-4 text-[#475569] max-w-2xl mx-auto text-sm sm:text-base relative z-10">
              Filter platforms by payment method, license region, game
              providers, and verified cash-out speeds.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4 relative z-10">
              <Link
                href="/"
                className="h-12 px-8 rounded-xl bg-[#2E68FB] hover:bg-[#2556D6] text-white font-bold text-sm flex items-center justify-center gap-2 transition shadow-md shadow-blue-500/20 active:scale-95"
              >
                Explore Directory
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/news"
                className="h-12 px-8 rounded-xl bg-white hover:bg-gray-50 border border-gray-300 text-[#0F172A] font-bold text-sm flex items-center justify-center gap-2 transition shadow-sm"
              >
                Latest iGaming Market News
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
