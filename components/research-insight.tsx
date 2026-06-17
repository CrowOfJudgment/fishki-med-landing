"use client";

import { useT } from "@/lib/i18n-context";

type ProofQuote = {
  name: string;
  role: string;
  quote: string;
};

export default function ResearchInsight() {
  const t = useT();

  return (
    <section className="scroll-mt-28 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[2.25rem] border border-[#B9DDD5] bg-[#F4F7F5] p-6 shadow-[0_24px_70px_rgba(39,77,83,0.08)] sm:p-8 lg:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 top-0 h-56 w-56 rounded-full bg-[#78C2B7]/15 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-16 bottom-0 h-52 w-52 rounded-full bg-[#B9DDD5]/45 blur-3xl"
          />

          <div className="relative grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <span className="inline-flex rounded-full border border-[#B9DDD5] bg-[#E7F1EE] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#0F766E]">
                {t.research.badge}
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-3xl font-semibold leading-tight text-balance text-[#002838] sm:text-4xl">
                {t.research.heading}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-[#274D53]">
                {t.research.description}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {t.research.insights.map((item: string, index: number) => (
                <article
                  key={item}
                  className="rounded-[1.4rem] border border-[#B9DDD5] bg-white/80 p-5 shadow-sm"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E7F1EE] text-xs font-bold text-[#0F766E]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-4 text-sm font-semibold leading-6 text-[#002838]">
                    {item}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="relative mt-10 border-t border-[#B9DDD5] pt-8">
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full border border-[#B9DDD5] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#0F766E]">
                {t.proof.badge}
              </span>
              <h3 className="mt-4 font-display text-2xl font-semibold leading-tight text-[#002838] sm:text-3xl">
                {t.proof.heading}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#274D53] sm:text-base sm:leading-7">
                {t.proof.description}
              </p>
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {t.proof.quotes.map((item: ProofQuote, index: number) => (
                <article
                  key={`${item.name}-${index}`}
                  className={`rounded-[1.55rem] border border-[#B9DDD5] bg-white/80 p-5 shadow-sm ${
                    index === 0 ? "lg:col-span-2" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-[#002838]">
                        {item.name}
                      </h4>
                      <p className="mt-1 text-xs font-medium text-[#0F766E]">
                        {item.role}
                      </p>
                    </div>
                    <span
                      aria-hidden="true"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E7F1EE] text-lg font-semibold text-[#0F766E]"
                    >
                      ”
                    </span>
                  </div>
                  <blockquote className="mt-5 text-sm leading-6 text-[#274D53]">
                    “{item.quote}”
                  </blockquote>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
