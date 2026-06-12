"use client";

import { useT } from "@/lib/i18n-context";

export default function HowItWorks() {
  const t = useT();

  return (
    <section id="how-it-works" className="scroll-mt-28 bg-[#002838] py-20 text-white sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full border border-[#78C2B7]/30 bg-[#78C2B7]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#B9DDD5]">
            {t.howItWorks.badge}
          </span>
          <h2 className="mt-5 font-display text-4xl font-semibold leading-tight text-balance sm:text-5xl">
            {t.howItWorks.heading}
          </h2>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {t.howItWorks.steps.map(
            (step: { number: string; title: string; text: string }) => (
              <article key={step.number} className="rounded-[1.6rem] border border-[#78C2B7]/20 bg-white/[0.04] p-7">
                <span className="font-display text-4xl font-semibold text-[#78C2B7]">{step.number}</span>
                <h3 className="mt-8 font-display text-2xl font-semibold leading-tight">{step.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#B9DDD5]">{step.text}</p>
              </article>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
