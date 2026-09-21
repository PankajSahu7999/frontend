import {
  breadcrumbSchema,
  buildSchemaGraph,
  webpageSchema,
} from "@/lib/seo/schemas";
import ContactPage from "./ContactPage";
import { generateSEO } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { contactPageSchema } from "@/lib/seo/schemas/contactPageSchema";

export const metadata = generateSEO({
  title: "Contact Casino Reviews Book | Editorial, Support & Partnerships",
  description:
    "Contact Casino Reviews Book for editorial feedback, casino review corrections, partnership opportunities, responsible gambling questions, or general support. Our team responds as quickly as possible.",
  path: "/contact-us",
  keywords: [
    "contact",
    "dispute",
    "editorial",
    "partnership",
    "casino reviews",
    "customer service",
    "contact casino review book",
    "casino support",
    "editorial team",
    "casino review corrections",
    "responsible gambling support",
    "affiliate inquiries",
    "contact casino website",
  ],
});

const graph = buildSchemaGraph({
  webpage: webpageSchema({
    url: "https://casinoreviewbook.com/contact-us",
    title: "Contact Casino Reviews Book | Editorial, Support & Partnerships",
    description:
      "Contact Casino Reviews Book for editorial feedback, support requests, partnership opportunities and responsible gambling inquiries.",
  }),
  breadcrumb: breadcrumbSchema({
    pageUrl: "https://casinoreviewbook.com/contact-us",
    items: [
      {
        name: "Home",
        url: "https://casinoreviewbook.com",
      },
      {
        name: "Contact Us",
        url: "https://casinoreviewbook.com/contact-us",
      },
    ],
  }),
  contactPage:contactPageSchema({
    url: "https://casinoreviewbook.com/contact-us",
    email: "contact@casinoreviewsbook.com",
  }),

});

export default function Page() {
  return (
    <>
      <JsonLd data={graph} />
      <ContactPage />
    </>
  );
}
