import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import type { Casino } from "@/types";
import { API_CONFIG } from "@/config/api.config";
import { getImageUrl } from "@/lib/utils/getImageUrl";
import CasinoCardDisclaimer from "@/components/CasinoCardDisclaimer";

async function getFeaturedCasinos(): Promise<Casino[]> {
  try {
    const res = await fetch(
      `${API_CONFIG.baseURL}/casinos`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch casinos");
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function FeaturedCasinos() {
  const casinos = await getFeaturedCasinos();

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--color-gold)] sm:text-4xl">
            Featured Casinos
          </h2>

          <p className="mt-4 text-lg text-slate-400">
            Our top picks for the month based on expert reviews and player
            feedback.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {casinos.length === 0 && (
            <p className="col-span-full text-center text-slate-400">
              No casinos found.
            </p>
          )}

          {casinos.map((casino: any) => (
            <Card
              key={casino.id}
              className="card-animated-border p-[2px] rounded-2xl flex flex-col overflow-hidden bg-slate-800 border-0 cursor-pointer"
            >
              <CardHeader className="bg-slate-950 pb-4 border-b border-slate-800 flex items-center justify-center pt-8">
                <Image
                  src={getImageUrl(casino.logo || casino.featured_image)}
                  alt={`${casino.name} Logo`}
                  width={120}
                  height={60}
                  className="object-contain"
                  unoptimized
                />
              </CardHeader>

              <CardContent className="flex-1 pt-6 text-slate-300">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-xl text-white">
                    {casino.name}
                  </CardTitle>

                  <div className="flex items-center gap-1 text-sm font-medium text-[var(--color-gold)]">
                    <span>★</span>
                    {casino.rating ?? "N/A"}
                  </div>
                </div>

                <div className="mt-4 rounded-lg bg-slate-950/50 border border-[var(--color-gold)]/20 p-4 text-center">
                  <p className="text-sm font-semibold text-[var(--color-gold)] uppercase tracking-wider">
                    Minimum Deposit
                  </p>

                  <p className="mt-1 font-bold text-white">
                    ${casino.minimum_deposit || "N/A"}
                  </p>
                </div>

                <ul className="mt-6 space-y-2 text-sm text-slate-400">
                  <li className="flex items-center gap-2">
                    <span className="text-[var(--color-gold)]">✓</span>
                    Established {casino.established_year}
                  </li>

                  {casino.mobile_friendly && (
                    <li className="flex items-center gap-2">
                      <span className="text-[var(--color-gold)]">✓</span>
                      Mobile Friendly
                    </li>
                  )}

                  {casino.live_casino && (
                    <li className="flex items-center gap-2">
                      <span className="text-[var(--color-gold)]">✓</span>
                      Live Casino Games
                    </li>
                  )}

                  {casino.crypto_supported && (
                    <li className="flex items-center gap-2">
                      <span className="text-[var(--color-gold)]">✓</span>
                      Crypto Supported
                    </li>
                  )}

                  {casino.support_methods?.map(
                    (support: string, index: number) => (
                      <li
                        key={index}
                        className="flex items-center gap-2"
                      >
                        <span className="text-[var(--color-gold)]">✓</span>
                        {support}
                      </li>
                    )
                  )}
                </ul>
              </CardContent>

              <CardFooter className="pt-0 flex flex-col gap-3">
                <Button
                  className="btn-amber-glow w-full text-slate-900 font-bold"
                  asChild
                >
                  <a
                    href={casino.affiliate_url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Casino
                  </a>
                </Button>

                <Button
                  variant="link"
                  className="btn-review w-full text-sm"
                  asChild
                >
                  <Link href={`/casino/${casino.slug}`}>
                    Read Review
                  </Link>
                </Button>

                {/* Disclaimer Hover / Modal */}
                <div className="w-full">
                  <CasinoCardDisclaimer casinoName={casino.name} />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}