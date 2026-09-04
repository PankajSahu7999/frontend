'use client';

import { useState } from 'react';
import { Menu, Search, ChevronDown, LogOut } from 'lucide-react';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { clearCurrentUser } from '@/store/slices/userSlice';
import RegisterModal from '@/components/RegisterModal';

interface NavbarProps {
  onMenuClick: () => void;
}

// Generate a DiceBear cartoon avatar URL from a seed string
function getAvatarUrl(seed: string): string {
  const encoded = encodeURIComponent(seed);
  return `https://api.dicebear.com/8.x/adventurer/svg?seed=${encoded}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf&radius=50`;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [modalOpen, setModalOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const firstName = currentUser?.name?.split(' ')[0] || 'User';
  const avatarSeed = currentUser?.email || currentUser?.name || 'default';

  return (
    <>
      <header
        className="
          fixed top-0 right-0 z-30
          left-0 lg:left-[260px]
          bg-[#EEF3FE]/90 backdrop-blur-md
         
        "
      >
        <div className="h-20 flex items-center justify-between px-3 sm:px-6 gap-2 sm:gap-5">

          {/* Sidebar Toggle - only visible on mobile */}
          <button
            onClick={onMenuClick}
            className="flex lg:hidden items-center justify-center shrink-0 w-9 h-9 rounded-lg "
            aria-label="Toggle sidebar"
          >
            <Menu size={20} className="text-slate-700" />
          </button>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-[671px] flex items-center min-w-0">
            <input
              type="text"
              placeholder="Games, Categories"
              className="
                  w-full
                  h-[40px] sm:h-[45px]
                  rounded-[32px]
                  border
                  border-[#2E68FB40]
                  bg-[#46108E0D]
                  pl-4 sm:pl-6
                  pr-12 sm:pr-14
                  text-xs sm:text-sm
                  text-slate-700
                  placeholder:text-slate-500
                  outline-none
                  focus:border-[#2E68FB]
                  transition-colors
              "
            />
            
            {/* Search Button */}
            <button
              type="button"
              className="
                  absolute
                  right-[1px]
                  top-[1px]
                  w-[38px] sm:w-[43px]
                  h-[38px] sm:h-[43px]
                  rounded-full
                  bg-[linear-gradient(180deg,#CDDCFB_0%,#588CF3_100%)]
                  flex
                  items-center
                  justify-center
                  text-white
                  hover:opacity-90
                  transition-opacity
                  active:scale-95
              "
            >
              <Search size={16} className="sm:w-[18px] sm:h-[18px]" />
            </button>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-1 sm:gap-4">

            {/* Language Selector */}
            <button
              className="
                hidden md:flex
                items-center
                justify-center
                gap-2
                w-[125px]
                h-[48px]
                rounded-[20px]
                px-6
                text-sm
                font-medium
                text-[#1E293B]
                whitespace-nowrap
              "
            >
              🇬🇧
              <span>EN</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Register Button OR User Pill */}
            {currentUser ? (
              /* ── Registered User Pill ── */
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen((v) => !v)}
                  className="
                    hidden sm:flex
                    items-center
                    gap-2.5
                    h-[48px]
                    px-4
                    rounded-[20px]
                    font-semibold
                    text-[13px]
                    text-[#16203A]
                    whitespace-nowrap
                    transition-all
                    hover:bg-[#CDDCFB]/60
                    active:scale-95
                  "
                  style={{
                    border: '1.5px solid rgba(88,140,243,0.35)',
                    background: 'rgba(205,220,251,0.35)',
                  }}
                >
                  {/* DiceBear cartoon avatar */}
                  <span
                    className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, #CDDCFB, #588CF3)',
                      boxShadow: '0 0 0 2px #fff, 0 0 0 3.5px #588CF3',
                    }}
                  >
                    <Image
                      src={getAvatarUrl(avatarSeed)}
                      alt={firstName}
                      width={32}
                      height={32}
                      unoptimized
                      className="w-full h-full object-cover"
                    />
                  </span>
                  <span>{firstName}</span>
                  <ChevronDown
                    size={14}
                    className="text-[#588CF3] transition-transform"
                    style={{ transform: userMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </button>

                {/* Dropdown */}
                {userMenuOpen && (
                  <div
                    className="absolute right-0 top-[56px] w-48 rounded-2xl shadow-xl z-50 overflow-hidden"
                    style={{
                      background: 'rgba(255,255,255,0.95)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(88,140,243,0.2)',
                      animation: 'slideDown 0.15s ease',
                    }}
                  >
                    <style>{`@keyframes slideDown { from { opacity: 0; transform: translateY(-6px) } to { opacity: 1; transform: translateY(0) } }`}</style>
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="text-sm font-semibold text-slate-800 truncate">{currentUser.name}</p>
                      <p className="text-xs text-slate-400 truncate">{currentUser.email}</p>
                    </div>
                    <button
                      onClick={() => { dispatch(clearCurrentUser()); setUserMenuOpen(false); }}
                      className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={15} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* ── Register Button ── */
              <button
                onClick={() => setModalOpen(true)}
                className="
                  hidden sm:flex
                  items-center
                  justify-center
                  w-auto px-3 sm:w-[137px] sm:px-[22px]
                  h-[40px] sm:h-[48px]
                  rounded-[20px]
                  font-bold
                  text-[12px] sm:text-[14px]
                  text-[#16203A]
                  whitespace-nowrap
                  bg-[linear-gradient(180deg,_#CDDCFB_0%,_#588CF3_100%)]
                  shadow-[0px_2px_0px_0px_#2E68FB]
                  hover:opacity-90
                  active:scale-95
                  transition-all
                "
              >
                REGISTER
              </button>
            )}

            {/* Play Now Button */}
            <button
              className="
                flex
                items-center
                justify-center
                w-auto px-3 sm:w-[165px] sm:px-6
                h-[40px] sm:h-[48px]
                rounded-[80px]
                font-bold
                text-[12px] sm:text-[14px]
                text-[#16203A]
                whitespace-nowrap
                bg-[linear-gradient(180deg,_#FFE11F_0%,_#FF8533_100%)]
                shadow-[0px_2px_0px_0px_#E36D1F]
              "
            >
              PLAY NOW
            </button>

          </div>
        </div>
      </header>

      {/* Registration Modal */}
      <RegisterModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}