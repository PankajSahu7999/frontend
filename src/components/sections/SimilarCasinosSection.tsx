'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { getImageUrl } from '@/lib/utils/getImageUrl';
import Link from 'next/link';
import CasinoCardDisclaimer from '@/components/CasinoCardDisclaimer';

interface SimilarCasinosSectionProps {
  slug: string;
}

export default function SimilarCasinosSection({ slug }: SimilarCasinosSectionProps) {
  const [casinos, setCasinos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSimilarCasinos = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/casinos/slug/${slug}/similar`, {
          cache: 'no-store'
        });
        if (res.ok) {
          const data = await res.json();
          setCasinos(data);
        }
      } catch (error) {
        console.error('Failed to fetch similar casinos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSimilarCasinos();
  }, [slug]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  const allTags = new Set<string>();
  casinos.forEach(casino => {
    casino.tags?.forEach((t: any) => {
      if (t.tag?.name) allTags.add(t.tag.name);
    });
    casino.categories?.forEach((c: any) => {
      if (c.category?.name) allTags.add(c.category.name);
    });
  });
  
  const filters = ['All', ...Array.from(allTags)];

  const displayCasinos = activeFilter === 'All' 
    ? casinos 
    : casinos.filter(casino => {
        const hasTag = casino.tags?.some((t: any) => t.tag?.name === activeFilter);
        const hasCategory = casino.categories?.some((c: any) => c.category?.name === activeFilter);
        return hasTag || hasCategory;
      });

  if (loading) {
    return <div className="text-center py-10">Loading similar casinos...</div>;
  }

  if (casinos.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-8 mt-10">
      <div className="mb-6">
        <h2 className="font-poppins text-[24px] font-bold leading-[24px] tracking-normal text-[#16171D] mb-4">
          Similar Casinos You May Like
        </h2>

       
      </div>

      <div className="relative group">
       
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto pb-4 scroll-smooth"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {displayCasinos.map((casino) => (
            <SimilarCasinoCard key={casino.id} casino={casino} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SimilarCasinoCard({ casino }: { casino: any }) {
  const welcomeBonus = casino.bonuses?.[0]?.amount || '$2,500 + 10% Cashback';
  const imageUrl = getImageUrl(casino.logo || casino.featured_image || '/images/888.png');

  return (
    <Link href={`/casino/${casino.slug}`}>
      <div className="card-animated-border rounded-[24px] p-[2px] shrink-0 cursor-pointer">
        <div
          className="flex flex-col p-4 rounded-[22px] justify-between"
          style={{
            width: "340px",
            minHeight: "400px",
            background: "linear-gradient(231.79deg, #D5EDFF 32.55%, #EEECFF 43.54%, #F9F3FF 53.23%, #F5FCFF 66.16%, #E9F5FF 79.08%)",
          }}
        >
            <div className="flex gap-3 items-center">
              <div className="relative w-20 h-20 bg-white rounded-xl overflow-hidden shadow-sm flex-shrink-0 border border-gray-100 p-1">
                <Image
                  src={imageUrl}
                  alt={casino.name || 'Casino'}
                  fill
                  className="object-contain p-1"
                  unoptimized
                />
              </div>
              <div>
                <h3 className="text-[22px] font-bold text-[#151515] leading-tight">
                  {casino.name || 'BC Game Casino'}
                </h3>
                <p
                  className="text-[11px] text-[#666] mt-0.5"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {casino.short_description || 'Premium Casino Experience'}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-1">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} fill="#FFB000" color="#FFB000" />
                  ))}
                </div>
                <span className="text-[12px] font-bold text-[#363636] ml-1">
                  {casino.rating || '4.9'}
                </span>
              </div>

              <div className="flex gap-1">
                <span className="text-[9px] font-bold text-white px-2 py-0.5 rounded-md bg-gradient-to-r from-[#FFB000] to-[#FF8A00]">
                  Top Pick
                </span>
                <span className="text-[9px] font-bold text-white px-2 py-0.5 rounded-md bg-[#00B67A]">
                  Fast Pay
                </span>
              </div>
            </div>

            <div className="mt-3 p-3 rounded-xl bg-[#2E68FB] text-white flex flex-col justify-center">
              <span className="text-[9px] font-semibold tracking-wider uppercase text-blue-100">
                Exclusive Welcome
              </span>
              <span className="text-[14px] font-bold mt-0.5 leading-snug">
                {welcomeBonus}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-3">
              <div className="p-2 bg-white/40 border border-[#2E68FB20] rounded-lg">
                <span className="block text-[9px] font-semibold text-[#2E68FB] uppercase">
                  Min Deposit
                </span>
                <span className="text-[12px] font-bold text-[#363636]">
                  {casino.minimum_deposit ? `$${casino.minimum_deposit}` : '€20'}
                </span>
              </div>

              <div className="p-2 bg-white/40 border border-[#2E68FB20] rounded-lg">
                <span className="block text-[9px] font-semibold text-[#2E68FB] uppercase">
                  Payout time
                </span>
                <span className="text-[12px] font-bold text-[#363636]">
                  {casino.withdrawal_time || 'Instant'}
                </span>
              </div>
            </div>

            <div className="mt-4">
              <button className="btn-play-now w-full h-11 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center font-bold text-[14px] text-[#2E68FB] shadow-sm">
                Play Now
              </button>
            </div>

            {/* Disclaimer Hover / Modal Link */}
            <CasinoCardDisclaimer casinoName={casino.name} />
        </div>
      </div>
    </Link>
  );
}
