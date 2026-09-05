import { Metadata } from "next";
import { SITE } from "@/constants";
import HomeContent from "./HomeContent";

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.description,
  openGraph: {
    title: SITE.title,
    description: SITE.description,
  },
};


export default function Home() {
  return <HomeContent />;
}