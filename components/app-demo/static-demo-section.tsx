"use client";

import { useT } from "@/lib/i18n-context";
import StaticDemoShowcase from "./static-demo-showcase";

export default function StaticDemoSection() {
  const t = useT();

  return (
    <section
      id="how-it-works"
      className="ios-demo-controls scroll-mt-28 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-[#B9DDD5] bg-[#E7F1EE] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#0F766E]">
            {t.demo.showcaseBadge}
          </span>
          <h2 className="mt-5 font-display text-4xl font-semibold leading-tight text-balance text-[#002838] sm:text-5xl">
            {t.demo.showcaseHeading}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#274D53]">
            {t.demo.showcaseIntro}
          </p>
        </div>

        <div className="mt-14">
          <StaticDemoShowcase
            screens={t.demo.fixedScreens}
            ui={t.demo.ui}
            controls={t.demo.carouselControls}
          />
        </div>
      </div>
    </section>
  );
}
