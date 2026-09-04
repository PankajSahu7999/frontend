type GlobalLoaderProps = {
  label?: string;
};

export default function GlobalLoader({
  label = "LOADING LIVE PREMIUM CASINO",
}: GlobalLoaderProps) {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#EEF3FE]/90 backdrop-blur-md overflow-hidden select-none">
      {/* Soft Light Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/20 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-indigo-300/20 blur-[90px] rounded-full pointer-events-none animate-pulse" />

      {/* Embedded CSS Animations */}
      <style>{`
        @keyframes MorphSequence {
          0%, 100% {
            /* Vertical Bar */
            d: path("M45,15 H55 V85 H45 Z");
          }
          20% {
            /* Spade ♠ */
            d: path("M50,15 C45,30 30,35 30,50 C30,62 40,68 48,68 C45,78 40,82 35,85 H65 C60,82 55,78 52,68 C60,68 70,62 70,50 C70,35 55,30 50,15 Z");
          }
          40% {
            /* Diamond ♦ */
            d: path("M50,15 L80,50 L50,85 L20,50 Z");
          }
          60% {
            /* Club ♣ */
            d: path("M50,15 C42,15 36,22 38,30 C30,30 22,38 25,48 C28,58 38,60 46,56 C44,68 38,78 35,85 H65 C62,78 56,68 54,56 C62,60 72,58 75,48 C78,38 70,30 62,30 C64,22 58,15 50,15 Z");
          }
          80% {
            /* Heart ♥ */
            d: path("M50,30 C40,15 20,20 20,40 C20,60 40,75 50,85 C60,75 80,60 80,40 C80,20 60,15 50,30 Z");
          }
        }

        .animate-morph-suit {
          animation: MorphSequence 3.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        @keyframes pulseGlow {
          0%, 100% { transform: scale(0.95); opacity: 0.6; }
          50% { transform: scale(1.1); opacity: 1; }
        }

        .animate-glow {
          animation: pulseGlow 1.6s ease-in-out infinite;
        }
      `}</style>

      {/* Main Glass Container */}
      <div className="relative z-10 flex flex-col items-center max-w-sm px-8 text-center">
        
        {/* --- MORPHING SUIT CASINO LOADER --- */}
        <div className="relative mb-8 flex items-center justify-center drop-shadow-[0_15px_30px_rgba(11,105,245,0.25)]">
          
          {/* Subtle Ambient Ring Behind Animation */}
          <div className="absolute w-28 h-28 rounded-full border border-[#0B69F5]/20 animate-glow" />

          {/* SVG Morph Container */}
          <div className="w-24 h-24 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#0B69F5]">
              {/* Dynamic Path morphing between line and suits */}
              <path
                className="animate-morph-suit fill-current"
                d="M45,15 H55 V85 H45 Z"
              />
            </svg>
          </div>
        </div>

        {/* Brand Title */}
        <h1 className="font-poppins text-[34px] font-extrabold tracking-tight leading-none">
          <span className="text-[#16171D]">Casino Review </span>
          <span className="bg-gradient-to-r from-[#4D99FC] via-[#0B69F5] to-[#0649D9] bg-clip-text text-transparent">
            Book
          </span>
        </h1>

        {/* Label */}
        <p className="mt-4 text-xs font-bold tracking-[0.2em] text-[#0B69F5]/80 uppercase">
          {label}
        </p>

        {/* Micro Bounce Dots */}
        <div className="flex items-center justify-center gap-2 mt-5">
          <span className="w-2 h-2 rounded-full bg-[#0B69F5] animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-2 h-2 rounded-full bg-[#0B69F5]/70 animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-2 h-2 rounded-full bg-[#0B69F5]/40 animate-bounce"></span>
        </div>

      </div>
    </div>
  );
}