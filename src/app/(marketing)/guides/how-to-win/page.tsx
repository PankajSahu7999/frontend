import { generateSEO } from "@/lib/seo";
import HowToWinClient from "./HowToWinClient";
import {
  breadcrumbSchema,
  buildSchemaGraph,
  faqSchema,
  howToSchema,
  webpageSchema,
} from "@/lib/seo/schemas";
import JsonLd from "@/components/seo/JsonLd";

interface Guide {
  id: string;
  category: string;
  title: string;
  slug: string;
  featured_image?: string;
  excerpt: string;
  published_at: string;
  sort_order?: number;
}

const CATEGORY_ORDER = [
  "Slots Guides",
  "Blackjack Guides",
  "Roulette Guides",
  "Baccarat Guides",
  "Craps Guides",
  "Poker Guides",
  "More Guides",
];

export const metadata = generateSEO({
  title:
    "How to Win at Online Casinos: Odds, Smart Player, RTP & Bankroll Strategies",
  description:
    "Learn the best strategies to win at online casinos with our comprehensive guide. Improve your chances of success with expert tips and insights.",
  path: "/guides/how-to-win",
  keywords: [
    "how to win online casino",
    "how to win at online casinos",
    "online casino strategies",
    "RTP guide",
    "bankroll management",
    "smart player tips",
    "high rtp slots",
    "casino bankroll calculator",
    "blackjack house edge",
    "blackjack strategy",
    "roulette strategy",
    "baccarat strategy",
  ],
});

const PAGE_URL = "https://casinoreviewsbook.com/guides/how-to-win";

const graph = buildSchemaGraph({
  webpage: webpageSchema({
    url: PAGE_URL,
    title:
      "How to Win at Online Casinos: Odds, Smart Play, RTP & Bankroll Strategies",
    description:
      "Educational guide covering RTP, bankroll management, casino odds, game selection, and responsible gambling.",
  }),

  breadcrumb: breadcrumbSchema({
    pageUrl: PAGE_URL,
    items: [
      {
        name: "Home",
        url: "https://casinoreviewsbook.com",
      },
      {
        name: "Guides",
        url: "https://casinoreviewsbook.com/guides",
      },
      {
        name: "How to Win",
        url: PAGE_URL,
      },
      
    ],
  }),
 
  faq: faqSchema({
    pageUrl: PAGE_URL,
    faqs: [
      {
        question: "Is there a guaranteed trick to beat online casinos?",
        answer:
          "No. There is no guaranteed strategy that can consistently beat licensed online casinos. Every casino game has a mathematical house edge. Players can make informed decisions by choosing games with higher RTP, understanding game rules, managing their bankroll responsibly, and avoiding chasing losses.",
      },
      {
        question: "Which online casino games offer the best odds of winning?",
        answer:
          "Games with the lowest house edge generally provide the best long-term odds. Blackjack played with optimal basic strategy typically offers one of the lowest house edges, followed by certain baccarat bets and some video poker variants. High-RTP slot games may also provide better long-term return compared to lower-RTP slots.",
      },
      {
        question: "What is RTP and why is it important?",
        answer:
          "RTP (Return to Player) is the theoretical percentage of wagered money that a game is expected to return to players over a very large number of rounds. A higher RTP generally indicates better long-term value, although it does not guarantee short-term winnings.",
      },
      {
        question: "How do casino bonuses help you win?",
        answer:
          "Bonuses can increase your starting bankroll and provide additional playing opportunities. However, they usually include wagering requirements, maximum bet limits, eligible games, and other terms that should be reviewed before claiming a promotion.",
      },
      {
        question: "Are there any specific casino games that offer higher RTP?",
        answer:
          "Yes, some casino games have higher RTP, such as blackjack, roulette, and baccarat. These games are often considered higher risk and may require more careful management of bankroll.",
      },
    ],
  }),
  howTo: howToSchema({
    pageUrl: PAGE_URL,
    name: "How to Win at Online Casinos",
    description:
      "A step-by-step approach to playing online casino games with better long-term odds.",
    steps: [
      {
        name: "Check the game's RTP before you play",
        text: "Look up the Return to Player (RTP) percentage for the specific slot or table game. Higher RTP generally means better long-term value, though it never guarantees short-term results.",
        url: `${PAGE_URL}#rtp`,
      },
      {
        name: "Choose games with a lower house edge",
        text: "Blackjack played with optimal basic strategy, certain baccarat bets, and some video poker variants typically offer the lowest house edge among casino games.",
        url: `${PAGE_URL}#house-edge`,
      },
      {
        name: "Set a bankroll and stick to it",
        text: "Decide how much you can afford to lose before you start playing, and treat that amount as your total budget for the session — never chase losses beyond it.",
        url: `${PAGE_URL}#bankroll`,
      },
      {
        name: "Read bonus terms before claiming",
        text: "Check wagering requirements, maximum bet limits while a bonus is active, and which games count toward clearing it before you opt in to any promotion.",
        url: `${PAGE_URL}#bonuses`,
      },
      {
        name: "Play only at licensed, audited casinos",
        text: "Confirm the casino holds a valid gaming license and has independently audited RNG/RTP figures before depositing any real money.",
        url: `${PAGE_URL}#licensing`,
      },
    ],
    totalTime: "PT10M", // optional, only if genuinely accurate
  }) ?? undefined
});

// export default function HowToWinGuidesHubPage() {
//   const [guides, setGuides] = useState<Guide[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");

//   useEffect(() => {
//     fetchGuides();
//   }, []);

//   const fetchGuides = async () => {
//     setIsLoading(true);
//     try {
//       const res = await fetch(buildApiUrl("/guides?status=published"));
//       if (res.ok) {
//         const data = await res.json();
//         setGuides(data.guides || data || []);
//       }
//     } catch (err) {
//       console.error("Failed to fetch guides", err);
//     }
//     setIsLoading(false);
//   };

//   // Group and filter guides
//   const filteredGuides = useMemo(() => {
//     return guides.filter((g) => {
//       const matchesCat =
//         selectedCategory === "All" ||
//         g.category?.toLowerCase() === selectedCategory.toLowerCase();
//       const matchesSearch =
//         !searchQuery ||
//         g.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         g.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         g.category?.toLowerCase().includes(searchQuery.toLowerCase());
//       return matchesCat && matchesSearch;
//     });
//   }, [guides, selectedCategory, searchQuery]);

//   // Group by category for section layout
//   const groupedByCategory = useMemo(() => {
//     const map: Record<string, Guide[]> = {};

//     CATEGORY_ORDER.forEach((cat) => {
//       map[cat] = [];
//     });

//     filteredGuides.forEach((g) => {
//       const cat = g.category || "More Guides";
//       if (!map[cat]) {
//         map[cat] = [];
//       }
//       map[cat].push(g);
//     });

//     return map;
//   }, [filteredGuides]);

//   const formatDate = (dateStr?: string) => {
//     if (!dateStr) return "";
//     try {
//       const d = new Date(dateStr);
//       const day = String(d.getDate()).padStart(2, "0");
//       const month = String(d.getMonth() + 1).padStart(2, "0");
//       const year = d.getFullYear();
//       const hours = String(d.getHours()).padStart(2, "0");
//       const mins = String(d.getMinutes()).padStart(2, "0");
//       return `${day}/${month}/${year} ${hours}:${mins}`;
//     } catch {
//       return dateStr;
//     }
//   };

export default function Page() {
  return (
    <>
      <JsonLd data={graph} />
      <HowToWinClient />
    </>
    // <div className="w-full pb-16">
    //   {/* Hero Card matching the site's design language */}
    //   <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[0px_4px_16px_rgba(38,123,220,0.08)] p-6 sm:p-10 mb-8">
    //     <div className="max-w-5xl">
    //       {/* Badge */}
    //       <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-white text-xs font-semibold border border-[#F59E0B4D] bg-[linear-gradient(90deg,_#F59E0B_0%,_#D97706_100%)] mb-4">
    //         <Sparkles size={14} />
    //         <span>Expert Casino Strategy & Rules Hub</span>
    //       </div>

    //       <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
    //         Casino Guides:{" "}
    //         <span className="text-transparent bg-clip-text bg-[linear-gradient(90deg,_#F59E0B_0%,_#D97706_100%)]">
    //           Your Hub for Blackjack, Roulette, Slots & More
    //         </span>
    //       </h1>

    //       <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-normal mb-8">
    //         Everything you need to play smarter, in one place. Our complete
    //         library of expert casino guides covers blackjack, roulette,
    //         baccarat, slots, craps, poker, video poker, and more - whether
    //         you&apos;re learning the rules for the first time or refining a
    //         winning strategy, you&apos;ll find clear, no-nonsense advice from
    //         seasoned players in every guide.
    //       </p>

    //       {/* Category Filter Pills */}
    //       <div className="flex items-center gap-2 flex-wrap pt-1">
    //         <button
    //           onClick={() => setSelectedCategory("All")}
    //           className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-150 border ${
    //             selectedCategory === "All"
    //               ? "bg-[linear-gradient(90deg,_#F59E0B_0%,_#D97706_100%)] text-white border-[#F59E0B] shadow-sm scale-105"
    //               : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300"
    //           }`}
    //         >
    //           All Guides ({guides.length})
    //         </button>
    //         {CATEGORY_ORDER.map((cat) => {
    //           const count = guides.filter(
    //             (g) => g.category?.toLowerCase() === cat.toLowerCase(),
    //           ).length;
    //           return (
    //             <button
    //               key={cat}
    //               onClick={() => setSelectedCategory(cat)}
    //               className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-150 border flex items-center gap-1.5 ${
    //                 selectedCategory === cat
    //                   ? "bg-[linear-gradient(90deg,_#F59E0B_0%,_#D97706_100%)] text-white border-[#F59E0B] shadow-sm scale-105"
    //                   : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300"
    //               }`}
    //             >
    //               <span>{cat}</span>
    //               {count > 0 && (
    //                 <span
    //                   className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
    //                     selectedCategory === cat
    //                       ? "bg-white/20 text-white"
    //                       : "bg-gray-200 text-gray-600"
    //                   }`}
    //                 >
    //                   {count}
    //                 </span>
    //               )}
    //             </button>
    //           );
    //         })}
    //       </div>
    //     </div>
    //   </div>

    //   {/* Search & Control Bar */}
    //   <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-4 mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
    //     <div className="relative w-full sm:max-w-md">
    //       <Search
    //         className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
    //         size={18}
    //       />
    //       <input
    //         type="text"
    //         placeholder="Search guides by game, strategy, RTP, or variant..."
    //         value={searchQuery}
    //         onChange={(e) => setSearchQuery(e.target.value)}
    //         className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-medium"
    //       />
    //     </div>

    //     <div className="flex items-center gap-2 text-xs text-gray-500 shrink-0 font-medium">
    //       <Layers size={15} className="text-amber-500" />
    //       <span>
    //         Showing{" "}
    //         <span className="font-bold text-gray-900">
    //           {filteredGuides.length}
    //         </span>{" "}
    //         guides
    //       </span>
    //     </div>
    //   </div>

    //   {/* Loading State */}
    //   {isLoading ? (
    //     <div className="py-20 text-center bg-white rounded-2xl border border-gray-200/80 p-8 shadow-xs">
    //       <div className="inline-block animate-spin rounded-full h-9 w-9 border-4 border-amber-500 border-t-transparent mb-3" />
    //       <p className="text-sm text-gray-500 font-medium">
    //         Loading casino guides...
    //       </p>
    //     </div>
    //   ) : filteredGuides.length === 0 ? (
    //     <div className="py-16 text-center bg-white border border-gray-200/80 rounded-2xl p-8 shadow-xs">
    //       <BookOpen className="mx-auto text-gray-400 mb-3" size={38} />
    //       <h3 className="text-lg font-bold text-gray-900 mb-1">
    //         No Guides Found
    //       </h3>
    //       <p className="text-sm text-gray-500 max-w-md mx-auto">
    //         We couldn&apos;t find any guides matching &quot;{searchQuery}&quot;.
    //         Try choosing a different category or resetting your search.
    //       </p>
    //       <button
    //         onClick={() => {
    //           setSearchQuery("");
    //           setSelectedCategory("All");
    //         }}
    //         className="mt-4 px-4 py-2 bg-[linear-gradient(90deg,_#F59E0B_0%,_#D97706_100%)] text-white font-bold rounded-xl text-xs shadow-sm hover:brightness-105 transition-all"
    //       >
    //         Reset Filters
    //       </button>
    //     </div>
    //   ) : (
    //     /* Categorized Guide Sections */
    //     <div className="space-y-12">
    //       {Object.entries(groupedByCategory).map(([categoryName, items]) => {
    //         if (items.length === 0) return null;

    //         return (
    //           <section
    //             key={categoryName}
    //             id={categoryName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
    //             className="scroll-mt-24"
    //           >
    //             {/* Section Title */}
    //             <div className="flex items-center justify-between pb-3 mb-6 border-b border-gray-200">
    //               <div className="flex items-center gap-2.5">
    //                 <div className="w-2.5 h-6 rounded-full bg-[linear-gradient(180deg,_#F59E0B_0%,_#D97706_100%)]" />
    //                 <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
    //                   {categoryName}
    //                 </h2>
    //                 <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
    //                   {items.length} {items.length === 1 ? "guide" : "guides"}
    //                 </span>
    //               </div>
    //             </div>

    //             {/* Cards Grid with Proper Photo Cover Images */}
    //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    //               {items.map((guide) => {
    //                 const imgSrc = getGuideDisplayImage(guide);
    //                 return (
    //                   <Link
    //                     key={guide.id || guide.slug}
    //                     href={`/guides/${guide.slug}`}
    //                     className="group flex flex-col justify-between bg-white hover:bg-slate-50/50 border border-gray-200/90 hover:border-amber-400 rounded-2xl p-4 shadow-[0px_4px_16px_rgba(38,123,220,0.06)] hover:shadow-lg transition-all duration-200 hover:-translate-y-1 overflow-hidden"
    //                   >
    //                     <div>
    //                       {/* Rich Photo Cover */}
    //                       <div className="relative w-full h-44 rounded-xl overflow-hidden mb-4 bg-slate-900">
    //                         <Image
    //                           src={imgSrc}
    //                           alt={guide.title}
    //                           fill
    //                           className="object-cover group-hover:scale-105 transition-transform duration-300 brightness-95 group-hover:brightness-100"
    //                           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    //                         />
    //                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
    //                         <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-white text-[11px] font-bold shadow-sm">
    //                           {guide.category}
    //                         </span>
    //                       </div>

    //                       {/* Title */}
    //                       <h3 className="text-base font-bold text-gray-900 group-hover:text-amber-600 transition-colors leading-snug mb-2 line-clamp-2">
    //                         {guide.title}
    //                       </h3>

    //                       {/* Excerpt */}
    //                       <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-4">
    //                         {guide.excerpt}
    //                       </p>
    //                     </div>

    //                     {/* Footer: Date & Read Link */}
    //                     <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px]">
    //                       <div className="flex items-center gap-1.5 text-gray-400 font-medium">
    //                         <Clock size={12} className="text-gray-400" />
    //                         <span>{formatDate(guide.published_at)}</span>
    //                       </div>

    //                       <span className="inline-flex items-center font-bold text-amber-600 group-hover:text-amber-700 transition-colors">
    //                         Read Guide
    //                         <ChevronRight
    //                           size={13}
    //                           className="ml-0.5 group-hover:translate-x-0.5 transition-transform"
    //                         />
    //                       </span>
    //                     </div>
    //                   </Link>
    //                 );
    //               })}
    //             </div>
    //           </section>
    //         );
    //       })}
    //     </div>
    //   )}

    //   {/* Bottom Trust & E-E-A-T Guarantee Banner */}
    //   <div className="mt-14 bg-white border border-gray-200/80 rounded-2xl p-6 sm:p-8 shadow-[0px_4px_16px_rgba(38,123,220,0.06)] flex flex-col sm:flex-row items-center justify-between gap-6">
    //     <div className="flex items-center gap-4">
    //       <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
    //         <ShieldCheck size={26} />
    //       </div>
    //       <div>
    //         <h4 className="text-base font-bold text-gray-900">
    //           100% Independent & Verified Casino Strategies
    //         </h4>
    //         <p className="text-xs text-gray-600 mt-1 max-w-xl">
    //           Every guide is reviewed by experienced casino analysts,
    //           prioritizing transparent mathematics, house edge awareness, and
    //           responsible gaming principles.
    //         </p>
    //       </div>
    //     </div>
    //     <Link
    //       href="/responsible-gambling"
    //       className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold border border-gray-300 transition-colors shrink-0"
    //     >
    //       Responsible Gaming
    //     </Link>
    //   </div>
    // </div>
  );
}
