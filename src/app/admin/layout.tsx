// 'use client';

import { Metadata } from "next";
import AdminClientLayout from "./AdminLayoutClient";
// import Link from 'next/link';
// import { useState } from 'react';
// import {
//   Mail, LayoutDashboard, Settings, Users, Building2, Tags,
//   Gamepad2, FileText, Newspaper, Star, HelpCircle, Image,
//   Link as LinkIcon, FolderOpen, ScrollText, Menu, X, Globe, Ban,
//   MessageSquare
// } from 'lucide-react';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminClientLayout>{children}</AdminClientLayout>;
}

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const NavItem = ({ href, icon: Icon, children, active = false }: any) => (
//     <Link
//       href={href}
//       onClick={() => setSidebarOpen(false)}
//       className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
//         active
//           ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
//           : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
//       }`}
//     >
//       <Icon size={18} className={active ? 'text-white' : 'text-slate-400 group-hover:text-slate-100'} />
//       {children}
//     </Link>
//   );

//   const NavGroup = ({ title, children }: any) => (
//     <div className="mb-6">
//       <div className="px-4 mb-2 text-[11px] font-bold text-slate-500 uppercase tracking-widest">{title}</div>
//       <div className="space-y-1">{children}</div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-slate-50 flex font-sans antialiased">
//       {/* Mobile overlay */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-40 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <aside className={`w-64 bg-slate-900 border-r border-slate-800 text-white flex flex-col h-screen overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden fixed lg:sticky top-0 left-0 z-50 transition-transform duration-300 ${
//         sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
//       }`}>
//         {/* Sidebar Header */}
//         <div className="p-6 sticky top-0 bg-slate-900 z-10 border-b border-slate-800/50 backdrop-blur-md">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2.5">
//               <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-md shadow-indigo-600/30">
//                 CL
//               </div>
//               <h2 className="text-xl font-bold tracking-tight text-white">
//                 Casino<span className="text-indigo-400">Lab</span>
//               </h2>
//             </div>
//             <button
//               onClick={() => setSidebarOpen(false)}
//               className="lg:hidden w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white"
//             >
//               <X size={18} />
//             </button>
//           </div>
//         </div>

//         {/* Sidebar Navigation */}
//         <nav className="flex-1 px-3 py-6 space-y-1">
//           <NavGroup title="Main">
//             <NavItem href="/admin" icon={LayoutDashboard} active>Dashboard</NavItem>
//             <NavItem href="/admin/users" icon={Users}>Users</NavItem>
//             <NavItem href="/admin/contact-tickets" icon={MessageSquare}>Contact Tickets</NavItem>
//           </NavGroup>

//           <NavGroup title="Directory">
//             <NavItem href="/admin/casinos" icon={Building2}>Casinos</NavItem>
//             <NavItem href="/admin/categories" icon={Tags}>Categories</NavItem>
//             <NavItem href="/admin/tags" icon={Tags}>Tags</NavItem>
//             <NavItem href="/admin/countries" icon={Globe}>Countries</NavItem>
//             <NavItem href="/admin/game-types" icon={Gamepad2}>Game Types</NavItem>
//           </NavGroup>

//           <NavGroup title="Content">
//             <NavItem href="/admin/blogs" icon={FileText}>Blogs</NavItem>
//             <NavItem href="/admin/news" icon={Newspaper}>News</NavItem>
//             <NavItem href="/admin/reviews" icon={Star}>Reviews</NavItem>
//             <NavItem href="/admin/faqs" icon={HelpCircle}>FAQs</NavItem>
//           </NavGroup>

//           <NavGroup title="Marketing">
//             <NavItem href="/admin/banners" icon={Image}>Banners</NavItem>
//             <NavItem href="/admin/affiliate-links" icon={LinkIcon}>Affiliate Links</NavItem>
//             <NavItem href="/admin/email-campaigns" icon={Mail}>Email Campaigns</NavItem>
//           </NavGroup>

//           <NavGroup title="System">
//             <NavItem href="/admin/media" icon={FolderOpen}>Media Library</NavItem>
//             <NavItem href="/admin/settings" icon={Settings}>Settings</NavItem>
//             <NavItem href="/admin/logs" icon={ScrollText}>Activity Logs</NavItem>
//             <NavItem href="/admin/banned-countries" icon={Ban}>Banned Countries</NavItem>
//           </NavGroup>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 overflow-y-auto h-screen min-w-0">
//         <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-4 flex justify-between items-center sticky top-0 z-30">
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => setSidebarOpen(true)}
//               className="lg:hidden w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200"
//               aria-label="Open sidebar"
//             >
//               <Menu size={20} />
//             </button>
//             <h1 className="text-lg font-semibold text-slate-900 tracking-tight">Admin Console</h1>
//           </div>
//           <div className="flex items-center gap-3 bg-slate-50 pl-3 pr-1.5 py-1.5 rounded-full border border-slate-200/60">
//             <span className="text-xs font-medium text-slate-600">Admin</span>
//             <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-semibold shadow-sm">
//               A
//             </div>
//           </div>
//         </header>
//         <div className="p-4 sm:p-8 max-w-[1600px] mx-auto">
//           {children}
//         </div>
//       </main>
//     </div>
//   );
// }
