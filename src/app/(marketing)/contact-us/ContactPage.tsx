'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Mail,
  MessageSquare,
  Building2,
  Clock,
  ShieldCheck,
  Send,
  HelpCircle,
  AlertTriangle,
  CheckCircle2,
  Globe,
  FileText,
  ChevronDown,
  ArrowRight,
  Loader2,
  Calendar,
  Ticket,
  Search,
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface ContactTicket {
  id: string;
  name: string;
  email: string;
  department: string;
  casino_name?: string | null;
  subject: string;
  message: string;
  status: string;
  created_at: string;
}

export default function ContactPage() {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingTickets, setIsFetchingTickets] = useState(false);
  const [tickets, setTickets] = useState<ContactTicket[]>([]);
  const [lookupEmail, setLookupEmail] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'general',
    casinoName: '',
    subject: '',
    message: '',
  });

  // Pre-fill form if user is logged in
  useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        name: currentUser.name || '',
        email: currentUser.email || '',
      }));
      setLookupEmail(currentUser.email || '');
      fetchTickets(currentUser.email);
    }
  }, [currentUser]);

  const fetchTickets = async (emailToFetch: string) => {
    if (!emailToFetch) return;
    setIsFetchingTickets(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact-tickets/my-tickets?email=${encodeURIComponent(emailToFetch)}`);
      if (res.ok) {
        const data = await res.json();
        setTickets(data);
      }
    } catch (err) {
      console.error('Failed to fetch tickets:', err);
    } finally {
      setIsFetchingTickets(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact-tickets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
        // Refresh ticket list
        fetchTickets(formData.email);
        setLookupEmail(formData.email);
        // Reset form except name/email if logged in
        setFormData((prev) => ({
          ...prev,
          department: 'general',
          casinoName: '',
          subject: '',
          message: '',
        }));
      } else {
        alert('Failed to submit inquiry. Please try again.');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      alert('Error submitting inquiry. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (lookupEmail) {
      setIsSearching(true);
      fetchTickets(lookupEmail).then(() => {
        setIsSearching(false);
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'resolved':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Resolved
          </span>
        );
      case 'reviewed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/25">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            Reviewed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/25">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" style={{ animationDuration: '3s' }} />
            Pending
          </span>
        );
    }
  };

  const getDepartmentLabel = (dept: string) => {
    switch (dept) {
      case 'dispute':
        return 'Dispute Support';
      case 'editorial':
        return 'Editorial Corrections';
      case 'partnerships':
        return 'Partnership Dept';
      case 'legal':
        return 'Legal & Compliance';
      default:
        return 'General Inquiry';
    }
  };

  return (
    <main className="min-h-screen bg-[#EEF3FE] text-slate-800">
      {/* ================= 1. LIGHT HERO SECTION ================= */}
      <section
        className="relative overflow-hidden pt-10 pb-16 lg:pt-18 lg:pb-20"
        style={{
          background:
            'linear-gradient(135deg, #EEF3FE 0%, #EEF3FE 40%, #EEF3FE 70%, #EEF3FE 100%)',
        }}
      >
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-blue-200/80 shadow-sm text-xs font-bold tracking-wider uppercase text-[#2E68FB]">
              <MessageSquare className="w-4 h-4 text-[#2E68FB]" />
              Direct Communication & Support
            </div>

            <h1 className="text-4xl sm:text-5xl font-black text-[#0F172A] tracking-tight">
              Get in Touch with Our <br />
              <span className="text-[#2E68FB]">Editorial & Audit Team</span>
            </h1>

            <p className="text-base sm:text-lg text-[#475569] leading-relaxed font-normal">
              Have a question about a casino review, need help escalating an operator dispute, or interested in a commercial partnership? We’re here to assist.
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-6 text-xs font-semibold text-[#475569]">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#2E68FB]" /> Average Response: &lt; 24 Hours
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#00B67A]" /> Confidential Dispute Review
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-[#2E68FB]" /> Global iGaming Coverage
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. DIRECT CONTACT CARDS ================= */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-lg shadow-blue-900/5 hover:border-[#2E68FB] transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2E68FB] mb-4">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-[#0F172A]">Editorial & Corrections</h3>
            <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
              Found outdated bonus terms or incorrect casino information? Notify our fact-checking desk directly.
            </p>
            <p className="mt-4 text-xs font-bold text-[#2E68FB] font-mono">editorial@casinoreviewsbook.com</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-lg shadow-blue-900/5 hover:border-[#2E68FB] transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-[#0F172A]">Player Dispute Center</h3>
            <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
              Experiencing payout delays or unfair account closures from a recommended operator?
            </p>
            <p className="mt-4 text-xs font-bold text-[#2E68FB] font-mono">disputes@casinoreviewsbook.com</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-lg shadow-blue-900/5 hover:border-[#2E68FB] transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#00B67A] mb-4">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-[#0F172A]">Commercial & Partnerships</h3>
            <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
              For licensed operator listings, press inquiries, and corporate relations.
            </p>
            <p className="mt-4 text-xs font-bold text-[#2E68FB] font-mono">partners@casinoreviewsbook.com</p>
          </div>
        </div>
      </section>

      {/* ================= 3. FORM & INSTRUCTIONS SECTION ================= */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Side: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white border border-gray-200/90 rounded-3xl p-8 sm:p-10 shadow-sm text-slate-800">
            <h2 className="text-2xl font-bold text-[#0F172A]">Send Us a Message</h2>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1 mb-8">
              Fill out the form below. Please select the correct department so your request reaches the right analyst quickly.
            </p>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#00B67A] text-white flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A]">Message Received!</h3>
                <p className="text-xs sm:text-sm text-[#475569] max-w-md mx-auto">
                  Thank you for reaching out. A team member from our desk has received your ticket and will follow up within 24 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs font-bold text-[#2E68FB] underline"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      className="w-full h-11 px-4 rounded-xl bg-[#F8FAFC] border border-gray-200 text-sm text-[#0F172A] focus:outline-none focus:border-[#2E68FB] focus:bg-white transition"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. john@example.com"
                      className="w-full h-11 px-4 rounded-xl bg-[#F8FAFC] border border-gray-200 text-sm text-[#0F172A] focus:outline-none focus:border-[#2E68FB] focus:bg-white transition"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                      Department <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        className="w-full h-11 px-4 rounded-xl bg-[#F8FAFC] border border-gray-200 text-sm text-[#0F172A] focus:outline-none focus:border-[#2E68FB] focus:bg-white transition appearance-none cursor-pointer"
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      >
                        <option value="general">General Inquiry</option>
                        <option value="dispute">Casino Dispute / Withdrawal Issue</option>
                        <option value="editorial">Editorial / Content Correction</option>
                        <option value="partnerships">Commercial / Affiliate Partnership</option>
                        <option value="legal">Legal & Compliance</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-3.5 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                      Casino Name <span className="text-gray-400 font-normal">(If Applicable)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. BetCasino365"
                      className="w-full h-11 px-4 rounded-xl bg-[#F8FAFC] border border-gray-200 text-sm text-[#0F172A] focus:outline-none focus:border-[#2E68FB] focus:bg-white transition"
                      value={formData.casinoName}
                      onChange={(e) => setFormData({ ...formData, casinoName: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Brief summary of your inquiry"
                    className="w-full h-11 px-4 rounded-xl bg-[#F8FAFC] border border-gray-200 text-sm text-[#0F172A] focus:outline-none focus:border-[#2E68FB] focus:bg-white transition"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                    Detailed Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Provide relevant details, including transaction dates or specific bonus terms if filing a dispute..."
                    className="w-full p-4 rounded-xl bg-[#F8FAFC] border border-gray-200 text-sm text-[#0F172A] focus:outline-none focus:border-[#2E68FB] focus:bg-white transition resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 rounded-xl bg-[#2E68FB] hover:bg-[#2556D6] disabled:opacity-70 text-white font-bold text-sm flex items-center justify-center gap-2 transition shadow-md shadow-blue-500/20 active:scale-95 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Send Inquiry
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Side: Escalation Guide & Information */}
          <div className="lg:col-span-5 space-y-6">
            {/* Player Dispute Box */}
            <div className="p-6 sm:p-8 rounded-3xl bg-amber-50/75 border border-amber-200/80 text-[#0F172A] space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-200/60 text-amber-900 text-xs font-bold uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-amber-700" /> Player Support Notice
              </div>
              <h3 className="text-xl font-bold">How We Handle Player Disputes</h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                If you encounter non-payment or delayed cashouts with an operator recommended on our portal:
              </p>
              <ul className="space-y-2 text-xs text-[#475569]">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-amber-800">1.</span> Select <strong>Casino Dispute</strong> in the form.
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-amber-800">2.</span> Attach or summarize your account ID and communications with the casino support.
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-amber-800">3.</span> Our team will contact the casino’s affiliate compliance director directly to investigate.
                </li>
              </ul>
            </div>

            {/* Ticket Lookup Card (Allows unregistered users to check status) */}
            <div className="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-sm space-y-4 text-slate-800">
              <h3 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
                <Ticket className="w-5 h-5 text-[#2E68FB]" /> Look Up Existing Ticket
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Enter your email address below to fetch all inquiries, disputes, or tickets submitted from your address.
              </p>
              <form onSubmit={handleLookup} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="e.g. john@example.com"
                  className="flex-1 h-10 px-3 rounded-lg bg-[#F8FAFC] border border-gray-200 text-xs text-[#0F172A] focus:outline-none focus:border-[#2E68FB] focus:bg-white transition"
                  value={lookupEmail}
                  onChange={(e) => setLookupEmail(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={isSearching}
                  className="h-10 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition active:scale-95 cursor-pointer disabled:opacity-75"
                >
                  {isSearching ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
                  Find
                </button>
              </form>
            </div>

            {/* Operating Hours Card */}
            <div className="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#2E68FB]" /> Global Time Zone Coverage
              </h3>
              
              <div className="space-y-3 text-xs text-[#64748B]">
                {/* North America West */}
                <div className="flex justify-between items-center pb-2.5 border-b border-gray-100">
                  <div>
                    <span className="font-bold text-[#0F172A] block">North America </span>
                    <span className="text-[11px] text-gray-400">PST (Los Angeles, Vancouver)</span>
                  </div>
                  <span className="font-mono font-semibold text-[#0F172A] bg-blue-50/60 text-[#2E68FB] px-2.5 py-1 rounded-md border border-blue-100">
                    08:00 – 18:00 PST
                  </span>
                </div>

                {/* UK & Western Europe */}
                <div className="flex justify-between items-center pb-2.5 border-b border-gray-100">
                  <div>
                    <span className="font-bold text-[#0F172A] block">UK & Western Europe</span>
                    <span className="text-[11px] text-gray-400">GMT / BST (London, Dublin)</span>
                  </div>
                  <span className="font-mono font-semibold text-[#0F172A] bg-blue-50/60 text-[#2E68FB] px-2.5 py-1 rounded-md border border-blue-100">
                    08:00 – 19:00 GMT
                  </span>
                </div>

                {/* Central Europe & Nordics */}
                <div className="flex justify-between items-center pb-2.5 border-b border-gray-100">
                  <div>
                    <span className="font-bold text-[#0F172A] block">Central Europe & Malta</span>
                    <span className="text-[11px] text-gray-400">CET / CEST (Berlin, Sliema)</span>
                  </div>
                  <span className="font-mono font-semibold text-[#0F172A] bg-blue-50/60 text-[#2E68FB] px-2.5 py-1 rounded-md border border-blue-100">
                    09:00 – 20:00 CET
                  </span>
                </div>

                {/* urgent */}
                <div className="flex justify-between items-center pt-1">
                  <div>
                    <span className="font-bold text-[#0F172A] block">Emergency Disputes</span>
                    <span className="text-[11px] text-gray-400">Global Escalations</span>
                  </div>
                  <span className="font-mono font-bold text-[#00B67A] bg-emerald-50 text-[#00B67A] px-2.5 py-1 rounded-md border border-emerald-100">
                    Monitored 24/7
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. TICKETS AND HISTORY SECTION ================= */}
      {tickets.length > 0 && (
        <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-gray-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-bold text-[#0F172A] flex items-center gap-2">
                  <Ticket className="w-5 h-5 text-[#2E68FB]" />
                  Your Ticket History
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Showing tickets submitted for <strong className="text-slate-700">{lookupEmail || currentUser?.email}</strong>
                </p>
              </div>
              <button
                onClick={() => fetchTickets(lookupEmail || currentUser?.email || '')}
                className="text-xs font-bold text-[#2E68FB] hover:underline"
              >
                Refresh List
              </button>
            </div>

            {isFetchingTickets ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 text-[#2E68FB] animate-spin" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 text-xs font-bold uppercase tracking-wider">
                      <th className="py-3 px-4">Subject</th>
                      <th className="py-3 px-4">Department</th>
                      <th className="py-3 px-4">Casino</th>
                      <th className="py-3 px-4">Submitted</th>
                      <th className="py-3 px-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {tickets.map((t) => (
                      <tr key={t.id} className="hover:bg-slate-50/50 transition">
                        <td className="py-4 px-4 font-semibold text-slate-800 max-w-xs truncate">
                          {t.subject}
                          <span className="block font-normal text-xs text-slate-400 mt-0.5 truncate max-w-xs">
                            {t.message}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-slate-500 font-medium text-xs">
                          {getDepartmentLabel(t.department)}
                        </td>
                        <td className="py-4 px-4 text-slate-500 text-xs">
                          {t.casino_name || <span className="text-slate-300">—</span>}
                        </td>
                        <td className="py-4 px-4 text-slate-400 text-xs flex items-center gap-1.5 mt-1.5 border-none">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(t.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-4 text-center">
                          {getStatusBadge(t.status)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ================= 5. QUICK HELP FAQ ================= */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2E68FB] mb-2 block">
            Before You Message Us
          </span>
          <h2 className="text-3xl font-bold text-[#0F172A]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="p-6 rounded-2xl bg-white border border-gray-200/80">
            <h3 className="font-bold text-base text-[#0F172A] flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#2E68FB]" />
              Can you issue refunds for lost deposits?
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#64748B] leading-relaxed">
              No. Casino Reviews Book is an independent affiliate directory and does not hold player funds. However, we can assist in mediating disputes regarding delayed or unfairly denied payouts.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-200/80">
            <h3 className="font-bold text-base text-[#0F172A] flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#2E68FB]" />
              How do I list a new online casino on your portal?
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#64748B] leading-relaxed">
              Operators seeking a review must submit verifiable licensing credentials and pass our 6-step audit pipeline. Contact <code>partners@casinoreviewsbook.com</code> for guidelines.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}