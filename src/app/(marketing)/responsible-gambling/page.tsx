import {
  articleSchema,
  breadcrumbSchema,
  buildSchemaGraph,
  faqSchema,
  webpageSchema,
} from "@/lib/seo/schemas";
import ResponsibleGamblingClient from "./ResponsibleGamblingClient";
import { generateSEO } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = generateSEO({
  title: "Responsible Gambling | Player Safety & Gambling Support",
  description:
    "Learn responsible gambling practices, bankroll management, self-exclusion options, warning signs of gambling harm, and support organizations that help players gamble safely.",
  path: "/responsible-gambling",
  keywords: [
    "responsible gambling",
    "safe gambling",
    "gambling support",
    "self exclusion",
    "problem gambling",
    "gambling addiction",
    "bankroll management",
    "player protection",
    "responsible gaming",
    "gambling help",
  ],
});

const PAGE_URL = "https://casinoreviewsbook.com/responsible-gambling";

const graph = buildSchemaGraph({
  webpage: webpageSchema({
    url: PAGE_URL,
    title: "Responsible Gambling | Player Safety & Gambling Support",
    description:
      "Educational guide about responsible gambling, bankroll management, self-exclusion, and player protection.",
  }),

  breadcrumb: breadcrumbSchema({
    pageUrl: PAGE_URL,
    items: [
      {
        name: "Home",
        url: "https://casinoreviewsbook.com",
      },
      {
        name: "Responsible Gambling",
        url: PAGE_URL,
      },
    ],
  }),

  article: articleSchema({
    title: "Responsible Gambling | Player Safety & Gambling Support",
    description:
      "Comprehensive guide covering responsible gambling practices, self-exclusion, gambling support organizations, bankroll management, and recognizing the signs of gambling-related harm.",
    url: PAGE_URL,
    image: "",
    author: {
      "@type": "Person",
      name: "Casino Reviews Book",
      url: "https://casinoreviewsbook.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Casino Reviews Book",
      logo: {
        "@type": "ImageObject",
        url: "https://casinoreviewsbook.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": PAGE_URL,
    },
    published: "2026-02-23",
    modified: `${new Date().toISOString()}`,
    articleSection: "Responsible Gambling",
    keywords: [
      "Responsible Gambling",
      "Player Protection",
      "Self Exclusion",
      "Problem Gambling",
      "Bankroll Management",
      "Gambling Addiction",
      "Gambling Support",
      "Responsible Gaming",
    ],
  }),
  faq: faqSchema({
    pageUrl: PAGE_URL,
    faqs: [
      {
        question: "What is responsible gambling?",
        answer:
          "Responsible gambling means treating gambling as a form of entertainment rather than a way to earn money. It includes setting personal spending and time limits, gambling only with money you can afford to lose, understanding the odds, and stopping play when gambling is no longer enjoyable.",
      },
      {
        question: "What are the signs of problem gambling?",
        answer:
          "Warning signs may include spending more money or time gambling than intended, chasing losses, borrowing money to gamble, hiding gambling activity from family or friends, neglecting work or personal responsibilities, or feeling anxious or stressed about gambling. If these signs appear, consider taking a break and seeking professional support.",
      },
      {
        question: "What is self-exclusion?",
        answer:
          "Self-exclusion is a voluntary program that allows players to block access to gambling services for a chosen period of time. Many licensed gambling operators offer self-exclusion tools, and some jurisdictions also provide national self-exclusion programs covering multiple operators.",
      },
      {
        question: "How can I set a gambling budget?",
        answer:
          "Decide on a fixed entertainment budget before you begin playing and never exceed it. Set deposit, loss, and session time limits where available, avoid increasing your budget to recover losses, and stop gambling once your planned spending limit has been reached.",
      },
      {
        question: "Can I make money consistently from gambling?",
        answer:
          "No. Gambling outcomes are based on chance or game mathematics, and no strategy can guarantee consistent profits. While some games have better odds than others, every licensed casino game has a house edge, and losses are always possible.",
      },
      {
        question:
          "What tools do online casinos offer for responsible gambling?",
        answer:
          "Many licensed online casinos provide responsible gambling tools such as deposit limits, loss limits, wagering limits, session reminders, cooling-off periods, account history, reality checks, and self-exclusion. The available features depend on the operator and its licensing jurisdiction.",
      },
      {
        question:
          "What should I do if I think my gambling is becoming a problem?",
        answer:
          "Take a break from gambling, use available responsible gambling tools such as deposit limits or self-exclusion, speak with trusted family or friends if appropriate, and consider contacting a qualified gambling support organization in your country for confidential advice and assistance.",
      },
      {
        question:
          "Can responsible gambling tools guarantee that I won't overspend?",
        answer:
          "Responsible gambling tools can help you manage your gambling activity, but they cannot guarantee that you will not exceed your limits. They work best when combined with personal discipline, realistic expectations, and regular review of your gambling habits.",
      },
    ],
  }),

});

export default function Page() {
  return (
    <>
      <JsonLd data={graph} />
      <ResponsibleGamblingClient />
    </>
  );
}
