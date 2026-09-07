import { Metadata } from "next";
import Link from "next/link";
import {
  Cookie,
  ShieldCheck,
  CheckCircle2,
  Settings,
  HelpCircle,
  SlidersHorizontal,
  ExternalLink,
} from "lucide-react";
import { generateSEO } from "@/lib/seo";
import {
  breadcrumbSchema,
  buildSchemaGraph,
  faqSchema,
  webpageSchema,
} from "@/lib/seo/schemas";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = generateSEO({
  title: "Cookie Policy - Casino Reviews Book",
  description:
    "Understand how Casino Reviews Book utilizes cookies and tracking technologies to enhance user experience, ensure security, and track affiliate referrals.",
  path: "/cookie-policy",
  keywords: [
    "cookie policy",
    "casino cookies",
    "tracking policy",
    "affiliate cookies",
    "browser cookies management",
  ],
});

const cookieFaqs = [
  {
    question: "Do cookies collect my sensitive banking or payment details?",
    answer:
      "No. Cookies used on Casino Reviews Book never store financial information, credit card numbers, or sensitive identity documents.",
  },
  {
    question: "Can I use Casino Reviews Book if I disable cookies?",
    answer:
      "Yes. You can disable non-essential cookies via your browser settings and still access all reviews, comparison charts, and guides. Some personalized preferences (such as regional filters) may reset upon refreshing.",
  },
  {
    question: "How long do cookies stay on my device?",
    answer:
      "Session cookies expire as soon as you close your browser. Persistent cookies typically remain for between 30 days and 12 months unless cleared manually.",
  },
];

export default function CookiePolicyPage() {
  const graph = buildSchemaGraph({
    webpage: webpageSchema({
      url: "https://casinoreviewsbook.com/cookie-policy",
      title: "Cookie Policy - Casino Reviews Book",
      description:
        "Detailed Cookie Policy explaining cookie categories, lifetime, affiliate referral tracking, and browser configuration steps.",
      type: "WebPage",
      breadcrumbId: "https://casinoreviewsbook.com/cookie-policy/#breadcrumb",
    }),
    breadcrumb: breadcrumbSchema({
      pageUrl: "https://casinoreviewsbook.com/cookie-policy",
      items: [
        { name: "Home", url: "https://casinoreviewsbook.com" },
        { name: "Cookie Policy", url: "https://casinoreviewsbook.com/cookie-policy" },
      ],
    }),
    faq: faqSchema({
      pageUrl: "https://casinoreviewsbook.com/cookie-policy/#faq",
      faqs: cookieFaqs,
    }),
  });

  return (
    <>
      <JsonLd data={graph} />

      <main className="min-h-screen ">
        {/* Header */}
        <section
          className="relative overflow-hidden py-12 sm:py-16"
          style={{
            background:
              "linear-gradient(135deg, #EEF3FE 0%, #F5F3FF 50%, #EEF3FE 100%)",
          }}
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-blue-200 shadow-2xs text-xs font-bold uppercase tracking-wider text-[#2E68FB] mb-4">
              <Cookie className="w-4 h-4" />
              Tracking & Browser Data Policy
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight">
              Cookie Policy
            </h1>

            <p className="mt-3 text-sm sm:text-base text-[#475569] max-w-2xl mx-auto">
              This document explains how Casino Reviews Book uses cookies and similar technologies, and how you can exercise full control over them.
            </p>

            <div className="mt-4 text-xs text-slate-500 font-medium">
              Last Updated: January {new Date().getFullYear()} • Transparent Privacy Governance
            </div>
          </div>
        </section>

        {/* Highlight Card */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-md shadow-slate-900/5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5 text-[#0F172A] font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
                Cookie Principles in Brief
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 border border-blue-200/60">
                User Controlled
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Cookies are small text files placed on your browser to optimize navigation.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Affiliate cookies only record click timestamps without personal data.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>You can block or delete cookies anytime in your browser settings.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 space-y-10 text-[#334155] leading-relaxed">
            
            {/* What Are Cookies */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] flex items-center gap-2 mb-3">
                <span className="text-[#2E68FB]">1.</span> What Are Cookies?
              </h2>
              <p className="text-sm">
                Cookies are small text files that websites store on your computer, tablet, or smartphone when you visit. They allow web platforms to remember your actions and preferences (such as language, country filter, and display settings) over a period of time, eliminating the need to re-enter them whenever you return to the site or navigate between pages.
              </p>
            </div>

            {/* Categories of Cookies */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] flex items-center gap-2 mb-3">
                <span className="text-[#2E68FB]">2.</span> Types of Cookies We Use
              </h2>
              <div className="space-y-4">
                
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <h3 className="font-bold text-sm text-[#0F172A] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Essential & Security Cookies
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-slate-600">
                    Crucial for platform stability and security. These enable core website features such as SSL session validation, DDoS protection (e.g., Cloudflare security tokens), and load balancing. These cookies cannot be switched off in our systems.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <h3 className="font-bold text-sm text-[#0F172A] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    Analytics & Performance Cookies
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-slate-600">
                    Help us understand how visitors interact with our casino reviews, guides, and comparison tables by collecting and reporting aggregate information anonymously. This enables us to fix broken layouts and accelerate load speeds.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <h3 className="font-bold text-sm text-[#0F172A] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    Functionality & Preference Cookies
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-slate-600">
                    Allow the website to remember choices you make (such as filtering casinos by country or choosing a preferred bonus currency) to deliver a more customized user journey.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <h3 className="font-bold text-sm text-[#0F172A] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    Affiliate Referral Cookies
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-slate-600">
                    When you click on an external casino link, an affiliate tracking cookie is created by the third-party operator or affiliate network. This confirms that your visit originated from Casino Reviews Book. This cookie contains no name, email, or financial information.
                  </p>
                </div>

              </div>
            </div>

            {/* Cookie Table */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] flex items-center gap-2 mb-3">
                <span className="text-[#2E68FB]">3.</span> Typical Cookie Lifespans
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm text-left border border-slate-200 rounded-xl overflow-hidden">
                  <thead className="bg-slate-100 text-slate-800 font-bold uppercase text-[11px] tracking-wider">
                    <tr>
                      <th className="p-3 border-b border-slate-200">Category</th>
                      <th className="p-3 border-b border-slate-200">Primary Purpose</th>
                      <th className="p-3 border-b border-slate-200">Typical Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">Session Cookies</td>
                      <td className="p-3">Navigation state and bot mitigation</td>
                      <td className="p-3 text-slate-500">Expires upon closing browser</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">Analytics (e.g., GA4)</td>
                      <td className="p-3">Measuring aggregate bounce and view counts</td>
                      <td className="p-3 text-slate-500">Up to 14 months</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">Affiliate Referral</td>
                      <td className="p-3">Attribution tracking for partner conversions</td>
                      <td className="p-3 text-slate-500">30 to 90 days</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">Preferences</td>
                      <td className="p-3">Saved region and casino category filters</td>
                      <td className="p-3 text-slate-500">6 to 12 months</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Managing Cookies */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] flex items-center gap-2 mb-3">
                <span className="text-[#2E68FB]">4.</span> How to Manage or Disable Cookies
              </h2>
              <p className="text-sm mb-4">
                You have the full right to accept, reject, or delete cookies at any time through your browser settings. Below are direct guides for configuring popular web browsers:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="p-3.5 rounded-xl border border-slate-200">
                  <span className="font-bold text-[#0F172A] block mb-1">Google Chrome</span>
                  <span className="text-slate-600">Settings &gt; Privacy and Security &gt; Third-party cookies.</span>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200">
                  <span className="font-bold text-[#0F172A] block mb-1">Mozilla Firefox</span>
                  <span className="text-slate-600">Preferences &gt; Privacy & Security &gt; Cookies and Site Data.</span>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200">
                  <span className="font-bold text-[#0F172A] block mb-1">Apple Safari</span>
                  <span className="text-slate-600">Preferences &gt; Privacy &gt; Prevent cross-site tracking.</span>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200">
                  <span className="font-bold text-[#0F172A] block mb-1">Microsoft Edge</span>
                  <span className="text-slate-600">Settings &gt; Cookies and site permissions &gt; Manage and delete cookies.</span>
                </div>
              </div>
            </div>

            {/* Inquiries */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] flex items-center gap-2 mb-3">
                <span className="text-[#2E68FB]">5.</span> Questions & Contact
              </h2>
              <p className="text-sm">
                For additional clarification regarding our cookie implementation or privacy standards, please reach out via our <Link href="/contact-us" className="text-[#2E68FB] underline">Contact Form</Link> or consult our <Link href="/privacy-policy" className="text-[#2E68FB] underline">Privacy Policy</Link>.
              </p>
            </div>

          </div>
        </section>

        {/* FAQs */}
        <section className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-[#0F172A] mb-6 text-center">
            Cookie Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {cookieFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs"
              >
                <h4 className="font-bold text-sm text-[#0F172A] flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#2E68FB] shrink-0" />
                  {faq.question}
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-[#64748B] pl-6 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
