// src/lib/seo/schemas/offerSchema.ts

export interface CasinoBonusInput {
  id: string;
  title: string;
  type: string; // e.g. "Welcome Bonus", "Free Spins", "Cashback", "No Deposit"
  amount: string; // free-text, e.g. "100% up to $500 + 50 Free Spins"
  bonus_code?: string | null;
  wagering_requirement?: string | null;
}

export interface OfferSchemaProps {
  pageUrl: string;
  casinoName: string;
  offerUrl?: string | null; // pass casino.affiliate_url ?? casino.website_url
  bonuses: CasinoBonusInput[];
}

export function offerSchema({
  pageUrl,
  casinoName,
  offerUrl,
  bonuses,
}: OfferSchemaProps) {
  if (!bonuses?.length) return null;

  return bonuses.slice(0, 10).map((bonus) => ({
    "@type": "Offer",
    "@id": `${pageUrl}#offer-${bonus.id}`,

    name: bonus.title || `${casinoName} ${bonus.type ?? "Bonus"}`,

    category: bonus.type || "Casino Bonus",

    description: [
      bonus.amount,
      bonus.wagering_requirement
        ? `Wagering requirement: ${bonus.wagering_requirement}`
        : null,
      bonus.bonus_code ? `Bonus code: ${bonus.bonus_code}` : null,
    ]
      .filter(Boolean)
      .join(". "),

    url: offerUrl || pageUrl,

    seller: {
      "@type": "Organization",
      name: casinoName,
    },

    itemOffered: {
      "@type": "Service",
      name: `${casinoName} — ${bonus.title || bonus.type || "Casino Bonus"}`,
      serviceType: "Online Casino Bonus Promotion",
    },

    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },

    availability: "https://schema.org/InStock",
  }));
}

export function withExactPrice<T extends Record<string, unknown>>(
  offer: T,
  price: number,
  priceCurrency: string,
): T & { priceSpecification: object } {
  return {
    ...offer,
    priceSpecification: {
      "@type": "PriceSpecification",
      price,
      priceCurrency,
    },
  };
}
