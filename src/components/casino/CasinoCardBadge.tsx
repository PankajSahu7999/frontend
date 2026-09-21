'use client';

import React from 'react';
import { Flame, Zap, Star, Sparkles, Rocket, Clock, ShieldCheck } from 'lucide-react';

interface CasinoCardBadgeProps {
  badge?: string | null;
  isHot?: boolean;
  className?: string;
}

export default function CasinoCardBadge({ badge, isHot, className = '' }: CasinoCardBadgeProps) {
  const rawBadge = badge || (isHot ? 'Hot Offer' : null);

  if (!rawBadge) return null;

  // Normalize for icon and color selection
  const cleanBadge = rawBadge.replace(/[🔥⚡💎⭐🚀🆕\s]/g, '').toLowerCase();
  const fullText = rawBadge.replace(/^[🔥⚡💎⭐🚀🆕]\s*/, '').trim();

  let IconComponent = Flame;
  let iconColor = 'text-red-500 fill-red-500/20';
  let textColor = 'text-red-600';
  let borderColor = 'border-red-100';

  if (cleanBadge.includes('hot') || isHot) {
    IconComponent = Flame;
    iconColor = 'text-red-500 fill-red-500/30';
    textColor = 'text-red-600';
    borderColor = 'border-red-200/80';
  } else if (cleanBadge.includes('trend')) {
    IconComponent = Zap;
    iconColor = 'text-amber-500 fill-amber-500/30';
    textColor = 'text-amber-600';
    borderColor = 'border-amber-200/80';
  } else if (cleanBadge.includes('exclusive') || cleanBadge.includes('vip')) {
    IconComponent = Sparkles;
    iconColor = 'text-purple-500 fill-purple-500/30';
    textColor = 'text-purple-600';
    borderColor = 'border-purple-200/80';
  } else if (cleanBadge.includes('top') || cleanBadge.includes('rated')) {
    IconComponent = Star;
    iconColor = 'text-amber-500 fill-amber-500';
    textColor = 'text-amber-700';
    borderColor = 'border-amber-200/80';
  } else if (cleanBadge.includes('popular')) {
    IconComponent = Rocket;
    iconColor = 'text-blue-500 fill-blue-500/30';
    textColor = 'text-blue-600';
    borderColor = 'border-blue-200/80';
  } else if (cleanBadge.includes('fast') || cleanBadge.includes('payout')) {
    IconComponent = Zap;
    iconColor = 'text-emerald-500 fill-emerald-500/30';
    textColor = 'text-emerald-600';
    borderColor = 'border-emerald-200/80';
  } else if (cleanBadge.includes('new')) {
    IconComponent = Sparkles;
    iconColor = 'text-indigo-500 fill-indigo-500/30';
    textColor = 'text-indigo-600';
    borderColor = 'border-indigo-200/80';
  }

  return (
    <div
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/95 backdrop-blur-xs border ${borderColor} shadow-2xs pointer-events-none select-none z-10 transition-transform duration-200 group-hover:scale-105 ${className}`}
      title={fullText}
    >
      <IconComponent size={11} className={`${iconColor} shrink-0`} />
      <span className={`text-[9.5px] font-bold tracking-tight ${textColor} whitespace-nowrap leading-none`}>
        {fullText}
      </span>
    </div>
  );
}
