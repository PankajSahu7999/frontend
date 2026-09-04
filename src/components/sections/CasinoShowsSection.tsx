'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCasinos } from '@/hooks/useRedux';
import { getImageUrl } from '@/lib/utils/getImageUrl';

// ── Exact values from design spec ──────────────────────────────
const OUTER_W = 244.13;   // total card wrapper width
const OUTER_H = 280.90;   // total card wrapper height
const CARD_W = 227.03;   // card body width
const CARD_H = 206.23;   // card body height
const CARD_TOP = 75;       // card body starts this far down (image peek zone)
const IMG_W = 210.56;   // center image width
const IMG_H = 92.09;    // center image height
const IMG_TOP = 16.29;    // image top offset inside wrapper
// ───────────────────────────────────────────────────────────────

export default function CasinoShowsSection({
  casinos,
}: {
  casinos?: any[];
}) {
  const {
    casinos: reduxCasinos,
    filteredCasinos,
    loading,
  } = useCasinos();

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  /**
   * If casinos prop is passed:
   *     use category casinos
   *
   * If casinos prop is not passed:
   *     use Redux filtered casinos
   */
  const displayCasinos =
    casinos !== undefined
      ? casinos
      : filteredCasinos.length > 0
        ? filteredCasinos
        : reduxCasinos;

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    if (loading) {
        return (
            <section className="w-full py-10">
                <div className="flex items-center justify-center h-[280px]">
                    <div className="text-slate-500">Loading...</div>
                </div>
            </section>
        );
    }

    if (displayCasinos.length === 0) {
        return (
            <section className="w-full py-10">
                <div className="flex items-center justify-center h-[280px]">
                    <div className="text-slate-500">No casinos found matching your filters.</div>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full py-10">
            {/* Header */}
      <div className="mb-6">
        {/* First Row */}
        <div className="flex items-center justify-between">
         <div className="flex items-center gap-3">
                    <span className="px-2 py-1 text-[10px] font-semibold bg-[#EAF0FF] text-[#4F6BFF] rounded-full">
                        NEW
                    </span>
                    <h2 className="text-[22px] sm:text-[32px] font-semibold text-[#1F2937]">
                        Casinos Shows
                    </h2>
                </div>
          <div className="flex items-center gap-3">
            <button className="hidden md:flex items-center bg-white px-4 py-2 rounded-full text-sm font-medium shadow-sm text-[#16171D]">
              See all
              <span className="ml-2 text-[#98A2B3]">{displayCasinos.length}</span>
            </button>
            <button
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100"
              onClick={scrollLeft}
            >
              <ChevronLeft size={18} className="text-[#16171D]" />
            </button>

            <button
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100"
              onClick={scrollRight}
            >
              <ChevronRight size={18} className="text-[#16171D]" />
            </button>
          </div>
        </div>

        {/* Second Row */}
        <p className="text-[15px] text-[#5F6368] mt-2">
          New Rally
          <span className="text-[#2E68FB]"> every 20 minutes</span> – spin and win!
        </p>
      </div>

            <div
                ref={scrollContainerRef}
                className="[&::-webkit-scrollbar]:hidden scroll-smooth"
                style={{
                    width: '100%',
                    overflowX: 'auto',
                    overflowY: 'visible',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
            >
                <div style={{
                    display: 'flex',
                    gap: '16px',
                    width: 'fit-content',
                    paddingTop: '10px',
                    paddingBottom: '16px',
                    alignItems: 'flex-end',
                }}>
                    {displayCasinos.map((casino, index) => (
                        <CasinoCard key={casino.id || index} casino={casino} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function CasinoCard({ casino }: { casino: any }) {
    const welcomeBonus = casino.bonuses?.[0] || null;
    const imageUrl = getImageUrl(casino.logo || casino.featured_image);

    // Map casino data to card display fields
    const title = casino.name?.toUpperCase() || 'CASINO';
    const offer = welcomeBonus?.amount || (casino.rating ? `${casino.rating}★` : 'PLAY');
    const subtitle = welcomeBonus?.type?.toUpperCase() || 'CASINO GAMES';
    const description = casino.short_description
        || (welcomeBonus ? `CLAIM YOUR ${welcomeBonus.amount} BONUS NOW!` : 'VISIT CASINO AND START PLAYING TODAY.');

    return (
        <div
            style={{
                position: 'relative',
                flexShrink: 0,
                width: `${OUTER_W}px`,
                height: `${OUTER_H}px`,
                overflow: 'hidden',
            }}
        >
            {/* Left blurred image */}
            <div
                style={{
                    position: 'absolute',
                    width: `${IMG_W}px`,
                    height: `${IMG_H}px`,
                    top: `${IMG_TOP}px`,
                    left: '50%',
                    zIndex: 10,
                    transformOrigin: 'bottom center',
                    transform:
                        'translateX(-50%) rotate(-18deg) translateX(-18px) translateY(6px)',
                    filter: 'blur(3px) brightness(0.80)',
                    opacity: 0.68,
                }}
            >
                <Image
                    src={imageUrl}
                    alt=""
                    fill
                    aria-hidden
                    className="object-contain"
                    unoptimized
                />
            </div>

            {/* Right blurred image */}
            <div
                style={{
                    position: 'absolute',
                    width: `${IMG_W}px`,
                    height: `${IMG_H}px`,
                    top: `${IMG_TOP}px`,
                    left: '50%',
                    zIndex: 10,
                    transformOrigin: 'bottom center',
                    transform:
                        'translateX(-50%) rotate(18deg) translateX(18px) translateY(6px)',
                    filter: 'blur(3px) brightness(0.80)',
                    opacity: 0.68,
                }}
            >
                <Image
                    src={imageUrl}
                    alt=""
                    fill
                    aria-hidden
                    className="object-contain"
                    unoptimized
                />
            </div>

            {/* Center image */}
            <div
                style={{
                    position: 'absolute',
                    width: `${IMG_W}px`,
                    height: `${IMG_H}px`,
                    top: `${IMG_TOP}px`,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 12,
                    filter: 'drop-shadow(0 4px 14px rgba(0,0,0,0.22))',
                }}
            >
                <Image
                    src={imageUrl}
                    alt={casino.name}
                    fill
                    className="object-contain"
                    unoptimized
                />
            </div>

            {/* Card body */}
            <div
                style={{
                    position: 'absolute',
                    top: `${CARD_TOP}px`,
                    left: `${(OUTER_W - CARD_W) / 2}px`,
                    width: `${CARD_W}px`,
                    height: `${CARD_H}px`,
                    zIndex: 20,
                    borderRadius: '18px',
                    overflow: 'hidden',
                    background:
                        'linear-gradient(175deg, #D4E1FF 0%, #EAF0FF 45%, #F4F7FF 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        width: '51px',
                        height: '51px',
                        top: '5px',
                        left: '175px',
                        borderRadius: '50%',
                        background: '#2E68FB4D',
                        filter: 'blur(20px)',
                        zIndex: 1,
                        pointerEvents: 'none',
                    }}
                />
                {/* Title block */}
                <div
                    style={{
                        flexShrink: 0,
                        paddingTop: '30px',
                        paddingLeft: '16px',
                        paddingRight: '16px',
                        textAlign: 'center',
                    }}
                >
                    <p
                        style={{
                            fontSize: '7.5px',
                            fontWeight: 700,
                            color: '#2F63FF',
                            letterSpacing: '0.3em',
                            marginBottom: '4px',
                        }}
                    >
                        {title}
                    </p>

                    <h3
                        style={{
                            fontSize: offer.length > 5 ? '18px' : '34px',
                            fontWeight: 900,
                            color: '#000',
                            lineHeight: 1,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {offer}
                    </h3>

                    <h4
                        style={{
                            fontSize: '11px',
                            fontWeight: 800,
                            color: '#000',
                            textTransform: 'uppercase',
                            marginTop: '2px',
                        }}
                    >
                        {subtitle}
                    </h4>
                </div>

                {/* Description */}
                <div
                    style={{
                        flex: 1,
                        marginTop: '10px',
                        padding: '8px 14px',
                        background:
                            'linear-gradient(90deg, #B8CCFF 0%, #C8D8FF 50%, #B8CCFF 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <p
                        style={{
                            fontSize: '9px',
                            fontWeight: 600,
                            color: '#0D1B5E',
                            textAlign: 'center',
                            textTransform: 'uppercase',
                            lineHeight: '14px',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                        } as React.CSSProperties}
                    >
                        {description}
                    </p>
                </div>

                {/* Footer */}
                <div
                    style={{
                        flexShrink: 0,
                        position: 'relative',
                        background: '#fff',
                        height: '44px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <button
                        style={{
                            fontSize: '10.5px',
                            fontWeight: 700,
                            color: '#2F63FF',
                            letterSpacing: '0.2em',
                        }}
                        onClick={() => {
                            const url = casino.affiliate_url || casino.website_url;
                            if (url) window.open(url, '_blank');
                        }}
                    >
                        CLAIM BONUS
                    </button>

                    <div
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '38px',
                            height: '3px',
                            borderRadius: '2px',
                            backgroundColor: '#2F63FF',
                        }}
                    />
                </div>
            </div>
        </div>
    );
}