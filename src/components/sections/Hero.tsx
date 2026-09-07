'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import Image from 'next/image';

const heroVideos = [
  '/videos/hero/main-banner1.webp',
];

interface HeroProps {
  title?: string;
  subtitle?: string;
}

export function Hero({
  title = 'Online Casinos',
  subtitle = 'Find the best online casinos',
}: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? heroVideos.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === heroVideos.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className="relative -mx-4 sm:mx-0">
      <div className="relative w-full h-[350px] lg:h-[494px] overflow-hidden">

        {/* Background Image with LCP priority */}
        <Image
          src={heroVideos[currentSlide]}
          alt={`${title} - Casino Reviews Book Banner`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1280px"
          className="object-cover object-center"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />

        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="
            absolute left-5 top-1/2 -translate-y-1/2
            z-20 w-10 h-10 rounded-full
            bg-white/80 hover:bg-white
            flex items-center justify-center
          "
        >
          <ChevronLeft className="w-5 h-5 text-black" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="
            absolute right-5 top-1/2 -translate-y-1/2
            z-20 w-10 h-10 rounded-full
            bg-white/80 hover:bg-white
            flex items-center justify-center
          "
        >
          <ChevronRight className="w-5 h-5 text-black" />
        </button>

        {/* Content */}
        <div
          className="
            relative z-10
            h-full
            flex
            items-center
            pl-6
            lg:pl-[120px]
          "
        >
          <div
            className="
              w-full
              max-w-[500px]
              flex flex-col
              items-center
              text-center
            "
          >

            {/* Badge */}
            <div
              className="
                px-5 py-2
                rounded-[16px]
                border border-[#FFFFFFE6]
                bg-white/40
                backdrop-blur-[1.5px]
                shadow-[0px_4px_20px_0px_#ADB6CA4D]
                mb-6
              "
            >
              <span className="text-[12px] uppercase tracking-wide text-slate-700">
                BEST ONLINE CASINOS
              </span>
            </div>

            {/* Dynamic Title */}
            <h1
              className="
                max-w-[480px]
                font-['Poppins']
                font-bold
                text-[26px] sm:text-[38px]
                text-center
                text-[#16171D]
                leading-[1.25]
                mb-3
              "
            >
              Find The Best
              <br />
              {title}
            </h1>

            {/* Lead SEO Paragraph */}
            <p className="text-xs sm:text-sm text-slate-700 max-w-[440px] text-center mb-6 leading-relaxed font-medium">
              {subtitle || 'Explore honest online casino reviews, exclusive deposit bonuses, and verified crypto gambling sites tested for safety.'}
            </p>

            {/* Play Now */}
            <button
              className="
                w-[180px] lg:w-[210px]
                h-[72px] lg:h-[92px]
                rounded-[100px]
                border border-white
                p-3 lg:p-[12px]
                bg-[#D2E1ED]/50
                backdrop-blur-[1.5px]
                shadow-[0px_4px_20px_0px_#ADB6CA4D]
                flex items-center justify-center
                transition-transform
                active:scale-[0.98]
              "
            >
              <div
                className="
                  w-full h-full
                  rounded-[100px]
                  border-2 border-transparent
                  bg-[linear-gradient(90deg,#FF990A_0%,#FFC23E_16%,#FFE45E_34%,#FFF9BE_49%,#FFC23E_76%,#FF990A_100%),linear-gradient(287.9deg,#E5F4FF_26.04%,#FFFFFF_50%,#E5F4FF_73.96%)]
                  bg-clip-[padding-box,border-box]
                  bg-origin-border
                  shadow-[inset_0px_-5px_0px_0px_#FFE164B2,inset_0px_-4px_8px_rgba(255,231,135,0.4),inset_0px_4px_8px_4px_#FFFFEC8C]
                  flex items-center justify-center
                  gap-[10px]
                  px-6 py-4
                  text-[18px]
                  font-bold
                  text-[#16171D]
                  tracking-wide
                "
              >
                PLAY NOW
              </div>
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}