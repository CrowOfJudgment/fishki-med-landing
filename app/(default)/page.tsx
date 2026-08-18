import Hero from "@/components/hero-home";
import Cta from "@/components/cta";
import FloatingCTA from "@/components/floating-cta";
import StaticDemoSection from "@/components/app-demo/static-demo-section";
import Problem from "@/components/problem";
import AppDemo from "@/components/app-demo/app-demo";
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
      <StaticDemoSection />
      <ResearchInsight />
      <Problem />
      <AppDemo />
      <UseCases />
      <Cta />
      <Preorder pricingRegion={pricingRegion} />
    </main>
  );
}
