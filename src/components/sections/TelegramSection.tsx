'use client';

import Image from 'next/image';
import { Gift, Zap, Shield } from 'lucide-react';

export function TelegramSection() {
  return (
    <section className="w-full mt-8">
     <div
  className="
    p-[4px]
    rounded-[16px]
    bg-[linear-gradient(158.37deg,#FF9C2C_2.3%,#FFF1CC_15.9%,#B45B1B_24.24%,#FFC170_62.4%,#FEE5B3_75.76%,#9F5E26_90.07%)]
  "
>
  <div
    className="
      relative
      w-full
      h-auto lg:h-[206px]
      rounded-[12px]
      overflow-hidden
      bg-[linear-gradient(231.79deg,#D5EDFF_32.55%,#EEECFF_43.54%,#F9F3FF_53.23%,#F5FCFF_66.16%,#E9F5FF_79.08%)]
    "
  >
        <div className="flex flex-col lg:flex-row items-center justify-between h-full px-4 lg:px-[30px] gap-6 lg:gap-0 py-6 lg:py-0">
          {/* Left Column */}
          <div className="w-full lg:w-[306px] flex flex-col gap-[1px]">
            <h2 className="text-[18px] font-bold text-[#111827]  text-center">
              Get Exclusive Casino
              <br />
              Bonuses & Alerts
            </h2>

            <p className="text-[12px] text-[#4B5563]  text-center">
              Join our Telegram community and receive exclusive
              promo codes, bonus alerts, trusted casino reviews,
              and gambling updates before anyone else.
            </p>

            <button
              className="
                mx-auto mt-4
                w-[204px]
                h-[35px]
                rounded-[20px]
                px-[22px]
                py-[9px]
                flex items-center justify-center gap-2
                text-white
                font-semibold
                text-[14px]
                bg-[linear-gradient(180deg,#CDDCFB_0%,#588CF3_100%)]
                shadow-[0_10px_25px_rgba(46,104,251,0.35)]
              "
            >
              Join Telegram Channel
            </button>
          </div>

          {/* Middle Column */}
          <div className="w-full lg:w-[317px] flex flex-col gap-[6px]">
            <div className="flex items-start gap-3">
              <Gift
                className="text-[#4F7BFF] mt-1 shrink-0"
                size={22}
              />

              <div>
                <h3 className="text-[16px] font-bold text-[#111827]">
                  Exclusive Bonuses
                </h3>

                <p className="text-[13px] text-[#4B5563]">
                  Receive private promo codes and bonus offers.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Zap
                className="text-[#FDBA21] mt-1 shrink-0"
                size={22}
              />

              <div>
                <h3 className="text-[16px] font-bold text-[#111827]">
                  Instant Alerts
                </h3>

                <p className="text-[13px] text-[#4B5563]">
                  Get notified the moment new deals go live.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Shield
                className="text-[#12C48B] mt-1 shrink-0"
                size={22}
              />

              <div>
                <h3 className="text-[16px] font-bold text-[#111827]">
                  Trusted Reviews
                </h3>

                <p className="text-[13px] text-[#4B5563]">
                  Stay informed with honest casino recommendations.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="relative w-[200px] lg:w-[248px] flex items-center justify-center hidden lg:flex">
            {/* Replace this image later */}
            <Image
              src="/images/telegramsection.png"
              alt="Telegram"
              width={248}
              height={227}
              className="object-contain"
            />
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}