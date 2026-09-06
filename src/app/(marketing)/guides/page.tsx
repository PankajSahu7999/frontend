import { generateSEO } from '@/lib/seo/metadata';
import HowToWinGuidesHubPage from './how-to-win/page';



export const metadata = generateSEO({
  title: 'Casino Guides: Your Hub for Blackjack, Roulette & More',
  description:'Everything you need to play smarter, in one place. Complete library of expert casino guides covering blackjack, roulette, baccarat, slots, craps, poker, and more.',
  path: '/guides',
})

export default function GuidesRootPage() {
  return <HowToWinGuidesHubPage />;
}
