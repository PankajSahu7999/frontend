import { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  ShieldAlert,
  Scale,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Lock,
  HelpCircle,
  Mail,
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
  title: "Terms & Services - Casino Reviews Book",
  description:
    "Read the terms and conditions governing the use of Casino Reviews Book. Understand our editorial independence, affiliate disclosures, and player guidelines.",
  path: "/terms-and-services",
  keywords: [
    "terms of service",
    "terms and conditions",
    "casino review terms",
    "user agreement",
    "casino reviews book terms",
  ],
});

const termsFaqs = [
  {
    question: "Is Casino Reviews Book an online casino operator?",
    answer:
      "No. Casino Reviews Book is an independent iGaming directory, research portal, and informational resource. We do not operate online casinos, accept bets, handle deposits, or facilitate real-money gambling transactions.",
  },
  {
    question: "Who is allowed to use this website?",
    answer:
      "This website is intended solely for individuals who are at least 18 years of age (or the legal age of majority for online gambling in their local jurisdiction, e.g., 21 in certain US states).",
  },
  {
    question: "Do you guarantee winnings or payout processing at listed casinos?",
    answer:
      "No. While we conduct mystery audits and review operator licenses, we do not control third-party operators. You play at your own discretion and risk.",
  },
];

export default function TermsAndServicesPage() {
  const graph = buildSchemaGraph({
    webpage: webpageSchema({
      url: "https://casinoreviewsbook.com/terms-and-services",
      title: "Terms & Services - Casino Reviews Book",
      description:
        "Official Terms of Service and User Agreement for Casino Reviews Book, setting out rules for site usage, legal disclaimers, and editorial transparency.",
      type: "WebPage",
      breadcrumbId: "https://casinoreviewsbook.com/terms-and-services/#breadcrumb",
    }),
    breadcrumb: breadcrumbSchema({
      pageUrl: "https://casinoreviewsbook.com/terms-and-services",
      items: [
        { name: "Home", url: "https://casinoreviewsbook.com" },
        { name: "Terms & Services", url: "https://casinoreviewsbook.com/terms-and-services" },
      ],
    }),
    faq: faqSchema({
      pageUrl: "https://casinoreviewsbook.com/terms-and-services/#faq",
      faqs: termsFaqs,
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
              <Scale className="w-4 h-4" />
              Legal Agreement & Guidelines
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight">
              Terms & Services
            </h1>

            <p className="mt-3 text-sm sm:text-base text-[#475569] max-w-2xl mx-auto">
              Please review these Terms of Service carefully before utilizing our platform, reviews, comparison tools, and guides.
            </p>

            <div className="mt-4 text-xs text-slate-500 font-medium">
              Last Updated: January {new Date().getFullYear()} • Effective Immediately
            </div>
          </div>
        </section>

        {/* Core Notice Box */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-md shadow-slate-900/5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5 text-[#0F172A] font-bold text-sm">
                <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0" />
                Key Summary at a Glance
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-200/60">
                Informational Directory Only (18+ / 21+)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>We do not offer gambling, take bets, or accept financial deposits.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Affiliate commissions never influence our objective review scores.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>You are responsible for adhering to your local gambling regulations.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Content Body */}
        <section className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 space-y-10 text-[#334155] leading-relaxed">
            
            {/* Section 1 */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] flex items-center gap-2 mb-3">
                <span className="text-[#2E68FB]">1.</span> Acceptance of Terms
              </h2>
              <p className="text-sm">
                By browsing, accessing, or utilizing any portion of <strong>Casino Reviews Book</strong> (including our website, tools, comparison matrices, and newsletters), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service, along with our <Link href="/privacy-policy" className="text-[#2E68FB] underline">Privacy Policy</Link> and <Link href="/cookie-policy" className="text-[#2E68FB] underline">Cookie Policy</Link>. If you do not agree to these terms, you must discontinue use of this site immediately.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] flex items-center gap-2 mb-3">
                <span className="text-[#2E68FB]">2.</span> Informational & Directory Nature
              </h2>
              <p className="text-sm">
                Casino Reviews Book operates strictly as an editorial, research, and educational portal for the international iGaming community. We are not an online casino, sportsbook, or lottery operator. We do not provide real-money wagering facilities, manage customer funds, process payouts, or act as an intermediary for gambling transactions. All information provided is for educational, comparative, and entertainment purposes only.
              </p>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] flex items-center gap-2 mb-3">
                <span className="text-[#2E68FB]">3.</span> Age & Legal Jurisdiction Requirements
              </h2>
              <p className="text-sm">
                Access to this website is strictly restricted to persons who are at least 18 years old, or the legal age required by the gambling legislation of their local jurisdiction (e.g., 21 in certain US jurisdictions). It is your sole responsibility to ensure that online gambling is legal in your country, state, or province before registering with or wagering at any third-party casino linked from our service.
              </p>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] flex items-center gap-2 mb-3">
                <span className="text-[#2E68FB]">4.</span> Editorial Independence & Affiliate Disclosure
              </h2>
              <p className="text-sm mb-3">
                Casino Reviews Book participates in affiliate marketing programs. When you click outbound links on our website to third-party casino operators and complete a registration or deposit, we may receive financial compensation. However:
              </p>
              <ul className="list-disc list-inside text-sm space-y-1.5 pl-2 text-slate-700">
                <li>Commercial agreements never guarantee positive rankings or artificially high rating scores.</li>
                <li>Operators cannot pay to conceal legitimate player complaints or remove blacklisted warnings.</li>
                <li>Our editorial review team conducts independent mystery audits based strictly on verifiable facts.</li>
              </ul>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] flex items-center gap-2 mb-3">
                <span className="text-[#2E68FB]">5.</span> Third-Party Content & Operator Terms
              </h2>
              <p className="text-sm">
                Our service contains links, banners, and references to external websites operated by third parties. We do not own, control, or monitor their gaming software, payment gateways, or financial stability. Third-party casino promotions, bonus terms, and wagering requirements are subject to unilateral changes by operators. We recommend verifying all terms directly on the operator&apos;s site before depositing.
              </p>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] flex items-center gap-2 mb-3">
                <span className="text-[#2E68FB]">6.</span> Intellectual Property Rights
              </h2>
              <p className="text-sm">
                All original text, proprietary rating algorithms, UI designs, code, graphics, and compilation layouts published on Casino Reviews Book are protected under international copyright, trademark, and intellectual property laws. You may not scrape, reproduce, republish, mirror, or redistribute our content without prior express written consent.
              </p>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] flex items-center gap-2 mb-3">
                <span className="text-[#2E68FB]">7.</span> Disclaimer of Warranties & Limitation of Liability
              </h2>
              <p className="text-sm">
                The service and all published content are provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind, whether express or implied. In no event shall Casino Reviews Book, its directors, employees, or contributors be held liable for any direct, indirect, incidental, punitive, or consequential damages resulting from your participation in online gambling activities, disputes with operators, or financial losses incurred on third-party sites.
              </p>
            </div>

            {/* Section 8 */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] flex items-center gap-2 mb-3">
                <span className="text-[#2E68FB]">8.</span> Responsible Gambling Commitment
              </h2>
              <p className="text-sm">
                We advocate responsible play at all times. Gambling should never be treated as an income avenue or an escape from emotional or financial difficulties. If you or someone you know is struggling with gambling dependency, please visit our <Link href="/responsible-gambling" className="text-[#2E68FB] underline">Responsible Gambling</Link> resources for free, confidential, professional assistance.
              </p>
            </div>

            {/* Section 9 */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] flex items-center gap-2 mb-3">
                <span className="text-[#2E68FB]">9.</span> Contact Us
              </h2>
              <p className="text-sm">
                If you have any questions, suggestions, or legal inquiries regarding these Terms of Service, please reach out via our <Link href="/contact-us" className="text-[#2E68FB] underline">Contact Form</Link> or email our compliance department at <span className="font-semibold text-slate-800">support@casinoreviewsbook.com</span>.
              </p>
            </div>

          </div>
        </section>

        {/* FAQs */}
        <section className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-[#0F172A] mb-6 text-center">
            Common Questions About Our Terms
          </h3>
          <div className="space-y-4">
            {termsFaqs.map((faq, idx) => (
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
