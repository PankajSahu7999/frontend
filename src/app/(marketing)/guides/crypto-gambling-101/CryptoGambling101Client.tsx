"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Coins,
  ShieldCheck,
  Zap,
  Lock,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  Wallet,
  Globe,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  Key,
  Calculator,
  ShieldAlert,
  ArrowUpRight,
  Check,
  Smartphone,
  HardDrive,
  Copy,
} from "lucide-react";

// --- Types & Data ---
interface CryptoNetwork {
  name: string;
  ticker: string;
  avgSpeed: string;
  avgFee: string;
  volatility: "Low" | "Medium" | "High";
  suitability: string;
  badge?: string;
  recommendedFor: string;
}

const NETWORKS: CryptoNetwork[] = [
  {
    name: "Tether (USDT - Polygon/TRON)",
    ticker: "USDT",
    avgSpeed: "1 – 3 Mins",
    avgFee: "< $0.50",
    volatility: "Low",
    suitability: "Best for Bankroll Stability",
    badge: "Popular",
    recommendedFor: "Players wanting zero price volatility risks.",
  },
  {
    name: "Litecoin",
    ticker: "LTC",
    avgSpeed: "2 – 5 Mins",
    avgFee: "< $0.05",
    volatility: "Medium",
    suitability: "Lowest Network Fees",
    badge: "Best Value",
    recommendedFor: "Small-to-medium deposits and quick micro-cashouts.",
  },
  {
    name: "Solana",
    ticker: "SOL",
    avgSpeed: "5 – 10 Secs",
    avgFee: "< $0.01",
    volatility: "High",
    suitability: "Ultra Fast Execution",
    badge: "Lightning Fast",
    recommendedFor: "Instant high-frequency micro-bets and dApp casinos.",
  },
  {
    name: "Bitcoin",
    ticker: "BTC",
    avgSpeed: "10 – 30 Mins",
    avgFee: "$1.50 – $12.00",
    volatility: "Medium",
    suitability: "Universal Acceptance",
    recommendedFor: "High rollers making large batch deposits.",
  },
  {
    name: "Ethereum (Mainnet)",
    ticker: "ETH",
    avgSpeed: "2 – 5 Mins",
    avgFee: "$3.00 – $25.00+",
    volatility: "High",
    suitability: "High Security Standard",
    recommendedFor: "Whale deposits and high-value VIP players.",
  },
];

export default function CryptoGambling101Client() {
  // 1. Calculator State
  const [monthlyVolume, setMonthlyVolume] = useState<number>(1000);
  const [monthlyCashouts, setMonthlyCashouts] = useState<number>(4);

  // 2. Onboarding Stepper State
  const [activeStep, setActiveStep] = useState<number>(1);

  // 3. Wallet Picker Interactive State
  const [selectedWalletType, setSelectedWalletType] = useState<
    "extension" | "mobile" | "hardware"
  >("extension");

  // 4. Provably Fair Interactive Sandbox State
  const [serverSeed, setServerSeed] = useState<string>(
    "c0f2e32a67e9140d3a51f89bc9820f1883712d9b626d0a",
  );
  const [clientSeed, setClientSeed] = useState<string>(
    "my_custom_lucky_seed_2026",
  );
  const [nonce, setNonce] = useState<number>(1);
  const [verifying, setVerifying] = useState<boolean>(false);
  const [generatedHash, setGeneratedHash] = useState<string>(
    "9d8e7f1a...b2c34d5e",
  );
  const [gameResult, setGameResult] = useState<number>(87.42);

  // 5. Security Checklist State
  const [checkedSecurity, setCheckedSecurity] = useState<
    Record<string, boolean>
  >({});

  // 6. Network Filter State
  const [networkSearch, setNetworkSearch] = useState<string>("");

  // 7. FAQ State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Dynamic Savings Calculations (Crypto vs Fiat)
  const savingsMetrics = useMemo(() => {
    // Fiat calculations: 3.5% deposit/withdrawal fee + $15 wire/cashout fee + conversion rate lost (~2%)
    const fiatFees =
      monthlyVolume * 0.035 + monthlyCashouts * 15 + monthlyVolume * 0.02;
    // Crypto calculations: ~0.5% average bridge/network fees + $0.10 network fee
    const cryptoFees = monthlyVolume * 0.005 + monthlyCashouts * 0.1;
    const netSaved = Math.max(0, fiatFees - cryptoFees);
    const fiatTimeWaitDays = monthlyCashouts * 3; // 3 days per cashout

    return { fiatFees, cryptoFees, netSaved, fiatTimeWaitDays };
  }, [monthlyVolume, monthlyCashouts]);

  // Provably Fair Simulator Execution
  const handleRunVerification = () => {
    setVerifying(true);
    setTimeout(() => {
      const mockHash = Array.from({ length: 24 }, () =>
        Math.floor(Math.random() * 16).toString(16),
      ).join("");
      const roll = (Math.random() * 100).toFixed(2);
      setGeneratedHash(`${mockHash}...${nonce}`);
      setGameResult(parseFloat(roll));
      setNonce((prev) => prev + 1);
      setVerifying(false);
    }, 400);
  };

  const toggleSecurityCheck = (key: string) => {
    setCheckedSecurity((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const securityChecklist = [
    {
      key: "wallet",
      title: "Self-Custody Ownership",
      desc: "Use non-custodial wallets (MetaMask/Phantom) where you hold your private keys. Never deposit directly from exchange accounts.",
    },
    {
      key: "2fa",
      title: "Enforce Hardware 2FA",
      desc: "Enable Authenticator Apps (Google/YubiKey) on your casino accounts. Avoid SMS 2FA due to SIM-swapping risks.",
    },
    {
      key: "phishing",
      title: "Bookmark Official URLs",
      desc: "Always verify casino web addresses to avoid malicious clone domains that drain crypto wallets.",
    },
    {
      key: "allowance",
      title: "Manage Token Approvals",
      desc: "Periodically revoke unused dApp smart contract permissions using tools like Revoke.cash.",
    },
  ];

  const onboardingSteps = [
    {
      step: 1,
      title: "Setup Web3 Self-Custody Wallet",
      icon: Wallet,
      desc: "Download a self-custodial wallet (MetaMask, Phantom, or Exodus). Store your 12-to-24-word recovery phrase offline on paper or steel. Never screenshot or save your seed phrase in cloud storage.",
    },
    {
      step: 2,
      title: "Acquire Fast & Low-Fee Tokens",
      icon: Coins,
      desc: "Purchase crypto (USDT-Polygon, LTC, or SOL) on a crypto exchange (Coinbase, Kraken, Binance) or via peer-to-peer (P2P) on-ramps.",
    },
    {
      step: 3,
      title: "Transfer Funds to Personal Wallet",
      icon: ArrowUpRight,
      desc: "Withdraw purchased tokens from the centralized exchange into your private wallet. This separates your identity from gambling transactions.",
    },
    {
      step: 4,
      title: "Instant Casino Deposit & Verification",
      icon: Zap,
      desc: "Copy the casino deposit address or scan its QR code. Deposit transactions finalize automatically on the blockchain without intermediary bank holds.",
    },
  ];

  const faqs = [
    {
      q: "Is crypto gambling legal?",
      a: "Legal status varies by jurisdiction. Generally, in regions where online gaming is permitted, crypto gambling follows standard legal rules. Licensed operators adhere to regional AML (Anti-Money Laundering) requirements.",
    },
    {
      q: "What is Provably Fair gambling?",
      a: "Provably Fair is an open cryptographic algorithm utilizing SHA-256 seed hashing. It permits players to independently verify every spin or card deal after it occurs, mathematically proving the casino did not alter the result.",
    },
    {
      q: "What token is best for beginner gamblers?",
      a: "Tether (USDT on Polygon or TRON) and Litecoin (LTC) are optimal. USDT eliminates market price volatility, while LTC guarantees sub-cent transaction fees and fast confirmations.",
    },
    {
      q: "Why should I avoid depositing directly from an Exchange (Binance/Coinbase)?",
      a: "Exchanges operate strict compliance algorithms that flag transactions sent to gambling addresses, which can result in account suspensions. Always bridge through a non-custodial wallet first.",
    },
    {
      q: "How fast are crypto casino withdrawals?",
      a: "Because crypto withdrawals are executed on automated smart contracts or native RPC nodes, standard payouts settle on the blockchain within 1 to 10 minutes.",
    },
  ];

  return (
    <main className="min-h-screen ">
      {/* ================= 1. HERO SECTION ================= */}
      <section
        className="relative overflow-hidden border-b border-blue-100/60 pt-20 pb-16 lg:pt-28 lg:pb-20"
        style={{
          backgroundColor: "#EEF3FE",
          backgroundImage:
            "radial-gradient(circle at 50% 30%, #EFF6FF 0%, #E0E7FF 40%, #F0F5FE 75%, #EEF3FE 100%)",
        }}
      >
        <div className=" relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-blue-200/80 shadow-xs text-xs font-bold tracking-wider uppercase text-[#2E68FB]">
              <Coins className="w-4 h-4 text-[#2E68FB]" />
              Masterclass Protocol
            </div>

            <h1 className="text-4xl sm:text-5xl font-black text-[#0F172A] tracking-tight">
              Crypto Gambling 101 <br />
              <span className="text-[#2E68FB]">
                The Ultimate Web3 Player Guide
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#475569] leading-relaxed font-normal">
              Learn how Web3 casinos eliminate bank blockades, verify
              mathematical game fairness, calculate network costs, and protect
              your bankroll safely.
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-6 text-xs font-semibold text-[#475569]">
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#00B67A]" /> Instant Automated
                Cashouts
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#2E68FB]" /> Public
                SHA-256 Verification
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-purple-600" /> Non-Custodial
                Ownership
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. INTERACTIVE COST SAVINGS CALCULATOR ================= */}
      <section className="py-10 ">
        <div className="bg-white border border-gray-200/90 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2E68FB] flex items-center justify-center font-bold">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#0F172A]">
                Crypto vs. Fiat Fee & Time Savings Calculator
              </h2>
              <p className="text-xs text-[#64748B]">
                See how much money and banking processing time you save by
                bypassing traditional card/bank rails.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Input Sliders */}
            <div className="lg:col-span-6 space-y-6 bg-[#F8FAFC] p-6 rounded-2xl border border-gray-200/80">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                    Est. Monthly Wagering Volume
                  </label>
                  <span className="text-lg font-extrabold text-[#2E68FB]">
                    ${monthlyVolume.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="10000"
                  step="100"
                  value={monthlyVolume}
                  onChange={(e) => setMonthlyVolume(Number(e.target.value))}
                  className="w-full accent-[#2E68FB] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                    Monthly Cashout / Withdrawal Requests
                  </label>
                  <span className="text-lg font-extrabold text-[#2E68FB]">
                    {monthlyCashouts} Requests
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={monthlyCashouts}
                  onChange={(e) => setMonthlyCashouts(Number(e.target.value))}
                  className="w-full accent-[#2E68FB] cursor-pointer"
                />
              </div>
            </div>

            {/* Results Display */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-1">
                <span className="text-xs font-semibold text-[#475569] block">
                  Est. Monthly Savings
                </span>
                <span className="text-3xl font-black text-[#00B67A]">
                  ${savingsMetrics.netSaved.toFixed(2)}
                </span>
                <span className="text-[11px] text-[#64748B] block mt-1">
                  Saved on processing & conversion charges
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-1">
                <span className="text-xs font-semibold text-[#475569] block">
                  Time Saved on Payouts
                </span>
                <span className="text-3xl font-black text-[#2E68FB]">
                  ~{savingsMetrics.fiatTimeWaitDays} Days
                </span>
                <span className="text-[11px] text-[#64748B] block mt-1">
                  Instant payouts vs. 3–5 day bank wire waits
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100 col-span-1 sm:col-span-2">
                <div className="flex items-center justify-between text-xs font-medium text-rose-900">
                  <span>
                    Traditional Fiat Banking Drain:{" "}
                    <strong>${savingsMetrics.fiatFees.toFixed(2)}/mo</strong>
                  </span>
                  <span>
                    Crypto Network Overhead:{" "}
                    <strong>${savingsMetrics.cryptoFees.toFixed(2)}/mo</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. WALLET SELECTION DECISION TOOL ================= */}
      <section className="py-10 ">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2E68FB] block mb-1">
            Infrastructure Setup
          </span>
          <h2 className="text-3xl font-bold text-[#0F172A]">
            Choosing the Right Crypto Wallet
          </h2>
          <p className="text-xs text-[#64748B] mt-2">
            Select your gameplay tier to find the optimal wallet setup.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Extension Wallet */}
          <div
            onClick={() => setSelectedWalletType("extension")}
            className={`p-6 rounded-3xl border cursor-pointer transition ${
              selectedWalletType === "extension"
                ? "bg-white border-[#2E68FB] shadow-lg ring-2 ring-blue-500/20"
                : "bg-white border-gray-200/90 hover:border-gray-300"
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2E68FB] flex items-center justify-center mb-4">
              <Globe className="w-5 h-5" />
            </div>
            <span className="text-[10px] uppercase font-bold text-[#2E68FB] tracking-wider block">
              Browser Extension
            </span>
            <h3 className="text-lg font-bold text-[#0F172A] mt-1">
              MetaMask / Phantom
            </h3>
            <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
              Ideal for active desktop dApp gaming, instant smart contract
              signatures, and multi-chain network switching.
            </p>
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#0F172A]">
              <span>Setup Time: 2 Mins</span>
              <span className="text-[#00B67A]">Beginner Friendly</span>
            </div>
          </div>

          {/* Mobile App */}
          <div
            onClick={() => setSelectedWalletType("mobile")}
            className={`p-6 rounded-3xl border cursor-pointer transition ${
              selectedWalletType === "mobile"
                ? "bg-white border-[#2E68FB] shadow-lg ring-2 ring-blue-500/20"
                : "bg-white border-gray-200/90 hover:border-gray-300"
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
              <Smartphone className="w-5 h-5" />
            </div>
            <span className="text-[10px] uppercase font-bold text-purple-600 tracking-wider block">
              Mobile Self-Custody
            </span>
            <h3 className="text-lg font-bold text-[#0F172A] mt-1">
              Exodus / Trust Wallet
            </h3>
            <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
              Best for mobile gamers who deposit via QR codes, manage multiple
              assets, and prefer biometric security (FaceID).
            </p>
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#0F172A]">
              <span>Setup Time: 3 Mins</span>
              <span className="text-[#00B67A]">Mobile Favorite</span>
            </div>
          </div>

          {/* Hardware Cold Storage */}
          <div
            onClick={() => setSelectedWalletType("hardware")}
            className={`p-6 rounded-3xl border cursor-pointer transition ${
              selectedWalletType === "hardware"
                ? "bg-white border-[#2E68FB] shadow-lg ring-2 ring-blue-500/20"
                : "bg-white border-gray-200/90 hover:border-gray-300"
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#00B67A] flex items-center justify-center mb-4">
              <HardDrive className="w-5 h-5" />
            </div>
            <span className="text-[10px] uppercase font-bold text-[#00B67A] tracking-wider block">
              Hardware Cold Vault
            </span>
            <h3 className="text-lg font-bold text-[#0F172A] mt-1">
              Ledger / Trezor
            </h3>
            <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
              Essential for high-rollers storing substantial bankrolls. Private
              keys remain completely isolated offline.
            </p>
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#0F172A]">
              <span>Setup Time: 10 Mins</span>
              <span className="text-[#2E68FB]">Maximum Security</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. STEP-BY-STEP INTERACTIVE ONBOARDING ================= */}
      <section className="py-10 ">
        <div className="bg-white border border-gray-200/90 rounded-3xl p-6 sm:p-10 shadow-xs">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2E68FB] block mb-1">
              Onboarding Protocol
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
              How to Place Your First Bet Safely
            </h2>
          </div>

          {/* Stepper Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {onboardingSteps.map((item) => {
              const Icon = item.icon;
              const isActive = activeStep === item.step;
              return (
                <button
                  key={item.step}
                  onClick={() => setActiveStep(item.step)}
                  className={`p-4 rounded-2xl text-left border transition flex items-center gap-3 ${
                    isActive
                      ? "bg-[#0F172A] text-white border-[#0F172A] shadow-md"
                      : "bg-[#F8FAFC] text-[#475569] border-gray-200/80 hover:bg-gray-100"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      isActive
                        ? "bg-[#2E68FB] text-white"
                        : "bg-gray-200 text-[#0F172A]"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold opacity-75 block">
                      Step {item.step}
                    </span>
                    <span className="text-xs font-bold line-clamp-1">
                      {item.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Content */}
          <div className="bg-[#F8FAFC] border border-gray-200/80 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2E68FB]">
                Step {activeStep} Guide
              </span>
              <h3 className="text-xl font-bold text-[#0F172A]">
                {onboardingSteps[activeStep - 1].title}
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed max-w-2xl">
                {onboardingSteps[activeStep - 1].desc}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {activeStep > 1 && (
                <button
                  onClick={() => setActiveStep((prev) => prev - 1)}
                  className="px-4 py-2 rounded-xl border border-gray-300 text-xs font-bold text-[#0F172A] hover:bg-gray-100 transition"
                >
                  Previous
                </button>
              )}
              {activeStep < 4 ? (
                <button
                  onClick={() => setActiveStep((prev) => prev + 1)}
                  className="px-5 py-2 rounded-xl bg-[#2E68FB] text-white text-xs font-bold hover:bg-blue-700 transition flex items-center gap-1.5"
                >
                  Next Step <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <Link
                  href="/casinos/best-crypto-casinos"
                  className="px-5 py-2 rounded-xl bg-[#00B67A] text-white text-xs font-bold hover:bg-emerald-600 transition flex items-center gap-1.5"
                >
                  View Top Verified Casinos{" "}
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= 5. ENHANCED PROVABLY FAIR SIMULATOR ================= */}
      <section className="py-10 ">
        <div className="bg-slate-900 text-white border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 block mb-1">
                Cryptographic Verification Engine
              </span>
              <h2 className="text-2xl font-bold">
                Interactive Provably Fair Verifier
              </h2>
            </div>
            <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-bold flex items-center gap-2">
              <Key className="w-3.5 h-3.5" /> SHA-256 HMAC Algorithm
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <p className="text-xs text-slate-300 leading-relaxed">
                Before you spin, the casino hashes its{" "}
                <strong>Server Seed</strong> so it cannot be altered. Your
                browser appends a <strong>Client Seed</strong> and a{" "}
                <strong>Nonce</strong> counter. Change the parameters below to
                verify how cryptographic game calculations work in real time.
              </p>

              <div className="space-y-3 font-mono text-xs">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">
                    Hashed Server Seed (Pre-determined by Casino)
                  </label>
                  <input
                    type="text"
                    value={serverSeed}
                    onChange={(e) => setServerSeed(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-300 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">
                    Your Client Seed (Editable)
                  </label>
                  <input
                    type="text"
                    value={clientSeed}
                    onChange={(e) => setClientSeed(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-blue-400 focus:outline-none border-blue-500/50"
                  />
                </div>
              </div>

              <button
                onClick={handleRunVerification}
                disabled={verifying}
                className="w-full py-3 rounded-xl bg-[#2E68FB] hover:bg-blue-600 text-white font-bold text-xs transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <RefreshCw
                  className={`w-4 h-4 ${verifying ? "animate-spin" : ""}`}
                />
                {verifying
                  ? "Generating Hash..."
                  : `Run HMAC Roll Verification (Nonce: ${nonce})`}
              </button>
            </div>

            {/* Generated Result Output */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Public SHA-256 Output
              </span>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-emerald-400 break-all leading-relaxed">
                {generatedHash}
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-xs text-slate-400 font-semibold">
                  Calculated Dice Outcome:
                </span>
                <span className="text-lg font-mono font-bold text-blue-400">
                  {gameResult} / 100.00
                </span>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed">
                Because the casino provided the unalterable server hash before
                your client seed was added, neither side could rig the final
                roll.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 6. NETWORK METRICS COMPARISON TABLE ================= */}
      <section className="py-10 ">
        <div className="bg-white border border-gray-200/90 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#2E68FB] block mb-1">
                Blockchain Intelligence
              </span>
              <h2 className="text-2xl font-bold text-[#0F172A]">
                Casino Network Benchmarks
              </h2>
            </div>

            <input
              type="text"
              placeholder="Search token name..."
              value={networkSearch}
              onChange={(e) => setNetworkSearch(e.target.value)}
              className="px-3.5 py-2 text-xs rounded-xl bg-[#F8FAFC] border border-gray-200 text-[#0F172A] focus:outline-none focus:border-[#2E68FB]"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-xs font-bold text-[#0F172A] uppercase tracking-wider bg-[#F8FAFC]">
                  <th className="py-3.5 px-4">Cryptocurrency</th>
                  <th className="py-3.5 px-4">Avg. Transfer Speed</th>
                  <th className="py-3.5 px-4">Network Gas Fee</th>
                  <th className="py-3.5 px-4">Price Volatility Risk</th>
                  <th className="py-3.5 px-4">Optimal Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs sm:text-sm text-[#475569]">
                {NETWORKS.filter((n) =>
                  n.name.toLowerCase().includes(networkSearch.toLowerCase()),
                ).map((net, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/30 transition">
                    <td className="py-4 px-4 font-bold text-[#0F172A] flex items-center gap-2">
                      {net.name}
                      {net.badge && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-[#2E68FB]">
                          {net.badge}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 font-mono">{net.avgSpeed}</td>
                    <td className="py-4 px-4 font-mono text-[#00B67A] font-bold">
                      {net.avgFee}
                    </td>
                    <td className="py-4 px-4 font-semibold">
                      {net.volatility}
                    </td>
                    <td className="py-4 px-4 text-xs text-[#64748B]">
                      {net.recommendedFor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================= 7. INTERACTIVE SECURITY PROTOCOL CHECKLIST ================= */}
      <section className="py-10 ">
        <div className="p-8 rounded-3xl bg-linear-to-r from-slate-900 to-slate-800 text-white shadow-xl space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 block mb-1">
              Risk Mitigation
            </span>
            <h2 className="text-2xl font-bold">
              Player Security & Self-Protection Protocol
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Complete this readiness audit before funding any Web3 casino
              account.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {securityChecklist.map((item) => {
              const isChecked = !!checkedSecurity[item.key];
              return (
                <div
                  key={item.key}
                  onClick={() => toggleSecurityCheck(item.key)}
                  className={`p-4 rounded-2xl border cursor-pointer transition flex items-start gap-3 ${
                    isChecked
                      ? "bg-blue-950/60 border-blue-500/60"
                      : "bg-slate-800/60 border-slate-700/80 hover:border-slate-600"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                      isChecked
                        ? "bg-[#2E68FB] text-white"
                        : "border border-slate-500"
                    }`}
                  >
                    {isChecked && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <div>
                    <h4
                      className={`text-xs font-bold ${isChecked ? "text-blue-300 line-through" : "text-white"}`}
                    >
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= 8. FAQ ACCORDION ================= */}
      <section className=" py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2E68FB] mb-2 block">
              Player FAQs
            </span>
            <h2 className="text-3xl font-bold text-[#0F172A]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-[#F8FAFC] border border-gray-200/80 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-[#0F172A]"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#2E68FB] shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform ${openFaq === idx ? "rotate-180" : ""}`}
                  />
                </button>

                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs text-[#64748B] leading-relaxed border-t border-gray-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
