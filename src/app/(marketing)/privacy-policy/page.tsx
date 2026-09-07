import { Metadata } from "next";
import Link from "next/link";
import {
  Lock,
  ShieldCheck,
  Eye,
  FileCheck,
  CheckCircle2,
  Server,
  UserCheck,
  HelpCircle,
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
  title: "Privacy Policy - Casino Reviews Book",
  description:
    "Learn how Casino Reviews Book collects, protects, and handles your personal information. Read our GDPR and CCPA compliant privacy standards.",
  path: "/privacy-policy",
  keywords: [
    "privacy policy",
    "casino privacy standards",
    "data protection",
    "GDPR compliance",
    "CCPA casino",
    "casino reviews book privacy",
  ],
});

const privacyFaqs = [
  {
    question: "Do you sell my personal data to online casinos or advertisers?",
    answer:
      "No. We do not sell, rent, or trade your personal information to any third-party casino operators, data brokers, or commercial marketers.",
  },
  {
    question: "What information is collected when I browse the website?",
    answer:
      "We collect standard anonymized technical data, such as your browser type, device information, operating system, and approximate geographical region, to optimize website rendering and prevent fraud.",
  },
  {
    question: "How can I request the deletion of my data?",
    answer:
      "You can request complete deletion of any stored correspondence or personal records by contacting our Data Protection Officer at privacy@casinoreviewsbook.com.",
  },
];

export default function PrivacyPolicyPage() {
  const graph = buildSchemaGraph({
    webpage: webpageSchema({
      url: "https://casinoreviewsbook.com/privacy-policy",
      title: "Privacy Policy - Casino Reviews Book",
      description:
        "Comprehensive Privacy Policy detailing how Casino Reviews Book manages player data, cookies, GDPR rights, and privacy protection.",
      type: "WebPage",
      breadcrumbId: "https://casinoreviewsbook.com/privacy-policy/#breadcrumb",
    }),
    breadcrumb: breadcrumbSchema({
      pageUrl: "https://casinoreviewsbook.com/privacy-policy",
      items: [
        { name: "Home", url: "https://casinoreviewsbook.com" },
        { name: "Privacy Policy", url: "https://casinoreviewsbook.com/privacy-policy" },
      ],
    }),
    faq: faqSchema({
      pageUrl: "https://casinoreviewsbook.com/privacy-policy/#faq",
      faqs: privacyFaqs,
    }),
  });

  return (
    <>
      <JsonLd data={graph} />

      <main className="min-h-screen">
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
              <Lock className="w-4 h-4" />
              Data Protection & Player Privacy
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight">
              Privacy Policy
            </h1>

            <p className="mt-3 text-sm sm:text-base text-[#475569] max-w-2xl mx-auto">
              Your privacy is foundational to our mission. This policy outlines how Casino Reviews Book collects, processes, and protects your information.
            </p>

            <div className="mt-4 text-xs text-slate-500 font-medium">
              Last Updated: January {new Date().getFullYear()} • Compliant with GDPR, UK DPA & CCPA
            </div>
          </div>
        </section>

        {/* Commitment Highlight */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-md shadow-slate-900/5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5 text-[#0F172A] font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                Our Core Privacy Guarantee
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                Zero Data Monetization
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>We never sell your contact info or search habits to casinos.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>All browsing data is anonymized and encrypted in transit via TLS 1.3.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Full compliance with European GDPR and California CCPA rights.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Body Content */}
        <section className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 space-y-10 text-[#334155] leading-relaxed">
            
            {/* Section 1 */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] flex items-center gap-2 mb-3">
                <span className="text-[#2E68FB]">1.</span> Information We Collect
              </h2>
              <p className="text-sm mb-3">
                We limit data collection to what is strictly necessary to deliver, safeguard, and refine our service:
              </p>
              <div className="space-y-3 text-sm">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
                  <h3 className="font-bold text-slate-900 mb-1">A. Information You Voluntarily Provide</h3>
                  <p className="text-slate-600 text-xs sm:text-sm">
                    When you contact our editorial desk, file an operator complaint, or subscribe to review digests, we may collect your name, email address, and the specific details of your query or dispute.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
                  <h3 className="font-bold text-slate-900 mb-1">B. Automatically Collected Technical Data</h3>
                  <p className="text-slate-600 text-xs sm:text-sm">
                    When accessing our site, our servers log aggregated technical attributes including your IP address (truncated for geo-filtering), browser version, operating system, referring URL, time stamps, and pages visited.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] flex items-center gap-2 mb-3">
                <span className="text-[#2E68FB]">2.</span> How We Use Collected Data
              </h2>
              <ul className="list-disc list-inside text-sm space-y-1.5 pl-2 text-slate-700">
                <li>To maintain system stability, security, and prevent automated web scraping or malicious DDoS attacks.</li>
                <li>To show jurisdiction-appropriate casino licensing details, bonus currencies, and regulatory disclaimers.</li>
                <li>To investigate and respond to user complaints and inquiries submitted via our contact channel.</li>
                <li>To evaluate aggregated user engagement metrics to enhance site performance and guide new editorial topics.</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] flex items-center gap-2 mb-3">
                <span className="text-[#2E68FB]">3.</span> Cookies & Affiliate Tracking
              </h2>
              <p className="text-sm">
                Like most modern web platforms, we utilize cookies and pixel tags. Our outbound links to third-party online casinos frequently contain affiliate tracking parameters that record when a visitor navigates from our site. This tracking contains no personally identifiable information (PII). For complete details and instructions on managing cookies, please refer to our dedicated <Link href="/cookie-policy" className="text-[#2E68FB] underline">Cookie Policy</Link>.
              </p>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] flex items-center gap-2 mb-3">
                <span className="text-[#2E68FB]">4.</span> Legal Grounds for Processing (GDPR)
              </h2>
              <p className="text-sm">
                For visitors residing in the European Economic Area (EEA) and the United Kingdom, our processing of personal data is governed under legitimate interest (for fraud prevention and website operations), explicit consent (for voluntary newsletter subscriptions), and legal compliance obligations.
              </p>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] flex items-center gap-2 mb-3">
                <span className="text-[#2E68FB]">5.</span> Your Data Subject Rights
              </h2>
              <p className="text-sm mb-3">
                Depending on your location, you have the following rights regarding your data:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="p-3.5 rounded-xl border border-slate-200">
                  <span className="font-bold text-[#0F172A] block mb-0.5">Right of Access</span>
                  <span className="text-slate-600">Request a copy of any personal data we hold about you.</span>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200">
                  <span className="font-bold text-[#0F172A] block mb-0.5">Right to Erasure</span>
                  <span className="text-slate-600">Request that we delete all your stored contact records.</span>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200">
                  <span className="font-bold text-[#0F172A] block mb-0.5">Right to Rectification</span>
                  <span className="text-slate-600">Request corrections to inaccurate personal records.</span>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200">
                  <span className="font-bold text-[#0F172A] block mb-0.5">Right to Object</span>
                  <span className="text-slate-600">Object to data processing based on legitimate interests.</span>
                </div>
              </div>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] flex items-center gap-2 mb-3">
                <span className="text-[#2E68FB]">6.</span> California Privacy Rights (CCPA / CPRA)
              </h2>
              <p className="text-sm">
                Under the California Consumer Privacy Act (CCPA), California residents possess the right to know what personal information is collected, request deletion, and opt-out of the sale or sharing of personal data. Casino Reviews Book does not sell personal information for monetary or other consideration.
              </p>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] flex items-center gap-2 mb-3">
                <span className="text-[#2E68FB]">7.</span> Protection of Minors (Strictly 18+ / 21+)
              </h2>
              <p className="text-sm">
                Casino Reviews Book does not knowingly collect, store, or solicit information from children under the age of 18 (or the applicable legal gambling age in their jurisdiction). If we learn that we have inadvertently collected personal data from a minor, we will delete that data immediately.
              </p>
            </div>

            {/* Section 8 */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] flex items-center gap-2 mb-3">
                <span className="text-[#2E68FB]">8.</span> Privacy Queries & Contact
              </h2>
              <p className="text-sm">
                To exercise any privacy rights, file a complaint, or inquire about our data retention standards, please reach out to our team at <span className="font-semibold text-slate-800">privacy@casinoreviewsbook.com</span> or submit an inquiry through our <Link href="/contact-us" className="text-[#2E68FB] underline">Contact Page</Link>.
              </p>
            </div>

          </div>
        </section>

        {/* FAQs */}
        <section className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-[#0F172A] mb-6 text-center">
            Privacy Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {privacyFaqs.map((faq, idx) => (
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
