'use client';

import { useState, useEffect } from 'react';
import { Check, ChevronDown, ChevronRight } from 'lucide-react';
import { API_CONFIG } from '@/config/api.config';
import { faqSchema, FAQItem } from '@/lib/seo/schemas/faqSchema';

export interface FAQSectionProps {
  faqs?: FAQItem[];
  category?: string;
  title?: string;
  description?: string;
  includeSchema?: boolean;
  pageUrl?: string;
}

const DEFAULT_FAQS: FAQItem[] = [
  {
    question: 'How do I choose the best online casino?',
    answer: 'Look for reputable licenses (MGA, Curacao, UKGC), fair bonus terms, quick withdrawal times, SSL encryption, and high-quality game selections from audited providers.',
  },
  {
    question: 'Are online casino bonuses worth claiming?',
    answer: 'Yes, if the wagering requirements are fair (usually below 40x). Look for low wagering requirements, no-deposit bonuses, and reasonable game contribution limits.',
  },
  {
    question: 'How fast are online casino withdrawals processed?',
    answer: 'Crypto and e-wallet withdrawals are typically processed within 0 to 24 hours, while debit cards and bank wire transfers generally take 1 to 5 business days.',
  },
  {
    question: 'Is it safe to play with real money at online casinos?',
    answer: 'Yes, provided you play at licensed, regulated, and verified online casinos that utilize 256-bit SSL encryption and certified RNG (Random Number Generator) fairness auditors.',
  },
];

export function FAQSection({
  faqs: propFaqs,
  category,
  title = 'Frequently Asked Questions',
  description = 'Everything you need to know about online casinos, bonuses, payments, and safety. Can\'t find your answer? Reach out to our team.',
  includeSchema = true,
  pageUrl = 'https://casinoreviewsbook.com',
}: FAQSectionProps) {
  const initialFaqs = propFaqs && propFaqs.length > 0 ? propFaqs : DEFAULT_FAQS;
  const [faqs, setFaqs] = useState<FAQItem[]>(initialFaqs);
  const [loading, setLoading] = useState(false);
  const [openIndex, setOpenIndex] = useState(0);

  const baseUrl = API_CONFIG.baseURL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

  useEffect(() => {
    if (propFaqs && propFaqs.length > 0) {
      setFaqs(propFaqs);
      setLoading(false);
      return;
    }

    const fetchFaqs = async () => {
      try {
        const query = new URLSearchParams();
        if (category) query.set('category', category);
        query.set('status', 'true');

        const res = await fetch(`${baseUrl}/faqs?${query.toString()}`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setFaqs(data);
          } else {
            setFaqs(DEFAULT_FAQS);
          }
        } else {
          setFaqs(DEFAULT_FAQS);
        }
      } catch {
        setFaqs(DEFAULT_FAQS);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, [propFaqs, category, baseUrl]);

  const displayFaqs = faqs && faqs.length > 0 ? faqs : DEFAULT_FAQS;

  return (
    <section className="w-full flex justify-center py-[72px] bg-gradient-to-br from-emerald-50/40 via-blue-50/80 to-indigo-50/80 rounded-[50px] overflow-hidden">
      {/* Schema.org FAQPage Structured Data for SEO */}
      {includeSchema && displayFaqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema({ pageUrl, faqs: displayFaqs })),
          }}
        />
      )}

      <div className="w-full max-w-[1184px] px-4">
        <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-0 max-w-[1152px] mx-auto">
          {/* Left column */}
          <div className="w-full lg:w-[498px] flex flex-col gap-[15px]">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
              {title}
            </h2>

            <p className="text-slate-500 text-base leading-relaxed">
              {description}
            </p>

            <div className="flex items-start gap-3 mt-2">
              <span className="mt-1 flex items-center justify-center w-5 h-5 rounded-full bg-green-500 shrink-0">
                <Check className="w-3 h-3 text-white" strokeWidth={3} />
              </span>
              <div>
                <h3 className="font-bold text-slate-900">Security &amp; Licensing</h3>
                <p className="text-slate-500 text-sm mt-1">
                  We evaluate casinos based on licensing, security, and responsible gambling standards.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="mt-1 flex items-center justify-center w-5 h-5 rounded-full bg-green-500 shrink-0">
                <Check className="w-3 h-3 text-white" strokeWidth={3} />
              </span>
              <div>
                <h3 className="font-bold text-slate-900">24/7 Player Support</h3>
                <p className="text-slate-500 text-sm mt-1">
                  Compare customer support options including live chat, email, and response times.
                </p>
              </div>
            </div>
          </div>

          {/* Right column: FAQ Accordion */}
          <div
            className="w-full lg:w-[526px] bg-white rounded-[16px] shadow-xl px-[27px] py-[26px] flex flex-col gap-[20px]"
            style={{ borderTop: '8px solid #2E68FB' }}
          >
            {loading ? (
              <div className="py-8 text-center text-slate-400">Loading FAQs...</div>
            ) : (
              displayFaqs.map((faq, index) => {
                const isOpen = index === openIndex;
                return (
                  <div
                    key={index}
                    className={index !== displayFaqs.length - 1 ? 'border-b border-slate-100 pb-[20px]' : ''}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                      className="w-full flex items-center justify-between text-left gap-4 transition-colors"
                    >
                      <span
                        className={`font-bold text-base transition-colors ${
                          isOpen ? 'text-blue-600' : 'text-slate-900 hover:text-blue-600'
                        }`}
                      >
                        {faq.question}
                      </span>
                      {isOpen ? (
                        <ChevronDown className="w-5 h-5 text-blue-600 shrink-0" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <p className="text-slate-600 text-sm leading-relaxed mt-3">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}