'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
    Home,
    Gift,
    Megaphone,
    Trophy,
    Dices,
    X,
    Headphones,
    CircleHelp,
    ShieldAlert,
    ChevronDown,
    Info,
    Mail,
    Flame,
    Tv,
    Scale,
    Globe
} from 'lucide-react';

interface SidebarProps {
    open: boolean;
    onClose?: () => void;
}

const menuItems = [
    { name: 'Home', href: '/', icon: Home },
   
    {
        name: 'Casinos',
        icon: Trophy,
        subItems: [
            { name: 'Online Casinos', href: '/casinos/online-casino' },
            { name: 'Real Money Casinos', href: '/casinos/real-money-casinos' },
            { name: 'Crypto Casinos', href: '/casinos/crypto-casinos' },
            { name: 'Mobile Casinos', href: '/casinos/mobile-casinos' },
            { name: 'Instant Play Casinos', href: '/casinos/instant-play-casinos' },
            { name: 'Sweepstakes Casinos', href: '/casinos/sweepstakes-casinos' },
            { name: 'Pay N Play Casinos', href: '/casinos/pay-n-play-casinos' },
            { name: 'Newest Casinos', href: '/casinos/newest-casino' },
            { name: 'Certified Casinos', href: '/casinos/certified-casino' },
            { name: 'Casino Companies', href: '/casinos/casino-companies' },
            { name: 'Fast Withdrawal Casinos', href: '/casinos/fast-withdrawal-casinos' },
            { name: 'Best Payout Casinos', href: '/casinos/best-payout-casinos' },
            { name: 'Low Deposit Casinos', href: '/casinos/low-deposit-casinos' },
            { name: 'No Deposit Casinos', href: '/casinos/no-deposit-casinos' },
            { name: 'High Roller Casinos', href: '/casinos/high-roller-casinos' },
            { name: 'Live Dealer Casinos', href: '/casinos/live-dealer-casinos' },
            { name: 'Licensed Casinos', href: '/casinos/licensed-casinos' },
            { name: 'Trusted Casinos', href: '/casinos/trusted-casinos' },
            { name: 'Casinos by Country', href: '/casinos/casinos-by-country' },
            { name: 'Casinos by Deposit Method', href: '/casinos/casinos-by-deposit-method' },
            { name: 'Casinos by Game Provider', href: '/casinos/casinos-by-game-provider' },
            { name: 'Casinos by License', href: '/casinos/casinos-by-license' },
        ]
    },
    {
        name: 'Bonuses',
        icon: Gift,
        subItems: [
            { name: 'Casino Bonuses', href: '/bonuses/casino-bonuses' },
            { name: 'Latest Bonuses', href: '/bonuses/latest-bonuses' },
            { name: 'Exclusive Bonuses', href: '/bonuses/exclusive-bonuses' },
            { name: 'Bonuses by Country', href: '/bonuses/bonuses-by-country' },
            { name: 'Welcome Bonuses', href: '/bonuses/welcome-bonuses' },
            { name: 'No Deposit Bonuses', href: '/bonuses/no-deposit-bonuses' },
            { name: 'Free Spins Bonuses', href: '/bonuses/free-spins-bonuses' },
            { name: 'Deposit Bonuses', href: '/bonuses/deposit-bonuses' },
            { name: 'Match Deposit Bonuses', href: '/bonuses/match-deposit-bonuses' },
            { name: 'Minimum Deposit Bonuses', href: '/bonuses/minimum-deposit-bonuses' },
            { name: 'Cashback Bonuses', href: '/bonuses/cashback-bonuses' },
            { name: 'Reload Bonuses', href: '/bonuses/reload-bonuses' },
            { name: 'High Roller Bonuses', href: '/bonuses/high-roller-bonuses' },
            { name: 'Crypto Bonuses', href: '/bonuses/crypto-bonuses' },
            { name: 'Sweepstakes Bonuses', href: '/bonuses/sweepstakes-bonuses' },
            { name: 'No Wagering Bonuses', href: '/bonuses/no-wagering-bonuses' },
            { name: 'VIP Bonuses', href: '/bonuses/vip-bonuses' },
            { name: 'Referral Bonuses', href: '/bonuses/referral-bonuses' },
            { name: 'Loyalty Bonuses', href: '/bonuses/loyalty-bonuses' },
            { name: 'Daily Bonuses', href: '/bonuses/daily-bonuses' },
            { name: 'Weekly Bonuses', href: '/bonuses/weekly-bonuses' },
            { name: 'Weekend Bonuses', href: '/bonuses/weekend-bonuses' },
            { name: 'Birthday Bonuses', href: '/bonuses/birthday-bonuses' },
            { name: 'Tournament Bonuses', href: '/bonuses/tournament-bonuses' },
            { name: 'Referral Friend Bonuses', href: '/bonuses/refer-a-friend-bonuses' }
        ]
    },
    {
        name: 'Games',
        icon: Dices,
        subItems: [
            { name: 'Casino Games', href: '/games/casino-games' },
            { name: 'Table Games', href: '/games/table-games' },
            { name: 'Card Games', href: '/games/card-games' },
            { name: 'Dice Games', href: '/games/dice-games' },
            { name: 'Poker Games', href: '/games/poker-games' },
            { name: 'Blackjack Games', href: '/games/blackjack-games' },
            { name: 'Roulette Games', href: '/games/roulette-games' },
            { name: 'Craps Games', href: '/games/craps-games' },
            { name: 'Bingo Games', href: '/games/bingo-games' },
            { name: 'Baccarat Games', href: '/games/baccarat-games' },
            { name: 'Lottery Games', href: '/games/lottery-games' },
            { name: 'Real Money Games', href: '/games/real-money-games' },
            { name: 'Free Slot Tournaments', href: '/games/free-slot-tournaments' },
        ]
    },
    {
        name: 'Slots',
        icon: Flame,
        subItems: [
            { name: 'Video Slots', href: '/slots/video-slots' },
            { name: 'Classic Slots', href: '/slots/classic-slots' },
            { name: 'Progressive Slots', href: '/slots/progressive-slots' },
            { name: 'New Slots', href: '/slots/new-slots' },
        ]
    },
    {
        name: 'Betting',
        icon: Tv,
        subItems: [
            { name: 'Sports Betting', href: '/betting/sports-betting' },
            { name: 'Betting Tips', href: '/betting/betting-tips' },
            { name: 'Sportsbook Reviews', href: '/betting/sportsbook-reviews' },
            { name: 'New Betting Sites', href: '/betting/new-betting-sites' },
            { name: 'Live Scores', href: '/betting/live-scores' },
            { name: 'Popular Competitions', href: '/betting/popular-competitions' },
            { name: 'World Cup 2026', href: '/betting/world-cup-2026' },
            { name: 'Bet Types', href: '/betting/bet-types' },
            { name: 'Betting Features', href: '/betting/betting-features' },
            { name: 'Odds Forums', href: '/betting/odds-forums' },
            { name: 'Betting by Country', href: '/betting/betting-by-country' },
            { name: 'Deposit Methods', href: '/betting/deposit-methods' },
            { name: 'Betting Bonuses', href: '/betting/betting-bonuses' },
            { name: 'Welcome Bonuses', href: '/betting/welcome-bonuses' },
            { name: 'Free Bonuses', href: '/betting/free-bonuses' },
            { name: 'Betting Bonuses by Country', href: '/betting/betting-bonuses-by-country' },
            { name: 'Prediction Markets', href: '/betting/prediction-markets' },
            { name: 'Odds Calculator', href: '/betting/odds-calculator' },
        ]
    },
     { name: 'Compare Casinos', href: '/compare-casinos', icon: Scale },
     { name: 'Casinos by Country', href: '/casinos-by-country', icon: Globe },
     { name: 'Casino Bonuses', href: '/casino-bonuses', icon: Gift },
    { name: 'Casino News', href: '/news', icon: Megaphone },
    {
        name: 'Guides & Strategy',
        icon: CircleHelp,
        subItems: [
            { name: 'How to Win Guide', href: '/guides/how-to-win' },
            { name: 'Crypto Gambling 101', href: '/guides/crypto-gambling-101' }
        ]
    },
    { name: 'About Us', href: '/about-us', icon: Info },
    { name: 'Contact Us', href: '/contact-us', icon: Mail },
    { name: 'Responsible Play', href: '/responsible-gambling', icon: ShieldAlert },
];

export default function Sidebar({ open, onClose }: SidebarProps) {
    const pathname = usePathname();
    const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});

    const toggleDropdown = (name: string) => {
        setOpenDropdowns((prev) => ({ ...prev, [name]: !prev[name] }));
    };

    return (
        <div
            className={`fixed left-0 top-0 w-[260px] h-full z-50 transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                }`}
        >
            <aside className="w-full h-full bg-[#EEF3FE] flex flex-col">
                {/* Sticky Logo Header */}
                <div className="h-20 flex items-center justify-between px-[22px] shrink-0 sticky top-0 bg-[#EEF3FE] z-30">
                    {/* Logo Container */}
                    <div className="flex-1 flex items-center justify-center h-full min-w-0">
                        <Link
                            href="/"
                            onClick={onClose}
                            className="inline-flex items-center justify-center w-full max-w-[340px]"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="260 210 770 240"
                                className="w-full h-auto max-h-[68px] block"
                            >
                                <defs>
                                    <linearGradient
                                        id="vectorGradient"
                                        x1="0%"
                                        y1="0%"
                                        x2="100%"
                                        y2="100%"
                                    >
                                        <stop offset="0%" stopColor="#3165CD" />
                                        <stop offset="45%" stopColor="#4A7BD1" />
                                        <stop offset="75%" stopColor="#B88094" />
                                        <stop offset="100%" stopColor="#D98A6C" />
                                    </linearGradient>

                                    <filter
                                        id="subtleShadow"
                                        x="-20%"
                                        y="-20%"
                                        width="140%"
                                        height="140%"
                                    >
                                        <feDropShadow
                                            dx="0"
                                            dy="4"
                                            stdDeviation="8"
                                            floodColor="#000000"
                                            floodOpacity="0.08"
                                        />
                                    </filter>
                                </defs>

                                {/* Icon Background */}
                                <rect
                                    x="270"
                                    y="220"
                                    width="220"
                                    height="220"
                                    rx="55"
                                    fill="#FFFFFF"
                                    stroke="#E2E8F0"
                                    strokeWidth="2"
                                    filter="url(#subtleShadow)"
                                />

                                {/* Star */}
                                <path
                                    d="M 380 255 
                       C 384 300, 394 318, 445 330 
                       C 394 342, 384 360, 380 405 
                       C 376 360, 366 342, 315 330 
                       C 366 318, 376 300, 380 255 Z"
                                    fill="url(#vectorGradient)"
                                />

                                {/* Circle */}
                                <circle
                                    cx="422"
                                    cy="280"
                                    r="17"
                                    fill="url(#vectorGradient)"
                                />

                                {/* Text (Shifted right to add gap) */}
                                <text
                                    x="525"
                                    y="300"
                                    fontFamily="'Plus Jakarta Sans', 'Outfit', sans-serif"
                                    fontSize="56"
                                    letterSpacing="1.5"
                                >
                                    <tspan
                                        x="525"
                                        dy="0"
                                        fill="#2563EB" /* Royal Blue */
                                        fontWeight="400"
                                    >
                                        CASINO
                                    </tspan>

                                    <tspan
                                        x="525"
                                        dy="62"
                                        fill="#1E293B" /* Dark Slate */
                                        fontWeight="700"
                                    >
                                        REVIEWS BOOK
                                    </tspan>
                                </text>
                            </svg>
                        </Link>
                    </div>

                    {/* Close button on mobile */}
                    <button
                        onClick={onClose}
                        className="lg:hidden w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-slate-500 hover:bg-white shrink-0"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Scrollable Content Container */}
                <div className="flex flex-col flex-1 overflow-y-auto px-[22px] pt-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    {/* Join Bonus Card */}
                    <div className="relative w-[212px] h-[68px] rounded-[20px] bg-[#C9D8FF] backdrop-blur-[20px] flex items-center px-5 gap-4 mb-6 shrink-0 overflow-hidden shadow-[0_8px_30px_rgba(88,140,243,0.15)]">
                        <div className="absolute w-[45px] h-[48px] top-[8px] left-[12px] bg-[#2E68FB]/30 blur-[20px] rounded-full pointer-events-none" />
                        <div className="absolute w-[51px] h-[54px] top-[-7px] left-[166px] bg-[#2E68FB]/30 blur-[20px] rounded-full pointer-events-none" />
                        <div className="flex items-center justify-center overflow-hidden shrink-0 z-10">
                            <Image src="/icons/Group8.png" alt="Bonus" width={32} height={32} className="object-contain" />
                        </div>
                        <div className="leading-tight z-10">
                            <p className="text-[15px] font-semibold text-[#111827]">Join Now</p>
                            <p className="text-[14px] font-bold text-[#588CF3]">Get $100</p>
                        </div>
                    </div>

                    {/* Navigation Menu Links */}
                    <nav className="space-y-1 mb-6">
                        {menuItems.map((item) => {
                            const Icon = item.icon;

                            if (item.subItems) {
                                const isDropdownOpen = !!openDropdowns[item.name];
                                const isAnyChildActive = item.subItems.some(sub => pathname === sub.href);

                                return (
                                    <div key={item.name} className="flex flex-col w-[212px]">
                                        <button
                                            onClick={() => toggleDropdown(item.name)}
                                            className={`w-full h-[46px] rounded-[8px] px-[10px] py-[11px] flex items-center justify-between transition-all duration-300 ${isAnyChildActive
                                                ? 'border border-[#C5D6FF] bg-white/40'
                                                : 'hover:border hover:border-[#C5D6FF] hover:bg-white/50'
                                                }`}
                                        >
                                            <div className="flex items-center gap-[10px]">
                                                <Icon className={`w-5 h-5 ${isAnyChildActive ? 'text-[#3B6BFF]' : 'text-slate-500'}`} />
                                                <span className={`text-[15px] font-medium ${isAnyChildActive ? 'text-[#172554]' : 'text-slate-700'}`}>
                                                    {item.name}
                                                </span>
                                            </div>
                                            <ChevronDown
                                                size={16}
                                                className={`text-slate-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                                            />
                                        </button>

                                        {/* Dropdown child items list without internal scroll container */}
                                        <div
                                            className={`transition-all duration-300 ease-in-out overflow-hidden ${isDropdownOpen ? 'max-h-[400px] opacity-100 mt-1 pb-2' : 'max-h-0 opacity-0'
                                                }`}
                                        >
                                            <div className="pl-8 space-y-1 border-l-2 border-[#C5D6FF]/50 ml-4 mt-1">
                                                {item.subItems.map((subItem) => {
                                                    const isChildActive = pathname === subItem.href;
                                                    return (
                                                        <Link
                                                            key={subItem.name}
                                                            href={subItem.href}
                                                            onClick={onClose}
                                                            className={`block py-1.5 text-[13px] font-medium transition-colors ${isChildActive ? 'text-[#3B6BFF] font-semibold' : 'text-slate-600 hover:text-[#3B6BFF]'
                                                                }`}
                                                        >
                                                            {subItem.name}
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                );
                            }

                            // Standard non-dropdown Link items
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href!}
                                    onClick={onClose}
                                    className={`w-[212px] h-[46px] rounded-[8px] px-[10px] py-[11px] flex items-center gap-[10px] transition-all duration-300 ${isActive
                                        ? 'border border-[#C5D6FF] bg-[linear-gradient(180deg,rgba(88,140,243,0.02)_0%,rgba(88,140,243,0.02)_50.17%,rgba(88,140,243,0.2)_108.7%)] shadow-sm'
                                        : 'hover:border hover:border-[#C5D6FF] hover:bg-white/50'
                                        }`}
                                >
                                    <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-[#3B6BFF]' : 'text-slate-500'}`} />
                                    <span className={`text-[15px] font-medium transition-colors ${isActive ? 'text-[#172554]' : 'text-slate-700'}`}>
                                        {item.name}
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="mt-2 rounded-tl-[12px] rounded-tr-[12px] shrink-0 relative bg-[#EEF3FE] flex items-center justify-center gap-3 before:content-[''] before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-[212px] before:h-[2px] before:[background:radial-gradient(50%_50%_at_50%_50%,#588CF3_42.79%,#EEF3FE_100%)]"
                        style={{ '--divider-gradient': 'radial-gradient(50% 50% at 50% 50%, #588CF3 42.79%, #EEF3FE 100%)' } as React.CSSProperties}
                    />

                    {/* Live Platform Stats */}
                    <div className="bg-white/40 border border-slate-200/40 rounded-xl p-3 my-4 text-left shrink-0">
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Live Platform Stats</p>
                        <div className="mt-2 space-y-1">
                            <p className="text-[13px] text-slate-600 font-medium">Active Players: <span className="text-emerald-500 font-semibold">14,204</span></p>
                            <p className="text-[13px] text-slate-600 font-medium">24h Payouts: <span className="text-[#3B6BFF] font-semibold">$1.2M</span></p>
                        </div>
                    </div>

                    {/* Promo Card */}
                    <div className="mt-auto pt-4 pb-2 shrink-0">
                        <div className="relative w-[212px] h-[280px] rounded-[20px] overflow-hidden mx-auto">
                            <Image 
                                src="/images/sidebar.png" 
                                alt="Earn and Refer - Casino Reviews Book" 
                                fill
                                sizes="212px"
                                className="object-cover" 
                            />
                            <div className="absolute inset-0 rounded-[20px] bg-[linear-gradient(180deg,rgba(58,62,69,0.0001)_0%,rgba(27,29,33,0.92)_56%)]" />

                            <div className="absolute inset-0 z-10 flex flex-col justify-end items-center pb-6 px-4 text-center">
                                <h3 className="text-white text-[16px] font-semibold leading-tight">Sign up and<br />Earn Now</h3>
                                <p className="text-white/80 text-[12px] leading-snug mt-2 max-w-[160px]">Share your referral code and bank an easy $100.</p>
                                <button className="mt-4 w-[144px] h-[38px] rounded-[20px] px-4 flex items-center justify-center text-[13px] font-semibold text-white bg-[linear-gradient(180deg,#CDDCFB_0%,#588CF3_100%)] shadow-[0_6px_15px_rgba(88,140,243,0.35)] transition-transform active:scale-95">
                                    Register now
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Legal Text */}
                    <div className="text-center py-2 shrink-0">
                        <p className="text-[11px] text-slate-400 leading-normal max-w-[200px] mx-auto">18+ Only. Please play responsibly. Terms and Conditions apply.</p>
                    </div>

                    {/* Support Section */}
                    <div
                        className="mt-2 h-[100px] rounded-tl-[12px] rounded-tr-[12px] shrink-0 relative bg-[#EEF3FE] flex items-center justify-center gap-3 before:content-[''] before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-[212px] before:h-[2px] before:[background:radial-gradient(50%_50%_at_50%_50%,#588CF3_42.79%,#EEF3FE_100%)]"
                    >
                        <Link href="/contact-us">
                            <button className="w-[96px] h-[40px] rounded-[10px] bg-white shadow-sm flex items-center justify-center gap-2 text-[13px] font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                                <Headphones size={16} className="text-slate-500" />
                                Support
                            </button>
                        </Link>

                        <Link href="/contact-us">
                            <button className="w-[96px] h-[40px] rounded-[10px] text-white text-[13px] font-medium flex items-center justify-center gap-2 bg-[linear-gradient(180deg,#CDDCFB_0%,#588CF3_100%)] shadow-[0_6px_15px_rgba(88,140,243,0.25)] hover:opacity-95 transition-opacity">
                                <CircleHelp size={16} />
                                Help
                            </button>
                        </Link>
                    </div>
                </div>
            </aside>
        </div>
    );
}