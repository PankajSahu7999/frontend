import { getMediaUrl } from '@/config/api.config';

// Curated high-resolution realistic casino photography for each category and topic
const SLOTS_IMAGES = [
  'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=800&q=80', // Slot Machine Neon
  'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&w=800&q=80', // Casino Floor
  'https://images.unsplash.com/photo-1606167668584-78701c57f13d?auto=format&fit=crop&w=800&q=80', // Glowing Reels
  'https://images.unsplash.com/photo-1605870445919-838d190e8e1b?auto=format&fit=crop&w=800&q=80', // 777 Jackpot
  'https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&w=800&q=80', // Casino Lights
  'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&w=800&q=80', // Slot Hall
];

const BLACKJACK_IMAGES = [
  'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?auto=format&fit=crop&w=800&q=80', // Blackjack cards & chips
  'https://images.unsplash.com/photo-1541278107931-e006523892df?auto=format&fit=crop&w=800&q=80', // Aces and Cards
  'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=800&q=80', // Dealer table
  'https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?auto=format&fit=crop&w=800&q=80', // Ace of spades & chips
  'https://images.unsplash.com/photo-1595769816263-9b910be24d5f?auto=format&fit=crop&w=800&q=80', // Green felt card game
];

const ROULETTE_IMAGES = [
  'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=800&q=80', // Spinning wheel
  'https://images.unsplash.com/photo-1606167668584-78701c57f13d?auto=format&fit=crop&w=800&q=80', // Roulette wheel close-up
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80', // Single zero wheel
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=800&q=80', // Chips on betting grid
  'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&w=800&q=80', // Casino table atmosphere
];

const BACCARAT_IMAGES = [
  'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=800&q=80', // VIP Dealer Shoe
  'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?auto=format&fit=crop&w=800&q=80', // High stakes cards
  'https://images.unsplash.com/photo-1541278107931-e006523892df?auto=format&fit=crop&w=800&q=80', // Baccarat table
  'https://images.unsplash.com/photo-1595769816263-9b910be24d5f?auto=format&fit=crop&w=800&q=80', // VIP salon
];

const CRAPS_IMAGES = [
  'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=800&q=80', // Red dice in action
  'https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&w=800&q=80', // Rolling dice
  'https://images.unsplash.com/photo-1605870445919-838d190e8e1b?auto=format&fit=crop&w=800&q=80', // Craps betting layout
  'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&w=800&q=80', // Pass line table
];

const POKER_IMAGES = [
  'https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&w=800&q=80', // Poker chips stacks
  'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?auto=format&fit=crop&w=800&q=80', // Royal flush
  'https://images.unsplash.com/photo-1541278107931-e006523892df?auto=format&fit=crop&w=800&q=80', // Poker tournament
  'https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?auto=format&fit=crop&w=800&q=80', // All-in chips
  'https://images.unsplash.com/photo-1595769816263-9b910be24d5f?auto=format&fit=crop&w=800&q=80', // Live poker table
];

const MORE_IMAGES = [
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=800&q=80', // Lottery / Bingo balls
  'https://images.unsplash.com/photo-1605870445919-838d190e8e1b?auto=format&fit=crop&w=800&q=80', // Scratch numbers
  'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=800&q=80', // Keno tokens
];

// Hash function to consistently select an image for a specific guide based on its title/slug
const getHash = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

export const getGuideDisplayImage = (guide: {
  category?: string;
  title?: string;
  slug?: string;
  featured_image?: string | null;
}): string => {
  if (guide.featured_image && guide.featured_image.trim()) {
    return getMediaUrl(guide.featured_image);
  }

  const key = guide.slug || guide.title || 'default';
  const hash = getHash(key);
  const cat = (guide.category || '').toLowerCase();

  if (cat.includes('slot')) {
    return SLOTS_IMAGES[hash % SLOTS_IMAGES.length];
  }
  if (cat.includes('blackjack')) {
    return BLACKJACK_IMAGES[hash % BLACKJACK_IMAGES.length];
  }
  if (cat.includes('roulette')) {
    return ROULETTE_IMAGES[hash % ROULETTE_IMAGES.length];
  }
  if (cat.includes('baccarat')) {
    return BACCARAT_IMAGES[hash % BACCARAT_IMAGES.length];
  }
  if (cat.includes('craps')) {
    return CRAPS_IMAGES[hash % CRAPS_IMAGES.length];
  }
  if (cat.includes('poker')) {
    return POKER_IMAGES[hash % POKER_IMAGES.length];
  }
  return MORE_IMAGES[hash % MORE_IMAGES.length];
};
