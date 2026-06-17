"use client";

import { useT } from "@/lib/i18n-context";

export default function Preorder() {
  const t = useT();

  return (
    <section id="preorder" className="scroll-mt-28 pb-10 pt-4 sm:pb-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[2.25rem] border border-[#B9DDD5] bg-white/75 p-5 shadow-[0_24px_70px_rgba(39,77,83,0.08)] backdrop-blur-xl sm:p-8 lg:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 top-0 h-52 w-52 rounded-full bg-[#78C2B7]/15 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-[#B9DDD5]/35 blur-3xl"
          />

          <div className="relative grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <span className="inline-flex rounded-full border border-[#B9DDD5] bg-[#E7F1EE] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#0F766E]">
                {t.preorder.badge}
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-3xl font-semibold leading-tight text-balance text-[#002838] sm:text-4xl">
                {t.preorder.title}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-[#274D53]">
                {t.preorder.subtitle}
              </p>
              <div className="mt-7 space-y-3">
                {t.preorder.includes.map((item: string) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#B9DDD5] text-xs font-bold text-[#0F766E]">
                      ✓
                    </span>
                    <span className="text-sm leading-6 text-[#274D53]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-6 rounded-2xl border border-[#B9DDD5] bg-[#F4F7F5] p-4 text-sm leading-6 text-[#274D53]">
                {t.preorder.trust}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#preorder-module"
                  aria-label={t.preorder.primaryAria}
                  className="inline-flex items-center justify-center rounded-full bg-[#E86860] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(232,104,96,0.24)] transition hover:-translate-y-0.5 hover:bg-[#D85A52]"
                >
                  {t.preorder.primaryCta}
                </a>
                <a
                  href="#waitlist-form"
                  aria-label={t.preorder.secondaryAria}
                  className="inline-flex items-center justify-center rounded-full bg-[#0F766E] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(15,118,110,0.2)] transition hover:-translate-y-0.5 hover:bg-[#002838]"
                >
                  {t.preorder.secondaryCta}
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <div
                id="preorder-module"
                className="rounded-[1.75rem] border border-dashed border-[#78C2B7] bg-[#F4F7F5] p-6 text-center sm:p-8"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0F766E]">
                  {t.preorder.placeholderLabel}
                </p>
                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#274D53]">
                  {t.preorder.placeholderText}
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {t.preorder.assurances.map((item: { title: string; text: string }) => (
                  <article
                    key={item.title}
                    className="rounded-[1.4rem] border border-[#B9DDD5] bg-white/80 p-5 shadow-sm"
                  >
                    <h3 className="text-sm font-semibold text-[#002838]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs leading-5 text-[#274D53]">
                      {item.text}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="relative mt-8 rounded-[1.75rem] border border-[#B9DDD5] bg-[#E7F1EE]/70 p-5 sm:p-6">
            <h3 className="font-display text-2xl font-semibold text-[#002838]">
              {t.preorder.roadmapTitle}
            </h3>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {t.preorder.roadmap.map((item: { stage: string; text: string }) => (
                <article
                  key={item.stage}
                  className="rounded-[1.25rem] border border-[#B9DDD5] bg-[#F4F7F5] p-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0F766E]">
                    {item.stage}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[#274D53]">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
