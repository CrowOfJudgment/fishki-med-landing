"use client";

import { useT } from "@/lib/i18n-context";

function OfflinePreview() {
  const t = useT();
  const offline = t.features.offlineHighlight;

  return (
    <div className="relative mx-auto w-full max-w-[410px]">
      <div className="absolute -inset-8 rounded-full bg-[#B9DDD5]/50 blur-3xl" />
      <div className="relative overflow-hidden rounded-[2.2rem] border border-[#78C2B7] bg-[#0F766E] p-6 text-white shadow-[0_28px_80px_rgba(15,118,110,0.24)] sm:p-8">
        <div className="pointer-events-none absolute -right-20 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-[#78C2B7]/25 blur-3xl" />

        <div className="relative">
          <div className="flex items-center justify-between">
            <span className="inline-flex rounded-full bg-white/12 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white/80">
              {offline.badge}
            </span>
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/12 text-2xl font-light ring-1 ring-white/15">
              ↓
            </span>
          </div>

          <h2 className="mt-8 font-display text-3xl font-semibold leading-tight sm:text-4xl">
            {offline.heading}
          </h2>
          <p className="mt-4 text-sm leading-7 text-white/75">
            {offline.text}
          </p>

          <div className="mt-7 space-y-3">
            {offline.downloads.map((item: string, index: number) => (
              <div
                key={item}
                className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 ring-1 ring-white/15"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/12 text-lg font-light">
                  {index === 2 ? "✓" : "↓"}
                </span>
                <span className="text-sm font-semibold">{item}</span>
                <span className="ml-auto text-xs font-semibold text-white/45">
                  {index === 0 ? "38 MB" : index === 1 ? "126 MB" : "420 MB"}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-7 border-t border-white/15 pt-5 text-xs font-semibold leading-6 text-white/65">
            {offline.places}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function HeroHome() {
  const t = useT();

  return (
    <section id="top" className="relative overflow-hidden scroll-mt-28 py-12 sm:py-16 lg:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_18%,rgba(185,221,213,0.65),transparent_30%),radial-gradient(circle_at_88%_22%,rgba(120,194,183,0.2),transparent_28%)]"
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <span className="inline-flex rounded-full border border-[#B9DDD5] bg-[#E7F1EE]/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#0F766E]">
              {t.hero.badge}
            </span>

            <h1 className="mt-6 max-w-3xl font-display text-5xl font-semibold leading-[1.04] tracking-tight text-balance text-[#002838] sm:text-6xl lg:text-7xl">
              {t.hero.title}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#274D53] sm:text-xl">
              {t.hero.subtitle}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#preorder"
                className="inline-flex items-center justify-center rounded-full bg-[#E86860] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(232,104,96,0.24)] transition hover:-translate-y-0.5 hover:bg-[#D85A52]"
              >
                {t.hero.secondaryCta}
              </a>
              <a
                href="#waitlist-form"
                className="inline-flex items-center justify-center rounded-full bg-[#0F766E] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(15,118,110,0.22)] transition hover:-translate-y-0.5 hover:bg-[#002838]"
              >
                {t.hero.primaryCta}
              </a>
            </div>

            <p className="mt-5 max-w-xl text-sm leading-6 text-[#274D53]/75">
              {t.hero.validation}
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {t.hero.highlights.map((item: string) => (
                <span
                  key={item}
                  className="rounded-full border border-[#B9DDD5] bg-white/65 px-4 py-2 text-sm font-medium text-[#274D53]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <OfflinePreview />
        </div>
      </div>
    </section>
  );
}
