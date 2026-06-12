"use client";

import { useT } from "@/lib/i18n-context";

export default function UseCases() {
  const t = useT();

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <span className="inline-flex rounded-full border border-[#B9DDD5] bg-[#E7F1EE] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#0F766E]">
              {t.useCases.badge}
            </span>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-tight text-balance text-[#002838] sm:text-5xl">
              {t.useCases.heading}
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#274D53]">{t.useCases.intro}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {t.useCases.items.map(
              (item: { label: string; title: string; text: string }, index: number) => (
                <article key={item.title} className="rounded-[1.5rem] border border-[#B9DDD5] bg-white/70 p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0F766E]">
                      {item.label}
                    </span>
                    <span className={`h-2.5 w-2.5 rounded-full ${index === 1 ? "bg-[#E86860]" : "bg-[#78C2B7]"}`} />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold text-[#002838]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#274D53]">{item.text}</p>
                </article>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
