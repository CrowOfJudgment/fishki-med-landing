"use client";

import { useT } from "@/lib/i18n-context";

export default function ResearchInsight() {
  const t = useT();

  return (
    <section id="student-voices" className="scroll-mt-28 py-6 sm:py-10">
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

          <div className="relative">
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full border border-[#B9DDD5] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#0F766E]">
                {t.proof.badge}
              </span>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-[#002838] sm:text-4xl">
                {t.proof.heading}
              </h2>
              {t.proof.description ? (
                <p className="mt-3 text-sm leading-6 text-[#274D53] sm:text-base sm:leading-7">
                  {t.proof.description}
                </p>
              ) : null}
            </div>

            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
              {t.proof.facts.map((fact: string, index: number) => (
                <p
                  key={fact}
                  className="flex items-center gap-2 text-sm font-semibold text-[#0F766E]"
                >
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {index === 0 ? (
                      <>
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m20 0v-2a4 4 0 0 0-3-3.9M16 3a4 4 0 0 1 0 8" />
                        <circle cx="9" cy="7" r="4" />
                      </>
                    ) : (
                      <>
                        <rect x="6" y="2" width="12" height="20" rx="2" />
                        <path d="M11 18h2" />
                      </>
                    )}
                  </svg>
                  {fact}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
