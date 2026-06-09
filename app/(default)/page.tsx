import Hero from "@/components/hero-home";
import Cta from "@/components/cta";
import Features from "@/components/features";
import Carousel from "@/components/carousel";
import SocialProof from "@/components/social-proof";
import FloatingCTA from "@/components/floating-cta";

export const metadata = {
  title: "Fishki — fiszki dla studentów medycyny",
  description: "Aktywne przypominanie i inteligentne powtórki dla studentów medycyny.",
};

export default async function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <FloatingCTA />
      <Carousel />
      <Features />
      <SocialProof />
      <Cta />
    </main>
  );
}
