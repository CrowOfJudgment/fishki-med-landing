import Hero from "@/components/hero-home";
import Cta from "@/components/cta";
import ProductShowcaseSection from "@/components/product-showcase-section";
import OfflineFirst from "@/components/offline-first";
import Problem from "@/components/problem";
import UseCases from "@/components/use-cases";
import Preorder, { PreorderFaq } from "@/components/preorder";
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
    <div id="top" className="flex flex-col">
      <Hero pricingRegion={pricingRegion} />
      <ProductShowcaseSection pricingRegion={pricingRegion} />
      <Problem />
      <UseCases />
      <OfflineFirst />
      <ResearchInsight />
      <Preorder pricingRegion={pricingRegion} />
      <PreorderFaq />
      <Cta />
    </div>
  );
}
