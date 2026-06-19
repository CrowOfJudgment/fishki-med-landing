import Hero from "@/components/hero-home";
import Cta from "@/components/cta";
import FloatingCTA from "@/components/floating-cta";
import Comparison from "@/components/comparison";
import AppDemo from "@/components/app-demo/app-demo";
import StaticDemoSection from "@/components/app-demo/static-demo-section";
import UseCases from "@/components/use-cases";
import Preorder from "@/components/preorder";
import ResearchInsight from "@/components/research-insight";
import OfflineFirst from "@/components/offline-first";

export default async function Home() {
  return (
    <main id="top" className="flex flex-col">
      <Hero />
      <FloatingCTA />
      <StaticDemoSection />
      <ResearchInsight />
      <Comparison />
      <AppDemo />
      <OfflineFirst />
      <UseCases />
      <Cta />
      <Preorder />
    </main>
  );
}
