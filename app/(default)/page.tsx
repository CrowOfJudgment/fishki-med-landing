import Hero from "@/components/hero-home";
import Cta from "@/components/cta";
import Features from "@/components/features";
import FloatingCTA from "@/components/floating-cta";
import Comparison from "@/components/comparison";
import AppDemo from "@/components/app-demo/app-demo";
import UseCases from "@/components/use-cases";
import HowItWorks from "@/components/how-it-works";

export default async function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <FloatingCTA />
      <Comparison />
      <Features />
      <AppDemo />
      <UseCases />
      <HowItWorks />
      <Cta />
    </main>
  );
}
