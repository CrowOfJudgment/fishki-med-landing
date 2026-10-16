"use client";

import { useT } from "@/lib/i18n-context";

import type { PricingRegion } from "@/lib/pricing-region";

export default function HeroHome({
  pricingRegion,
}: {
  pricingRegion: PricingRegion;
}) {
  const t = useT();
  const price = t.preorder.pricing[pricingRegion].value;

  return (
    <section className="relative overflow-hidden scroll-mt-28 py-12 sm:py-16 lg:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_18%,rgba(185,221,213,0.65),transparent_30%),radial-gradient(circle_at_88%_22%,rgba(120,194,183,0.2),transparent_28%)]"
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-5xl text-center">
          <span className="inline-flex rounded-full border border-[#B9DDD5] bg-[#E7F1EE]/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#0F766E]">
            {t.hero.badge}
          </span>

          <h1 className="mx-auto mt-6 max-w-5xl font-display text-5xl font-semibold leading-[1.04] tracking-tight text-balance text-[#002838] sm:text-6xl lg:text-7xl">
            {t.hero.title}
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#274D53] sm:text-xl">
            {t.hero.subtitle}
          </p>

          <p className="mt-5 inline-flex rounded-full border border-[#B9DDD5] bg-white/70 px-4 py-2 text-sm font-semibold text-[#0F766E]">
            {t.hero.priceBadge} · {price}
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="#preorder"
              data-analytics-click="hero_preorder"
              data-analytics-section="hero"
              className="inline-flex items-center justify-center rounded-full bg-[#E86860] px-6 py-3.5 text-sm font-semibold text-[#002838] shadow-[0_12px_30px_rgba(232,104,96,0.24)] transition hover:-translate-y-0.5"
            >
              {t.hero.primaryCta}
            </a>
            <a
              href="#how-it-works"
              data-analytics-click="hero_product"
              data-analytics-section="hero"
              className="inline-flex items-center justify-center rounded-full border border-[#0F766E] px-6 py-3.5 text-sm font-semibold text-[#0F766E] transition hover:bg-[#E7F1EE]"
            >
              {t.hero.secondaryCta}
            </a>
          </div>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-[#274D53]">
            {t.hero.validation}
          </p>
        </div>
      </div>
    </section>
  );
}
