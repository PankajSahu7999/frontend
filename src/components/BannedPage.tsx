'use client';

import Link from 'next/link';

export default function BannedPage() {
  const vpnLinks = {
    NordVPN: 'https://nordvpn.com/download/',
    ExpressVPN: 'https://www.expressvpn.com/download',
    ProtonVPN: 'https://protonvpn.com/download',
    Windscribe: 'https://windscribe.com/download',
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating Background Casino Symbols */}
      <div className="absolute inset-0 pointer-events-none">
        {['♠', '♥', '♦', '♣', '🎲', '🃏', '💰', '🎰'].map((symbol, i) => (
          <div
            key={i}
            className="absolute text-4xl opacity-[0.04] animate-float"
            style={{
              left: `${10 + ((i * 12) % 80)}%`,
              top: `${15 + ((i * 17) % 70)}%`,
              animationDelay: `${i * 1.2}s`,
              animationDuration: `${4 + i * 0.5}s`,
            }}
          >
            {symbol}
          </div>
        ))}
      </div>

      {/* Glowing orbs */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[#2E68FB]/10 blur-[120px] -top-20 -right-20 pointer-events-none" />
      <div className="absolute w-[300px] h-[300px] rounded-full bg-[#d4af37]/10 blur-[100px] -bottom-20 -left-20 pointer-events-none" />

      {/* Content card */}
      <div className="relative z-10 max-w-lg w-full">
        {/* Gold gradient border wrapper */}
        <div className="p-[2px] rounded-[20px] bg-[linear-gradient(158.37deg,#FF9C2C_2.3%,#FFF1CC_15.9%,#B45B1B_24.24%,#FFC170_62.4%,#FEE5B3_75.76%,#9F5E26_90.07%)] shadow-2xl shadow-[#2E68FB]/20">
          {/* Inner card body */}
          <div className="rounded-[18px] bg-[linear-gradient(231.79deg,#D5EDFF_32.55%,#EEECFF_43.54%,#F9F3FF_53.23%,#F5FCFF_66.16%,#E9F5FF_79.08%)] p-8 sm:p-10 text-center">
            {/* 403 */}
            <h1 className="text-6xl sm:text-7xl font-black text-[#111827] mb-2 tracking-tight">
              4<span className="text-[#d4af37]">0</span>3
            </h1>

            {/* Gold divider */}
            <div className="w-16 h-[2px] bg-[#d4af37]/40 mx-auto mb-5 rounded-full" />

            {/* Title */}
            <h2 className="text-xl sm:text-2xl font-bold text-[#111827] mb-3">
              Access Restricted
            </h2>

            <p className="text-[#4B5563] text-sm sm:text-base leading-relaxed mb-6">
              This website is not available in your region due to local
              regulations.
            </p>

            <p className="text-[#2E68FB] text-sm sm:text-base font-semibold mb-8">
              Please use a VPN to access our services.
            </p>

            {/* VPN Suggestions */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {Object.entries(vpnLinks).map(([vpn, href]) => (
                <Link
                  key={vpn}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    px-4 py-2
                    bg-[#CDDCFB]/30
                    backdrop-blur
                    rounded-full
                    text-xs
                    font-semibold
                    text-[#2E68FB]
                    border
                    border-[#2E68FB]/20
                    hover:bg-[#2E68FB]
                    hover:text-white
                    hover:scale-105
                    transition-all
                    duration-300
                    cursor-pointer
                  "
                >
                  {vpn}
                </Link>
              ))}
            </div>

            {/* Support link */}
            <p className="text-xs text-[#98A2B3]">
              If you believe this is an error, please{' '}
              <a
                href="/contact"
                className="text-[#2E68FB] font-semibold hover:underline"
              >
                contact support
              </a>
              .
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(15deg);
          }
        }

        @keyframes deal {
          0% {
            transform: translateX(-50px) rotate(-20deg);
            opacity: 0;
          }
          100% {
            transform: translateX(0) rotate(0deg);
            opacity: 1;
          }
        }

        .animate-float {
          animation: float 5s ease-in-out infinite;
        }

        .animate-deal {
          animation: deal 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}