import React from 'react';
import type { Metadata } from 'next';
import CasinoBonusesClient from './CasinoBonusesClient';
import { generateSEO } from '@/lib/seo';
import { buildApiUrl } from '@/config/api.config';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return generateSEO({
    title: 'Best Casino Bonuses & Free Spins - Verified Promo Codes',
    description:
      'Explore exclusive casino welcome bonuses, no deposit free spins, crypto deposit matches, and cashback offers. Verified daily with transparent wagering terms.',
    path: 'casino-bonuses',
    keywords: [
      'casino bonuses',
      'best casino bonuses',
      'welcome bonus',
      'no deposit free spins',
      'crypto casino bonus',
      'casino promo codes',
    ],
  });
}

async function getBonusSectionsData() {
  try {
    const res = await fetch(buildApiUrl('/bonus-sections'), {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      return [];
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('Error fetching bonus sections for page:', err);
    return [];
  }
}

export default async function CasinoBonusesPage() {
  const sections = await getBonusSectionsData();

  return <CasinoBonusesClient initialSections={sections} />;
}
