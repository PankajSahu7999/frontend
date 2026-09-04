'use client';

import Image from 'next/image';

export function BonuesSection2() {
  return (
    <section className="w-full mt-8">
      {/* Gradient Border */}
      <div
        className="
          relative
          p-[4px]
          rounded-[16px]
          bg-[linear-gradient(158.37deg,#FF9C2C_2.3%,#FFF1CC_15.9%,#B45B1B_24.24%,#FFC170_62.4%,#FEE5B3_75.76%,#9F5E26_90.07%)]
        "
      >
        {/* Card */}
        <div
          className="
            relative
            w-full
            h-auto min-h-[220px]
            rounded-[12px]
            overflow-hidden sm:overflow-visible
            bg-[linear-gradient(231.79deg,#D5EDFF_32.55%,#EEECFF_43.54%,#F9F3FF_53.23%,#F5FCFF_66.16%,#E9F5FF_79.08%)]
          "
        >
          {/* Content Wrapper (flex-col-reverse places image first on mobile; sm:flex-row handles desktop) */}
          <div className="relative h-full px-6 py-8 sm:py-0 sm:px-[56px] min-h-[212px] flex flex-col-reverse sm:flex-row items-center justify-center sm:justify-start gap-6 sm:gap-0">
            
            {/* Bottom Content on Mobile / Left Content on Desktop */}
            <div className="flex flex-col items-center sm:items-start justify-center text-center sm:text-left gap-[20px] w-full sm:w-[375px] z-20 max-w-[375px] mx-auto sm:mx-0">
              <h2 className="text-[22px] sm:text-[28px] font-extrabold text-[#111827] leading-tight tracking-tight">
                Take on Challenges
                <br />
                and earn <span className="text-[#B45B1B] sm:text-inherit">15,000 Coins!</span>
              </h2>

              <button
                className="
                  inline-flex items-center justify-center
                  w-full sm:w-[227px]
                  h-[49px]
                  rounded-[80px]
                  text-[#111827]
                  font-bold
                  text-[16px]
                  uppercase
                  tracking-wide
                  bg-[linear-gradient(180deg,#FFE11F_0%,#FF8533_100%)]
                  shadow-[0px_3px_0px_0px_#E36D1F]
                  transition-transform active:scale-[0.98]
                "
              >
                Play Now
              </button>
            </div>

            {/* Top Image on Mobile / Right Decorative Image on Desktop */}
            <div
              className="
                relative sm:absolute
                right-0 sm:right-[20px]
                top-0 sm:top-[-72px]
                w-full max-w-[280px] sm:max-w-none sm:w-[520px]
                h-[160px] sm:h-[330px]
                z-10
                pointer-events-none
                flex justify-center
              "
            >
              <Image
                src="/images/challenges-icons.png"
                alt="Diamond, Star Coin, x10 Multiplier, Crown"
                fill
                className="object-contain sm:object-right-center"
                priority
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}