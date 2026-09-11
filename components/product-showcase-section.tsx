"use client";

import { useT } from "@/lib/i18n-context";

export default function ProductShowcaseSection() {
  const t = useT();

  return (
    <section id="how-it-works" className="scroll-mt-28 py-20 sm:py-28">
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

        {/* Only real iPhone screenshots belong above this CTA. */}
        <div className="mx-auto mt-12 max-w-4xl rounded-[2rem] border border-[#B9DDD5] bg-white/75 px-6 py-8 text-center shadow-[0_22px_60px_rgba(39,77,83,0.1)] backdrop-blur-xl sm:px-10 sm:py-10">
          <h3 className="font-display text-2xl font-semibold leading-tight text-[#002838] sm:text-3xl">
            {t.demo.postDemoCta.title}
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#274D53]">
            {t.demo.postDemoCta.text}
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="#waitlist-form"
              aria-label={t.demo.postDemoCta.waitlistAria}
              data-analytics-click="screens_waitlist"
              data-analytics-section="screens_cta"
              className="inline-flex items-center justify-center rounded-full bg-[#0F766E] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(15,118,110,0.2)] transition hover:-translate-y-0.5 hover:bg-[#002838]"
            >
              {t.demo.postDemoCta.waitlist}
            </a>
            <a
              href="#preorder"
              aria-label={t.demo.postDemoCta.preorderAria}
              data-analytics-click="screens_preorder"
              data-analytics-section="screens_cta"
              className="inline-flex items-center justify-center rounded-full bg-[#E86860] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(232,104,96,0.22)] transition hover:-translate-y-0.5 hover:bg-[#D85A52]"
            >
              {t.demo.postDemoCta.preorder}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
