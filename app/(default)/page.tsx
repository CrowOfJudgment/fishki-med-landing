import Hero from "@/components/hero-home";
import Cta from "@/components/cta";
import FloatingCTA from "@/components/floating-cta";
import ProductShowcaseSection from "@/components/product-showcase-section";
import Problem from "@/components/problem";
import UseCases from "@/components/use-cases";
import Preorder from "@/components/preorder";
import ResearchInsight from "@/components/research-insight";
import { getPricingRegion } from "@/lib/pricing-region";
import { headers } from "next/headers";

export default async function Home() {
  const headerStore = await headers();
  const pricingRegion = getPricingRegion(
    headerStore.get("x-vercel-ip-country"),
    headerStore.get("accept-language") ?? "",
  );

  return (
    <main id="top" className="flex flex-col">
      <Hero />
      <FloatingCTA />
      <ProductShowcaseSection />
      <Preorder pricingRegion={pricingRegion} />
      <UseCases />
      <ResearchInsight />
      <Problem />
      <Cta />
    </main>
  );
}
