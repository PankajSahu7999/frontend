import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ReduxProvider } from "@/components/providers/ReduxProvider";
import { DataInitializer } from "@/components/DataInitializer";
import { CurrencyProvider } from "@/context/CurrencyContext";

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

export const metadata: Metadata = DEFAULT_SEO;

import NavigationLoader from "@/components/NavigationLoader";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-TQ5F1Q8X0Y";

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
        <link rel="preconnect" href="https://casinoreviewsbook.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="msvalidate.01" content="556963428BB38B747A02A4E5AE20FCD2" />
      </head>
      <body className="min-h-full flex flex-col">
        {/* Google Analytics 4 (GA4) */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />

        <ReduxProvider>
          <DataInitializer />
          <NavigationLoader />
          <CurrencyProvider>
            {children}
          </CurrencyProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
