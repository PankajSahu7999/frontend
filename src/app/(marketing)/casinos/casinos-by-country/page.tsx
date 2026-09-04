import React from 'react';
import type { Metadata } from 'next';
import CountryCasinosClient from '../../casinos-by-country/CountryCasinosClient';
import { generateSEO } from '@/lib/seo';

import { buildApiUrl } from '@/config/api.config';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return generateSEO({
    title: 'Best Online Casinos by Country - Top Legal Casino Sites',
    description:
      'Filter and find top-rated online casinos accepting players from your country. Compare localized welcome bonuses, trusted payment options, and verified licenses.',
    path: 'casinos/casinos-by-country',
    keywords: [
      'casinos by country',
      'online casino by country',
      'legal casinos UK',
      'legal casinos USA',
      'legal casinos Canada',
      'licensed casinos',
    ],
  });
}

async function getInitialData() {
  try {
    const [casinosRes, countriesRes] = await Promise.all([
      fetch(buildApiUrl('/casinos'), { next: { revalidate: 60 } }),
      fetch(buildApiUrl('/countries'), { next: { revalidate: 300 } }),
    ]);

    const casinos = casinosRes.ok ? await casinosRes.json() : [];
    const countries = countriesRes.ok ? await countriesRes.json() : [];

    return {
      casinos: Array.isArray(casinos) ? casinos : casinos.casinos || [],
      countries: Array.isArray(countries) ? countries : [],
    };
  } catch (err) {
    console.error('Error fetching initial country casinos:', err);
    return { casinos: [], countries: [] };
  }
}

export default async function CasinosByCountryNestedPage() {
  const { casinos, countries } = await getInitialData();

  return (
    <CountryCasinosClient
      initialCasinos={casinos}
      initialCountries={countries}
    />
  );
}
