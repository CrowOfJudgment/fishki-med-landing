"use client";

import { useT } from "@/lib/i18n-context";

function EditorPreview() {
  const t = useT();
  const m = t.hero.mockup;

  return (
    <div className="relative mx-auto w-full max-w-[480px]">
      <div className="absolute -inset-8 rounded-full bg-[#B9DDD5]/50 blur-3xl" />
      <div className="relative overflow-hidden rounded-[2rem] border border-[#B9DDD5] bg-[#F4F7F5] shadow-[0_28px_80px_rgba(39,77,83,0.16)]">
        <div className="flex items-center justify-between border-b border-[#B9DDD5]/70 bg-white/70 px-5 py-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#0F766E]">
              {m.deck}
            </p>
            <p className="mt-1 text-xs text-[#274D53]/70">{m.count}</p>
          </div>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E7F1EE] text-lg text-[#0F766E]">
            +
          </span>
        </div>

        <div className="p-5 sm:p-7">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-semibold text-[#002838]">
              {m.newCard}
            </h2>
            <span className="h-2.5 w-2.5 rounded-full bg-[#E86860]" />
          </div>

          <div className="mt-5 space-y-3">
            <div className="rounded-2xl border border-[#B9DDD5] bg-white p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0F766E]">
                {m.frontLabel}
              </p>
              <p className="mt-3 text-sm font-medium leading-6 text-[#002838]">
                {m.front}
              </p>
            </div>
            <div className="rounded-2xl border border-[#B9DDD5] bg-white p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0F766E]">
                {m.backLabel}
              </p>
              <p className="mt-3 text-sm font-medium leading-6 text-[#002838]">
                {m.back}
              </p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button className="rounded-xl border border-[#B9DDD5] bg-[#E7F1EE] px-3 py-3 text-xs font-semibold text-[#274D53]">
              {m.image}
            </button>
            <button className="rounded-xl border border-[#B9DDD5] bg-[#E7F1EE] px-3 py-3 text-xs font-semibold text-[#274D53]">
              {m.cloze}
            </button>
          </div>

          <button className="mt-4 w-full rounded-xl bg-[#0F766E] px-4 py-3.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(15,118,110,0.2)]">
            {m.save}
          </button>
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
                href="#waitlist-form"
                className="inline-flex items-center justify-center rounded-full bg-[#0F766E] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(15,118,110,0.22)] transition hover:-translate-y-0.5 hover:bg-[#002838]"
              >
                {t.hero.primaryCta}
              </a>
              <a
                href="#demo"
                className="inline-flex items-center justify-center rounded-full border border-[#B9DDD5] bg-white/75 px-6 py-3.5 text-sm font-semibold text-[#274D53] transition hover:-translate-y-0.5 hover:bg-white"
              >
                {t.hero.secondaryCta}
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

          <EditorPreview />
        </div>
      </div>
    </section>
  );
}
