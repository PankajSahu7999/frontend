import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/components/providers/ReduxProvider";
import { DataInitializer } from "@/components/DataInitializer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

import { DEFAULT_SEO } from "@/constants";
import JsonLd from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/seo/schemas";

export const metadata: Metadata = DEFAULT_SEO;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href={process.env.NEXT_PUBLIC_API_URL || "https://api.casinoreviewsbook.com"} />
        <link rel="preconnect" href="https://casinoreviewsbook.com" />
        <link rel="preload" href="/videos/hero/main-banner1.webp" as="image" fetchPriority="high" />
      </head>
      <body className="min-h-full flex flex-col">
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />

        <ReduxProvider>
          <DataInitializer />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
