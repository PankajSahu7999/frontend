import { Metadata } from "next";
import { DEFAULT_SEO } from "@/constants";
import HomeContent from "./HomeContent";

export const metadata: Metadata = {
  title: DEFAULT_SEO.title.default,
  description: DEFAULT_SEO.description,
  openGraph: {
    title: DEFAULT_SEO.title.default,
    description: DEFAULT_SEO.description,
  },
};


export default function Home() {
  return <HomeContent />;
}